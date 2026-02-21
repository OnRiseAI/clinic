'use client'

import { motion } from 'framer-motion'

const reviews = [
  {
    text: "I saved over $15,000 on my dental work and had an amazing vacation in Turkey. The clinic was cleaner than any I've seen in the US.",
    author: 'Sarah J.',
    treatment: 'Dental Veneers \u00B7 Turkey',
    rating: 5,
  },
  {
    text: 'The AI concierge helped me find a specialist in Spain for my knee replacement. The process was seamless from start to finish.',
    author: 'Michael R.',
    treatment: 'Orthopedics \u00B7 Spain',
    rating: 5,
  },
  {
    text: 'Incredible experience. I was nervous about traveling for surgery, but the platform gave me all the confidence I needed.',
    author: 'Emma L.',
    treatment: 'Rhinoplasty \u00B7 Mexico',
    rating: 5,
  },
  {
    text: "Found my hair transplant clinic in Istanbul within minutes. Price was a fraction of what I was quoted in London. Couldn't be happier.",
    author: 'James T.',
    treatment: 'Hair Transplant \u00B7 Turkey',
    rating: 5,
  },
  {
    text: 'As a nurse, I was skeptical. But after researching the clinics on this platform, I felt confident. The accreditation details made all the difference.',
    author: 'Lisa M.',
    treatment: 'IVF Treatment \u00B7 Spain',
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold text-navy/40 uppercase tracking-[0.2em] mb-4">
            Feedback
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-navy mb-5">
            Patient <span className="text-teal-600">Experiences</span>
          </h2>
          <p className="text-navy/60 max-w-lg mx-auto leading-relaxed font-light">
            Insights from patients who have used our directory to find care.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((review, i) => (
            <motion.div
              key={review.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgba(15,27,45,0.04)] ring-1 ring-slate-900/5 border border-transparent transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,27,45,0.08)] hover:border-gold/30"
            >
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-navy/60 text-[15px] leading-relaxed mb-6">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-navy/[0.06] flex items-center justify-center text-sm font-bold text-navy/60">
                  {review.author[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">{review.author}</p>
                  <p className="text-xs text-navy/60">{review.treatment}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom row - 2 testimonials centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-6">
          {reviews.slice(3).map((review, i) => (
            <motion.div
              key={review.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: (i + 3) * 0.1,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgba(15,27,45,0.04)] ring-1 ring-slate-900/5 border border-transparent transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,27,45,0.08)] hover:border-gold/30"
            >
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-navy/60 text-[15px] leading-relaxed mb-6">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-navy/[0.06] flex items-center justify-center text-sm font-bold text-navy/60">
                  {review.author[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">{review.author}</p>
                  <p className="text-xs text-navy/60">{review.treatment}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
