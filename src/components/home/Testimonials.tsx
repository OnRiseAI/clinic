import { Quote } from 'lucide-react'

const REVIEWS = [
    {
        text: "I saved over $15,000 on my dental work and had an amazing vacation in Turkey. The clinic was cleaner than any I've seen in the US.",
        author: "Sarah J.",
        location: "New York, USA",
        treatment: "Dental Veneers, Turkey"
    },
    {
        text: "The AI concierge helped me find a specialist in Spain for my knee replacement. The process was seamless from start to finish.",
        author: "Michael R.",
        location: "London, UK",
        treatment: "Orthopedics, Spain"
    },
    {
        text: "Incredible experience. I was nervous about traveling for surgery, but the platform gave me all the confidence I needed.",
        author: "Emma L.",
        location: "Toronto, Canada",
        treatment: "Rhinoplasty, Mexico"
    }
]

export function Testimonials() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold tracking-tight text-center text-neutral-900 sm:text-4xl mb-16">
                    Patient Stories
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {REVIEWS.map((review, i) => (
                        <div key={i} className="relative bg-neutral-50 rounded-2xl p-8 pt-12">
                            <Quote className="absolute top-8 left-8 h-8 w-8 text-primary-200" />
                            <p className="relative z-10 text-neutral-700 text-lg leading-relaxed mb-6">
                                "{review.text}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-neutral-200 flex items-center justify-center text-lg font-bold text-neutral-500">
                                    {review.author[0]}
                                </div>
                                <div>
                                    <p className="font-semibold text-neutral-900">{review.author}</p>
                                    <p className="text-sm text-neutral-500">{review.treatment}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
