import React from "react";
import { FiGlobe, FiKey, FiCheckCircle } from "react-icons/fi";

export default function StepsSection() {
  const steps = [
    {
      id: 1,
      icon: <img src="/steps/step1-browser.png" />,
      title: "Go to The Official Ozak AI Website",
      desc: "Visit the official Ozak AI presale page to begin your purchase securely.",
    },
    {
      id: 2,
      icon: <img src="/steps/step2-wallet.png" />,
      title: "Connect Your Crypto Wallet",
      desc: "Click “Connect Wallet” and choose the wallet of your preference, e.g., MetaMask, WalletConnect, Coinbase Wallet, etc.",
    },
    {
      id: 3,
      icon: <img src="/steps/step3-payment.png" />,
      title: "Choose How You Want To Pay",
      desc: "Select the crypto you want to use - ETH, USDC, or USDT. Enter the amount you want to buy for. Click on “Max” for maximum amount. Have some ETH to pay for the gas fee. Click “Buy Now”.",
    },
    {
      id: 4,
      icon: <img src="/steps/step4-confirm.png" />,
      title: "Approve & Confirm the Transaction",
      desc: "Your wallet interface will open up. Verify & Click approve/confirm to complete the transaction. Done!",
    },
  ];

  return (
    <section id="steps" className="py-24 bg-transparent text-[#E8FFF7] px-6">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Title */}
        <div className="text-left mb-14">
          <div className="flex items-center gap-3 text-[var(--accent-mint)]">
            <img src="/steps/star-icon.svg" className="h-5 w-auto" />
            <span className="text-[var(--accent-mint)] text-sm text-lg tracking-wide">
              The Process
            </span>
          </div>
          <h2 className="mt-8 text-4xl md:text-5xl font-extrabold leading-tight">
            How To Participate <br />
            In The $OZ Presale
          </h2>

          <p className="mt-4 text-[#cbe7df] text-lg">
            Buy $OZ with ETH, USDT, or USDC on Ethereum network.
            Early investors are up more than 10x!
          </p>

          <button className="border border-[var(--accent-mint)] text-[var(--accent-mint)] font-semibold text-xl py-4 px-5 rounded-full mt-10 shadow-[0_0_25px_rgba(111,248,213,0.35)] hover:bg-[var(--accent-mint)]/10 transition-all duration-300"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Buy $OZ
          </button>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {steps.map((step) => (
            <div
              key={step.id}
              className="glass-panel rounded-xl p-8 text-center border border-white/10 hover:border-[var(--accent-mint)] hover:shadow-[0_0_35px_rgba(111,248,213,0.3)] transition animate-float"
            >
              <div className="flex justify-center mb-6">{step.icon}</div>

              <h4 className="text-lg font-semibold text-white uppercase mb-3">
                Step {step.id}
              </h4>

              <h5 className="text-3xl font-medium mb-3 text-[#d9f7ef]">
                {step.title}
              </h5>

              <p className="text-lg text-[#a0c7bd] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}