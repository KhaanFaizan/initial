export default function HeroPredictive() {
  return (
    <section className="w-full pt-32 pb-20 text-center flex flex-col items-center px-6">
      
      <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
        Predict the Future <br />
        with <span className="text-[var(--accent-mint)]">Predictive AI</span>
      </h1>

      <p className="text-zinc-400 mt-4 max-w-xl">
        Predictive AI enables accurate market forecasting using 
        advanced agent models trained on real-world data.
      </p>

      <button className="mt-6 bg-gradient-to-r from-[#4cf5c8] via-[#6ff8d5] to-[#b6ff39] text-black font-semibold px-8 py-3 rounded-full text-lg hover:brightness-110 transition shadow-[0_0_35px_rgba(111,248,213,0.35)]"
        onClick={() =>
            window.open(
              "https://eon.ozak.ai/",
            )
          }
      >
        Join Waitlist
      </button>

      <img
        src="/page2/predictive-ai.webp"
        className="
          mt-20
          mx-auto
          w-full
          max-w-[300px]      /* default for mobile */
          sm:max-w-[400px]
          md:max-w-[500px]
          lg:max-w-[1200px]
          px-4
          drop-shadow-[0_0_30px_rgba(111,248,213,0.35)]
        "
      />
    </section>
  );
}