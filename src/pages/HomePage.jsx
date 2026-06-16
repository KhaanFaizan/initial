import { useState } from "react";
import Header from "../components/HomePage/Header/Header";
import HeroSection from "../components/HomePage/Hero/HeroSection";
import StepsSection from "../components/HomePage/Steps/StepsSection";
import ReferralSection from "../components/HomePage/Referral/ReferralSection";
import AuditsSection from "../components/HomePage/Audits/AuditsSection";
import Tokenomics from "../components/HomePage/Tokenomics/Tokenomics";
import TokenUtility from "../components/HomePage/Utility/TokenUtility";
import Partnerships from "../components/HomePage/Partners/Partnerships";
import FAQSection from "../components/HomePage/FAQ/FAQSection";
import CTASection from "../components/HomePage/CTA/CTASection";
import Footer from "../components/HomePage/Footer/Footer";
import StickyTelegram from "../components/StickyTelegram";

export default function HomePage() {
  const [openWallet, setOpenWallet] = useState(false);

  return (
    <>
      <Header onConnectWallet={() => setOpenWallet(true)} />
      <HeroSection openWallet={openWallet} setOpenWallet={setOpenWallet} />
      <StepsSection />
      <ReferralSection />
      <AuditsSection />
      <Tokenomics />
      <TokenUtility />
      <Partnerships />
      <FAQSection />
      <CTASection />
      <Footer />
      <StickyTelegram />
    </>
  );
}
