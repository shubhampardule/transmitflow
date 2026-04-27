import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'TransmitFlow — private peer-to-peer file transfer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 64px',
          color: 'white',
          background:
            'linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #581c87 72%, #9d174d 100%)',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              position: 'relative',
              width: 64,
              height: 64,
              display: 'flex',
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: 44,
                height: 44,
                borderRadius: 9999,
                left: 0,
                top: 0,
                background: 'linear-gradient(135deg, #6366F1 0%, #A855F7 50%, #EC4899 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: 24,
                height: 24,
                borderRadius: 9999,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, #6366F1 0%, #A855F7 50%, #EC4899 100%)',
              }}
            />
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1.2 }}>TransmitFlow</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 980 }}>
          <div style={{ fontSize: 64, lineHeight: 1.04, fontWeight: 800, letterSpacing: -1.6 }}>
            Private peer-to-peer file transfer
          </div>
          <div style={{ fontSize: 30, opacity: 0.9 }}>
            No account. No cloud upload step. Just direct sharing.
          </div>
        </div>

        <div style={{ fontSize: 24, opacity: 0.8 }}>transmitflow.app</div>
      </div>
    ),
    {
      ...size,
    },
  );
}
