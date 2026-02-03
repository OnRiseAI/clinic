'use client'

import { Button } from '@/components/ui/button'
import { Mail, ArrowRight } from 'lucide-react'

export function Newsletter() {
    return (
        <section className="py-24 bg-neutral-50 border-t border-neutral-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="mx-auto mb-6 h-12 w-12 flex items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                        <Mail className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                        Stay Updated on Medical Travel
                    </h2>
                    <p className="mt-4 text-lg text-neutral-600">
                        Get the latest insights, destination guides, and exclusive offers delivered to your inbox.
                    </p>
                    <form className="mt-10 flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            required
                            placeholder="Enter your email address"
                            className="min-w-0 flex-auto rounded-xl border-0 bg-white px-4 py-3.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        />
                        <Button size="lg" className="flex-none rounded-xl h-auto py-3">
                            Subscribe
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </form>
                    <p className="mt-4 text-sm text-neutral-500">
                        We care about your data in our privacy policy. No spam, ever.
                    </p>
                </div>
            </div>
        </section>
    )
}
