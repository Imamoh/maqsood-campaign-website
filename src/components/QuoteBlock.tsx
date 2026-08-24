import { campaign } from "@/data/campaign";

/**
 * The candidate's own words. Framed as a statement from Maqsood — deliberately
 * not styled as a third-party endorsement or testimonial.
 */
export function QuoteBlock() {
  const { quote, candidate } = campaign;

  return (
    <section aria-labelledby="quote-heading" className="border-y border-rule bg-cream-deep">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-20">
        <h2 id="quote-heading" className="label-mono text-civic-deep">
          In his own words
        </h2>
        <span aria-hidden="true" className="transit-rule mt-3 mb-7 max-w-[120px] text-civic" />
        <figure>
          <blockquote>
            <p
              className="text-[clamp(1.35rem,3.1vw,2.05rem)] leading-[1.3] font-medium text-navy"
              style={{ fontFamily: "var(--font-display)" }}
            >
              &ldquo;{quote.text}&rdquo;
            </p>
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3 border-t border-rule pt-5">
            <span aria-hidden="true" className="h-9 w-[3px] bg-signal" />
            <span>
              <span className="block font-semibold text-navy">{quote.attribution}</span>
              <span className="block text-[0.87rem] text-slate">
                {quote.attributionRole}
              </span>
            </span>
          </figcaption>
        </figure>
        <p className="sr-only">
          Statement by {candidate.name}, candidate for {candidate.office}.
        </p>
      </div>
    </section>
  );
}
