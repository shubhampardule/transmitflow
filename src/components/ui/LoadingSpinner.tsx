import React, { useEffect, useMemo, useState } from "react";
import TransmitFlowLogoOnly from "./TransmitFlowLogoOnly";
import { Shield } from "lucide-react";

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
    // Check localStorage first
    const savedTheme = localStorage.getItem("theme");
    // Also check document class just in case hydration happened differently
    const docHasDark = document.documentElement.classList.contains("dark");

    if (savedTheme === "dark" || (!savedTheme && docHasDark)) {
      setIsDarkMode(true);
    } else if (savedTheme === "light") {
      setIsDarkMode(false);
    } else {
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  const statusMeta = useMemo(() => {
    switch (connectionStatus) {
      case "connected":
        return {
          label: "Connection Established",
          detail: "Launching workspace...",
          progressClass: "w-full",
          toneClass: "text-green-500",
          barColor: "bg-green-500",
        };
      case "failed":
        return {
          label: "Connection Failed",
          detail: errorMessage || "Unable to reach signaling service.",
          progressClass: "w-[36%]",
          toneClass: "text-red-500",
          barColor: "bg-red-500",
        };
      default:
        return {
          label: "Establishing Connection",
          detail: "Encrypting peer-to-peer session...",
          progressClass: "w-[75%]",
          toneClass: "text-blue-500",
          barColor: "bg-blue-500",
        };
    }
  }, [connectionStatus, errorMessage]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex h-screen w-full items-center justify-center overflow-hidden transition-opacity duration-500 ease-in-out ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background - Exact match with Main UI */}
      <div className="absolute inset-0 z-0 bg-background transition-colors duration-500">
        {/* Light Mode Gradient */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isDarkMode ? "opacity-0" : "opacity-100"
          }`}
          style={{
            background:
              "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
          }}
        />

        {/* Dark Mode Gradient - Ocean Night */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isDarkMode ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: `
            linear-gradient(135deg, 
              #0c1445 0%, 
              #1e1b4b 25%, 
              #312e81 50%, 
              #1e1b4b 75%, 
              #0c1445 100%
            )
          `,
          }}
        />

        {/* Dark Mode Particles (simplified/matched) */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isDarkMode ? "opacity-30" : "opacity-0"
          }`}
          style={{
            backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)
          `,
          }}
        />
      </div>

      {/* Main Card Container */}
      <div
        className={`relative z-10 w-[min(90vw,28rem)] rounded-xl border p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 ${
          isDarkMode
            ? "bg-gray-800/80 border-gray-700/50"
            : "bg-white/80 border-white/20"
        }`}
      >
        <div className="flex flex-col items-center justify-center text-center">
          {/* Logo Section */}
          <div className="relative mb-6">
            <div
              className={`absolute inset-0 rounded-full blur-xl ${
                isDarkMode ? "bg-blue-500/20" : "bg-blue-400/20"
              }`}
            />
            <div className="relative animate-bounce-gentle">
              <TransmitFlowLogoOnly
                size={64}
                color={isDarkMode ? "#60a5fa" : "#3b82f6"} 
              />
            </div>
          </div>

          {/* Title */}
          <h1
            className={`mb-2 text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent`}
          >
            TransmitFlow
          </h1>

          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            } mb-8`}
          >
            Secure P2P File Transmission
          </p>

          {/* Progress Section */}
          <div className="w-full space-y-4">
            {/* Status Text & Icon */}
            <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider">
              <span className={statusMeta.toneClass}>{statusMeta.label}</span>
              {connectionStatus === "connected" ? (
                <Shield className="h-4 w-4 text-green-500" />
              ) : (
                <span className="text-gray-400">{Math.round(connectionStatus === 'connecting' ? 75 : connectionStatus === 'failed' ? 100 : 0)}%</span>
              )}
            </div>

            {/* Progress Bar Container */}
            <div
              className={`h-2 w-full overflow-hidden rounded-full ${
                isDarkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
            >
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${
                   isDarkMode
                    ? "bg-gradient-to-r from-blue-500 to-purple-500"
                    : "bg-gradient-to-r from-blue-400 to-purple-500"
                } ${statusMeta.progressClass} ${
                  connectionStatus === "connecting" ? "animate-pulse" : ""
                }`}
              />
            </div>

            {/* Detail Text */}
            <p
              className={`text-xs ${
                isDarkMode ? "text-gray-500" : "text-gray-400"
              } transition-all duration-300`}
            >
              {statusMeta.detail}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(-5%); }
          50% { transform: translateY(5%); }
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
