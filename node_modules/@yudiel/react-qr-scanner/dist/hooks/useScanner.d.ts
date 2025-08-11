import { RefObject } from 'react';
import { type DetectedBarcode, type BarcodeFormat } from 'barcode-detector';
interface IUseScannerProps {
    videoElementRef: RefObject<HTMLVideoElement | null>;
    onScan: (result: DetectedBarcode[]) => void;
    onFound: (result: DetectedBarcode[]) => void;
    formats?: BarcodeFormat[];
    sound?: boolean | string;
    allowMultiple?: boolean;
    retryDelay?: number;
    scanDelay?: number;
}
export default function useScanner(props: IUseScannerProps): {
    startScanning: () => void;
    stopScanning: () => void;
};
export {};
//# sourceMappingURL=useScanner.d.ts.map