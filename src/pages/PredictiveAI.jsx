
import Header from "../components/HomePage/Header/Header";
import HeroPredictive from "../components/Predictive/HeroPredictive";
import AgentsSection from "../components/Predictive/AgentsSection";
import TimelineSection from "../components/Predictive/TimelineSection";
import InfrastructureSection from "../components/Predictive/InfrastructureSection";
import PartnersSection from "../components/Predictive/PartnersSection";
import IntegratedSection from "../components/Predictive/IntegratedSection";
import CTASection from "../components/HomePage/CTA/CTASection";
import Footer from "../components/HomePage/Footer/Footer";
import StickyTelegram from "../components/StickyTelegram";

export default function PredictiveAI() {
  return (
    <div className="bg-transparent text-white">
      <Header />
      <HeroPredictive />
      <AgentsSection />
      <TimelineSection />
      <InfrastructureSection />
      <IntegratedSection />
      <PartnersSection />
      <CTASection />
      <Footer />
      <StickyTelegram />
    </div>
  );
}