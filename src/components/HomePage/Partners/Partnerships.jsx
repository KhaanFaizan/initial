export default function PartnersSection() {
  const logos = [
    { name: "TechBullion", img: "/partnership/sentient.svg" },
    { name: "The Print", img: "/partnership/opengpu.svg" },
    { name: "Cointelegraph", img: "/partnership/solo.svg" },
    { name: "CoinMarketCap", img: "/partnership/zeni.svg" },

    { name: "Trade Brains", img: "/partnership/gremory.svg" },
    { name: "CoinPedia", img: "/partnership/weblume.svg" },
    { name: "Analytics Insight", img: "/partnership/echobit.svg" },
    { name: "CryptoDaily", img: "/partnership/mind_ai.svg" },

    { name: "Coinspeaker", img: "/partnership/spheron.svg" },
    { name: "CoinCentral", img: "/partnership/centic.svg" },
    { name: "Crypto Reporter", img: "/partnership/sint.svg" },
    { name: "Live Bitcoin News", img: "/partnership/hive.svg" },
  ];

  const columns = 4; // number of columns in grid

  return (
    <section className="w-full bg-transparent text-white py-28 px-6 flex justify-center">
      {/* Header */}
      <div className="max-w-7xl w-full">
        <div className="ml-10 mr-10 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3 text-[var(--accent-mint)]">
            <img src="/steps/star-icon.svg" className="h-4 w-auto" />
            <span className="text-[var(--accent-mint)] text-sm text-lg tracking-wide">
              Our Network
            </span>
          </div>

            <h2 className="mt-8 text-4xl md:text-5xl font-bold">Partnerships</h2>
          </div>

          <p className="text-[#b9e5dd] max-w-md mt-6 md:mt-0 text-sm leading-relaxed">
            Building meaningful partnerships with industry leaders to drive innovation and impact.
          </p>
        </div>

        {/* 4-column grid */}
        <div className="mt-10 ml-10 mr-10 grid grid-cols-2 md:grid-cols-4 border-zinc-800">
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
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-[var(--accent-mint)]/0 group-hover:bg-[var(--accent-mint)]/5 transition-all duration-500 pointer-events-none rounded-xl"></div>
                
                <img
                  src={item.img}
                  alt={item.name}
                  className="max-h-20 w-auto object-contain opacity-90"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}