'use client'

import { motion } from 'framer-motion'

export function ConciergeCTA() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-medium text-gold uppercase tracking-[0.2em] mb-4">
              AI-Powered
            </p>
            <h2 className="heading-serif text-3xl sm:text-4xl md:text-5xl text-navy mb-5">
              Not sure where to start?{' '}
              <span className="gradient-text">Talk to our AI Concierge</span>
            </h2>
            <p className="text-navy/40 max-w-lg leading-relaxed mb-8">
              Our advanced AI advisor knows every clinic, treatment, and regulation.
              Tell it what you need in plain language and get personalised
              recommendations instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-navy text-white text-sm font-semibold rounded-xl hover:bg-navy-light transition-all duration-300 tracking-wide">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
                Speak to Advisor
              </button>
              <button className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 border border-navy/10 text-navy text-sm font-semibold rounded-xl hover:border-navy/20 hover:bg-white transition-all duration-300 tracking-wide">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
                Start Chat
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-2xl border border-navy/[0.04] shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden"
          >
            {/* Chat header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-navy/[0.04] bg-navy/[0.02]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-navy">AI Concierge</p>
                <p className="text-[11px] text-teal">Online</p>
              </div>
            </div>

            {/* Chat messages */}
            <div className="p-6 space-y-4">
              <div className="flex justify-end">
                <div className="bg-navy text-white text-sm px-4 py-3 rounded-2xl rounded-br-md max-w-[80%]">
                  I need dental veneers but I&apos;m not sure which country is best for me.
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-navy/[0.04] text-navy text-sm px-4 py-3 rounded-2xl rounded-bl-md max-w-[80%]">
                  Based on your budget and preferences, I&apos;d recommend Turkey or Mexico. Turkey offers the best value starting at &euro;280/tooth with JCI-accredited clinics. Shall I show you top-rated options?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-navy text-white text-sm px-4 py-3 rounded-2xl rounded-br-md max-w-[80%]">
                  Yes, show me Turkey options!
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
