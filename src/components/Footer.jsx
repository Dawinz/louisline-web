import { Link } from 'react-router-dom'
import ScrollReveal from './ScrollReveal'
import { WHATSAPP_LINK } from '../data/routes'

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-sm text-slate-300 transition hover:translate-x-0.5 hover:text-amber-400"
    >
      {children}
    </Link>
  )
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-amber-400 transition hover:border-amber-400/60 hover:bg-amber-400/10 hover:text-amber-300"
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-white/10 bg-gradient-to-br from-[#0b1224] via-[#111b36] to-[#1a0f3d] text-slate-200">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #fbbf24 0, transparent 40%), radial-gradient(circle at 80% 0%, #60a5fa 0, transparent 35%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-10 bottom-0 text-[180px] font-black uppercase leading-none text-white/[0.04] sm:text-[240px]"
        aria-hidden
      >
        BUS
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <ScrollReveal>
            <div className="space-y-4">
              <img src="/louisline-logo.png" alt="Louisline" className="h-12 w-auto" />
              <p className="text-sm leading-relaxed text-slate-300">
                Louisline connects cities with dependable schedules, comfortable coaches, and simple online booking powered by Safari Yetu.
              </p>
              <a
                href="tel:+255683300100"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-3 text-sm font-extrabold text-slate-900 shadow-lg shadow-amber-500/25 transition hover:from-amber-300 hover:to-orange-400"
              >
                <span aria-hidden>📞</span>
                0683 300 100
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={90}>
            <div>
              <h3 className="text-base font-bold uppercase tracking-wide text-white">Company</h3>
              <div className="mt-4 flex flex-col gap-2">
                <FooterLink to="/routes">Routes</FooterLink>
                <FooterLink to="/gallery">Gallery</FooterLink>
                <FooterLink to="/contact">Contact</FooterLink>
                <FooterLink to="/book">Book</FooterLink>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <div>
              <h3 className="text-base font-bold uppercase tracking-wide text-white">Services</h3>
              <div className="mt-4 flex flex-col gap-2">
                <span className="text-sm text-slate-300">Comfort seating</span>
                <span className="text-sm text-slate-300">On-time departures</span>
                <span className="text-sm text-slate-300">Online booking</span>
                <span className="text-sm text-slate-300">Customer support</span>
                <span className="text-sm text-slate-300">Luggage-friendly coaches</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={230}>
            <div>
              <h3 className="text-base font-bold uppercase tracking-wide text-white">Get in touch</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li className="flex gap-3">
                  <span className="text-amber-400" aria-hidden>
                    📍
                  </span>
                  <span>Urafiki, Dar es Salaam, Tanzania</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-400" aria-hidden>
                    ✉️
                  </span>
                  <a className="transition hover:text-amber-400" href="mailto:info@louisline.co.tz">
                    info@louisline.co.tz
                  </a>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-400" aria-hidden>
                    📞
                  </span>
                  <span>0683 300 100 · 0798 700 700</span>
                </li>
              </ul>
              <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-slate-400">Follow us</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <SocialLink href={WHATSAPP_LINK} label="WhatsApp">
                  <span className="text-base">W</span>
                </SocialLink>
                <SocialLink href="https://www.facebook.com" label="Facebook">
                  <span className="text-base">f</span>
                </SocialLink>
                <SocialLink href="https://www.instagram.com" label="Instagram">
                  <span className="text-base">◎</span>
                </SocialLink>
                <SocialLink href="https://www.youtube.com" label="YouTube">
                  <span className="text-base">▶</span>
                </SocialLink>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-3 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>Copyright © 2026 Louisline. All rights reserved.</p>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              <span className="cursor-default">Terms of use</span>
              <span className="text-slate-600">|</span>
              <span className="cursor-default">Privacy policy</span>
              <span className="text-slate-600">|</span>
              <span className="cursor-default">Cookie policy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
