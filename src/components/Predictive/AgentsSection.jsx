const agents = [
  {
    id: 1,
    img: "/page2/ai-orb.png",
    category: "analytics",
    title: "AI Powered Predictive Analytics",
    desc: "Ozak AI agents delivers real-time, AI-driven insights using models like neural networks, ARIMA, and linear regression to generate accurate market forecasts and risk assessments."
  },
  {
    id: 2,
    img: "/page2/depin.png",
    category: "depin",
    title: "Trustless Data Sources and Distributed Network",
    desc: "On-chain financial applications require trustless sources & low latency data. OSN, our DePIN network & Data Vaults acts as a massive data warehouse for smooth streaming of data."
  },
  {
    id: 3,
    img: "/page2/strategy.png",
    category: "strategy",
    title: "Financial Market Modelling",
    desc: "Research & analyse trends, react quickly & capitalize on real time insights. Devise your strategies to stay ahead of competition."
  }
];

export default function AgentsSection() {
  return (
    <section className="px-6 py-20 max-w-6xl mx-auto text-white">

      <h2 className="text-[var(--accent-mint)] text-sm flex items-center gap-2">
        <img src="/steps/star-icon.svg" className="w-3" />
        Features
      </h2>

      <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
        All Agents Builts to Think <br />
        Like Degen Traders
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10">
        {agents.map(a => (
          <div
            key={a.id}
            className="glass-panel border border-white/10 rounded-2xl p-3 flex flex-col items-center text-center hover:border-[var(--accent-mint)] hover:shadow-[0_0_30px_rgba(111,248,213,0.35)] transition"
          >
            <h3 className="text-[var(--accent-mint)] text-sm w-full uppercase text-right">{a.category}</h3>
            <img src={a.img} className="w-52 mb-4" />
            <h3 className="text-xl font-bold mb-2">{a.title}</h3>
            <p className="text-[#b9e5dd] text-sm">{a.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}