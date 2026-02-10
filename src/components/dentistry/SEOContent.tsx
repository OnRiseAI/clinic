import { Info } from "lucide-react";

export default function SEOContent() {
  return (
    <section
      aria-labelledby="seo-content-heading"
      className="py-16 sm:py-20 bg-slate-50/70"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Medical disclaimer */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 mb-12 flex gap-3">
          <Info className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-500 leading-relaxed">
            This page may feature information relating to various medical
            conditions, treatments, and healthcare services available in
            different countries. Please be advised that the content is provided
            for informational purposes only and should not be construed as
            medical advice or guidance. Please consult with your doctor or a
            qualified medical professional before starting or changing medical
            treatment.
          </p>
        </div>

        <h2 id="seo-content-heading" className="sr-only">
          Dental treatment guide
        </h2>

        <div className="space-y-10">
          {/* Block 1 */}
          <article>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-200">
              What clinics are considered the best ones by international
              patients?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Top dental clinics in the world are listed on this page. The
              ranking is based on patient reviews, expert evaluations, and
              verified credentials. International patients consider these
              dental clinics among the best for several reasons:
            </p>
            <ul className="space-y-2 text-sm text-slate-600 leading-relaxed mb-4 list-disc pl-5">
              <li>
                <strong className="text-slate-800">
                  High-quality procedures.
                </strong>{" "}
                Specialists apply advanced dental services for treating teeth
                &mdash; including All-on-4, implant placement, and 3D
                modeling to show patients expected results before treatment.
              </li>
              <li>
                <strong className="text-slate-800">
                  Experienced dentists.
                </strong>{" "}
                Qualified specialists with over 15 years of experience who
                practice at internationally recognized centers and
                continuously improve their skills through global conferences.
              </li>
              <li>
                <strong className="text-slate-800">
                  Cost-effective dentistry.
                </strong>{" "}
                Prices for dental services at these centers are affordable due
                to local cost structures, while dental work quality meets
                international healthcare standards approved by the American
                Dental Association and equivalent bodies.
              </li>
            </ul>
          </article>

          {/* Block 2 */}
          <article>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-200">
              How to choose the best dental clinic?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              To pick the most appropriate dental care clinic, pay attention
              to the following factors:
            </p>
            <ul className="space-y-2 text-sm text-slate-600 leading-relaxed list-disc pl-5">
              <li>
                <strong className="text-slate-800">
                  Clinic&rsquo;s reputation.
                </strong>{" "}
                Most top dental clinics have obtained accreditations such as
                JCI, ISO 9001, or national equivalents confirming the safety
                and quality of dental services.
              </li>
              <li>
                <strong className="text-slate-800">
                  Dentists&rsquo; experience.
                </strong>{" "}
                Check specialists&rsquo; CVs. Look for doctors with years of
                experience in international medical institutions who continue
                their practice in top dental clinics.
              </li>
              <li>
                <strong className="text-slate-800">
                  Wide range of dental options.
                </strong>{" "}
                In the best dental clinics, all possible services are provided
                &mdash; from teeth whitening to dental implant surgeries,
                allowing comprehensive treatment in a single visit.
              </li>
              <li>
                <strong className="text-slate-800">
                  Patients&rsquo; reviews.
                </strong>{" "}
                Read real patient testimonials and check before &amp; after
                photos that patients have shared. This can help you evaluate
                the result you can expect after a dental procedure.
              </li>
            </ul>
          </article>

          {/* Block 3 */}
          <article>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-200">
              What procedures are applied in the best dental clinics in the
              world?
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 leading-relaxed list-disc pl-5">
              <li>
                <strong className="text-slate-800">Dental implants</strong>{" "}
                &mdash; lifetime prostheses used to fill toothless jaws.
                All-on-4/6/8 implant techniques are also available. A dentist
                inserts 4&ndash;8 dental implants into a jaw and a patient
                gets immediate result after implantation.
              </li>
              <li>
                <strong className="text-slate-800">Veneers</strong> &mdash;
                porcelain and composite materials to cover the front side of
                teeth. If a patient has gaps or discolored teeth, veneers are
                the best solution for a perfect smile.
              </li>
              <li>
                <strong className="text-slate-800">Crowns</strong> &mdash;
                dental caps to restore teeth that have been damaged due to
                decay or after root canal treatment. Available in zirconia,
                porcelain, or metal-fused options.
              </li>
              <li>
                <strong className="text-slate-800">Root canal</strong>{" "}
                &mdash; a procedure to save an infected or decayed tooth. A
                dentist removes a nerve and cleans the root canal to avoid
                more severe dental diseases such as endodontitis.
              </li>
              <li>
                <strong className="text-slate-800">Teeth whitening</strong>{" "}
                &mdash; a technique to make teeth whiter with UV/LED light or
                laser, achieving up to 8 shades brighter in a single session.
              </li>
              <li>
                <strong className="text-slate-800">Orthodontics</strong>{" "}
                &mdash; Invisalign clear aligners and traditional braces to
                correct misaligned teeth and bite issues. Treatment duration
                typically ranges from 6 to 24 months.
              </li>
            </ul>
          </article>

          {/* Block 4 */}
          <article>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-200">
              What diagnostics are used in top dental clinics?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              In the leading dental clinics listed on this page, you can find
              the following kinds of diagnostic systems:
            </p>
            <ul className="space-y-2 text-sm text-slate-600 leading-relaxed list-disc pl-5">
              <li>
                <strong className="text-slate-800">
                  Dental Cone Beam CT
                </strong>{" "}
                is used to produce 3-dimensional images of soft tissues,
                teeth, nerves, and bone to provide a more precise treatment
                plan.
              </li>
              <li>
                <strong className="text-slate-800">Panorex</strong>, an X-ray
                machine which provides precise panoramic images of the upper
                and lower jaws, essential for implant planning.
              </li>
              <li>
                <strong className="text-slate-800">3D modeling</strong> is
                used to create the most precise model of the patient&rsquo;s
                jaws to assign the most accurate treatment, including digital
                smile design.
              </li>
              <li>
                <strong className="text-slate-800">
                  Intraoral scanners
                </strong>{" "}
                replace traditional impressions with digital scans for
                crowns, veneers, and aligners &mdash; faster and more
                comfortable for patients.
              </li>
            </ul>
          </article>

          {/* Block 5 */}
          <article>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-200">
              How to book a top dental clinic through our platform?
            </h3>
            <ol className="space-y-2 text-sm text-slate-600 leading-relaxed list-decimal pl-5">
              <li>
                Submit a request on our website &mdash; our patient
                coordinator contacts you shortly and helps you select a dental
                center.
              </li>
              <li>
                Your medical records will be sent to a chosen clinic for a
                preliminary assessment.
              </li>
              <li>
                A doctor makes the initial treatment plan and provides a
                transparent cost estimate.
              </li>
              <li>
                If you approve the treatment plan, your coordinator arranges
                your dental trip. We support you 24/7 till the moment you come
                back home.
              </li>
            </ol>
            <p className="text-sm text-teal-700 font-medium mt-4">
              All coordinator services are free for patients.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
