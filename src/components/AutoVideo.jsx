import { useEffect, useRef } from 'react'

// Muted preview loop that plays only while sufficiently on-screen and never
// autoplays under prefers-reduced-motion. Shared by any section that wants a
// lightweight ambient video (Pricing kit card, etc.).
export default function AutoVideo({ src, poster, threshold = 0.35, className = '', label = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold },
    )
    observer.observe(video)
    return () => observer.disconnect()
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
      preload="metadata"
      aria-label={label || undefined}
    />
  )
}
