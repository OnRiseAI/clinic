import { ShieldCheck, Globe, Users, HeartHandshake } from 'lucide-react'

const TRUST_ITEMS = [
    { icon: Users, label: '1,000+ Clinics' },
    { icon: Globe, label: '10+ Countries' },
    { icon: ShieldCheck, label: 'Verified Partners' },
    { icon: HeartHandshake, label: '24/7 Support' },
]

export function TrustBar() {
    return (
        <div className="border-y border-neutral-100 bg-white/50 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 py-8 md:justify-around">
                    {TRUST_ITEMS.map((item) => (
                        <div key={item.label} className="flex items-center gap-3 text-neutral-600">
                            <item.icon className="h-5 w-5 text-primary-600" />
                            <span className="font-medium">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
