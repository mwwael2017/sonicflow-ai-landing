import FaqSection from "@/components/FaqSection";
import FeaturesBento from "@/components/FeaturesBento";
import FooterSection from "@/components/FooterSection";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import PricingSection from "@/components/PricingSection";
import SocialProof from "@/components/SocialProof";
import TrialModal from "@/components/TrialModal";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-surface text-on-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div className="absolute start-[-16rem] top-[-12rem] size-160 rounded-full bg-primary/6 blur-[180px]" />

        <div className="absolute end-[-18rem] top-[28%] size-160 rounded-full bg-secondary/6 blur-[190px]" />

        <div className="absolute bottom-[-18rem] start-[26%] size-160 rounded-full bg-tertiary/5 blur-[190px]" />
      </div>

      <Navbar />

      <main className="relative z-10">
        <HeroSection />
        <SocialProof />
        <FeaturesBento />
        <PricingSection />
        <FaqSection />
        <FooterSection />
      </main>

      <TrialModal />
    </div>
  );
}