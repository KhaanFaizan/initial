import React from "react";
import { FiCpu, FiTrendingUp, FiLayers } from "react-icons/fi";

export default function TokenUtility() {
  const utilities = [
    {
      id: 1,
      icon: <img src="/utility/ai-brain.png" />,
      title: "Exclusive AI Agents Access",
      desc: "Activate and use prediction agents for various financial markets (crypto, equities, forex) using your $OZ",
    },
    {
      id: 2,
      icon: <img src="/utility/radar-signal.png" />,
      title: "Real-Time Analytics Feeds",
      desc: "Access premium data streams from the Ozak Streaming Network (OSN) through fee paid in $OZ",
    },
    {
      id: 3,
      icon: <img src="/utility/oz-coins.png" />,
      title: "Performance Based Rewards",
      desc: "Earn $OZ for high-accuracy models and signals, benchmarked by system performance",
    },
  ];

  return (
    <section id="utility" className="py-24 bg-transparent text-white px-6">
      <div className="max-w-6xl mx-auto text-center">

        {/* Section Header */}
        <h2 className="text-[var(--accent-mint)] tracking-wider text-sm mb-2">
          $OZ Token
        </h2>

        <h3 className="mt-8 text-4xl md:text-5xl font-bold mb-14">
          Token Utility
        </h3>

        {/* Utility Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {utilities.map((item) => (
            <div
              key={item.id}
              className="glass-panel border border-white/10 backdrop-blur-2xl rounded-2xl p-8 text-left hover:border-[var(--accent-mint)] hover:shadow-[0_0_30px_rgba(111,248,213,0.35)] transition"
            >
              {/* Icon */}
              <div className="mb-6">{item.icon}</div>

              {/* Title */}
              <h4 className="text-xl font-semibold text-white mb-3">
                {item.title}
              </h4>

              {/* Description */}
              <p className="text-[#b9e5dd] leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}