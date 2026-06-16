import React from "react";
import { FaTelegramPlane, FaInstagram, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function CtaSection() {

  function CircleIcon({ href, icon }) {
    return (
      <a
        href={href}
        target="_blank"
        className="group w-14 h-14 rounded-full flex items-center justify-center 
                  glass-panel border border-white/10 hover:border-[var(--accent-mint)]
                  hover:shadow-[0_0_30px_rgba(111,248,213,0.35)]
                  transition-all duration-300 cursor-pointer
                  hover:scale-110"
      >
        <img
          src={icon}
          className="w-7 opacity-80 group-hover:opacity-100 transition"
          alt=""
        />
      </a>
    );
  }
  
  return (
    <section className="relative w-full flex justify-center py-20 px-6 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(111,248,213,0.18),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(182,255,57,0.15),transparent_60%)] opacity-60 pointer-events-none"></div>
      
      {/* Floating Left Coin */}
      <img
        src="/cta/token-left.png"
        className="hidden absolute lg:block left-5 top-10 w-36 animate-float-slow"
      />

      {/* Floating Right Coin */}
      <img
        src="/cta/token-right.png"
        className="hidden absolute lg:block right-5 bottom-5 w-40 animate-float-slow"
      />

      {/* Main CTA Box */}
      <div className="
          max-w-4xl w-full 
          glass-panel
          border border-white/10
          rounded-[40px]
          px-10 py-14
          text-center
          shadow-[0_0_80px_rgba(4,18,24,0.75)]
          overflow-hidden
      ">

        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Join The <span className="text-[var(--accent-mint)]">$OZ</span> Movement
        </h2>

        <p className="text-[#b9e5dd] text-sm md:text-base max-w-2xl mx-auto mb-10">
          Each purchase via your referral code EARNS YOU a 10% bonus.  
          Share more to earn more!
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-10">
          <button
            className="bg-gradient-to-r from-[#4cf5c8] via-[#6ff8d5] to-[#b6ff39] text-black font-semibold px-10 py-3 rounded-full shadow-[0_0_35px_rgba(111,248,213,0.35)] hover:brightness-110 transition"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Buy $OZ
          </button>

          <button
            className="bg-white/5 border border-white/20 text-white font-semibold px-10 py-3 rounded-full hover:border-[var(--accent-mint)] hover:bg-[var(--accent-mint)]/10 transition"
            onClick={() =>
              document.getElementById("referral").scrollIntoView({ behavior: "smooth" })
            }
          >
            Refer Now
          </button>
        </div>

        {/* Social Buttons */}
        <div className="flex justify-center gap-6 mt-6">
          <CircleIcon href="https://docs.ozak.ai/Contract-Audits/" icon="/hero/certik.svg" />
          <CircleIcon href="https://docs.ozak.ai/Contract-Audits/" icon="/hero/sherlock.svg" />
          <CircleIcon href="https://www.coingecko.com/en/coins/ozak-ai" icon="/hero/cg.svg" />
          <CircleIcon href="https://coinmarketcap.com/currencies/ozak-ai/" icon="/hero/cmc.svg" />
          <CircleIcon href="https://ozak.ai/whitepaper1.2.pdf" icon="/hero/whitepaper.svg" />
        </div>

      </div>

      {/* Floating animation */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
      `}</style>

    </section>
  );
}