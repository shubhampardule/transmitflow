declare global {
    var BarcodeDetector: typeof import("./core.js").BarcodeDetector;
    type BarcodeDetector = import("./core.js").BarcodeDetector;
    type BarcodeFormat = import("./core.js").BarcodeFormat;
    type BarcodeDetectorOptions = import("./core.js").BarcodeDetectorOptions;
    type DetectedBarcode = import("./core.js").DetectedBarcode;
}
export * from "./zxing-exported.js";
