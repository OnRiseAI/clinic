import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { Phone, Mail, MapPin, ArrowRight, Shield, Globe2 } from 'lucide-react'

export function Footer() {
  const t = useTranslations('footer')
  const tCommon = useTranslations('common')
  const tNav = useTranslations('navigation')

  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: tNav('home'), href: '/' },
    { name: tNav('treatments'), href: '/procedures' },
    { name: tNav('destinations'), href: '/destinations' },
    { name: tNav('clinics'), href: '/clinics' },
    { name: tNav('blog'), href: '/blog' },
  ]

  const clinicLinks = [
    { name: t('claimListing'), href: '/auth/claim' },
    { name: t('advertise'), href: '/contact' },
    { name: t('partnerPortal'), href: '/auth/signin' },
  ]

  const resourceLinks = [
    { name: t('patientGuide'), href: '/blog' },
    { name: t('faq'), href: '/how-it-works' },
    { name: t('support'), href: '/contact' },
  ]

  // High-value SEO links for popular treatments
  const popularTreatments = [
    { name: 'Dental Clinics Directory', href: '/clinics/dental' },
    { name: 'Dental Veneers Turkey', href: '/procedures/veneers/turkey' },
    { name: 'Rhinoplasty Turkey', href: '/procedures/rhinoplasty/turkey' },
    { name: 'Dental Implants Hungary', href: '/procedures/dental-implants/hungary' },
    { name: 'Breast Augmentation Turkey', href: '/procedures/breast-augmentation/turkey' },
    { name: 'Liposuction Spain', href: '/procedures/liposuction/spain' },
  ]

  const topDestinations = [
    { name: 'Turkey', href: '/destinations/turkey' },
    { name: 'Hungary', href: '/destinations/hungary' },
    { name: 'Poland', href: '/destinations/poland' },
    { name: 'Spain', href: '/destinations/spain' },
  ]

  const legalLinks = [
    { name: t('privacy'), href: '/privacy' },
    { name: t('terms'), href: '/terms' },
    { name: t('cookies'), href: '/cookies' },
  ]

  return (
    <footer className="bg-[#0A121E] border-t border-white/10 text-white">
      {/* 
        Top CTA / Newsletter Band
      */}
      <div className="border-b border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-center md:text-left">
            <h3 className="text-xl font-bold text-white tracking-tight">Stay updated with the latest in global healthcare</h3>
            <p className="mt-2 text-sm text-white/50 font-light">Join our newsletter for exclusive offers, clinic highlights, and medical tourism insights.</p>
          </div>
          <div className="w-full md:w-auto flex items-center max-w-md">
            <div className="relative w-full">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded-full border border-white/10 bg-white/5 px-6 py-3.5 pr-32 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-gold/50 focus:bg-white/10"
              />
              <button className="absolute right-1.5 top-1.5 bottom-1.5 rounded-full bg-gold px-5 text-xs font-bold tracking-wide text-navy transition-all hover:bg-gold-dark hover:scale-[0.98]">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="xl:grid xl:grid-cols-12 xl:gap-12">
          {/* Brand & Contact Column */}
          <div className="xl:col-span-4 space-y-8">
            <Link href="/" className="group flex items-center gap-2.5 inline-flex">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-gold shadow-lg shadow-gold/20 transition-transform group-hover:scale-105 duration-300">
                <span className="text-xl font-bold text-navy">M</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                MeetYour<span className="text-gold">Clinic</span>
              </span>
            </Link>
            
            <p className="text-sm font-light leading-relaxed text-white/60 max-w-sm">
              We connect you with leading international clinics, verified standards, and transparent comparisons — structured in one place.
            </p>

            <div className="space-y-4 pt-2">
              <a href="tel:+441273113667" className="group flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 group-hover:bg-white/10 group-hover:text-gold transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="tracking-wide">+44 1273 113667</span>
              </a>
              <a href="mailto:contact@meetyourclinic.com" className="group flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 group-hover:bg-white/10 group-hover:text-gold transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <span>contact@meetyourclinic.com</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/50 hover:bg-gold hover:text-navy transition-all duration-300">
                <span className="sr-only">Facebook</span>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/50 hover:bg-gold hover:text-navy transition-all duration-300">
                <span className="sr-only">Instagram</span>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/50 hover:bg-gold hover:text-navy transition-all duration-300">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4 xl:col-span-8 xl:mt-0 lg:pl-10">
            {/* Quick Links */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white/40 mb-6">
                {t('quickLinks')}
              </h3>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm font-light text-white/60 hover:text-white hover:underline decoration-white/20 underline-offset-4 transition-all">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* For Clinics */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white/40 mb-6">
                {t('forClinics')}
              </h3>
              <ul className="space-y-4">
                {clinicLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm font-light text-white/60 hover:text-white hover:underline decoration-white/20 underline-offset-4 transition-all">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white/40 mb-6">
                {t('resources')}
              </h3>
              <ul className="space-y-4">
                {resourceLinks.map((link, idx) => (
                  <li key={`${link.href}-${idx}`}>
                    <Link href={link.href} className="text-sm font-light text-white/60 hover:text-white hover:underline decoration-white/20 underline-offset-4 transition-all">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white/40 mb-6">
                {t('legal')}
              </h3>
              <ul className="space-y-4">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm font-light text-white/60 hover:text-white hover:underline decoration-white/20 underline-offset-4 transition-all">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Popular Treatments & Destinations - SEO Links */}
        <div className="mt-16 border-t border-white/10 pt-10">
          <div className="grid gap-x-8 gap-y-10 md:grid-cols-2">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-white/40 mb-5">Popular Treatments</h4>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {popularTreatments.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-light text-white/50 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-white/40 mb-5">Top Destinations</h4>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {topDestinations.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-light text-white/50 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8 text-sm font-light text-white/40">
          <p>
            &copy; {currentYear} MeetYourClinic. {t('copyright')}
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-white/30" /> SSL Secured</span>
            <span className="flex items-center gap-1.5"><Globe2 className="h-4 w-4 text-white/30" /> Global Network</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
