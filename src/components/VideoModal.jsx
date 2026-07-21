import { useEffect, useRef, useState, useCallback } from 'react'
import { X, RotateCw, ZoomIn, ZoomOut } from 'lucide-react'
import './video-modal.css'

const MIN_ZOOM = 1
const MAX_ZOOM = 4
const ZOOM_STEP = 0.5

// Shared full-video player overlay. Opens with sound + native controls.
// - Rotate toggle spins the clip 90° to fill the viewport in landscape.
// - Zoom: +/- buttons, wheel (desktop), pinch (touch), drag-to-pan when zoomed.
// - Native download + fullscreen buttons are stripped (controlsList) so Chrome's
//   own fullscreen doesn't fight our rotate.
// - Browser Back closes the overlay instead of leaving the page.
export default function VideoModal({ open, onClose, src, poster, vertical = false, title = 'Video player' }) {
  const closeRef = useRef(null)
  const [rotated, setRotated] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })

  // Live gesture state kept in a ref so pointer handlers don't re-bind.
  const gesture = useRef({ pointers: new Map(), pinchDist: 0, pinchZoom: 1, panStart: null })

  const resetView = useCallback(() => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
    gesture.current.pointers.clear()
  }, [])

  // Keep the latest onClose without re-running the history effect every render.
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onCloseRef.current()
      if (e.key === 'Tab') {
        // Keep focus inside the dialog
        const dialog = closeRef.current?.closest('.vmodal')
        if (!dialog) return
        const focusables = dialog.querySelectorAll('button, video, [tabindex]:not([tabindex="-1"])')
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  // Browser Back should dismiss the overlay, not navigate away from the page.
  // Push a history entry on open; a popstate (Back) triggers close. If we close
  // via the UI instead, unwind the pushed entry so Back doesn't re-open nothing.
  useEffect(() => {
    if (!open) return
    window.history.pushState({ vmodal: true }, '')
    const onPop = () => onCloseRef.current()
    window.addEventListener('popstate', onPop)
    return () => {
      window.removeEventListener('popstate', onPop)
      if (window.history.state?.vmodal) window.history.back()
    }
  }, [open])

  // Reset rotation + zoom whenever the modal closes so the next open is fresh.
  useEffect(() => {
    if (!open) {
      setRotated(false)
      resetView()
    }
  }, [open, resetView])

  const clampZoom = (z) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z))

  const stepZoom = (delta) => {
    setZoom((z) => {
      const next = clampZoom(z + delta)
      if (next === 1) setPan({ x: 0, y: 0 })
      return next
    })
  }

  const onWheel = (e) => {
    e.preventDefault()
    stepZoom(e.deltaY < 0 ? 0.25 : -0.25)
  }

  const onPointerDown = (e) => {
    const g = gesture.current
    g.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (g.pointers.size === 2) {
      // Pinch begins — record baseline distance + zoom.
      const [a, b] = [...g.pointers.values()]
      g.pinchDist = Math.hypot(a.x - b.x, a.y - b.y)
      g.pinchZoom = zoom
      g.panStart = null
    } else if (g.pointers.size === 1 && zoom > 1) {
      // Single-finger pan, only meaningful once zoomed in.
      g.panStart = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y }
      e.currentTarget.setPointerCapture(e.pointerId)
    }
  }

  const onPointerMove = (e) => {
    const g = gesture.current
    if (!g.pointers.has(e.pointerId)) return
    g.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })

    if (g.pointers.size === 2 && g.pinchDist > 0) {
      e.preventDefault()
      const [a, b] = [...g.pointers.values()]
      const dist = Math.hypot(a.x - b.x, a.y - b.y)
      const next = clampZoom(g.pinchZoom * (dist / g.pinchDist))
      setZoom(next)
      if (next === 1) setPan({ x: 0, y: 0 })
    } else if (g.panStart && zoom > 1) {
      e.preventDefault()
      setPan({
        x: g.panStart.panX + (e.clientX - g.panStart.x),
        y: g.panStart.panY + (e.clientY - g.panStart.y),
      })
    }
  }

  const onPointerUp = (e) => {
    const g = gesture.current
    g.pointers.delete(e.pointerId)
    if (g.pointers.size < 2) g.pinchDist = 0
    if (g.pointers.size === 0) g.panStart = null
  }

  if (!open) return null

  const zoomed = zoom > 1
  const videoStyle = {
    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom}) rotate(${rotated ? 90 : 0}deg)`,
    cursor: zoomed ? 'grab' : 'default',
  }

  return (
    <div className="vmodal" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className="vmodal__controls" onClick={(e) => e.stopPropagation()}>
        <button
          className="vmodal__ctrl"
          onClick={() => stepZoom(ZOOM_STEP)}
          disabled={zoom >= MAX_ZOOM}
          aria-label="Zoom in"
        >
          <ZoomIn size={20} />
        </button>
        <button
          className="vmodal__ctrl"
          onClick={() => stepZoom(-ZOOM_STEP)}
          disabled={zoom <= MIN_ZOOM}
          aria-label="Zoom out"
        >
          <ZoomOut size={20} />
        </button>
        <button
          className="vmodal__ctrl"
          onClick={() => setRotated((r) => !r)}
          aria-pressed={rotated}
          aria-label={rotated ? 'Rotate video upright' : 'Rotate video to landscape'}
        >
          <RotateCw size={20} />
        </button>
        <button ref={closeRef} className="vmodal__ctrl" onClick={onClose} aria-label="Close video">
          <X size={22} />
        </button>
      </div>

      <div
        className={`vmodal__body ${vertical ? 'vmodal__body--vertical' : ''} ${rotated ? 'vmodal__body--rotated' : ''} ${zoomed ? 'is-zoomed' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <video
          key={src}
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          preload="auto"
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
          style={videoStyle}
          onWheel={onWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />
      </div>
    </div>
  )
}
