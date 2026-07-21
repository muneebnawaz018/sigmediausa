import { useEffect, useRef, useState } from 'react'
import { useBlobVideo } from '../hooks/useBlobVideo.js'

// Muted preview loop that plays only while sufficiently on-screen and never
// autoplays under prefers-reduced-motion. The clip is loaded into an in-memory
// blob (see useBlobVideo) so it plays on mobile — where the CDN's lack of range
// support would otherwise block playback — and starts only once fully buffered,
// killing the stop-start stutter. The blob is fetched lazily the first time the
// element nears the viewport.
export default function AutoVideo({ src, poster, threshold = 0.35, className = '', label = '' }) {
  const ref = useRef(null)
  const [nearby, setNearby] = useState(false)
  const [onScreen, setOnScreen] = useState(false)
  const { blobUrl } = useBlobVideo(src, { enabled: nearby })

  // Observe visibility: latch `nearby` (triggers the fetch) and track on-screen.
  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setOnScreen(entry.isIntersecting)
        if (entry.isIntersecting) setNearby(true)
      },
      { threshold },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [threshold])

  // Play once the blob is ready and the element is on-screen; pause otherwise.
  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (onScreen && blobUrl) video.play().catch(() => {})
    else video.pause()
  }, [onScreen, blobUrl])

  return (
    <video
      ref={ref}
      className={className}
      src={blobUrl || undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload="auto"
      controlsList="nodownload noremoteplayback"
      disablePictureInPicture
      onContextMenu={(e) => e.preventDefault()}
      aria-label={label || undefined}
    />
  )
}
