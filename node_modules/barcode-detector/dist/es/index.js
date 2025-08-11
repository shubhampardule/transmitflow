import "./polyfill.js";
import { BarcodeDetector as M, ZXING_CPP_COMMIT as X, ZXING_WASM_SHA256 as Z, ZXING_WASM_VERSION as _, prepareZXingModule as d, purgeZXingModule as i, setZXingModuleOverrides as p } from "./ponyfill.js";
export {
  M as BarcodeDetector,
  X as ZXING_CPP_COMMIT,
  Z as ZXING_WASM_SHA256,
  _ as ZXING_WASM_VERSION,
  d as prepareZXingModule,
  i as purgeZXingModule,
  p as setZXingModuleOverrides
};
