import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  GlobeAltIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";export default function Header({ onConnectWallet }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [socialsOpen, setSocialsOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");

  const resourcesRef = useRef(null);
  const socialsRef = useRef(null);
  const languageRef = useRef(null);

  const languages = [
    { code: "EN", name: "English" },
    { code: "FR", name: "French" },
    { code: "ZH", name: "Chinese" },
    { code: "DE", name: "German" },
    { code: "AR", name: "Arabic" },
    { code: "JA", name: "Japanese" },
    { code: "ES", name: "Spanish" },
    { code: "HI", name: "Hindi" },
    { code: "BN", name: "Bengali" },
    { code: "PT", name: "Portuguese" },
    { code: "RU", name: "Russian" },
    { code: "VI", name: "Vietnamese" },
    { code: "MR", name: "Marathi" },
    { code: "TE", name: "Telugu" },
    { code: "TR", name: "Turkish" },  
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target)) {
        setResourcesOpen(false);
      }
      if (socialsRef.current && !socialsRef.current.contains(e.target)) {
        setSocialsOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(e.target)) {
        setLanguageOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="w-full bg-[rgba(3,25,33,0.82)] backdrop-blur-2xl border-b border-white/10 fixed top-0 left-0 z-50 transition-all duration-300 shadow-[0_20px_80px_rgba(1,8,11,0.65)]">
        <div className="max-w-[1300px] mx-auto flex items-center justify-between py-4 px-6">

          {/* LOGO */}
          <a href="/presale">
            <div className="flex items-center gap-3">
              <img src="/stardust-logo.svg" alt="OZORA AI" className="h-8 md:h-12 lg:h-14 w-auto select-none" />
            </div>
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 text-xl text-[#c9f1ea]">

            <a 
              href="/presale" 
              className="relative hover:text-white transition-all duration-300 hover:scale-105 group"
            >
              Presale
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--accent-mint)] group-hover:w-full transition-all duration-300"></span>
            </a>
            <Link 
              to="/predictive-ai" 
              className="relative hover:text-white transition-all duration-300 hover:scale-105 group"
            >
              Predictive AI
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--accent-mint)] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <a 
              href="#blogs" 
              className="relative hover:text-white transition-all duration-300 hover:scale-105 group"
            >
              Blogs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--accent-mint)] group-hover:w-full transition-all duration-300"></span>
            </a>

            {/* RESOURCES DROPDOWN */}
            <div className="relative" ref={resourcesRef}>
              <button
                className="flex items-center gap-1.5 hover:text-white transition-all duration-300 hover:scale-105 group"
                onClick={() => {
                  setResourcesOpen(!resourcesOpen);
                  setSocialsOpen(false);
                  setLanguageOpen(false);
                }}
              >
                Resources
                <ChevronDownIcon 
                  className={`h-4 w-4 transition-transform duration-300 ${
                    resourcesOpen ? 'rotate-180' : 'rotate-0'
                  }`} 
                />
              </button>

              {resourcesOpen && (
                <div
                  className="absolute top-8 left-0 w-56 
                  bg-[rgba(5,33,43,0.95)] backdrop-blur-2xl border border-white/10 
                  rounded-xl shadow-2xl py-2 px-2 z-50 
                  animate-dropdown"
                >
                  <DropdownItem href="#waitlist">Join Waitlist</DropdownItem>
                  <DropdownItem href="#tokenomics">Tokenomics</DropdownItem>
                  <DropdownItem href="#whitepaper">Whitepaper</DropdownItem>
                  <DropdownItem href="#referrals">Referrals</DropdownItem>
                  <DropdownItem href="#docs">Documentation</DropdownItem>
                  <DropdownItem href="#howtobuy">How to Buy $OZ</DropdownItem>
                  <DropdownItem href="#support">Support</DropdownItem>
                  <DropdownItem href="#faq">FAQs</DropdownItem>
                </div>
              )}
            </div>

            {/* SOCIALS DROPDOWN */}
            <div className="relative" ref={socialsRef}>
              <button
                className="flex items-center gap-1.5 hover:text-white transition-all duration-300 hover:scale-105 group"
                onClick={() => {
                  setSocialsOpen(!socialsOpen);
                  setResourcesOpen(false);
                  setLanguageOpen(false);
                }}
              >
                Socials
                <ChevronDownIcon 
                  className={`h-4 w-4 transition-transform duration-300 ${
                    socialsOpen ? 'rotate-180' : 'rotate-0'
                  }`} 
                />
              </button>

              {socialsOpen && (
                <div
                  className="absolute top-8 left-0 w-56 
                  bg-[rgba(5,33,43,0.95)] backdrop-blur-2xl border border-white/10 
                  rounded-xl shadow-2xl py-2 px-2 z-50 
                  animate-dropdown"
                >
                  <DropdownItem href="https://t.me" external>Telegram</DropdownItem>
                  <DropdownItem href="https://twitter.com" external>X (Twitter)</DropdownItem>
                  <DropdownItem href="https://coinmarketcap.com" external>CoinMarketCap</DropdownItem>
                  <DropdownItem href="https://coingecko.com" external>CoinGecko</DropdownItem>
                  <DropdownItem href="https://instagram.com" external>Instagram</DropdownItem>
                  <DropdownItem href="https://iq.wiki" external>IQWiki</DropdownItem>
                  <DropdownItem href="https://linktr.ee" external>Linktree</DropdownItem>
                </div>
              )}
            </div>
          </nav>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-4">
            {/* LANGUAGE DROPDOWN */}
            <div className="hidden md:block relative" ref={languageRef}>
              <button
                onClick={() => {
                  setLanguageOpen(!languageOpen);
                  setResourcesOpen(false);
                  setSocialsOpen(false);
                }}
                className="flex items-center gap-2 text-[#c9f1ea] hover:text-white transition-all duration-300 px-3 py-1.5 rounded-lg hover:bg-white/10 hover:scale-105 group"
              >
                <GlobeAltIcon className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-sm font-medium">{selectedLanguage}</span>
                <ChevronDownIcon 
                  className={`h-4 w-4 text-white/60 transition-transform duration-300 ${
                    languageOpen ? 'rotate-180' : 'rotate-0'
                  }`} 
                />
              </button>

              {languageOpen && (
                <div className="absolute top-10 right-0 w-48 bg-[rgba(5,33,43,0.95)] backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl py-2 z-50 animate-dropdown">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang.code);
                        setLanguageOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-all duration-200 hover:translate-x-1 ${
                        selectedLanguage === lang.code
                          ? "bg-[var(--accent-mint)]/15 text-[var(--accent-mint)] font-medium"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{lang.name}</span>
                        {selectedLanguage === lang.code && (
                          <span className="text-[var(--accent-mint)] animate-scale-in">✓</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PROFILE ICON */}
            <div className="hidden md:flex p-[6px] bg-white/10 rounded-full hover:bg-white/20 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[rgba(111,248,213,0.35)] group">
              <UserCircleIcon className="h-6 w-6 text-white group-hover:text-[var(--accent-mint)] transition-colors duration-300" onClick={() => window.open("https://docs.ozak.ai", "_blank")} />
            </div>

            {/* CONNECT WALLET */}
            {/* CONNECT WALLET */}
            <button 
              onClick={() => onConnectWallet && onConnectWallet()}
              className="bg-gradient-to-r from-[#56ffd3] to-[#b6ff39] hover:brightness-110 text-black font-medium text-sm px-6 py-2 rounded-full transition-all duration-300 shadow-lg shadow-[rgba(111,248,213,0.35)] hover:shadow-[0_0_35px_rgba(111,248,213,0.55)] hover:scale-105 active:scale-95"
            >
              Connect Wallet
            </button>

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-95 text-white"
              onClick={() => setMenuOpen(true)}
            >
              <Bars3Icon className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-[rgba(1,10,12,0.75)] backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* MOBILE SLIDE-IN MENU */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-[#041c23] z-50 shadow-xl transform 
          ${menuOpen ? "translate-x-0" : "translate-x-full"} 
          transition-transform duration-300`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
          <span className="text-white font-semibold text-lg">Menu</span>
          <button onClick={() => setMenuOpen(false)}>
            <XMarkIcon className="w-7 h-7 text-white" />
          </button>
        </div>

        <nav className="flex flex-col p-6 text-white/80 text-base gap-2">
          <a 
            href="#presale" 
            className="hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-300 hover:translate-x-1"
            onClick={() => setMenuOpen(false)}
          >
            Presale
          </a>
          <a 
            href="#tokenomics" 
            className="hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-300 hover:translate-x-1"
            onClick={() => setMenuOpen(false)}
          >
            Tokenomics
          </a>
          <a 
            href="#utility" 
            className="hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-300 hover:translate-x-1"
            onClick={() => setMenuOpen(false)}
          >
            Utility
          </a>
          <a 
            href="#faq" 
            className="hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-300 hover:translate-x-1"
            onClick={() => setMenuOpen(false)}
          >
            FAQ
          </a>
          <a 
            href="#partners" 
            className="hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-300 hover:translate-x-1"
            onClick={() => setMenuOpen(false)}
          >
            Partners
          </a>
        </nav>

        <div className="px-6 py-3 border-t border-white/10">
          {/* Mobile Language Selector */}
          <div className="mb-3">
            <div className="text-xs text-white/60 mb-2 px-2">Language</div>
            <div className="space-y-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setSelectedLanguage(lang.code);
                    setMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-300 hover:translate-x-1 ${
                    selectedLanguage === lang.code
                      ? "bg-[var(--accent-mint)]/15 text-[var(--accent-mint)] font-medium"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-white/80 hover:text-white hover:bg-white/10 cursor-pointer py-3 px-4 rounded-lg transition-all duration-300 hover:translate-x-1">
            <UserCircleIcon className="w-6 h-6" /> Account
          </div>
        </div>
      </aside>

      {/* Animation Styles */}
      <style>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.2s ease-out forwards;
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
}

/* Dropdown link item */
function DropdownItem({ href, external, children }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : "_self"}
      rel={external ? "noopener noreferrer" : undefined}
      className="block text-white/80 hover:text-white hover:bg-white/10 
      rounded-lg px-3 py-2 transition-all duration-300 hover:translate-x-1 text-sm group"
    >
      <span className="flex items-center gap-2">
        <span className="w-0 h-0.5 bg-[var(--accent-mint)] group-hover:w-2 transition-all duration-300"></span>
        {children}
      </span>
    </a>
  );
}