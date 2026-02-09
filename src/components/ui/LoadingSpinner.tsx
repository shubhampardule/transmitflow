import React, { useEffect, useMemo, useState } from "react";
import TransmitFlowLogoOnly from "./TransmitFlowLogoOnly";

interface LoadingSpinnerProps {
  connectionStatus?: "connecting" | "connected" | "failed";
  errorMessage?: string;
  isExiting?: boolean;
}

export default function LoadingSpinner({
  connectionStatus = "connecting",
  errorMessage = "",
  isExiting = false,
}: LoadingSpinnerProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      return;
    }
    if (savedTheme === "light") {
      setIsDarkMode(false);
      return;
    }

    setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  const statusMeta = useMemo(() => {
    switch (connectionStatus) {
      case "connected":
        return {
          label: "Connected",
          detail: "Secure channel established. Launching workspace...",
          progressClass: "w-full",
          toneClass: isDarkMode ? "text-emerald-300" : "text-emerald-700",
        };
      case "failed":
        return {
          label: "Connection failed",
          detail: errorMessage || "Unable to reach signaling service.",
          progressClass: "w-[36%]",
          toneClass: isDarkMode ? "text-rose-300" : "text-rose-700",
        };
      default:
        return {
          label: "Negotiating connection",
          detail: "Preparing encrypted peer-to-peer session...",
          progressClass: "w-[72%]",
          toneClass: isDarkMode ? "text-cyan-300" : "text-cyan-700",
        };
    }
  }, [connectionStatus, errorMessage, isDarkMode]);

  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen w-full items-center justify-center overflow-hidden transition-opacity duration-300 ${
        isExiting ? "opacity-0" : "opacity-100"
      } ${isDarkMode ? "bg-slate-950" : "bg-[#f6faf8]"}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute -left-20 top-[-12%] h-72 w-72 rounded-full blur-3xl ${
            isDarkMode ? "bg-cyan-500/20" : "bg-cyan-300/40"
          }`}
          style={{ animation: "orb-drift-a 10s ease-in-out infinite" }}
        />
        <div
          className={`absolute -right-16 bottom-[-16%] h-80 w-80 rounded-full blur-3xl ${
            isDarkMode ? "bg-amber-500/20" : "bg-amber-300/40"
          }`}
          style={{ animation: "orb-drift-b 11s ease-in-out infinite" }}
        />
        <div
          className={`absolute inset-0 ${
            isDarkMode ? "opacity-[0.14]" : "opacity-[0.22]"
          }`}
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.18) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div
        className={`relative w-[min(92vw,34rem)] rounded-3xl border p-6 shadow-2xl backdrop-blur-xl sm:p-8 ${
          isDarkMode
            ? "border-slate-700/70 bg-slate-900/70"
            : "border-slate-200/80 bg-white/80"
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`relative flex h-14 w-14 items-center justify-center rounded-2xl ${
              isDarkMode ? "bg-slate-800/80" : "bg-slate-100/80"
            }`}
          >
            <div
              className={`absolute inset-0 rounded-2xl ${
                isDarkMode ? "bg-cyan-400/15" : "bg-cyan-500/10"
              }`}
              style={{ animation: "logo-pulse 2.2s ease-in-out infinite" }}
            />
            <TransmitFlowLogoOnly
              size={34}
              color={isDarkMode ? "#22d3ee" : "#0f766e"}
            />
          </div>

          <div>
            <p
              className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${
                isDarkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              TransmitFlow
            </p>
            <h1
              className={`text-2xl font-bold ${
                isDarkMode ? "text-slate-100" : "text-slate-900"
              }`}
            >
              Opening session
            </h1>
          </div>
        </div>

        <div className="mt-8">
          <div
            className={`flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.2em] ${
              isDarkMode ? "text-slate-500" : "text-slate-500"
            }`}
          >
            <span>Sender</span>
            <span>Receiver</span>
          </div>

          <div className="relative mt-3 h-14">
            <div
              className={`absolute left-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full ${
                isDarkMode ? "bg-cyan-300" : "bg-cyan-600"
              }`}
            />
            <div
              className={`absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full ${
                isDarkMode ? "bg-amber-300" : "bg-amber-600"
              }`}
            />
            <div
              className={`absolute inset-x-4 top-1/2 h-[2px] -translate-y-1/2 ${
                isDarkMode ? "bg-slate-700" : "bg-slate-200"
              }`}
            />

            {connectionStatus !== "failed" &&
              [0, 1, 2].map((item) => (
                <span
                  key={item}
                  className={`absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full ${
                    isDarkMode ? "bg-cyan-300" : "bg-cyan-500"
                  }`}
                  style={{
                    left: "0%",
                    animation: "packet-travel 1.9s linear infinite",
                    animationDelay: `${item * 0.5}s`,
                  }}
                />
              ))}

            {connectionStatus === "failed" && (
              <div className="absolute inset-x-4 top-1/2 h-[2px] -translate-y-1/2 bg-rose-500/70" />
            )}
          </div>

          <div
            className={`h-1.5 overflow-hidden rounded-full ${
              isDarkMode ? "bg-slate-800" : "bg-slate-200"
            }`}
          >
            <div
              className={`h-full rounded-full transition-[width] duration-500 ${
                connectionStatus === "failed"
                  ? "bg-rose-500"
                  : isDarkMode
                    ? "bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300"
                    : "bg-gradient-to-r from-cyan-600 via-teal-500 to-amber-500"
              } ${statusMeta.progressClass} ${
                connectionStatus === "connecting" ? "animate-progress-wave" : ""
              }`}
            />
          </div>

          <div className="mt-4 space-y-1">
            <p className={`text-sm font-semibold ${statusMeta.toneClass}`}>{statusMeta.label}</p>
            <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              {statusMeta.detail}
            </p>
            {connectionStatus === "failed" && (
              <p className={`text-xs ${isDarkMode ? "text-slate-500" : "text-slate-500"}`}>
                Check your internet connection and retry.
              </p>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes orb-drift-a {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(18px, 20px, 0);
          }
        }

        @keyframes orb-drift-b {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(-24px, -16px, 0);
          }
        }

        @keyframes logo-pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.25;
          }
          50% {
            transform: scale(1.08);
            opacity: 0.55;
          }
        }

        @keyframes packet-travel {
          0% {
            left: 6%;
            opacity: 0;
          }
          18% {
            opacity: 1;
          }
          82% {
            opacity: 1;
          }
          100% {
            left: calc(100% - 1.25rem);
            opacity: 0;
          }
        }

        @keyframes progress-wave {
          0%,
          100% {
            filter: saturate(0.95);
          }
          50% {
            filter: saturate(1.2);
          }
        }

        .animate-progress-wave {
          animation: progress-wave 1.6s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-progress-wave {
            animation: none !important;
          }

          [style*="packet-travel"],
          [style*="logo-pulse"],
          [style*="orb-drift"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
