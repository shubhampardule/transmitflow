import { BarcodeDetector as r } from "./ponyfill.js";
import { ZXING_CPP_COMMIT as d, ZXING_WASM_SHA256 as i, ZXING_WASM_VERSION as X, prepareZXingModule as Z, purgeZXingModule as _, setZXingModuleOverrides as g } from "./ponyfill.js";
var e;
(e = globalThis.BarcodeDetector) != null || (globalThis.BarcodeDetector = r);
export {
  d as ZXING_CPP_COMMIT,
  i as ZXING_WASM_SHA256,
  X as ZXING_WASM_VERSION,
  Z as prepareZXingModule,
  _ as purgeZXingModule,
  g as setZXingModuleOverrides
};
