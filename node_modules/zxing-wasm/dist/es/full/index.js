import { p as $i, a as bi, r as wi, w as Ci } from "../share.js";
import { Z as Mi, b as xi, c as Ii, e as Ui, f as Vi, g as Hi, d as Bi, i as Ni, h as Zi, l as zi, m as Li, t as Xi } from "../share.js";
var gr = async function(A = {}) {
  var j, yr, l = A, xr, mr, we = new Promise((e, r) => {
    xr = e, mr = r;
  }), Ce = typeof window == "object", Pe = typeof Bun < "u", Ir = typeof WorkerGlobalScope < "u";
  typeof process == "object" && (!((yr = process.versions) === null || yr === void 0) && yr.node) && process.type != "renderer";
  var Ur = "./this.program", Te, $r = "";
  function Ae(e) {
    return l.locateFile ? l.locateFile(e, $r) : $r + e;
  }
  var Vr, br;
  if (Ce || Ir || Pe) {
    try {
      $r = new URL(".", Te).href;
    } catch {
    }
    Ir && (br = (e) => {
      var r = new XMLHttpRequest();
      return r.open("GET", e, !1), r.responseType = "arraybuffer", r.send(null), new Uint8Array(r.response);
    }), Vr = async (e) => {
      var r = await fetch(e, {
        credentials: "same-origin"
      });
      if (r.ok)
        return r.arrayBuffer();
      throw new Error(r.status + " : " + r.url);
    };
  }
  var Hr = console.log.bind(console), Z = console.error.bind(console), Y, nr, Br = !1, I, E, ir, z, L, $, Nr, Zr;
  function zr() {
    var e = nr.buffer;
    I = new Int8Array(e), ir = new Int16Array(e), l.HEAPU8 = E = new Uint8Array(e), z = new Uint16Array(e), L = new Int32Array(e), $ = new Uint32Array(e), Nr = new Float32Array(e), Zr = new Float64Array(e);
  }
  function Re() {
    if (l.preRun)
      for (typeof l.preRun == "function" && (l.preRun = [l.preRun]); l.preRun.length; )
        Ve(l.preRun.shift());
    Lr(Gr);
  }
  function Fe() {
    b.Ea();
  }
  function ke() {
    if (l.postRun)
      for (typeof l.postRun == "function" && (l.postRun = [l.postRun]); l.postRun.length; )
        Ue(l.postRun.shift());
    Lr(Xr);
  }
  var U = 0, K = null;
  function Ee(e) {
    var r;
    U++, (r = l.monitorRunDependencies) === null || r === void 0 || r.call(l, U);
  }
  function Se(e) {
    var r;
    if (U--, (r = l.monitorRunDependencies) === null || r === void 0 || r.call(l, U), U == 0 && K) {
      var t = K;
      K = null, t();
    }
  }
  function wr(e) {
    var r;
    (r = l.onAbort) === null || r === void 0 || r.call(l, e), e = "Aborted(" + e + ")", Z(e), Br = !0, e += ". Build with -sASSERTIONS for more info.";
    var t = new WebAssembly.RuntimeError(e);
    throw mr(t), t;
  }
  var X;
  function je() {
    return Ae("zxing_full.wasm");
  }
  function Oe(e) {
    if (e == X && Y)
      return new Uint8Array(Y);
    if (br)
      return br(e);
    throw "both async and sync fetching of the wasm failed";
  }
  async function De(e) {
    if (!Y)
      try {
        var r = await Vr(e);
        return new Uint8Array(r);
      } catch {
      }
    return Oe(e);
  }
  async function We(e, r) {
    try {
      var t = await De(e), n = await WebAssembly.instantiate(t, r);
      return n;
    } catch (i) {
      Z(`failed to asynchronously prepare wasm: ${i}`), wr(i);
    }
  }
  async function Me(e, r, t) {
    if (!e && typeof WebAssembly.instantiateStreaming == "function")
      try {
        var n = fetch(r, {
          credentials: "same-origin"
        }), i = await WebAssembly.instantiateStreaming(n, t);
        return i;
      } catch (a) {
        Z(`wasm streaming compile failed: ${a}`), Z("falling back to ArrayBuffer instantiation");
      }
    return We(r, t);
  }
  function xe() {
    return {
      a: An
    };
  }
  async function Ie() {
    function e(a, s) {
      return b = a.exports, nr = b.Da, zr(), oe = b.Ha, Se(), b;
    }
    Ee();
    function r(a) {
      return e(a.instance);
    }
    var t = xe();
    if (l.instantiateWasm)
      return new Promise((a, s) => {
        l.instantiateWasm(t, (o, u) => {
          a(e(o));
        });
      });
    X != null || (X = je());
    try {
      var n = await Me(Y, X, t), i = r(n);
      return i;
    } catch (a) {
      return mr(a), Promise.reject(a);
    }
  }
  var Lr = (e) => {
    for (; e.length > 0; )
      e.shift()(l);
  }, Xr = [], Ue = (e) => Xr.push(e), Gr = [], Ve = (e) => Gr.push(e), p = (e) => En(e), h = () => Sn(), ar = [], or = 0, He = (e) => {
    var r = new Cr(e);
    return r.get_caught() || (r.set_caught(!0), or--), r.set_rethrown(!1), ar.push(r), On(e), Fn(e);
  }, D = 0, Be = () => {
    d(0, 0);
    var e = ar.pop();
    jn(e.excPtr), D = 0;
  };
  class Cr {
    constructor(r) {
      this.excPtr = r, this.ptr = r - 24;
    }
    set_type(r) {
      $[this.ptr + 4 >> 2] = r;
    }
    get_type() {
      return $[this.ptr + 4 >> 2];
    }
    set_destructor(r) {
      $[this.ptr + 8 >> 2] = r;
    }
    get_destructor() {
      return $[this.ptr + 8 >> 2];
    }
    set_caught(r) {
      r = r ? 1 : 0, I[this.ptr + 12] = r;
    }
    get_caught() {
      return I[this.ptr + 12] != 0;
    }
    set_rethrown(r) {
      r = r ? 1 : 0, I[this.ptr + 13] = r;
    }
    get_rethrown() {
      return I[this.ptr + 13] != 0;
    }
    init(r, t) {
      this.set_adjusted_ptr(0), this.set_type(r), this.set_destructor(t);
    }
    set_adjusted_ptr(r) {
      $[this.ptr + 16 >> 2] = r;
    }
    get_adjusted_ptr() {
      return $[this.ptr + 16 >> 2];
    }
  }
  var sr = (e) => kn(e), Pr = (e) => {
    var r = D;
    if (!r)
      return sr(0), 0;
    var t = new Cr(r);
    t.set_adjusted_ptr(r);
    var n = t.get_type();
    if (!n)
      return sr(0), r;
    for (var i of e) {
      if (i === 0 || i === n)
        break;
      var a = t.ptr + 16;
      if (Dn(i, n, a))
        return sr(i), r;
    }
    return sr(n), r;
  }, Ne = () => Pr([]), Ze = (e) => Pr([e]), ze = (e, r) => Pr([e, r]), Le = () => {
    var e = ar.pop();
    e || wr("no exception to throw");
    var r = e.excPtr;
    throw e.get_rethrown() || (ar.push(e), e.set_rethrown(!0), e.set_caught(!1), or++), D = r, D;
  }, Xe = (e, r, t) => {
    var n = new Cr(e);
    throw n.init(r, t), D = e, or++, D;
  }, Ge = () => or, qe = (e) => {
    throw D || (D = e), D;
  }, qr = typeof TextDecoder < "u" ? new TextDecoder() : void 0, Yr = function(e) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : NaN;
    for (var n = r + t, i = r; e[i] && !(i >= n); ) ++i;
    if (i - r > 16 && e.buffer && qr)
      return qr.decode(e.subarray(r, i));
    for (var a = ""; r < i; ) {
      var s = e[r++];
      if (!(s & 128)) {
        a += String.fromCharCode(s);
        continue;
      }
      var o = e[r++] & 63;
      if ((s & 224) == 192) {
        a += String.fromCharCode((s & 31) << 6 | o);
        continue;
      }
      var u = e[r++] & 63;
      if ((s & 240) == 224 ? s = (s & 15) << 12 | o << 6 | u : s = (s & 7) << 18 | o << 12 | u << 6 | e[r++] & 63, s < 65536)
        a += String.fromCharCode(s);
      else {
        var f = s - 65536;
        a += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023);
      }
    }
    return a;
  }, Ye = (e, r) => e ? Yr(E, e, r) : "";
  function Ke(e, r, t) {
    return 0;
  }
  function Je(e, r, t) {
    return 0;
  }
  var Qe = (e, r, t) => {
  };
  function rt(e, r, t, n) {
  }
  var et = (e, r) => {
  }, tt = () => wr(""), ur = {}, Tr = (e) => {
    for (; e.length; ) {
      var r = e.pop(), t = e.pop();
      t(r);
    }
  };
  function J(e) {
    return this.fromWireType($[e >> 2]);
  }
  var G = {}, V = {}, fr = {}, nt = class extends Error {
    constructor(r) {
      super(r), this.name = "InternalError";
    }
  }, lr = (e) => {
    throw new nt(e);
  }, H = (e, r, t) => {
    e.forEach((o) => fr[o] = r);
    function n(o) {
      var u = t(o);
      u.length !== e.length && lr("Mismatched type converter count");
      for (var f = 0; f < e.length; ++f)
        O(e[f], u[f]);
    }
    var i = new Array(r.length), a = [], s = 0;
    r.forEach((o, u) => {
      V.hasOwnProperty(o) ? i[u] = V[o] : (a.push(o), G.hasOwnProperty(o) || (G[o] = []), G[o].push(() => {
        i[u] = V[o], ++s, s === a.length && n(i);
      }));
    }), a.length === 0 && n(i);
  }, it = (e) => {
    var r = ur[e];
    delete ur[e];
    var t = r.rawConstructor, n = r.rawDestructor, i = r.fields, a = i.map((s) => s.getterReturnType).concat(i.map((s) => s.setterArgumentType));
    H([e], a, (s) => {
      var o = {};
      return i.forEach((u, f) => {
        var c = u.fieldName, v = s[f], g = s[f].optional, y = u.getter, w = u.getterContext, P = s[f + i.length], C = u.setter, T = u.setterContext;
        o[c] = {
          read: (x) => v.fromWireType(y(w, x)),
          write: (x, F) => {
            var k = [];
            C(T, x, P.toWireType(k, F)), Tr(k);
          },
          optional: g
        };
      }), [{
        name: r.name,
        fromWireType: (u) => {
          var f = {};
          for (var c in o)
            f[c] = o[c].read(u);
          return n(u), f;
        },
        toWireType: (u, f) => {
          for (var c in o)
            if (!(c in f) && !o[c].optional)
              throw new TypeError(`Missing field: "${c}"`);
          var v = t();
          for (c in o)
            o[c].write(v, f[c]);
          return u !== null && u.push(n, v), v;
        },
        argPackAdvance: W,
        readValueFromPointer: J,
        destructorFunction: n
      }];
    });
  }, at = (e, r, t, n, i) => {
  }, ot = () => {
    for (var e = new Array(256), r = 0; r < 256; ++r)
      e[r] = String.fromCharCode(r);
    Kr = e;
  }, Kr, R = (e) => {
    for (var r = "", t = e; E[t]; )
      r += Kr[E[t++]];
    return r;
  }, Q = class extends Error {
    constructor(r) {
      super(r), this.name = "BindingError";
    }
  }, m = (e) => {
    throw new Q(e);
  };
  function st(e, r) {
    let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    var n = r.name;
    if (e || m(`type "${n}" must have a positive integer typeid pointer`), V.hasOwnProperty(e)) {
      if (t.ignoreDuplicateRegistrations)
        return;
      m(`Cannot register type '${n}' twice`);
    }
    if (V[e] = r, delete fr[e], G.hasOwnProperty(e)) {
      var i = G[e];
      delete G[e], i.forEach((a) => a());
    }
  }
  function O(e, r) {
    let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return st(e, r, t);
  }
  var W = 8, ut = (e, r, t, n) => {
    r = R(r), O(e, {
      name: r,
      fromWireType: function(i) {
        return !!i;
      },
      toWireType: function(i, a) {
        return a ? t : n;
      },
      argPackAdvance: W,
      readValueFromPointer: function(i) {
        return this.fromWireType(E[i]);
      },
      destructorFunction: null
    });
  }, ft = (e) => ({
    count: e.count,
    deleteScheduled: e.deleteScheduled,
    preservePointerOnDelete: e.preservePointerOnDelete,
    ptr: e.ptr,
    ptrType: e.ptrType,
    smartPtr: e.smartPtr,
    smartPtrType: e.smartPtrType
  }), Ar = (e) => {
    function r(t) {
      return t.$$.ptrType.registeredClass.name;
    }
    m(r(e) + " instance already deleted");
  }, Rr = !1, Jr = (e) => {
  }, lt = (e) => {
    e.smartPtr ? e.smartPtrType.rawDestructor(e.smartPtr) : e.ptrType.registeredClass.rawDestructor(e.ptr);
  }, Qr = (e) => {
    e.count.value -= 1;
    var r = e.count.value === 0;
    r && lt(e);
  }, rr = (e) => typeof FinalizationRegistry > "u" ? (rr = (r) => r, e) : (Rr = new FinalizationRegistry((r) => {
    Qr(r.$$);
  }), rr = (r) => {
    var t = r.$$, n = !!t.smartPtr;
    if (n) {
      var i = {
        $$: t
      };
      Rr.register(r, i, r);
    }
    return r;
  }, Jr = (r) => Rr.unregister(r), rr(e)), ct = () => {
    let e = cr.prototype;
    Object.assign(e, {
      isAliasOf(t) {
        if (!(this instanceof cr) || !(t instanceof cr))
          return !1;
        var n = this.$$.ptrType.registeredClass, i = this.$$.ptr;
        t.$$ = t.$$;
        for (var a = t.$$.ptrType.registeredClass, s = t.$$.ptr; n.baseClass; )
          i = n.upcast(i), n = n.baseClass;
        for (; a.baseClass; )
          s = a.upcast(s), a = a.baseClass;
        return n === a && i === s;
      },
      clone() {
        if (this.$$.ptr || Ar(this), this.$$.preservePointerOnDelete)
          return this.$$.count.value += 1, this;
        var t = rr(Object.create(Object.getPrototypeOf(this), {
          $$: {
            value: ft(this.$$)
          }
        }));
        return t.$$.count.value += 1, t.$$.deleteScheduled = !1, t;
      },
      delete() {
        this.$$.ptr || Ar(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && m("Object already scheduled for deletion"), Jr(this), Qr(this.$$), this.$$.preservePointerOnDelete || (this.$$.smartPtr = void 0, this.$$.ptr = void 0);
      },
      isDeleted() {
        return !this.$$.ptr;
      },
      deleteLater() {
        return this.$$.ptr || Ar(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && m("Object already scheduled for deletion"), this.$$.deleteScheduled = !0, this;
      }
    });
    const r = Symbol.dispose;
    r && (e[r] = e.delete);
  };
  function cr() {
  }
  var Fr = (e, r) => Object.defineProperty(r, "name", {
    value: e
  }), re = {}, ee = (e, r, t) => {
    if (e[r].overloadTable === void 0) {
      var n = e[r];
      e[r] = function() {
        for (var i = arguments.length, a = new Array(i), s = 0; s < i; s++)
          a[s] = arguments[s];
        return e[r].overloadTable.hasOwnProperty(a.length) || m(`Function '${t}' called with an invalid number of arguments (${a.length}) - expects one of (${e[r].overloadTable})!`), e[r].overloadTable[a.length].apply(this, a);
      }, e[r].overloadTable = [], e[r].overloadTable[n.argCount] = n;
    }
  }, te = (e, r, t) => {
    l.hasOwnProperty(e) ? ((t === void 0 || l[e].overloadTable !== void 0 && l[e].overloadTable[t] !== void 0) && m(`Cannot register public name '${e}' twice`), ee(l, e, e), l[e].overloadTable.hasOwnProperty(t) && m(`Cannot register multiple overloads of a function with the same number of arguments (${t})!`), l[e].overloadTable[t] = r) : (l[e] = r, l[e].argCount = t);
  }, vt = 48, dt = 57, pt = (e) => {
    e = e.replace(/[^a-zA-Z0-9_]/g, "$");
    var r = e.charCodeAt(0);
    return r >= vt && r <= dt ? `_${e}` : e;
  };
  function ht(e, r, t, n, i, a, s, o) {
    this.name = e, this.constructor = r, this.instancePrototype = t, this.rawDestructor = n, this.baseClass = i, this.getActualType = a, this.upcast = s, this.downcast = o, this.pureVirtualFunctions = [];
  }
  var kr = (e, r, t) => {
    for (; r !== t; )
      r.upcast || m(`Expected null or instance of ${t.name}, got an instance of ${r.name}`), e = r.upcast(e), r = r.baseClass;
    return e;
  }, Er = (e) => {
    if (e === null)
      return "null";
    var r = typeof e;
    return r === "object" || r === "array" || r === "function" ? e.toString() : "" + e;
  };
  function _t(e, r) {
    if (r === null)
      return this.isReference && m(`null is not a valid ${this.name}`), 0;
    r.$$ || m(`Cannot pass "${Er(r)}" as a ${this.name}`), r.$$.ptr || m(`Cannot pass deleted object as a pointer of type ${this.name}`);
    var t = r.$$.ptrType.registeredClass, n = kr(r.$$.ptr, t, this.registeredClass);
    return n;
  }
  function gt(e, r) {
    var t;
    if (r === null)
      return this.isReference && m(`null is not a valid ${this.name}`), this.isSmartPointer ? (t = this.rawConstructor(), e !== null && e.push(this.rawDestructor, t), t) : 0;
    (!r || !r.$$) && m(`Cannot pass "${Er(r)}" as a ${this.name}`), r.$$.ptr || m(`Cannot pass deleted object as a pointer of type ${this.name}`), !this.isConst && r.$$.ptrType.isConst && m(`Cannot convert argument of type ${r.$$.smartPtrType ? r.$$.smartPtrType.name : r.$$.ptrType.name} to parameter type ${this.name}`);
    var n = r.$$.ptrType.registeredClass;
    if (t = kr(r.$$.ptr, n, this.registeredClass), this.isSmartPointer)
      switch (r.$$.smartPtr === void 0 && m("Passing raw pointer to smart pointer is illegal"), this.sharingPolicy) {
        case 0:
          r.$$.smartPtrType === this ? t = r.$$.smartPtr : m(`Cannot convert argument of type ${r.$$.smartPtrType ? r.$$.smartPtrType.name : r.$$.ptrType.name} to parameter type ${this.name}`);
          break;
        case 1:
          t = r.$$.smartPtr;
          break;
        case 2:
          if (r.$$.smartPtrType === this)
            t = r.$$.smartPtr;
          else {
            var i = r.clone();
            t = this.rawShare(t, M.toHandle(() => i.delete())), e !== null && e.push(this.rawDestructor, t);
          }
          break;
        default:
          m("Unsupporting sharing policy");
      }
    return t;
  }
  function yt(e, r) {
    if (r === null)
      return this.isReference && m(`null is not a valid ${this.name}`), 0;
    r.$$ || m(`Cannot pass "${Er(r)}" as a ${this.name}`), r.$$.ptr || m(`Cannot pass deleted object as a pointer of type ${this.name}`), r.$$.ptrType.isConst && m(`Cannot convert argument of type ${r.$$.ptrType.name} to parameter type ${this.name}`);
    var t = r.$$.ptrType.registeredClass, n = kr(r.$$.ptr, t, this.registeredClass);
    return n;
  }
  var ne = (e, r, t) => {
    if (r === t)
      return e;
    if (t.baseClass === void 0)
      return null;
    var n = ne(e, r, t.baseClass);
    return n === null ? null : t.downcast(n);
  }, mt = {}, $t = (e, r) => {
    for (r === void 0 && m("ptr should not be undefined"); e.baseClass; )
      r = e.upcast(r), e = e.baseClass;
    return r;
  }, bt = (e, r) => (r = $t(e, r), mt[r]), vr = (e, r) => {
    (!r.ptrType || !r.ptr) && lr("makeClassHandle requires ptr and ptrType");
    var t = !!r.smartPtrType, n = !!r.smartPtr;
    return t !== n && lr("Both smartPtrType and smartPtr must be specified"), r.count = {
      value: 1
    }, rr(Object.create(e, {
      $$: {
        value: r,
        writable: !0
      }
    }));
  };
  function wt(e) {
    var r = this.getPointee(e);
    if (!r)
      return this.destructor(e), null;
    var t = bt(this.registeredClass, r);
    if (t !== void 0) {
      if (t.$$.count.value === 0)
        return t.$$.ptr = r, t.$$.smartPtr = e, t.clone();
      var n = t.clone();
      return this.destructor(e), n;
    }
    function i() {
      return this.isSmartPointer ? vr(this.registeredClass.instancePrototype, {
        ptrType: this.pointeeType,
        ptr: r,
        smartPtrType: this,
        smartPtr: e
      }) : vr(this.registeredClass.instancePrototype, {
        ptrType: this,
        ptr: e
      });
    }
    var a = this.registeredClass.getActualType(r), s = re[a];
    if (!s)
      return i.call(this);
    var o;
    this.isConst ? o = s.constPointerType : o = s.pointerType;
    var u = ne(r, this.registeredClass, o.registeredClass);
    return u === null ? i.call(this) : this.isSmartPointer ? vr(o.registeredClass.instancePrototype, {
      ptrType: o,
      ptr: u,
      smartPtrType: this,
      smartPtr: e
    }) : vr(o.registeredClass.instancePrototype, {
      ptrType: o,
      ptr: u
    });
  }
  var Ct = () => {
    Object.assign(dr.prototype, {
      getPointee(e) {
        return this.rawGetPointee && (e = this.rawGetPointee(e)), e;
      },
      destructor(e) {
        var r;
        (r = this.rawDestructor) === null || r === void 0 || r.call(this, e);
      },
      argPackAdvance: W,
      readValueFromPointer: J,
      fromWireType: wt
    });
  };
  function dr(e, r, t, n, i, a, s, o, u, f, c) {
    this.name = e, this.registeredClass = r, this.isReference = t, this.isConst = n, this.isSmartPointer = i, this.pointeeType = a, this.sharingPolicy = s, this.rawGetPointee = o, this.rawConstructor = u, this.rawShare = f, this.rawDestructor = c, !i && r.baseClass === void 0 ? n ? (this.toWireType = _t, this.destructorFunction = null) : (this.toWireType = yt, this.destructorFunction = null) : this.toWireType = gt;
  }
  var ie = (e, r, t) => {
    l.hasOwnProperty(e) || lr("Replacing nonexistent public symbol"), l[e].overloadTable !== void 0 && t !== void 0 ? l[e].overloadTable[t] = r : (l[e] = r, l[e].argCount = t);
  }, ae = [], oe, _ = (e) => {
    var r = ae[e];
    return r || (ae[e] = r = oe.get(e)), r;
  }, Pt = function(e, r) {
    let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
    if (e.includes("j"))
      return dynCallLegacy(e, r, t);
    var n = _(r), i = n(...t);
    function a(s) {
      return s;
    }
    return i;
  }, Tt = function(e, r) {
    let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
    return function() {
      for (var n = arguments.length, i = new Array(n), a = 0; a < n; a++)
        i[a] = arguments[a];
      return Pt(e, r, i, t);
    };
  }, S = function(e, r) {
    e = R(e);
    function t() {
      if (e.includes("j"))
        return Tt(e, r);
      var i = _(r);
      return i;
    }
    var n = t();
    return typeof n != "function" && m(`unknown function pointer with signature ${e}: ${r}`), n;
  };
  class At extends Error {
  }
  var se = (e) => {
    var r = Rn(e), t = R(r);
    return N(r), t;
  }, pr = (e, r) => {
    var t = [], n = {};
    function i(a) {
      if (!n[a] && !V[a]) {
        if (fr[a]) {
          fr[a].forEach(i);
          return;
        }
        t.push(a), n[a] = !0;
      }
    }
    throw r.forEach(i), new At(`${e}: ` + t.map(se).join([", "]));
  }, Rt = (e, r, t, n, i, a, s, o, u, f, c, v, g) => {
    c = R(c), a = S(i, a), o && (o = S(s, o)), f && (f = S(u, f)), g = S(v, g);
    var y = pt(c);
    te(y, function() {
      pr(`Cannot construct ${c} due to unbound types`, [n]);
    }), H([e, r, t], n ? [n] : [], (w) => {
      w = w[0];
      var P, C;
      n ? (P = w.registeredClass, C = P.instancePrototype) : C = cr.prototype;
      var T = Fr(c, function() {
        if (Object.getPrototypeOf(this) !== x)
          throw new Q(`Use 'new' to construct ${c}`);
        if (F.constructor_body === void 0)
          throw new Q(`${c} has no accessible constructor`);
        for (var ye = arguments.length, hr = new Array(ye), _r = 0; _r < ye; _r++)
          hr[_r] = arguments[_r];
        var me = F.constructor_body[hr.length];
        if (me === void 0)
          throw new Q(`Tried to invoke ctor of ${c} with invalid number of parameters (${hr.length}) - expected (${Object.keys(F.constructor_body).toString()}) parameters instead!`);
        return me.apply(this, hr);
      }), x = Object.create(C, {
        constructor: {
          value: T
        }
      });
      T.prototype = x;
      var F = new ht(c, T, x, g, P, a, o, f);
      if (F.baseClass) {
        var k, tr;
        (tr = (k = F.baseClass).__derivedClasses) !== null && tr !== void 0 || (k.__derivedClasses = []), F.baseClass.__derivedClasses.push(F);
      }
      var mi = new dr(c, F, !0, !1, !1), _e = new dr(c + "*", F, !1, !1, !1), ge = new dr(c + " const*", F, !1, !0, !1);
      return re[e] = {
        pointerType: _e,
        constPointerType: ge
      }, ie(y, T), [mi, _e, ge];
    });
  }, Sr = (e, r) => {
    for (var t = [], n = 0; n < e; n++)
      t.push($[r + n * 4 >> 2]);
    return t;
  };
  function Ft(e) {
    for (var r = 1; r < e.length; ++r)
      if (e[r] !== null && e[r].destructorFunction === void 0)
        return !0;
    return !1;
  }
  function jr(e, r, t, n, i, a) {
    var s = r.length;
    s < 2 && m("argTypes array size mismatch! Must at least get return value and 'this' types!");
    var o = r[1] !== null && t !== null, u = Ft(r), f = r[0].name !== "void", c = s - 2, v = new Array(c), g = [], y = [], w = function() {
      y.length = 0;
      var P;
      g.length = o ? 2 : 1, g[0] = i, o && (P = r[1].toWireType(y, this), g[1] = P);
      for (var C = 0; C < c; ++C)
        v[C] = r[C + 2].toWireType(y, C < 0 || arguments.length <= C ? void 0 : arguments[C]), g.push(v[C]);
      var T = n(...g);
      function x(F) {
        if (u)
          Tr(y);
        else
          for (var k = o ? 1 : 2; k < r.length; k++) {
            var tr = k === 1 ? P : v[k - 2];
            r[k].destructorFunction !== null && r[k].destructorFunction(tr);
          }
        if (f)
          return r[0].fromWireType(F);
      }
      return x(T);
    };
    return Fr(e, w);
  }
  var kt = (e, r, t, n, i, a) => {
    var s = Sr(r, t);
    i = S(n, i), H([], [e], (o) => {
      o = o[0];
      var u = `constructor ${o.name}`;
      if (o.registeredClass.constructor_body === void 0 && (o.registeredClass.constructor_body = []), o.registeredClass.constructor_body[r - 1] !== void 0)
        throw new Q(`Cannot register multiple constructors with identical number of parameters (${r - 1}) for class '${o.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
      return o.registeredClass.constructor_body[r - 1] = () => {
        pr(`Cannot construct ${o.name} due to unbound types`, s);
      }, H([], s, (f) => (f.splice(1, 0, null), o.registeredClass.constructor_body[r - 1] = jr(u, f, null, i, a), [])), [];
    });
  }, ue = (e) => {
    e = e.trim();
    const r = e.indexOf("(");
    return r === -1 ? e : e.slice(0, r);
  }, Et = (e, r, t, n, i, a, s, o, u, f) => {
    var c = Sr(t, n);
    r = R(r), r = ue(r), a = S(i, a), H([], [e], (v) => {
      v = v[0];
      var g = `${v.name}.${r}`;
      r.startsWith("@@") && (r = Symbol[r.substring(2)]), o && v.registeredClass.pureVirtualFunctions.push(r);
      function y() {
        pr(`Cannot call ${g} due to unbound types`, c);
      }
      var w = v.registeredClass.instancePrototype, P = w[r];
      return P === void 0 || P.overloadTable === void 0 && P.className !== v.name && P.argCount === t - 2 ? (y.argCount = t - 2, y.className = v.name, w[r] = y) : (ee(w, r, g), w[r].overloadTable[t - 2] = y), H([], c, (C) => {
        var T = jr(g, C, v, a, s);
        return w[r].overloadTable === void 0 ? (T.argCount = t - 2, w[r] = T) : w[r].overloadTable[t - 2] = T, [];
      }), [];
    });
  }, fe = [], B = [0, 1, , 1, null, 1, !0, 1, !1, 1], Or = (e) => {
    e > 9 && --B[e + 1] === 0 && (B[e] = void 0, fe.push(e));
  }, M = {
    toValue: (e) => (e || m(`Cannot use deleted val. handle = ${e}`), B[e]),
    toHandle: (e) => {
      switch (e) {
        case void 0:
          return 2;
        case null:
          return 4;
        case !0:
          return 6;
        case !1:
          return 8;
        default: {
          const r = fe.pop() || B.length;
          return B[r] = e, B[r + 1] = 1, r;
        }
      }
    }
  }, le = {
    name: "emscripten::val",
    fromWireType: (e) => {
      var r = M.toValue(e);
      return Or(e), r;
    },
    toWireType: (e, r) => M.toHandle(r),
    argPackAdvance: W,
    readValueFromPointer: J,
    destructorFunction: null
  }, St = (e) => O(e, le), jt = (e, r) => {
    switch (r) {
      case 4:
        return function(t) {
          return this.fromWireType(Nr[t >> 2]);
        };
      case 8:
        return function(t) {
          return this.fromWireType(Zr[t >> 3]);
        };
      default:
        throw new TypeError(`invalid float width (${r}): ${e}`);
    }
  }, Ot = (e, r, t) => {
    r = R(r), O(e, {
      name: r,
      fromWireType: (n) => n,
      toWireType: (n, i) => i,
      argPackAdvance: W,
      readValueFromPointer: jt(r, t),
      destructorFunction: null
    });
  }, Dt = (e, r, t, n, i, a, s, o) => {
    var u = Sr(r, t);
    e = R(e), e = ue(e), i = S(n, i), te(e, function() {
      pr(`Cannot call ${e} due to unbound types`, u);
    }, r - 1), H([], u, (f) => {
      var c = [f[0], null].concat(f.slice(1));
      return ie(e, jr(e, c, null, i, a), r - 1), [];
    });
  }, Wt = (e, r, t) => {
    switch (r) {
      case 1:
        return t ? (n) => I[n] : (n) => E[n];
      case 2:
        return t ? (n) => ir[n >> 1] : (n) => z[n >> 1];
      case 4:
        return t ? (n) => L[n >> 2] : (n) => $[n >> 2];
      default:
        throw new TypeError(`invalid integer width (${r}): ${e}`);
    }
  }, Mt = (e, r, t, n, i) => {
    r = R(r);
    const a = n === 0;
    let s = (u) => u;
    if (a) {
      var o = 32 - 8 * t;
      s = (u) => u << o >>> o, i = s(i);
    }
    O(e, {
      name: r,
      fromWireType: s,
      toWireType: (u, f) => f,
      argPackAdvance: W,
      readValueFromPointer: Wt(r, t, n !== 0),
      destructorFunction: null
    });
  }, xt = (e, r, t) => {
    var n = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array], i = n[r];
    function a(s) {
      var o = $[s >> 2], u = $[s + 4 >> 2];
      return new i(I.buffer, u, o);
    }
    t = R(t), O(e, {
      name: t,
      fromWireType: a,
      argPackAdvance: W,
      readValueFromPointer: a
    }, {
      ignoreDuplicateRegistrations: !0
    });
  }, It = Object.assign({
    optional: !0
  }, le), Ut = (e, r) => {
    O(e, It);
  }, Vt = (e, r, t, n) => {
    if (!(n > 0)) return 0;
    for (var i = t, a = t + n - 1, s = 0; s < e.length; ++s) {
      var o = e.charCodeAt(s);
      if (o >= 55296 && o <= 57343) {
        var u = e.charCodeAt(++s);
        o = 65536 + ((o & 1023) << 10) | u & 1023;
      }
      if (o <= 127) {
        if (t >= a) break;
        r[t++] = o;
      } else if (o <= 2047) {
        if (t + 1 >= a) break;
        r[t++] = 192 | o >> 6, r[t++] = 128 | o & 63;
      } else if (o <= 65535) {
        if (t + 2 >= a) break;
        r[t++] = 224 | o >> 12, r[t++] = 128 | o >> 6 & 63, r[t++] = 128 | o & 63;
      } else {
        if (t + 3 >= a) break;
        r[t++] = 240 | o >> 18, r[t++] = 128 | o >> 12 & 63, r[t++] = 128 | o >> 6 & 63, r[t++] = 128 | o & 63;
      }
    }
    return r[t] = 0, t - i;
  }, q = (e, r, t) => Vt(e, E, r, t), ce = (e) => {
    for (var r = 0, t = 0; t < e.length; ++t) {
      var n = e.charCodeAt(t);
      n <= 127 ? r++ : n <= 2047 ? r += 2 : n >= 55296 && n <= 57343 ? (r += 4, ++t) : r += 3;
    }
    return r;
  }, Ht = (e, r) => {
    r = R(r), O(e, {
      name: r,
      fromWireType(t) {
        for (var n = $[t >> 2], i = t + 4, a, s, o = i, s = 0; s <= n; ++s) {
          var u = i + s;
          if (s == n || E[u] == 0) {
            var f = u - o, c = Ye(o, f);
            a === void 0 ? a = c : (a += "\0", a += c), o = u + 1;
          }
        }
        return N(t), a;
      },
      toWireType(t, n) {
        n instanceof ArrayBuffer && (n = new Uint8Array(n));
        var i, a = typeof n == "string";
        a || ArrayBuffer.isView(n) && n.BYTES_PER_ELEMENT == 1 || m("Cannot pass non-string to std::string"), a ? i = ce(n) : i = n.length;
        var s = he(4 + i + 1), o = s + 4;
        return $[s >> 2] = i, a ? q(n, o, i + 1) : E.set(n, o), t !== null && t.push(N, s), s;
      },
      argPackAdvance: W,
      readValueFromPointer: J,
      destructorFunction(t) {
        N(t);
      }
    });
  }, ve = typeof TextDecoder < "u" ? new TextDecoder("utf-16le") : void 0, Bt = (e, r) => {
    for (var t = e >> 1, n = t + r / 2, i = t; !(i >= n) && z[i]; ) ++i;
    if (i - t > 16 && ve) return ve.decode(z.subarray(t, i));
    for (var a = "", s = t; !(s >= n); ++s) {
      var o = z[s];
      if (o == 0) break;
      a += String.fromCharCode(o);
    }
    return a;
  }, Nt = (e, r, t) => {
    if (t != null || (t = 2147483647), t < 2) return 0;
    t -= 2;
    for (var n = r, i = t < e.length * 2 ? t / 2 : e.length, a = 0; a < i; ++a) {
      var s = e.charCodeAt(a);
      ir[r >> 1] = s, r += 2;
    }
    return ir[r >> 1] = 0, r - n;
  }, Zt = (e) => e.length * 2, zt = (e, r) => {
    for (var t = 0, n = ""; !(t >= r / 4); ) {
      var i = L[e + t * 4 >> 2];
      if (i == 0) break;
      if (++t, i >= 65536) {
        var a = i - 65536;
        n += String.fromCharCode(55296 | a >> 10, 56320 | a & 1023);
      } else
        n += String.fromCharCode(i);
    }
    return n;
  }, Lt = (e, r, t) => {
    if (t != null || (t = 2147483647), t < 4) return 0;
    for (var n = r, i = n + t - 4, a = 0; a < e.length; ++a) {
      var s = e.charCodeAt(a);
      if (s >= 55296 && s <= 57343) {
        var o = e.charCodeAt(++a);
        s = 65536 + ((s & 1023) << 10) | o & 1023;
      }
      if (L[r >> 2] = s, r += 4, r + 4 > i) break;
    }
    return L[r >> 2] = 0, r - n;
  }, Xt = (e) => {
    for (var r = 0, t = 0; t < e.length; ++t) {
      var n = e.charCodeAt(t);
      n >= 55296 && n <= 57343 && ++t, r += 4;
    }
    return r;
  }, Gt = (e, r, t) => {
    t = R(t);
    var n, i, a, s;
    r === 2 ? (n = Bt, i = Nt, s = Zt, a = (o) => z[o >> 1]) : r === 4 && (n = zt, i = Lt, s = Xt, a = (o) => $[o >> 2]), O(e, {
      name: t,
      fromWireType: (o) => {
        for (var u = $[o >> 2], f, c = o + 4, v = 0; v <= u; ++v) {
          var g = o + 4 + v * r;
          if (v == u || a(g) == 0) {
            var y = g - c, w = n(c, y);
            f === void 0 ? f = w : (f += "\0", f += w), c = g + r;
          }
        }
        return N(o), f;
      },
      toWireType: (o, u) => {
        typeof u != "string" && m(`Cannot pass non-string to C++ string type ${t}`);
        var f = s(u), c = he(4 + f + r);
        return $[c >> 2] = f / r, i(u, c + 4, f + r), o !== null && o.push(N, c), c;
      },
      argPackAdvance: W,
      readValueFromPointer: J,
      destructorFunction(o) {
        N(o);
      }
    });
  }, qt = (e, r, t, n, i, a) => {
    ur[e] = {
      name: R(r),
      rawConstructor: S(t, n),
      rawDestructor: S(i, a),
      fields: []
    };
  }, Yt = (e, r, t, n, i, a, s, o, u, f) => {
    ur[e].fields.push({
      fieldName: R(r),
      getterReturnType: t,
      getter: S(n, i),
      getterContext: a,
      setterArgumentType: s,
      setter: S(o, u),
      setterContext: f
    });
  }, Kt = (e, r) => {
    r = R(r), O(e, {
      isVoid: !0,
      name: r,
      argPackAdvance: 0,
      fromWireType: () => {
      },
      toWireType: (t, n) => {
      }
    });
  }, Dr = [], Jt = (e, r, t, n) => (e = Dr[e], r = M.toValue(r), e(null, r, t, n)), Qt = {}, rn = (e) => {
    var r = Qt[e];
    return r === void 0 ? R(e) : r;
  }, de = () => {
    if (typeof globalThis == "object")
      return globalThis;
    function e(r) {
      r.$$$embind_global$$$ = r;
      var t = typeof $$$embind_global$$$ == "object" && r.$$$embind_global$$$ == r;
      return t || delete r.$$$embind_global$$$, t;
    }
    if (typeof $$$embind_global$$$ == "object" || (typeof global == "object" && e(global) ? $$$embind_global$$$ = global : typeof self == "object" && e(self) && ($$$embind_global$$$ = self), typeof $$$embind_global$$$ == "object"))
      return $$$embind_global$$$;
    throw Error("unable to get global object.");
  }, en = (e) => e === 0 ? M.toHandle(de()) : (e = rn(e), M.toHandle(de()[e])), tn = (e) => {
    var r = Dr.length;
    return Dr.push(e), r;
  }, pe = (e, r) => {
    var t = V[e];
    return t === void 0 && m(`${r} has unknown type ${se(e)}`), t;
  }, nn = (e, r) => {
    for (var t = new Array(e), n = 0; n < e; ++n)
      t[n] = pe($[r + n * 4 >> 2], `parameter ${n}`);
    return t;
  }, an = (e, r, t) => {
    var n = [], i = e.toWireType(n, t);
    return n.length && ($[r >> 2] = M.toHandle(n)), i;
  }, on = Reflect.construct, sn = (e, r, t) => {
    var n = nn(e, r), i = n.shift();
    e--;
    var a = new Array(e), s = (u, f, c, v) => {
      for (var g = 0, y = 0; y < e; ++y)
        a[y] = n[y].readValueFromPointer(v + g), g += n[y].argPackAdvance;
      var w = t === 1 ? on(f, a) : f.apply(u, a);
      return an(i, c, w);
    }, o = `methodCaller<(${n.map((u) => u.name).join(", ")}) => ${i.name}>`;
    return tn(Fr(o, s));
  }, un = (e) => {
    e > 9 && (B[e + 1] += 1);
  }, fn = (e) => {
    var r = M.toValue(e);
    Tr(r), Or(e);
  }, ln = (e, r) => {
    e = pe(e, "_emval_take_value");
    var t = e.readValueFromPointer(r);
    return M.toHandle(t);
  }, cn = (e, r, t, n) => {
    var i = (/* @__PURE__ */ new Date()).getFullYear(), a = new Date(i, 0, 1), s = new Date(i, 6, 1), o = a.getTimezoneOffset(), u = s.getTimezoneOffset(), f = Math.max(o, u);
    $[e >> 2] = f * 60, L[r >> 2] = +(o != u);
    var c = (y) => {
      var w = y >= 0 ? "-" : "+", P = Math.abs(y), C = String(Math.floor(P / 60)).padStart(2, "0"), T = String(P % 60).padStart(2, "0");
      return `UTC${w}${C}${T}`;
    }, v = c(o), g = c(u);
    u < o ? (q(v, t, 17), q(g, n, 17)) : (q(v, n, 17), q(g, t, 17));
  }, vn = () => 2147483648, dn = (e, r) => Math.ceil(e / r) * r, pn = (e) => {
    var r = nr.buffer, t = (e - r.byteLength + 65535) / 65536 | 0;
    try {
      return nr.grow(t), zr(), 1;
    } catch {
    }
  }, hn = (e) => {
    var r = E.length;
    e >>>= 0;
    var t = vn();
    if (e > t)
      return !1;
    for (var n = 1; n <= 4; n *= 2) {
      var i = r * (1 + 0.2 / n);
      i = Math.min(i, e + 100663296);
      var a = Math.min(t, dn(Math.max(e, i), 65536)), s = pn(a);
      if (s)
        return !0;
    }
    return !1;
  }, Wr = {}, _n = () => Ur || "./this.program", er = () => {
    if (!er.strings) {
      var e = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", r = {
        USER: "web_user",
        LOGNAME: "web_user",
        PATH: "/",
        PWD: "/",
        HOME: "/home/web_user",
        LANG: e,
        _: _n()
      };
      for (var t in Wr)
        Wr[t] === void 0 ? delete r[t] : r[t] = Wr[t];
      var n = [];
      for (var t in r)
        n.push(`${t}=${r[t]}`);
      er.strings = n;
    }
    return er.strings;
  }, gn = (e, r) => {
    var t = 0, n = 0;
    for (var i of er()) {
      var a = r + t;
      $[e + n >> 2] = a, t += q(i, a, 1 / 0) + 1, n += 4;
    }
    return 0;
  }, yn = (e, r) => {
    var t = er();
    $[e >> 2] = t.length;
    var n = 0;
    for (var i of t)
      n += ce(i) + 1;
    return $[r >> 2] = n, 0;
  }, mn = (e) => 52, $n = (e, r, t, n) => 52;
  function bn(e, r, t, n, i) {
    return 70;
  }
  var wn = [null, [], []], Cn = (e, r) => {
    var t = wn[e];
    r === 0 || r === 10 ? ((e === 1 ? Hr : Z)(Yr(t)), t.length = 0) : t.push(r);
  }, Pn = (e, r, t, n) => {
    for (var i = 0, a = 0; a < t; a++) {
      var s = $[r >> 2], o = $[r + 4 >> 2];
      r += 8;
      for (var u = 0; u < o; u++)
        Cn(e, E[s + u]);
      i += o;
    }
    return $[n >> 2] = i, 0;
  }, Tn = (e) => e;
  ot(), ct(), Ct(), l.noExitRuntime && l.noExitRuntime, l.print && (Hr = l.print), l.printErr && (Z = l.printErr), l.wasmBinary && (Y = l.wasmBinary), l.arguments && l.arguments, l.thisProgram && (Ur = l.thisProgram);
  var An = {
    r: He,
    u: Be,
    a: Ne,
    j: Ze,
    l: ze,
    Q: Le,
    p: Xe,
    ha: Ge,
    d: qe,
    V: Ke,
    na: Je,
    la: Qe,
    oa: rt,
    ja: et,
    da: tt,
    Aa: it,
    ca: at,
    va: ut,
    ya: Rt,
    xa: kt,
    J: Et,
    ta: St,
    Y: Ot,
    N: Dt,
    y: Mt,
    t: xt,
    za: Ut,
    ua: Ht,
    R: Gt,
    C: qt,
    Ba: Yt,
    wa: Kt,
    ka: Jt,
    Ca: Or,
    F: en,
    sa: sn,
    Z: un,
    _: fn,
    X: ln,
    ea: cn,
    ia: hn,
    fa: gn,
    ga: yn,
    T: mn,
    ma: $n,
    aa: bn,
    U: Pn,
    L: oi,
    D: ui,
    G: Un,
    S: pi,
    q: ti,
    b: Bn,
    H: ai,
    qa: li,
    c: Nn,
    pa: ci,
    h: In,
    i: Xn,
    s: Kn,
    P: ii,
    w: Qn,
    E: ei,
    M: ni,
    z: fi,
    K: hi,
    ba: _i,
    $: gi,
    k: Zn,
    f: xn,
    e: Hn,
    g: Vn,
    O: di,
    m: zn,
    ra: si,
    o: Jn,
    A: Gn,
    v: ri,
    W: Yn,
    B: vi,
    n: Ln,
    I: qn,
    x: Tn
  }, b = await Ie();
  b.Ea;
  var Rn = b.Fa, N = l._free = b.Ga, he = l._malloc = b.Ia, Fn = b.Ja, d = b.Ka, kn = b.La, En = b.Ma, Sn = b.Na, jn = b.Oa, On = b.Pa, Dn = b.Qa;
  l.dynCall_viijii = b.Ra;
  var Wn = l.dynCall_iiijj = b.Sa;
  l.dynCall_jiji = b.Ta;
  var Mn = l.dynCall_jiiii = b.Ua;
  l.dynCall_iiiiij = b.Va, l.dynCall_iiiiijj = b.Wa, l.dynCall_iiiiiijj = b.Xa;
  function xn(e, r) {
    var t = h();
    try {
      _(e)(r);
    } catch (n) {
      if (p(t), n !== n + 0) throw n;
      d(1, 0);
    }
  }
  function In(e, r, t, n) {
    var i = h();
    try {
      return _(e)(r, t, n);
    } catch (a) {
      if (p(i), a !== a + 0) throw a;
      d(1, 0);
    }
  }
  function Un(e, r, t, n, i) {
    var a = h();
    try {
      return _(e)(r, t, n, i);
    } catch (s) {
      if (p(a), s !== s + 0) throw s;
      d(1, 0);
    }
  }
  function Vn(e, r, t, n) {
    var i = h();
    try {
      _(e)(r, t, n);
    } catch (a) {
      if (p(i), a !== a + 0) throw a;
      d(1, 0);
    }
  }
  function Hn(e, r, t) {
    var n = h();
    try {
      _(e)(r, t);
    } catch (i) {
      if (p(n), i !== i + 0) throw i;
      d(1, 0);
    }
  }
  function Bn(e, r) {
    var t = h();
    try {
      return _(e)(r);
    } catch (n) {
      if (p(t), n !== n + 0) throw n;
      d(1, 0);
    }
  }
  function Nn(e, r, t) {
    var n = h();
    try {
      return _(e)(r, t);
    } catch (i) {
      if (p(n), i !== i + 0) throw i;
      d(1, 0);
    }
  }
  function Zn(e) {
    var r = h();
    try {
      _(e)();
    } catch (t) {
      if (p(r), t !== t + 0) throw t;
      d(1, 0);
    }
  }
  function zn(e, r, t, n, i) {
    var a = h();
    try {
      _(e)(r, t, n, i);
    } catch (s) {
      if (p(a), s !== s + 0) throw s;
      d(1, 0);
    }
  }
  function Ln(e, r, t, n, i, a, s, o, u, f, c) {
    var v = h();
    try {
      _(e)(r, t, n, i, a, s, o, u, f, c);
    } catch (g) {
      if (p(v), g !== g + 0) throw g;
      d(1, 0);
    }
  }
  function Xn(e, r, t, n, i) {
    var a = h();
    try {
      return _(e)(r, t, n, i);
    } catch (s) {
      if (p(a), s !== s + 0) throw s;
      d(1, 0);
    }
  }
  function Gn(e, r, t, n, i, a, s) {
    var o = h();
    try {
      _(e)(r, t, n, i, a, s);
    } catch (u) {
      if (p(o), u !== u + 0) throw u;
      d(1, 0);
    }
  }
  function qn(e, r, t, n, i, a, s, o, u, f, c, v, g, y, w, P) {
    var C = h();
    try {
      _(e)(r, t, n, i, a, s, o, u, f, c, v, g, y, w, P);
    } catch (T) {
      if (p(C), T !== T + 0) throw T;
      d(1, 0);
    }
  }
  function Yn(e, r, t, n, i, a, s, o, u) {
    var f = h();
    try {
      _(e)(r, t, n, i, a, s, o, u);
    } catch (c) {
      if (p(f), c !== c + 0) throw c;
      d(1, 0);
    }
  }
  function Kn(e, r, t, n, i, a) {
    var s = h();
    try {
      return _(e)(r, t, n, i, a);
    } catch (o) {
      if (p(s), o !== o + 0) throw o;
      d(1, 0);
    }
  }
  function Jn(e, r, t, n, i, a) {
    var s = h();
    try {
      _(e)(r, t, n, i, a);
    } catch (o) {
      if (p(s), o !== o + 0) throw o;
      d(1, 0);
    }
  }
  function Qn(e, r, t, n, i, a, s) {
    var o = h();
    try {
      return _(e)(r, t, n, i, a, s);
    } catch (u) {
      if (p(o), u !== u + 0) throw u;
      d(1, 0);
    }
  }
  function ri(e, r, t, n, i, a, s, o) {
    var u = h();
    try {
      _(e)(r, t, n, i, a, s, o);
    } catch (f) {
      if (p(u), f !== f + 0) throw f;
      d(1, 0);
    }
  }
  function ei(e, r, t, n, i, a, s, o) {
    var u = h();
    try {
      return _(e)(r, t, n, i, a, s, o);
    } catch (f) {
      if (p(u), f !== f + 0) throw f;
      d(1, 0);
    }
  }
  function ti(e) {
    var r = h();
    try {
      return _(e)();
    } catch (t) {
      if (p(r), t !== t + 0) throw t;
      d(1, 0);
    }
  }
  function ni(e, r, t, n, i, a, s, o, u) {
    var f = h();
    try {
      return _(e)(r, t, n, i, a, s, o, u);
    } catch (c) {
      if (p(f), c !== c + 0) throw c;
      d(1, 0);
    }
  }
  function ii(e, r, t, n, i, a, s) {
    var o = h();
    try {
      return _(e)(r, t, n, i, a, s);
    } catch (u) {
      if (p(o), u !== u + 0) throw u;
      d(1, 0);
    }
  }
  function ai(e, r, t, n) {
    var i = h();
    try {
      return _(e)(r, t, n);
    } catch (a) {
      if (p(i), a !== a + 0) throw a;
      d(1, 0);
    }
  }
  function oi(e, r, t, n) {
    var i = h();
    try {
      return _(e)(r, t, n);
    } catch (a) {
      if (p(i), a !== a + 0) throw a;
      d(1, 0);
    }
  }
  function si(e, r, t, n, i, a, s, o) {
    var u = h();
    try {
      _(e)(r, t, n, i, a, s, o);
    } catch (f) {
      if (p(u), f !== f + 0) throw f;
      d(1, 0);
    }
  }
  function ui(e, r, t, n, i, a) {
    var s = h();
    try {
      return _(e)(r, t, n, i, a);
    } catch (o) {
      if (p(s), o !== o + 0) throw o;
      d(1, 0);
    }
  }
  function fi(e, r, t, n, i, a, s, o, u, f) {
    var c = h();
    try {
      return _(e)(r, t, n, i, a, s, o, u, f);
    } catch (v) {
      if (p(c), v !== v + 0) throw v;
      d(1, 0);
    }
  }
  function li(e, r, t) {
    var n = h();
    try {
      return _(e)(r, t);
    } catch (i) {
      if (p(n), i !== i + 0) throw i;
      d(1, 0);
    }
  }
  function ci(e, r, t, n, i) {
    var a = h();
    try {
      return _(e)(r, t, n, i);
    } catch (s) {
      if (p(a), s !== s + 0) throw s;
      d(1, 0);
    }
  }
  function vi(e, r, t, n, i, a, s, o, u, f) {
    var c = h();
    try {
      _(e)(r, t, n, i, a, s, o, u, f);
    } catch (v) {
      if (p(c), v !== v + 0) throw v;
      d(1, 0);
    }
  }
  function di(e, r, t, n, i, a, s) {
    var o = h();
    try {
      _(e)(r, t, n, i, a, s);
    } catch (u) {
      if (p(o), u !== u + 0) throw u;
      d(1, 0);
    }
  }
  function pi(e, r, t, n) {
    var i = h();
    try {
      return _(e)(r, t, n);
    } catch (a) {
      if (p(i), a !== a + 0) throw a;
      d(1, 0);
    }
  }
  function hi(e, r, t, n, i, a, s, o, u, f, c, v) {
    var g = h();
    try {
      return _(e)(r, t, n, i, a, s, o, u, f, c, v);
    } catch (y) {
      if (p(g), y !== y + 0) throw y;
      d(1, 0);
    }
  }
  function _i(e, r, t, n, i, a, s) {
    var o = h();
    try {
      return Wn(e, r, t, n, i, a, s);
    } catch (u) {
      if (p(o), u !== u + 0) throw u;
      d(1, 0);
    }
  }
  function gi(e, r, t, n, i) {
    var a = h();
    try {
      return Mn(e, r, t, n, i);
    } catch (s) {
      if (p(a), s !== s + 0) throw s;
      d(1, 0);
    }
  }
  function Mr() {
    if (U > 0) {
      K = Mr;
      return;
    }
    if (Re(), U > 0) {
      K = Mr;
      return;
    }
    function e() {
      var r;
      l.calledRun = !0, !Br && (Fe(), xr(l), (r = l.onRuntimeInitialized) === null || r === void 0 || r.call(l), ke());
    }
    l.setStatus ? (l.setStatus("Running..."), setTimeout(() => {
      setTimeout(() => l.setStatus(""), 1), e();
    }, 1)) : e();
  }
  function yi() {
    if (l.preInit)
      for (typeof l.preInit == "function" && (l.preInit = [l.preInit]); l.preInit.length > 0; )
        l.preInit.shift()();
  }
  return yi(), Mr(), j = we, j;
};
function $e(A) {
  return $i(gr, A);
}
function Ri() {
  return bi(gr);
}
function Fi(A) {
  return $e({
    overrides: A,
    equalityFn: Object.is,
    fireImmediately: !0
  });
}
function ki(A) {
  $e({
    overrides: A,
    equalityFn: Object.is,
    fireImmediately: !1
  });
}
async function be(A, j) {
  return wi(gr, A, j);
}
async function Ei(A, j) {
  return be(A, j);
}
async function Si(A, j) {
  return be(A, j);
}
async function ji(A, j) {
  return Ci(gr, A, j);
}
const Oi = "3b7ce17efb752c53b50207f9e4f4d3a118a86969582e109556920b848958886e";
export {
  Mi as ZXING_CPP_COMMIT,
  Oi as ZXING_WASM_SHA256,
  xi as ZXING_WASM_VERSION,
  Ii as barcodeFormats,
  Ui as binarizers,
  Vi as characterSets,
  Hi as contentTypes,
  Bi as defaultReaderOptions,
  Ni as defaultWriterOptions,
  Zi as eanAddOnSymbols,
  Fi as getZXingModule,
  zi as linearBarcodeFormats,
  Li as matrixBarcodeFormats,
  $e as prepareZXingModule,
  Ri as purgeZXingModule,
  be as readBarcodes,
  Si as readBarcodesFromImageData,
  Ei as readBarcodesFromImageFile,
  ki as setZXingModuleOverrides,
  Xi as textModes,
  ji as writeBarcode
};
