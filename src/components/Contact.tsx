import { Mail, MapPin } from "lucide-react";
import { campaign } from "@/data/campaign";
import { MeetingLink } from "./MeetingLink";

export function Contact() {
  const { contact, candidate } = campaign;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 border-t border-rule bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <div>
          <p className="label-mono text-civic-deep">Contact the campaign</p>
          <span aria-hidden="true" className="transit-rule mt-3 mb-6 max-w-[140px] text-civic" />
          <h2 id="contact-heading" className="display-lg">
            Get in touch about Ward 14.
          </h2>
          <p className="lede mt-4 max-w-[46ch]">
            A neighbourhood concern, an offer to help, or an invitation to a community meeting —
            all of it reaches me at the same address.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={`mailto:${contact.email}`} className="btn btn-primary">
              Email the campaign
            </a>
            <MeetingLink className="btn btn-outline" />
          </div>
        </div>

        <dl className="border-t border-rule">
          <div className="flex items-start gap-4 border-b border-rule py-5">
            <Mail size={18} aria-hidden="true" className="mt-1 shrink-0 text-civic" />
            <div>
              <dt className="label-mono text-slate">Email</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${contact.email}`}
                  className="font-semibold break-all text-navy underline underline-offset-2 hover:text-civic-deep"
                >
                  {contact.email}
                </a>
              </dd>
            </div>
          </div>
          <div className="flex items-start gap-4 py-5">
            <MapPin size={18} aria-hidden="true" className="mt-1 shrink-0 text-civic" />
            <div>
              <dt className="label-mono text-slate">Ward</dt>
              <dd className="mt-1 font-semibold text-navy">{candidate.wardLong}</dd>
            </div>
          </div>
        </dl>
      </div>
    </section>
  );
}
