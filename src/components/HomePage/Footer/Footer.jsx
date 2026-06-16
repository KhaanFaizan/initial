import React from "react";
import { FiSend, FiInstagram, FiArrowUpRight } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[rgba(3,20,24,0.95)] text-white pt-20 pb-10 px-6 relative overflow-hidden">

      <div className="max-w-7xl mx-auto">

        {/* 🔹 TOP ROW */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">

          {/* ---- NEWSLETTER ---- */}
          <div>
            <img src="/stardust-logo.svg" alt="Ozora AI" className="mb-6 h-8 md:h-12 lg:h-14 w-auto select-none" />

            <p className="text-[#b9e5dd] leading-relaxed mb-6">
              Subscribe to our newsletter to get the latest updates on everything Ozak AI
            </p>

            {/* Email Input */}
            <div className="flex items-center glass-panel border border-white/15 rounded-full px-4 py-2 w-full max-w-sm">
              <input
                type="email"
                placeholder="Email address"
                className="bg-transparent outline-none flex-1 text-sm text-white"
              />
              <button className="bg-gradient-to-r from-[#4cf5c8] to-[#b6ff39] text-black rounded-full p-2 hover:brightness-110 transition shadow-[0_0_25px_rgba(111,248,213,0.35)]">
                <FiArrowUpRight className="text-lg" />
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6 text-2xl text-[#cbe7df]">
              <a className="hover:text-[var(--accent-mint)] transition"><FaXTwitter /></a>
              <a className="hover:text-[var(--accent-mint)] transition"><FiSend /></a>
              <a className="hover:text-[var(--accent-mint)] transition"><FiInstagram /></a>
              <a className="hover:text-[var(--accent-mint)] transition"><img src="/hero/cmc.svg" className="w-7 h-7 object-contain" /></a>
              <a className="hover:text-[var(--accent-mint)] transition"><img src="/hero/cg.svg" className="w-7 h-7 object-contain" /></a>
              <a className="hover:text-[var(--accent-mint)] transition"><img src="/icons/iqwiki.svg" className="w-7 h-7 object-contain" /></a>
              <a className="hover:text-[var(--accent-mint)] transition"><img src="/icons/linktree-logo.svg" className="w-7 h-7 object-contain" /></a>
            </div>
          </div>

          {/* ---- QUICK LINKS ---- */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-[#b9e5dd]">
              <li><a className="hover:text-white">Presale</a></li>
              <li><a className="hover:text-white">Predictive AI</a></li>
              <li><a className="hover:text-white">Buy $OZ</a></li>
              <li><a className="hover:text-white">Whitepaper</a></li>
              <li><a className="hover:text-white">Tokenomics</a></li>
              <li><a className="hover:text-white">Roadmap</a></li>
            </ul>
          </div>

          {/* ---- AI AGENTS ---- */}
          <div>
            <h3 className="text-lg font-semibold mb-4">AI Agents</h3>
            <ul className="space-y-3 text-[#b9e5dd]">
              <li><a className="hover:text-white">For Individuals</a></li>
              <li><a className="hover:text-white">For Business</a></li>
              <li><a className="hover:text-white">DePIN</a></li>
              <li><a className="hover:text-white">Join Waitlist</a></li>
            </ul>
          </div>

          {/* ---- EXTRAS ---- */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Extras</h3>
            <ul className="space-y-3 text-[#b9e5dd]">
              <li><a className="hover:text-white">Media Kit</a></li>
              <li><a className="hover:text-white">Blogs</a></li>
              <li><a className="hover:text-white">Documentation</a></li>
              <li><a className="hover:text-white">Support</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-14 h-px bg-white/10"></div>

        {/* ---- COPYRIGHT ---- */}
        <div className="text-center text-[#8fb6ad] text-sm">
          © {new Date().getFullYear()} OZAK AI. All rights reserved.
        </div>
      </div>

      {/* ---- BACK TO TOP ---- */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="bottom-6 left-6 bg-white/10 text-white px-4 py-2 rounded-full text-sm hover:bg-white/20 transition border border-white/15 shadow-[0_0_25px_rgba(2,12,16,0.4)]"
      >
        ↑ Back to Top
      </button>

    </footer>
  );
}