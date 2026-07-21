import { useEffect, useState } from 'react'

// Cloudflare Pages doesn't serve HTTP range requests, and mobile Safari/Chrome
// require range support to play a <video>. Work around it by downloading the
// whole file and playing it from an in-memory blob URL — seeking works without
// server range support, and once loaded there's no re-fetch stutter.
//
// Streams the response so we can report download progress; the video only
// starts once the clip is fully in memory. Set `enabled` false to defer the
// fetch (e.g. until the element scrolls near the viewport).
export function useBlobVideo(src, { enabled = true } = {}) {
  const [blobUrl, setBlobUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!src || !enabled) return
    const controller = new AbortController()
    let objectUrl = null
    let cancelled = false

    setLoading(true)
    setError(false)
    setProgress(0)

    const run = async () => {
      try {
        const res = await fetch(src, { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        let blob
        const total = Number(res.headers.get('content-length')) || 0
        // Stream for progress when possible; fall back to a plain blob read.
        if (res.body && typeof res.body.getReader === 'function') {
          const reader = res.body.getReader()
          const chunks = []
          let received = 0
          for (;;) {
            const { done, value } = await reader.read()
            if (done) break
            chunks.push(value)
            received += value.length
            if (total && !cancelled) setProgress(received / total)
          }
          blob = new Blob(chunks, { type: res.headers.get('content-type') || 'video/mp4' })
        } else {
          blob = await res.blob()
        }

        if (cancelled) return
        objectUrl = URL.createObjectURL(blob)
        setBlobUrl(objectUrl)
        setProgress(1)
        setLoading(false)
      } catch (err) {
        if (cancelled || err.name === 'AbortError') return
        setError(true)
        setLoading(false)
      }
    }

    run()

    return () => {
      cancelled = true
      controller.abort()
      if (objectUrl) URL.revokeObjectURL(objectUrl)
      setBlobUrl(null)
    }
  }, [src, enabled])

  return { blobUrl, loading, error, progress }
}
