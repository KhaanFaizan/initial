import React, { useState } from "react";
import { FiX, FiCopy, FiSearch } from "react-icons/fi";
import { FaEthereum } from "react-icons/fa";

export default function HeroSection({ openWallet: externalOpenWallet, setOpenWallet: externalSetOpenWallet }) {
  const [internalOpenWallet, setInternalOpenWallet] = useState(false);
  
  // Use external state if provided, otherwise use internal state
  const openWallet = externalOpenWallet !== undefined ? externalOpenWallet : internalOpenWallet;
  const setOpenWallet = externalSetOpenWallet || setInternalOpenWallet;


  const items = [
    { name: "Coin Pedia", icon: "/hero/coinpedia.svg" },
    { name: "Analytics Insight", icon: "/hero/analytics.svg" },
    { name: "CryptoDaily", icon: "/hero/cryptodaily.svg" },
    { name: "Coinspeaker", icon: "/hero/coinspeaker.png" },
    { name: "COINCENTERAL", icon: "/hero/coincentral.png" },
    { name: "bitcoin", icon: "/hero/bitcoin.svg" },
    { name: "THENEWSCRYPTO", icon: "/hero/thenewscrypto.svg" },
    { name: "FINBOLD", icon: "/hero/finbold.svg" },
    { name: "ThePrint", icon: "/hero/theprint.svg" },
    { name: "CoinMarketCap", icon: "/hero/coinmarketcap.svg" },
    { name: "TradeBrains", icon: "/hero/tradebrains.svg" },
  ];

  const marqueeItems = [...items, ...items];

  return (
    <>
      {/* ===============================
            WALLET POPUP
      ================================= */}
      {openWallet && (
        <div
          className="fixed inset-0 bg-[rgba(1,10,12,0.7)] backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setOpenWallet(false)}
        >
          <div
            className="glass-panel w-96 rounded-3xl border border-white/10 shadow-2xl p-6 relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Connect Wallet</h2>
              <FiX
                className="text-xl cursor-pointer hover:text-[var(--accent-mint)]"
                onClick={() => setOpenWallet(false)}
              />
            </div>

            <button className="w-full bg-[rgba(5,33,43,0.7)] border border-white/10 rounded-xl py-3 text-sm flex items-center justify-center gap-2 hover:border-[var(--accent-mint)] hover:text-[var(--accent-mint)] transition">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5"
                alt="Google"
              />
              Continue with Google
            </button>

            <div className="my-3 flex items-center text-xs text-zinc-400">
              <div className="flex-grow h-px bg-white/10"></div>
              <span className="px-2">or</span>
              <div className="flex-grow h-px bg-white/10"></div>
            </div>

            <div className="space-y-3">
              <button className="w-full flex items-center justify-between bg-[rgba(5,33,43,0.7)] border border-white/10 rounded-xl p-3 hover:border-[var(--accent-mint)] transition">
                <div className="flex items-center gap-3">
                  <img
                    src="https://www.walletconnect.com/assets/images/logo.svg"
                    className="w-7"
                  />
                  <span className="text-sm">WalletConnect</span>
                </div>
                <span className="text-xs text-zinc-400 border border-white/20 px-2 py-1 rounded-lg">
                  QR CODE
                </span>
              </button>

              <button className="w-full flex items-center gap-3 bg-[rgba(5,33,43,0.7)] border border-white/10 rounded-xl p-3 hover:border-[var(--accent-mint)] transition">
                <img src="https://cryptologos.cc/logos/1inch-1inch-logo.svg" className="w-7" />
                <span className="text-sm">1inch Wallet</span>
              </button>

              <button className="w-full flex items-center gap-3 bg-[rgba(5,33,43,0.7)] border border-white/10 rounded-xl p-3 hover:border-[var(--accent-mint)] transition">
                <img src="https://cryptologos.cc/logos/binance-coin-bnb-logo.svg" className="w-7" />
                <span className="text-sm">Binance Wallet</span>
              </button>

              <button className="w-full flex items-center gap-3 bg-[rgba(5,33,43,0.7)] border border-white/10 rounded-xl p-3 hover:border-[var(--accent-mint)] transition">
                <img
                  src="https://seeklogo.com/images/L/ledger-logo-A1C1E0F8F4-seeklogo.com.png"
                  className="w-7"
                />
                <span className="text-sm">Ledger Live</span>
              </button>

              <div className="flex items-center bg-[rgba(5,33,43,0.7)] border border-white/10 rounded-xl px-3 py-2 hover:border-[var(--accent-mint)] transition">
                <FiSearch className="text-zinc-400 text-lg" />
                <input
                  className="bg-transparent w-full ml-2 outline-none text-sm text-white"
                  placeholder="Search Wallet"
                />
                <span className="text-xs text-zinc-500">490+</span>
              </div>
            </div>

            <p className="text-center text-xs text-zinc-500 mt-4">
              UX by <span className="text-zinc-400">○○○○</span>
            </p>
          </div>
        </div>
      )}

      <div className="hidden absolute 3xl:block left-12 top-[550px] z-20">
        <PromoLeftCard />
      </div>

      {/* ===============================
              HERO SECTION
      ================================= */}
      <section id="presale" className="relative w-full min-h-screen bg-[rgba(3,22,29,0.9)] text-[#E8FFF7] flex justify-center pt-32 md:pt-40 pb-20 px-4 md:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_20%_20%,rgba(111,248,213,0.18),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(182,255,57,0.18),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[rgba(3,9,13,0.35)] backdrop-blur-sm pointer-events-none"></div>
        <div className="max-w-4xl w-full flex flex-col items-center relative z-10">

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#6ff8d5] via-[#b6ff39] to-[#6ff8d5]">
            $OZ Presale is Live!
          </h1>

          {/* Price Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full mb-8">
            <HeroCard title="Current Price" value="$0.014" />
            <HeroCard title="Next Phase Price" value="Listing" />
            <HeroCard title="Target Price" value="$1.00" />
          </div>

          {/* Token Stats */}
          <div className="grid grid-cols-2 gap-4 w-full mb-6 text-[#c7eae3]">
            <div>
              <p className="text-sm text-[#9fc4bb] tracking-wide mb-1">Tokens Sold</p>
              <p className="text-xl md:text-3xl font-bold">
                <span className="text-[var(--accent-mint)]">1,018,741,187.71</span> <span className="text-[var(--accent-mint)]">$OZ</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-[#9fc4bb] tracking-wide mb-1">Total Raised</p>
              <p className="text-xl md:text-3xl font-bold">
                <span className="text-[var(--accent-mint)]">$4,662,414.55</span>
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full mb-8">
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden relative">
              {/* Fill */}
              <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-[#4cf5c8] via-[#b6ff39] to-[#54ffd6] shadow-[0_0_35px_rgba(111,248,213,0.6)] relative overflow-hidden animate-glimmer">
                {/* White dots along the progress bar */}
                <div className="absolute inset-0 flex items-center">
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-white/90 absolute"
                      style={{ left: `${(i * 100) / 14}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* BUY BOX */}
          <BuyBox setOpenWallet={setOpenWallet} />

          {/* Can't find tokens link */}
          <a
            href="https://docs.ozak.ai/Cant-find-your-OZ-tokens"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 text-sm text-[#9fc4bb] hover:text-[var(--accent-mint)] transition-colors"
          >
            Can't find your tokens?
          </a>

          {/* Social Icons */}
          <div className="flex items-center gap-6 mt-6">
            <CircleIcon href="https://docs.ozak.ai/Contract-Audits/" icon="/hero/certik.svg" />
            <CircleIcon href="https://docs.ozak.ai/Contract-Audits/" icon="/hero/sherlock.svg" />
            <CircleIcon href="https://www.coingecko.com/en/coins/ozak-ai" icon="/hero/cg.svg" />
            <CircleIcon href="https://coinmarketcap.com/currencies/ozak-ai/" icon="/hero/cmc.svg" />
            <CircleIcon href="https://ozak.ai/whitepaper1.2.pdf" icon="/hero/whitepaper.svg" />
          </div>

          {/* Legal */}
          <p className="mt-6 text-xs text-[#8fb6ad] text-center max-w-xl leading-relaxed">
            By participating in the Ozak AI Token presale, I have agreed to the{" "}
            <a href="#" className="underline hover:text-[var(--accent-mint)] transition-colors">Terms of Service</a>
            , including the{" "}
            <a href="#" className="underline hover:text-[var(--accent-mint)] transition-colors">User Consent Agreement</a>
            {" "}and{" "}
            <a href="#" className="underline hover:text-[var(--accent-mint)] transition-colors">Disclaimers</a>.
          </p>

          <div className="overflow-hidden relative w-full mt-10">
            <div className="flex gap-4 marquee-track w-max animate-marquee-hero whitespace-nowrap">
              {marqueeItems.map((item, i) => (
                <div
                  key={i}
                  className="
                    flex items-center gap-2
                    px-5 py-2
                    flex-shrink-0
                  "
                >
                  <img src={item.icon} alt={item.name} className="w-auto h-8 object-contain select-none" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </>
  );
}

/* ===============================
      SMALL COMPONENTS
================================= */

function HeroCard({ title, value }) {
  return (
    <div className="glass-panel border border-white/10 p-6 rounded-2xl text-center">
      <p className="text-sm text-[#cbe7df] mb-1">{title}</p>
      <p className="text-2xl font-bold text-[var(--accent-mint)]">{value}</p>
    </div>
  );
}

/* -------------------------------------------------------
   COMPACT PROMO CARD (PIXEL-PERFECT OZAK STYLE)
--------------------------------------------------------- */
function PromoLeftCard() {
  return (
    <div className="
      w-[300px] border border-white/10 rounded-2xl 
      p-5 shadow-[0_0_35px_rgba(8,38,36,0.65)]
      flex flex-col items-start text-left text-white
    ">
      <img
        src="/hero/waitlist-banner.png"
               className="w-full h-[100px] object-cover rounded-xl mb-4"
        alt="Eon Launch"
      />

      {/* Top label */}
      <p className="text-2xl text-white mb-1">
        The Grand Launch
      </p>

      {/* Eon + Subtitle aligned like the original */}
      <div className="flex items-start gap-2 leading-tight text-left">
        <h3 className="text-4xl font-extrabold text-[var(--accent-mint)] mt-1">
          Eon
        </h3>

        <p className="text-sm text-[#cbe7df] font-medium mt-1 ml-1">
          Your Personal<br />
          Financial Analyst
        </p>
      </div>

      <div className="w-full flex justify-center mt-4">
        <a
          href="https://eon.ozak.ai/"
          target="_blank"
          className="
            px-6 py-2 rounded-full bg-transparent 
            text-[#6ff8d5] font-semibold text-xl 
            border border-white/20 py-2
            hover:bg-white/5 hover:text-white transition-all duration-300
          "
        >
          Join the Waitlist
        </a>
      </div>
    </div>
  );
}

function CircleIcon({ href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group w-14 h-14 rounded-full flex items-center justify-center glass-panel border border-white/10 hover:border-[var(--accent-mint)] hover:shadow-[0_0_35px_rgba(111,248,213,0.35)] transition-all duration-300 cursor-pointer hover:scale-110"
    >
      <img
        src={icon}
        className="w-7 opacity-80 group-hover:opacity-100 transition"
        alt=""
      />
    </a>
  );
}

function BuyBox({ setOpenWallet }) {
  const [selectedToken, setSelectedToken] = useState("ETH");

  return (
    <div className="mt-10 w-full glass-panel rounded-3xl p-8 text-white border border-white/10">
      
      {/* Wallet Info */}
      <div className="flex justify-between text-xs text-[#cbe7df] mb-4">
        <p>
          Wallet Balance <span className="text-white">0.000000 ETH</span>
        </p>
        <p>
          $OZ Owned <span className="text-[var(--accent-mint)]">0.00 $OZ</span>
        </p>
      </div>

      {/* Amount Input */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <div className="flex items-center border border-white/10 bg-[rgba(3,15,20,0.65)] rounded-3xl px-4 py-3 flex-grow">
          <FaEthereum className="text-zinc-500 mr-2" />
          <input
            type="number"
            className="bg-transparent outline-none flex-1 text-white placeholder-[#7ca79c]"
            placeholder="Input Amount"
          />
            <button 
              onClick={() => setOpenWallet(true)}
            className="ml-3 px-3 text-2xl font-semibold rounded-lg bg-white/10 border border-white/20 hover:border-[var(--accent-mint)] transition"
          >
            MAX
          </button>
        </div>

        {/* Token Selection */}
        <div className="flex gap-3">
            {["ETH", "USDT", "USDC"].map((t) => (
            <button
              key={t}
              onClick={() => {
                setSelectedToken(t);
                setOpenWallet(true);
              }}
              className={`px-5 py-3 rounded-3xl font-medium transition ${
                selectedToken === t
                  ? "bg-gradient-to-r from-[#4cf5c8] to-[#b6ff39] text-black shadow-[0_0_25px_rgba(111,248,213,0.45)]"
                  : "bg-white/5 border border-white/10 text-white hover:border-[var(--accent-mint)]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Referral Code */}
      <div className="flex items-center border border-white/10 bg-[rgba(3,15,20,0.65)] rounded-3xl px-4 py-3 mb-4">
        <input
          type="text"
          className="bg-transparent w-full text-white text-sm outline-none"
          placeholder="Referral Code (Optional)"
        />
        <FiCopy className="text-zinc-400 text-lg cursor-pointer hover:text-[var(--accent-mint)]" />
      </div>

      {/* Summary */}
      <div className="flex justify-between text-sm text-[#cbe7df] mb-6">
        <p>
          You will receive: <span className="text-[var(--accent-mint)]">0 $OZ</span>
        </p>
        <p>
          Network: <span className="text-white">Ethereum</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          className="border border-[var(--accent-mint)] text-[var(--accent-mint)] font-semibold text-2xl py-2 rounded-full shadow-[0_0_25px_rgba(111,248,213,0.35)] hover:bg-[var(--accent-mint)]/10 transition-all duration-300"
          onClick={() => setOpenWallet(true)}
        >
          Connect Wallet
        </button>

        <button
          className="bg-white/10 border border-white/15 text-white text-2xl font-semibold py-3 rounded-full hover:border-[var(--accent-mint)] transition"
          onClick={() =>
            window.open(
              "https://docs.ozak.ai/How-to-Acquire-OZ-Tokens/",
              "_blank"
            )
          }
        >
          How to Buy?
        </button>
      </div>
    </div>
  );
}