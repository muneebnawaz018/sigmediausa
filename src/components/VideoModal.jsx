import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import './video-modal.css'

// Shared full-video player overlay. Opens with sound + native controls.
export default function VideoModal({ open, onClose, src, poster, vertical = false, title = 'Video player' }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
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
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="vmodal" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div
        className={`vmodal__body ${vertical ? 'vmodal__body--vertical' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} className="vmodal__close" onClick={onClose} aria-label="Close video">
          <X size={22} />
        </button>
        <video key={src} src={src} poster={poster} controls autoPlay playsInline />
      </div>
    </div>
  )
}
