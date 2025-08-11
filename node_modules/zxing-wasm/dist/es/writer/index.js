import { p as wn, a as bn, w as $n } from "../share.js";
import { Z as Wn, b as jn, c as xn, f as Dn, i as Un, l as On, m as Vn } from "../share.js";
var mr = async function(E = {}) {
  var Y, or, f = E, yr, sr, Gr = new Promise((r, e) => {
    yr = r, sr = e;
  }), zr = typeof window == "object", qr = typeof Bun < "u", wr = typeof WorkerGlobalScope < "u";
  typeof process == "object" && (!((or = process.versions) === null || or === void 0) && or.node) && process.type != "renderer";
  var br = "./this.program", Yr, vr = "";
  function Kr(r) {
    return f.locateFile ? f.locateFile(r, vr) : vr + r;
  }
  var $r, fr;
  if (zr || wr || qr) {
    try {
      vr = new URL(".", Yr).href;
    } catch {
    }
    wr && (fr = (r) => {
      var e = new XMLHttpRequest();
      return e.open("GET", r, !1), e.responseType = "arraybuffer", e.send(null), new Uint8Array(e.response);
    }), $r = async (r) => {
      var e = await fetch(r, {
        credentials: "same-origin"
      });
      if (e.ok)
        return e.arrayBuffer();
      throw new Error(e.status + " : " + e.url);
    };
  }
  var Tr = console.log.bind(console), V = console.error.bind(console), X, K, Ar = !1, W, A, J, I, N, c, Cr, Er;
  function Rr() {
    var r = K.buffer;
    W = new Int8Array(r), J = new Int16Array(r), f.HEAPU8 = A = new Uint8Array(r), I = new Uint16Array(r), N = new Int32Array(r), c = new Uint32Array(r), Cr = new Float32Array(r), Er = new Float64Array(r);
  }
  function Jr() {
    if (f.preRun)
      for (typeof f.preRun == "function" && (f.preRun = [f.preRun]); f.preRun.length; )
        le(f.preRun.shift());
    Fr(Pr);
  }
  function Qr() {
    m.oa();
  }
  function re() {
    if (f.postRun)
      for (typeof f.postRun == "function" && (f.postRun = [f.postRun]); f.postRun.length; )
        ue(f.postRun.shift());
    Fr(kr);
  }
  var j = 0, L = null;
  function ee(r) {
    var e;
    j++, (e = f.monitorRunDependencies) === null || e === void 0 || e.call(f, j);
  }
  function te(r) {
    var e;
    if (j--, (e = f.monitorRunDependencies) === null || e === void 0 || e.call(f, j), j == 0 && L) {
      var t = L;
      L = null, t();
    }
  }
  function ur(r) {
    var e;
    (e = f.onAbort) === null || e === void 0 || e.call(f, r), r = "Aborted(" + r + ")", V(r), Ar = !0, r += ". Build with -sASSERTIONS for more info.";
    var t = new WebAssembly.RuntimeError(r);
    throw sr(t), t;
  }
  var H;
  function ne() {
    return Kr("zxing_writer.wasm");
  }
  function ae(r) {
    if (r == H && X)
      return new Uint8Array(X);
    if (fr)
      return fr(r);
    throw "both async and sync fetching of the wasm failed";
  }
  async function ie(r) {
    if (!X)
      try {
        var e = await $r(r);
        return new Uint8Array(e);
      } catch {
      }
    return ae(r);
  }
  async function oe(r, e) {
    try {
      var t = await ie(r), n = await WebAssembly.instantiate(t, e);
      return n;
    } catch (a) {
      V(`failed to asynchronously prepare wasm: ${a}`), ur(a);
    }
  }
  async function se(r, e, t) {
    if (!r && typeof WebAssembly.instantiateStreaming == "function")
      try {
        var n = fetch(e, {
          credentials: "same-origin"
        }), a = await WebAssembly.instantiateStreaming(n, t);
        return a;
      } catch (i) {
        V(`wasm streaming compile failed: ${i}`), V("falling back to ArrayBuffer instantiation");
      }
    return oe(e, t);
  }
  function ve() {
    return {
      a: Vt
    };
  }
  async function fe() {
    function r(i, o) {
      return m = i.exports, K = m.na, Rr(), Vr = m.qa, te(), m;
    }
    ee();
    function e(i) {
      return r(i.instance);
    }
    var t = ve();
    if (f.instantiateWasm)
      return new Promise((i, o) => {
        f.instantiateWasm(t, (s, v) => {
          i(r(s));
        });
      });
    H != null || (H = ne());
    try {
      var n = await se(X, H, t), a = e(n);
      return a;
    } catch (i) {
      return sr(i), Promise.reject(i);
    }
  }
  var Fr = (r) => {
    for (; r.length > 0; )
      r.shift()(f);
  }, kr = [], ue = (r) => kr.push(r), Pr = [], le = (r) => Pr.push(r), h = (r) => Ht(r), p = () => Bt(), Q = [], rr = 0, ce = (r) => {
    var e = new lr(r);
    return e.get_caught() || (e.set_caught(!0), rr--), e.set_rethrown(!1), Q.push(e), Xt(r), Gt(r);
  }, R = 0, de = () => {
    g(0, 0);
    var r = Q.pop();
    Zt(r.excPtr), R = 0;
  };
  class lr {
    constructor(e) {
      this.excPtr = e, this.ptr = e - 24;
    }
    set_type(e) {
      c[this.ptr + 4 >> 2] = e;
    }
    get_type() {
      return c[this.ptr + 4 >> 2];
    }
    set_destructor(e) {
      c[this.ptr + 8 >> 2] = e;
    }
    get_destructor() {
      return c[this.ptr + 8 >> 2];
    }
    set_caught(e) {
      e = e ? 1 : 0, W[this.ptr + 12] = e;
    }
    get_caught() {
      return W[this.ptr + 12] != 0;
    }
    set_rethrown(e) {
      e = e ? 1 : 0, W[this.ptr + 13] = e;
    }
    get_rethrown() {
      return W[this.ptr + 13] != 0;
    }
    init(e, t) {
      this.set_adjusted_ptr(0), this.set_type(e), this.set_destructor(t);
    }
    set_adjusted_ptr(e) {
      c[this.ptr + 16 >> 2] = e;
    }
    get_adjusted_ptr() {
      return c[this.ptr + 16 >> 2];
    }
  }
  var er = (r) => Nt(r), cr = (r) => {
    var e = R;
    if (!e)
      return er(0), 0;
    var t = new lr(e);
    t.set_adjusted_ptr(e);
    var n = t.get_type();
    if (!n)
      return er(0), e;
    for (var a of r) {
      if (a === 0 || a === n)
        break;
      var i = t.ptr + 16;
      if (Lt(a, n, i))
        return er(a), e;
    }
    return er(n), e;
  }, _e = () => cr([]), ge = (r) => cr([r]), he = (r, e) => cr([r, e]), pe = () => {
    var r = Q.pop();
    r || ur("no exception to throw");
    var e = r.excPtr;
    throw r.get_rethrown() || (Q.push(r), r.set_rethrown(!0), r.set_caught(!1), rr++), R = e, R;
  }, me = (r, e, t) => {
    var n = new lr(r);
    throw n.init(e, t), R = r, rr++, R;
  }, ye = () => rr, we = (r) => {
    throw R || (R = r), R;
  }, Mr = typeof TextDecoder < "u" ? new TextDecoder() : void 0, Sr = function(r) {
    let e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : NaN;
    for (var n = e + t, a = e; r[a] && !(a >= n); ) ++a;
    if (a - e > 16 && r.buffer && Mr)
      return Mr.decode(r.subarray(e, a));
    for (var i = ""; e < a; ) {
      var o = r[e++];
      if (!(o & 128)) {
        i += String.fromCharCode(o);
        continue;
      }
      var s = r[e++] & 63;
      if ((o & 224) == 192) {
        i += String.fromCharCode((o & 31) << 6 | s);
        continue;
      }
      var v = r[e++] & 63;
      if ((o & 240) == 224 ? o = (o & 15) << 12 | s << 6 | v : o = (o & 7) << 18 | s << 12 | v << 6 | r[e++] & 63, o < 65536)
        i += String.fromCharCode(o);
      else {
        var u = o - 65536;
        i += String.fromCharCode(55296 | u >> 10, 56320 | u & 1023);
      }
    }
    return i;
  }, be = (r, e) => r ? Sr(A, r, e) : "";
  function $e(r, e, t) {
    return 0;
  }
  function Te(r, e, t) {
    return 0;
  }
  var Ae = (r, e, t) => {
  };
  function Ce(r, e, t, n) {
  }
  var Ee = (r, e) => {
  }, Re = () => ur(""), tr = {}, dr = (r) => {
    for (; r.length; ) {
      var e = r.pop(), t = r.pop();
      t(e);
    }
  };
  function nr(r) {
    return this.fromWireType(c[r >> 2]);
  }
  var B = {}, x = {}, ar = {}, Fe = class extends Error {
    constructor(e) {
      super(e), this.name = "InternalError";
    }
  }, Wr = (r) => {
    throw new Fe(r);
  }, jr = (r, e, t) => {
    r.forEach((s) => ar[s] = e);
    function n(s) {
      var v = t(s);
      v.length !== r.length && Wr("Mismatched type converter count");
      for (var u = 0; u < r.length; ++u)
        F(r[u], v[u]);
    }
    var a = new Array(e.length), i = [], o = 0;
    e.forEach((s, v) => {
      x.hasOwnProperty(s) ? a[v] = x[s] : (i.push(s), B.hasOwnProperty(s) || (B[s] = []), B[s].push(() => {
        a[v] = x[s], ++o, o === i.length && n(a);
      }));
    }), i.length === 0 && n(a);
  }, ke = (r) => {
    var e = tr[r];
    delete tr[r];
    var t = e.rawConstructor, n = e.rawDestructor, a = e.fields, i = a.map((o) => o.getterReturnType).concat(a.map((o) => o.setterArgumentType));
    jr([r], i, (o) => {
      var s = {};
      return a.forEach((v, u) => {
        var l = v.fieldName, d = o[u], y = o[u].optional, w = v.getter, T = v.getterContext, b = o[u + a.length], O = v.setter, k = v.setterContext;
        s[l] = {
          read: (q) => d.fromWireType(w(T, q)),
          write: (q, S) => {
            var ir = [];
            O(k, q, b.toWireType(ir, S)), dr(ir);
          },
          optional: y
        };
      }), [{
        name: e.name,
        fromWireType: (v) => {
          var u = {};
          for (var l in s)
            u[l] = s[l].read(v);
          return n(v), u;
        },
        toWireType: (v, u) => {
          for (var l in s)
            if (!(l in u) && !s[l].optional)
              throw new TypeError(`Missing field: "${l}"`);
          var d = t();
          for (l in s)
            s[l].write(d, u[l]);
          return v !== null && v.push(n, d), d;
        },
        argPackAdvance: P,
        readValueFromPointer: nr,
        destructorFunction: n
      }];
    });
  }, Pe = (r, e, t, n, a) => {
  }, Me = () => {
    for (var r = new Array(256), e = 0; e < 256; ++e)
      r[e] = String.fromCharCode(e);
    xr = r;
  }, xr, $ = (r) => {
    for (var e = "", t = r; A[t]; )
      e += xr[A[t++]];
    return e;
  }, Se = class extends Error {
    constructor(e) {
      super(e), this.name = "BindingError";
    }
  }, C = (r) => {
    throw new Se(r);
  };
  function We(r, e) {
    let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    var n = e.name;
    if (r || C(`type "${n}" must have a positive integer typeid pointer`), x.hasOwnProperty(r)) {
      if (t.ignoreDuplicateRegistrations)
        return;
      C(`Cannot register type '${n}' twice`);
    }
    if (x[r] = e, delete ar[r], B.hasOwnProperty(r)) {
      var a = B[r];
      delete B[r], a.forEach((i) => i());
    }
  }
  function F(r, e) {
    let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return We(r, e, t);
  }
  var P = 8, je = (r, e, t, n) => {
    e = $(e), F(r, {
      name: e,
      fromWireType: function(a) {
        return !!a;
      },
      toWireType: function(a, i) {
        return i ? t : n;
      },
      argPackAdvance: P,
      readValueFromPointer: function(a) {
        return this.fromWireType(A[a]);
      },
      destructorFunction: null
    });
  }, Dr = [], D = [0, 1, , 1, null, 1, !0, 1, !1, 1], _r = (r) => {
    r > 9 && --D[r + 1] === 0 && (D[r] = void 0, Dr.push(r));
  }, M = {
    toValue: (r) => (r || C(`Cannot use deleted val. handle = ${r}`), D[r]),
    toHandle: (r) => {
      switch (r) {
        case void 0:
          return 2;
        case null:
          return 4;
        case !0:
          return 6;
        case !1:
          return 8;
        default: {
          const e = Dr.pop() || D.length;
          return D[e] = r, D[e + 1] = 1, e;
        }
      }
    }
  }, xe = {
    name: "emscripten::val",
    fromWireType: (r) => {
      var e = M.toValue(r);
      return _r(r), e;
    },
    toWireType: (r, e) => M.toHandle(e),
    argPackAdvance: P,
    readValueFromPointer: nr,
    destructorFunction: null
  }, De = (r) => F(r, xe), Ue = (r, e) => {
    switch (e) {
      case 4:
        return function(t) {
          return this.fromWireType(Cr[t >> 2]);
        };
      case 8:
        return function(t) {
          return this.fromWireType(Er[t >> 3]);
        };
      default:
        throw new TypeError(`invalid float width (${e}): ${r}`);
    }
  }, Oe = (r, e, t) => {
    e = $(e), F(r, {
      name: e,
      fromWireType: (n) => n,
      toWireType: (n, a) => a,
      argPackAdvance: P,
      readValueFromPointer: Ue(e, t),
      destructorFunction: null
    });
  }, Ur = (r, e) => Object.defineProperty(e, "name", {
    value: r
  });
  function Ve(r) {
    for (var e = 1; e < r.length; ++e)
      if (r[e] !== null && r[e].destructorFunction === void 0)
        return !0;
    return !1;
  }
  function Ie(r, e, t, n, a, i) {
    var o = e.length;
    o < 2 && C("argTypes array size mismatch! Must at least get return value and 'this' types!"), e[1];
    var s = Ve(e), v = e[0].name !== "void", u = o - 2, l = new Array(u), d = [], y = [], w = function() {
      y.length = 0;
      var T;
      d.length = 1, d[0] = a;
      for (var b = 0; b < u; ++b)
        l[b] = e[b + 2].toWireType(y, b < 0 || arguments.length <= b ? void 0 : arguments[b]), d.push(l[b]);
      var O = n(...d);
      function k(q) {
        if (s)
          dr(y);
        else
          for (var S = 2; S < e.length; S++) {
            var ir = S === 1 ? T : l[S - 2];
            e[S].destructorFunction !== null && e[S].destructorFunction(ir);
          }
        if (v)
          return e[0].fromWireType(q);
      }
      return k(O);
    };
    return Ur(r, w);
  }
  var Ne = (r, e, t) => {
    if (r[e].overloadTable === void 0) {
      var n = r[e];
      r[e] = function() {
        for (var a = arguments.length, i = new Array(a), o = 0; o < a; o++)
          i[o] = arguments[o];
        return r[e].overloadTable.hasOwnProperty(i.length) || C(`Function '${t}' called with an invalid number of arguments (${i.length}) - expects one of (${r[e].overloadTable})!`), r[e].overloadTable[i.length].apply(this, i);
      }, r[e].overloadTable = [], r[e].overloadTable[n.argCount] = n;
    }
  }, He = (r, e, t) => {
    f.hasOwnProperty(r) ? ((t === void 0 || f[r].overloadTable !== void 0 && f[r].overloadTable[t] !== void 0) && C(`Cannot register public name '${r}' twice`), Ne(f, r, r), f[r].overloadTable.hasOwnProperty(t) && C(`Cannot register multiple overloads of a function with the same number of arguments (${t})!`), f[r].overloadTable[t] = e) : (f[r] = e, f[r].argCount = t);
  }, Be = (r, e) => {
    for (var t = [], n = 0; n < r; n++)
      t.push(c[e + n * 4 >> 2]);
    return t;
  }, Ze = (r, e, t) => {
    f.hasOwnProperty(r) || Wr("Replacing nonexistent public symbol"), f[r].overloadTable !== void 0 && t !== void 0 ? f[r].overloadTable[t] = e : (f[r] = e, f[r].argCount = t);
  }, Or = [], Vr, _ = (r) => {
    var e = Or[r];
    return e || (Or[r] = e = Vr.get(r)), e;
  }, Xe = function(r, e) {
    let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
    if (r.includes("j"))
      return dynCallLegacy(r, e, t);
    var n = _(e), a = n(...t);
    function i(o) {
      return o;
    }
    return a;
  }, Le = function(r, e) {
    let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
    return function() {
      for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
        a[i] = arguments[i];
      return Xe(r, e, a, t);
    };
  }, G = function(r, e) {
    r = $(r);
    function t() {
      if (r.includes("j"))
        return Le(r, e);
      var a = _(e);
      return a;
    }
    var n = t();
    return typeof n != "function" && C(`unknown function pointer with signature ${r}: ${e}`), n;
  };
  class Ge extends Error {
  }
  var Ir = (r) => {
    var e = It(r), t = $(e);
    return U(e), t;
  }, ze = (r, e) => {
    var t = [], n = {};
    function a(i) {
      if (!n[i] && !x[i]) {
        if (ar[i]) {
          ar[i].forEach(a);
          return;
        }
        t.push(i), n[i] = !0;
      }
    }
    throw e.forEach(a), new Ge(`${r}: ` + t.map(Ir).join([", "]));
  }, qe = (r) => {
    r = r.trim();
    const e = r.indexOf("(");
    return e === -1 ? r : r.slice(0, e);
  }, Ye = (r, e, t, n, a, i, o, s) => {
    var v = Be(e, t);
    r = $(r), r = qe(r), a = G(n, a), He(r, function() {
      ze(`Cannot call ${r} due to unbound types`, v);
    }, e - 1), jr([], v, (u) => {
      var l = [u[0], null].concat(u.slice(1));
      return Ze(r, Ie(r, l, null, a, i), e - 1), [];
    });
  }, Ke = (r, e, t) => {
    switch (e) {
      case 1:
        return t ? (n) => W[n] : (n) => A[n];
      case 2:
        return t ? (n) => J[n >> 1] : (n) => I[n >> 1];
      case 4:
        return t ? (n) => N[n >> 2] : (n) => c[n >> 2];
      default:
        throw new TypeError(`invalid integer width (${e}): ${r}`);
    }
  }, Je = (r, e, t, n, a) => {
    e = $(e);
    const i = n === 0;
    let o = (v) => v;
    if (i) {
      var s = 32 - 8 * t;
      o = (v) => v << s >>> s, a = o(a);
    }
    F(r, {
      name: e,
      fromWireType: o,
      toWireType: (v, u) => u,
      argPackAdvance: P,
      readValueFromPointer: Ke(e, t, n !== 0),
      destructorFunction: null
    });
  }, Qe = (r, e, t) => {
    var n = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array], a = n[e];
    function i(o) {
      var s = c[o >> 2], v = c[o + 4 >> 2];
      return new a(W.buffer, v, s);
    }
    t = $(t), F(r, {
      name: t,
      fromWireType: i,
      argPackAdvance: P,
      readValueFromPointer: i
    }, {
      ignoreDuplicateRegistrations: !0
    });
  }, rt = (r, e, t, n) => {
    if (!(n > 0)) return 0;
    for (var a = t, i = t + n - 1, o = 0; o < r.length; ++o) {
      var s = r.charCodeAt(o);
      if (s >= 55296 && s <= 57343) {
        var v = r.charCodeAt(++o);
        s = 65536 + ((s & 1023) << 10) | v & 1023;
      }
      if (s <= 127) {
        if (t >= i) break;
        e[t++] = s;
      } else if (s <= 2047) {
        if (t + 1 >= i) break;
        e[t++] = 192 | s >> 6, e[t++] = 128 | s & 63;
      } else if (s <= 65535) {
        if (t + 2 >= i) break;
        e[t++] = 224 | s >> 12, e[t++] = 128 | s >> 6 & 63, e[t++] = 128 | s & 63;
      } else {
        if (t + 3 >= i) break;
        e[t++] = 240 | s >> 18, e[t++] = 128 | s >> 12 & 63, e[t++] = 128 | s >> 6 & 63, e[t++] = 128 | s & 63;
      }
    }
    return e[t] = 0, t - a;
  }, Z = (r, e, t) => rt(r, A, e, t), Nr = (r) => {
    for (var e = 0, t = 0; t < r.length; ++t) {
      var n = r.charCodeAt(t);
      n <= 127 ? e++ : n <= 2047 ? e += 2 : n >= 55296 && n <= 57343 ? (e += 4, ++t) : e += 3;
    }
    return e;
  }, et = (r, e) => {
    e = $(e), F(r, {
      name: e,
      fromWireType(t) {
        for (var n = c[t >> 2], a = t + 4, i, o, s = a, o = 0; o <= n; ++o) {
          var v = a + o;
          if (o == n || A[v] == 0) {
            var u = v - s, l = be(s, u);
            i === void 0 ? i = l : (i += "\0", i += l), s = v + 1;
          }
        }
        return U(t), i;
      },
      toWireType(t, n) {
        n instanceof ArrayBuffer && (n = new Uint8Array(n));
        var a, i = typeof n == "string";
        i || ArrayBuffer.isView(n) && n.BYTES_PER_ELEMENT == 1 || C("Cannot pass non-string to std::string"), i ? a = Nr(n) : a = n.length;
        var o = Xr(4 + a + 1), s = o + 4;
        return c[o >> 2] = a, i ? Z(n, s, a + 1) : A.set(n, s), t !== null && t.push(U, o), o;
      },
      argPackAdvance: P,
      readValueFromPointer: nr,
      destructorFunction(t) {
        U(t);
      }
    });
  }, Hr = typeof TextDecoder < "u" ? new TextDecoder("utf-16le") : void 0, tt = (r, e) => {
    for (var t = r >> 1, n = t + e / 2, a = t; !(a >= n) && I[a]; ) ++a;
    if (a - t > 16 && Hr) return Hr.decode(I.subarray(t, a));
    for (var i = "", o = t; !(o >= n); ++o) {
      var s = I[o];
      if (s == 0) break;
      i += String.fromCharCode(s);
    }
    return i;
  }, nt = (r, e, t) => {
    if (t != null || (t = 2147483647), t < 2) return 0;
    t -= 2;
    for (var n = e, a = t < r.length * 2 ? t / 2 : r.length, i = 0; i < a; ++i) {
      var o = r.charCodeAt(i);
      J[e >> 1] = o, e += 2;
    }
    return J[e >> 1] = 0, e - n;
  }, at = (r) => r.length * 2, it = (r, e) => {
    for (var t = 0, n = ""; !(t >= e / 4); ) {
      var a = N[r + t * 4 >> 2];
      if (a == 0) break;
      if (++t, a >= 65536) {
        var i = a - 65536;
        n += String.fromCharCode(55296 | i >> 10, 56320 | i & 1023);
      } else
        n += String.fromCharCode(a);
    }
    return n;
  }, ot = (r, e, t) => {
    if (t != null || (t = 2147483647), t < 4) return 0;
    for (var n = e, a = n + t - 4, i = 0; i < r.length; ++i) {
      var o = r.charCodeAt(i);
      if (o >= 55296 && o <= 57343) {
        var s = r.charCodeAt(++i);
        o = 65536 + ((o & 1023) << 10) | s & 1023;
      }
      if (N[e >> 2] = o, e += 4, e + 4 > a) break;
    }
    return N[e >> 2] = 0, e - n;
  }, st = (r) => {
    for (var e = 0, t = 0; t < r.length; ++t) {
      var n = r.charCodeAt(t);
      n >= 55296 && n <= 57343 && ++t, e += 4;
    }
    return e;
  }, vt = (r, e, t) => {
    t = $(t);
    var n, a, i, o;
    e === 2 ? (n = tt, a = nt, o = at, i = (s) => I[s >> 1]) : e === 4 && (n = it, a = ot, o = st, i = (s) => c[s >> 2]), F(r, {
      name: t,
      fromWireType: (s) => {
        for (var v = c[s >> 2], u, l = s + 4, d = 0; d <= v; ++d) {
          var y = s + 4 + d * e;
          if (d == v || i(y) == 0) {
            var w = y - l, T = n(l, w);
            u === void 0 ? u = T : (u += "\0", u += T), l = y + e;
          }
        }
        return U(s), u;
      },
      toWireType: (s, v) => {
        typeof v != "string" && C(`Cannot pass non-string to C++ string type ${t}`);
        var u = o(v), l = Xr(4 + u + e);
        return c[l >> 2] = u / e, a(v, l + 4, u + e), s !== null && s.push(U, l), l;
      },
      argPackAdvance: P,
      readValueFromPointer: nr,
      destructorFunction(s) {
        U(s);
      }
    });
  }, ft = (r, e, t, n, a, i) => {
    tr[r] = {
      name: $(e),
      rawConstructor: G(t, n),
      rawDestructor: G(a, i),
      fields: []
    };
  }, ut = (r, e, t, n, a, i, o, s, v, u) => {
    tr[r].fields.push({
      fieldName: $(e),
      getterReturnType: t,
      getter: G(n, a),
      getterContext: i,
      setterArgumentType: o,
      setter: G(s, v),
      setterContext: u
    });
  }, lt = (r, e) => {
    e = $(e), F(r, {
      isVoid: !0,
      name: e,
      argPackAdvance: 0,
      fromWireType: () => {
      },
      toWireType: (t, n) => {
      }
    });
  }, gr = [], ct = (r, e, t, n) => (r = gr[r], e = M.toValue(e), r(null, e, t, n)), dt = {}, _t = (r) => {
    var e = dt[r];
    return e === void 0 ? $(r) : e;
  }, Br = () => {
    if (typeof globalThis == "object")
      return globalThis;
    function r(e) {
      e.$$$embind_global$$$ = e;
      var t = typeof $$$embind_global$$$ == "object" && e.$$$embind_global$$$ == e;
      return t || delete e.$$$embind_global$$$, t;
    }
    if (typeof $$$embind_global$$$ == "object" || (typeof global == "object" && r(global) ? $$$embind_global$$$ = global : typeof self == "object" && r(self) && ($$$embind_global$$$ = self), typeof $$$embind_global$$$ == "object"))
      return $$$embind_global$$$;
    throw Error("unable to get global object.");
  }, gt = (r) => r === 0 ? M.toHandle(Br()) : (r = _t(r), M.toHandle(Br()[r])), ht = (r) => {
    var e = gr.length;
    return gr.push(r), e;
  }, Zr = (r, e) => {
    var t = x[r];
    return t === void 0 && C(`${e} has unknown type ${Ir(r)}`), t;
  }, pt = (r, e) => {
    for (var t = new Array(r), n = 0; n < r; ++n)
      t[n] = Zr(c[e + n * 4 >> 2], `parameter ${n}`);
    return t;
  }, mt = (r, e, t) => {
    var n = [], a = r.toWireType(n, t);
    return n.length && (c[e >> 2] = M.toHandle(n)), a;
  }, yt = Reflect.construct, wt = (r, e, t) => {
    var n = pt(r, e), a = n.shift();
    r--;
    var i = new Array(r), o = (v, u, l, d) => {
      for (var y = 0, w = 0; w < r; ++w)
        i[w] = n[w].readValueFromPointer(d + y), y += n[w].argPackAdvance;
      var T = t === 1 ? yt(u, i) : u.apply(v, i);
      return mt(a, l, T);
    }, s = `methodCaller<(${n.map((v) => v.name).join(", ")}) => ${a.name}>`;
    return ht(Ur(s, o));
  }, bt = (r) => {
    r > 9 && (D[r + 1] += 1);
  }, $t = (r) => {
    var e = M.toValue(r);
    dr(e), _r(r);
  }, Tt = (r, e) => {
    r = Zr(r, "_emval_take_value");
    var t = r.readValueFromPointer(e);
    return M.toHandle(t);
  }, At = (r, e, t, n) => {
    var a = (/* @__PURE__ */ new Date()).getFullYear(), i = new Date(a, 0, 1), o = new Date(a, 6, 1), s = i.getTimezoneOffset(), v = o.getTimezoneOffset(), u = Math.max(s, v);
    c[r >> 2] = u * 60, N[e >> 2] = +(s != v);
    var l = (w) => {
      var T = w >= 0 ? "-" : "+", b = Math.abs(w), O = String(Math.floor(b / 60)).padStart(2, "0"), k = String(b % 60).padStart(2, "0");
      return `UTC${T}${O}${k}`;
    }, d = l(s), y = l(v);
    v < s ? (Z(d, t, 17), Z(y, n, 17)) : (Z(d, n, 17), Z(y, t, 17));
  }, Ct = () => 2147483648, Et = (r, e) => Math.ceil(r / e) * e, Rt = (r) => {
    var e = K.buffer, t = (r - e.byteLength + 65535) / 65536 | 0;
    try {
      return K.grow(t), Rr(), 1;
    } catch {
    }
  }, Ft = (r) => {
    var e = A.length;
    r >>>= 0;
    var t = Ct();
    if (r > t)
      return !1;
    for (var n = 1; n <= 4; n *= 2) {
      var a = e * (1 + 0.2 / n);
      a = Math.min(a, r + 100663296);
      var i = Math.min(t, Et(Math.max(r, a), 65536)), o = Rt(i);
      if (o)
        return !0;
    }
    return !1;
  }, hr = {}, kt = () => br || "./this.program", z = () => {
    if (!z.strings) {
      var r = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", e = {
        USER: "web_user",
        LOGNAME: "web_user",
        PATH: "/",
        PWD: "/",
        HOME: "/home/web_user",
        LANG: r,
        _: kt()
      };
      for (var t in hr)
        hr[t] === void 0 ? delete e[t] : e[t] = hr[t];
      var n = [];
      for (var t in e)
        n.push(`${t}=${e[t]}`);
      z.strings = n;
    }
    return z.strings;
  }, Pt = (r, e) => {
    var t = 0, n = 0;
    for (var a of z()) {
      var i = e + t;
      c[r + n >> 2] = i, t += Z(a, i, 1 / 0) + 1, n += 4;
    }
    return 0;
  }, Mt = (r, e) => {
    var t = z();
    c[r >> 2] = t.length;
    var n = 0;
    for (var a of t)
      n += Nr(a) + 1;
    return c[e >> 2] = n, 0;
  }, St = (r) => 52, Wt = (r, e, t, n) => 52;
  function jt(r, e, t, n, a) {
    return 70;
  }
  var xt = [null, [], []], Dt = (r, e) => {
    var t = xt[r];
    e === 0 || e === 10 ? ((r === 1 ? Tr : V)(Sr(t)), t.length = 0) : t.push(e);
  }, Ut = (r, e, t, n) => {
    for (var a = 0, i = 0; i < t; i++) {
      var o = c[e >> 2], s = c[e + 4 >> 2];
      e += 8;
      for (var v = 0; v < s; v++)
        Dt(r, A[o + v]);
      a += s;
    }
    return c[n >> 2] = a, 0;
  }, Ot = (r) => r;
  Me(), f.noExitRuntime && f.noExitRuntime, f.print && (Tr = f.print), f.printErr && (V = f.printErr), f.wasmBinary && (X = f.wasmBinary), f.arguments && f.arguments, f.thisProgram && (br = f.thisProgram);
  var Vt = {
    r: ce,
    u: de,
    a: _e,
    f: ge,
    n: he,
    ea: pe,
    q: me,
    Y: ye,
    e: we,
    H: $e,
    ca: Te,
    $: Ae,
    da: Ce,
    _: Ee,
    U: Re,
    ka: ke,
    T: Pe,
    ia: je,
    ga: De,
    K: Oe,
    M: Ye,
    t: Je,
    o: Qe,
    ha: et,
    B: vt,
    C: ft,
    la: ut,
    ja: lt,
    Q: ct,
    ma: _r,
    O: gt,
    ba: wt,
    L: bt,
    P: $t,
    J: Tt,
    V: At,
    Z: Ft,
    W: Pt,
    X: Mt,
    F: St,
    aa: Wt,
    S: jt,
    G: Ut,
    D: gn,
    z: Kt,
    E: _n,
    m: hn,
    b: nn,
    d: rn,
    h: Yt,
    i: on,
    I: fn,
    s: ln,
    A: dn,
    w: pn,
    R: mn,
    k: en,
    j: qt,
    c: Jt,
    g: Qt,
    v: tn,
    x: un,
    fa: sn,
    p: cn,
    l: an,
    y: vn,
    N: Ot
  }, m = await fe();
  m.oa;
  var It = m.pa, Xr = f._malloc = m.ra, U = f._free = m.sa, g = m.ta, Nt = m.ua, Ht = m.va, Bt = m.wa, Zt = m.xa, Xt = m.ya, Lt = m.za, Gt = m.Aa;
  f.dynCall_jiji = m.Ba, f.dynCall_viijii = m.Ca;
  var zt = f.dynCall_jiiii = m.Da;
  f.dynCall_iiiiij = m.Ea, f.dynCall_iiiiijj = m.Fa, f.dynCall_iiiiiijj = m.Ga;
  function qt(r, e) {
    var t = p();
    try {
      _(r)(e);
    } catch (n) {
      if (h(t), n !== n + 0) throw n;
      g(1, 0);
    }
  }
  function Yt(r, e, t, n) {
    var a = p();
    try {
      return _(r)(e, t, n);
    } catch (i) {
      if (h(a), i !== i + 0) throw i;
      g(1, 0);
    }
  }
  function Kt(r, e, t, n, a) {
    var i = p();
    try {
      return _(r)(e, t, n, a);
    } catch (o) {
      if (h(i), o !== o + 0) throw o;
      g(1, 0);
    }
  }
  function Jt(r, e, t) {
    var n = p();
    try {
      _(r)(e, t);
    } catch (a) {
      if (h(n), a !== a + 0) throw a;
      g(1, 0);
    }
  }
  function Qt(r, e, t, n) {
    var a = p();
    try {
      _(r)(e, t, n);
    } catch (i) {
      if (h(a), i !== i + 0) throw i;
      g(1, 0);
    }
  }
  function rn(r, e, t) {
    var n = p();
    try {
      return _(r)(e, t);
    } catch (a) {
      if (h(n), a !== a + 0) throw a;
      g(1, 0);
    }
  }
  function en(r) {
    var e = p();
    try {
      _(r)();
    } catch (t) {
      if (h(e), t !== t + 0) throw t;
      g(1, 0);
    }
  }
  function tn(r, e, t, n, a) {
    var i = p();
    try {
      _(r)(e, t, n, a);
    } catch (o) {
      if (h(i), o !== o + 0) throw o;
      g(1, 0);
    }
  }
  function nn(r, e) {
    var t = p();
    try {
      return _(r)(e);
    } catch (n) {
      if (h(t), n !== n + 0) throw n;
      g(1, 0);
    }
  }
  function an(r, e, t, n, a, i, o, s, v, u, l) {
    var d = p();
    try {
      _(r)(e, t, n, a, i, o, s, v, u, l);
    } catch (y) {
      if (h(d), y !== y + 0) throw y;
      g(1, 0);
    }
  }
  function on(r, e, t, n, a) {
    var i = p();
    try {
      return _(r)(e, t, n, a);
    } catch (o) {
      if (h(i), o !== o + 0) throw o;
      g(1, 0);
    }
  }
  function sn(r, e, t, n, a, i, o) {
    var s = p();
    try {
      _(r)(e, t, n, a, i, o);
    } catch (v) {
      if (h(s), v !== v + 0) throw v;
      g(1, 0);
    }
  }
  function vn(r, e, t, n, a, i, o, s, v, u, l, d, y, w, T, b) {
    var O = p();
    try {
      _(r)(e, t, n, a, i, o, s, v, u, l, d, y, w, T, b);
    } catch (k) {
      if (h(O), k !== k + 0) throw k;
      g(1, 0);
    }
  }
  function fn(r, e, t, n, a, i) {
    var o = p();
    try {
      return _(r)(e, t, n, a, i);
    } catch (s) {
      if (h(o), s !== s + 0) throw s;
      g(1, 0);
    }
  }
  function un(r, e, t, n, a, i) {
    var o = p();
    try {
      _(r)(e, t, n, a, i);
    } catch (s) {
      if (h(o), s !== s + 0) throw s;
      g(1, 0);
    }
  }
  function ln(r, e, t, n, a, i, o) {
    var s = p();
    try {
      return _(r)(e, t, n, a, i, o);
    } catch (v) {
      if (h(s), v !== v + 0) throw v;
      g(1, 0);
    }
  }
  function cn(r, e, t, n, a, i, o, s) {
    var v = p();
    try {
      _(r)(e, t, n, a, i, o, s);
    } catch (u) {
      if (h(v), u !== u + 0) throw u;
      g(1, 0);
    }
  }
  function dn(r, e, t, n, a, i, o, s) {
    var v = p();
    try {
      return _(r)(e, t, n, a, i, o, s);
    } catch (u) {
      if (h(v), u !== u + 0) throw u;
      g(1, 0);
    }
  }
  function _n(r, e, t, n) {
    var a = p();
    try {
      return _(r)(e, t, n);
    } catch (i) {
      if (h(a), i !== i + 0) throw i;
      g(1, 0);
    }
  }
  function gn(r, e, t, n) {
    var a = p();
    try {
      return _(r)(e, t, n);
    } catch (i) {
      if (h(a), i !== i + 0) throw i;
      g(1, 0);
    }
  }
  function hn(r) {
    var e = p();
    try {
      return _(r)();
    } catch (t) {
      if (h(e), t !== t + 0) throw t;
      g(1, 0);
    }
  }
  function pn(r, e, t, n, a, i, o, s, v, u, l, d) {
    var y = p();
    try {
      return _(r)(e, t, n, a, i, o, s, v, u, l, d);
    } catch (w) {
      if (h(y), w !== w + 0) throw w;
      g(1, 0);
    }
  }
  function mn(r, e, t, n, a) {
    var i = p();
    try {
      return zt(r, e, t, n, a);
    } catch (o) {
      if (h(i), o !== o + 0) throw o;
      g(1, 0);
    }
  }
  function pr() {
    if (j > 0) {
      L = pr;
      return;
    }
    if (Jr(), j > 0) {
      L = pr;
      return;
    }
    function r() {
      var e;
      f.calledRun = !0, !Ar && (Qr(), yr(f), (e = f.onRuntimeInitialized) === null || e === void 0 || e.call(f), re());
    }
    f.setStatus ? (f.setStatus("Running..."), setTimeout(() => {
      setTimeout(() => f.setStatus(""), 1), r();
    }, 1)) : r();
  }
  function yn() {
    if (f.preInit)
      for (typeof f.preInit == "function" && (f.preInit = [f.preInit]); f.preInit.length > 0; )
        f.preInit.shift()();
  }
  return yn(), pr(), Y = Gr, Y;
};
function Lr(E) {
  return wn(mr, E);
}
function En() {
  return bn(mr);
}
function Rn(E) {
  return Lr({
    overrides: E,
    equalityFn: Object.is,
    fireImmediately: !0
  });
}
function Fn(E) {
  Lr({
    overrides: E,
    equalityFn: Object.is,
    fireImmediately: !1
  });
}
async function kn(E, Y) {
  return $n(mr, E, Y);
}
const Pn = "9bc370152bfedb419d2568836263cc7061288f829e950481078b88abe6398589";
export {
  Wn as ZXING_CPP_COMMIT,
  Pn as ZXING_WASM_SHA256,
  jn as ZXING_WASM_VERSION,
  xn as barcodeFormats,
  Dn as characterSets,
  Un as defaultWriterOptions,
  Rn as getZXingModule,
  On as linearBarcodeFormats,
  Vn as matrixBarcodeFormats,
  Lr as prepareZXingModule,
  En as purgeZXingModule,
  Fn as setZXingModuleOverrides,
  kn as writeBarcode
};
