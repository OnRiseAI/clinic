'use client'

export function PlatformStructureSection() {
    return (
        <section className="py-24 lg:py-32 bg-white border-b border-navy/[0.03]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
                    <span className="text-xs font-bold tracking-[0.2em] text-navy/40 mb-6 uppercase">
                        Platform Structure
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif text-navy mb-6 tracking-tight">
                        How MeetYourClinic Works
                    </h2>
                    <p className="text-lg text-navy/60 font-light max-w-xl">
                        A structured approach to international healthcare decisions.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12 lg:gap-16 items-start">
                    {/* Column 1 */}
                    <div className="flex flex-col border-t border-navy/10 pt-8">
                        <h3 className="text-xl font-serif text-navy mb-4">Verified Clinics</h3>
                        <p className="text-navy/60 leading-relaxed font-light text-sm">
                            Every clinic undergoes structured review across accreditation, safety standards, and outcomes.
                        </p>
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col border-t border-navy/10 pt-8">
                        <h3 className="text-xl font-serif text-navy mb-4">Transparent Comparisons</h3>
                        <p className="text-navy/60 leading-relaxed font-light text-sm">
                            Compare procedures, pricing structures, and locations clearly — without hidden marketing bias.
                        </p>
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col border-t border-navy/10 pt-8">
                        <h3 className="text-xl font-serif text-navy mb-4">Direct Connection</h3>
                        <p className="text-navy/60 leading-relaxed font-light text-sm">
                            Connect directly with clinics or request guided support through our concierge team.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
