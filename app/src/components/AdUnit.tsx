import { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export default function AdUnit() {
  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (_) {}
  }, [])

  return (
    <div className="w-full px-4 py-2">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7591901240303237"
        data-ad-slot="6544438605"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
