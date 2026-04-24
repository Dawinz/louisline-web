import { useCallback, useState } from 'react'

const SAFARI_SCRIPT_SRC =
  'https://www.safariyetu.com/safariplus/v1/safariplus.min.js'

export function useSafariPlus() {
  const [isReady, setIsReady] = useState(
    Boolean(window?.safariplus?.newTripDialog),
  )
  const [error, setError] = useState('')

  const checkReady = useCallback(() => {
    const loaded = Boolean(window?.safariplus?.newTripDialog)
    setIsReady(loaded)
    if (loaded) {
      setError('')
    }
    return loaded
  }, [])

  const ensureScript = useCallback(() => {
    if (checkReady()) return

    const existing = document.querySelector(`script[src="${SAFARI_SCRIPT_SRC}"]`)
    if (!existing) {
      const script = document.createElement('script')
      script.src = SAFARI_SCRIPT_SRC
      script.async = true
      script.onload = () => checkReady()
      script.onerror = () => {
        setError('Booking service failed to load. Please check your network.')
      }
      document.head.appendChild(script)
      return
    }

    if (!existing.dataset.listenerAttached) {
      existing.addEventListener('load', () => checkReady())
      existing.addEventListener('error', () =>
        setError('Booking service failed to load. Please try again shortly.'),
      )
      existing.dataset.listenerAttached = 'true'
    }
  }, [checkReady])

  return { isReady, error, checkReady, ensureScript }
}
