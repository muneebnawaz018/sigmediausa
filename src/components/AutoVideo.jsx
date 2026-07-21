import { useEffect, useRef } from 'react'

// Muted preview loop that plays only while sufficiently on-screen and never
// autoplays under prefers-reduced-motion. Playback waits until the clip is
// buffered enough to run without stalling, so it plays smoothly instead of
// stop-starting to catch up.
export default function AutoVideo({ src, poster, threshold = 0.35, className = '', label = '' }) {
  const ref = useRef(null)
  const onScreen = useRef(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const playWhenReady = () => {
      if (!onScreen.current) return
      if (video.readyState >= 3) video.play().catch(() => {})
      else video.addEventListener('canplaythrough', onReady, { once: true })
    }
    const onReady = () => {
      if (onScreen.current) video.play().catch(() => {})
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen.current = entry.isIntersecting
        if (entry.isIntersecting) playWhenReady()
        else video.pause()
      },
      { threshold },
    )
    observer.observe(video)
    return () => {
      video.removeEventListener('canplaythrough', onReady)
      observer.disconnect()
    }
  }, [threshold])

  return (
    <video
      ref={ref}
      className={className}
      src={src}
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
