import { setRequestLocale } from 'next-intl/server'
import { Breadcrumb } from '@/components/navigation/breadcrumb'
import { Button } from '@/components/ui/button'

interface ContactPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata() {
  return {
    title: 'Contact Us - Get in Touch',
    description: 'Have questions about medical tourism? Contact our team for personalized assistance with finding clinics, planning your trip, or partnership inquiries.',
  }
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb />

      <div className="mb-12">
        <h1 className="text-4xl font-bold text-neutral-900">Contact Us</h1>
        <p className="mt-4 text-lg text-neutral-600">
          Have questions? We&apos;re here to help. Reach out and our team will get back to you within 24 hours.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold text-neutral-900">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  Subject
                </label>
                <select className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
                  <option>General Inquiry</option>
                  <option>Help Finding a Clinic</option>
                  <option>Partnership / List My Clinic</option>
                  <option>Technical Support</option>
                  <option>Feedback</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  placeholder="How can we help you?"
                />
              </div>

              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Send Message
              </Button>
            </form>
          </div>
        </div>

        {/* Contact Info Sidebar */}
        <div className="space-y-6 lg:col-span-1">
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-neutral-900">Quick Contact</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-neutral-500">Email</p>
                <p className="text-neutral-900">hello@meditravel.com</p>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-500">Phone</p>
                <p className="text-neutral-900">+1 (800) 123-4567</p>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-500">Hours</p>
                <p className="text-neutral-900">24/7 Support Available</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-neutral-900">Office Location</h3>
            <p className="text-neutral-600">
              123 Healthcare Street<br />
              London, UK EC1A 1BB
            </p>
            <div className="mt-4 aspect-video rounded-lg bg-neutral-100" />
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-neutral-900">For Clinics</h3>
            <p className="mb-4 text-sm text-neutral-600">
              Interested in listing your clinic on MediTravel? We&apos;d love to partner with you.
            </p>
            <Button variant="outline" className="w-full">
              Partnership Inquiry
            </Button>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-neutral-900">AI Assistant</h3>
            <p className="mb-4 text-sm text-neutral-600">
              Need quick answers? Our AI voice assistant is available 24/7 to help with common questions.
            </p>
            <p className="text-xs text-neutral-400">
              Click the microphone icon in the bottom right corner to start.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
