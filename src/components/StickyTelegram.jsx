import { FaTelegramPlane } from "react-icons/fa";

export default function StickyTelegram() {
  return (
    <a
      href="https://t.me/OzakAGI" // <- your telegram link
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-6 right-6 
        w-14 h-14 
        rounded-full 
        bg-gradient-to-r from-[#4cf5c8] via-[#6ff8d5] to-[#b6ff39]
        shadow-[0_0_30px_rgba(111,248,213,0.45)]
        flex items-center justify-center
        hover:scale-110 hover:brightness-110 transition-all duration-300
        z-[9999]
      "
    >
      <FaTelegramPlane className="text-black text-3xl" />
    </a>
  );
}
