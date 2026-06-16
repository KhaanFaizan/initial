import React from "react";

export default function Tokenomics() {
  return (
    <section className="relative w-full py-32 bg-[rgba(3,18,24,0.95)] text-white overflow-hidden">
      {/* Radial Glowing Background */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(111,248,213,0.3)_0%,rgba(3,18,24,1)_70%)] opacity-40 blur-3xl"></div>
      </div>

      {/* Title */}
      <div className="text-center relative z-10">
        <p className="text-[var(--accent-mint)] text-xl tracking-wider mb-2">
          $OZ Token Distribution
        </p>
        <h2 className="mt-8 text-4xl md:text-5xl font-bold">Tokenomics</h2>
      </div>

      {/* Center Wrapper */}
      <div className="relative w-full flex justify-center mt-16 z-10">

        {/* Big Center Circle */}
        <div className="relative sm:w-[320px] lg:w-[550px] sm:h-[320px] lg:h-[550px] rounded-full 
        bg-[radial-gradient(circle,rgba(111,248,213,0.25)_0%,rgba(3,15,20,1)_70%)] 
        flex items-center justify-center border border-white/5 shadow-[0_0_80px_rgba(3,10,15,0.9)]">

          {/* Center Logo */}
          <img src="/ozak-logo-gradient.png" alt="center" className="sm:w-55 lg:w-44 opacity-95" />

          {/* TOKEN SUPPLY */}
          <div className="hidden absolute lg:block -top-10 glass-panel
          px-6 py-3 rounded-xl border border-white/15 shadow-lg text-center">
            <p className="text-xl text-white">Token Supply</p>
            <p className="text-[var(--accent-mint)] font-bold text-2xl">10 Billion $OZ</p>
          </div>

          {/* Four floating cards */}
          <div className="hidden absolute lg:block -left-56 top-20 glass-panel px-6 py-4 rounded-xl border border-white/10 w-64">
            <p className="text-xl text-white">Presale</p>
            <p className="text-[var(--accent-mint)] font-bold text-2xl">30%</p>
            <div className="h-[3px] bg-white/10 mt-2">
              <div className="h-full w-[30%] bg-gradient-to-r from-[#4cf5c8] to-[#b6ff39]"></div>
            </div>
          </div>

          <div className="hidden absolute lg:block -right-56 top-20 glass-panel px-6 py-4 rounded-xl border border-white/10 w-64">
            <p className="text-xl text-white">Liquidity & Listings</p>
            <p className="text-[var(--accent-mint)] font-bold text-2xl">10%</p>
            <div className="h-[3px] bg-white/10 mt-2">
              <div className="h-full w-[10%] bg-gradient-to-r from-[#4cf5c8] to-[#b6ff39]"></div>
            </div>
          </div>

          <div className="hidden absolute lg:block -left-56 bottom-20 glass-panel px-6 py-4 rounded-xl border border-white/10 w-64">
            <p className="text-sl text-white">Ecosystem & Community</p>
            <p className="text-[var(--accent-mint)] font-bold text-2xl">30%</p>
            <div className="h-[3px] bg-white/10 mt-2">
              <div className="h-full w-[30%] bg-gradient-to-r from-[#4cf5c8] to-[#b6ff39]"></div>
            </div>
          </div>

          <div className="hidden absolute lg:block -right-56 bottom-20 glass-panel px-6 py-4 rounded-xl border border-white/10 w-64">
            <p className="text-xl text-white">Team</p>
            <p className="text-[var(--accent-mint)] font-bold text-2xl">10%</p>
            <div className="h-[3px] bg-white/10 mt-2">
              <div className="h-full w-[10%] bg-gradient-to-r from-[#4cf5c8] to-[#b6ff39]"></div>
            </div>
          </div>

          {/* Bottom card */}
          <div className="hidden absolute lg:block bottom-[-60px] glass-panel px-6 py-4 rounded-xl border border-white/10 w-64">
            <p className="text-xl text-white">Future Reserve</p>
            <p className="text-[var(--accent-mint)] font-bold text-2xl">20%</p>
            <div className="h-[3px] bg-white/10 mt-2">
              <div className="h-full w-[20%] bg-gradient-to-r from-[#4cf5c8] to-[#b6ff39]"></div>
            </div>
          </div>

        </div>
      </div>

      {/* Center Wrapper For Mobile*/}
      <div className="w-full flex flex-col justify-center items-center mt-16 z-10">

          {/* TOKEN SUPPLY */}
          <div className="block lg:hidden glass-panel
          px-6 py-3 rounded-xl border border-white/15 shadow-lg text-center w-64">
            <p className="text-xl text-white">Token Supply</p>
            <p className="text-[var(--accent-mint)] font-bold text-2xl">10 Billion $OZ</p>
          </div>

          {/* Four floating cards */}
          <div className="block lg:hidden glass-panel px-6 py-4 rounded-xl border border-white/10 w-64 mt-8">
            <p className="text-xl text-white">Presale</p>
            <p className="text-[var(--accent-mint)] font-bold text-2xl">30%</p>
            <div className="h-[3px] bg-white/10 mt-2">
              <div className="h-full w-[30%] bg-gradient-to-r from-[#4cf5c8] to-[#b6ff39]"></div>
            </div>
          </div>

          <div className="block lg:hidden glass-panel px-6 py-4 rounded-xl border border-white/10 w-64 mt-8">
            <p className="text-xl text-white">Liquidity & Listings</p>
            <p className="text-[var(--accent-mint)] font-bold text-2xl">10%</p>
            <div className="h-[3px] bg-white/10 mt-2">
              <div className="h-full w-[10%] bg-gradient-to-r from-[#4cf5c8] to-[#b6ff39]"></div>
            </div>
          </div>

          <div className="block lg:hidden glass-panel px-6 py-4 rounded-xl border border-white/10 w-64 mt-8">
            <p className="text-sl text-white">Ecosystem & Community</p>
            <p className="text-[var(--accent-mint)] font-bold text-2xl">30%</p>
            <div className="h-[3px] bg-white/10 mt-2">
              <div className="h-full w-[30%] bg-gradient-to-r from-[#4cf5c8] to-[#b6ff39]"></div>
            </div>
          </div>

          <div className="block lg:hidden glass-panel px-6 py-4 rounded-xl border border-white/10 w-64 mt-8">
            <p className="text-xl text-white">Team</p>
            <p className="text-[var(--accent-mint)] font-bold text-2xl">10%</p>
            <div className="h-[3px] bg-white/10 mt-2">
              <div className="h-full w-[10%] bg-gradient-to-r from-[#4cf5c8] to-[#b6ff39]"></div>
            </div>
          </div>

          {/* Bottom card */}
          <div className="block lg:hidden glass-panel px-6 py-4 rounded-xl border border-white/10 w-64 mt-8">
            <p className="text-xl text-white">Future Reserve</p>
            <p className="text-[var(--accent-mint)] font-bold text-2xl">20%</p>
            <div className="h-[3px] bg-white/10 mt-2">
              <div className="h-full w-[20%] bg-gradient-to-r from-[#4cf5c8] to-[#b6ff39]"></div>
            </div>
          </div>

      </div>

      {/* Contract Address */}
      <div className="text-center mt-28 relative z-10">
        <p className="text-[#9fc4bb] lg:text-xl">Presale Contract Address</p>
        <p className="text-[var(--accent-mint)] font-mono text-sm sm:text-md lg:text-2xl">
          <a href="https://etherscan.io/address/0xc73a02c63277fc12f28ae6d78bd7e1b6b425911b" target="_blank">0xC73a02c63277fc12F28Ae6D78bD7E1B6b425911B</a>
        </p>
      </div>

      {/* Vesting */}
      <div className="text-center mt-4 text-xl text-[#8fb6ad]">
        Presale Vesting Schedule
      </div>
      <div className="text-center mt-4 text-xl text-[#8fb6ad]">
        <a className="text-white" href="https://docs.ozak.ai/The-OZ-Token/" target="_blank">10% unlock at listing, 1 month cliff, then 6 months linear vesting</a>
      </div>
    </section>
  );
}