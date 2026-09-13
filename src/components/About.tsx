import Image from "next/image";
import { campaign } from "@/data/campaign";

export function About() {
  const { about, aboutImage, candidate } = campaign;

  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-24 border-b border-rule bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left rail */}
          <div>
            <p className="label-mono text-civic-deep">{about.kicker}</p>
            <span aria-hidden="true" className="transit-rule mt-3 mb-6 max-w-[140px] text-civic" />
            <h2 id="about-heading" className="display-lg">
              {about.heading}
            </h2>

            {/* Optional second photograph. Renders nothing until one exists —
                no broken image, no empty frame. */}
            {aboutImage.hasImage && (
              <div className="relative mt-8 aspect-[4/3] w-full overflow-hidden border border-navy/20">
                <Image
                  src={aboutImage.src}
                  alt={aboutImage.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 34vw"
                  style={{ objectFit: "cover", objectPosition: aboutImage.objectPosition }}
                />
              </div>
            )}

            <dl className="mt-8 border-t border-rule pt-6 text-[0.9rem]">
              <div className="flex justify-between gap-4 border-b border-rule py-2.5">
                <dt className="text-slate">Ward</dt>
                <dd className="text-right font-semibold text-navy">{candidate.wardLong}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-rule py-2.5">
                <dt className="text-slate">Seeking</dt>
                <dd className="text-right font-semibold text-navy">{candidate.office}</dd>
              </div>
              <div className="flex justify-between gap-4 py-2.5">
                <dt className="text-slate">Years in Ward 14</dt>
                <dd className="text-right font-semibold text-navy">25</dd>
              </div>
            </dl>
          </div>

          {/* Letter */}
          <div className="border-l-0 lg:border-l lg:border-rule lg:pl-16">
            <p className="mb-5 font-semibold text-navy">{about.salutation}</p>
            <div className="prose-campaign max-w-[62ch]">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#priorities" className="btn btn-outline">
                See the priorities
              </a>
              <a href="#your-voice" className="btn btn-navy">
                Share what matters to you
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
