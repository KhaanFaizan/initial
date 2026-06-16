const timeline = [
  {
    title: "Launch",
    items: ["Ideation & Initial Infrastructure", "Ozak Data Vault", "Research & Design", "Smart Contract Development"]
  },
  {
    title: "Development P1",
    items: ["Ozak Machine Learning Engine", "Ozak Nodes", "Ozak Data Vault", "Ozak Personal Platform"]
  },
  {
    title: "Development P2",
    items: ["Ozak Business Platform", "Ozak Data Vault", "Ozak Machine Learning Engine", "Ozak Stream Network Testnet"]
  },
  {
    title: "Development P4",
    items: ["Ozak Personal Platform", "Ozak Business Platform", "Ozak Stream Network mainnet", "Ozak AI Agents (PAA)"]
  }
];

export default function TimelineSection() {
  return (
    <section className="px-6 py-20 max-w-5xl mx-auto text-white">

      <h2 className="text-[var(--accent-mint)] text-sm flex items-center gap-2">
        <img src="/steps/star-icon.svg" className="w-3" />
        Roadmap
      </h2>

      <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
        Our Timeline on Development Goals. 
      </h2>

      <h2 className="text-xl flex items-center mt-6">
        The roadmap demonstrates our approach towards achieving major milestones & building fast. Continuous feedback loop with our users helps us build products which they use.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {timeline.map(block => (
          <div
            key={block.title}
            className="glass-panel border border-white/10 p-6 rounded-2xl"
          >
            <h3 className="text-xl font-bold text-[var(--accent-mint)]">{block.title}</h3>
            <p className="text-[#b9e5dd] text-sm">{block.note}</p>

            <ul className="mt-4 text-sm text-white space-y-1">
              {block.items.map(i => (
                <li key={i}>• {i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}