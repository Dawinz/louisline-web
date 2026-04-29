import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { OPERATOR_ID } from '../data/routes'
import { useSafariPlus } from '../hooks/useSafariPlus'
import { useI18n } from '../i18n/I18nContext'

export default function DirectSafariBook() {
  const [searchParams] = useSearchParams()
  const { t } = useI18n()
  const { ensureScript, checkReady } = useSafariPlus()
  const [status, setStatus] = useState('loading')

  const queryKey = useMemo(() => searchParams.toString(), [searchParams])

  useEffect(() => {
    const params = new URLSearchParams(queryKey)
    const from = params.get('from')
    const to = params.get('to')
    const date = params.get('date')
    const passengersRaw = params.get('passengers') || '1'
    const passengersCount = Math.max(
      1,
      Math.min(8, Number.parseInt(passengersRaw, 10) || 1),
    )

    if (!from || !to || !date) {
      setStatus('error')
      return
    }

    let cancelled = false
    let timeoutId
    let attempts = 0

    const tryLaunch = () => {
      if (cancelled) return
      ensureScript()
      if (typeof window.safariplus?.newTripDialog === 'function' && checkReady()) {
        try {
          document.body.style.overflow = 'hidden'
          document.body.classList.add('safari-dialog-open')
          window.safariplus.newTripDialog({
            operatorId: OPERATOR_ID,
            origin: from,
            destination: to,
            departureDate: date,
            passengersCount,
          })
          setStatus('opened')
          const cleanup = () => {
            document.body.style.overflow = ''
            document.body.classList.remove('safari-dialog-open')
            window.removeEventListener('focus', cleanup)
          }
          // Keep app chrome hidden while SafariYetu results are open.
          window.addEventListener('focus', cleanup)
        } catch {
          setStatus('error')
        }
        return
      }

      attempts += 1
      if (attempts > 100) {
        setStatus('error')
        return
      }
      timeoutId = window.setTimeout(tryLaunch, 120)
    }

    tryLaunch()

    return () => {
      cancelled = true
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [queryKey, ensureScript, checkReady])

  return (
    <section className="flex min-h-[55vh] flex-col items-center justify-center gap-4 px-4 text-center">
      {status === 'loading' ? (
        <>
          <p className="text-lg font-semibold text-slate-900">{t('directBookOpening')}</p>
          <p className="max-w-md text-sm text-slate-600">{t('directBookWait')}</p>
          <div className="mt-4 h-10 w-10 animate-spin rounded-full border-2 border-[#29388d] border-t-transparent" />
        </>
      ) : null}
      {status === 'opened' ? (
        <>
          <p className="text-lg font-semibold text-slate-900">{t('directBookOpened')}</p>
          <p className="max-w-md text-sm text-slate-600">{t('directBookOpenedHint')}</p>
        </>
      ) : null}
      {status === 'error' ? (
        <>
          <p className="text-lg font-semibold text-slate-900">{t('directBookFailed')}</p>
          <p className="max-w-md text-sm text-slate-600">{t('directBookFailedHint')}</p>
          <Link
            to="/book"
            className="mt-2 inline-flex rounded-xl bg-gradient-to-r from-[#29388d] to-[#d91d27] px-5 py-2.5 text-sm font-semibold text-white"
          >
            {t('directBookUseForm')}
          </Link>
        </>
      ) : null}
    </section>
  )
}
