import type { ReadInputBarcodeFormat, ReadOutputBarcodeFormat } from "zxing-wasm/reader";
export type CanvasImageSourceWebCodecs = HTMLOrSVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap | OffscreenCanvas | VideoFrame;
export type ImageBitmapSourceWebCodecs = CanvasImageSourceWebCodecs | Blob | ImageData;
export declare const BARCODE_FORMATS: ("aztec" | "code_128" | "code_39" | "code_93" | "codabar" | "databar" | "databar_expanded" | "databar_limited" | "data_matrix" | "dx_film_edge" | "ean_13" | "ean_8" | "itf" | "maxi_code" | "micro_qr_code" | "pdf417" | "qr_code" | "rm_qr_code" | "upc_a" | "upc_e" | "linear_codes" | "matrix_codes" | "any" | "unknown")[];
export type BarcodeFormat = (typeof BARCODE_FORMATS)[number];
export type ReadResultBarcodeFormat = Exclude<BarcodeFormat, "linear_codes" | "matrix_codes" | "any">;
export declare const formatMap: Map<"aztec" | "code_128" | "code_39" | "code_93" | "codabar" | "databar" | "databar_expanded" | "databar_limited" | "data_matrix" | "dx_film_edge" | "ean_13" | "ean_8" | "itf" | "maxi_code" | "micro_qr_code" | "pdf417" | "qr_code" | "rm_qr_code" | "upc_a" | "upc_e" | "linear_codes" | "matrix_codes" | "any" | "unknown", ReadInputBarcodeFormat>;
export declare function convertFormat(target: ReadOutputBarcodeFormat): ReadResultBarcodeFormat;
export declare function isBlob(image: ImageBitmapSourceWebCodecs): image is Blob;
export declare function getImageDataOrBlobFromImageBitmapSource(image: ImageBitmapSourceWebCodecs): Promise<ImageData | Blob | null>;
declare global {
    interface SVGImageElement {
        decode?(): Promise<void>;
    }
}
export declare function addPrefixToExceptionOrError(e: unknown, prefix: string): TypeError | DOMException;
