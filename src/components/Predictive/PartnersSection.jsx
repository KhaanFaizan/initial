export default function PartnersSection() {
  const logos = [
    { name: "TechBullion", img: "/page2/partners/techbullion.svg" },
    { name: "The Print", img: "/page2/partners/theprint.svg" },
    { name: "Cointelegraph", img: "/page2/partners/cointelegraph.svg" },
    { name: "CoinMarketCap", img: "/page2/partners/coinmarketcap.svg" },

    { name: "Trade Brains", img: "/page2/partners/tradebrains.svg" },
    { name: "CoinPedia", img: "/page2/partners/coinpedia.svg" },
    { name: "Analytics Insight", img: "/page2/partners/analytics.svg" },
    { name: "CryptoDaily", img: "/page2/partners/cryptodaily.svg" },

    { name: "Coinspeaker", img: "/page2/partners/coinspeaker.png" },
    { name: "CoinCentral", img: "/page2/partners/coincentral.png" },
    { name: "Crypto Reporter", img: "/page2/partners/cryptoreporter.svg" },
    { name: "Live Bitcoin News", img: "/page2/partners/livenews.svg" },

    { name: "Bitcoin Insider", img: "/page2/partners/bitcoin.svg" },
    { name: "The News Crypto", img: "/page2/partners/thenewscrypto.svg" },
    { name: "FINBOLD", img: "/page2/partners/finbold.svg" },
    { name: "Blockonomi", img: "/page2/partners/blockonomi.svg" },
  ];

  const columns = 4; // number of columns in grid

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 text-white">
      {/* Header */}
      <div className="flex justify-between items-start mb-12">
        <div>
          <p className="text-[var(--accent-mint)] text-xl flex items-center gap-2">
            <span className="text-[var(--accent-mint)]">✦</span>
            Featured
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mt-3">As seen on</h2>
        </div>

        <p className="text-[#b9e5dd] max-w-xl text-right text-xl leading-relaxed">
          Ozak AI has been making news lately & featured in many major
          publications. Stay tuned for more!
        </p>
      </div>

      {/* 4-column grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-zinc-800">
        {logos.map((item, i) => {
          const isLastColumn = (i + 1) % columns === 0;
          const isLastRow = i >= logos.length - columns;

          return (
            <div
              key={i}
              className={`
                group relative flex justify-center items-center h-32 p-6
                glass-panel rounded-xl
                transition-all duration-300
                hover:scale-105 
                hover:shadow-[0_0_40px_rgba(111,248,213,0.3)]
                ${!isLastColumn ? "border-r border-white/10" : ""}
                ${!isLastRow ? "border-b border-white/10" : ""}
              `}
            >
              <div className="absolute inset-0 rounded-xl bg-[var(--accent-mint)]/0 group-hover:bg-[var(--accent-mint)]/5 transition-all duration-500 pointer-events-none"></div>
              <img
                src={item.img}
                alt={item.name}
                className="max-h-20 w-auto object-contain opacity-90"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}