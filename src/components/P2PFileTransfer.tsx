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
    receiveMode,
    receivedFiles,
    handleRetrySignaling,
    handleSendFiles,
    handlePrepareReceive,
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
        <div className="absolute inset-0 grid-paper" />
      </div>

      <LandingNavbar />

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
              onTabChange={(tab) => {
                setActiveTab(tab);
              }}
              onSendFiles={handleSendFiles}
              onPrepareReceive={handlePrepareReceive}
              onReceiveFiles={handleReceiveFiles}
            />
            <LandingHowItWorksSection />
            <LandingFeaturesSection />
            <LandingSupportSection />
          </>
        ) : (
          <section className="pt-8 pb-20">
            <div className="max-w-2xl mx-auto">
              <div className="rounded-lg border border-border bg-card">
                <div className="p-5 md:p-7">
                  <TransferProgress
                    transferState={transferState}
                    transferStartedAt={transferStartedAt}
                    transferEndedAt={transferEndedAt}
                    roomCode={roomCode}
                    receiveMode={receiveMode}
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
          </section>
        )}
      </main>

      <LandingFooter />
    </div>
  );
}
