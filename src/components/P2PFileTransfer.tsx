'use client';

import TransferProgress from './TransferProgress';
import LandingNavbar from './landing/LandingNavbar';
import LandingHeroSection from './landing/LandingHeroSection';
import LandingHowItWorksSection from './landing/LandingHowItWorksSection';
import LandingFeaturesSection from './landing/LandingFeaturesSection';
import LandingSupportSection from './landing/LandingSupportSection';
import LandingFooter from './landing/LandingFooter';
import { useP2PTransferController } from './hooks/useP2PTransferController';

export default function P2PFileTransfer() {
  const {
    isConnected,
    isOnline,
    signalingError,
    signalingStatus,
    activeTab,
    setActiveTab,
    transferState,
    transferStartedAt,
    transferEndedAt,
    roomCode,
    receivedFiles,
    handleRetrySignaling,
    handleSendFiles,
    handleReceiveFiles,
    handleCancelTransfer,
    handleReset,
    handleCancelFile,
    handleRetry,
    handleBackToSend,
    handleBackToReceive,
  } = useP2PTransferController();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="blob blob-1 absolute -top-48 -right-48 h-[600px] w-[600px] bg-indigo-400/15 dark:bg-indigo-600/8" />
        <div className="blob blob-2 absolute top-1/2 -left-48 h-[500px] w-[500px] bg-purple-400/10 dark:bg-purple-600/5" />
        <div className="blob blob-3 absolute -bottom-32 right-1/4 h-[450px] w-[450px] bg-pink-400/8 dark:bg-pink-600/4" />
        <div className="absolute inset-0 dot-pattern" />
      </div>

      <LandingNavbar signalingStatus={signalingStatus} />

      <main className="mx-auto w-full max-w-6xl px-4 md:px-6 pb-16">
        {transferState.status === 'idle' ? (
          <>
            <LandingHeroSection
              isConnected={isConnected}
              isOnline={isOnline}
              signalingStatus={signalingStatus}
              signalingError={signalingError}
              onRetrySignaling={handleRetrySignaling}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onSendFiles={handleSendFiles}
              onReceiveFiles={handleReceiveFiles}
              roomCode={roomCode}
            />
            <LandingHowItWorksSection />
            <LandingFeaturesSection />
            <LandingSupportSection />
          </>
        ) : (
          <section className="pt-8 pb-20">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-2xl animate-glow-pulse" />
                <div className="relative rounded-2xl border border-border bg-card/90 backdrop-blur-sm shadow-2xl p-1">
                  <div className="rounded-xl bg-card p-5 md:p-7">
                    <TransferProgress
                      transferState={transferState}
                      transferStartedAt={transferStartedAt}
                      transferEndedAt={transferEndedAt}
                      roomCode={roomCode}
                      receivedFiles={receivedFiles}
                      onCancel={handleCancelTransfer}
                      onReset={handleReset}
                      onCancelFile={handleCancelFile}
                      role={activeTab}
                      onRetry={handleRetry}
                      onBackToSend={handleBackToSend}
                      onBackToReceive={handleBackToReceive}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <LandingFooter />
    </div>
  );
}
