// src/components/ScreenProtection.jsx
import { useEffect, useState } from "react";

export default function ScreenProtection({ children }) {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const showBlock = () => {
      setBlocked(true);
      setTimeout(() => setBlocked(false), 1600);
    };

    const onKeyDown = (e) => {
      const key = e.key.toLowerCase();

      if (
        key === "printscrn" ||
        (e.ctrlKey && key === "p") ||
        (e.ctrlKey && key === "s") ||
        (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key)) ||
        key === "f12"
      ) {
        e.preventDefault();
        showBlock();
      }
    };

    const onContextMenu = (e) => e.preventDefault();
    const onCopy = (e) => e.preventDefault();
    const onCut = (e) => e.preventDefault();
    const onPrint = () => showBlock();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("contextmenu", onContextMenu);
    window.addEventListener("copy", onCopy);
    window.addEventListener("cut", onCut);
    window.addEventListener("beforeprint", onPrint);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("contextmenu", onContextMenu);
      window.removeEventListener("copy", onCopy);
      window.removeEventListener("cut", onCut);
      window.removeEventListener("beforeprint", onPrint);
    };
  }, []);

  return (
    <div className="relative min-h-screen select-none">
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }

          body::before {
            content: "Printing and screenshots are disabled for protected course content.";
            visibility: visible !important;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            font-size: 22px;
            font-weight: 700;
            color: #0f172a;
          }
        }
      `}</style>

      <div className={blocked ? "blur-md pointer-events-none" : ""}>
        {children}
      </div>

      <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.06] grid place-items-center">
        <div className="-rotate-12 text-6xl font-black text-slate-900">
          AstraKalam LMS
        </div>
      </div>

      {blocked && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/95 flex items-center justify-center text-center px-6">
          <div>
            <h2 className="text-2xl font-extrabold text-white mb-2">
              Screen capture is disabled
            </h2>
            <p className="text-slate-300">
              Protected course content cannot be copied, printed, or captured from this page.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
