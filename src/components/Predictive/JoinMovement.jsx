export default function JoinMovement() {
  return (
    <section className="px-6 py-20 text-center text-white">
      <h2 className="text-2xl font-bold">
        Join The <span className="text-[var(--accent-mint)]">$OZ Movement</span>
      </h2>
      <p className="text-[#b9e5dd] mt-2">
        Start using AI today and predict the future of markets.
      </p>

      <button className="mt-6 bg-gradient-to-r from-[#4cf5c8] via-[#6ff8d5] to-[#b6ff39] text-black px-6 py-2 rounded-full font-semibold hover:brightness-110 shadow-[0_0_25px_rgba(111,248,213,0.3)]">
        Buy $OZ
      </button>

      <div className="flex justify-center gap-6 mt-6 text-[#8fb6ad]">
        <img src="/icons/twitter.svg" className="w-5" />
        <img src="/icons/telegram.svg" className="w-5" />
        <img src="/icons/discord.svg" className="w-5" />
      </div>
    </section>
  );
}