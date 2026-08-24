import { Hero } from "@/components/Hero";
import { QuickActions } from "@/components/QuickActions";
import { About } from "@/components/About";
import { Priorities } from "@/components/Priorities";
import { QuoteBlock } from "@/components/QuoteBlock";
import { ListeningForm } from "@/components/ListeningForm";
import { GetInvolved } from "@/components/GetInvolved";
import { ElectionReminder } from "@/components/ElectionReminder";
import { Contact } from "@/components/Contact";
import { MobileActionBar } from "@/components/MobileActionBar";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickActions />
      <About />
      <Priorities />
      <QuoteBlock />
      <ListeningForm />
      <GetInvolved />
      <ElectionReminder />
      <Contact />
      {/* Rendered only on the landing page, never on /privacy or /accessibility */}
      <MobileActionBar />
    </>
  );
}
