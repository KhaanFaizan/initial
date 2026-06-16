import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "When will I receive my $OZ tokens?",
      a: "Your allocation appears instantly on the dashboard after you complete a purchase. You’ll be able to claim those tokens on-chain right after the presale ends and we reach TGE. The exact TGE date will be announced well in advance, and a one-click “Claim” button will go live on the dashboard.",
    },
    {
      q: "How do I add $OZ to MetaMask?",
      a: "You can’t add $OZ to MetaMask (or any other wallet) just yet because the token contract doesn’t deploy until TGE. As soon as the contract is live we’ll publish the official address and a step-by-step import guide for MetaMask and other wallets.",
    },
    {
      q: "How does the referral bouns work?",
      a: "Copy your unique referral link from the dashboard. Anyone who buys through that link earns you an extra 10% of their purchase, credited instantly to your dashboard balance. Your bonus unlocks alongside your own tokens at TGE.",
    },
    {
      q: "Is there a minimum or maximum purchase?",
      a: "There’s no strict maximum or minimum, but if your order pushes the phase beyond its cap, the excess amount will execute at the next-phase price.",
    },
    {
      q: "How have prices changed across phases?",
      a: "Phase 1 - $0.001 &br Phase 2 - $0.002 &br Phase 3 - $0.003 &br Phase 4 - $0.005 &br Phase 5 - $0.010 &br Phase 6 - $0.012 &br Each phase closes automatically once its supply cap is sold.",
    },
    {
      q: "Can I track presale progress in real time?",
      a: "Yes - the buy page shows a live phase tracker and a “tokens remaining” bar so you always know how close we are to the next price tier.",
    },
    {
      q: "Do I need to complete KYC for the presale?",
      a: "No KYC is required to participate in the presale. You may, however, need KYC when trading on certain exchanges after listing.",
    },
    {
      q: "When and where will $OZ be listed?",
      a: "Listings will launch immediately after TGE. We’re finalising agreements with a top-tier centralised exchange and a leading Ethereum-based DEX. Exact trading pairs and go-live times will be shared 7–10 days before TGE via our website, X, and Telegram.",
    },
    {
      q: "What is the official $OZ token contract address?",
      a: "The contract will be deployed at TGE. We’ll publish the verified address simultaneously across all official channels. Until then, ignore any contract claiming to be $OZ.",
    },
    {
      q: "Can't find your tokens?",
      a: "Go to https://app.ozak.ai/overview using the same wallet you used for the presale to view your $OZ balance in real time. Once the presale ends and the Token Generation Event (TGE) begins, a Claim button will appear beside your balance. Click it, select any compatible wallet, and your tokens will transfer on-chain in one transaction. If your tokens are not showing, make sure your presale transaction shows “Success” on the relevant block explorer and that you are connected with the same wallet address used for the purchase. For help, visit https://docs.ozak.ai/Cant-find-your-OZ-tokens or email support@ozak.ai.",
    },
    {
      q: "Still have questions?",
      a: "Reach us at support@ozak.ai.",
    },
  ];

  const toggleFAQ = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="py-24 px-6 bg-transparent text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(111,248,213,0.16),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(182,255,57,0.15),transparent_55%)] opacity-70 pointer-events-none"></div>
      <div className="max-w-5xl mx-auto text-center relative z-10">

        {/* Section Title */}
        <h2 className="text-[var(--accent-mint)] tracking-wider text-2xl mb-2">
          FAQ's
        </h2>

        <h3 className="mt-8 text-3xl md:text-5xl font-bold mb-14">
          Your Questions, Answered
        </h3>

        {/* FAQ List */}
        <div className="space-y-4 text-left">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="glass-panel border border-white/10 rounded-xl p-5 md:p-6 backdrop-blur-xl hover:border-[var(--accent-mint)] transition"
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="text-lg font-medium text-white">
                  {item.q}
                </span>

                {openIndex === i ? (
                  <FiMinus className="text-[var(--accent-mint)] text-xl" />
                ) : (
                  <FiPlus className="text-[var(--accent-mint)] text-xl" />
                )}
              </button>

              {/* Answer */}
              {openIndex === i && (
                <p className="mt-4 text-[#b9e5dd] text-sm leading-relaxed">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}