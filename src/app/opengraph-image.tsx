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
          color: '#E4E9EF',
          background: '#0A0E1A',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <svg width="52" height="52" viewBox="0 0 100 100">
            <line x1="32" y1="70" x2="68" y2="30" stroke="#E14A34" strokeWidth="6" />
            <rect x="14" y="56" width="28" height="28" rx="3" fill="#E4E9EF" />
            <rect x="58" y="16" width="28" height="28" rx="3" fill="#E4E9EF" />
          </svg>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1, fontFamily: 'monospace' }}>
            TransmitFlow
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 980 }}>
          <div style={{ fontSize: 62, lineHeight: 1.06, fontWeight: 700, letterSpacing: -1.5 }}>
            Files move in a straight line.
          </div>
          <div style={{ fontSize: 28, color: '#8B93A0' }}>
            Direct peer-to-peer file transfer over WebRTC. No account, no cloud step, no size limit.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 22, color: '#8B93A0', fontFamily: 'monospace' }}>
          <div style={{ width: 8, height: 8, background: '#E14A34' }} />
          transmitflow.fun
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
