import React from "react";
import { FiCopy } from "react-icons/fi";

export default function ReferralSection() {
  return (
    <section id="referral" className="w-full text-white flex justify-center px-8 md:px-24 lg:px-32 pt-28 pb-24 bg-[rgba(3,22,29,0.85)] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(111,248,213,0.15),transparent_50%),radial-gradient(circle_at_85%_30%,rgba(182,255,57,0.18),transparent_55%)] opacity-70 pointer-events-none"></div>
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* =====================
            LEFT  — TEXT + BUTTONS
           ===================== */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Refer And Earn <span className="text-[var(--accent-mint)]">10%</span>
          </h2>

          <p className="mt-6 text-lg text-[#cbe7df] max-w-md">
            Each purchase via your referral code EARNS YOU a 10% bonus in $OZ. 
            Share more to earn more!
          </p>

          {/* Input + Button Row */}
          <div className="mt-10 flex flex-col md:flex-row items-center gap-6">
            
            {/* Referral Code Box */}
            <div className="mt-10 glass-panel px-5 py-4 rounded-full border border-white/15 shadow-[0_0_35px_rgba(111,248,213,0.25)]">
              <p className="text-xl font-semibold">
                Your Referral Code: <span className="text-[var(--accent-mint)]">NA</span>
              </p>
            </div>

            {/* Connect Button */}
            <button className="border border-[var(--accent-mint)] text-[var(--accent-mint)] font-semibold text-xl py-4 px-5 rounded-full mt-10 shadow-[0_0_25px_rgba(111,248,213,0.35)] hover:bg-[var(--accent-mint)]/10 transition-all duration-300">
              Connect Wallet
            </button>
          </div>
        </div>

        {/* =====================
            RIGHT — 3D IMAGE AREA
           ===================== */}
        <div className="relative flex justify-center items-center">
          
          {/* Vault Image */}
          <video
            src="/referral/vault.webm"
            autoPlay
            loop
            muted
            playsInline
            className="
              w-72 sm:w-80 md:w-96 lg:w-[480px] xl:w-[520px]
              drop-shadow-[0_0_45px_rgba(111,248,213,0.4)]
              animate-float
            "
          ></video>

        </div>
      </div>

      {/* Floating Animation */}
      <style>{`
        @keyframes float {
          0%   { transform: translateY(0px); }
          50%  { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 3.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}