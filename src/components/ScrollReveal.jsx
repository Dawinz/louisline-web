import { useEffect, useRef, useState } from 'react'

/**
 * Fades/slides children into view once when scrolled into the viewport.
 */
export default function ScrollReveal({
  children,
  className = '',
  as: Tag = 'div',
  delay = 0,
  threshold = 0.12,
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal-up ${visible ? 'is-visible' : ''} ${className}`.trim()}
    >
      {children}
    </Tag>
  )
}
