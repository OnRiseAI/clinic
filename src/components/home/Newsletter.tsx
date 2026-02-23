'use client'

import { motion } from 'framer-motion'

export function Newsletter() {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-xs font-bold text-navy/40 uppercase tracking-[0.2em] mb-4">
            Updates
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-navy mb-5">
            Medical Travel <span className="text-gold-dark">Insights</span>
          </h2>
          <p className="text-navy/60 leading-relaxed mb-10 font-light">
            Receive destination guides, industry updates, and clinic spotlights
            directly to your inbox.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Enter your email"
              className="flex-1 px-5 py-3.5 bg-white rounded-xl text-navy text-sm border border-navy/[0.06] placeholder:text-navy/60 outline-none focus:border-gold/30 transition-colors"
            />
            <button
              type="submit"
              className="px-7 py-3.5 bg-teal-600 text-white text-sm font-semibold rounded-xl hover:bg-teal-500 transition-all duration-300 whitespace-nowrap tracking-wide shadow-lg shadow-teal-600/20"
            >
              Subscribe
            </button>
          </form>

          <p className="mt-4 text-xs text-navy/60">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
