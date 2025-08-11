import { type BarcodeFormat, type ImageBitmapSourceWebCodecs, type ReadResultBarcodeFormat } from "./utils.js";
export type { BarcodeFormat } from "./utils.js";
export interface BarcodeDetectorOptions {
    formats?: BarcodeFormat[];
}
export interface Point2D {
    x: number;
    y: number;
}
export interface DetectedBarcode {
    boundingBox: DOMRectReadOnly;
    rawValue: string;
    format: ReadResultBarcodeFormat;
    cornerPoints: [Point2D, Point2D, Point2D, Point2D];
}
export declare class BarcodeDetector {
    #private;
    constructor(barcodeDectorOptions?: BarcodeDetectorOptions);
    static getSupportedFormats(): Promise<readonly BarcodeFormat[]>;
    detect(image: ImageBitmapSourceWebCodecs): Promise<DetectedBarcode[]>;
}
