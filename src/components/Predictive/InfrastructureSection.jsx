import { useState } from "react";

export default function InfrastructureSection() {
  const [tab, setTab] = useState("individuals");

  function Card({ img, title, desc }) {
    return (
      <div className="glass-panel border border-white/10 p-6 rounded-2xl hover:border-[var(--accent-mint)] hover:shadow-[0_0_30px_rgba(111,248,213,0.3)] transition">
        {img && (
          <img
            src={img}
            alt={title}
            className="w-14 h-14 mb-4"
          />
        )}

        <h3 className="text-lg font-semibold">{title}</h3>

        <p className="text-[#b9e5dd] text-sm mt-2">{desc}</p>
      </div>
    );
  }

  return (
    <section className="px-6 py-20 max-w-6xl mx-auto text-white">

      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">Fast & Scalable Infrastructure</h2>

      {/* TABS */}
      <div className="relative mt-10 inline-flex bg-white/5 rounded-xl p-1 overflow-hidden border border-white/10">

        {/* Sliding Indicator */}
        <div
          className="
            absolute top-1 bottom-1 rounded-lg bg-[var(--accent-mint)]/15 border border-[var(--accent-mint)]/40
            transition-all duration-300 ease-out
          "
          style={{
            width: "33.333%",
            transform:
              tab === "individuals"
                ? "translateX(0%)"
                : tab === "business"
                ? "translateX(100%)"
                : "translateX(200%)",
          }}
        />

        {/* TAB BUTTONS */}
        <button
          onClick={() => setTab("individuals")}
          className={`relative w-[140px] md:w-[180px] py-2 text-sm font-medium z-10 transition-all ${
            tab === "individuals" ? "text-[var(--accent-mint)]" : "text-[#8fb6ad]"
          }`}
        >
          For Individuals
        </button>

        <button
          onClick={() => setTab("business")}
          className={`relative w-[140px] md:w-[180px] py-2 text-sm font-medium z-10 transition-all ${
            tab === "business" ? "text-[var(--accent-mint)]" : "text-[#8fb6ad]"
          }`}
        >
          For Businesses
        </button>

        <button
          onClick={() => setTab("depin")}
          className={`relative w-[140px] md:w-[180px] py-2 text-sm font-medium z-10 transition-all ${
            tab === "depin" ? "text-[var(--accent-mint)]" : "text-[#8fb6ad]"
          }`}
        >
          DePIN
        </button>

      </div>

      {/* CONTENT SECTIONS */}
      <div className="mt-10">

        {/* Individuals */}
        {tab === "individuals" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 animate-fadeIn">
            <Card
              img="/page2/vault-logo.png"
              title="Build Your Private Data Vault"
              desc="Connect wallets, exchanges, RSS feeds, and social sentiment streams into a single encrypted vault that only you can access. Drag-and-drop widgets let you build dashboards in minutes."
            />
            <Card
              img="/page2/ai-box-logo.png"
              title="Train Your Own AI"
              desc="Spin up a personal Prediction Agent (PA) with just a few clicks. Select indicators, set risk thresholds, and back-test on years of historical data. Perfect for daily trading or long-term portfolio shifts."
            />
            <Card
              img="/page2/connectors-logo.png"
              title="Monetize Your Edge"
              desc="Optionally publish your signals to others and earn $OZ each time someone subscribes. Keep your raw data private while turning insights into passive income."
            />
          </div>
        )}

        {/* Businesses */}
        {tab === "business" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 animate-fadeIn">
            <Card
              img="/page2/lock-image.png"
              title="Secure Enterprise Data Lake"
              desc="Ingest proprietary databases, CRM feeds, and market data directly into a permissioned data lake. All records are encrypted and meet SOC 2 & GDPR standards."
            />
            <Card
              img="/page2/ai-image.png"
              title="Build Custom AI Agents at Scale"
              desc="Deploy multiple Prediction Agents with dedicated GPU clusters and REST/WebSocket endpoints. Integrate outputs into existing OMS, EMS, or risk engines via our SDK and low-latency APIs."
            />
            <Card
              img="/page2/wallet-image.png"
              title="Turn Insights into Revenue"
              desc="License white-label dashboards to clients, embed real-time signals into your products, or resell curated data streams - all tracked and settled in $OZ."
            />
          </div>
        )}

        {/* DePIN */}
        {tab === "depin" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 animate-fadeIn">
            <Card
              img="/page2/data-source-image.png"
              title="Distributed Data Sourcing"
              desc="Sensor hubs, exchange oracles, and IoT edge devices publish raw feeds straight to the Ozak Stream Network (OSN). Redundant routing across multiple geographies keeps data flowing even if individual nodes drop offline."
            />
            <Card
              img="/page2/data-image.png"
              title="On-Chain Validation & Aggregation"
              desc="Each data packet is signed, time-stamped, and cross-checked by independent validators before hitting smart-contract storage. This trust-minimized pipeline guarantees tamper-proof inputs for forecasting models and on-chain analytics."
            />
            <Card
              img="/page2/atom-image.png"
              title="Edge-Ready Integration"
              desc="Real-time APIs and WebSockets push validated streams directly to Prediction Agents, enterprise dashboards, or embedded IoT devices - unlocking split-second reactions for trading algorithms, supply-chain sensors, and DeFi protocols."
            />
          </div>
        )}

      </div>
    </section>
  );
}

/* Reusable Card Component */