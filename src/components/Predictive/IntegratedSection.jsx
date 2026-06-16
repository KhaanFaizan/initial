export default function IntegratedSection() {
  const items = [
    { name: "BNB Chain", icon: "/icons/bnb-chain-icon.png" },
    { name: "Chat GPT", icon: "/icons/chatgpt-icon.png" },
    { name: "Gemini", icon: "/icons/gemini-icon.png" },
    { name: "Ethereum", icon: "/icons/ethereum-icon.png" },
    { name: "Appkit", icon: "/icons/appkit-icon.png" },
    { name: "Foundry", icon: "/icons/foundry-icon.png" },
    { name: "Prometheus", icon: "/icons/prometheus-icon.png" },
    { name: "Next.js", icon: "/icons/nextjs-icon.png" },
    { name: "Claude", icon: "/icons/claude-icon.png" },
    { name: "Docusaurus", icon: "/icons/docusaurus-icon.png" },
    { name: "Cloudflare", icon: "/icons/cloudflare-icon.png" },
    { name: "Google Cloud", icon: "/icons/google-cloud-icon.png" },
    { name: "Viem", icon: "/icons/viem-icon.png" },
    { name: "Ponder", icon: "/icons/ponder-icon.png" },
    { name: "Solidity", icon: "/icons/solidity-icon.png" },
  ];

  // Duplicate items so it scrolls seamlessly
  const marqueeItems = [...items, ...items, ...items];

  return (
    <section className="px-6 py-24 max-w-6xl mx-auto text-center text-white">

      {/* Small category label */}
      <div className="text-[var(--accent-mint)] text-xl flex items-center justify-center gap-1 mb-3">
        <span className="text-[var(--accent-mint)]">✦</span> Technology
      </div>

      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-12">Integrated With</h2>

      {/* Logos container */}
      <div className="overflow-hidden relative w-full">
        <div className="flex gap-4 animate-marquee whitespace-nowrap">
          {marqueeItems.map((item, i) => (
            <div
              key={i}
              className="
                flex items-center gap-2
                glass-panel border border-white/10
                px-5 py-2 rounded-full 
                hover:border-[var(--accent-mint)] hover:bg-[var(--accent-mint)]/5 transition
                flex-shrink-0
              "
            >
              <img src={item.icon} alt={item.name} className="w-6 h-6" />
              <span className="text-white text-xl">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}