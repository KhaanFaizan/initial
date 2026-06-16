import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

export default function AuditSection() {
  return (
    <section className="w-full bg-transparent text-white py-24 px-6 flex justify-center">
      <div className="max-w-6xl w-full text-center">

        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold mb-2">
          Audited For Resilience
        </h2>

        <p className="mt-5 text-[#b9e5dd] text-sm md:text-base mb-14">
          Our $OZ token and core smart contracts are audited by<br />
          security experts Certik and Sherlock.
        </p>

        {/* Card Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* CARD 1 — CERTIK */}
          <div className="
            glass-panel
            border border-white/10 
            rounded-2xl 
            p-8 
            backdrop-blur-2xl
            shadow-[0px_0px_50px_-10px_rgba(2,12,16,0.7)]
            text-left
          ">
            
            <div className="flex justify-between items-start">
              <img
                src="/audit/certik-logo-full.png"
                alt="Certik"
                className="h-6 opacity-90"
              />
              <FiArrowUpRight className="text-[#8fb6ad] text-lg cursor-pointer hover:text-[var(--accent-mint)] transition" onClick={() => window.open("https://docs.ozak.ai/Contract-Audits/", "_blank")} />
            </div>

            <h3 className="mt-6 text-xl font-semibold">
              Certik Security Audit
            </h3>

            <p className="text-sm text-[#b9e5dd] leading-relaxed mt-3">
              We have been audited by Certik to enhance our smart contract 
              security, ensuring Ozak AI is protected by Certik’s world-class 
              security.
            </p>

            <span className="
              inline-block 
              mt-6 
              text-xs 
              bg-[var(--accent-mint)]/10 
              text-[var(--accent-mint)] 
              px-4 py-1 
              rounded-full 
              border border-[var(--accent-mint)]/30
            ">
              Completed
            </span>
          </div>

          {/* CARD 2 — SHERLOCK */}
          <div className="
            glass-panel
            border border-white/10 
            rounded-2xl 
            p-8 
            backdrop-blur-2xl
            shadow-[0px_0px_50px_-10px_rgba(2,12,16,0.7)]
            text-left
          ">
            
            <div className="flex justify-between items-start">
              <img
                src="/audit/sherlock.png"
                alt="Sherlock"
                className="h-6 opacity-90"
              />
              <FiArrowUpRight className="text-[#8fb6ad] text-lg cursor-pointer hover:text-[var(--accent-mint)] transition" onClick={() => window.open("https://docs.ozak.ai/Contract-Audits/", "_blank")} />
            </div>

            <h3 className="mt-6 text-xl font-semibold">
              Sherlock Security Audit
            </h3>

            <p className="text-sm text-[#b9e5dd] leading-relaxed mt-3">
              The Sherlock team conducted an exhaustive audit using advanced 
              tools to identify and address any potential vulnerabilities.
            </p>

            <span className="
              inline-block 
              mt-6 
              text-xs 
              bg-[var(--accent-mint)]/10 
              text-[var(--accent-mint)] 
              px-4 py-1 
              rounded-full 
              border border-[var(--accent-mint)]/30
            ">
              Completed
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}