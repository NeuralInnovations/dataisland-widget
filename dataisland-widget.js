/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mr = globalThis, Ai = mr.ShadowRoot && (mr.ShadyCSS === void 0 || mr.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Fi = Symbol(), Yi = /* @__PURE__ */ new WeakMap();
let vs = class {
  constructor(t, r, i) {
    if (this._$cssResult$ = !0, i !== Fi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (Ai && t === void 0) {
      const i = r !== void 0 && r.length === 1;
      i && (t = Yi.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Yi.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ta = (e) => new vs(typeof e == "string" ? e : e + "", void 0, Fi), se = (e, ...t) => {
  const r = e.length === 1 ? e[0] : t.reduce((i, n, u) => i + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[u + 1], e[0]);
  return new vs(r, e, Fi);
}, ra = (e, t) => {
  if (Ai) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const i = document.createElement("style"), n = mr.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = r.cssText, e.appendChild(i);
  }
}, eu = Ai ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const i of t.cssRules) r += i.cssText;
  return ta(r);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ia, defineProperty: ua, getOwnPropertyDescriptor: na, getOwnPropertyNames: sa, getOwnPropertySymbols: oa, getPrototypeOf: aa } = Object, fe = globalThis, tu = fe.trustedTypes, ca = tu ? tu.emptyScript : "", Tr = fe.reactiveElementPolyfillSupport, Yt = (e, t) => e, gr = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? ca : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let r = e;
  switch (t) {
    case Boolean:
      r = e !== null;
      break;
    case Number:
      r = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(e);
      } catch {
        r = null;
      }
  }
  return r;
} }, Di = (e, t) => !ia(e, t), ru = { attribute: !0, type: String, converter: gr, reflect: !1, hasChanged: Di };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), fe.litPropertyMetadata ?? (fe.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class Be extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = ru) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.elementProperties.set(t, r), !r.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(t, i, r);
      n !== void 0 && ua(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, r, i) {
    const { get: n, set: u } = na(this.prototype, t) ?? { get() {
      return this[r];
    }, set(s) {
      this[r] = s;
    } };
    return { get() {
      return n == null ? void 0 : n.call(this);
    }, set(s) {
      const o = n == null ? void 0 : n.call(this);
      u.call(this, s), this.requestUpdate(t, o, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ru;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Yt("elementProperties"))) return;
    const t = aa(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Yt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Yt("properties"))) {
      const r = this.properties, i = [...sa(r), ...oa(r)];
      for (const n of i) this.createProperty(n, r[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const r = litPropertyMetadata.get(t);
      if (r !== void 0) for (const [i, n] of r) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, i] of this.elementProperties) {
      const n = this._$Eu(r, i);
      n !== void 0 && this._$Eh.set(n, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const r = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const n of i) r.unshift(eu(n));
    } else t !== void 0 && r.push(eu(t));
    return r;
  }
  static _$Eu(t, r) {
    const i = r.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((r) => this.enableUpdating = r), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((r) => r(this));
  }
  addController(t) {
    var r;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((r = t.hostConnected) == null || r.call(t));
  }
  removeController(t) {
    var r;
    (r = this._$EO) == null || r.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const i of r.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ra(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((r) => {
      var i;
      return (i = r.hostConnected) == null ? void 0 : i.call(r);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((r) => {
      var i;
      return (i = r.hostDisconnected) == null ? void 0 : i.call(r);
    });
  }
  attributeChangedCallback(t, r, i) {
    this._$AK(t, i);
  }
  _$EC(t, r) {
    var u;
    const i = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, i);
    if (n !== void 0 && i.reflect === !0) {
      const s = (((u = i.converter) == null ? void 0 : u.toAttribute) !== void 0 ? i.converter : gr).toAttribute(r, i.type);
      this._$Em = t, s == null ? this.removeAttribute(n) : this.setAttribute(n, s), this._$Em = null;
    }
  }
  _$AK(t, r) {
    var u;
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const s = i.getPropertyOptions(n), o = typeof s.converter == "function" ? { fromAttribute: s.converter } : ((u = s.converter) == null ? void 0 : u.fromAttribute) !== void 0 ? s.converter : gr;
      this._$Em = n, this[n] = o.fromAttribute(r, s.type), this._$Em = null;
    }
  }
  requestUpdate(t, r, i) {
    if (t !== void 0) {
      if (i ?? (i = this.constructor.getPropertyOptions(t)), !(i.hasChanged ?? Di)(this[t], r)) return;
      this.P(t, r, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(t, r, i) {
    this._$AL.has(t) || this._$AL.set(t, r), i.reflect === !0 && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (r) {
      Promise.reject(r);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [u, s] of this._$Ep) this[u] = s;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [u, s] of n) s.wrapped !== !0 || this._$AL.has(u) || this[u] === void 0 || this.P(u, this[u], s);
    }
    let t = !1;
    const r = this._$AL;
    try {
      t = this.shouldUpdate(r), t ? (this.willUpdate(r), (i = this._$EO) == null || i.forEach((n) => {
        var u;
        return (u = n.hostUpdate) == null ? void 0 : u.call(n);
      }), this.update(r)) : this._$EU();
    } catch (n) {
      throw t = !1, this._$EU(), n;
    }
    t && this._$AE(r);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var r;
    (r = this._$EO) == null || r.forEach((i) => {
      var n;
      return (n = i.hostUpdated) == null ? void 0 : n.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((r) => this._$EC(r, this[r]))), this._$EU();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
Be.elementStyles = [], Be.shadowRootOptions = { mode: "open" }, Be[Yt("elementProperties")] = /* @__PURE__ */ new Map(), Be[Yt("finalized")] = /* @__PURE__ */ new Map(), Tr == null || Tr({ ReactiveElement: Be }), (fe.reactiveElementVersions ?? (fe.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const er = globalThis, vr = er.trustedTypes, iu = vr ? vr.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ws = "$lit$", ce = `lit$${Math.random().toFixed(9).slice(2)}$`, ys = "?" + ce, la = `<${ys}>`, Le = document, tr = () => Le.createComment(""), rr = (e) => e === null || typeof e != "object" && typeof e != "function", Si = Array.isArray, da = (e) => Si(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Mr = `[ 	
\f\r]`, Xe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, uu = /-->/g, nu = />/g, pe = RegExp(`>|${Mr}(?:([^\\s"'>=/]+)(${Mr}*=${Mr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), su = /'/g, ou = /"/g, xs = /^(?:script|style|textarea|title)$/i, fa = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), U = fa(1), Te = Symbol.for("lit-noChange"), P = Symbol.for("lit-nothing"), au = /* @__PURE__ */ new WeakMap(), Ue = Le.createTreeWalker(Le, 129);
function Es(e, t) {
  if (!Si(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return iu !== void 0 ? iu.createHTML(t) : t;
}
const ha = (e, t) => {
  const r = e.length - 1, i = [];
  let n, u = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = Xe;
  for (let o = 0; o < r; o++) {
    const a = e[o];
    let c, l, d = -1, f = 0;
    for (; f < a.length && (s.lastIndex = f, l = s.exec(a), l !== null); ) f = s.lastIndex, s === Xe ? l[1] === "!--" ? s = uu : l[1] !== void 0 ? s = nu : l[2] !== void 0 ? (xs.test(l[2]) && (n = RegExp("</" + l[2], "g")), s = pe) : l[3] !== void 0 && (s = pe) : s === pe ? l[0] === ">" ? (s = n ?? Xe, d = -1) : l[1] === void 0 ? d = -2 : (d = s.lastIndex - l[2].length, c = l[1], s = l[3] === void 0 ? pe : l[3] === '"' ? ou : su) : s === ou || s === su ? s = pe : s === uu || s === nu ? s = Xe : (s = pe, n = void 0);
    const h = s === pe && e[o + 1].startsWith("/>") ? " " : "";
    u += s === Xe ? a + la : d >= 0 ? (i.push(c), a.slice(0, d) + ws + a.slice(d) + ce + h) : a + ce + (d === -2 ? o : h);
  }
  return [Es(e, u + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class ir {
  constructor({ strings: t, _$litType$: r }, i) {
    let n;
    this.parts = [];
    let u = 0, s = 0;
    const o = t.length - 1, a = this.parts, [c, l] = ha(t, r);
    if (this.el = ir.createElement(c, i), Ue.currentNode = this.el.content, r === 2 || r === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = Ue.nextNode()) !== null && a.length < o; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const d of n.getAttributeNames()) if (d.endsWith(ws)) {
          const f = l[s++], h = n.getAttribute(d).split(ce), p = /([.?@])?(.*)/.exec(f);
          a.push({ type: 1, index: u, name: p[2], strings: h, ctor: p[1] === "." ? _a : p[1] === "?" ? ma : p[1] === "@" ? ba : Pr }), n.removeAttribute(d);
        } else d.startsWith(ce) && (a.push({ type: 6, index: u }), n.removeAttribute(d));
        if (xs.test(n.tagName)) {
          const d = n.textContent.split(ce), f = d.length - 1;
          if (f > 0) {
            n.textContent = vr ? vr.emptyScript : "";
            for (let h = 0; h < f; h++) n.append(d[h], tr()), Ue.nextNode(), a.push({ type: 2, index: ++u });
            n.append(d[f], tr());
          }
        }
      } else if (n.nodeType === 8) if (n.data === ys) a.push({ type: 2, index: u });
      else {
        let d = -1;
        for (; (d = n.data.indexOf(ce, d + 1)) !== -1; ) a.push({ type: 7, index: u }), d += ce.length - 1;
      }
      u++;
    }
  }
  static createElement(t, r) {
    const i = Le.createElement("template");
    return i.innerHTML = t, i;
  }
}
function Ge(e, t, r = e, i) {
  var s, o;
  if (t === Te) return t;
  let n = i !== void 0 ? (s = r._$Co) == null ? void 0 : s[i] : r._$Cl;
  const u = rr(t) ? void 0 : t._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== u && ((o = n == null ? void 0 : n._$AO) == null || o.call(n, !1), u === void 0 ? n = void 0 : (n = new u(e), n._$AT(e, r, i)), i !== void 0 ? (r._$Co ?? (r._$Co = []))[i] = n : r._$Cl = n), n !== void 0 && (t = Ge(e, n._$AS(e, t.values), n, i)), t;
}
class pa {
  constructor(t, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: r }, parts: i } = this._$AD, n = ((t == null ? void 0 : t.creationScope) ?? Le).importNode(r, !0);
    Ue.currentNode = n;
    let u = Ue.nextNode(), s = 0, o = 0, a = i[0];
    for (; a !== void 0; ) {
      if (s === a.index) {
        let c;
        a.type === 2 ? c = new ar(u, u.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(u, a.name, a.strings, this, t) : a.type === 6 && (c = new ga(u, this, t)), this._$AV.push(c), a = i[++o];
      }
      s !== (a == null ? void 0 : a.index) && (u = Ue.nextNode(), s++);
    }
    return Ue.currentNode = Le, n;
  }
  p(t) {
    let r = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, r), r += i.strings.length - 2) : i._$AI(t[r])), r++;
  }
}
class ar {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, r, i, n) {
    this.type = 2, this._$AH = P, this._$AN = void 0, this._$AA = t, this._$AB = r, this._$AM = i, this.options = n, this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = r.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, r = this) {
    t = Ge(this, t, r), rr(t) ? t === P || t == null || t === "" ? (this._$AH !== P && this._$AR(), this._$AH = P) : t !== this._$AH && t !== Te && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : da(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== P && rr(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Le.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var u;
    const { values: r, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = ir.createElement(Es(i.h, i.h[0]), this.options)), i);
    if (((u = this._$AH) == null ? void 0 : u._$AD) === n) this._$AH.p(r);
    else {
      const s = new pa(n, this), o = s.u(this.options);
      s.p(r), this.T(o), this._$AH = s;
    }
  }
  _$AC(t) {
    let r = au.get(t.strings);
    return r === void 0 && au.set(t.strings, r = new ir(t)), r;
  }
  k(t) {
    Si(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let i, n = 0;
    for (const u of t) n === r.length ? r.push(i = new ar(this.O(tr()), this.O(tr()), this, this.options)) : i = r[n], i._$AI(u), n++;
    n < r.length && (this._$AR(i && i._$AB.nextSibling, n), r.length = n);
  }
  _$AR(t = this._$AA.nextSibling, r) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, r); t && t !== this._$AB; ) {
      const n = t.nextSibling;
      t.remove(), t = n;
    }
  }
  setConnected(t) {
    var r;
    this._$AM === void 0 && (this._$Cv = t, (r = this._$AP) == null || r.call(this, t));
  }
}
class Pr {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, r, i, n, u) {
    this.type = 1, this._$AH = P, this._$AN = void 0, this.element = t, this.name = r, this._$AM = n, this.options = u, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = P;
  }
  _$AI(t, r = this, i, n) {
    const u = this.strings;
    let s = !1;
    if (u === void 0) t = Ge(this, t, r, 0), s = !rr(t) || t !== this._$AH && t !== Te, s && (this._$AH = t);
    else {
      const o = t;
      let a, c;
      for (t = u[0], a = 0; a < u.length - 1; a++) c = Ge(this, o[i + a], r, a), c === Te && (c = this._$AH[a]), s || (s = !rr(c) || c !== this._$AH[a]), c === P ? t = P : t !== P && (t += (c ?? "") + u[a + 1]), this._$AH[a] = c;
    }
    s && !n && this.j(t);
  }
  j(t) {
    t === P ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class _a extends Pr {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === P ? void 0 : t;
  }
}
class ma extends Pr {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== P);
  }
}
class ba extends Pr {
  constructor(t, r, i, n, u) {
    super(t, r, i, n, u), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = Ge(this, t, r, 0) ?? P) === Te) return;
    const i = this._$AH, n = t === P && i !== P || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, u = t !== P && (i === P || n);
    n && this.element.removeEventListener(this.name, this, i), u && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var r;
    typeof this._$AH == "function" ? this._$AH.call(((r = this.options) == null ? void 0 : r.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ga {
  constructor(t, r, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Ge(this, t);
  }
}
const jr = er.litHtmlPolyfillSupport;
jr == null || jr(ir, ar), (er.litHtmlVersions ?? (er.litHtmlVersions = [])).push("3.2.1");
const va = (e, t, r) => {
  const i = (r == null ? void 0 : r.renderBefore) ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const u = (r == null ? void 0 : r.renderBefore) ?? null;
    i._$litPart$ = n = new ar(t.insertBefore(tr(), u), u, void 0, r ?? {});
  }
  return n._$AI(e), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let W = class extends Be {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var r;
    const t = super.createRenderRoot();
    return (r = this.renderOptions).renderBefore ?? (r.renderBefore = t.firstChild), t;
  }
  update(t) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = va(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return Te;
  }
};
var gs;
W._$litElement$ = !0, W.finalized = !0, (gs = globalThis.litElementHydrateSupport) == null || gs.call(globalThis, { LitElement: W });
const Br = globalThis.litElementPolyfillSupport;
Br == null || Br({ LitElement: W });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.1.1");
const wa = se`
  :host {
    font-family: var(--dataisland-widget-font-family);
    color: var(--dataisland-widget-font-color);
    z-index: 1000;
  }

  .dataisland-widget__wrapper {
    position: fixed;
    bottom: var(--dataisland-widget-position-button);
    right: 20px;
    background-color: white;
    border-radius: 10px;
    width: 300px;
    height: 400px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    padding: 10px;
    display: flex;
    flex-direction: column;
    transform: scale(0);
    transition: transform 0.3s ease;
    transform-origin: bottom right;

    font-size: var(--dataisland-widget-font-size);
  }

  .dataisland-widget__wrapper.open {
    transform: scale(1);
  }
`;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ya = { attribute: !0, type: String, converter: gr, reflect: !1, hasChanged: Di }, xa = (e = ya, t, r) => {
  const { kind: i, metadata: n } = r;
  let u = globalThis.litPropertyMetadata.get(n);
  if (u === void 0 && globalThis.litPropertyMetadata.set(n, u = /* @__PURE__ */ new Map()), u.set(r.name, e), i === "accessor") {
    const { name: s } = r;
    return { set(o) {
      const a = t.get.call(this);
      t.set.call(this, o), this.requestUpdate(s, a, e);
    }, init(o) {
      return o !== void 0 && this.P(s, void 0, e), o;
    } };
  }
  if (i === "setter") {
    const { name: s } = r;
    return function(o) {
      const a = this[s];
      t.call(this, o), this.requestUpdate(s, a, e);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function B(e) {
  return (t, r) => typeof r == "object" ? xa(e, t, r) : ((i, n, u) => {
    const s = n.hasOwnProperty(u);
    return n.constructor.createProperty(u, s ? { ...i, wrapped: !0 } : i), s ? Object.getOwnPropertyDescriptor(n, u) : void 0;
  })(e, t, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function J(e) {
  return B({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ea = (e, t, r) => (r.configurable = !0, r.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, r), r);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ka(e, t) {
  return (r, i, n) => {
    const u = (s) => {
      var o;
      return ((o = s.renderRoot) == null ? void 0 : o.querySelector(e)) ?? null;
    };
    return Ea(r, i, { get() {
      return u(this);
    } });
  };
}
const Ca = se`
  :host {
    --primary-color: #007bff;
    --secondary-color: #6c757d;

    --input-height: 37px;

    --dataisland-widget-transition-duration: 0.2s;

    /* font */
    --dataisland-widget-font-size: 13px;
    --dataisland-widget-font-color: #333;
    --dataisland-widget-font-family: 'Roboto', sans-serif;

    --dataisland-widget-color-transition: color
      var(--dataisland-widget-transition-duration) ease-in-out;

    /* popup */
    --dataisland-widget-popup-border-radius: 10px;

    /* inner */
    --dataisland-widget-position-button: 20px;
    --dataisland-widget-inner-border-radius: 10px;

    /* header */
    --dataisland-widget-header-close-color: #9b9c9f;
    --dataisland-widget-header-close-color-hover: #cccdd0;
    --dataisland-widget-header-title-font-size: var(--dataisland-widget-font-size);
    --dataisland-widget-header-button-font-size: var(--dataisland-widget-font-size);

    /* input */
    --dataisland-widget-input-border-radius: 10px;
    --dataisland-widget-input-font-size: var( --dataisland-widget-font-size);

    /* messages */
    --dataisland-widget-messages-font-size: var(--dataisland-widget-font-size);

  }
`;
function Aa(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == "function") {
    var r = function i() {
      return this instanceof i ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    r.prototype = t.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(e).forEach(function(i) {
    var n = Object.getOwnPropertyDescriptor(e, i);
    Object.defineProperty(r, i, n.get ? n : {
      enumerable: !0,
      get: function() {
        return e[i];
      }
    });
  }), r;
}
var Nr = {}, di = function(e, t) {
  return di = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
    r.__proto__ = i;
  } || function(r, i) {
    for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (r[n] = i[n]);
  }, di(e, t);
};
function ks(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  di(e, t);
  function r() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
}
var wr = function() {
  return wr = Object.assign || function(t) {
    for (var r, i = 1, n = arguments.length; i < n; i++) {
      r = arguments[i];
      for (var u in r) Object.prototype.hasOwnProperty.call(r, u) && (t[u] = r[u]);
    }
    return t;
  }, wr.apply(this, arguments);
};
function Cs(e, t) {
  var r = {};
  for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && t.indexOf(i) < 0 && (r[i] = e[i]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var n = 0, i = Object.getOwnPropertySymbols(e); n < i.length; n++)
      t.indexOf(i[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, i[n]) && (r[i[n]] = e[i[n]]);
  return r;
}
function As(e, t, r, i) {
  var n = arguments.length, u = n < 3 ? t : i === null ? i = Object.getOwnPropertyDescriptor(t, r) : i, s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") u = Reflect.decorate(e, t, r, i);
  else for (var o = e.length - 1; o >= 0; o--) (s = e[o]) && (u = (n < 3 ? s(u) : n > 3 ? s(t, r, u) : s(t, r)) || u);
  return n > 3 && u && Object.defineProperty(t, r, u), u;
}
function Fs(e, t) {
  return function(r, i) {
    t(r, i, e);
  };
}
function Ds(e, t, r, i, n, u) {
  function s(v) {
    if (v !== void 0 && typeof v != "function") throw new TypeError("Function expected");
    return v;
  }
  for (var o = i.kind, a = o === "getter" ? "get" : o === "setter" ? "set" : "value", c = !t && e ? i.static ? e : e.prototype : null, l = t || (c ? Object.getOwnPropertyDescriptor(c, i.name) : {}), d, f = !1, h = r.length - 1; h >= 0; h--) {
    var p = {};
    for (var _ in i) p[_] = _ === "access" ? {} : i[_];
    for (var _ in i.access) p.access[_] = i.access[_];
    p.addInitializer = function(v) {
      if (f) throw new TypeError("Cannot add initializers after decoration has completed");
      u.push(s(v || null));
    };
    var m = (0, r[h])(o === "accessor" ? { get: l.get, set: l.set } : l[a], p);
    if (o === "accessor") {
      if (m === void 0) continue;
      if (m === null || typeof m != "object") throw new TypeError("Object expected");
      (d = s(m.get)) && (l.get = d), (d = s(m.set)) && (l.set = d), (d = s(m.init)) && n.unshift(d);
    } else (d = s(m)) && (o === "field" ? n.unshift(d) : l[a] = d);
  }
  c && Object.defineProperty(c, i.name, l), f = !0;
}
function Ss(e, t, r) {
  for (var i = arguments.length > 2, n = 0; n < t.length; n++)
    r = i ? t[n].call(e, r) : t[n].call(e);
  return i ? r : void 0;
}
function Rs(e) {
  return typeof e == "symbol" ? e : "".concat(e);
}
function Ps(e, t, r) {
  return typeof t == "symbol" && (t = t.description ? "[".concat(t.description, "]") : ""), Object.defineProperty(e, "name", { configurable: !0, value: r ? "".concat(r, " ", t) : t });
}
function Is(e, t) {
  if (typeof Reflect == "object" && typeof Reflect.metadata == "function") return Reflect.metadata(e, t);
}
function Os(e, t, r, i) {
  function n(u) {
    return u instanceof r ? u : new r(function(s) {
      s(u);
    });
  }
  return new (r || (r = Promise))(function(u, s) {
    function o(l) {
      try {
        c(i.next(l));
      } catch (d) {
        s(d);
      }
    }
    function a(l) {
      try {
        c(i.throw(l));
      } catch (d) {
        s(d);
      }
    }
    function c(l) {
      l.done ? u(l.value) : n(l.value).then(o, a);
    }
    c((i = i.apply(e, t || [])).next());
  });
}
function qs(e, t) {
  var r = { label: 0, sent: function() {
    if (u[0] & 1) throw u[1];
    return u[1];
  }, trys: [], ops: [] }, i, n, u, s = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
  return s.next = o(0), s.throw = o(1), s.return = o(2), typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function o(c) {
    return function(l) {
      return a([c, l]);
    };
  }
  function a(c) {
    if (i) throw new TypeError("Generator is already executing.");
    for (; s && (s = 0, c[0] && (r = 0)), r; ) try {
      if (i = 1, n && (u = c[0] & 2 ? n.return : c[0] ? n.throw || ((u = n.return) && u.call(n), 0) : n.next) && !(u = u.call(n, c[1])).done) return u;
      switch (n = 0, u && (c = [c[0] & 2, u.value]), c[0]) {
        case 0:
        case 1:
          u = c;
          break;
        case 4:
          return r.label++, { value: c[1], done: !1 };
        case 5:
          r.label++, n = c[1], c = [0];
          continue;
        case 7:
          c = r.ops.pop(), r.trys.pop();
          continue;
        default:
          if (u = r.trys, !(u = u.length > 0 && u[u.length - 1]) && (c[0] === 6 || c[0] === 2)) {
            r = 0;
            continue;
          }
          if (c[0] === 3 && (!u || c[1] > u[0] && c[1] < u[3])) {
            r.label = c[1];
            break;
          }
          if (c[0] === 6 && r.label < u[1]) {
            r.label = u[1], u = c;
            break;
          }
          if (u && r.label < u[2]) {
            r.label = u[2], r.ops.push(c);
            break;
          }
          u[2] && r.ops.pop(), r.trys.pop();
          continue;
      }
      c = t.call(e, r);
    } catch (l) {
      c = [6, l], n = 0;
    } finally {
      i = u = 0;
    }
    if (c[0] & 5) throw c[1];
    return { value: c[0] ? c[1] : void 0, done: !0 };
  }
}
var Ir = Object.create ? function(e, t, r, i) {
  i === void 0 && (i = r);
  var n = Object.getOwnPropertyDescriptor(t, r);
  (!n || ("get" in n ? !t.__esModule : n.writable || n.configurable)) && (n = { enumerable: !0, get: function() {
    return t[r];
  } }), Object.defineProperty(e, i, n);
} : function(e, t, r, i) {
  i === void 0 && (i = r), e[i] = t[r];
};
function zs(e, t) {
  for (var r in e) r !== "default" && !Object.prototype.hasOwnProperty.call(t, r) && Ir(t, e, r);
}
function yr(e) {
  var t = typeof Symbol == "function" && Symbol.iterator, r = t && e[t], i = 0;
  if (r) return r.call(e);
  if (e && typeof e.length == "number") return {
    next: function() {
      return e && i >= e.length && (e = void 0), { value: e && e[i++], done: !e };
    }
  };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function Ri(e, t) {
  var r = typeof Symbol == "function" && e[Symbol.iterator];
  if (!r) return e;
  var i = r.call(e), n, u = [], s;
  try {
    for (; (t === void 0 || t-- > 0) && !(n = i.next()).done; ) u.push(n.value);
  } catch (o) {
    s = { error: o };
  } finally {
    try {
      n && !n.done && (r = i.return) && r.call(i);
    } finally {
      if (s) throw s.error;
    }
  }
  return u;
}
function Us() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e = e.concat(Ri(arguments[t]));
  return e;
}
function $s() {
  for (var e = 0, t = 0, r = arguments.length; t < r; t++) e += arguments[t].length;
  for (var i = Array(e), n = 0, t = 0; t < r; t++)
    for (var u = arguments[t], s = 0, o = u.length; s < o; s++, n++)
      i[n] = u[s];
  return i;
}
function Ls(e, t, r) {
  if (r || arguments.length === 2) for (var i = 0, n = t.length, u; i < n; i++)
    (u || !(i in t)) && (u || (u = Array.prototype.slice.call(t, 0, i)), u[i] = t[i]);
  return e.concat(u || Array.prototype.slice.call(t));
}
function He(e) {
  return this instanceof He ? (this.v = e, this) : new He(e);
}
function Ts(e, t, r) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var i = r.apply(e, t || []), n, u = [];
  return n = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), o("next"), o("throw"), o("return", s), n[Symbol.asyncIterator] = function() {
    return this;
  }, n;
  function s(h) {
    return function(p) {
      return Promise.resolve(p).then(h, d);
    };
  }
  function o(h, p) {
    i[h] && (n[h] = function(_) {
      return new Promise(function(m, v) {
        u.push([h, _, m, v]) > 1 || a(h, _);
      });
    }, p && (n[h] = p(n[h])));
  }
  function a(h, p) {
    try {
      c(i[h](p));
    } catch (_) {
      f(u[0][3], _);
    }
  }
  function c(h) {
    h.value instanceof He ? Promise.resolve(h.value.v).then(l, d) : f(u[0][2], h);
  }
  function l(h) {
    a("next", h);
  }
  function d(h) {
    a("throw", h);
  }
  function f(h, p) {
    h(p), u.shift(), u.length && a(u[0][0], u[0][1]);
  }
}
function Ms(e) {
  var t, r;
  return t = {}, i("next"), i("throw", function(n) {
    throw n;
  }), i("return"), t[Symbol.iterator] = function() {
    return this;
  }, t;
  function i(n, u) {
    t[n] = e[n] ? function(s) {
      return (r = !r) ? { value: He(e[n](s)), done: !1 } : u ? u(s) : s;
    } : u;
  }
}
function js(e) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = e[Symbol.asyncIterator], r;
  return t ? t.call(e) : (e = typeof yr == "function" ? yr(e) : e[Symbol.iterator](), r = {}, i("next"), i("throw"), i("return"), r[Symbol.asyncIterator] = function() {
    return this;
  }, r);
  function i(u) {
    r[u] = e[u] && function(s) {
      return new Promise(function(o, a) {
        s = e[u](s), n(o, a, s.done, s.value);
      });
    };
  }
  function n(u, s, o, a) {
    Promise.resolve(a).then(function(c) {
      u({ value: c, done: o });
    }, s);
  }
}
function Bs(e, t) {
  return Object.defineProperty ? Object.defineProperty(e, "raw", { value: t }) : e.raw = t, e;
}
var Fa = Object.create ? function(e, t) {
  Object.defineProperty(e, "default", { enumerable: !0, value: t });
} : function(e, t) {
  e.default = t;
}, fi = function(e) {
  return fi = Object.getOwnPropertyNames || function(t) {
    var r = [];
    for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (r[r.length] = i);
    return r;
  }, fi(e);
};
function Ns(e) {
  if (e && e.__esModule) return e;
  var t = {};
  if (e != null) for (var r = fi(e), i = 0; i < r.length; i++) r[i] !== "default" && Ir(t, e, r[i]);
  return Fa(t, e), t;
}
function Gs(e) {
  return e && e.__esModule ? e : { default: e };
}
function Hs(e, t, r, i) {
  if (r === "a" && !i) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? e !== t || !i : !t.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return r === "m" ? i : r === "a" ? i.call(e) : i ? i.value : t.get(e);
}
function Ws(e, t, r, i, n) {
  if (i === "m") throw new TypeError("Private method is not writable");
  if (i === "a" && !n) throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? e !== t || !n : !t.has(e)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return i === "a" ? n.call(e, r) : n ? n.value = r : t.set(e, r), r;
}
function Qs(e, t) {
  if (t === null || typeof t != "object" && typeof t != "function") throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof e == "function" ? t === e : e.has(t);
}
function Vs(e, t, r) {
  if (t != null) {
    if (typeof t != "object" && typeof t != "function") throw new TypeError("Object expected.");
    var i, n;
    if (r) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      i = t[Symbol.asyncDispose];
    }
    if (i === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      i = t[Symbol.dispose], r && (n = i);
    }
    if (typeof i != "function") throw new TypeError("Object not disposable.");
    n && (i = function() {
      try {
        n.call(this);
      } catch (u) {
        return Promise.reject(u);
      }
    }), e.stack.push({ value: t, dispose: i, async: r });
  } else r && e.stack.push({ async: !0 });
  return t;
}
var Da = typeof SuppressedError == "function" ? SuppressedError : function(e, t, r) {
  var i = new Error(r);
  return i.name = "SuppressedError", i.error = e, i.suppressed = t, i;
};
function Zs(e) {
  function t(u) {
    e.error = e.hasError ? new Da(u, e.error, "An error was suppressed during disposal.") : u, e.hasError = !0;
  }
  var r, i = 0;
  function n() {
    for (; r = e.stack.pop(); )
      try {
        if (!r.async && i === 1) return i = 0, e.stack.push(r), Promise.resolve().then(n);
        if (r.dispose) {
          var u = r.dispose.call(r.value);
          if (r.async) return i |= 2, Promise.resolve(u).then(n, function(s) {
            return t(s), n();
          });
        } else i |= 1;
      } catch (s) {
        t(s);
      }
    if (i === 1) return e.hasError ? Promise.reject(e.error) : Promise.resolve();
    if (e.hasError) throw e.error;
  }
  return n();
}
function Js(e, t) {
  return typeof e == "string" && /^\.\.?\//.test(e) ? e.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(r, i, n, u, s) {
    return i ? t ? ".jsx" : ".js" : n && (!u || !s) ? r : n + u + "." + s.toLowerCase() + "js";
  }) : e;
}
const Sa = {
  __extends: ks,
  __assign: wr,
  __rest: Cs,
  __decorate: As,
  __param: Fs,
  __esDecorate: Ds,
  __runInitializers: Ss,
  __propKey: Rs,
  __setFunctionName: Ps,
  __metadata: Is,
  __awaiter: Os,
  __generator: qs,
  __createBinding: Ir,
  __exportStar: zs,
  __values: yr,
  __read: Ri,
  __spread: Us,
  __spreadArrays: $s,
  __spreadArray: Ls,
  __await: He,
  __asyncGenerator: Ts,
  __asyncDelegator: Ms,
  __asyncValues: js,
  __makeTemplateObject: Bs,
  __importStar: Ns,
  __importDefault: Gs,
  __classPrivateFieldGet: Hs,
  __classPrivateFieldSet: Ws,
  __classPrivateFieldIn: Qs,
  __addDisposableResource: Vs,
  __disposeResources: Zs,
  __rewriteRelativeImportExtension: Js
}, Ra = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  __addDisposableResource: Vs,
  get __assign() {
    return wr;
  },
  __asyncDelegator: Ms,
  __asyncGenerator: Ts,
  __asyncValues: js,
  __await: He,
  __awaiter: Os,
  __classPrivateFieldGet: Hs,
  __classPrivateFieldIn: Qs,
  __classPrivateFieldSet: Ws,
  __createBinding: Ir,
  __decorate: As,
  __disposeResources: Zs,
  __esDecorate: Ds,
  __exportStar: zs,
  __extends: ks,
  __generator: qs,
  __importDefault: Gs,
  __importStar: Ns,
  __makeTemplateObject: Bs,
  __metadata: Is,
  __param: Fs,
  __propKey: Rs,
  __read: Ri,
  __rest: Cs,
  __rewriteRelativeImportExtension: Js,
  __runInitializers: Ss,
  __setFunctionName: Ps,
  __spread: Us,
  __spreadArray: Ls,
  __spreadArrays: $s,
  __values: yr,
  default: Sa
}, Symbol.toStringTag, { value: "Module" })), Pa = /* @__PURE__ */ Aa(Ra), Ia = "@neuralinnovations/dataisland-sdk", Oa = "0.5.7", qa = "SDK for DataIsland project", za = [{ type: "Apache-2.0", url: "https://www.apache.org/licenses/LICENSE-2.0.html" }], Ua = { type: "git", url: "https://github.com/NeuralInnovations/dataisland-client-js-sdk.git" }, $a = { build: "tsc", test: "jest", lint: "eslint --ext .ts,.tsx src test", "lint:fix": "eslint --fix --ext .ts,.tsx src test", docs: "typedoc --disableSources --includeVersion --plugin typedoc-plugin-markdown --out docs src/index.ts && node scripts/docs/index.js", "release-minor": "./scripts/release.sh minor", "release-patch": "./scripts/release.sh patch", "version-up-dev": "node scripts/version/up-dev.js && rm package-lock.json && npm install && npm run build && npm run lint:fix && npm run docs", release: "rm package-lock.json && npm install && npm run build && npm run lint:fix && npm run docs" }, La = { access: "public" }, Ta = { ".": "./dist/index.js" }, Ma = "dist/index.js", ja = "dist/index.d.ts", Ba = "dist/index.js", Na = { test: "test" }, Ga = ["dist", "src", "index.js", "index.d.ts"], Ha = { node: ">=16" }, Wa = ["dataisland", "sdk", "neuralinnovations", "neural innovations", "neural-innovations", "neural"], Qa = "Neural Innovations LTD", Va = "Apache-2.0", Za = { url: "https://github.com/NeuralInnovations/dataisland-client-js-sdk/issues" }, Ja = "https://github.com/NeuralInnovations/dataisland-client-js-sdk#readme", Ka = { "@babel/core": "^7.22.11", "@babel/plugin-transform-modules-commonjs": "7.22.11", "@babel/preset-env": "^7.22.10", "@babel/preset-typescript": "^7.23.3", "@babel/register": "7.22.5", "@jest/globals": "^29.7.0", "@types/jest": "^29.5.11", "@types/node": "^20.11.27", "@types/node-fetch": "^2.6.11", "@typescript-eslint/eslint-plugin": "^6.19.0", "@typescript-eslint/parser": "^6.19.0", "babel-jest": "^29.7.0", "babel-loader": "8.3.0", eslint: "^8.56.0", "eslint-config-semistandard": "^17.0.0", "eslint-config-standard": "^17.1.0", "eslint-config-standard-with-typescript": "^43.0.0", "eslint-config-xo": "^0.43.1", "eslint-config-xo-typescript": "^1.0.1", "eslint-plugin-import": "^2.29.1", "eslint-plugin-n": "^15.7.0", "eslint-plugin-promise": "^6.1.1", "eslint-plugin-react": "^7.33.2", glob: "7.2.3", jest: "^29.7.0", "jest-environment-jsdom": "^29.7.0", prettier: "2.8.7", "ts-jest": "^29.1.1", "ts-loader": "8.4.0", "ts-node": "10.9.1", tslib: "^2.6.2", tslint: "6.1.3", typedoc: "^0.25.7", "typedoc-plugin-markdown": "^3.17.1", typescript: "^5.3.3", watch: "^0.13.0", webpack: "5.94.0", yargs: "17.7.2" }, Xa = { dotenv: "^16.3.2", jsdom: "^23.2.0" }, Ya = {
  name: Ia,
  version: Oa,
  description: qa,
  licenses: za,
  repository: Ua,
  scripts: $a,
  publishConfig: La,
  exports: Ta,
  main: Ma,
  types: ja,
  browser: Ba,
  directories: Na,
  files: Ga,
  engines: Ha,
  keywords: Wa,
  author: Qa,
  license: Va,
  bugs: Za,
  homepage: Ja,
  devDependencies: Ka,
  dependencies: Xa
};
var Ye = {}, et = {}, tt = {}, rt = {}, cu;
function Ks() {
  if (cu) return rt;
  cu = 1, Object.defineProperty(rt, "__esModule", { value: !0 }), rt.AppBuilder = void 0;
  class e {
  }
  return rt.AppBuilder = e, rt;
}
var z = {}, it = {}, _e = {}, lu;
function G() {
  if (lu) return _e;
  lu = 1, Object.defineProperty(_e, "__esModule", { value: !0 }), _e.Service = _e.ServiceContext = void 0;
  class e {
    constructor(i, n) {
      this.context = i, this.disposableContainer = n, this.onRegister = async () => {
        await Promise.resolve();
      }, this.onStart = async () => {
        await Promise.resolve();
      }, this.onUnregister = () => {
      };
    }
    get lifetime() {
      return this.disposableContainer.lifetime;
    }
    resolve(i) {
      return this.context.resolve(i);
    }
  }
  _e.ServiceContext = e;
  class t {
    resolve(i) {
      return this.serviceContext.resolve(i);
    }
    get lifetime() {
      return this.serviceContext.lifetime;
    }
    get context() {
      return this.serviceContext.context;
    }
    constructor(i) {
      this.serviceContext = i;
    }
  }
  return _e.Service = t, _e;
}
var du;
function Pi() {
  if (du) return it;
  du = 1, Object.defineProperty(it, "__esModule", { value: !0 }), it.MiddlewareService = void 0;
  const e = G();
  class t extends e.Service {
    constructor() {
      super(...arguments), this._middlewares = [];
    }
    useMiddleware(i) {
      this._middlewares.push(i);
      const n = this.lifetime.defineNested();
      return n.addCallback(() => {
        this._middlewares = this._middlewares.filter((u) => u !== i);
      }, this), n;
    }
    async process(i, n) {
      const u = this._middlewares.slice();
      let s = -1;
      const o = async (a) => (s++, s < u.length ? await u[s](a, o) : await n(a));
      return await o(i);
    }
  }
  return it.MiddlewareService = t, it;
}
var fu;
function Or() {
  if (fu) return z;
  fu = 1, Object.defineProperty(z, "__esModule", { value: !0 }), z.CustomCredential = z.AnonymousCredential = z.BearerCredential = z.DebugCredential = z.BasicCredential = z.DefaultCredential = z.CredentialBase = void 0;
  const e = Pi();
  class t {
  }
  z.CredentialBase = t;
  class r extends t {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onRegister(c, l) {
    }
  }
  z.DefaultCredential = r;
  class i extends t {
    constructor(c, l) {
      super(), this.email = c, this.password = l;
    }
    onRegister(c, l) {
      const d = l.resolve(e.MiddlewareService);
      if (d === void 0)
        throw new Error("MiddlewareService is not registered.");
      c.add(d.useMiddleware(async (f, h) => (f.headers.set("Authorization", `Basic ${this.email}:${this.password}`), await h(f))));
    }
  }
  z.BasicCredential = i;
  class n extends t {
    constructor(c) {
      super(), this.token = c;
    }
    onRegister(c, l) {
      const d = l.resolve(e.MiddlewareService);
      if (d === void 0)
        throw new Error("MiddlewareService is not registered.");
      c.add(d.useMiddleware(async (f, h) => {
        const p = typeof this.token == "function" ? await this.token(f) : this.token;
        return f.headers.set("Authorization", `Debug ${p}`), await h(f);
      }));
    }
  }
  z.DebugCredential = n;
  class u extends t {
    constructor(c) {
      super(), this.token = c;
    }
    onRegister(c, l) {
      const d = l.resolve(e.MiddlewareService);
      if (d === void 0)
        throw new Error("MiddlewareService is not registered.");
      c.add(d.useMiddleware(async (f, h) => {
        const p = typeof this.token == "function" ? await this.token(f) : this.token;
        return f.headers.set("Authorization", `Bearer ${p}`), await h(f);
      }));
    }
  }
  z.BearerCredential = u;
  class s extends t {
    constructor(c) {
      super(), this.token = c;
    }
    onRegister(c, l) {
      const d = l.resolve(e.MiddlewareService);
      if (d === void 0)
        throw new Error("MiddlewareService is not registered.");
      c.add(d.useMiddleware(async (f, h) => {
        const p = typeof this.token == "function" ? await this.token(f) : this.token;
        return f.headers.set("Authorization", `InternalJWT ${p}`), await h(f);
      }));
    }
  }
  z.AnonymousCredential = s;
  class o extends t {
    constructor(c, l) {
      super(), this.token = l, this.schema = c;
    }
    onRegister(c, l) {
      const d = l.resolve(e.MiddlewareService);
      if (d === void 0)
        throw new Error("MiddlewareService is not registered.");
      c.add(d.useMiddleware(async (f, h) => {
        const p = typeof this.token == "function" ? await this.token(f) : this.token;
        return f.headers.set("Authorization", `${this.schema} ${p}`), await h(f);
      }));
    }
  }
  return z.CustomCredential = o, z;
}
var H = {}, hu;
function Xs() {
  if (hu) return H;
  hu = 1, Object.defineProperty(H, "__esModule", { value: !0 }), H.isUnitTest = H.appTestCurrent = H.appTest = H.UnitTest = void 0;
  var e;
  (function(u) {
    u[u.DO_NOTHING = 0] = "DO_NOTHING", u[u.DO_NOT_START = 1] = "DO_NOT_START", u[u.DO_NOT_PRINT_INITIALIZED_LOG = 2] = "DO_NOT_PRINT_INITIALIZED_LOG", u[u.DO_NOT_START_SDK = 3] = "DO_NOT_START_SDK";
  })(e || (H.UnitTest = e = {}));
  class t {
    static get current() {
      return this._stack[this._stack.length - 1];
    }
    static async test(s = e.DO_NOT_START_SDK, o) {
      if (this._stack.push(s), o) {
        const a = o();
        a && await a, t.end();
      }
    }
    static end() {
      this._stack.length > 1 && this._stack.pop();
    }
  }
  t._stack = [e.DO_NOTHING];
  const r = async (u = e.DO_NOT_START_SDK, s) => {
    await t.test(u, s);
  };
  H.appTest = r;
  const i = () => t.current;
  H.appTestCurrent = i;
  const n = (u) => (t.current & u) == u;
  return H.isUnitTest = n, H;
}
var pu;
function ec() {
  if (pu) return tt;
  pu = 1, Object.defineProperty(tt, "__esModule", { value: !0 }), tt.AppBuilderImplementation = void 0;
  const e = Ks(), t = Ui(), r = Or(), i = Xs();
  class n extends e.AppBuilder {
    constructor() {
      super(...arguments), this.envData = {
        unitTest: i.UnitTest.DO_NOTHING
      }, this.host = t.DEFAULT_HOST, this.automaticDataCollectionEnabled = !0, this.credential = new r.DefaultCredential(), this.middlewares = [], this.services = [], this.commands = [];
    }
    get env() {
      return this.envData;
    }
    useHost(s) {
      return this.host = s ?? t.DEFAULT_HOST, this;
    }
    useAutomaticDataCollectionEnabled(s) {
      if (s == null)
        throw new Error("useAutomaticDataCollectionEnabled, value is undefined|null");
      return this.automaticDataCollectionEnabled = s, this;
    }
    useCredential(s) {
      if (s == null)
        throw new Error("useCredential, credential is undefined|null");
      return this.credential = s, this;
    }
    registerMiddleware(s) {
      if (s == null)
        throw new Error("addMiddleware, middleware is undefined|null");
      return this.middlewares.push(s), this;
    }
    registerService(s, o) {
      if (s == null)
        throw new Error("registerService, type is undefined|null");
      if (o == null)
        throw new Error("registerService, factory is undefined|null");
      return this.services.push([s, o]), this;
    }
    registerCommand(s, o) {
      if (s == null)
        throw new Error("registerCommand, messageType is undefined|null");
      if (o == null)
        throw new Error("registerCommand, commandFactory is undefined|null");
      return this.commands.push([s, o]), this;
    }
  }
  return tt.AppBuilderImplementation = n, tt;
}
var me = {}, _u;
function tc() {
  if (_u) return me;
  _u = 1, Object.defineProperty(me, "__esModule", { value: !0 }), me.Registry = me.RegistryItem = void 0;
  class e {
  }
  class t extends e {
    constructor(s, o = !1) {
      super(), this.provider = s, this.providerOnce = o, this.provided = !1;
    }
    provide() {
      return this.providerOnce && this.provided ? this.instance : (this.provided = !0, this.instance = this.provider(), this.instance);
    }
  }
  class r extends e {
    constructor(s) {
      super(), this.value = s;
    }
    provide() {
      return this.value;
    }
  }
  class i {
    constructor(s, o) {
      this.registry = s, this.type = o;
    }
    /**
     * As value method.
     * @param value
     */
    asValue(s) {
      this.registry.set(this.type, new r(s));
    }
    /**
     * As provider method.
     * @param provider
     * @param oneTime
     */
    asProvider(s, o = !1) {
      this.registry.set(this.type, new t(s, o));
    }
    /**
     * As factory method.
     * @param provider
     */
    asFactory(s) {
      this.registry.set(this.type, new t(s, !1));
    }
    /**
     * As singleton method.
     * @param provider
     */
    asSingleton(s) {
      this.registry.set(this.type, new t(s, !0));
    }
  }
  me.RegistryItem = i;
  class n {
    constructor() {
      this.services = /* @__PURE__ */ new Map();
    }
    /**
     * Map method.
     * @param type
     */
    map(s) {
      return new i(this.services, s);
    }
    /**
     * Set method.
     * @param type
     * @param provider
     */
    set(s, o) {
      this.services.set(s, o);
    }
    /**
     * Get method.
     * @param type
     */
    get(s) {
      const o = this.services.get(s);
      if (o !== void 0)
        return o.provide();
    }
  }
  return me.Registry = n, me;
}
var ut = {}, te = {}, mu;
function qr() {
  if (mu) return te;
  mu = 1, Object.defineProperty(te, "__esModule", { value: !0 }), te.CommandService = te.Command = te.CommandHandler = void 0;
  const e = G();
  class t {
    constructor(u) {
      this.context = u;
    }
    resolve(u) {
      return this.context.resolve(u);
    }
  }
  te.CommandHandler = t;
  class r {
  }
  te.Command = r;
  class i extends e.Service {
    constructor() {
      super(...arguments), this._registry = /* @__PURE__ */ new Map(), this._lastPromise = Promise.resolve();
    }
    register(u, s) {
      this._registry.set(u, s);
    }
    async execute(u) {
      const s = this._registry.get(u.constructor);
      if (s) {
        const o = s(this.context);
        await this._lastPromise, this._lastPromise = o.execute(u), await this._lastPromise;
      } else
        throw new Error(`Command not found for message type ${u.constructor.name}`);
    }
  }
  return te.CommandService = i, te;
}
var bu;
function Ys() {
  if (bu) return ut;
  bu = 1, Object.defineProperty(ut, "__esModule", { value: !0 }), ut.Context = void 0;
  const e = qr();
  class t {
    constructor(i, n, u) {
      this.registry = i, this.lifetime = n, this.app = u;
    }
    /**
     * Resolve a service from the context.
     * @param type of the service
     */
    resolve(i) {
      return this.registry.get(i);
    }
    /**
     * Execute a command.
     * @param command to execute
     */
    async execute(i) {
      await this.resolve(e.CommandService).execute(i);
    }
  }
  return ut.Context = t, ut;
}
var re = {}, gu;
function Ii() {
  if (gu) return re;
  gu = 1, Object.defineProperty(re, "__esModule", { value: !0 }), re.disposable = re.DisposableContainer = re.Lifetime = void 0;
  class e {
    constructor(n) {
      this.container = n;
    }
    /**
     * Define a new nested disposable to this lifetime.
     */
    defineNested() {
      return this.container.defineNested();
    }
    /**
     * Shows whether this lifetime is disposed.
     */
    get isDisposed() {
      return this.container.isDisposed;
    }
    /**
     * Adds a disposable to this lifetime.
     */
    add(n) {
      return this.container.add(n), this;
    }
    /**
     * Adds a callback to this lifetime.
     */
    addCallback(n, u) {
      return this.container.addCallback(n, u), this;
    }
  }
  re.Lifetime = e;
  class t {
    constructor() {
      this._disposables = [], this._isDisposed = !1;
    }
    /**
     * Gets whether this container is disposed.
     */
    get isDisposed() {
      return this._isDisposed;
    }
    /**
     * Define new lifetime.
     */
    get lifetime() {
      var n;
      return (n = this._lifetime) !== null && n !== void 0 ? n : this._lifetime = new e(this);
    }
    /**
     * Adds a disposable to this container.
     * @param disposable The disposable to add.
     * @returns The disposable container.
     */
    add(n) {
      return this._throwIfDisposed("Cannot add disposable to disposed container."), this._disposables.push(n), n;
    }
    /**
     * Adds a callback to be executed when this container is disposed.
     * @param callback The callback to execute.
     * @param target The target to bind the callback to.
     * @returns The disposable container.
     */
    addCallback(n, u) {
      return this._throwIfDisposed("Cannot add callback to disposed container."), this.add({
        dispose() {
          n.call(u);
        }
      });
    }
    /**
     * Defines a nested disposable container.
     */
    defineNested() {
      this._throwIfDisposed("Cannot define nested disposable for disposed container.");
      const n = new t();
      return this._disposables.push(n), n.addCallback(() => {
        const u = this._disposables.indexOf(n);
        u > -1 && this._disposables.splice(u, 1);
      }, this), n;
    }
    /**
     * Disposes all disposables in this container. Last added, first disposed.
     */
    dispose() {
      this._isDisposed || (this._isDisposed = !0, this._disposables.slice().reverse().forEach((n) => {
        n.dispose();
      }), this._disposables = []);
    }
    /**
     * Throws an error if this container is disposed.
     */
    _throwIfDisposed(n) {
      if (this._isDisposed)
        throw new Error("Object disposed, but you try to use it: " + n);
    }
  }
  re.DisposableContainer = t;
  function r(i, n) {
    return new t().addCallback(() => {
      i.call(n);
    });
  }
  return re.disposable = r, re;
}
var nt = {}, vu;
function rc() {
  if (vu) return nt;
  vu = 1, Object.defineProperty(nt, "__esModule", { value: !0 }), nt.CredentialService = void 0;
  const e = G();
  class t extends e.Service {
    constructor() {
      super(...arguments), this._credentialDispose = void 0, this._credential = void 0;
    }
    get credential() {
      return this._credential;
    }
    useCredential(i) {
      i !== this._credential && (this._credentialDispose !== void 0 && this._credentialDispose.dispose(), this._credentialDispose = this.lifetime.defineNested(), this._credential = i, i.onRegister(this._credentialDispose.lifetime, this.context));
    }
  }
  return nt.CredentialService = t, nt;
}
var st = {}, wu;
function eo() {
  if (wu) return st;
  wu = 1, Object.defineProperty(st, "__esModule", { value: !0 }), st.DataIslandApp = void 0;
  class e {
  }
  return st.DataIslandApp = e, st;
}
var ot = {}, at = {}, yu;
function ic() {
  if (yu) return at;
  yu = 1, Object.defineProperty(at, "__esModule", { value: !0 }), at.RequestBuilder = void 0;
  class e {
    constructor(r, i) {
      this._url = r, this._request = i, this._headers = {}, this._searchParams = new URLSearchParams();
    }
    header(r, i) {
      return this._headers[r] = i, this;
    }
    headers(r) {
      return r === void 0 ? this : (r instanceof Headers ? r.forEach((i, n) => {
        this._headers[n] = i;
      }) : Object.entries(r).forEach(([i, n]) => {
        this._headers[i] = n;
      }), this);
    }
    searchParam(r, i) {
      return i !== void 0 && this._searchParams.set(r, i), this;
    }
    searchParams(r) {
      return r === void 0 ? this : (r.forEach((i, n) => {
        this._searchParams.set(n, i);
      }), this);
    }
    async sendPostFormData(r) {
      const i = this._url;
      i.search = this._searchParams.toString();
      const n = new Request(i, {
        method: "POST",
        headers: this._headers,
        body: r
      }), u = n;
      return u.discardContentType = !0, await this._request(n);
    }
    async sendPostJson(r) {
      const i = this._url;
      i.search = this._searchParams.toString();
      let n;
      r != null && typeof r == "object" && (n = JSON.stringify(r));
      const u = new Request(i, {
        method: "POST",
        headers: this._headers,
        body: n
      });
      return await this._request(u);
    }
    async sendGet() {
      const r = this._url;
      return r.search = this._searchParams.toString(), await this._request(new Request(r, {
        method: "GET",
        headers: this._headers
      }));
    }
    async sendDelete() {
      const r = this._url;
      return r.search = this._searchParams.toString(), await this._request(new Request(r, {
        method: "DELETE",
        headers: this._headers
      }));
    }
    async sendDeleteJson(r) {
      const i = this._url;
      i.search = this._searchParams.toString();
      let n;
      return r != null && typeof r == "object" && (n = JSON.stringify(r)), await this._request(new Request(i, {
        method: "DELETE",
        headers: this._headers,
        body: n
      }));
    }
    async sendPutJson(r) {
      const i = this._url;
      i.search = this._searchParams.toString();
      let n;
      return r != null && (typeof r == "object" || Array.isArray(r)) && (n = JSON.stringify(r)), await this._request(new Request(i, {
        method: "PUT",
        headers: this._headers,
        body: n
      }));
    }
    async sendPutFormData(r) {
      const i = this._url;
      i.search = this._searchParams.toString();
      const n = new Request(i, {
        method: "PUT",
        headers: this._headers,
        body: r
      }), u = n;
      return u.discardContentType = !0, await this._request(n);
    }
  }
  return at.RequestBuilder = e, at;
}
var xu;
function A() {
  if (xu) return ot;
  xu = 1, Object.defineProperty(ot, "__esModule", { value: !0 }), ot.RpcService = void 0;
  const e = G(), t = Pi(), r = ic();
  class i extends e.Service {
    constructor(u, s, o) {
      super(u), this.host = s, this.options = o, u.onRegister = async () => {
        var a;
        (a = u.resolve(t.MiddlewareService)) === null || a === void 0 || a.useMiddleware((c, l) => (c.headers.has("accept") || c.headers.set("accept", "text/plain"), c.discardContentType ? delete c.discardContentType : c.headers.set("content-type", "application/json"), l(c)));
      };
    }
    /**
     * Request method.
     */
    async request(u) {
      var s, o, a;
      const c = this.resolve(t.MiddlewareService);
      return c !== void 0 ? await c.process(u, async (l) => {
        var d, f, h;
        return (h = await ((f = (d = this.options) === null || d === void 0 ? void 0 : d.fetchMethod) === null || f === void 0 ? void 0 : f.call(d, l))) !== null && h !== void 0 ? h : await fetch(l);
      }) : (a = await ((o = (s = this.options) === null || s === void 0 ? void 0 : s.fetchMethod) === null || o === void 0 ? void 0 : o.call(s, u))) !== null && a !== void 0 ? a : await fetch(u);
    }
    /**
     * Build URL.
     * @param path
     */
    buildUrl(u) {
      return this.options !== void 0 && this.options.urlBuilder !== void 0 ? this.options.urlBuilder(u) : this.host.endsWith("/") && u.startsWith("/") ? new URL(`${this.host}${u.slice(1)}`) : !this.host.endsWith("/") && !u.startsWith("/") ? new URL(`${this.host}/${u}`) : new URL(`${this.host}${u}`);
    }
    /**
     * Create a request builder.
     * @param path
     */
    requestBuilder(u) {
      return new r.RequestBuilder(this.buildUrl(u), this.request.bind(this));
    }
    /**
     * Send a GET request.
     * @param path
     * @param options
     */
    async get(u, s) {
      return this.requestBuilder(u).searchParams(s == null ? void 0 : s.searchParams).headers(s == null ? void 0 : s.headers).sendGet();
    }
    /**
     * Send a POST request.
     * @param path
     * @param body JSON object
     * @param options
     */
    async post(u, s, o) {
      return this.requestBuilder(u).searchParams(o == null ? void 0 : o.searchParams).headers(o == null ? void 0 : o.headers).sendPostJson(s);
    }
    /**
     * Send a PUT request.
     * @param path
     * @param body JSON object
     * @param options
     */
    async put(u, s, o) {
      return this.requestBuilder(u).searchParams(o == null ? void 0 : o.searchParams).headers(o == null ? void 0 : o.headers).sendPutJson(s);
    }
    /**
     * Send a DELETE request.
     * @param path
     * @param options
     */
    async delete(u, s) {
      return this.requestBuilder(u).searchParams(s == null ? void 0 : s.searchParams).headers(s == null ? void 0 : s.headers).sendDelete();
    }
  }
  return ot.RpcService = i, ot;
}
var be = {}, ct = {}, lt = {}, dt = {}, ge = {}, ft = {}, Eu;
function T() {
  if (Eu) return ft;
  Eu = 1, Object.defineProperty(ft, "__esModule", { value: !0 }), ft.EventDispatcher = void 0;
  const e = Ii();
  class t {
    constructor() {
      this._listeners = [];
    }
    dispatch(i) {
      this._listeners.slice().forEach((n) => {
        const u = {
          type: i.type,
          data: i.data,
          unsubscribe: () => {
            n.disposable.dispose();
          }
        };
        n.callback(u);
      });
    }
    subscribe(i, n) {
      const u = new e.DisposableContainer();
      if (n !== void 0) {
        const o = i, c = {
          callback: (l) => {
            l.type === n && o(l);
          },
          disposable: u
        };
        return u.addCallback(() => {
          this._listeners = this._listeners.filter((l) => l !== c);
        }, this), this._listeners.push(c), u;
      }
      const s = {
        callback: i,
        disposable: u
      };
      return u.addCallback(() => {
        this._listeners = this._listeners.filter((o) => o !== s);
      }, this), this._listeners.push(s), u;
    }
  }
  return ft.EventDispatcher = t, ft;
}
var ku;
function xr() {
  if (ku) return ge;
  ku = 1, Object.defineProperty(ge, "__esModule", { value: !0 }), ge.Organizations = ge.OrganizationsEvent = void 0;
  const e = T();
  var t;
  (function(i) {
    i.ADDED = "added", i.REMOVED = "removed", i.CURRENT_CHANGED = "currentChanged";
  })(t || (ge.OrganizationsEvent = t = {}));
  class r extends e.EventDispatcher {
  }
  return ge.Organizations = r, ge;
}
var ht = {}, pt = {}, ve = {}, Cu;
function hi() {
  if (Cu) return ve;
  Cu = 1, Object.defineProperty(ve, "__esModule", { value: !0 }), ve.Workspaces = ve.WorkspacesEvent = void 0;
  const e = T();
  var t;
  (function(i) {
    i.ADDED = "added", i.REMOVED = "removed";
  })(t || (ve.WorkspacesEvent = t = {}));
  class r extends e.EventDispatcher {
  }
  return ve.Workspaces = r, ve;
}
var _t = {}, we = {}, Au;
function to() {
  if (Au) return we;
  Au = 1, Object.defineProperty(we, "__esModule", { value: !0 }), we.Workspace = we.WorkspaceEvent = void 0;
  const e = T();
  var t;
  (function(i) {
    i.CHANGED = "changed";
  })(t || (we.WorkspaceEvent = t = {}));
  class r extends e.EventDispatcher {
  }
  return we.Workspace = r, we;
}
var mt = {}, ie = {}, Fu;
function ro() {
  if (Fu) return ie;
  Fu = 1, Object.defineProperty(ie, "__esModule", { value: !0 }), ie.ResourceType = ie.MetadataDto = ie.FileProcessingStage = void 0;
  var e;
  (function(i) {
    i[i.None = 0] = "None", i[i.WAITING_CONVERTING = 10] = "WAITING_CONVERTING", i[i.CONVERTING = 11] = "CONVERTING", i[i.WAITING_PROCESSING = 20] = "WAITING_PROCESSING", i[i.PROCESSING = 21] = "PROCESSING", i[i.ERROR = 99] = "ERROR", i[i.DONE = 100] = "DONE";
  })(e || (ie.FileProcessingStage = e = {}));
  class t {
    constructor(n, u) {
      this.key = n, this.value = u;
    }
  }
  ie.MetadataDto = t;
  var r;
  return function(i) {
    i[i.None = 0] = "None", i[i.Organization = 1] = "Organization", i[i.Workspace = 2] = "Workspace", i[i.Chat = 3] = "Chat", i[i.Group = 4] = "Group", i[i.User = 5] = "User", i[i.File = 6] = "File";
  }(r || (ie.ResourceType = r = {})), ie;
}
var bt = {}, gt = {}, Du;
function D() {
  if (Du) return gt;
  Du = 1, Object.defineProperty(gt, "__esModule", { value: !0 }), gt.ResponseUtils = void 0;
  class e {
    static isOk(r) {
      return r != null && r.ok;
    }
    static isFail(r) {
      return !e.isOk(r);
    }
    static async isLimitReached(r) {
      return (r == null ? void 0 : r.status) == 15 && (await (r == null ? void 0 : r.json())).code == 15;
    }
    static async throwError(r, i) {
      var n;
      if (i === void 0)
        throw new Error(`${r}. Response is undefined`);
      if (i === null)
        throw new Error(`${r}. Response is null`);
      let u = "";
      if (i)
        try {
          u = (n = await i.text()) !== null && n !== void 0 ? n : "";
        } catch (s) {
          console.error(s);
        }
      throw new Error(`${r}. Response fail. Status: ${i == null ? void 0 : i.status},${i == null ? void 0 : i.statusText}, body: ${u}`);
    }
  }
  return gt.ResponseUtils = e, gt;
}
var vt = {}, Su;
function pi() {
  if (Su) return vt;
  Su = 1, Object.defineProperty(vt, "__esModule", { value: !0 }), vt.File = void 0;
  const e = T();
  class t extends e.EventDispatcher {
  }
  return vt.File = t, vt;
}
var ye = {}, Ru;
function Er() {
  if (Ru) return ye;
  Ru = 1, Object.defineProperty(ye, "__esModule", { value: !0 }), ye.Files = ye.FilesEvent = void 0;
  const e = T();
  var t;
  (function(i) {
    i.ADDED = "added", i.REMOVED = "removed", i.UPDATED = "updated";
  })(t || (ye.FilesEvent = t = {}));
  class r extends e.EventDispatcher {
  }
  return ye.Files = r, ye;
}
var Pu;
function Oi() {
  if (Pu) return bt;
  Pu = 1, Object.defineProperty(bt, "__esModule", { value: !0 }), bt.FileImpl = void 0;
  const e = A(), t = D(), r = pi(), i = Er();
  class n extends r.File {
    constructor(s) {
      super(), this.context = s, this._isDisposed = !1;
    }
    async initFrom(s) {
      return this._content = s, this;
    }
    get isDisposed() {
      return this._isDisposed;
    }
    dispose() {
      this._isDisposed = !0;
    }
    get id() {
      var s;
      return (s = this._content) === null || s === void 0 ? void 0 : s.id;
    }
    get name() {
      var s;
      return (s = this._content) === null || s === void 0 ? void 0 : s.name;
    }
    get description() {
      var s;
      return (s = this._content) === null || s === void 0 ? void 0 : s.description;
    }
    get metadata() {
      var s;
      const o = (s = this._content) === null || s === void 0 ? void 0 : s.fileMetadata;
      return o == null ? [] : JSON.parse(o);
    }
    get createdAt() {
      var s;
      return (s = this._content) === null || s === void 0 ? void 0 : s.createdAt;
    }
    get modifiedAt() {
      var s;
      return (s = this._content) === null || s === void 0 ? void 0 : s.modifiedAt;
    }
    get url() {
      var s;
      return (s = this._content) === null || s === void 0 ? void 0 : s.url;
    }
    get previewUrl() {
      var s;
      return (s = this._content) === null || s === void 0 ? void 0 : s.previewUrl;
    }
    get status() {
      var s;
      return (s = this._content) === null || s === void 0 ? void 0 : s.stage;
    }
    get progress() {
      return this._progress;
    }
    updateStatus(s) {
      this._content && (this._progress = s, this._content.stage = this._progress.stage, this.dispatch({
        type: i.FilesEvent.UPDATED,
        data: this
      }));
    }
    async update(s, o, a) {
      var c;
      if (!this._content)
        throw new Error("File is not loaded.");
      if (s === void 0 || o === void 0 || s === null || o === null)
        throw new Error("File update, one of parameters is undefined or null");
      const l = JSON.stringify(o), d = await ((c = this.context.resolve(e.RpcService)) === null || c === void 0 ? void 0 : c.requestBuilder("api/v1/Files").sendPutJson({
        fileId: this.id,
        name: s,
        description: a ?? this.description,
        metadata: l
      }));
      t.ResponseUtils.isFail(d) && await t.ResponseUtils.throwError("Failed to update file", d), this._content = (await d.json()).file, this.dispatch({
        type: i.FilesEvent.UPDATED,
        data: this
      });
    }
  }
  return bt.FileImpl = n, bt;
}
var wt = {}, yt = {}, Iu;
function io() {
  if (Iu) return yt;
  Iu = 1, Object.defineProperty(yt, "__esModule", { value: !0 }), yt.FilesPage = void 0;
  class e {
  }
  return yt.FilesPage = e, yt;
}
var Ou;
function uc() {
  if (Ou) return wt;
  Ou = 1, Object.defineProperty(wt, "__esModule", { value: !0 }), wt.FilesPageImpl = void 0;
  const e = io();
  class t extends e.FilesPage {
    constructor() {
      super(...arguments), this._isDisposed = !1, this.files = [], this.total = 0, this.filesPerPage = 0, this.page = 0;
    }
    get pages() {
      return Math.ceil(Math.max(this.total / this.filesPerPage, 1));
    }
    get isDisposed() {
      return this._isDisposed;
    }
    dispose() {
      this._isDisposed = !0;
    }
    equals(i) {
      return i === void 0 || i === null ? !1 : i === this ? !0 : i.pages === this.pages && i.total === this.total && i.page === this.page && (i.files === this.files || i.files.every((n, u) => n.id === this.files[u].id));
    }
  }
  return wt.FilesPageImpl = t, wt;
}
var qu;
function nc() {
  if (qu) return mt;
  qu = 1, Object.defineProperty(mt, "__esModule", { value: !0 }), mt.FilesImpl = void 0;
  const e = ro(), t = A(), r = Oi(), i = Er(), n = D(), u = uc();
  class s extends i.Files {
    constructor(a, c) {
      super(), this.workspace = a, this.context = c, this._fetchList = [];
    }
    async upload(a) {
      const c = [];
      for (const l of a) {
        const d = await this.internalUpload(l);
        d != null && c.push(d);
      }
      return c;
    }
    async get(a) {
      return await this.internalGetFile(a);
    }
    async delete(a) {
      await this.internalDeleteFiles(a);
    }
    async query(a, c, l) {
      return await this.internalQuery(a, c, l);
    }
    //----------------------------------------------------------------------------
    // INTERNALS
    //----------------------------------------------------------------------------
    async internalFetchQuery() {
      var a, c, l;
      const d = await ((a = this.context.resolve(t.RpcService)) === null || a === void 0 ? void 0 : a.requestBuilder("api/v1/Files/fetch/batch").searchParam("organizationId", this.workspace.organization.id).searchParam("fileIds", this._fetchList.join(",")).sendGet());
      n.ResponseUtils.isFail(d) && await n.ResponseUtils.throwError(`Failed to fetch files for org ${this.workspace.organization.id} and workspace ${this.workspace.id}`, d);
      const f = await d.json();
      for (const h of f.progress) {
        const p = (l = (c = this.filesList) === null || c === void 0 ? void 0 : c.files) === null || l === void 0 ? void 0 : l.find((_) => _.id == h.file_id);
        if (p && (p.updateStatus(h), p.status > e.FileProcessingStage.PROCESSING)) {
          const _ = this._fetchList.indexOf(p.id);
          this._fetchList.splice(_, 1);
        }
      }
      this._fetchList.length != 0 && setTimeout(async () => await this.internalFetchQuery(), 2e3);
    }
    async internalGetFile(a) {
      var c;
      if (a == null)
        throw new Error("File get, id is undefined or null");
      if (a.length === 0 || a.trim().length === 0)
        throw new Error("File get, id is empty");
      const l = await ((c = this.context.resolve(t.RpcService)) === null || c === void 0 ? void 0 : c.requestBuilder("api/v1/Files").searchParam("id", a).sendGet());
      n.ResponseUtils.isFail(l) && await n.ResponseUtils.throwError(`Failed to get file ${a}`, l);
      const d = (await l.json()).file;
      return await new r.FileImpl(this.context).initFrom(d);
    }
    /**
     * Delete file.
     * @param ids array of file ids
     */
    async internalDeleteFiles(a) {
      var c;
      if (a == null)
        throw new Error("File delete, ids array is undefined or null");
      if (a.length === 0)
        throw new Error("File delete, array of ids is empty");
      const l = await ((c = this.context.resolve(t.RpcService)) === null || c === void 0 ? void 0 : c.requestBuilder("api/v1/Files").searchParam("fileIds", a.toString()).sendDelete());
      n.ResponseUtils.isFail(l) && await n.ResponseUtils.throwError(`Files ${a} delete, failed`, l);
      for (const d of a) {
        const f = this.filesList.files.find((p) => p.id === d), h = this.filesList.files.indexOf(f);
        if (h < 0)
          throw new Error("File delete, index is not found");
        this.filesList.files.splice(h, 1), this.dispatch({
          type: i.FilesEvent.REMOVED,
          data: f
        }), f.dispose();
      }
    }
    async internalQuery(a, c, l) {
      var d;
      if (c == null)
        throw new Error("File fetch, page is undefined or null");
      if (c < 0)
        throw new Error("File fetch, page is negative");
      if (l == null)
        throw new Error("File fetch, limit is undefined or null");
      if (l === 0)
        throw new Error("File fetch, limit is 0");
      const f = await ((d = this.context.resolve(t.RpcService)) === null || d === void 0 ? void 0 : d.requestBuilder("api/v1/Files/list").searchParam("workspaceId", this.workspace.id).searchParam("organizationId", this.workspace.organization.id).searchParam("query", a).searchParam("page", c.toString()).searchParam("limit", l.toString()).sendGet());
      n.ResponseUtils.isFail(f) && await n.ResponseUtils.throwError(`Files fetch query:${a}, page:${c}, limit:${l}, failed`, f), this._fetchList = [];
      const h = await f.json(), p = new u.FilesPageImpl();
      p.total = h.totalFilesCount, p.filesPerPage = h.filesPerPage, p.page = c;
      for (const _ of h.files) {
        const m = await new r.FileImpl(this.context).initFrom(_);
        p.files.push(m), m.status <= e.FileProcessingStage.PROCESSING && this._fetchList.push(m.id);
      }
      return this.filesList = p, this._fetchList.length != 0 && setTimeout(async () => await this.internalFetchQuery(), 2e3), p;
    }
    async internalUpload(a) {
      var c;
      if (a == null)
        throw new Error("File upload, file is undefined or null");
      const l = new FormData();
      l.append("organizationId", this.workspace.organization.id), l.append("workspaceId", this.workspace.id), l.append("name", a.name), l.append("file", a, a.name);
      const d = await ((c = this.context.resolve(t.RpcService)) === null || c === void 0 ? void 0 : c.requestBuilder("api/v1/Files").sendPostFormData(l));
      if (n.ResponseUtils.isFail(d)) {
        if (await n.ResponseUtils.isLimitReached())
          return;
        await n.ResponseUtils.throwError(`File upload ${a.name}`, d);
      }
      const f = (await d.json()).file, h = new r.FileImpl(this.context);
      return await h.initFrom(f), this.dispatch({
        type: i.FilesEvent.ADDED,
        data: h
      }), h;
    }
  }
  return mt.FilesImpl = s, mt;
}
var zu;
function sc() {
  if (zu) return _t;
  zu = 1, Object.defineProperty(_t, "__esModule", { value: !0 }), _t.WorkspaceImpl = void 0;
  const e = to(), t = A(), r = nc(), i = D();
  class n extends e.Workspace {
    constructor(s, o) {
      super(), this.organization = s, this.context = o, this._isMarkAsDeleted = !1, this._files = new r.FilesImpl(this, o);
    }
    get id() {
      if (this._workspace)
        return this._workspace.id;
      throw new Error("Workspace is not loaded.");
    }
    get name() {
      if (this._workspace)
        return this._workspace.profile.name;
      throw new Error("Workspace is not loaded.");
    }
    get description() {
      if (this._workspace)
        return this._workspace.profile.description;
      throw new Error("Workspace is not loaded.");
    }
    get isShared() {
      if (this._workspace)
        return this._workspace.profile.isShared;
      throw new Error("Workspace is not loaded.");
    }
    get files() {
      return this._files;
    }
    async filesCount() {
      var s;
      const o = await ((s = this.context.resolve(t.RpcService)) === null || s === void 0 ? void 0 : s.requestBuilder("api/v1/Workspaces/files/count").searchParam("workspaceId", this.id).searchParam("organizationId", this.organization.id).sendGet());
      return i.ResponseUtils.isFail(o) && await i.ResponseUtils.throwError(`Failed during get workspace total files count for ${this.id} of ${this.organization.id}`, o), (await o.json()).count;
    }
    async change(s, o) {
      var a;
      if (!this._workspace)
        throw new Error("Workspace is not loaded.");
      if (this._isMarkAsDeleted)
        throw new Error("Workspace is marked as deleted.");
      if (s === this.name && o === this.description)
        return Promise.resolve();
      if (s == null || s.trim() === "")
        throw new Error("Name is required. Please provide a valid name.");
      o == null && (o = "");
      const c = await ((a = this.context.resolve(t.RpcService)) === null || a === void 0 ? void 0 : a.requestBuilder("api/v1/Workspaces").sendPutJson({
        workspaceId: this.id,
        profile: {
          name: s,
          description: o
        }
      }));
      i.ResponseUtils.isFail(c) && await i.ResponseUtils.throwError("Failed to change workspace", c), this._workspace && (this._workspace.profile.name = s, this._workspace.profile.description = o), this.dispatch({
        type: e.WorkspaceEvent.CHANGED,
        data: this
      });
    }
    async share(s) {
      var o;
      if (!this._workspace)
        throw new Error("Workspace is not loaded.");
      if (this._isMarkAsDeleted)
        throw new Error("Workspace is marked as deleted.");
      if (s === this.isShared)
        return Promise.resolve();
      if (s == null)
        throw new Error("Is shared parameter is required.");
      const a = await ((o = this.context.resolve(t.RpcService)) === null || o === void 0 ? void 0 : o.requestBuilder("api/v1/workspaces/library").sendPutJson({
        workspaceId: this.id,
        isShared: s
      }));
      i.ResponseUtils.isFail(a) && await i.ResponseUtils.throwError("Failed to change workspace shared state", a), this._workspace && (this._workspace.profile.isShared = s), this.dispatch({
        type: e.WorkspaceEvent.CHANGED,
        data: this
      });
    }
    async initFrom(s) {
      this._workspace = s;
    }
    get isMarkAsDeleted() {
      return this._isMarkAsDeleted;
    }
    markToDelete() {
      this._isMarkAsDeleted = !0;
    }
  }
  return _t.WorkspaceImpl = n, _t;
}
var Uu;
function oc() {
  if (Uu) return pt;
  Uu = 1, Object.defineProperty(pt, "__esModule", { value: !0 }), pt.WorkspacesImpl = void 0;
  const e = hi(), t = sc(), r = A(), i = D(), n = cr();
  class u extends e.Workspaces {
    constructor(o, a) {
      super(), this.organization = o, this.context = a, this._workspaces = [];
    }
    get collection() {
      return this._workspaces;
    }
    get(o) {
      return this.tryGet(o);
    }
    tryGet(o) {
      return this._workspaces.find((a) => a.id === o);
    }
    contains(o) {
      return this._workspaces.find((a) => a.id === o) !== void 0;
    }
    /**
     * Create workspace.
     * @param name
     * @param description
     * @param regulation
     */
    async create(o, a, c) {
      var l;
      if (o == null || o.trim() === "")
        throw new Error("Name is required, must be not empty");
      if (a == null || a.trim() === "")
        throw new Error("Description is required, must be not empty");
      if (c && (c.isCreateNewGroup === void 0 || c.isCreateNewGroup === null))
        throw new Error("isCreateNewGroup is required, must be not empty");
      const d = await ((l = this.context.resolve(r.RpcService)) === null || l === void 0 ? void 0 : l.requestBuilder("api/v1/Workspaces").sendPostJson({
        organizationId: this.organization.id,
        profile: {
          name: o,
          description: a
        },
        regulation: {
          isCreateNewGroup: c == null ? void 0 : c.isCreateNewGroup,
          newGroupName: c == null ? void 0 : c.newGroupName,
          groupIds: c == null ? void 0 : c.groupIds
        }
      }));
      if (i.ResponseUtils.isFail(d)) {
        if (await i.ResponseUtils.isLimitReached())
          return;
        await i.ResponseUtils.throwError(`Failed to create workspace, in organization: ${this.organization.id}`, d);
      }
      const f = (await d.json()).workspace, h = new t.WorkspaceImpl(this.organization, this.context);
      return await h.initFrom(f), this._workspaces.push(h), await this.organization.accessGroups.reload(), this.dispatch({
        type: e.WorkspacesEvent.ADDED,
        data: h
      }), h;
    }
    /**
     * Delete workspace.
     * @param id
     */
    async delete(o) {
      var a;
      const c = this.tryGet(o);
      if (!c)
        throw new Error(`Workspace ${o} is not found`);
      if (c.isMarkAsDeleted)
        throw new Error(`Workspace ${o} is already marked as deleted, in organization: ${this.organization.id}`);
      c.markToDelete();
      const l = await ((a = this.context.resolve(r.RpcService)) === null || a === void 0 ? void 0 : a.requestBuilder("api/v1/Workspaces").searchParam("id", o).sendDelete());
      i.ResponseUtils.isFail(l) && await i.ResponseUtils.throwError(`Failed to delete workspace: ${c.organization.name}/${c.name}:${o}, in organization: ${this.organization.id}`, l);
      const d = this._workspaces.indexOf(c);
      if (d < 0)
        throw new Error(`Workspace ${o} is not found`);
      this._workspaces.splice(d, 1), this.dispatch({
        type: e.WorkspacesEvent.REMOVED,
        data: c
      });
    }
    async initFrom(o) {
      var a, c;
      const l = await ((a = this.context.resolve(r.RpcService)) === null || a === void 0 ? void 0 : a.requestBuilder("api/v1/Organizations").searchParam("id", o).sendGet());
      if (i.ResponseUtils.isFail(l)) {
        const f = (c = this.context.resolve(n.UserProfileService)) === null || c === void 0 ? void 0 : c.userProfile;
        await i.ResponseUtils.throwError(`Failed to fetch workspaces in organization: ${o}, userId: ${f.id}, email: ${f.email}`, l);
      }
      const d = (await l.json()).workspaces;
      for (const f of d) {
        const h = new t.WorkspaceImpl(this.organization, this.context);
        await h.initFrom(f), this._workspaces.push(h), this.dispatch({
          type: e.WorkspacesEvent.ADDED,
          data: h
        });
      }
    }
  }
  return pt.WorkspacesImpl = u, pt;
}
var xe = {}, $u;
function uo() {
  if ($u) return xe;
  $u = 1, Object.defineProperty(xe, "__esModule", { value: !0 }), xe.Organization = xe.OrganizationEvent = void 0;
  const e = T();
  var t;
  (function(i) {
    i.CHANGED = "changed";
  })(t || (xe.OrganizationEvent = t = {}));
  class r extends e.EventDispatcher {
    /**
     * Fire changed event.
     */
    fireChanged() {
      this.dispatch({
        type: t.CHANGED,
        data: this
      });
    }
  }
  return xe.Organization = r, xe;
}
var xt = {}, Ee = {}, Lu;
function no() {
  if (Lu) return Ee;
  Lu = 1, Object.defineProperty(Ee, "__esModule", { value: !0 }), Ee.Groups = Ee.GroupsEvent = void 0;
  const e = T();
  var t;
  (function(i) {
    i.ADDED = "added", i.REMOVED = "removed", i.UPDATED = "updated";
  })(t || (Ee.GroupsEvent = t = {}));
  class r extends e.EventDispatcher {
  }
  return Ee.Groups = r, Ee;
}
var Et = {}, ke = {}, Tu;
function so() {
  if (Tu) return ke;
  Tu = 1, Object.defineProperty(ke, "__esModule", { value: !0 }), ke.Group = ke.GroupEvent = void 0;
  const e = T();
  var t;
  (function(i) {
    i.UPDATED = "updated";
  })(t || (ke.GroupEvent = t = {}));
  class r extends e.EventDispatcher {
  }
  return ke.Group = r, ke;
}
var Mu;
function ac() {
  if (Mu) return Et;
  Mu = 1, Object.defineProperty(Et, "__esModule", { value: !0 }), Et.GroupImpl = void 0;
  const e = so(), t = A(), r = D();
  class i extends e.Group {
    constructor(u, s) {
      super(), this.context = u, this.organization = s, this._isDisposed = !1, this._workspaces = [];
    }
    async initFrom(u) {
      this._id = u;
      const s = this.reloadGroup(u), o = this.reloadWorkspaces(u);
      return await Promise.all([s, o]), this;
    }
    async reloadGroup(u) {
      var s;
      const o = await ((s = this.context.resolve(t.RpcService)) === null || s === void 0 ? void 0 : s.requestBuilder("api/v1/AccessGroups").searchParam("groupId", u).sendGet());
      r.ResponseUtils.isFail(o) && await r.ResponseUtils.throwError(`Failed to get group: ${u}, organization: ${this.organization.id}`, o);
      const a = await o.json();
      this._content = a.group, this._members = a.members;
    }
    async reloadWorkspaces(u) {
      const s = await this.loadWorkspaces(u);
      this._workspaces.length = 0, this._workspaces.push(...s);
    }
    async loadWorkspaces(u) {
      var s;
      const o = await ((s = this.context.resolve(t.RpcService)) === null || s === void 0 ? void 0 : s.requestBuilder("api/v1/AccessGroups/workspaces").searchParam("groupId", u).sendGet());
      r.ResponseUtils.isFail(o) && await r.ResponseUtils.throwError(`Failed to get workspaces for group: ${this.id}, organization: ${this.organization.id}`, o);
      const a = await o.json(), c = [];
      for (const l of a.workspaces)
        c.push(this.organization.workspaces.get(l.id));
      return c;
    }
    get id() {
      if (this._id)
        return this._id;
      throw new Error("Access group is not loaded.");
    }
    get group() {
      if (this._content)
        return this._content;
      throw new Error("Access group is not loaded.");
    }
    get workspaces() {
      return this._workspaces;
    }
    get members() {
      if (this._members)
        return this._members;
      throw new Error("Access group is not loaded.");
    }
    async setName(u) {
      var s;
      if (u == null)
        throw new Error("Groups change, name is undefined or null");
      if (u.length === 0 || u.trim().length === 0)
        throw new Error("Groups change, name is empty");
      const o = await ((s = this.context.resolve(t.RpcService)) === null || s === void 0 ? void 0 : s.requestBuilder("api/v1/AccessGroups/name").sendPutJson({
        groupId: this.id,
        name: u
      }));
      r.ResponseUtils.isFail(o) && await r.ResponseUtils.throwError(`Failed to change group name, group: ${this.id}, organization: ${this.organization.id}`, o), this._content && (this._content.name = u), this.dispatch({
        type: e.GroupEvent.UPDATED,
        data: this
      });
    }
    async setPermits(u) {
      var s;
      const o = await ((s = this.context.resolve(t.RpcService)) === null || s === void 0 ? void 0 : s.requestBuilder("api/v1/AccessGroups/permits").sendPutJson({
        groupId: this.id,
        permits: u
      }));
      r.ResponseUtils.isFail(o) && await r.ResponseUtils.throwError(`Failed to change group permits, group: ${this.id}, organization: ${this.organization.id}`, o);
    }
    async setWorkspaces(u) {
      var s;
      if (u == null)
        throw new Error("Group add workspaces, workspaces is undefined or null");
      const o = await ((s = this.context.resolve(t.RpcService)) === null || s === void 0 ? void 0 : s.requestBuilder("api/v1/AccessGroups/workspaces").sendPutJson({
        groupId: this.id,
        actualWorkspaceIds: u
      }));
      r.ResponseUtils.isFail(o) && await r.ResponseUtils.throwError(`Failed to set workspaces for group: ${this.id}, organization: ${this.organization.id}`, o), await this.reloadWorkspaces(this.id), this.dispatch({
        type: e.GroupEvent.UPDATED,
        data: this
      });
    }
    async removeWorkspaces(u) {
      if (u == null)
        throw new Error("Group removeWorkspaces, workspaces is undefined or null");
      const s = new Set(this.workspaces.map((o) => o.id));
      if (!u.every((o) => s.has(o))) {
        const o = u.filter((a) => !s.has(a));
        throw new Error(`Group removeWorkspaces, workspaces contains not existing workspaces: ${o}`);
      }
      for (const o of u)
        s.delete(o);
      await this.setWorkspaces(Array.from(s));
    }
    async setMembersIds(u) {
      var s;
      if (u == null)
        throw new Error("Group setMembersIds, members is undefined or null");
      const o = await ((s = this.context.resolve(t.RpcService)) === null || s === void 0 ? void 0 : s.requestBuilder("api/v1/AccessGroups/members").sendPutJson({
        groupId: this.id,
        memberIds: u
      }));
      r.ResponseUtils.isFail(o) && await r.ResponseUtils.throwError(`Failed to set members for group: ${this.id}, organization: ${this.organization.id}`, o), await this.reloadGroup(this.id), this.dispatch({
        type: e.GroupEvent.UPDATED,
        data: this
      });
    }
    async removeMembers(u) {
      if (u == null)
        throw new Error("Group removeMembers, members is undefined or null");
      const s = new Set(this.members.map((o) => o.id));
      if (!u.every((o) => s.has(o))) {
        const o = u.filter((a) => !s.has(a));
        throw new Error(`Group removeMembers, members contains not existing members: ${o}`);
      }
      for (const o of u)
        s.delete(o);
      await this.setMembersIds(Array.from(s));
    }
    get isDisposed() {
      return this._isDisposed;
    }
    dispose() {
      this._isDisposed = !0;
    }
  }
  return Et.GroupImpl = i, Et;
}
var ju;
function cc() {
  if (ju) return xt;
  ju = 1, Object.defineProperty(xt, "__esModule", { value: !0 }), xt.GroupsImpl = void 0;
  const e = A(), t = no(), r = D(), i = ac();
  class n extends t.Groups {
    constructor(s, o) {
      super(), this.organization = s, this.context = o, this._groups = [];
    }
    get collection() {
      return this._groups;
    }
    async initialize() {
      await this.internalInit();
    }
    async reload() {
      this._groups = [], await this.internalInit();
    }
    async create(s, o, a) {
      return await this.internalCreate(s, o, a);
    }
    get(s) {
      return this._groups.find((o) => o.id === s);
    }
    async delete(s) {
      return await this.internalDeleteGroup(s);
    }
    //----------------------------------------------------------------------------
    // INTERNALS
    //----------------------------------------------------------------------------
    /**
     * Init access groups.
     */
    async internalInit() {
      var s;
      const o = await ((s = this.context.resolve(e.RpcService)) === null || s === void 0 ? void 0 : s.requestBuilder("api/v1/Organizations/access_groups").searchParam("id", this.organization.id).sendGet());
      r.ResponseUtils.isFail(o) && await r.ResponseUtils.throwError(`Failed to get groups for organization: ${this.organization.id}`, o);
      const a = await o.json(), c = [];
      for (const d of a.groups) {
        const f = new i.GroupImpl(this.context, this.organization).initFrom(d.id);
        c.push(f);
      }
      const l = await Promise.all(c);
      for (const d of l)
        this._groups.push(d);
    }
    async internalCreate(s, o, a) {
      var c;
      if (s == null)
        throw new Error("Group create, name is undefined or null");
      if (s.length === 0 || s.trim().length === 0)
        throw new Error("Group create, name is empty");
      const l = await ((c = this.context.resolve(e.RpcService)) === null || c === void 0 ? void 0 : c.requestBuilder("api/v1/AccessGroups").sendPostJson({
        name: s,
        organizationId: this.organization.id,
        permits: o,
        memberIds: a
      }));
      r.ResponseUtils.isFail(l) && await r.ResponseUtils.throwError(`Failed to create group, organization: ${this.organization.id}`, l);
      const d = await l.json(), f = await new i.GroupImpl(this.context, this.organization).initFrom(d.group.id);
      return this._groups.push(f), this.dispatch({
        type: t.GroupsEvent.ADDED,
        data: f
      }), f;
    }
    /**
     * Delete group.
     * @param id
     */
    async internalDeleteGroup(s) {
      var o;
      if (s == null)
        throw new Error("Group delete, id is undefined or null");
      if (s.length === 0 || s.trim().length === 0)
        throw new Error("Group delete, id is empty");
      const a = await ((o = this.context.resolve(e.RpcService)) === null || o === void 0 ? void 0 : o.requestBuilder("api/v1/AccessGroups").searchParam("groupId", s).sendDelete());
      r.ResponseUtils.isFail(a) && await r.ResponseUtils.throwError(`Failed to delete group: ${s}, organization: ${this.organization.id}`, a);
      const c = this._groups.find((d) => d.id === s), l = this._groups.indexOf(c);
      if (l < 0)
        throw new Error("Group delete, index is not found");
      this._groups.splice(l, 1), this.dispatch({
        type: t.GroupsEvent.REMOVED,
        data: c
      }), c.dispose();
    }
  }
  return xt.GroupsImpl = n, xt;
}
var kt = {}, Ct = {}, Ce = {}, Bu;
function oo() {
  if (Bu) return Ce;
  Bu = 1, Object.defineProperty(Ce, "__esModule", { value: !0 }), Ce.Chat = Ce.ChatAnswerType = void 0;
  var e;
  (function(r) {
    r.SHORT = "short", r.LONG = "long";
  })(e || (Ce.ChatAnswerType = e = {}));
  class t {
  }
  return Ce.Chat = t, Ce;
}
var At = {}, M = {}, Nu;
function ao() {
  if (Nu) return M;
  Nu = 1, Object.defineProperty(M, "__esModule", { value: !0 }), M.StepTypeInfo = M.StepType = M.StepStatus = M.AnswerStatus = M.ChatType = void 0;
  var e;
  (function(u) {
    u[u.None = 0] = "None", u[u.Organization = 1] = "Organization", u[u.Workspaces = 2] = "Workspaces", u[u.File = 3] = "File", u[u.Library = 100] = "Library", u[u.LibraryOrganization = 101] = "LibraryOrganization", u[u.LibraryWorkspaces = 102] = "LibraryWorkspaces", u[u.LibraryFile = 103] = "LibraryFile";
  })(e || (M.ChatType = e = {}));
  var t;
  (function(u) {
    u[u.RUNNING = 0] = "RUNNING", u[u.SUCCESS = 1] = "SUCCESS", u[u.CANCELED = 2] = "CANCELED", u[u.FAIL = 3] = "FAIL";
  })(t || (M.AnswerStatus = t = {}));
  var r;
  (function(u) {
    u[u.RUNNING = 0] = "RUNNING", u[u.SUCCESS = 1] = "SUCCESS", u[u.FAIL = 2] = "FAIL", u[u.CANCELED = 3] = "CANCELED";
  })(r || (M.StepStatus = r = {}));
  var i;
  (function(u) {
    u[u.PREPARE = 0] = "PREPARE", u[u.SOURCES = 1] = "SOURCES", u[u.GENERATE_ANSWER = 6] = "GENERATE_ANSWER", u[u.FINALIZE_RESULT = 9] = "FINALIZE_RESULT", u[u.DONE = 10] = "DONE";
  })(i || (M.StepType = i = {}));
  class n {
    static hasTokens(s) {
      switch (s) {
        case i.GENERATE_ANSWER:
        case i.DONE:
        case i.FINALIZE_RESULT:
          return !0;
      }
      return !1;
    }
    static hasSources(s) {
      switch (s) {
        case i.SOURCES:
          return !0;
      }
      return !1;
    }
  }
  return M.StepTypeInfo = n, M;
}
var Ae = {}, Gu;
function _i() {
  if (Gu) return Ae;
  Gu = 1, Object.defineProperty(Ae, "__esModule", { value: !0 }), Ae.Answer = Ae.AnswerEvent = void 0;
  const e = T();
  var t;
  (function(i) {
    i.ADDED = "added", i.CANCALLED = "cancelled", i.FAILED = "failed", i.UPDATED = "updated";
  })(t || (Ae.AnswerEvent = t = {}));
  class r extends e.EventDispatcher {
  }
  return Ae.Answer = r, Ae;
}
var Hu;
function lc() {
  if (Hu) return At;
  Hu = 1, Object.defineProperty(At, "__esModule", { value: !0 }), At.AnswerImpl = void 0;
  const e = ao(), t = D(), r = A(), i = _i();
  class n extends i.Answer {
    constructor(s, o) {
      super(), this.chat = s, this.context = o;
    }
    initFromHistory(s) {
      return this._id = s.id, this._question = s.question, this._answer = s.context, this._sources = s.sources, this._timestamp = s.timestamp, this;
    }
    async initNew(s, o) {
      return this._id = s, this._question = o, this._answer = "", await this.fetch(), this;
    }
    get id() {
      return this._id;
    }
    get status() {
      return this._status;
    }
    get question() {
      return this._question;
    }
    get sources() {
      return this._sources;
    }
    get tokens() {
      return this._answer;
    }
    get timestamp() {
      return this._timestamp;
    }
    fetchAfter() {
      (this._status === void 0 || this._status === e.AnswerStatus.RUNNING) && setTimeout(async () => await this.fetch(), 300);
    }
    getStep(s) {
      var o;
      return (o = this._steps) === null || o === void 0 ? void 0 : o.find((a) => a.type === s);
    }
    async fetch() {
      var s;
      const a = await ((s = this.context.resolve(r.RpcService)) === null || s === void 0 ? void 0 : s.requestBuilder("api/v1/Chats/answer/fetch").searchParam("chatId", this.chat.id).searchParam("questionId", this.id).searchParam("position", "0").sendGet());
      t.ResponseUtils.isFail(a) && await t.ResponseUtils.throwError(`Failed to fetch answer ${this.id}`, a);
      const c = await a.json();
      if (this._status = c.status, this._steps = c.steps, (this.status === e.AnswerStatus.CANCELED || this.status === e.AnswerStatus.FAIL) && this.dispatch({
        type: i.AnswerEvent.UPDATED,
        data: this
      }), this.getStep(e.StepType.GENERATE_ANSWER) !== void 0) {
        const l = this.getStep(e.StepType.GENERATE_ANSWER), d = l == null ? void 0 : l.tokens.join("");
        this._answer !== d && (this._answer = d, this.dispatch({
          type: i.AnswerEvent.UPDATED,
          data: this
        }));
      }
      if (this.getStep(e.StepType.SOURCES) !== void 0 && this._sources === void 0) {
        const l = this.getStep(e.StepType.SOURCES);
        this._sources = l == null ? void 0 : l.sources, this.dispatch({
          type: i.AnswerEvent.UPDATED,
          data: this
        });
      }
      if (this.status === e.AnswerStatus.SUCCESS) {
        this.dispatch({
          type: i.AnswerEvent.UPDATED,
          data: this
        });
        const l = this.getStep(e.StepType.DONE);
        this._timestamp = Date.parse(l.end_at), await this.chat.update();
      } else
        this.fetchAfter();
    }
    async cancel() {
      var s;
      const o = await ((s = this.context.resolve(r.RpcService)) === null || s === void 0 ? void 0 : s.requestBuilder("api/v1/Chats/answer/cancel").sendPutJson({
        chat_id: this.chat.id,
        uid: this.id
      }));
      t.ResponseUtils.isFail(o) && await t.ResponseUtils.throwError("Failed to cancel a question", o), this.dispatch({
        type: i.AnswerEvent.CANCALLED,
        data: this
      });
    }
    async getAllSources() {
      var s;
      const o = await ((s = this.context.resolve(r.RpcService)) === null || s === void 0 ? void 0 : s.requestBuilder("api/v1/Chats/answer/sources").searchParam("chat_uid", this.chat.id).searchParam("uid", this.id).sendGet());
      return t.ResponseUtils.isFail(o) && await t.ResponseUtils.throwError(`Failed get all sources for chat ${this.chat.id} answer ${this.id}`, o), (await o.json()).sources_all;
    }
  }
  return At.AnswerImpl = n, At;
}
var Wu;
function dc() {
  if (Wu) return Ct;
  Wu = 1, Object.defineProperty(Ct, "__esModule", { value: !0 }), Ct.ChatImpl = void 0;
  const e = oo(), t = lc(), r = A(), i = D();
  class n extends e.Chat {
    constructor(s, o) {
      super(), this.context = s, this.organization = o, this._isDisposed = !1, this._answers = [];
    }
    async initFrom(s) {
      this._content = s, this._answers = [];
      for (const o of s.answers) {
        const a = new t.AnswerImpl(this, this.context).initFromHistory(o);
        this._answers.push(a);
      }
      return this;
    }
    async update() {
      var s;
      const o = await ((s = this.context.resolve(r.RpcService)) === null || s === void 0 ? void 0 : s.requestBuilder("api/v1/Chats").searchParam("id", this.id).sendGet());
      i.ResponseUtils.isFail(o) && await i.ResponseUtils.throwError(`Get chat for id ${this.id} is failed`, o);
      const a = (await o.json()).chat;
      await this.initFrom(a);
    }
    get id() {
      var s;
      return (s = this._content) === null || s === void 0 ? void 0 : s.id;
    }
    get name() {
      var s;
      return (s = this._content) === null || s === void 0 ? void 0 : s.name;
    }
    get resource() {
      var s;
      return (s = this._content) === null || s === void 0 ? void 0 : s.resources;
    }
    get model() {
      var s;
      return (s = this._content) === null || s === void 0 ? void 0 : s.model;
    }
    get createAt() {
      var s;
      return (s = this._content) === null || s === void 0 ? void 0 : s.createdAt;
    }
    get modifiedAt() {
      var s;
      return (s = this._content) === null || s === void 0 ? void 0 : s.modifiedAt;
    }
    get clientContext() {
      var s;
      return (s = this._content) === null || s === void 0 ? void 0 : s.clientContext;
    }
    get collection() {
      return this._answers;
    }
    get isDisposed() {
      return this._isDisposed;
    }
    getAnswer(s) {
      const o = this._answers.find((a) => a.id === s);
      if (o)
        return o;
      throw new Error(`Answer with id ${s} is not found`);
    }
    async ask(s, o) {
      var a;
      const c = await ((a = this.context.resolve(r.RpcService)) === null || a === void 0 ? void 0 : a.requestBuilder("api/v1/Chats/question").sendPutJson({
        chatId: this.id,
        questionMessage: s,
        isLongAnswer: o === e.ChatAnswerType.LONG
      }));
      if (i.ResponseUtils.isFail(c)) {
        if (await i.ResponseUtils.isLimitReached())
          return;
        await i.ResponseUtils.throwError(`Failed to ask a question, organization: ${this.organization.id}`, c);
      }
      const l = (await c.json()).id, d = await new t.AnswerImpl(this, this.context).initNew(l, s);
      return this._answers.push(d), d;
    }
    dispose() {
      this._isDisposed = !0;
    }
  }
  return Ct.ChatImpl = n, Ct;
}
var Fe = {}, Qu;
function co() {
  if (Qu) return Fe;
  Qu = 1, Object.defineProperty(Fe, "__esModule", { value: !0 }), Fe.Chats = Fe.ChatsEvent = void 0;
  const e = T();
  var t;
  (function(i) {
    i.ADDED = "added", i.REMOVED = "removed";
  })(t || (Fe.ChatsEvent = t = {}));
  class r extends e.EventDispatcher {
  }
  return Fe.Chats = r, Fe;
}
var Ft = {}, Dt = {}, St = {}, Vu;
function lo() {
  if (Vu) return St;
  Vu = 1, Object.defineProperty(St, "__esModule", { value: !0 }), St.Libraries = void 0;
  class e {
  }
  return St.Libraries = e, St;
}
var Rt = {}, Pt = {}, Zu;
function mi() {
  if (Zu) return Pt;
  Zu = 1, Object.defineProperty(Pt, "__esModule", { value: !0 }), Pt.Library = void 0;
  class e {
  }
  return Pt.Library = e, Pt;
}
var De = {}, Se = {}, Ju;
function bi() {
  if (Ju) return Se;
  Ju = 1, Object.defineProperty(Se, "__esModule", { value: !0 }), Se.LibraryPage = Se.LibraryParent = void 0;
  class e {
  }
  Se.LibraryParent = e;
  class t {
  }
  return Se.LibraryPage = t, Se;
}
var Ku;
function fo() {
  if (Ku) return De;
  Ku = 1, Object.defineProperty(De, "__esModule", { value: !0 }), De.LibraryPageImpl = De.LibraryParentImpl = void 0;
  const e = bi();
  class t extends e.LibraryParent {
    constructor(n, u) {
      super(), this.id = n, this.name = u;
    }
  }
  De.LibraryParentImpl = t;
  class r extends e.LibraryPage {
    constructor() {
      super(...arguments), this.libraryId = "", this.parents = [], this.files = [], this.folders = [], this.total = 0, this.filesPerPage = 0, this.page = 0;
    }
    get pages() {
      return Math.ceil(Math.max(this.total / this.filesPerPage, 1));
    }
  }
  return De.LibraryPageImpl = r, De;
}
var It = {}, Ot = {}, Xu;
function gi() {
  if (Xu) return Ot;
  Xu = 1, Object.defineProperty(Ot, "__esModule", { value: !0 }), Ot.LibraryFolder = void 0;
  class e {
  }
  return Ot.LibraryFolder = e, Ot;
}
var Yu;
function fc() {
  if (Yu) return It;
  Yu = 1, Object.defineProperty(It, "__esModule", { value: !0 }), It.LibraryFolderImpl = void 0;
  const e = gi(), t = A(), r = D(), i = fo(), n = Oi();
  class u extends e.LibraryFolder {
    constructor(o, a) {
      super(), this.libraryImpl = o, this.context = a;
    }
    async initFrom(o) {
      this._libFolder = o;
    }
    get iconId() {
      if (this._libFolder)
        return this._libFolder.iconId;
      throw new Error("LibraryFolder is not loaded.");
    }
    itemsCount() {
      return Promise.resolve(0);
    }
    get libraryId() {
      return this.libraryImpl.id;
    }
    get name() {
      if (this._libFolder)
        return this._libFolder.name;
      throw new Error("LibraryFolder is not loaded.");
    }
    get description() {
      if (this._libFolder)
        return this._libFolder.description;
      throw new Error("LibraryFolder is not loaded.");
    }
    get folderId() {
      if (this._libFolder)
        return this._libFolder.id;
      throw new Error("LibraryFolder is not loaded.");
    }
    async query(o, a, c) {
      var l;
      if (a == null)
        throw new Error("Query library folder, page is undefined or null");
      if (a < 0)
        throw new Error("Query library folder, page is negative");
      if (c == null)
        throw new Error("Query library folder, limit is undefined or null");
      if (c === 0)
        throw new Error("Query library folder, limit is 0");
      const d = await ((l = this.context.resolve(t.RpcService)) === null || l === void 0 ? void 0 : l.requestBuilder("api/v1/libraries/content/list").searchParam("libraryId", this.libraryId).searchParam("folderId", this.folderId).searchParam("query", o).searchParam("page", a.toString()).searchParam("limit", c.toString()).sendGet());
      r.ResponseUtils.isFail(d) && await r.ResponseUtils.throwError(`Query library folder :${o}, page:${a}, limit:${c}, failed`, d);
      const f = await d.json(), h = new i.LibraryPageImpl();
      h.total = f.totalItemsCount, h.filesPerPage = f.itemsPerPage, h.page = a, h.libraryId = this.libraryId;
      const p = [];
      for (const m of f.parentIds)
        p.push(this.libraryImpl.getFolder(m));
      const _ = await Promise.all(p);
      for (const m of _)
        h.parents.push(new i.LibraryParentImpl(m.folderId, m.name));
      for (const m of f.files) {
        const v = await new n.FileImpl(this.context).initFrom(m);
        h.files.push(v);
      }
      for (const m of f.folders) {
        const v = new u(this.libraryImpl, this.context);
        await v.initFrom(m), h.folders.push(v);
      }
      return h;
    }
  }
  return It.LibraryFolderImpl = u, It;
}
var en;
function hc() {
  if (en) return Rt;
  en = 1, Object.defineProperty(Rt, "__esModule", { value: !0 }), Rt.LibraryImpl = void 0;
  const e = mi(), t = A(), r = D(), i = Oi(), n = fo(), u = fc();
  class s extends e.Library {
    constructor(a) {
      super(), this.context = a;
    }
    async initFrom(a) {
      this._library = a;
    }
    get id() {
      if (this._library)
        return this._library.id;
      throw new Error("Library is not loaded.");
    }
    get name() {
      if (this._library)
        return this._library.name;
      throw new Error("Library is not loaded.");
    }
    async getFolder(a) {
      var c;
      if (a == null || a.trim() === "")
        throw new Error("Query library folder, folderId is undefined or null");
      const l = await ((c = this.context.resolve(t.RpcService)) === null || c === void 0 ? void 0 : c.requestBuilder("api/v1/libraries/folder").searchParam("libraryId", this.id).searchParam("folderId", a).sendGet());
      r.ResponseUtils.isFail(l) && await r.ResponseUtils.throwError(`Query library folder for ${a} failed`, l);
      const d = await l.json(), f = new u.LibraryFolderImpl(this, this.context);
      return await f.initFrom(d.folder), f;
    }
    async query(a, c, l, d = void 0) {
      var f;
      if (c == null)
        throw new Error("Query library root, page is undefined or null");
      if (c < 0)
        throw new Error("Query library root, page is negative");
      if (l == null)
        throw new Error("Query library root, limit is undefined or null");
      if (l === 0)
        throw new Error("Query library root, limit is 0");
      const h = await ((f = this.context.resolve(t.RpcService)) === null || f === void 0 ? void 0 : f.requestBuilder("api/v1/libraries/content/list").searchParam("libraryId", this.id).searchParam("folderId", d ?? "").searchParam("query", a).searchParam("page", c.toString()).searchParam("limit", l.toString()).sendGet());
      r.ResponseUtils.isFail(h) && await r.ResponseUtils.throwError(`Query library root :${a}, page:${c}, limit:${l}, failed`, h);
      const p = await h.json(), _ = new n.LibraryPageImpl();
      _.total = p.totalItemsCount, _.filesPerPage = p.itemsPerPage, _.page = c;
      for (const m of p.files) {
        const v = await new i.FileImpl(this.context).initFrom(m);
        _.files.push(v);
      }
      for (const m of p.folders) {
        const v = new u.LibraryFolderImpl(this, this.context);
        await v.initFrom(m), _.folders.push(v);
      }
      return this.root = _, _;
    }
  }
  return Rt.LibraryImpl = s, Rt;
}
var tn;
function pc() {
  if (tn) return Dt;
  tn = 1, Object.defineProperty(Dt, "__esModule", { value: !0 }), Dt.LibrariesImpl = void 0;
  const e = lo(), t = hc(), r = A(), i = D();
  class n extends e.Libraries {
    constructor(s) {
      super(), this.context = s, this._libraries = [];
    }
    async initialize() {
      var s;
      const o = await ((s = this.context.resolve(r.RpcService)) === null || s === void 0 ? void 0 : s.requestBuilder("api/v1/libraries").sendGet());
      i.ResponseUtils.isFail(o) && await i.ResponseUtils.throwError("Failed to get libraries", o);
      const c = (await o.json()).libraries;
      this._libraries.length = 0;
      for (const l of c) {
        const d = new t.LibraryImpl(this.context);
        await d.initFrom(l), this._libraries.push(d);
      }
    }
    get collection() {
      return this._libraries;
    }
    getLibraryById(s) {
      return this._libraries.find((o) => o.id === s);
    }
  }
  return Dt.LibrariesImpl = n, Dt;
}
var rn;
function qi() {
  if (rn) return Ft;
  rn = 1, Object.defineProperty(Ft, "__esModule", { value: !0 }), Ft.LibrariesService = void 0;
  const e = G(), t = pc();
  class r extends e.Service {
    constructor(n) {
      super(n), this._libraries = new t.LibrariesImpl(n.context);
    }
    async initialize() {
      return await this._libraries.initialize();
    }
    get libraries() {
      return this._libraries;
    }
  }
  return Ft.LibrariesService = r, Ft;
}
var un;
function _c() {
  if (un) return kt;
  un = 1, Object.defineProperty(kt, "__esModule", { value: !0 }), kt.ChatsImpl = void 0;
  const e = D(), t = A(), r = dc(), i = co(), n = qi();
  class u extends i.Chats {
    constructor(o, a) {
      super(), this.organization = o, this.context = a, this._chats = [];
    }
    async initFrom(o) {
      await this.loadOrganizationChats(o);
      const a = this.context.resolve(n.LibrariesService).libraries.collection;
      for (const c of a)
        await this.loadLibraryChats(c.id);
      this._chats.sort((c, l) => l.modifiedAt - c.modifiedAt);
    }
    async loadOrganizationChats(o) {
      var a;
      const d = await ((a = this.context.resolve(t.RpcService)) === null || a === void 0 ? void 0 : a.requestBuilder("api/v1/Chats/list").searchParam("organizationId", o).searchParam("limit", "100").searchParam("page", "0").sendGet());
      e.ResponseUtils.isFail(d) && await e.ResponseUtils.throwError(`Chats list org id:${o}, page:0, limit:100, failed`, d);
      const f = await d.json();
      for (const h of f.chats) {
        const p = await new r.ChatImpl(this.context, this.organization).initFrom(h);
        this._chats.push(p), this.dispatch({
          type: i.ChatsEvent.ADDED,
          data: p
        });
      }
    }
    async loadLibraryChats(o) {
      var a;
      const d = await ((a = this.context.resolve(t.RpcService)) === null || a === void 0 ? void 0 : a.requestBuilder("api/v1/Chats/list/library").searchParam("libraryId", o).searchParam("limit", "100").searchParam("page", "0").sendGet());
      e.ResponseUtils.isFail(d) && await e.ResponseUtils.throwError(`Chats list library id:${o}, page:0, limit:100, failed`, d);
      const f = await d.json();
      for (const h of f.chats) {
        const p = await new r.ChatImpl(this.context, this.organization).initFrom(h);
        this._chats.push(p), this.dispatch({
          type: i.ChatsEvent.ADDED,
          data: p
        });
      }
    }
    get collection() {
      return this._chats;
    }
    get(o) {
      return this.tryGet(o);
    }
    tryGet(o) {
      return this._chats.find((a) => a.id === o);
    }
    async create(o, a = "") {
      var c;
      if (o == null)
        throw new Error("Create chat, model is undefined or null");
      if (o.length === 0)
        throw new Error("Create chat, model is empty");
      const l = await ((c = this.context.resolve(t.RpcService)) === null || c === void 0 ? void 0 : c.requestBuilder("api/v1/Chats/workspaces").sendPostJson({ organizationId: this.organization.id, model: o, clientContext: a }));
      if (e.ResponseUtils.isFail(l)) {
        if (await e.ResponseUtils.isLimitReached())
          return;
        await e.ResponseUtils.throwError(`Failed to create chat, organization: ${this.organization.id}`, l);
      }
      const d = (await l.json()).chat, f = new r.ChatImpl(this.context, this.organization);
      return await f.initFrom(d), this._chats.splice(0, 0, f), this.dispatch({
        type: i.ChatsEvent.ADDED,
        data: f
      }), f;
    }
    async createWithFile(o) {
      var a;
      if (o == null)
        throw new Error("Create chat with file, id is undefined or null");
      if (o.length === 0 || o.trim().length === 0)
        throw new Error("Create chat with file, id is empty");
      const c = await ((a = this.context.resolve(t.RpcService)) === null || a === void 0 ? void 0 : a.requestBuilder("api/v1/Chats/file").sendPostJson({
        organizationId: this.organization.id,
        fileId: o,
        model: "search"
      }));
      if (e.ResponseUtils.isFail(c)) {
        if (await e.ResponseUtils.isLimitReached())
          return;
        await e.ResponseUtils.throwError(`Failed to create chat, organization: ${this.organization.id}`, c);
      }
      const l = (await c.json()).chat, d = new r.ChatImpl(this.context, this.organization);
      return await d.initFrom(l), this._chats.splice(0, 0, d), this.dispatch({
        type: i.ChatsEvent.ADDED,
        data: d
      }), d;
    }
    async createWithWorkspace(o, a = "") {
      var c;
      if (o == null)
        throw new Error("Create chat with workspace, ids are undefined or null");
      if (o.length === 0)
        throw new Error("Create chat with workspace, ids are empty");
      const l = await ((c = this.context.resolve(t.RpcService)) === null || c === void 0 ? void 0 : c.requestBuilder("api/v1/Chats/workspaces").sendPostJson({
        organizationId: this.organization.id,
        model: "search",
        clientContext: a,
        workspaceIds: o
      }));
      if (e.ResponseUtils.isFail(l)) {
        if (await e.ResponseUtils.isLimitReached())
          return;
        await e.ResponseUtils.throwError(`Failed to create chat in workspace, organization: ${this.organization.id}`, l);
      }
      const d = (await l.json()).chat, f = new r.ChatImpl(this.context, this.organization);
      return await f.initFrom(d), this._chats.splice(0, 0, f), this.dispatch({
        type: i.ChatsEvent.ADDED,
        data: f
      }), f;
    }
    async createWithLibraryFolder(o, a = null) {
      var c;
      if (o == null || o.trim() === "")
        throw new Error("Create chat with library folder, library id is undefined, null or empty");
      const l = await ((c = this.context.resolve(t.RpcService)) === null || c === void 0 ? void 0 : c.requestBuilder("api/v1/chats/library/folders").sendPostJson({
        libraryId: o,
        folderIds: a,
        model: "search",
        clientContext: ""
      }));
      if (e.ResponseUtils.isFail(l)) {
        if (await e.ResponseUtils.isLimitReached())
          return;
        await e.ResponseUtils.throwError(`Failed to create chat in library with folder, library: ${o}`, l);
      }
      const d = (await l.json()).chat, f = new r.ChatImpl(this.context, this.organization);
      return await f.initFrom(d), this._chats.splice(0, 0, f), this.dispatch({
        type: i.ChatsEvent.ADDED,
        data: f
      }), f;
    }
    async createWithLibraryFile(o, a) {
      var c;
      if (o == null || o.trim() === "")
        throw new Error("Create chat with library file, library id is undefined, null or empty");
      const l = await ((c = this.context.resolve(t.RpcService)) === null || c === void 0 ? void 0 : c.requestBuilder("api/v1/chats/library/file").sendPostJson({
        libraryId: o,
        fileId: a,
        model: "search",
        clientContext: ""
      }));
      if (e.ResponseUtils.isFail(l)) {
        if (await e.ResponseUtils.isLimitReached())
          return;
        await e.ResponseUtils.throwError(`Failed to create chat in library with file, library: ${o}`, l);
      }
      const d = (await l.json()).chat, f = new r.ChatImpl(this.context, this.organization);
      return await f.initFrom(d), this._chats.splice(0, 0, f), this.dispatch({
        type: i.ChatsEvent.ADDED,
        data: f
      }), f;
    }
    async delete(o) {
      var a;
      const c = this.tryGet(o);
      if (!c)
        throw new Error(`Chat ${o} is not found, organization: ${this.organization.id}`);
      const l = await ((a = this.context.resolve(t.RpcService)) === null || a === void 0 ? void 0 : a.requestBuilder("api/v1/Chats").searchParam("id", o).sendDelete());
      e.ResponseUtils.isFail(l) && await e.ResponseUtils.throwError(`Failed to delete chat: ${o}, organization: ${this.organization.id}`, l);
      const d = this._chats.indexOf(c);
      if (d < 0)
        throw new Error(`Chat ${o} is not found, organization: ${this.organization.id}`);
      this._chats.splice(d, 1), this.dispatch({
        type: i.ChatsEvent.REMOVED,
        data: c
      });
    }
  }
  return kt.ChatsImpl = u, kt;
}
var qt = {}, Re = {}, nn;
function ho() {
  if (nn) return Re;
  nn = 1, Object.defineProperty(Re, "__esModule", { value: !0 }), Re.QueryFlows = Re.QueryFlowsEvent = void 0;
  const e = T();
  var t;
  (function(i) {
    i.ADDED = "added", i.REMOVED = "removed";
  })(t || (Re.QueryFlowsEvent = t = {}));
  class r extends e.EventDispatcher {
  }
  return Re.QueryFlows = r, Re;
}
var zt = {}, Pe = {}, sn;
function po() {
  if (sn) return Pe;
  sn = 1, Object.defineProperty(Pe, "__esModule", { value: !0 }), Pe.QueryFlow = Pe.QueryFlowEvent = void 0;
  const e = T();
  var t;
  (function(i) {
    i.UPDATED = "updated";
  })(t || (Pe.QueryFlowEvent = t = {}));
  class r extends e.EventDispatcher {
  }
  return Pe.QueryFlow = r, Pe;
}
var Ie = {}, on;
function _o() {
  if (on) return Ie;
  on = 1, Object.defineProperty(Ie, "__esModule", { value: !0 }), Ie.QueryFlowStatus = Ie.QueryFlowState = void 0;
  var e;
  (function(r) {
    r[r.IN_PROGRESS = 0] = "IN_PROGRESS", r[r.ERROR = 1] = "ERROR", r[r.DONE = 100] = "DONE";
  })(e || (Ie.QueryFlowState = e = {}));
  var t;
  return function(r) {
    r[r.STARTED = 0] = "STARTED", r[r.UPLOADING_FILE = 1] = "UPLOADING_FILE", r[r.PROCESSING_FILE = 2] = "PROCESSING_FILE", r[r.PREPARING_RESULTS = 3] = "PREPARING_RESULTS", r[r.DONE = 4] = "DONE", r[r.FAILED = 5] = "FAILED";
  }(t || (Ie.QueryFlowStatus = t = {})), Ie;
}
var an;
function mc() {
  if (an) return zt;
  an = 1, Object.defineProperty(zt, "__esModule", { value: !0 }), zt.QueryFlowImpl = void 0;
  const e = po(), t = _o(), r = A(), i = D();
  class n extends e.QueryFlow {
    constructor(s) {
      super(), this.context = s;
    }
    async initFrom(s) {
      this._id = s, await this.fetch();
    }
    async fetch() {
      var s, o;
      const a = await ((s = this.context.resolve(r.RpcService)) === null || s === void 0 ? void 0 : s.requestBuilder("api/v1/QueryFlows").searchParam("flowId", this.id).sendGet());
      i.ResponseUtils.isFail(a) && await i.ResponseUtils.throwError(`Failed to fetch query flow with id ${this.id}`, a);
      const c = await a.json(), l = (o = this._content) === null || o === void 0 ? void 0 : o.state;
      this._content = c, l !== void 0 && l !== this._content.state && this.dispatch({
        type: e.QueryFlowEvent.UPDATED,
        data: this
      }), this._content.state === t.QueryFlowState.IN_PROGRESS && setTimeout(async () => await this.fetch(), 2e3);
    }
    get id() {
      if (this._id)
        return this._id;
      throw new Error("Query flow is not loaded");
    }
    get name() {
      if (this._content)
        return this._content.name;
      throw new Error("Query flow is not loaded");
    }
    get urls() {
      if (this._content && this._content.result.files)
        return this._content.result.files;
      throw new Error("Query fLow is not loaded");
    }
    get state() {
      if (this._content)
        return this._content.state;
      throw new Error("Query fLow is not loaded");
    }
    get status() {
      if (this._content)
        return this._content.status;
      throw new Error("Query fLow is not loaded");
    }
  }
  return zt.QueryFlowImpl = n, zt;
}
var cn;
function bc() {
  if (cn) return qt;
  cn = 1, Object.defineProperty(qt, "__esModule", { value: !0 }), qt.QueryFlowsImpl = void 0;
  const e = ho(), t = A(), r = D(), i = mc();
  class n extends e.QueryFlows {
    constructor(s, o) {
      super(), this.organization = s, this.context = o, this._collection = [];
    }
    async getQueryFlows() {
      var s;
      const o = await ((s = this.context.resolve(t.RpcService)) === null || s === void 0 ? void 0 : s.requestBuilder("api/v1/QueryFlows/list").searchParam("organizationId", this.organization.id).sendGet());
      r.ResponseUtils.isFail(o) && await r.ResponseUtils.throwError(`Failed to fetch query flows for org ${this.organization.id}`, o);
      const a = (await o.json()).flowIds;
      for (const c of a) {
        const l = new i.QueryFlowImpl(this.context);
        await l.initFrom(c), this._collection.push(l), this.dispatch({
          type: e.QueryFlowsEvent.ADDED,
          data: l
        });
      }
      return this._collection;
    }
    async create(s, o, a, c) {
      var l;
      if (s == null || s.trim() === "")
        throw new Error("Name is required, must be not empty");
      if (o == null || o.trim() === "")
        throw new Error("WorkspaceId is required, must be not empty");
      if (a == null)
        throw new Error("Create query flow, file is undefined or null");
      if (c == null)
        throw new Error("Create query flow, table is undefined or null");
      const d = new FormData();
      d.append("organizationId", this.organization.id), d.append("workspaceId", o), d.append("name", s), d.append("file", a, a.name), d.append("tableFile", c, c.name);
      const f = await ((l = this.context.resolve(t.RpcService)) === null || l === void 0 ? void 0 : l.requestBuilder("api/v1/QueryFlows").sendPostFormData(d));
      r.ResponseUtils.isFail(f) && await r.ResponseUtils.throwError(`Query flow creation for ${a.name}`, f);
      const h = await f.json(), p = new i.QueryFlowImpl(this.context);
      return await p.initFrom(h.flowId), this._collection.push(p), this.dispatch({
        type: e.QueryFlowsEvent.ADDED,
        data: p
      }), p.id;
    }
    async delete(s) {
      var o;
      const a = this._collection.find((d) => d.id == s);
      if (!a)
        throw new Error(`Query flow ${s} is not found`);
      const c = await ((o = this.context.resolve(t.RpcService)) === null || o === void 0 ? void 0 : o.requestBuilder("api/v1/QueryFlows").searchParam("flowId", s).sendDelete());
      r.ResponseUtils.isFail(c) && await r.ResponseUtils.throwError(`Failed to delete query flow ${s} in organization: ${this.organization.id}`, c);
      const l = this._collection.indexOf(a);
      if (l < 0)
        throw new Error(`Query flow ${s} is not found`);
      this._collection.splice(l, 1), this.dispatch({
        type: e.QueryFlowsEvent.REMOVED,
        data: a
      });
    }
  }
  return qt.QueryFlowsImpl = n, qt;
}
var Ut = {}, $t = {}, ln;
function gc() {
  if (ln) return $t;
  ln = 1, Object.defineProperty($t, "__esModule", { value: !0 }), $t.OrganizationPrompts = void 0;
  class e {
    /**
     * @returns list of source names
     * @example ["chat", "quiz"]
     */
    get sourceNames() {
      return ["chat", "quiz"];
    }
  }
  return $t.OrganizationPrompts = e, $t;
}
var dn;
function vc() {
  if (dn) return Ut;
  dn = 1, Object.defineProperty(Ut, "__esModule", { value: !0 }), Ut.OrganizationPromptsImpl = void 0;
  const e = gc(), t = A(), r = D();
  class i extends e.OrganizationPrompts {
    constructor(u, s) {
      super(), this.organization = u, this.context = s, this._cacheDefaultPrompts = /* @__PURE__ */ new Map();
    }
    assertSourceName(u) {
      if (u == null || u.trim() === "")
        throw new Error("Source name is empty or null");
      if (!this.sourceNames.includes(u))
        throw new Error("Source name is not supported");
    }
    async getDefaultPrompts(u) {
      var s;
      if (this.assertSourceName(u), u == null || u.trim() === "")
        throw new Error("Source name is empty or null");
      if (this._cacheDefaultPrompts.get(u) !== void 0)
        return this._cacheDefaultPrompts.get(u);
      const o = await ((s = this.context.resolve(t.RpcService)) === null || s === void 0 ? void 0 : s.requestBuilder("api/v1/Prompts/organization/default").searchParam("organizationId", this.organization.id).searchParam("sourceName", u).sendGet());
      return r.ResponseUtils.isFail(o) && await r.ResponseUtils.throwError(`Failed during fetch of organization prompts ${this.organization.id}`, o), this._cacheDefaultPrompts.set(u, (await o.json()).prompts), this._cacheDefaultPrompts.get(u);
    }
    async getPrompts(u) {
      var s;
      if (this.assertSourceName(u), u == null || u.trim() === "")
        throw new Error("Source name is empty or null");
      const o = await ((s = this.context.resolve(t.RpcService)) === null || s === void 0 ? void 0 : s.requestBuilder("api/v1/Prompts/organization").searchParam("organizationId", this.organization.id).searchParam("sourceName", u).sendGet());
      return r.ResponseUtils.isFail(o) && await r.ResponseUtils.throwError(`Failed during fetch of organization prompts ${this.organization.id}`, o), (await o.json()).prompts;
    }
    async updatePrompts(u, s) {
      var o;
      if (this.assertSourceName(u), u == null || u.trim() === "")
        throw new Error("Source name is empty or null");
      if (s == null || s.length === 0)
        return;
      for (let c = 0; c < s.length; c++) {
        const l = s[c];
        if (l == null)
          throw new Error("list of prompts has null item at index: " + c);
      }
      const a = await ((o = this.context.resolve(t.RpcService)) === null || o === void 0 ? void 0 : o.requestBuilder("api/v1/Prompts/organization").sendPutJson({
        organizationId: this.organization.id,
        sourceName: u,
        prompts: s
      }));
      r.ResponseUtils.isFail(a) && await r.ResponseUtils.throwError(`Failed during update organization's list of prompts ${this.organization.id}`, a);
    }
    async updatePrompt(u, s, o) {
      return this.assertSourceName(u), this.updatePrompts(u, [{
        key: s,
        value: o
      }]);
    }
    deletePrompt(u, s) {
      return this.assertSourceName(u), this.updatePrompt(u, s, null);
    }
    async deletePrompts(u, s) {
      return this.assertSourceName(u), this.updatePrompts(u, s.map((o) => ({
        key: o,
        value: null
      })));
    }
  }
  return Ut.OrganizationPromptsImpl = i, Ut;
}
var fn;
function wc() {
  if (fn) return ht;
  fn = 1, Object.defineProperty(ht, "__esModule", { value: !0 }), ht.OrganizationImpl = void 0;
  const e = oc(), t = uo(), r = cc(), i = _c(), n = A(), u = D(), s = bc(), o = vc();
  class a extends t.Organization {
    constructor(l) {
      super(), this.context = l, this._isDisposed = !1, this._isAdmin = !1, this._workspaces = new e.WorkspacesImpl(this, this.context), this._accessGroups = new r.GroupsImpl(this, this.context), this._chats = new i.ChatsImpl(this, this.context), this._queryFlows = new s.QueryFlowsImpl(this, this.context), this._prompts = new o.OrganizationPromptsImpl(this, this.context);
    }
    async initFrom(l, d) {
      this._content = l, this._isAdmin = d;
      const f = [
        this._workspaces.initFrom(l.id),
        this._chats.initFrom(l.id),
        this._accessGroups.initialize()
      ];
      return await Promise.all(f), this;
    }
    get prompts() {
      return this._prompts;
    }
    get isAdmin() {
      return this._isAdmin;
    }
    get isDisposed() {
      return this._isDisposed;
    }
    dispose() {
      this._isDisposed = !0;
    }
    get id() {
      var l;
      return (l = this._content) === null || l === void 0 ? void 0 : l.id;
    }
    get name() {
      var l;
      return (l = this._content) === null || l === void 0 ? void 0 : l.profile.name;
    }
    get description() {
      var l;
      return (l = this._content) === null || l === void 0 ? void 0 : l.profile.description;
    }
    get icon() {
      var l;
      return (l = this._content) === null || l === void 0 ? void 0 : l.profile.iconId;
    }
    get isAllowedInLibraries() {
      var l;
      return (l = this._content) === null || l === void 0 ? void 0 : l.profile.isAllowedInLibraries;
    }
    get workspaces() {
      return this._workspaces;
    }
    get accessGroups() {
      return this._accessGroups;
    }
    get queryFlows() {
      return this._queryFlows;
    }
    get chats() {
      return this._chats;
    }
    async members() {
      var l;
      const d = await ((l = this.context.resolve(n.RpcService)) === null || l === void 0 ? void 0 : l.requestBuilder("api/v1/Organizations/members").searchParam("id", this.id).sendGet());
      return u.ResponseUtils.isFail(d) && await u.ResponseUtils.throwError(`Failed during fetch of organization members ${this.id}`, d), (await d.json()).members;
    }
    async change(l, d) {
      var f;
      if (!this._content)
        throw new Error("Organization is not loaded.");
      if (l === this.name && d === this.description)
        return Promise.resolve();
      if (l == null || l.trim() === "")
        throw new Error("Name is required. Please provide a valid name.");
      if (d == null || d.trim() === "")
        throw new Error("Description is required. Please provide a valid description.");
      const h = await ((f = this.context.resolve(n.RpcService)) === null || f === void 0 ? void 0 : f.requestBuilder("api/v1/Organizations").sendPutJson({
        organizationId: this.id,
        profile: {
          name: l,
          description: d
        }
      }));
      u.ResponseUtils.isFail(h) && await u.ResponseUtils.throwError("Failed to change organization", h), this._content && (this._content.profile.name = l, this._content.profile.description = d), this.fireChanged();
    }
    async uploadIcon(l) {
      var d;
      if (l == null)
        throw new Error("Organization icon upload, file is undefined or null");
      const f = new FormData();
      f.append("OrganizationId", this.id), f.append("FileName", l.name), f.append("File", l, l.name);
      const h = await ((d = this.context.resolve(n.RpcService)) === null || d === void 0 ? void 0 : d.requestBuilder("api/v1/Organizations/icon").sendPutFormData(f));
      return u.ResponseUtils.isFail(h) && await u.ResponseUtils.throwError(`Organization icon upload ${l.name}`, h), (await h.json()).iconId;
    }
    async statistics(l, d) {
      var f;
      const h = await ((f = this.context.resolve(n.RpcService)) === null || f === void 0 ? void 0 : f.requestBuilder("api/v1/Stats/organization").searchParam("organizationId", this.id).searchParam("dateFrom", l.toISOString()).searchParam("dateTo", d.toISOString()).sendGet());
      return u.ResponseUtils.isFail(h) && await u.ResponseUtils.throwError(`Failed during fetch of organization statistics ${this.id}`, h), await h.json();
    }
    async membersStatistics(l, d) {
      var f;
      const h = await ((f = this.context.resolve(n.RpcService)) === null || f === void 0 ? void 0 : f.requestBuilder("api/v1/Stats/organization/members").searchParam("organizationId", this.id).searchParam("dateFrom", l.toISOString()).searchParam("dateTo", d.toISOString()).sendGet());
      return u.ResponseUtils.isFail(h) && await u.ResponseUtils.throwError(`Failed during fetch of organization members statistics ${this.id}`, h), await h.json();
    }
    async userStatistic(l, d, f) {
      var h;
      const p = await ((h = this.context.resolve(n.RpcService)) === null || h === void 0 ? void 0 : h.requestBuilder("api/v1/Stats/user").searchParam("userId", l).searchParam("organizationId", this.id).searchParam("dateFrom", d.toISOString()).searchParam("dateTo", f.toISOString()).sendGet());
      return u.ResponseUtils.isFail(p) && await u.ResponseUtils.throwError(`Failed during fetch of user statistics ${this.id}`, p), await p.json();
    }
    async userLimits() {
      var l, d, f;
      const h = await ((l = this.context.resolve(n.RpcService)) === null || l === void 0 ? void 0 : l.requestBuilder("api/v1/Users/limits").sendGet());
      u.ResponseUtils.isFail(h) && await u.ResponseUtils.throwError(`Failed to get limits in organization: ${this.id}`, h);
      const p = await h.json(), _ = {
        segment: p.userSegment.key,
        limits: []
      };
      for (const m of p.userLimits) {
        const v = m.action, w = {
          action: v,
          records: []
        };
        if (m.records.length != 0) {
          for (const b of m.records) {
            const g = p.userSegment.dayItems.find((C) => C.daysCount == b.daysCount);
            if (g == null)
              throw new Error(`Invalid response during get limits in organization: ${this.id}. Days count with ${v} not found in segment ${p.userSegment.key}`);
            const x = g == null ? void 0 : g.actionItems.find((C) => C.type == v);
            if (x == null)
              throw new Error(`Invalid response during get limits in organization: ${this.id}. Type ${v} not found in segment ${p.userSegment.key}`);
            const y = {};
            y.daysCount = b.daysCount, y.activeTill = b.activeTill, y.all = (d = x == null ? void 0 : x.tokenLimit) !== null && d !== void 0 ? d : x == null ? void 0 : x.countLimit;
            const S = (f = b.tokenLimit) !== null && f !== void 0 ? f : b.countLimit;
            y.used = y.all - S, w.records.push(y);
          }
          _.limits.push(w);
        }
      }
      return _;
    }
    async organizationLimits() {
      var l;
      const d = await ((l = this.context.resolve(n.RpcService)) === null || l === void 0 ? void 0 : l.requestBuilder("api/v1/Descriptions/limits/organization").searchParam("organizationId", this.id).sendGet());
      return u.ResponseUtils.isFail(d) && await u.ResponseUtils.throwError(`Failed to get limits in organization: ${this.id}`, d), (await d.json()).segment;
    }
    async limitSegments() {
      var l;
      const d = await ((l = this.context.resolve(n.RpcService)) === null || l === void 0 ? void 0 : l.requestBuilder("api/v1/Descriptions/limits/segments").sendGet());
      return u.ResponseUtils.isFail(d) && await u.ResponseUtils.throwError(`Failed to get limits in organization: ${this.id}`, d), (await d.json()).segments;
    }
    async inviteUsers(l, d) {
      var f;
      const h = await ((f = this.context.resolve(n.RpcService)) === null || f === void 0 ? void 0 : f.requestBuilder("api/v1/Invites").sendPostJson({
        organizationId: this.id,
        emails: l,
        accessGroupIds: d
      }));
      u.ResponseUtils.isFail(h) && await u.ResponseUtils.throwError(`Invite users failed for organization ${this.id}`, h);
    }
    async createInviteCode(l, d) {
      var f;
      let h = null;
      d != null && (h = {
        domain: d
      });
      const p = await ((f = this.context.resolve(n.RpcService)) === null || f === void 0 ? void 0 : f.requestBuilder("api/v1/Invites/link").sendPostJson({
        organizationId: this.id,
        accessGroupIds: l,
        validation: h
      }));
      return u.ResponseUtils.isFail(p) && await u.ResponseUtils.throwError(`Invite code creation failed for organization ${this.id}`, p), (await p.json()).code;
    }
    async deleteInviteCode(l) {
      var d;
      if (l == null || l.trim() === "")
        throw new Error("Invite code is required. Please provide a valid code.");
      const f = await ((d = this.context.resolve(n.RpcService)) === null || d === void 0 ? void 0 : d.requestBuilder("api/v1/Invites/link").searchParam("code", l).sendDelete());
      u.ResponseUtils.isFail(f) && await u.ResponseUtils.throwError(`Failed to delete invite for code: ${l}`, f);
    }
    async getOrganizationInvites() {
      var l;
      const d = await ((l = this.context.resolve(n.RpcService)) === null || l === void 0 ? void 0 : l.requestBuilder("api/v1/Invites/link/organization").searchParam("organizationId", this.id).sendGet());
      return u.ResponseUtils.isFail(d) && await u.ResponseUtils.throwError(`Failed to get invites in organization: ${this.id}`, d), await d.json();
    }
    async createApiKey(l, d) {
      var f;
      if (l == null || l.trim() === "")
        throw new Error("Name is required. Please provide a valid name.");
      const h = await ((f = this.context.resolve(n.RpcService)) === null || f === void 0 ? void 0 : f.requestBuilder("api/v1/Keys/organization/exist").sendPostJson({
        organizationId: this.id,
        accessGroupIds: d,
        keyName: l
      }));
      return u.ResponseUtils.isFail(h) && await u.ResponseUtils.throwError(`API key creation failed for organization ${this.id}`, h), (await h.json()).apiKey;
    }
    async getApiKeys() {
      var l;
      const d = await ((l = this.context.resolve(n.RpcService)) === null || l === void 0 ? void 0 : l.requestBuilder("api/v1/Keys/organization").searchParam("organizationId", this.id).sendGet());
      return u.ResponseUtils.isFail(d) && await u.ResponseUtils.throwError(`Failed to get api keys fot organization: ${this.id}`, d), (await d.json()).keys;
    }
    async getTokenFromKey(l, d, f, h) {
      var p;
      const _ = await ((p = this.context.resolve(n.RpcService)) === null || p === void 0 ? void 0 : p.requestBuilder("api/v1/Keys/user/token/jwt").searchParam("apiKey", l).searchParam("userId", d).searchParam("userName", f).searchParam("userMetadata", h).sendGet());
      return u.ResponseUtils.isFail(_) && await u.ResponseUtils.throwError(`Failed to get token from key for org: ${this.id}`, _), await _.json();
    }
    async deleteApiKey(l) {
      var d;
      if (l == null || l.trim() === "")
        throw new Error("Key is required. Please provide a valid key.");
      const f = await ((d = this.context.resolve(n.RpcService)) === null || d === void 0 ? void 0 : d.requestBuilder("api/v1/Keys/organization").searchParam("apiKey", l).sendDelete());
      u.ResponseUtils.isFail(f) && await u.ResponseUtils.throwError("Api key delete error", f);
    }
    async createQuiz(l, d, f, h, p) {
      var _;
      const m = await ((_ = this.context.resolve(n.RpcService)) === null || _ === void 0 ? void 0 : _.requestBuilder("api/v1/Quiz").sendPostJson({
        query: d,
        questionsCount: f,
        optionsCount: h,
        organizationId: this.id,
        workspaceIds: l,
        fileId: p
      }));
      return u.ResponseUtils.isFail(m) && await u.ResponseUtils.throwError(`Quiz creation failed for organization ${this.id} with query ${d}`, m), await m.json();
    }
    async deleteOrganizationMember(l) {
      var d;
      if (l == null)
        throw new Error(`Users delete from org ${this.id}, ids array is undefined or null`);
      if (l.length === 0)
        throw new Error(`Users delete from org ${this.id}, array of ids is empty`);
      const f = await ((d = this.context.resolve(n.RpcService)) === null || d === void 0 ? void 0 : d.requestBuilder("api/v1/Organizations/member").searchParam("organizationId", this.id).searchParam("userIds", l.toString()).sendDelete());
      u.ResponseUtils.isFail(f) && await u.ResponseUtils.throwError(`Users delete from org ${this.id} failed`, f), this.fireChanged();
    }
  }
  return ht.OrganizationImpl = a, ht;
}
var hn;
function yc() {
  if (hn) return dt;
  hn = 1, Object.defineProperty(dt, "__esModule", { value: !0 }), dt.OrganizationsImpl = void 0;
  const e = xr(), t = wc(), r = A(), i = D(), n = cr();
  class u extends e.Organizations {
    constructor(o) {
      super(), this.context = o, this.organizations = [];
    }
    get collection() {
      return this.organizations;
    }
    get current() {
      return this.currentOrganizationId;
    }
    set current(o) {
      if (this.currentOrganizationId !== o) {
        const a = this.tryGet(o);
        if (a)
          this.currentOrganizationId = o, this.dispatch({
            type: e.OrganizationsEvent.CURRENT_CHANGED,
            data: a
          });
        else
          throw new Error(`Organization ${o} is not found`);
      }
    }
    get(o) {
      return this.tryGet(o);
    }
    tryGet(o) {
      return this.organizations.find((a) => a.id === o);
    }
    contains(o) {
      return this.organizations.some((a) => a.id === o);
    }
    async create(o, a) {
      return this.internalCreateOrganization(o, a);
    }
    delete(o) {
      return this.internalDeleteOrganization(o);
    }
    async applyInviteCode(o) {
      var a, c;
      const l = await ((a = this.context.resolve(r.RpcService)) === null || a === void 0 ? void 0 : a.requestBuilder("api/v1/Invites/apply").sendPutJson({
        code: o
      }));
      return i.ResponseUtils.isFail(l) && await i.ResponseUtils.throwError("Invite code validation failed", l), await ((c = this.context.resolve(n.UserProfileService)) === null || c === void 0 ? void 0 : c.fetch()), await (l == null ? void 0 : l.json());
    }
    async leaveOrganization(o) {
      var a, c;
      if (o == null || o.trim() === "")
        throw new Error("Organization ID is null or empty");
      const l = await ((a = this.context.resolve(r.RpcService)) === null || a === void 0 ? void 0 : a.requestBuilder("api/v1/Organizations/leave").sendPutJson({
        organizationId: o
      }));
      i.ResponseUtils.isFail(l) && await i.ResponseUtils.throwError("Failed to leave organization", l), await ((c = this.context.resolve(n.UserProfileService)) === null || c === void 0 ? void 0 : c.fetch());
    }
    //----------------------------------------------------------------------------
    // INTERNALS
    //----------------------------------------------------------------------------
    /**
     * Delete organization.
     * @param id
     */
    async internalDeleteOrganization(o) {
      var a;
      if (o == null)
        throw new Error("Organization delete, id is undefined or null");
      if (o.length === 0 || o.trim().length === 0)
        throw new Error("Organization delete, id is empty");
      if (!this.contains(o))
        throw new Error(`Organization delete, id: ${o} is not found`);
      const c = await ((a = this.context.resolve(r.RpcService)) === null || a === void 0 ? void 0 : a.requestBuilder("/api/v1/Organizations").searchParam("id", o).sendDelete());
      i.ResponseUtils.isFail(c) && await i.ResponseUtils.throwError(`Organization ${o} delete, failed`, c);
      const l = this.get(o), d = this.organizations.indexOf(l);
      if (d < 0)
        throw new Error("Organization delete, index is not found");
      this.organizations.splice(d, 1), this.dispatch({
        type: e.OrganizationsEvent.REMOVED,
        data: l
      }), l.dispose();
    }
    /**
     * Create organization.
     * @param name
     * @param description
     */
    async internalCreateOrganization(o, a) {
      var c;
      if (o == null)
        throw new Error("Organization create, name is undefined or null");
      if (a == null)
        throw new Error("Organization create, description is undefined or null");
      if (o.length === 0 || o.trim().length === 0)
        throw new Error("Organization create, name is empty");
      const l = await ((c = this.context.resolve(r.RpcService)) === null || c === void 0 ? void 0 : c.requestBuilder("api/v1/Organizations").sendPostJson({
        profile: {
          name: o,
          description: a
        },
        currentOrganizationId: this.currentOrganizationId
      }));
      i.ResponseUtils.isFail(l) && await i.ResponseUtils.throwError(`Organization create failed, name: ${o}, description: ${a}`, l);
      const d = (await l.json()).organization, f = await new t.OrganizationImpl(this.context).initFrom(d, !0);
      return this.organizations.push(f), this.dispatch({
        type: e.OrganizationsEvent.ADDED,
        data: f
      }), f;
    }
    /**
     * Init organizations from user profile.
     * @param adminInOrganization
     * @param organizations
     * @param settings
     */
    async internalInitFrom(o, a, c) {
      this.organizations = [], this.currentOrganizationId = c == null ? void 0 : c.activeOrganizationId;
      const l = [];
      for (const f of a) {
        const h = new t.OrganizationImpl(this.context).initFrom(f, o.includes(f.id));
        l.push(h);
      }
      const d = await Promise.all(l);
      for (const f of d)
        this.organizations.push(f);
    }
    async uploadIconGlobal(o, a, c, l) {
      var d;
      if (l == null)
        throw new Error("Organization icon upload, file is undefined or null");
      const f = c, h = new FormData();
      h.append("OrganizationId", o), h.append("ResourceId", a), h.append("ResourceType", f.toString()), h.append("FileName", l.name), h.append("File", l, l.name);
      const p = await ((d = this.context.resolve(r.RpcService)) === null || d === void 0 ? void 0 : d.requestBuilder("api/v1/Files/icon").sendPutFormData(h));
      return i.ResponseUtils.isFail(p) && await i.ResponseUtils.throwError(`Organization icon upload ${l.name}`, p), (await p.json()).iconId;
    }
    async getIconData(o) {
      var a;
      if (o == null || o.trim() === "")
        throw new Error("Icon id is null or empty");
      const c = await ((a = this.context.resolve(r.RpcService)) === null || a === void 0 ? void 0 : a.requestBuilder("api/v1/Files/icon").searchParam("iconId", o).sendGet());
      return i.ResponseUtils.isFail(c) && await i.ResponseUtils.throwError(`Failed during get of icon ${o}`, c), await c.json();
    }
    async getNewestIcon(o, a) {
      var c;
      if (o == null || o.trim() === "")
        throw new Error("Resource id is null or empty");
      const l = a, d = await ((c = this.context.resolve(r.RpcService)) === null || c === void 0 ? void 0 : c.requestBuilder("api/v1/Files/icon/newest").searchParam("resourceId", o).searchParam("resourceType", l.toString()).sendGet());
      return i.ResponseUtils.isFail(d) && await i.ResponseUtils.throwError(`Failed during get of icon for ${o} ${a.toString()}`, d), await d.json();
    }
    async deleteIcon(o) {
      var a;
      if (o == null)
        throw new Error("Icon delete, id is undefined or null");
      if (o.length === 0 || o.trim().length === 0)
        throw new Error("Icon delete, id is empty");
      const c = await ((a = this.context.resolve(r.RpcService)) === null || a === void 0 ? void 0 : a.requestBuilder("api/v1/Files/icon").searchParam("iconId", o).sendDelete());
      i.ResponseUtils.isFail(c) && await i.ResponseUtils.throwError(`Failed to delete icon: ${o}`, c);
    }
  }
  return dt.OrganizationsImpl = u, dt;
}
var pn;
function mo() {
  if (pn) return lt;
  pn = 1, Object.defineProperty(lt, "__esModule", { value: !0 }), lt.OrganizationService = void 0;
  const e = G(), t = yc();
  class r extends e.Service {
    get impl() {
      var n;
      return (n = this._impl) !== null && n !== void 0 ? n : this._impl = new t.OrganizationsImpl(this.context);
    }
    get organizations() {
      return this.impl;
    }
    async initFrom(n, u, s) {
      await this.impl.internalInitFrom(n, u, s);
    }
  }
  return lt.OrganizationService = r, lt;
}
var Lt = {}, Oe = {}, _n;
function bo() {
  if (_n) return Oe;
  _n = 1, Object.defineProperty(Oe, "__esModule", { value: !0 }), Oe.UserProfile = Oe.UserEvent = void 0;
  const e = T();
  var t;
  (function(i) {
    i.CHANGED = "changed";
  })(t || (Oe.UserEvent = t = {}));
  class r extends e.EventDispatcher {
  }
  return Oe.UserProfile = r, Oe;
}
var mn;
function xc() {
  if (mn) return Lt;
  mn = 1, Object.defineProperty(Lt, "__esModule", { value: !0 }), Lt.UserProfileImpl = void 0;
  const e = bo(), t = A(), r = D(), i = cr();
  class n extends e.UserProfile {
    constructor(s) {
      super(), this.context = s;
    }
    get id() {
      if (this.content)
        return this.content.user.id;
      throw new Error("The profile is not loaded.");
    }
    get name() {
      if (this.content)
        return this.content.user.profile.name;
      throw new Error("The profile is not loaded.");
    }
    get email() {
      if (this.content)
        return this.content.user.profile.email;
      throw new Error("The profile is not loaded.");
    }
    get binanceId() {
      if (this.content)
        return this.content.user.profile.binanceId;
      throw new Error("The profile is not loaded.");
    }
    get educationalInstitution() {
      if (this.content)
        return this.content.user.profile.educationalInstitution;
      throw new Error("The profile is not loaded.");
    }
    get isDeleted() {
      if (this.content)
        return this.content.user.isDeleted;
      throw new Error("The profile is not loaded.");
    }
    get isAnonymous() {
      if (this.content)
        return this.content.user.isAnonymousMode;
      throw new Error("The profile is not loaded.");
    }
    get createdAt() {
      if (this.content)
        return new Date(this.content.user.created_at);
      throw new Error("The profile is not loaded.");
    }
    get modifiedAt() {
      if (this.content)
        return new Date(this.content.user.modified_at);
      throw new Error("The profile is not loaded.");
    }
    initFrom(s) {
      this.content = s, this.dispatch({
        type: e.UserEvent.CHANGED,
        data: this
      });
    }
    async fetch() {
      var s;
      await ((s = this.context.resolve(i.UserProfileService)) === null || s === void 0 ? void 0 : s.fetch());
    }
    async updateUser(s, o, a) {
      var c;
      if (!this.content)
        throw new Error("User is not loaded.");
      if (s === this.name && o === this.binanceId && a === this.educationalInstitution)
        return Promise.resolve();
      const l = await ((c = this.context.resolve(t.RpcService)) === null || c === void 0 ? void 0 : c.requestBuilder("api/v1/Users").sendPutJson({
        profile: {
          name: s,
          binanceId: o,
          educationalInstitution: a
        }
      }));
      r.ResponseUtils.isFail(l) && await r.ResponseUtils.throwError("Failed to change user", l), this.content && (this.content.user.profile.name = s, this.content.user.profile.binanceId = o, this.content.user.profile.educationalInstitution = a), this.dispatch({
        type: e.UserEvent.CHANGED,
        data: this
      });
    }
    async addTelegramAccount(s) {
      var o;
      if (!this.content)
        throw new Error("User is not loaded.");
      if (s == null)
        throw new Error("Data is null or undefined");
      const a = await ((o = this.context.resolve(t.RpcService)) === null || o === void 0 ? void 0 : o.requestBuilder("api/v1/Users/telegram").sendPutJson({
        telegram: s
      }));
      r.ResponseUtils.isFail(a) && await r.ResponseUtils.throwError("Failed to connect telegram to user", a);
    }
    async getUserInvites() {
      var s;
      const o = await ((s = this.context.resolve(t.RpcService)) === null || s === void 0 ? void 0 : s.requestBuilder("api/v1/Invites/link/user").sendGet());
      return r.ResponseUtils.isFail(o) && await r.ResponseUtils.throwError("Failed to get invites for current user", o), await o.json();
    }
    async deleteUser() {
      var s;
      const o = await ((s = this.context.resolve(t.RpcService)) === null || s === void 0 ? void 0 : s.requestBuilder("/api/v1/Users/self").sendDelete());
      return r.ResponseUtils.isFail(o) && await r.ResponseUtils.throwError("Failed to delete user", o), !0;
    }
  }
  return Lt.UserProfileImpl = n, Lt;
}
var bn;
function cr() {
  if (bn) return ct;
  bn = 1, Object.defineProperty(ct, "__esModule", { value: !0 }), ct.UserProfileService = void 0;
  const e = G(), t = A(), r = mo(), i = xc(), n = D(), u = xr();
  class s extends e.Service {
    constructor() {
      super(...arguments), this.impl = new i.UserProfileImpl(this.context);
    }
    get userProfile() {
      return this.impl;
    }
    async merge(a) {
      const l = await this.resolve(t.RpcService).requestBuilder("api/v1/Users/anonymous/merge").sendPostJson({
        anonymousToken: a
      });
      n.ResponseUtils.isFail(l) && await n.ResponseUtils.throwError("Failed to merge anonymous user", l), await this.fetch();
    }
    async fetch() {
      const c = await this.resolve(t.RpcService).requestBuilder("api/v2/Users/self").sendGet();
      n.ResponseUtils.isFail(c) && await n.ResponseUtils.throwError("Failed to fetch user profile", c);
      const l = await c.json();
      this.impl.initFrom(l);
      const d = this.resolve(r.OrganizationService);
      await d.initFrom(l.adminInOrganization, l.organizations, l.user.settings), d.organizations.subscribe(async (f) => {
        this.updateUserSettings(f.data.id);
      }, u.OrganizationsEvent.CURRENT_CHANGED);
    }
    async updateUserSettings(a, c) {
      const d = await this.resolve(t.RpcService).requestBuilder("api/v1/Users/settings").sendPutJson({
        settings: {
          activeOrganizationId: a,
          activeWorkspaceId: c
        }
      });
      n.ResponseUtils.isFail(d) && await n.ResponseUtils.throwError("Failed to update user settings", d);
    }
  }
  return ct.UserProfileService = s, ct;
}
var Tt = {}, ue = {}, gn;
function go() {
  if (gn) return ue;
  gn = 1, Object.defineProperty(ue, "__esModule", { value: !0 }), ue.createFingerprint = ue.getCookie = ue.setCookie = void 0;
  const e = () => (globalThis.document || (globalThis.document = {
    cookie: ""
  }), document), t = () => (globalThis.navigator || (globalThis.navigator = {
    userAgent: "",
    hardwareConcurrency: 0
  }), navigator), r = () => (globalThis.window || (globalThis.window = {
    devicePixelRatio: 16 / 9,
    sessionStorage: {},
    localStorage: {}
  }), window), i = (s, o) => {
    const a = e();
    a.cookie = `${s}=${o || ""};`;
  };
  ue.setCookie = i;
  const n = (s) => {
    const o = e(), a = `${s}=`, c = o.cookie.split(";");
    for (let l = 0; l < c.length; l++) {
      let d = c[l];
      for (; d.charAt(0) === " "; )
        d = d.substring(1, d.length);
      if (d.indexOf(a) === 0)
        return d.substring(a.length, d.length);
    }
  };
  ue.getCookie = n;
  const u = () => {
    const s = t(), o = r(), a = /* @__PURE__ */ new Map();
    return a.set("userAgent", s.userAgent), a.set("hardware_concurrency", s.hardwareConcurrency), a.set("pixel_ratio", o.devicePixelRatio), a.set("session_storage", o.sessionStorage), a.set("local_storage", o.localStorage), a;
  };
  return ue.createFingerprint = u, ue;
}
var vn;
function zi() {
  if (vn) return Tt;
  vn = 1, Object.defineProperty(Tt, "__esModule", { value: !0 }), Tt.CookieService = void 0;
  const e = G(), t = go();
  class r extends e.Service {
    get anonymousToken() {
      return (0, t.getCookie)("anonymous-token");
    }
    get anonymousTokenIsValid() {
      return this.anonymousToken !== void 0 && this.anonymousToken !== null && this.anonymousToken.length > 0;
    }
    set anonymousToken(n) {
      (0, t.setCookie)("anonymous-token", n);
    }
  }
  return Tt.CookieService = r, Tt;
}
var Mt = {}, jt = {}, wn;
function Ec() {
  if (wn) return jt;
  wn = 1, Object.defineProperty(jt, "__esModule", { value: !0 }), jt.AcquiringImpl = void 0;
  const e = A(), t = D();
  class r {
    constructor(n) {
      this.context = n;
    }
    get userPlan() {
      return this._userPlan;
    }
    get plans() {
      return this._plans;
    }
    get limitSegments() {
      return this._limitSegments;
    }
    async initialize() {
      const n = this.getUserPlan(), u = this.getPlans(), s = [
        n,
        u
      ];
      await Promise.all(s), this._userPlan = await n;
      const { plans: o, limitSegments: a } = await u;
      this._plans = o, this._limitSegments = a;
    }
    async createOrder(n) {
      const s = await this.context.resolve(e.RpcService).requestBuilder("api/v1/Acquiring/order").sendPostJson({
        key: n
      });
      return t.ResponseUtils.isFail(s) && await t.ResponseUtils.throwError("Failed to create order", s), (await s.json()).data;
    }
    async unsubscribe() {
      const u = await this.context.resolve(e.RpcService).requestBuilder("api/v1/Acquiring/unsubscribe").sendDelete();
      return t.ResponseUtils.isFail(u) && await t.ResponseUtils.throwError("Failed to unsubscribe", u), await u.json();
    }
    async getPlans() {
      const u = await this.context.resolve(e.RpcService).requestBuilder("api/v1/Acquiring/plans").sendGet();
      t.ResponseUtils.isFail(u) && await t.ResponseUtils.throwError("Failed to get acquiring plans", u);
      const s = await u.json();
      return this._plans = s.plans, this._limitSegments = s.limitSegments, s;
    }
    async getUserPlan() {
      const u = await this.context.resolve(e.RpcService).requestBuilder("api/v1/Acquiring/user/subscription").sendGet();
      t.ResponseUtils.isFail(u) && await t.ResponseUtils.throwError("Failed to get user subscription", u);
      const s = await u.json();
      return this._userPlan = s, s;
    }
    async getOrder(n) {
      const s = await this.context.resolve(e.RpcService).requestBuilder("api/v1/Acquiring/order/state").searchParam("orderId", n).sendGet();
      return t.ResponseUtils.isFail(s) && await t.ResponseUtils.throwError("Failed to get order", s), await s.json();
    }
  }
  return jt.AcquiringImpl = r, jt;
}
var yn;
function vo() {
  if (yn) return Mt;
  yn = 1, Object.defineProperty(Mt, "__esModule", { value: !0 }), Mt.AcquiringService = void 0;
  const e = G(), t = Ec();
  class r extends e.Service {
    constructor(n) {
      super(n), this._acquiring = new t.AcquiringImpl(n.context);
    }
    async initialize() {
      return await this._acquiring.initialize();
    }
    get acquiring() {
      return this._acquiring;
    }
  }
  return Mt.AcquiringService = r, Mt;
}
var xn;
function kc() {
  if (xn) return be;
  xn = 1, Object.defineProperty(be, "__esModule", { value: !0 }), be.StartCommandHandler = be.StartCommand = void 0;
  const e = qr(), t = cr(), r = zi(), i = Or(), n = vo(), u = qi();
  class s extends e.Command {
  }
  be.StartCommand = s;
  class o extends e.CommandHandler {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async execute(c) {
      const l = this.resolve(t.UserProfileService), d = this.resolve(n.AcquiringService), f = this.resolve(u.LibrariesService);
      if (!(this.context.app.credential instanceof i.AnonymousCredential)) {
        const h = this.resolve(r.CookieService);
        h.anonymousTokenIsValid && (await l.merge(h.anonymousToken), h.anonymousToken = void 0);
      }
      await f.initialize(), await l.fetch(), await d.initialize();
    }
  }
  return be.StartCommandHandler = o, be;
}
var qe = {}, En;
function Cc() {
  if (En) return qe;
  En = 1, Object.defineProperty(qe, "__esModule", { value: !0 }), qe.DeleteUserFullCommandHandler = qe.DeleteUserFullCommand = void 0;
  const e = qr(), t = A(), r = D();
  class i extends e.Command {
  }
  qe.DeleteUserFullCommand = i;
  class n extends e.CommandHandler {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async execute(s) {
      var o;
      const a = await ((o = this.resolve(t.RpcService)) === null || o === void 0 ? void 0 : o.requestBuilder("/api/v1/Users/self/full").sendDelete());
      r.ResponseUtils.isFail(a) && await r.ResponseUtils.throwError("Failed to delete user", a);
    }
  }
  return qe.DeleteUserFullCommandHandler = n, qe;
}
var Bt = {}, kn;
function Ac() {
  if (kn) return Bt;
  kn = 1, Object.defineProperty(Bt, "__esModule", { value: !0 }), Bt.AnonymousService = void 0;
  const e = G(), t = zi(), r = go(), i = A(), n = D();
  class u extends e.Service {
    async getToken() {
      var o;
      const a = this.resolve(t.CookieService);
      let c = a.anonymousToken;
      if (c == null || c.length === 0) {
        const l = (0, r.createFingerprint)(), d = await ((o = this.context.resolve(i.RpcService)) === null || o === void 0 ? void 0 : o.requestBuilder("api/v1/Users/anonymous").sendPutJson({
          info: {
            fingerprint: JSON.stringify({
              userAgent: l.get("userAgent"),
              language: l.get("language"),
              hardwareConcurrency: l.get("hardware_concurrency"),
              cookieEnabled: l.get("cookie_enabled"),
              pixelRatio: l.get("pixel_ratio")
            })
          }
        }));
        n.ResponseUtils.isFail(d) && await n.ResponseUtils.throwError("Failed to create anonymous token", d), c = (await d.json()).token, a.anonymousToken = c;
      }
      return {
        token: c,
        isValid: c != null && c.length > 0
      };
    }
  }
  return Bt.AnonymousService = u, Bt;
}
var Nt = {}, Gt = {}, Ht = {}, Cn;
function wo() {
  if (Cn) return Ht;
  Cn = 1, Object.defineProperty(Ht, "__esModule", { value: !0 }), Ht.LibraryAdministration = void 0;
  class e {
  }
  return Ht.LibraryAdministration = e, Ht;
}
var An;
function Fc() {
  if (An) return Gt;
  An = 1, Object.defineProperty(Gt, "__esModule", { value: !0 }), Gt.LibraryAdministrationImpl = void 0;
  const e = wo(), t = A(), r = D();
  class i extends e.LibraryAdministration {
    constructor(u) {
      super(), this.context = u;
    }
    async createLibrary(u, s, o, a) {
      var c;
      if (u == null || u.trim() === "")
        throw new Error("Name for library is required, must be not empty");
      if (s == null || s.trim() === "")
        throw new Error("Description for library is required, must be not empty");
      if (a == null)
        throw new Error("IsPublic is required, must be not empty");
      const l = await ((c = this.context.resolve(t.RpcService)) === null || c === void 0 ? void 0 : c.requestBuilder("api/v1/management/libraries").sendPostJson({
        name: u,
        description: s,
        region: o,
        isPublic: a
      }));
      return r.ResponseUtils.isFail(l) && await r.ResponseUtils.throwError(`Failed to create library ${u}`, l), (await l.json()).libraryId;
    }
    async addOrgToLibrary(u, s) {
      var o;
      if (u == null)
        throw new Error("Organization add to library, libraryId is undefined or null");
      if (u.length === 0 || u.trim().length === 0)
        throw new Error("Organization add to from library, libraryId is empty");
      if (s == null)
        throw new Error("Organization add to from library, organizationId is undefined or null");
      if (s.length === 0 || s.trim().length === 0)
        throw new Error("Organization add to from library, organizationId is empty");
      const a = await ((o = this.context.resolve(t.RpcService)) === null || o === void 0 ? void 0 : o.requestBuilder("api/v1/management/libraries/allowed/organization").sendPutJson({
        libraryId: u,
        organizationId: s
      }));
      r.ResponseUtils.isFail(a) && await r.ResponseUtils.throwError(`Organization ${s} add to library ${u} failed`, a);
    }
    async getLibraries() {
      var u;
      const s = await ((u = this.context.resolve(t.RpcService)) === null || u === void 0 ? void 0 : u.requestBuilder("api/v1/management/libraries/allowed/organizations").sendGet());
      return r.ResponseUtils.isFail(s) && await r.ResponseUtils.throwError("Can not get libraries", s), (await s.json()).libraries;
    }
    async deleteOrgFromLibrary(u, s) {
      var o;
      if (u == null)
        throw new Error("Organization delete from library, libraryId is undefined or null");
      if (u.length === 0 || u.trim().length === 0)
        throw new Error("Organization delete from library, libraryId is empty");
      if (s == null)
        throw new Error("Organization delete from library, organizationId is undefined or null");
      if (s.length === 0 || s.trim().length === 0)
        throw new Error("Organization delete from library, organizationId is empty");
      const a = await ((o = this.context.resolve(t.RpcService)) === null || o === void 0 ? void 0 : o.requestBuilder("api/v1/management/libraries/allowed/organization").searchParam("libraryId", u).searchParam("organizationId", s).sendDelete());
      r.ResponseUtils.isFail(a) && await r.ResponseUtils.throwError(`Organization ${s} delete from library ${u}, failed`, a);
    }
    async deleteLibrary(u) {
      var s;
      if (u == null)
        throw new Error("Library delete, libraryId is undefined or null");
      if (u.length === 0 || u.trim().length === 0)
        throw new Error("Library delete, libraryId is empty");
      const o = await ((s = this.context.resolve(t.RpcService)) === null || s === void 0 ? void 0 : s.requestBuilder("api/v1/management/libraries").searchParam("libraryId", u).sendDelete());
      r.ResponseUtils.isFail(o) && await r.ResponseUtils.throwError(`Library ${u} delete, failed`, o);
    }
  }
  return Gt.LibraryAdministrationImpl = i, Gt;
}
var Wt = {}, Fn;
function Dc() {
  if (Fn) return Wt;
  Fn = 1, Object.defineProperty(Wt, "__esModule", { value: !0 }), Wt.StatisticAdministrationImpl = void 0;
  const e = A(), t = D();
  class r {
    constructor(n) {
      this.context = n;
    }
    async getOrganizationMembers(n, u, s) {
      var o;
      const a = await ((o = this.context.resolve(e.RpcService)) === null || o === void 0 ? void 0 : o.requestBuilder("api/v1/management/stats/organization/members/total").searchParam("organizationId", n).searchParam("dateFrom", u.toISOString()).searchParam("dateTo", s.toISOString()).sendGet());
      return t.ResponseUtils.isFail(a) && await t.ResponseUtils.throwError("Failed to get statistics", a), await a.json();
    }
    async getOrganizations(n, u) {
      var s;
      const o = await ((s = this.context.resolve(e.RpcService)) === null || s === void 0 ? void 0 : s.requestBuilder("api/v1/management/stats/organizations").searchParam("dateFrom", n.toISOString()).searchParam("dateTo", u.toISOString()).sendGet());
      return t.ResponseUtils.isFail(o) && await t.ResponseUtils.throwError("Failed to get statistics", o), await o.json();
    }
  }
  return Wt.StatisticAdministrationImpl = r, Wt;
}
var Qt = {}, Dn;
function Sc() {
  if (Dn) return Qt;
  Dn = 1, Object.defineProperty(Qt, "__esModule", { value: !0 }), Qt.UsersAdministrationImpl = void 0;
  const e = A(), t = D();
  class r {
    constructor(n) {
      this.context = n;
    }
    async search(n, u, s) {
      var o;
      const a = await ((o = this.context.resolve(e.RpcService)) === null || o === void 0 ? void 0 : o.requestBuilder("api/v1/management/users/info/search").searchParam("query", n).searchParam("email", u).searchParam("userId", s).sendGet());
      return t.ResponseUtils.isFail(a) && await t.ResponseUtils.throwError("Failed to search user by email", a), await a.json();
    }
    async setUserSegment(n, u, s) {
      var o;
      const a = await ((o = this.context.resolve(e.RpcService)) === null || o === void 0 ? void 0 : o.requestBuilder("api/v1/management/users/limits/segment").sendPutJson({
        userEmail: n,
        userId: u,
        segmentKey: s
      }));
      t.ResponseUtils.isFail(a) && await t.ResponseUtils.throwError(`Set segment ${s} for user ${n}, id ${u} failed`, a);
    }
  }
  return Qt.UsersAdministrationImpl = r, Qt;
}
var Vt = {}, Zt = {}, Sn;
function Rc() {
  if (Sn) return Zt;
  Sn = 1, Object.defineProperty(Zt, "__esModule", { value: !0 }), Zt.CheatsAdministration = void 0;
  class e {
  }
  return Zt.CheatsAdministration = e, Zt;
}
var Rn;
function Pc() {
  if (Rn) return Vt;
  Rn = 1, Object.defineProperty(Vt, "__esModule", { value: !0 }), Vt.CheatsAdministrationImpl = void 0;
  const e = Rc(), t = A(), r = D();
  class i extends e.CheatsAdministration {
    constructor(u) {
      super(), this.context = u;
    }
    async cleanRedisCache(u) {
      var s;
      if (u == null)
        throw new Error("cleanCache is required, must be not empty");
      const o = await ((s = this.context.resolve(t.RpcService)) === null || s === void 0 ? void 0 : s.requestBuilder("api/v1/Cheats/clean/cache").sendPostJson({
        cleanCache: u
      }));
      r.ResponseUtils.isFail(o) && await r.ResponseUtils.throwError("Failed to clean redis cache", o);
    }
    async deleteBrokenFiles(u, s, o, a) {
      var c;
      if (u == null || u.trim() === "")
        throw new Error("organizationId is required, must be not empty");
      if (s == null || s.trim() === "")
        throw new Error("workspaceId is required, must be not empty");
      if (o == null)
        throw new Error("isRemoveFromDb is required, must be not empty");
      if (a == null)
        throw new Error("isRemoveFromService is required, must be not empty");
      const l = await ((c = this.context.resolve(t.RpcService)) === null || c === void 0 ? void 0 : c.requestBuilder("api/v1/Cheats/files/broken/clean").sendPostJson({
        organizationId: u,
        workspaceId: s,
        isRemoveFromDb: o,
        isRemoveFromService: a
      }));
      return r.ResponseUtils.isFail(l) && await r.ResponseUtils.throwError(`Failed to clean broken files for ${u}, workspace ${s}`, l), await l.json();
    }
    async getBrokenFilesInfo(u, s) {
      var o;
      const a = await ((o = this.context.resolve(t.RpcService)) === null || o === void 0 ? void 0 : o.requestBuilder("api/v1/Cheats/files/broken/info").searchParam("organizationId", u).searchParam("workspaceId", s).sendGet());
      return r.ResponseUtils.isFail(a) && await r.ResponseUtils.throwError("Can not get broken files info", a), await a.json();
    }
    async getWhitelistEmails() {
      var u;
      const s = await ((u = this.context.resolve(t.RpcService)) === null || u === void 0 ? void 0 : u.requestBuilder("api/v1/Cheats/invites/white_list").sendGet());
      return r.ResponseUtils.isFail(s) && await r.ResponseUtils.throwError("Can not get emails whitelist", s), await s.json();
    }
    async addEmailToWhitelist(u, s) {
      var o;
      if (u == null || u.trim() === "")
        throw new Error("email is required, must be not empty");
      if (s == null || s === 0)
        throw new Error("expiredDays is required, must be not empty and grater than 0");
      const a = await ((o = this.context.resolve(t.RpcService)) === null || o === void 0 ? void 0 : o.requestBuilder("api/v1/Cheats/invites/white_list").sendPostJson({
        email: u,
        expiredDays: s
      }));
      r.ResponseUtils.isFail(a) && await r.ResponseUtils.throwError(`Failed to add email ${u} to whitelist`, a);
    }
    async removeEmailFromWhitelist(u) {
      var s;
      if (u == null || u.length === 0 || u.trim().length === 0)
        throw new Error("Email delete from whitelist, email is empty");
      const o = await ((s = this.context.resolve(t.RpcService)) === null || s === void 0 ? void 0 : s.requestBuilder("/api/v1/Cheats/invites/white_list").searchParam("email", u).sendDelete());
      r.ResponseUtils.isFail(o) && await r.ResponseUtils.throwError(`Email ${u} delete from whitelist failed`, o);
    }
  }
  return Vt.CheatsAdministrationImpl = i, Vt;
}
var Pn;
function Ic() {
  if (Pn) return Nt;
  Pn = 1, Object.defineProperty(Nt, "__esModule", { value: !0 }), Nt.AdministrationService = void 0;
  const e = G(), t = Fc(), r = Dc(), i = Sc(), n = Pc();
  class u extends e.Service {
    constructor(o) {
      super(o), this._libraries = new t.LibraryAdministrationImpl(o.context), this._statistic = new r.StatisticAdministrationImpl(o.context), this._users = new i.UsersAdministrationImpl(o.context), this._cheats = new n.CheatsAdministrationImpl(o.context);
    }
    get libraries() {
      return this._libraries;
    }
    get statistic() {
      return this._statistic;
    }
    get users() {
      return this._users;
    }
    get cheats() {
      return this._cheats;
    }
  }
  return Nt.AdministrationService = u, Nt;
}
var In;
function Oc() {
  if (In) return et;
  In = 1, Object.defineProperty(et, "__esModule", { value: !0 }), et.DataIslandAppImpl = void 0;
  const e = Ui(), t = ec(), r = tc(), i = Ys(), n = Ii(), u = G(), s = rc(), o = Pi(), a = Or(), c = eo(), l = A(), d = qr(), f = kc(), h = cr(), p = mo(), _ = Xs(), m = Cc(), v = zi(), w = Ac(), b = vo(), g = qi(), x = Ic();
  class y extends c.DataIslandApp {
    constructor(C) {
      super(), this._host = e.DEFAULT_HOST, this._automaticDataCollectionEnabled = !0, this.resolve = (k) => this._registry.get(k), this.name = C, this._registry = new r.Registry(), this._disposable = new n.DisposableContainer(), this._context = new i.Context(this._registry, this._disposable.lifetime, this), this._registry.map(i.Context).asValue(this._context);
    }
    get context() {
      return this._context;
    }
    get credential() {
      var C;
      return (C = this.resolve(s.CredentialService)) === null || C === void 0 ? void 0 : C.credential;
    }
    set credential(C) {
      var k;
      (k = this.resolve(s.CredentialService)) === null || k === void 0 || k.useCredential(C);
    }
    get lifetime() {
      return this._disposable.lifetime;
    }
    get automaticDataCollectionEnabled() {
      return this._automaticDataCollectionEnabled;
    }
    get host() {
      return this._host;
    }
    get organizations() {
      var C;
      return (C = this.resolve(p.OrganizationService)) === null || C === void 0 ? void 0 : C.organizations;
    }
    get userProfile() {
      var C;
      return (C = this.resolve(h.UserProfileService)) === null || C === void 0 ? void 0 : C.userProfile;
    }
    get acquiring() {
      return this.resolve(b.AcquiringService).acquiring;
    }
    get libraries() {
      return this.resolve(g.LibrariesService).libraries;
    }
    get administration() {
      return this.resolve(x.AdministrationService);
    }
    async invalidate() {
      await this.context.execute(new f.StartCommand());
    }
    async initialize(C) {
      const k = new t.AppBuilderImplementation();
      k.registerCommand(f.StartCommand, (E) => new f.StartCommandHandler(E)), k.registerCommand(m.DeleteUserFullCommand, (E) => new m.DeleteUserFullCommandHandler(E)), k.registerService(v.CookieService, (E) => new v.CookieService(E)), k.registerService(s.CredentialService, (E) => new s.CredentialService(E)), k.registerService(o.MiddlewareService, (E) => new o.MiddlewareService(E)), k.registerService(l.RpcService, (E) => new l.RpcService(E, k.host)), k.registerService(d.CommandService, (E) => new d.CommandService(E)), k.registerService(h.UserProfileService, (E) => new h.UserProfileService(E)), k.registerService(p.OrganizationService, (E) => new p.OrganizationService(E)), k.registerService(w.AnonymousService, (E) => new w.AnonymousService(E)), k.registerService(b.AcquiringService, (E) => new b.AcquiringService(E)), k.registerService(g.LibrariesService, (E) => new g.LibrariesService(E)), k.registerService(x.AdministrationService, (E) => new x.AdministrationService(E)), C !== void 0 && await C(k), this._host = k.host, this._automaticDataCollectionEnabled = k.automaticDataCollectionEnabled;
      const Y = [];
      k.services.forEach((E) => {
        const R = new u.ServiceContext(this._context, this._disposable.defineNested()), oe = E[1](R);
        R.lifetime.addCallback(() => {
          R.onUnregister.call(oe);
        }, R), Y.push([R, oe]), this._registry.map(E[0]).asValue(oe);
      }), k.middlewares.forEach((E) => {
        var R;
        (R = this.resolve(o.MiddlewareService)) === null || R === void 0 || R.useMiddleware(E);
      }), k.commands.forEach((E) => {
        var R;
        (R = this.resolve(d.CommandService)) === null || R === void 0 || R.register(E[0], E[1]);
      });
      const ee = [];
      if (Y.forEach(([E, R]) => {
        typeof E.onRegister == "function" && ee.push(E.onRegister.call(R));
      }), await Promise.all(ee), ee.length = 0, Y.forEach(([E, R]) => {
        typeof E.onStart == "function" && ee.push(E.onStart.call(R));
      }), await Promise.all(ee), this.credential = k.credential, !(0, _.isUnitTest)(_.UnitTest.DO_NOT_START) && k.credential instanceof a.DefaultCredential) {
        const E = this.resolve(w.AnonymousService), { token: R, isValid: oe } = await E.getToken();
        oe && (this.credential = new a.AnonymousCredential(R));
      }
      (0, _.isUnitTest)(_.UnitTest.DO_NOT_START) || await this.context.execute(new f.StartCommand()), (0, _.isUnitTest)(_.UnitTest.DO_NOT_PRINT_INITIALIZED_LOG) || console.log(`DataIsland ${this.name} initialized`);
    }
  }
  return et.DataIslandAppImpl = y, et;
}
var On;
function qc() {
  if (On) return Ye;
  On = 1, Object.defineProperty(Ye, "__esModule", { value: !0 }), Ye._createApp = void 0;
  const e = Oc();
  async function t(r, i) {
    const n = new e.DataIslandAppImpl(r);
    return await n.initialize(i), n;
  }
  return Ye._createApp = t, Ye;
}
var Gr = {}, qn;
function zc() {
  return qn || (qn = 1, Object.defineProperty(Gr, "__esModule", { value: !0 })), Gr;
}
var Hr = {}, zn;
function Uc() {
  return zn || (zn = 1, Object.defineProperty(Hr, "__esModule", { value: !0 })), Hr;
}
var Jt = {}, Un;
function $n() {
  if (Un) return Jt;
  Un = 1, Object.defineProperty(Jt, "__esModule", { value: !0 }), Jt.OrderState = void 0;
  var e;
  return function(t) {
    t[t.Created = 0] = "Created", t[t.WaitingForPayment = 10] = "WaitingForPayment", t[t.Paid = 20] = "Paid", t[t.Cancelled = 30] = "Cancelled";
  }(e || (Jt.OrderState = e = {})), Jt;
}
var Wr = {}, Ln;
function $c() {
  return Ln || (Ln = 1, Object.defineProperty(Wr, "__esModule", { value: !0 })), Wr;
}
var Kt = {}, Tn;
function Mn() {
  if (Tn) return Kt;
  Tn = 1, Object.defineProperty(Kt, "__esModule", { value: !0 }), Kt.LimitActionType = void 0;
  var e;
  return function(t) {
    t[t.UploadFile = 0] = "UploadFile", t[t.CreateChat = 1] = "CreateChat", t[t.AskQuestion = 2] = "AskQuestion", t[t.CreateWorkspace = 3] = "CreateWorkspace", t[t.CreateOrganization = 4] = "CreateOrganization", t[t.FileSizeKb = 5] = "FileSizeKb";
  }(e || (Kt.LimitActionType = e = {})), Kt;
}
var Qr = {}, jn;
function Lc() {
  return jn || (jn = 1, Object.defineProperty(Qr, "__esModule", { value: !0 })), Qr;
}
var Vr = {}, Bn;
function Tc() {
  return Bn || (Bn = 1, Object.defineProperty(Vr, "__esModule", { value: !0 })), Vr;
}
var Zr = {}, Nn;
function Mc() {
  return Nn || (Nn = 1, Object.defineProperty(Zr, "__esModule", { value: !0 })), Zr;
}
var Jr = {}, Gn;
function jc() {
  return Gn || (Gn = 1, Object.defineProperty(Jr, "__esModule", { value: !0 })), Jr;
}
var Kr = {}, Hn;
function Bc() {
  return Hn || (Hn = 1, Object.defineProperty(Kr, "__esModule", { value: !0 })), Kr;
}
var Xr = {}, Wn;
function Nc() {
  return Wn || (Wn = 1, Object.defineProperty(Xr, "__esModule", { value: !0 })), Xr;
}
var Yr = {}, Qn;
function Gc() {
  return Qn || (Qn = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.isEmptyNullOrUndefined = e.isNullOrUndefined = void 0;
    const t = (i) => i == null;
    e.isNullOrUndefined = t;
    const r = (i) => (0, e.isNullOrUndefined)(i) || i === "";
    e.isEmptyNullOrUndefined = r;
  }(Yr)), Yr;
}
var Vn;
function Ui() {
  return Vn || (Vn = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.LibraryAdministration = e.dataIslandApp = e.dataIslandInstances = e.DEFAULT_HOST = e.DEFAULT_NAME = e.SDK_VERSION = e.LibraryFolder = e.LibraryParent = e.LibraryPage = e.Libraries = e.Library = e.LimitActionType = e.OrderState = e.isEmptyNullOrUndefined = e.isNullOrUndefined = e.AnswerEvent = e.Answer = e.GroupEvent = e.Group = e.FilesEvent = e.Files = e.File = e.WorkspacesEvent = e.Workspaces = e.OrganizationsEvent = e.Organizations = void 0;
    const t = Pa, r = Ya, i = qc();
    t.__exportStar(Ks(), e), t.__exportStar(Ys(), e), t.__exportStar(Or(), e), t.__exportStar(eo(), e), t.__exportStar(Ii(), e), t.__exportStar(zc(), e), t.__exportStar(Uc(), e), t.__exportStar($n(), e), t.__exportStar($c(), e), t.__exportStar(ao(), e), t.__exportStar(Mn(), e), t.__exportStar(Lc(), e), t.__exportStar(Tc(), e), t.__exportStar(ro(), e), t.__exportStar(Mc(), e), t.__exportStar(jc(), e), t.__exportStar(Bc(), e), t.__exportStar(_o(), e), t.__exportStar(T(), e), t.__exportStar(Nc(), e), t.__exportStar(_i(), e), t.__exportStar(oo(), e), t.__exportStar(co(), e), t.__exportStar(pi(), e), t.__exportStar(Er(), e), t.__exportStar(io(), e), t.__exportStar(no(), e), t.__exportStar(uo(), e), t.__exportStar(xr(), e), t.__exportStar(bo(), e), t.__exportStar(to(), e), t.__exportStar(hi(), e), t.__exportStar(mi(), e), t.__exportStar(bi(), e), t.__exportStar(gi(), e), t.__exportStar(po(), e), t.__exportStar(ho(), e);
    var n = xr();
    Object.defineProperty(e, "Organizations", { enumerable: !0, get: function() {
      return n.Organizations;
    } }), Object.defineProperty(e, "OrganizationsEvent", { enumerable: !0, get: function() {
      return n.OrganizationsEvent;
    } });
    var u = hi();
    Object.defineProperty(e, "Workspaces", { enumerable: !0, get: function() {
      return u.Workspaces;
    } }), Object.defineProperty(e, "WorkspacesEvent", { enumerable: !0, get: function() {
      return u.WorkspacesEvent;
    } });
    var s = pi();
    Object.defineProperty(e, "File", { enumerable: !0, get: function() {
      return s.File;
    } });
    var o = Er();
    Object.defineProperty(e, "Files", { enumerable: !0, get: function() {
      return o.Files;
    } }), Object.defineProperty(e, "FilesEvent", { enumerable: !0, get: function() {
      return o.FilesEvent;
    } });
    var a = so();
    Object.defineProperty(e, "Group", { enumerable: !0, get: function() {
      return a.Group;
    } }), Object.defineProperty(e, "GroupEvent", { enumerable: !0, get: function() {
      return a.GroupEvent;
    } });
    var c = _i();
    Object.defineProperty(e, "Answer", { enumerable: !0, get: function() {
      return c.Answer;
    } }), Object.defineProperty(e, "AnswerEvent", { enumerable: !0, get: function() {
      return c.AnswerEvent;
    } });
    var l = Gc();
    Object.defineProperty(e, "isNullOrUndefined", { enumerable: !0, get: function() {
      return l.isNullOrUndefined;
    } }), Object.defineProperty(e, "isEmptyNullOrUndefined", { enumerable: !0, get: function() {
      return l.isEmptyNullOrUndefined;
    } });
    var d = $n();
    Object.defineProperty(e, "OrderState", { enumerable: !0, get: function() {
      return d.OrderState;
    } });
    var f = Mn();
    Object.defineProperty(e, "LimitActionType", { enumerable: !0, get: function() {
      return f.LimitActionType;
    } });
    var h = mi();
    Object.defineProperty(e, "Library", { enumerable: !0, get: function() {
      return h.Library;
    } });
    var p = lo();
    Object.defineProperty(e, "Libraries", { enumerable: !0, get: function() {
      return p.Libraries;
    } });
    var _ = bi();
    Object.defineProperty(e, "LibraryPage", { enumerable: !0, get: function() {
      return _.LibraryPage;
    } }), Object.defineProperty(e, "LibraryParent", { enumerable: !0, get: function() {
      return _.LibraryParent;
    } });
    var m = gi();
    Object.defineProperty(e, "LibraryFolder", { enumerable: !0, get: function() {
      return m.LibraryFolder;
    } });
    const v = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map();
    e.SDK_VERSION = r.version, e.DEFAULT_NAME = "[DEFAULT]", e.DEFAULT_HOST = "https://api.dataisland.com.ua";
    function b() {
      return Array.from(w.values());
    }
    e.dataIslandInstances = b;
    async function g(y, S) {
      y = y ?? e.DEFAULT_NAME;
      let C = v.get(y);
      if (C === void 0)
        C = (0, i._createApp)(y, S), C.then((k) => {
          w.set(y ?? e.DEFAULT_NAME, k);
        }).catch((k) => {
          console.error(`Error: ${k}`), v.delete(y ?? e.DEFAULT_NAME);
        }), v.set(y, C);
      else if (S !== void 0)
        throw new Error(`DataIsland ${y} is initializing. You can't setup the same again.`);
      return await C;
    }
    e.dataIslandApp = g;
    var x = wo();
    Object.defineProperty(e, "LibraryAdministration", { enumerable: !0, get: function() {
      return x.LibraryAdministration;
    } });
  }(Nr)), Nr;
}
var ei, Zn;
function Hc() {
  return Zn || (Zn = 1, ei = Ui()), ei;
}
var ti = Hc(), yo = /* @__PURE__ */ ((e) => (e.Dataisland = "search", e.Gpt = "chat", e))(yo || {}), br = /* @__PURE__ */ ((e) => (e.userId = "dataisland-widget-userId", e))(br || {}), Xt = /* @__PURE__ */ ((e) => (e.initial = "initiak", e.new = "new", e))(Xt || {});
const Wc = se`
  .dataisland-widget-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
  }

  .dataisland-widget-header__title {
    flex-grow: 1;
    text-align: center;
    font-size: var(--dataisland-widget-header-title-font-size);
  }
  .dataisland-widget-header__inner {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    text-align: center;
    width: 100%;
    margin: 0;
    font-size: 1rem;
  }
  .dataisland-widget-header__button {
    border: none;
    background: none;
    text-decoration: underline;
    flex-grow: 0;
    flex-wrap: nowrap;
    cursor: pointer;
    color: var(--dataisland-widget-header-close-color);
    transition: var(--dataisland-widget-color-transition);
    font-size: var(--dataisland-widget-header-button-font-size);
  }
  .dataisland-widget-header__button:hover {
    color: var(--dataisland-widget-header-close-color-hover);
  }

  .dataisland-widget-header__close {
    color: var(--dataisland-widget-header-close-color);
    cursor: pointer;
    transition: color 0.2s ease-in-out;
  }
  .dataisland-widget-header__close:hover {
    color: var(--dataisland-widget-header-close-color-hover);
  }
`, xo = se`
  .dataisland-widget-chat-button {
    flex-grow: 1;
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .dataisland-widget-chat-button:hover {
    background-color: #0056b3;
  }
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vi = "lit-localize-status";
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qc = (e) => typeof e != "string" && "strTag" in e, Eo = (e, t, r) => {
  let i = e[0];
  for (let n = 1; n < e.length; n++)
    i += t[r ? r[n - 1] : n - 1], i += e[n];
  return i;
};
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ko = (e) => Qc(e) ? Eo(e.strings, e.values) : e;
let $e = ko, Jn = !1;
function Vc(e) {
  if (Jn)
    throw new Error("lit-localize can only be configured once");
  $e = e, Jn = !0;
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Zc {
  constructor(t) {
    this.__litLocalizeEventHandler = (r) => {
      r.detail.status === "ready" && this.host.requestUpdate();
    }, this.host = t;
  }
  hostConnected() {
    window.addEventListener(vi, this.__litLocalizeEventHandler);
  }
  hostDisconnected() {
    window.removeEventListener(vi, this.__litLocalizeEventHandler);
  }
}
const Jc = (e) => e.addController(new Zc(e)), Kc = Jc;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $i = () => (e, t) => (e.addInitializer(Kc), e);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Co {
  constructor() {
    this.settled = !1, this.promise = new Promise((t, r) => {
      this._resolve = t, this._reject = r;
    });
  }
  resolve(t) {
    this.settled = !0, this._resolve(t);
  }
  reject(t) {
    this.settled = !0, this._reject(t);
  }
}
/**
 * @license
 * Copyright 2014 Travis Webb
 * SPDX-License-Identifier: MIT
 */
const ne = [];
for (let e = 0; e < 256; e++)
  ne[e] = (e >> 4 & 15).toString(16) + (e & 15).toString(16);
function Xc(e) {
  let t = 0, r = 8997, i = 0, n = 33826, u = 0, s = 40164, o = 0, a = 52210;
  for (let c = 0; c < e.length; c++)
    r ^= e.charCodeAt(c), t = r * 435, i = n * 435, u = s * 435, o = a * 435, u += r << 8, o += n << 8, i += t >>> 16, r = t & 65535, u += i >>> 16, n = i & 65535, a = o + (u >>> 16) & 65535, s = u & 65535;
  return ne[a >> 8] + ne[a & 255] + ne[s >> 8] + ne[s & 255] + ne[n >> 8] + ne[n & 255] + ne[r >> 8] + ne[r & 255];
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Yc = "", e0 = "h", t0 = "s";
function r0(e, t) {
  return (t ? e0 : t0) + Xc(typeof e == "string" ? e : e.join(Yc));
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Kn = /* @__PURE__ */ new WeakMap(), Xn = /* @__PURE__ */ new Map();
function i0(e, t, r) {
  if (e) {
    const i = (r == null ? void 0 : r.id) ?? u0(t), n = e[i];
    if (n) {
      if (typeof n == "string")
        return n;
      if ("strTag" in n)
        return Eo(
          n.strings,
          // Cast `template` because its type wasn't automatically narrowed (but
          // we know it must be the same type as `localized`).
          t.values,
          n.values
        );
      {
        let u = Kn.get(n);
        return u === void 0 && (u = n.values, Kn.set(n, u)), {
          ...n,
          values: u.map((s) => t.values[s])
        };
      }
    }
  }
  return ko(t);
}
function u0(e) {
  const t = typeof e == "string" ? e : e.strings;
  let r = Xn.get(t);
  return r === void 0 && (r = r0(t, typeof e != "string" && !("strTag" in e)), Xn.set(t, r)), r;
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ri(e) {
  window.dispatchEvent(new CustomEvent(vi, { detail: e }));
}
let kr = "", ii, Ao, Cr, wi, Fo, ze = new Co();
ze.resolve();
let hr = 0;
const n0 = (e) => (Vc((t, r) => i0(Fo, t, r)), kr = Ao = e.sourceLocale, Cr = new Set(e.targetLocales), Cr.add(e.sourceLocale), wi = e.loadLocale, { getLocale: s0, setLocale: o0 }), s0 = () => kr, o0 = (e) => {
  if (e === (ii ?? kr))
    return ze.promise;
  if (!Cr || !wi)
    throw new Error("Internal error");
  if (!Cr.has(e))
    throw new Error("Invalid locale code");
  hr++;
  const t = hr;
  return ii = e, ze.settled && (ze = new Co()), ri({ status: "loading", loadingLocale: e }), (e === Ao ? (
    // We could switch to the source locale synchronously, but we prefer to
    // queue it on a microtask so that switching locales is consistently
    // asynchronous.
    Promise.resolve({ templates: void 0 })
  ) : wi(e)).then((i) => {
    hr === t && (kr = e, ii = void 0, Fo = i.templates, ri({ status: "ready", readyLocale: e }), ze.resolve());
  }, (i) => {
    hr === t && (ri({
      status: "error",
      errorLocale: e,
      errorMessage: i.toString()
    }), ze.reject(i));
  }), ze.promise;
};
var a0 = Object.defineProperty, c0 = Object.getOwnPropertyDescriptor, Li = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? c0(t, r) : t, u = e.length - 1, s; u >= 0; u--)
    (s = e[u]) && (n = (i ? s(t, r, n) : s(n)) || n);
  return i && n && a0(t, r, n), n;
};
let We = class extends W {
  constructor() {
    super(...arguments), this.title = "", this.showLastChatButton = !1;
  }
  render() {
    return U` <div class="dataisland-widget-header">
      <div class="dataisland-widget-header__inner">
        ${this.showLastChatButton ? U`
              <button
                class="dataisland-widget-header__button"
                @click="${() => this.dispatchEvent(new Event("last-chat"))}"
                title="Will revert to the previous chat"
              >
                ${$e("Back")}
              </button>
            ` : null}
        <h1 class="dataisland-widget-header__title">${this.title}</h1>
        <button
          class="dataisland-widget-header__button"
          @click="${() => this.dispatchEvent(new Event("new-chat"))}"
          title="The previous chat will be deleted after creating a new one"
        >
          ${$e("New chat")}
        </button>
      </div>

      <div
        class="dataisland-widget-header__close"
        @click="${() => this.dispatchEvent(new Event("toggle-chat"))}"
      >
        <svg
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.1667 5.83171C14.3048 5.96984 14.3824 6.15721 14.3824 6.35254C14.3824 6.54787 14.3048 6.73524 14.1667 6.87338L11.0417 9.99836L14.1667 13.1234C14.3048 13.2615 14.3824 13.4489 14.3824 13.6442C14.3824 13.8396 14.3048 14.0269 14.1667 14.165C14.0285 14.3032 13.8412 14.3808 13.6459 14.3808C13.4505 14.3808 13.2631 14.3032 13.125 14.165L10 11.04L6.87502 14.165C6.73684 14.3032 6.5495 14.3808 6.35418 14.3808C6.15882 14.3808 5.97147 14.3032 5.83335 14.165C5.69522 14.0269 5.61757 13.8396 5.61762 13.6442C5.61762 13.4489 5.69517 13.2615 5.83335 13.1234L8.95835 9.99836L5.83335 6.87336C5.69521 6.73522 5.61758 6.5479 5.61761 6.35252C5.6176 6.15719 5.69517 5.96987 5.83335 5.83169C5.97147 5.69356 6.1588 5.61599 6.35418 5.61596C6.54951 5.61598 6.73688 5.69355 6.87502 5.83169L10 8.95669L13.125 5.83171C13.2631 5.69358 13.4505 5.61599 13.6458 5.61598C13.8412 5.61596 14.0285 5.69359 14.1667 5.83171Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>`;
  }
};
We.styles = [xo, Wc];
Li([
  B({ type: String })
], We.prototype, "title", 2);
Li([
  B({ type: Boolean })
], We.prototype, "showLastChatButton", 2);
We = Li([
  $i()
], We);
customElements.define("chat-header", We);
const l0 = se`
  :host {
    --dataisland-widget-position-button: 20px;
  }

  .dataisland-widget-button {
    position: fixed;
    bottom: var(--dataisland-widget-position-button);
    right: 20px;
    /* background-color: #007bff; */
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
  }

  .dataisland-widget-button img {
    width: 90%;
  }

  .dataisland-widget-button:hover {
    background-color: #daecff;
  }
`;
var d0 = Object.defineProperty, f0 = (e, t, r, i) => {
  for (var n = void 0, u = e.length - 1, s; u >= 0; u--)
    (s = e[u]) && (n = s(t, r, n) || n);
  return n && d0(t, r, n), n;
};
const Zi = class Zi extends W {
  constructor() {
    super(...arguments), this.buttonImageUrl = "";
  }
  render() {
    return U`
      <button
        class="dataisland-widget-button"
        @click="${() => this.dispatchEvent(new Event("toggle-chat"))}"
      >
        <img src="${this.buttonImageUrl}" />
      </button>
    `;
  }
};
Zi.styles = l0;
let Ar = Zi;
f0([
  B({ type: String })
], Ar.prototype, "buttonImageUrl");
customElements.define("chat-button", Ar);
const h0 = se`
  .input-area {
    display: flex;
    align-items: center;
  }

  .input-area textarea {
    flex-grow: 2;
    padding: 10px;
    border-radius: var(--dataisland-widget-input-border-radius);
    border: 1px solid #ddd;
    margin-right: 10px;
    font-family: inherit;
    resize: none;
  }
`;
var p0 = Object.defineProperty, _0 = Object.getOwnPropertyDescriptor, Ti = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? _0(t, r) : t, u = e.length - 1, s; u >= 0; u--)
    (s = e[u]) && (n = (i ? s(t, r, n) : s(n)) || n);
  return i && n && p0(t, r, n), n;
};
let Qe = class extends W {
  constructor() {
    super(...arguments), this.message = "", this.isChatInitialised = !1;
  }
  handleInput(e) {
    this.message = e.target.value, this.dispatchEvent(
      new CustomEvent("message-input", { detail: this.message })
    );
  }
  handleKeyDown(e) {
    e.key === "Enter" && (e.shiftKey || e.ctrlKey || e.metaKey ? (e.preventDefault(), this.sendMessage()) : (e.preventDefault(), this.sendMessage()));
  }
  sendMessage() {
    this.dispatchEvent(new Event("send-message"));
  }
  render() {
    return U`
      <div class="input-area">
        ${this.isChatInitialised ? U`
              <textarea
                .value="${this.message}"
                @input="${this.handleInput}"
                @keydown="${this.handleKeyDown}"
                rows="1"
                placeholder="${$e("Ask any question...")}"
              ></textarea>
              <button
                class="dataisland-widget-chat-button"
                @click="${this.sendMessage}"
              >
                ${$e("Send")}
              </button>
            ` : U`
              <button
                class="dataisland-widget-chat-button"
                @click="${() => this.dispatchEvent(new Event("start-chat"))}"
              >
                ${$e("Get started")}
              </button>
            `}
      </div>
    `;
  }
};
Qe.styles = [h0, xo];
Ti([
  B({ type: String })
], Qe.prototype, "message", 2);
Ti([
  B({ type: Boolean })
], Qe.prototype, "isChatInitialised", 2);
Qe = Ti([
  $i()
], Qe);
customElements.define("chat-input", Qe);
const m0 = se`
  :host {
    flex-grow: 1;
    overflow-y: hidden;

    p {
      margin: 0;
    }

    --padding: 10px;
  }

  .messages {
    display: flex;
    flex-direction: column;
    height: calc(100% - (var(--input-height)) + var(--padding));
    height: calc(100% - 27px);
    gap: 10px;
    padding: var(--padding);
    border-radius: var(--dataisland-widget-inner-border-radius);
    background-color: #f3f4f6;
    overflow-y: scroll;
    font-size: var(--dataisland-widget-messages-font-size);

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  .messages::-webkit-scrollbar {
    display: none;
  }

  .messages__item {
    position: relative;
    padding: 0.3rem;
    border-radius: 10px 0 10px 10px;
    white-space: normal;
    background: #fff;
    margin-right: auto;
  }
  .messages__item:nth-child(odd) {
    justify-content: flex-end;
    margin-left: auto;
    margin-right: 0;
  }
  .dataisland-widget__placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .dataisland-widget__placeholder-img {
    width: 50px;
  }
`, Yn = {};
function b0(e) {
  let t = Yn[e];
  if (t)
    return t;
  t = Yn[e] = [];
  for (let r = 0; r < 128; r++) {
    const i = String.fromCharCode(r);
    t.push(i);
  }
  for (let r = 0; r < e.length; r++) {
    const i = e.charCodeAt(r);
    t[i] = "%" + ("0" + i.toString(16).toUpperCase()).slice(-2);
  }
  return t;
}
function Ve(e, t) {
  typeof t != "string" && (t = Ve.defaultChars);
  const r = b0(t);
  return e.replace(/(%[a-f0-9]{2})+/gi, function(i) {
    let n = "";
    for (let u = 0, s = i.length; u < s; u += 3) {
      const o = parseInt(i.slice(u + 1, u + 3), 16);
      if (o < 128) {
        n += r[o];
        continue;
      }
      if ((o & 224) === 192 && u + 3 < s) {
        const a = parseInt(i.slice(u + 4, u + 6), 16);
        if ((a & 192) === 128) {
          const c = o << 6 & 1984 | a & 63;
          c < 128 ? n += "��" : n += String.fromCharCode(c), u += 3;
          continue;
        }
      }
      if ((o & 240) === 224 && u + 6 < s) {
        const a = parseInt(i.slice(u + 4, u + 6), 16), c = parseInt(i.slice(u + 7, u + 9), 16);
        if ((a & 192) === 128 && (c & 192) === 128) {
          const l = o << 12 & 61440 | a << 6 & 4032 | c & 63;
          l < 2048 || l >= 55296 && l <= 57343 ? n += "���" : n += String.fromCharCode(l), u += 6;
          continue;
        }
      }
      if ((o & 248) === 240 && u + 9 < s) {
        const a = parseInt(i.slice(u + 4, u + 6), 16), c = parseInt(i.slice(u + 7, u + 9), 16), l = parseInt(i.slice(u + 10, u + 12), 16);
        if ((a & 192) === 128 && (c & 192) === 128 && (l & 192) === 128) {
          let d = o << 18 & 1835008 | a << 12 & 258048 | c << 6 & 4032 | l & 63;
          d < 65536 || d > 1114111 ? n += "����" : (d -= 65536, n += String.fromCharCode(55296 + (d >> 10), 56320 + (d & 1023))), u += 9;
          continue;
        }
      }
      n += "�";
    }
    return n;
  });
}
Ve.defaultChars = ";/?:@&=+$,#";
Ve.componentChars = "";
const es = {};
function g0(e) {
  let t = es[e];
  if (t)
    return t;
  t = es[e] = [];
  for (let r = 0; r < 128; r++) {
    const i = String.fromCharCode(r);
    /^[0-9a-z]$/i.test(i) ? t.push(i) : t.push("%" + ("0" + r.toString(16).toUpperCase()).slice(-2));
  }
  for (let r = 0; r < e.length; r++)
    t[e.charCodeAt(r)] = e[r];
  return t;
}
function lr(e, t, r) {
  typeof t != "string" && (r = t, t = lr.defaultChars), typeof r > "u" && (r = !0);
  const i = g0(t);
  let n = "";
  for (let u = 0, s = e.length; u < s; u++) {
    const o = e.charCodeAt(u);
    if (r && o === 37 && u + 2 < s && /^[0-9a-f]{2}$/i.test(e.slice(u + 1, u + 3))) {
      n += e.slice(u, u + 3), u += 2;
      continue;
    }
    if (o < 128) {
      n += i[o];
      continue;
    }
    if (o >= 55296 && o <= 57343) {
      if (o >= 55296 && o <= 56319 && u + 1 < s) {
        const a = e.charCodeAt(u + 1);
        if (a >= 56320 && a <= 57343) {
          n += encodeURIComponent(e[u] + e[u + 1]), u++;
          continue;
        }
      }
      n += "%EF%BF%BD";
      continue;
    }
    n += encodeURIComponent(e[u]);
  }
  return n;
}
lr.defaultChars = ";/?:@&=+$,-_.!~*'()#";
lr.componentChars = "-_.!~*'()";
function Mi(e) {
  let t = "";
  return t += e.protocol || "", t += e.slashes ? "//" : "", t += e.auth ? e.auth + "@" : "", e.hostname && e.hostname.indexOf(":") !== -1 ? t += "[" + e.hostname + "]" : t += e.hostname || "", t += e.port ? ":" + e.port : "", t += e.pathname || "", t += e.search || "", t += e.hash || "", t;
}
function Fr() {
  this.protocol = null, this.slashes = null, this.auth = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.pathname = null;
}
const v0 = /^([a-z0-9.+-]+:)/i, w0 = /:[0-9]*$/, y0 = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, x0 = ["<", ">", '"', "`", " ", "\r", `
`, "	"], E0 = ["{", "}", "|", "\\", "^", "`"].concat(x0), k0 = ["'"].concat(E0), ts = ["%", "/", "?", ";", "#"].concat(k0), rs = ["/", "?", "#"], C0 = 255, is = /^[+a-z0-9A-Z_-]{0,63}$/, A0 = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, us = {
  javascript: !0,
  "javascript:": !0
}, ns = {
  http: !0,
  https: !0,
  ftp: !0,
  gopher: !0,
  file: !0,
  "http:": !0,
  "https:": !0,
  "ftp:": !0,
  "gopher:": !0,
  "file:": !0
};
function ji(e, t) {
  if (e && e instanceof Fr) return e;
  const r = new Fr();
  return r.parse(e, t), r;
}
Fr.prototype.parse = function(e, t) {
  let r, i, n, u = e;
  if (u = u.trim(), !t && e.split("#").length === 1) {
    const c = y0.exec(u);
    if (c)
      return this.pathname = c[1], c[2] && (this.search = c[2]), this;
  }
  let s = v0.exec(u);
  if (s && (s = s[0], r = s.toLowerCase(), this.protocol = s, u = u.substr(s.length)), (t || s || u.match(/^\/\/[^@\/]+@[^@\/]+/)) && (n = u.substr(0, 2) === "//", n && !(s && us[s]) && (u = u.substr(2), this.slashes = !0)), !us[s] && (n || s && !ns[s])) {
    let c = -1;
    for (let p = 0; p < rs.length; p++)
      i = u.indexOf(rs[p]), i !== -1 && (c === -1 || i < c) && (c = i);
    let l, d;
    c === -1 ? d = u.lastIndexOf("@") : d = u.lastIndexOf("@", c), d !== -1 && (l = u.slice(0, d), u = u.slice(d + 1), this.auth = l), c = -1;
    for (let p = 0; p < ts.length; p++)
      i = u.indexOf(ts[p]), i !== -1 && (c === -1 || i < c) && (c = i);
    c === -1 && (c = u.length), u[c - 1] === ":" && c--;
    const f = u.slice(0, c);
    u = u.slice(c), this.parseHost(f), this.hostname = this.hostname || "";
    const h = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!h) {
      const p = this.hostname.split(/\./);
      for (let _ = 0, m = p.length; _ < m; _++) {
        const v = p[_];
        if (v && !v.match(is)) {
          let w = "";
          for (let b = 0, g = v.length; b < g; b++)
            v.charCodeAt(b) > 127 ? w += "x" : w += v[b];
          if (!w.match(is)) {
            const b = p.slice(0, _), g = p.slice(_ + 1), x = v.match(A0);
            x && (b.push(x[1]), g.unshift(x[2])), g.length && (u = g.join(".") + u), this.hostname = b.join(".");
            break;
          }
        }
      }
    }
    this.hostname.length > C0 && (this.hostname = ""), h && (this.hostname = this.hostname.substr(1, this.hostname.length - 2));
  }
  const o = u.indexOf("#");
  o !== -1 && (this.hash = u.substr(o), u = u.slice(0, o));
  const a = u.indexOf("?");
  return a !== -1 && (this.search = u.substr(a), u = u.slice(0, a)), u && (this.pathname = u), ns[r] && this.hostname && !this.pathname && (this.pathname = ""), this;
};
Fr.prototype.parseHost = function(e) {
  let t = w0.exec(e);
  t && (t = t[0], t !== ":" && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), e && (this.hostname = e);
};
const F0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: Ve,
  encode: lr,
  format: Mi,
  parse: ji
}, Symbol.toStringTag, { value: "Module" })), Do = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, So = /[\0-\x1F\x7F-\x9F]/, D0 = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/, Bi = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/, Ro = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/, Po = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/, S0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Any: Do,
  Cc: So,
  Cf: D0,
  P: Bi,
  S: Ro,
  Z: Po
}, Symbol.toStringTag, { value: "Module" })), R0 = new Uint16Array(
  // prettier-ignore
  'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((e) => e.charCodeAt(0))
), P0 = new Uint16Array(
  // prettier-ignore
  "Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map((e) => e.charCodeAt(0))
);
var ui;
const I0 = /* @__PURE__ */ new Map([
  [0, 65533],
  // C1 Unicode control character reference replacements
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]), O0 = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
  (ui = String.fromCodePoint) !== null && ui !== void 0 ? ui : function(e) {
    let t = "";
    return e > 65535 && (e -= 65536, t += String.fromCharCode(e >>> 10 & 1023 | 55296), e = 56320 | e & 1023), t += String.fromCharCode(e), t;
  }
);
function q0(e) {
  var t;
  return e >= 55296 && e <= 57343 || e > 1114111 ? 65533 : (t = I0.get(e)) !== null && t !== void 0 ? t : e;
}
var O;
(function(e) {
  e[e.NUM = 35] = "NUM", e[e.SEMI = 59] = "SEMI", e[e.EQUALS = 61] = "EQUALS", e[e.ZERO = 48] = "ZERO", e[e.NINE = 57] = "NINE", e[e.LOWER_A = 97] = "LOWER_A", e[e.LOWER_F = 102] = "LOWER_F", e[e.LOWER_X = 120] = "LOWER_X", e[e.LOWER_Z = 122] = "LOWER_Z", e[e.UPPER_A = 65] = "UPPER_A", e[e.UPPER_F = 70] = "UPPER_F", e[e.UPPER_Z = 90] = "UPPER_Z";
})(O || (O = {}));
const z0 = 32;
var de;
(function(e) {
  e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH", e[e.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", e[e.JUMP_TABLE = 127] = "JUMP_TABLE";
})(de || (de = {}));
function yi(e) {
  return e >= O.ZERO && e <= O.NINE;
}
function U0(e) {
  return e >= O.UPPER_A && e <= O.UPPER_F || e >= O.LOWER_A && e <= O.LOWER_F;
}
function $0(e) {
  return e >= O.UPPER_A && e <= O.UPPER_Z || e >= O.LOWER_A && e <= O.LOWER_Z || yi(e);
}
function L0(e) {
  return e === O.EQUALS || $0(e);
}
var I;
(function(e) {
  e[e.EntityStart = 0] = "EntityStart", e[e.NumericStart = 1] = "NumericStart", e[e.NumericDecimal = 2] = "NumericDecimal", e[e.NumericHex = 3] = "NumericHex", e[e.NamedEntity = 4] = "NamedEntity";
})(I || (I = {}));
var le;
(function(e) {
  e[e.Legacy = 0] = "Legacy", e[e.Strict = 1] = "Strict", e[e.Attribute = 2] = "Attribute";
})(le || (le = {}));
class T0 {
  constructor(t, r, i) {
    this.decodeTree = t, this.emitCodePoint = r, this.errors = i, this.state = I.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = le.Strict;
  }
  /** Resets the instance to make it reusable. */
  startEntity(t) {
    this.decodeMode = t, this.state = I.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
  }
  /**
   * Write an entity to the decoder. This can be called multiple times with partial entities.
   * If the entity is incomplete, the decoder will return -1.
   *
   * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
   * entity is incomplete, and resume when the next string is written.
   *
   * @param string The string containing the entity (or a continuation of the entity).
   * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  write(t, r) {
    switch (this.state) {
      case I.EntityStart:
        return t.charCodeAt(r) === O.NUM ? (this.state = I.NumericStart, this.consumed += 1, this.stateNumericStart(t, r + 1)) : (this.state = I.NamedEntity, this.stateNamedEntity(t, r));
      case I.NumericStart:
        return this.stateNumericStart(t, r);
      case I.NumericDecimal:
        return this.stateNumericDecimal(t, r);
      case I.NumericHex:
        return this.stateNumericHex(t, r);
      case I.NamedEntity:
        return this.stateNamedEntity(t, r);
    }
  }
  /**
   * Switches between the numeric decimal and hexadecimal states.
   *
   * Equivalent to the `Numeric character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericStart(t, r) {
    return r >= t.length ? -1 : (t.charCodeAt(r) | z0) === O.LOWER_X ? (this.state = I.NumericHex, this.consumed += 1, this.stateNumericHex(t, r + 1)) : (this.state = I.NumericDecimal, this.stateNumericDecimal(t, r));
  }
  addToNumericResult(t, r, i, n) {
    if (r !== i) {
      const u = i - r;
      this.result = this.result * Math.pow(n, u) + parseInt(t.substr(r, u), n), this.consumed += u;
    }
  }
  /**
   * Parses a hexadecimal numeric entity.
   *
   * Equivalent to the `Hexademical character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericHex(t, r) {
    const i = r;
    for (; r < t.length; ) {
      const n = t.charCodeAt(r);
      if (yi(n) || U0(n))
        r += 1;
      else
        return this.addToNumericResult(t, i, r, 16), this.emitNumericEntity(n, 3);
    }
    return this.addToNumericResult(t, i, r, 16), -1;
  }
  /**
   * Parses a decimal numeric entity.
   *
   * Equivalent to the `Decimal character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericDecimal(t, r) {
    const i = r;
    for (; r < t.length; ) {
      const n = t.charCodeAt(r);
      if (yi(n))
        r += 1;
      else
        return this.addToNumericResult(t, i, r, 10), this.emitNumericEntity(n, 2);
    }
    return this.addToNumericResult(t, i, r, 10), -1;
  }
  /**
   * Validate and emit a numeric entity.
   *
   * Implements the logic from the `Hexademical character reference start
   * state` and `Numeric character reference end state` in the HTML spec.
   *
   * @param lastCp The last code point of the entity. Used to see if the
   *               entity was terminated with a semicolon.
   * @param expectedLength The minimum number of characters that should be
   *                       consumed. Used to validate that at least one digit
   *                       was consumed.
   * @returns The number of characters that were consumed.
   */
  emitNumericEntity(t, r) {
    var i;
    if (this.consumed <= r)
      return (i = this.errors) === null || i === void 0 || i.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
    if (t === O.SEMI)
      this.consumed += 1;
    else if (this.decodeMode === le.Strict)
      return 0;
    return this.emitCodePoint(q0(this.result), this.consumed), this.errors && (t !== O.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
  }
  /**
   * Parses a named entity.
   *
   * Equivalent to the `Named character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNamedEntity(t, r) {
    const { decodeTree: i } = this;
    let n = i[this.treeIndex], u = (n & de.VALUE_LENGTH) >> 14;
    for (; r < t.length; r++, this.excess++) {
      const s = t.charCodeAt(r);
      if (this.treeIndex = M0(i, n, this.treeIndex + Math.max(1, u), s), this.treeIndex < 0)
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === le.Attribute && // We shouldn't have consumed any characters after the entity,
        (u === 0 || // And there should be no invalid characters.
        L0(s)) ? 0 : this.emitNotTerminatedNamedEntity();
      if (n = i[this.treeIndex], u = (n & de.VALUE_LENGTH) >> 14, u !== 0) {
        if (s === O.SEMI)
          return this.emitNamedEntityData(this.treeIndex, u, this.consumed + this.excess);
        this.decodeMode !== le.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
      }
    }
    return -1;
  }
  /**
   * Emit a named entity that was not terminated with a semicolon.
   *
   * @returns The number of characters consumed.
   */
  emitNotTerminatedNamedEntity() {
    var t;
    const { result: r, decodeTree: i } = this, n = (i[r] & de.VALUE_LENGTH) >> 14;
    return this.emitNamedEntityData(r, n, this.consumed), (t = this.errors) === null || t === void 0 || t.missingSemicolonAfterCharacterReference(), this.consumed;
  }
  /**
   * Emit a named entity.
   *
   * @param result The index of the entity in the decode tree.
   * @param valueLength The number of bytes in the entity.
   * @param consumed The number of characters consumed.
   *
   * @returns The number of characters consumed.
   */
  emitNamedEntityData(t, r, i) {
    const { decodeTree: n } = this;
    return this.emitCodePoint(r === 1 ? n[t] & ~de.VALUE_LENGTH : n[t + 1], i), r === 3 && this.emitCodePoint(n[t + 2], i), i;
  }
  /**
   * Signal to the parser that the end of the input was reached.
   *
   * Remaining data will be emitted and relevant errors will be produced.
   *
   * @returns The number of characters consumed.
   */
  end() {
    var t;
    switch (this.state) {
      case I.NamedEntity:
        return this.result !== 0 && (this.decodeMode !== le.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      // Otherwise, emit a numeric entity if we have one.
      case I.NumericDecimal:
        return this.emitNumericEntity(0, 2);
      case I.NumericHex:
        return this.emitNumericEntity(0, 3);
      case I.NumericStart:
        return (t = this.errors) === null || t === void 0 || t.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
      case I.EntityStart:
        return 0;
    }
  }
}
function Io(e) {
  let t = "";
  const r = new T0(e, (i) => t += O0(i));
  return function(n, u) {
    let s = 0, o = 0;
    for (; (o = n.indexOf("&", o)) >= 0; ) {
      t += n.slice(s, o), r.startEntity(u);
      const c = r.write(
        n,
        // Skip the "&"
        o + 1
      );
      if (c < 0) {
        s = o + r.end();
        break;
      }
      s = o + c, o = c === 0 ? s + 1 : s;
    }
    const a = t + n.slice(s);
    return t = "", a;
  };
}
function M0(e, t, r, i) {
  const n = (t & de.BRANCH_LENGTH) >> 7, u = t & de.JUMP_TABLE;
  if (n === 0)
    return u !== 0 && i === u ? r : -1;
  if (u) {
    const a = i - u;
    return a < 0 || a >= n ? -1 : e[r + a] - 1;
  }
  let s = r, o = s + n - 1;
  for (; s <= o; ) {
    const a = s + o >>> 1, c = e[a];
    if (c < i)
      s = a + 1;
    else if (c > i)
      o = a - 1;
    else
      return e[a + n];
  }
  return -1;
}
const j0 = Io(R0);
Io(P0);
function Oo(e, t = le.Legacy) {
  return j0(e, t);
}
function B0(e) {
  return Object.prototype.toString.call(e);
}
function Ni(e) {
  return B0(e) === "[object String]";
}
const N0 = Object.prototype.hasOwnProperty;
function G0(e, t) {
  return N0.call(e, t);
}
function zr(e) {
  return Array.prototype.slice.call(arguments, 1).forEach(function(r) {
    if (r) {
      if (typeof r != "object")
        throw new TypeError(r + "must be object");
      Object.keys(r).forEach(function(i) {
        e[i] = r[i];
      });
    }
  }), e;
}
function qo(e, t, r) {
  return [].concat(e.slice(0, t), r, e.slice(t + 1));
}
function Gi(e) {
  return !(e >= 55296 && e <= 57343 || e >= 64976 && e <= 65007 || (e & 65535) === 65535 || (e & 65535) === 65534 || e >= 0 && e <= 8 || e === 11 || e >= 14 && e <= 31 || e >= 127 && e <= 159 || e > 1114111);
}
function Dr(e) {
  if (e > 65535) {
    e -= 65536;
    const t = 55296 + (e >> 10), r = 56320 + (e & 1023);
    return String.fromCharCode(t, r);
  }
  return String.fromCharCode(e);
}
const zo = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g, H0 = /&([a-z#][a-z0-9]{1,31});/gi, W0 = new RegExp(zo.source + "|" + H0.source, "gi"), Q0 = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;
function V0(e, t) {
  if (t.charCodeAt(0) === 35 && Q0.test(t)) {
    const i = t[1].toLowerCase() === "x" ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10);
    return Gi(i) ? Dr(i) : e;
  }
  const r = Oo(e);
  return r !== e ? r : e;
}
function Z0(e) {
  return e.indexOf("\\") < 0 ? e : e.replace(zo, "$1");
}
function Ze(e) {
  return e.indexOf("\\") < 0 && e.indexOf("&") < 0 ? e : e.replace(W0, function(t, r, i) {
    return r || V0(t, i);
  });
}
const J0 = /[&<>"]/, K0 = /[&<>"]/g, X0 = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function Y0(e) {
  return X0[e];
}
function he(e) {
  return J0.test(e) ? e.replace(K0, Y0) : e;
}
const el = /[.?*+^$[\]\\(){}|-]/g;
function tl(e) {
  return e.replace(el, "\\$&");
}
function F(e) {
  switch (e) {
    case 9:
    case 32:
      return !0;
  }
  return !1;
}
function ur(e) {
  if (e >= 8192 && e <= 8202)
    return !0;
  switch (e) {
    case 9:
    // \t
    case 10:
    // \n
    case 11:
    // \v
    case 12:
    // \f
    case 13:
    // \r
    case 32:
    case 160:
    case 5760:
    case 8239:
    case 8287:
    case 12288:
      return !0;
  }
  return !1;
}
function nr(e) {
  return Bi.test(e) || Ro.test(e);
}
function sr(e) {
  switch (e) {
    case 33:
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
    case 39:
    case 40:
    case 41:
    case 42:
    case 43:
    case 44:
    case 45:
    case 46:
    case 47:
    case 58:
    case 59:
    case 60:
    case 61:
    case 62:
    case 63:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 124:
    case 125:
    case 126:
      return !0;
    default:
      return !1;
  }
}
function Ur(e) {
  return e = e.trim().replace(/\s+/g, " "), "ẞ".toLowerCase() === "Ṿ" && (e = e.replace(/ẞ/g, "ß")), e.toLowerCase().toUpperCase();
}
const rl = { mdurl: F0, ucmicro: S0 }, il = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  arrayReplaceAt: qo,
  assign: zr,
  escapeHtml: he,
  escapeRE: tl,
  fromCodePoint: Dr,
  has: G0,
  isMdAsciiPunct: sr,
  isPunctChar: nr,
  isSpace: F,
  isString: Ni,
  isValidEntityCode: Gi,
  isWhiteSpace: ur,
  lib: rl,
  normalizeReference: Ur,
  unescapeAll: Ze,
  unescapeMd: Z0
}, Symbol.toStringTag, { value: "Module" }));
function ul(e, t, r) {
  let i, n, u, s;
  const o = e.posMax, a = e.pos;
  for (e.pos = t + 1, i = 1; e.pos < o; ) {
    if (u = e.src.charCodeAt(e.pos), u === 93 && (i--, i === 0)) {
      n = !0;
      break;
    }
    if (s = e.pos, e.md.inline.skipToken(e), u === 91) {
      if (s === e.pos - 1)
        i++;
      else if (r)
        return e.pos = a, -1;
    }
  }
  let c = -1;
  return n && (c = e.pos), e.pos = a, c;
}
function nl(e, t, r) {
  let i, n = t;
  const u = {
    ok: !1,
    pos: 0,
    str: ""
  };
  if (e.charCodeAt(n) === 60) {
    for (n++; n < r; ) {
      if (i = e.charCodeAt(n), i === 10 || i === 60)
        return u;
      if (i === 62)
        return u.pos = n + 1, u.str = Ze(e.slice(t + 1, n)), u.ok = !0, u;
      if (i === 92 && n + 1 < r) {
        n += 2;
        continue;
      }
      n++;
    }
    return u;
  }
  let s = 0;
  for (; n < r && (i = e.charCodeAt(n), !(i === 32 || i < 32 || i === 127)); ) {
    if (i === 92 && n + 1 < r) {
      if (e.charCodeAt(n + 1) === 32)
        break;
      n += 2;
      continue;
    }
    if (i === 40 && (s++, s > 32))
      return u;
    if (i === 41) {
      if (s === 0)
        break;
      s--;
    }
    n++;
  }
  return t === n || s !== 0 || (u.str = Ze(e.slice(t, n)), u.pos = n, u.ok = !0), u;
}
function sl(e, t, r, i) {
  let n, u = t;
  const s = {
    // if `true`, this is a valid link title
    ok: !1,
    // if `true`, this link can be continued on the next line
    can_continue: !1,
    // if `ok`, it's the position of the first character after the closing marker
    pos: 0,
    // if `ok`, it's the unescaped title
    str: "",
    // expected closing marker character code
    marker: 0
  };
  if (i)
    s.str = i.str, s.marker = i.marker;
  else {
    if (u >= r)
      return s;
    let o = e.charCodeAt(u);
    if (o !== 34 && o !== 39 && o !== 40)
      return s;
    t++, u++, o === 40 && (o = 41), s.marker = o;
  }
  for (; u < r; ) {
    if (n = e.charCodeAt(u), n === s.marker)
      return s.pos = u + 1, s.str += Ze(e.slice(t, u)), s.ok = !0, s;
    if (n === 40 && s.marker === 41)
      return s;
    n === 92 && u + 1 < r && u++, u++;
  }
  return s.can_continue = !0, s.str += Ze(e.slice(t, u)), s;
}
const ol = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  parseLinkDestination: nl,
  parseLinkLabel: ul,
  parseLinkTitle: sl
}, Symbol.toStringTag, { value: "Module" })), K = {};
K.code_inline = function(e, t, r, i, n) {
  const u = e[t];
  return "<code" + n.renderAttrs(u) + ">" + he(u.content) + "</code>";
};
K.code_block = function(e, t, r, i, n) {
  const u = e[t];
  return "<pre" + n.renderAttrs(u) + "><code>" + he(e[t].content) + `</code></pre>
`;
};
K.fence = function(e, t, r, i, n) {
  const u = e[t], s = u.info ? Ze(u.info).trim() : "";
  let o = "", a = "";
  if (s) {
    const l = s.split(/(\s+)/g);
    o = l[0], a = l.slice(2).join("");
  }
  let c;
  if (r.highlight ? c = r.highlight(u.content, o, a) || he(u.content) : c = he(u.content), c.indexOf("<pre") === 0)
    return c + `
`;
  if (s) {
    const l = u.attrIndex("class"), d = u.attrs ? u.attrs.slice() : [];
    l < 0 ? d.push(["class", r.langPrefix + o]) : (d[l] = d[l].slice(), d[l][1] += " " + r.langPrefix + o);
    const f = {
      attrs: d
    };
    return `<pre><code${n.renderAttrs(f)}>${c}</code></pre>
`;
  }
  return `<pre><code${n.renderAttrs(u)}>${c}</code></pre>
`;
};
K.image = function(e, t, r, i, n) {
  const u = e[t];
  return u.attrs[u.attrIndex("alt")][1] = n.renderInlineAsText(u.children, r, i), n.renderToken(e, t, r);
};
K.hardbreak = function(e, t, r) {
  return r.xhtmlOut ? `<br />
` : `<br>
`;
};
K.softbreak = function(e, t, r) {
  return r.breaks ? r.xhtmlOut ? `<br />
` : `<br>
` : `
`;
};
K.text = function(e, t) {
  return he(e[t].content);
};
K.html_block = function(e, t) {
  return e[t].content;
};
K.html_inline = function(e, t) {
  return e[t].content;
};
function Ke() {
  this.rules = zr({}, K);
}
Ke.prototype.renderAttrs = function(t) {
  let r, i, n;
  if (!t.attrs)
    return "";
  for (n = "", r = 0, i = t.attrs.length; r < i; r++)
    n += " " + he(t.attrs[r][0]) + '="' + he(t.attrs[r][1]) + '"';
  return n;
};
Ke.prototype.renderToken = function(t, r, i) {
  const n = t[r];
  let u = "";
  if (n.hidden)
    return "";
  n.block && n.nesting !== -1 && r && t[r - 1].hidden && (u += `
`), u += (n.nesting === -1 ? "</" : "<") + n.tag, u += this.renderAttrs(n), n.nesting === 0 && i.xhtmlOut && (u += " /");
  let s = !1;
  if (n.block && (s = !0, n.nesting === 1 && r + 1 < t.length)) {
    const o = t[r + 1];
    (o.type === "inline" || o.hidden || o.nesting === -1 && o.tag === n.tag) && (s = !1);
  }
  return u += s ? `>
` : ">", u;
};
Ke.prototype.renderInline = function(e, t, r) {
  let i = "";
  const n = this.rules;
  for (let u = 0, s = e.length; u < s; u++) {
    const o = e[u].type;
    typeof n[o] < "u" ? i += n[o](e, u, t, r, this) : i += this.renderToken(e, u, t);
  }
  return i;
};
Ke.prototype.renderInlineAsText = function(e, t, r) {
  let i = "";
  for (let n = 0, u = e.length; n < u; n++)
    switch (e[n].type) {
      case "text":
        i += e[n].content;
        break;
      case "image":
        i += this.renderInlineAsText(e[n].children, t, r);
        break;
      case "html_inline":
      case "html_block":
        i += e[n].content;
        break;
      case "softbreak":
      case "hardbreak":
        i += `
`;
        break;
    }
  return i;
};
Ke.prototype.render = function(e, t, r) {
  let i = "";
  const n = this.rules;
  for (let u = 0, s = e.length; u < s; u++) {
    const o = e[u].type;
    o === "inline" ? i += this.renderInline(e[u].children, t, r) : typeof n[o] < "u" ? i += n[o](e, u, t, r, this) : i += this.renderToken(e, u, t, r);
  }
  return i;
};
function L() {
  this.__rules__ = [], this.__cache__ = null;
}
L.prototype.__find__ = function(e) {
  for (let t = 0; t < this.__rules__.length; t++)
    if (this.__rules__[t].name === e)
      return t;
  return -1;
};
L.prototype.__compile__ = function() {
  const e = this, t = [""];
  e.__rules__.forEach(function(r) {
    r.enabled && r.alt.forEach(function(i) {
      t.indexOf(i) < 0 && t.push(i);
    });
  }), e.__cache__ = {}, t.forEach(function(r) {
    e.__cache__[r] = [], e.__rules__.forEach(function(i) {
      i.enabled && (r && i.alt.indexOf(r) < 0 || e.__cache__[r].push(i.fn));
    });
  });
};
L.prototype.at = function(e, t, r) {
  const i = this.__find__(e), n = r || {};
  if (i === -1)
    throw new Error("Parser rule not found: " + e);
  this.__rules__[i].fn = t, this.__rules__[i].alt = n.alt || [], this.__cache__ = null;
};
L.prototype.before = function(e, t, r, i) {
  const n = this.__find__(e), u = i || {};
  if (n === -1)
    throw new Error("Parser rule not found: " + e);
  this.__rules__.splice(n, 0, {
    name: t,
    enabled: !0,
    fn: r,
    alt: u.alt || []
  }), this.__cache__ = null;
};
L.prototype.after = function(e, t, r, i) {
  const n = this.__find__(e), u = i || {};
  if (n === -1)
    throw new Error("Parser rule not found: " + e);
  this.__rules__.splice(n + 1, 0, {
    name: t,
    enabled: !0,
    fn: r,
    alt: u.alt || []
  }), this.__cache__ = null;
};
L.prototype.push = function(e, t, r) {
  const i = r || {};
  this.__rules__.push({
    name: e,
    enabled: !0,
    fn: t,
    alt: i.alt || []
  }), this.__cache__ = null;
};
L.prototype.enable = function(e, t) {
  Array.isArray(e) || (e = [e]);
  const r = [];
  return e.forEach(function(i) {
    const n = this.__find__(i);
    if (n < 0) {
      if (t)
        return;
      throw new Error("Rules manager: invalid rule name " + i);
    }
    this.__rules__[n].enabled = !0, r.push(i);
  }, this), this.__cache__ = null, r;
};
L.prototype.enableOnly = function(e, t) {
  Array.isArray(e) || (e = [e]), this.__rules__.forEach(function(r) {
    r.enabled = !1;
  }), this.enable(e, t);
};
L.prototype.disable = function(e, t) {
  Array.isArray(e) || (e = [e]);
  const r = [];
  return e.forEach(function(i) {
    const n = this.__find__(i);
    if (n < 0) {
      if (t)
        return;
      throw new Error("Rules manager: invalid rule name " + i);
    }
    this.__rules__[n].enabled = !1, r.push(i);
  }, this), this.__cache__ = null, r;
};
L.prototype.getRules = function(e) {
  return this.__cache__ === null && this.__compile__(), this.__cache__[e] || [];
};
function Q(e, t, r) {
  this.type = e, this.tag = t, this.attrs = null, this.map = null, this.nesting = r, this.level = 0, this.children = null, this.content = "", this.markup = "", this.info = "", this.meta = null, this.block = !1, this.hidden = !1;
}
Q.prototype.attrIndex = function(t) {
  if (!this.attrs)
    return -1;
  const r = this.attrs;
  for (let i = 0, n = r.length; i < n; i++)
    if (r[i][0] === t)
      return i;
  return -1;
};
Q.prototype.attrPush = function(t) {
  this.attrs ? this.attrs.push(t) : this.attrs = [t];
};
Q.prototype.attrSet = function(t, r) {
  const i = this.attrIndex(t), n = [t, r];
  i < 0 ? this.attrPush(n) : this.attrs[i] = n;
};
Q.prototype.attrGet = function(t) {
  const r = this.attrIndex(t);
  let i = null;
  return r >= 0 && (i = this.attrs[r][1]), i;
};
Q.prototype.attrJoin = function(t, r) {
  const i = this.attrIndex(t);
  i < 0 ? this.attrPush([t, r]) : this.attrs[i][1] = this.attrs[i][1] + " " + r;
};
function Uo(e, t, r) {
  this.src = e, this.env = r, this.tokens = [], this.inlineMode = !1, this.md = t;
}
Uo.prototype.Token = Q;
const al = /\r\n?|\n/g, cl = /\0/g;
function ll(e) {
  let t;
  t = e.src.replace(al, `
`), t = t.replace(cl, "�"), e.src = t;
}
function dl(e) {
  let t;
  e.inlineMode ? (t = new e.Token("inline", "", 0), t.content = e.src, t.map = [0, 1], t.children = [], e.tokens.push(t)) : e.md.block.parse(e.src, e.md, e.env, e.tokens);
}
function fl(e) {
  const t = e.tokens;
  for (let r = 0, i = t.length; r < i; r++) {
    const n = t[r];
    n.type === "inline" && e.md.inline.parse(n.content, e.md, e.env, n.children);
  }
}
function hl(e) {
  return /^<a[>\s]/i.test(e);
}
function pl(e) {
  return /^<\/a\s*>/i.test(e);
}
function _l(e) {
  const t = e.tokens;
  if (e.md.options.linkify)
    for (let r = 0, i = t.length; r < i; r++) {
      if (t[r].type !== "inline" || !e.md.linkify.pretest(t[r].content))
        continue;
      let n = t[r].children, u = 0;
      for (let s = n.length - 1; s >= 0; s--) {
        const o = n[s];
        if (o.type === "link_close") {
          for (s--; n[s].level !== o.level && n[s].type !== "link_open"; )
            s--;
          continue;
        }
        if (o.type === "html_inline" && (hl(o.content) && u > 0 && u--, pl(o.content) && u++), !(u > 0) && o.type === "text" && e.md.linkify.test(o.content)) {
          const a = o.content;
          let c = e.md.linkify.match(a);
          const l = [];
          let d = o.level, f = 0;
          c.length > 0 && c[0].index === 0 && s > 0 && n[s - 1].type === "text_special" && (c = c.slice(1));
          for (let h = 0; h < c.length; h++) {
            const p = c[h].url, _ = e.md.normalizeLink(p);
            if (!e.md.validateLink(_))
              continue;
            let m = c[h].text;
            c[h].schema ? c[h].schema === "mailto:" && !/^mailto:/i.test(m) ? m = e.md.normalizeLinkText("mailto:" + m).replace(/^mailto:/, "") : m = e.md.normalizeLinkText(m) : m = e.md.normalizeLinkText("http://" + m).replace(/^http:\/\//, "");
            const v = c[h].index;
            if (v > f) {
              const x = new e.Token("text", "", 0);
              x.content = a.slice(f, v), x.level = d, l.push(x);
            }
            const w = new e.Token("link_open", "a", 1);
            w.attrs = [["href", _]], w.level = d++, w.markup = "linkify", w.info = "auto", l.push(w);
            const b = new e.Token("text", "", 0);
            b.content = m, b.level = d, l.push(b);
            const g = new e.Token("link_close", "a", -1);
            g.level = --d, g.markup = "linkify", g.info = "auto", l.push(g), f = c[h].lastIndex;
          }
          if (f < a.length) {
            const h = new e.Token("text", "", 0);
            h.content = a.slice(f), h.level = d, l.push(h);
          }
          t[r].children = n = qo(n, s, l);
        }
      }
    }
}
const $o = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/, ml = /\((c|tm|r)\)/i, bl = /\((c|tm|r)\)/ig, gl = {
  c: "©",
  r: "®",
  tm: "™"
};
function vl(e, t) {
  return gl[t.toLowerCase()];
}
function wl(e) {
  let t = 0;
  for (let r = e.length - 1; r >= 0; r--) {
    const i = e[r];
    i.type === "text" && !t && (i.content = i.content.replace(bl, vl)), i.type === "link_open" && i.info === "auto" && t--, i.type === "link_close" && i.info === "auto" && t++;
  }
}
function yl(e) {
  let t = 0;
  for (let r = e.length - 1; r >= 0; r--) {
    const i = e[r];
    i.type === "text" && !t && $o.test(i.content) && (i.content = i.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/mg, "$1—").replace(/(^|\s)--(?=\s|$)/mg, "$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, "$1–")), i.type === "link_open" && i.info === "auto" && t--, i.type === "link_close" && i.info === "auto" && t++;
  }
}
function xl(e) {
  let t;
  if (e.md.options.typographer)
    for (t = e.tokens.length - 1; t >= 0; t--)
      e.tokens[t].type === "inline" && (ml.test(e.tokens[t].content) && wl(e.tokens[t].children), $o.test(e.tokens[t].content) && yl(e.tokens[t].children));
}
const El = /['"]/, ss = /['"]/g, os = "’";
function pr(e, t, r) {
  return e.slice(0, t) + r + e.slice(t + 1);
}
function kl(e, t) {
  let r;
  const i = [];
  for (let n = 0; n < e.length; n++) {
    const u = e[n], s = e[n].level;
    for (r = i.length - 1; r >= 0 && !(i[r].level <= s); r--)
      ;
    if (i.length = r + 1, u.type !== "text")
      continue;
    let o = u.content, a = 0, c = o.length;
    e:
      for (; a < c; ) {
        ss.lastIndex = a;
        const l = ss.exec(o);
        if (!l)
          break;
        let d = !0, f = !0;
        a = l.index + 1;
        const h = l[0] === "'";
        let p = 32;
        if (l.index - 1 >= 0)
          p = o.charCodeAt(l.index - 1);
        else
          for (r = n - 1; r >= 0 && !(e[r].type === "softbreak" || e[r].type === "hardbreak"); r--)
            if (e[r].content) {
              p = e[r].content.charCodeAt(e[r].content.length - 1);
              break;
            }
        let _ = 32;
        if (a < c)
          _ = o.charCodeAt(a);
        else
          for (r = n + 1; r < e.length && !(e[r].type === "softbreak" || e[r].type === "hardbreak"); r++)
            if (e[r].content) {
              _ = e[r].content.charCodeAt(0);
              break;
            }
        const m = sr(p) || nr(String.fromCharCode(p)), v = sr(_) || nr(String.fromCharCode(_)), w = ur(p), b = ur(_);
        if (b ? d = !1 : v && (w || m || (d = !1)), w ? f = !1 : m && (b || v || (f = !1)), _ === 34 && l[0] === '"' && p >= 48 && p <= 57 && (f = d = !1), d && f && (d = m, f = v), !d && !f) {
          h && (u.content = pr(u.content, l.index, os));
          continue;
        }
        if (f)
          for (r = i.length - 1; r >= 0; r--) {
            let g = i[r];
            if (i[r].level < s)
              break;
            if (g.single === h && i[r].level === s) {
              g = i[r];
              let x, y;
              h ? (x = t.md.options.quotes[2], y = t.md.options.quotes[3]) : (x = t.md.options.quotes[0], y = t.md.options.quotes[1]), u.content = pr(u.content, l.index, y), e[g.token].content = pr(
                e[g.token].content,
                g.pos,
                x
              ), a += y.length - 1, g.token === n && (a += x.length - 1), o = u.content, c = o.length, i.length = r;
              continue e;
            }
          }
        d ? i.push({
          token: n,
          pos: l.index,
          single: h,
          level: s
        }) : f && h && (u.content = pr(u.content, l.index, os));
      }
  }
}
function Cl(e) {
  if (e.md.options.typographer)
    for (let t = e.tokens.length - 1; t >= 0; t--)
      e.tokens[t].type !== "inline" || !El.test(e.tokens[t].content) || kl(e.tokens[t].children, e);
}
function Al(e) {
  let t, r;
  const i = e.tokens, n = i.length;
  for (let u = 0; u < n; u++) {
    if (i[u].type !== "inline") continue;
    const s = i[u].children, o = s.length;
    for (t = 0; t < o; t++)
      s[t].type === "text_special" && (s[t].type = "text");
    for (t = r = 0; t < o; t++)
      s[t].type === "text" && t + 1 < o && s[t + 1].type === "text" ? s[t + 1].content = s[t].content + s[t + 1].content : (t !== r && (s[r] = s[t]), r++);
    t !== r && (s.length = r);
  }
}
const ni = [
  ["normalize", ll],
  ["block", dl],
  ["inline", fl],
  ["linkify", _l],
  ["replacements", xl],
  ["smartquotes", Cl],
  // `text_join` finds `text_special` tokens (for escape sequences)
  // and joins them with the rest of the text
  ["text_join", Al]
];
function Hi() {
  this.ruler = new L();
  for (let e = 0; e < ni.length; e++)
    this.ruler.push(ni[e][0], ni[e][1]);
}
Hi.prototype.process = function(e) {
  const t = this.ruler.getRules("");
  for (let r = 0, i = t.length; r < i; r++)
    t[r](e);
};
Hi.prototype.State = Uo;
function X(e, t, r, i) {
  this.src = e, this.md = t, this.env = r, this.tokens = i, this.bMarks = [], this.eMarks = [], this.tShift = [], this.sCount = [], this.bsCount = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = !1, this.ddIndent = -1, this.listIndent = -1, this.parentType = "root", this.level = 0;
  const n = this.src;
  for (let u = 0, s = 0, o = 0, a = 0, c = n.length, l = !1; s < c; s++) {
    const d = n.charCodeAt(s);
    if (!l)
      if (F(d)) {
        o++, d === 9 ? a += 4 - a % 4 : a++;
        continue;
      } else
        l = !0;
    (d === 10 || s === c - 1) && (d !== 10 && s++, this.bMarks.push(u), this.eMarks.push(s), this.tShift.push(o), this.sCount.push(a), this.bsCount.push(0), l = !1, o = 0, a = 0, u = s + 1);
  }
  this.bMarks.push(n.length), this.eMarks.push(n.length), this.tShift.push(0), this.sCount.push(0), this.bsCount.push(0), this.lineMax = this.bMarks.length - 1;
}
X.prototype.push = function(e, t, r) {
  const i = new Q(e, t, r);
  return i.block = !0, r < 0 && this.level--, i.level = this.level, r > 0 && this.level++, this.tokens.push(i), i;
};
X.prototype.isEmpty = function(t) {
  return this.bMarks[t] + this.tShift[t] >= this.eMarks[t];
};
X.prototype.skipEmptyLines = function(t) {
  for (let r = this.lineMax; t < r && !(this.bMarks[t] + this.tShift[t] < this.eMarks[t]); t++)
    ;
  return t;
};
X.prototype.skipSpaces = function(t) {
  for (let r = this.src.length; t < r; t++) {
    const i = this.src.charCodeAt(t);
    if (!F(i))
      break;
  }
  return t;
};
X.prototype.skipSpacesBack = function(t, r) {
  if (t <= r)
    return t;
  for (; t > r; )
    if (!F(this.src.charCodeAt(--t)))
      return t + 1;
  return t;
};
X.prototype.skipChars = function(t, r) {
  for (let i = this.src.length; t < i && this.src.charCodeAt(t) === r; t++)
    ;
  return t;
};
X.prototype.skipCharsBack = function(t, r, i) {
  if (t <= i)
    return t;
  for (; t > i; )
    if (r !== this.src.charCodeAt(--t))
      return t + 1;
  return t;
};
X.prototype.getLines = function(t, r, i, n) {
  if (t >= r)
    return "";
  const u = new Array(r - t);
  for (let s = 0, o = t; o < r; o++, s++) {
    let a = 0;
    const c = this.bMarks[o];
    let l = c, d;
    for (o + 1 < r || n ? d = this.eMarks[o] + 1 : d = this.eMarks[o]; l < d && a < i; ) {
      const f = this.src.charCodeAt(l);
      if (F(f))
        f === 9 ? a += 4 - (a + this.bsCount[o]) % 4 : a++;
      else if (l - c < this.tShift[o])
        a++;
      else
        break;
      l++;
    }
    a > i ? u[s] = new Array(a - i + 1).join(" ") + this.src.slice(l, d) : u[s] = this.src.slice(l, d);
  }
  return u.join("");
};
X.prototype.Token = Q;
const Fl = 65536;
function si(e, t) {
  const r = e.bMarks[t] + e.tShift[t], i = e.eMarks[t];
  return e.src.slice(r, i);
}
function as(e) {
  const t = [], r = e.length;
  let i = 0, n = e.charCodeAt(i), u = !1, s = 0, o = "";
  for (; i < r; )
    n === 124 && (u ? (o += e.substring(s, i - 1), s = i) : (t.push(o + e.substring(s, i)), o = "", s = i + 1)), u = n === 92, i++, n = e.charCodeAt(i);
  return t.push(o + e.substring(s)), t;
}
function Dl(e, t, r, i) {
  if (t + 2 > r)
    return !1;
  let n = t + 1;
  if (e.sCount[n] < e.blkIndent || e.sCount[n] - e.blkIndent >= 4)
    return !1;
  let u = e.bMarks[n] + e.tShift[n];
  if (u >= e.eMarks[n])
    return !1;
  const s = e.src.charCodeAt(u++);
  if (s !== 124 && s !== 45 && s !== 58 || u >= e.eMarks[n])
    return !1;
  const o = e.src.charCodeAt(u++);
  if (o !== 124 && o !== 45 && o !== 58 && !F(o) || s === 45 && F(o))
    return !1;
  for (; u < e.eMarks[n]; ) {
    const g = e.src.charCodeAt(u);
    if (g !== 124 && g !== 45 && g !== 58 && !F(g))
      return !1;
    u++;
  }
  let a = si(e, t + 1), c = a.split("|");
  const l = [];
  for (let g = 0; g < c.length; g++) {
    const x = c[g].trim();
    if (!x) {
      if (g === 0 || g === c.length - 1)
        continue;
      return !1;
    }
    if (!/^:?-+:?$/.test(x))
      return !1;
    x.charCodeAt(x.length - 1) === 58 ? l.push(x.charCodeAt(0) === 58 ? "center" : "right") : x.charCodeAt(0) === 58 ? l.push("left") : l.push("");
  }
  if (a = si(e, t).trim(), a.indexOf("|") === -1 || e.sCount[t] - e.blkIndent >= 4)
    return !1;
  c = as(a), c.length && c[0] === "" && c.shift(), c.length && c[c.length - 1] === "" && c.pop();
  const d = c.length;
  if (d === 0 || d !== l.length)
    return !1;
  if (i)
    return !0;
  const f = e.parentType;
  e.parentType = "table";
  const h = e.md.block.ruler.getRules("blockquote"), p = e.push("table_open", "table", 1), _ = [t, 0];
  p.map = _;
  const m = e.push("thead_open", "thead", 1);
  m.map = [t, t + 1];
  const v = e.push("tr_open", "tr", 1);
  v.map = [t, t + 1];
  for (let g = 0; g < c.length; g++) {
    const x = e.push("th_open", "th", 1);
    l[g] && (x.attrs = [["style", "text-align:" + l[g]]]);
    const y = e.push("inline", "", 0);
    y.content = c[g].trim(), y.children = [], e.push("th_close", "th", -1);
  }
  e.push("tr_close", "tr", -1), e.push("thead_close", "thead", -1);
  let w, b = 0;
  for (n = t + 2; n < r && !(e.sCount[n] < e.blkIndent); n++) {
    let g = !1;
    for (let y = 0, S = h.length; y < S; y++)
      if (h[y](e, n, r, !0)) {
        g = !0;
        break;
      }
    if (g || (a = si(e, n).trim(), !a) || e.sCount[n] - e.blkIndent >= 4 || (c = as(a), c.length && c[0] === "" && c.shift(), c.length && c[c.length - 1] === "" && c.pop(), b += d - c.length, b > Fl))
      break;
    if (n === t + 2) {
      const y = e.push("tbody_open", "tbody", 1);
      y.map = w = [t + 2, 0];
    }
    const x = e.push("tr_open", "tr", 1);
    x.map = [n, n + 1];
    for (let y = 0; y < d; y++) {
      const S = e.push("td_open", "td", 1);
      l[y] && (S.attrs = [["style", "text-align:" + l[y]]]);
      const C = e.push("inline", "", 0);
      C.content = c[y] ? c[y].trim() : "", C.children = [], e.push("td_close", "td", -1);
    }
    e.push("tr_close", "tr", -1);
  }
  return w && (e.push("tbody_close", "tbody", -1), w[1] = n), e.push("table_close", "table", -1), _[1] = n, e.parentType = f, e.line = n, !0;
}
function Sl(e, t, r) {
  if (e.sCount[t] - e.blkIndent < 4)
    return !1;
  let i = t + 1, n = i;
  for (; i < r; ) {
    if (e.isEmpty(i)) {
      i++;
      continue;
    }
    if (e.sCount[i] - e.blkIndent >= 4) {
      i++, n = i;
      continue;
    }
    break;
  }
  e.line = n;
  const u = e.push("code_block", "code", 0);
  return u.content = e.getLines(t, n, 4 + e.blkIndent, !1) + `
`, u.map = [t, e.line], !0;
}
function Rl(e, t, r, i) {
  let n = e.bMarks[t] + e.tShift[t], u = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4 || n + 3 > u)
    return !1;
  const s = e.src.charCodeAt(n);
  if (s !== 126 && s !== 96)
    return !1;
  let o = n;
  n = e.skipChars(n, s);
  let a = n - o;
  if (a < 3)
    return !1;
  const c = e.src.slice(o, n), l = e.src.slice(n, u);
  if (s === 96 && l.indexOf(String.fromCharCode(s)) >= 0)
    return !1;
  if (i)
    return !0;
  let d = t, f = !1;
  for (; d++, !(d >= r || (n = o = e.bMarks[d] + e.tShift[d], u = e.eMarks[d], n < u && e.sCount[d] < e.blkIndent)); )
    if (e.src.charCodeAt(n) === s && !(e.sCount[d] - e.blkIndent >= 4) && (n = e.skipChars(n, s), !(n - o < a) && (n = e.skipSpaces(n), !(n < u)))) {
      f = !0;
      break;
    }
  a = e.sCount[t], e.line = d + (f ? 1 : 0);
  const h = e.push("fence", "code", 0);
  return h.info = l, h.content = e.getLines(t + 1, d, a, !0), h.markup = c, h.map = [t, e.line], !0;
}
function Pl(e, t, r, i) {
  let n = e.bMarks[t] + e.tShift[t], u = e.eMarks[t];
  const s = e.lineMax;
  if (e.sCount[t] - e.blkIndent >= 4 || e.src.charCodeAt(n) !== 62)
    return !1;
  if (i)
    return !0;
  const o = [], a = [], c = [], l = [], d = e.md.block.ruler.getRules("blockquote"), f = e.parentType;
  e.parentType = "blockquote";
  let h = !1, p;
  for (p = t; p < r; p++) {
    const b = e.sCount[p] < e.blkIndent;
    if (n = e.bMarks[p] + e.tShift[p], u = e.eMarks[p], n >= u)
      break;
    if (e.src.charCodeAt(n++) === 62 && !b) {
      let x = e.sCount[p] + 1, y, S;
      e.src.charCodeAt(n) === 32 ? (n++, x++, S = !1, y = !0) : e.src.charCodeAt(n) === 9 ? (y = !0, (e.bsCount[p] + x) % 4 === 3 ? (n++, x++, S = !1) : S = !0) : y = !1;
      let C = x;
      for (o.push(e.bMarks[p]), e.bMarks[p] = n; n < u; ) {
        const k = e.src.charCodeAt(n);
        if (F(k))
          k === 9 ? C += 4 - (C + e.bsCount[p] + (S ? 1 : 0)) % 4 : C++;
        else
          break;
        n++;
      }
      h = n >= u, a.push(e.bsCount[p]), e.bsCount[p] = e.sCount[p] + 1 + (y ? 1 : 0), c.push(e.sCount[p]), e.sCount[p] = C - x, l.push(e.tShift[p]), e.tShift[p] = n - e.bMarks[p];
      continue;
    }
    if (h)
      break;
    let g = !1;
    for (let x = 0, y = d.length; x < y; x++)
      if (d[x](e, p, r, !0)) {
        g = !0;
        break;
      }
    if (g) {
      e.lineMax = p, e.blkIndent !== 0 && (o.push(e.bMarks[p]), a.push(e.bsCount[p]), l.push(e.tShift[p]), c.push(e.sCount[p]), e.sCount[p] -= e.blkIndent);
      break;
    }
    o.push(e.bMarks[p]), a.push(e.bsCount[p]), l.push(e.tShift[p]), c.push(e.sCount[p]), e.sCount[p] = -1;
  }
  const _ = e.blkIndent;
  e.blkIndent = 0;
  const m = e.push("blockquote_open", "blockquote", 1);
  m.markup = ">";
  const v = [t, 0];
  m.map = v, e.md.block.tokenize(e, t, p);
  const w = e.push("blockquote_close", "blockquote", -1);
  w.markup = ">", e.lineMax = s, e.parentType = f, v[1] = e.line;
  for (let b = 0; b < l.length; b++)
    e.bMarks[b + t] = o[b], e.tShift[b + t] = l[b], e.sCount[b + t] = c[b], e.bsCount[b + t] = a[b];
  return e.blkIndent = _, !0;
}
function Il(e, t, r, i) {
  const n = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4)
    return !1;
  let u = e.bMarks[t] + e.tShift[t];
  const s = e.src.charCodeAt(u++);
  if (s !== 42 && s !== 45 && s !== 95)
    return !1;
  let o = 1;
  for (; u < n; ) {
    const c = e.src.charCodeAt(u++);
    if (c !== s && !F(c))
      return !1;
    c === s && o++;
  }
  if (o < 3)
    return !1;
  if (i)
    return !0;
  e.line = t + 1;
  const a = e.push("hr", "hr", 0);
  return a.map = [t, e.line], a.markup = Array(o + 1).join(String.fromCharCode(s)), !0;
}
function cs(e, t) {
  const r = e.eMarks[t];
  let i = e.bMarks[t] + e.tShift[t];
  const n = e.src.charCodeAt(i++);
  if (n !== 42 && n !== 45 && n !== 43)
    return -1;
  if (i < r) {
    const u = e.src.charCodeAt(i);
    if (!F(u))
      return -1;
  }
  return i;
}
function ls(e, t) {
  const r = e.bMarks[t] + e.tShift[t], i = e.eMarks[t];
  let n = r;
  if (n + 1 >= i)
    return -1;
  let u = e.src.charCodeAt(n++);
  if (u < 48 || u > 57)
    return -1;
  for (; ; ) {
    if (n >= i)
      return -1;
    if (u = e.src.charCodeAt(n++), u >= 48 && u <= 57) {
      if (n - r >= 10)
        return -1;
      continue;
    }
    if (u === 41 || u === 46)
      break;
    return -1;
  }
  return n < i && (u = e.src.charCodeAt(n), !F(u)) ? -1 : n;
}
function Ol(e, t) {
  const r = e.level + 2;
  for (let i = t + 2, n = e.tokens.length - 2; i < n; i++)
    e.tokens[i].level === r && e.tokens[i].type === "paragraph_open" && (e.tokens[i + 2].hidden = !0, e.tokens[i].hidden = !0, i += 2);
}
function ql(e, t, r, i) {
  let n, u, s, o, a = t, c = !0;
  if (e.sCount[a] - e.blkIndent >= 4 || e.listIndent >= 0 && e.sCount[a] - e.listIndent >= 4 && e.sCount[a] < e.blkIndent)
    return !1;
  let l = !1;
  i && e.parentType === "paragraph" && e.sCount[a] >= e.blkIndent && (l = !0);
  let d, f, h;
  if ((h = ls(e, a)) >= 0) {
    if (d = !0, s = e.bMarks[a] + e.tShift[a], f = Number(e.src.slice(s, h - 1)), l && f !== 1) return !1;
  } else if ((h = cs(e, a)) >= 0)
    d = !1;
  else
    return !1;
  if (l && e.skipSpaces(h) >= e.eMarks[a])
    return !1;
  if (i)
    return !0;
  const p = e.src.charCodeAt(h - 1), _ = e.tokens.length;
  d ? (o = e.push("ordered_list_open", "ol", 1), f !== 1 && (o.attrs = [["start", f]])) : o = e.push("bullet_list_open", "ul", 1);
  const m = [a, 0];
  o.map = m, o.markup = String.fromCharCode(p);
  let v = !1;
  const w = e.md.block.ruler.getRules("list"), b = e.parentType;
  for (e.parentType = "list"; a < r; ) {
    u = h, n = e.eMarks[a];
    const g = e.sCount[a] + h - (e.bMarks[a] + e.tShift[a]);
    let x = g;
    for (; u < n; ) {
      const Me = e.src.charCodeAt(u);
      if (Me === 9)
        x += 4 - (x + e.bsCount[a]) % 4;
      else if (Me === 32)
        x++;
      else
        break;
      u++;
    }
    const y = u;
    let S;
    y >= n ? S = 1 : S = x - g, S > 4 && (S = 1);
    const C = g + S;
    o = e.push("list_item_open", "li", 1), o.markup = String.fromCharCode(p);
    const k = [a, 0];
    o.map = k, d && (o.info = e.src.slice(s, h - 1));
    const Y = e.tight, ee = e.tShift[a], E = e.sCount[a], R = e.listIndent;
    if (e.listIndent = e.blkIndent, e.blkIndent = C, e.tight = !0, e.tShift[a] = y - e.bMarks[a], e.sCount[a] = x, y >= n && e.isEmpty(a + 1) ? e.line = Math.min(e.line + 2, r) : e.md.block.tokenize(e, a, r, !0), (!e.tight || v) && (c = !1), v = e.line - a > 1 && e.isEmpty(e.line - 1), e.blkIndent = e.listIndent, e.listIndent = R, e.tShift[a] = ee, e.sCount[a] = E, e.tight = Y, o = e.push("list_item_close", "li", -1), o.markup = String.fromCharCode(p), a = e.line, k[1] = a, a >= r || e.sCount[a] < e.blkIndent || e.sCount[a] - e.blkIndent >= 4)
      break;
    let oe = !1;
    for (let Me = 0, ea = w.length; Me < ea; Me++)
      if (w[Me](e, a, r, !0)) {
        oe = !0;
        break;
      }
    if (oe)
      break;
    if (d) {
      if (h = ls(e, a), h < 0)
        break;
      s = e.bMarks[a] + e.tShift[a];
    } else if (h = cs(e, a), h < 0)
      break;
    if (p !== e.src.charCodeAt(h - 1))
      break;
  }
  return d ? o = e.push("ordered_list_close", "ol", -1) : o = e.push("bullet_list_close", "ul", -1), o.markup = String.fromCharCode(p), m[1] = a, e.line = a, e.parentType = b, c && Ol(e, _), !0;
}
function zl(e, t, r, i) {
  let n = e.bMarks[t] + e.tShift[t], u = e.eMarks[t], s = t + 1;
  if (e.sCount[t] - e.blkIndent >= 4 || e.src.charCodeAt(n) !== 91)
    return !1;
  function o(w) {
    const b = e.lineMax;
    if (w >= b || e.isEmpty(w))
      return null;
    let g = !1;
    if (e.sCount[w] - e.blkIndent > 3 && (g = !0), e.sCount[w] < 0 && (g = !0), !g) {
      const S = e.md.block.ruler.getRules("reference"), C = e.parentType;
      e.parentType = "reference";
      let k = !1;
      for (let Y = 0, ee = S.length; Y < ee; Y++)
        if (S[Y](e, w, b, !0)) {
          k = !0;
          break;
        }
      if (e.parentType = C, k)
        return null;
    }
    const x = e.bMarks[w] + e.tShift[w], y = e.eMarks[w];
    return e.src.slice(x, y + 1);
  }
  let a = e.src.slice(n, u + 1);
  u = a.length;
  let c = -1;
  for (n = 1; n < u; n++) {
    const w = a.charCodeAt(n);
    if (w === 91)
      return !1;
    if (w === 93) {
      c = n;
      break;
    } else if (w === 10) {
      const b = o(s);
      b !== null && (a += b, u = a.length, s++);
    } else if (w === 92 && (n++, n < u && a.charCodeAt(n) === 10)) {
      const b = o(s);
      b !== null && (a += b, u = a.length, s++);
    }
  }
  if (c < 0 || a.charCodeAt(c + 1) !== 58)
    return !1;
  for (n = c + 2; n < u; n++) {
    const w = a.charCodeAt(n);
    if (w === 10) {
      const b = o(s);
      b !== null && (a += b, u = a.length, s++);
    } else if (!F(w)) break;
  }
  const l = e.md.helpers.parseLinkDestination(a, n, u);
  if (!l.ok)
    return !1;
  const d = e.md.normalizeLink(l.str);
  if (!e.md.validateLink(d))
    return !1;
  n = l.pos;
  const f = n, h = s, p = n;
  for (; n < u; n++) {
    const w = a.charCodeAt(n);
    if (w === 10) {
      const b = o(s);
      b !== null && (a += b, u = a.length, s++);
    } else if (!F(w)) break;
  }
  let _ = e.md.helpers.parseLinkTitle(a, n, u);
  for (; _.can_continue; ) {
    const w = o(s);
    if (w === null) break;
    a += w, n = u, u = a.length, s++, _ = e.md.helpers.parseLinkTitle(a, n, u, _);
  }
  let m;
  for (n < u && p !== n && _.ok ? (m = _.str, n = _.pos) : (m = "", n = f, s = h); n < u; ) {
    const w = a.charCodeAt(n);
    if (!F(w))
      break;
    n++;
  }
  if (n < u && a.charCodeAt(n) !== 10 && m)
    for (m = "", n = f, s = h; n < u; ) {
      const w = a.charCodeAt(n);
      if (!F(w))
        break;
      n++;
    }
  if (n < u && a.charCodeAt(n) !== 10)
    return !1;
  const v = Ur(a.slice(1, c));
  return v ? (i || (typeof e.env.references > "u" && (e.env.references = {}), typeof e.env.references[v] > "u" && (e.env.references[v] = { title: m, href: d }), e.line = s), !0) : !1;
}
const Ul = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], $l = "[a-zA-Z_:][a-zA-Z0-9:._-]*", Ll = "[^\"'=<>`\\x00-\\x20]+", Tl = "'[^']*'", Ml = '"[^"]*"', jl = "(?:" + Ll + "|" + Tl + "|" + Ml + ")", Bl = "(?:\\s+" + $l + "(?:\\s*=\\s*" + jl + ")?)", Lo = "<[A-Za-z][A-Za-z0-9\\-]*" + Bl + "*\\s*\\/?>", To = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>", Nl = "<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->", Gl = "<[?][\\s\\S]*?[?]>", Hl = "<![A-Za-z][^>]*>", Wl = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>", Ql = new RegExp("^(?:" + Lo + "|" + To + "|" + Nl + "|" + Gl + "|" + Hl + "|" + Wl + ")"), Vl = new RegExp("^(?:" + Lo + "|" + To + ")"), je = [
  [/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, !0],
  [/^<!--/, /-->/, !0],
  [/^<\?/, /\?>/, !0],
  [/^<![A-Z]/, />/, !0],
  [/^<!\[CDATA\[/, /\]\]>/, !0],
  [new RegExp("^</?(" + Ul.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, !0],
  [new RegExp(Vl.source + "\\s*$"), /^$/, !1]
];
function Zl(e, t, r, i) {
  let n = e.bMarks[t] + e.tShift[t], u = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4 || !e.md.options.html || e.src.charCodeAt(n) !== 60)
    return !1;
  let s = e.src.slice(n, u), o = 0;
  for (; o < je.length && !je[o][0].test(s); o++)
    ;
  if (o === je.length)
    return !1;
  if (i)
    return je[o][2];
  let a = t + 1;
  if (!je[o][1].test(s)) {
    for (; a < r && !(e.sCount[a] < e.blkIndent); a++)
      if (n = e.bMarks[a] + e.tShift[a], u = e.eMarks[a], s = e.src.slice(n, u), je[o][1].test(s)) {
        s.length !== 0 && a++;
        break;
      }
  }
  e.line = a;
  const c = e.push("html_block", "", 0);
  return c.map = [t, a], c.content = e.getLines(t, a, e.blkIndent, !0), !0;
}
function Jl(e, t, r, i) {
  let n = e.bMarks[t] + e.tShift[t], u = e.eMarks[t];
  if (e.sCount[t] - e.blkIndent >= 4)
    return !1;
  let s = e.src.charCodeAt(n);
  if (s !== 35 || n >= u)
    return !1;
  let o = 1;
  for (s = e.src.charCodeAt(++n); s === 35 && n < u && o <= 6; )
    o++, s = e.src.charCodeAt(++n);
  if (o > 6 || n < u && !F(s))
    return !1;
  if (i)
    return !0;
  u = e.skipSpacesBack(u, n);
  const a = e.skipCharsBack(u, 35, n);
  a > n && F(e.src.charCodeAt(a - 1)) && (u = a), e.line = t + 1;
  const c = e.push("heading_open", "h" + String(o), 1);
  c.markup = "########".slice(0, o), c.map = [t, e.line];
  const l = e.push("inline", "", 0);
  l.content = e.src.slice(n, u).trim(), l.map = [t, e.line], l.children = [];
  const d = e.push("heading_close", "h" + String(o), -1);
  return d.markup = "########".slice(0, o), !0;
}
function Kl(e, t, r) {
  const i = e.md.block.ruler.getRules("paragraph");
  if (e.sCount[t] - e.blkIndent >= 4)
    return !1;
  const n = e.parentType;
  e.parentType = "paragraph";
  let u = 0, s, o = t + 1;
  for (; o < r && !e.isEmpty(o); o++) {
    if (e.sCount[o] - e.blkIndent > 3)
      continue;
    if (e.sCount[o] >= e.blkIndent) {
      let h = e.bMarks[o] + e.tShift[o];
      const p = e.eMarks[o];
      if (h < p && (s = e.src.charCodeAt(h), (s === 45 || s === 61) && (h = e.skipChars(h, s), h = e.skipSpaces(h), h >= p))) {
        u = s === 61 ? 1 : 2;
        break;
      }
    }
    if (e.sCount[o] < 0)
      continue;
    let f = !1;
    for (let h = 0, p = i.length; h < p; h++)
      if (i[h](e, o, r, !0)) {
        f = !0;
        break;
      }
    if (f)
      break;
  }
  if (!u)
    return !1;
  const a = e.getLines(t, o, e.blkIndent, !1).trim();
  e.line = o + 1;
  const c = e.push("heading_open", "h" + String(u), 1);
  c.markup = String.fromCharCode(s), c.map = [t, e.line];
  const l = e.push("inline", "", 0);
  l.content = a, l.map = [t, e.line - 1], l.children = [];
  const d = e.push("heading_close", "h" + String(u), -1);
  return d.markup = String.fromCharCode(s), e.parentType = n, !0;
}
function Xl(e, t, r) {
  const i = e.md.block.ruler.getRules("paragraph"), n = e.parentType;
  let u = t + 1;
  for (e.parentType = "paragraph"; u < r && !e.isEmpty(u); u++) {
    if (e.sCount[u] - e.blkIndent > 3 || e.sCount[u] < 0)
      continue;
    let c = !1;
    for (let l = 0, d = i.length; l < d; l++)
      if (i[l](e, u, r, !0)) {
        c = !0;
        break;
      }
    if (c)
      break;
  }
  const s = e.getLines(t, u, e.blkIndent, !1).trim();
  e.line = u;
  const o = e.push("paragraph_open", "p", 1);
  o.map = [t, e.line];
  const a = e.push("inline", "", 0);
  return a.content = s, a.map = [t, e.line], a.children = [], e.push("paragraph_close", "p", -1), e.parentType = n, !0;
}
const _r = [
  // First 2 params - rule name & source. Secondary array - list of rules,
  // which can be terminated by this one.
  ["table", Dl, ["paragraph", "reference"]],
  ["code", Sl],
  ["fence", Rl, ["paragraph", "reference", "blockquote", "list"]],
  ["blockquote", Pl, ["paragraph", "reference", "blockquote", "list"]],
  ["hr", Il, ["paragraph", "reference", "blockquote", "list"]],
  ["list", ql, ["paragraph", "reference", "blockquote"]],
  ["reference", zl],
  ["html_block", Zl, ["paragraph", "reference", "blockquote"]],
  ["heading", Jl, ["paragraph", "reference", "blockquote"]],
  ["lheading", Kl],
  ["paragraph", Xl]
];
function $r() {
  this.ruler = new L();
  for (let e = 0; e < _r.length; e++)
    this.ruler.push(_r[e][0], _r[e][1], { alt: (_r[e][2] || []).slice() });
}
$r.prototype.tokenize = function(e, t, r) {
  const i = this.ruler.getRules(""), n = i.length, u = e.md.options.maxNesting;
  let s = t, o = !1;
  for (; s < r && (e.line = s = e.skipEmptyLines(s), !(s >= r || e.sCount[s] < e.blkIndent)); ) {
    if (e.level >= u) {
      e.line = r;
      break;
    }
    const a = e.line;
    let c = !1;
    for (let l = 0; l < n; l++)
      if (c = i[l](e, s, r, !1), c) {
        if (a >= e.line)
          throw new Error("block rule didn't increment state.line");
        break;
      }
    if (!c) throw new Error("none of the block rules matched");
    e.tight = !o, e.isEmpty(e.line - 1) && (o = !0), s = e.line, s < r && e.isEmpty(s) && (o = !0, s++, e.line = s);
  }
};
$r.prototype.parse = function(e, t, r, i) {
  if (!e)
    return;
  const n = new this.State(e, t, r, i);
  this.tokenize(n, n.line, n.lineMax);
};
$r.prototype.State = X;
function dr(e, t, r, i) {
  this.src = e, this.env = r, this.md = t, this.tokens = i, this.tokens_meta = Array(i.length), this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = {}, this.delimiters = [], this._prev_delimiters = [], this.backticks = {}, this.backticksScanned = !1, this.linkLevel = 0;
}
dr.prototype.pushPending = function() {
  const e = new Q("text", "", 0);
  return e.content = this.pending, e.level = this.pendingLevel, this.tokens.push(e), this.pending = "", e;
};
dr.prototype.push = function(e, t, r) {
  this.pending && this.pushPending();
  const i = new Q(e, t, r);
  let n = null;
  return r < 0 && (this.level--, this.delimiters = this._prev_delimiters.pop()), i.level = this.level, r > 0 && (this.level++, this._prev_delimiters.push(this.delimiters), this.delimiters = [], n = { delimiters: this.delimiters }), this.pendingLevel = this.level, this.tokens.push(i), this.tokens_meta.push(n), i;
};
dr.prototype.scanDelims = function(e, t) {
  const r = this.posMax, i = this.src.charCodeAt(e), n = e > 0 ? this.src.charCodeAt(e - 1) : 32;
  let u = e;
  for (; u < r && this.src.charCodeAt(u) === i; )
    u++;
  const s = u - e, o = u < r ? this.src.charCodeAt(u) : 32, a = sr(n) || nr(String.fromCharCode(n)), c = sr(o) || nr(String.fromCharCode(o)), l = ur(n), d = ur(o), f = !d && (!c || l || a), h = !l && (!a || d || c);
  return { can_open: f && (t || !h || a), can_close: h && (t || !f || c), length: s };
};
dr.prototype.Token = Q;
function Yl(e) {
  switch (e) {
    case 10:
    case 33:
    case 35:
    case 36:
    case 37:
    case 38:
    case 42:
    case 43:
    case 45:
    case 58:
    case 60:
    case 61:
    case 62:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 125:
    case 126:
      return !0;
    default:
      return !1;
  }
}
function ed(e, t) {
  let r = e.pos;
  for (; r < e.posMax && !Yl(e.src.charCodeAt(r)); )
    r++;
  return r === e.pos ? !1 : (t || (e.pending += e.src.slice(e.pos, r)), e.pos = r, !0);
}
const td = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;
function rd(e, t) {
  if (!e.md.options.linkify || e.linkLevel > 0) return !1;
  const r = e.pos, i = e.posMax;
  if (r + 3 > i || e.src.charCodeAt(r) !== 58 || e.src.charCodeAt(r + 1) !== 47 || e.src.charCodeAt(r + 2) !== 47) return !1;
  const n = e.pending.match(td);
  if (!n) return !1;
  const u = n[1], s = e.md.linkify.matchAtStart(e.src.slice(r - u.length));
  if (!s) return !1;
  let o = s.url;
  if (o.length <= u.length) return !1;
  o = o.replace(/\*+$/, "");
  const a = e.md.normalizeLink(o);
  if (!e.md.validateLink(a)) return !1;
  if (!t) {
    e.pending = e.pending.slice(0, -u.length);
    const c = e.push("link_open", "a", 1);
    c.attrs = [["href", a]], c.markup = "linkify", c.info = "auto";
    const l = e.push("text", "", 0);
    l.content = e.md.normalizeLinkText(o);
    const d = e.push("link_close", "a", -1);
    d.markup = "linkify", d.info = "auto";
  }
  return e.pos += o.length - u.length, !0;
}
function id(e, t) {
  let r = e.pos;
  if (e.src.charCodeAt(r) !== 10)
    return !1;
  const i = e.pending.length - 1, n = e.posMax;
  if (!t)
    if (i >= 0 && e.pending.charCodeAt(i) === 32)
      if (i >= 1 && e.pending.charCodeAt(i - 1) === 32) {
        let u = i - 1;
        for (; u >= 1 && e.pending.charCodeAt(u - 1) === 32; ) u--;
        e.pending = e.pending.slice(0, u), e.push("hardbreak", "br", 0);
      } else
        e.pending = e.pending.slice(0, -1), e.push("softbreak", "br", 0);
    else
      e.push("softbreak", "br", 0);
  for (r++; r < n && F(e.src.charCodeAt(r)); )
    r++;
  return e.pos = r, !0;
}
const Wi = [];
for (let e = 0; e < 256; e++)
  Wi.push(0);
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e) {
  Wi[e.charCodeAt(0)] = 1;
});
function ud(e, t) {
  let r = e.pos;
  const i = e.posMax;
  if (e.src.charCodeAt(r) !== 92 || (r++, r >= i)) return !1;
  let n = e.src.charCodeAt(r);
  if (n === 10) {
    for (t || e.push("hardbreak", "br", 0), r++; r < i && (n = e.src.charCodeAt(r), !!F(n)); )
      r++;
    return e.pos = r, !0;
  }
  let u = e.src[r];
  if (n >= 55296 && n <= 56319 && r + 1 < i) {
    const o = e.src.charCodeAt(r + 1);
    o >= 56320 && o <= 57343 && (u += e.src[r + 1], r++);
  }
  const s = "\\" + u;
  if (!t) {
    const o = e.push("text_special", "", 0);
    n < 256 && Wi[n] !== 0 ? o.content = u : o.content = s, o.markup = s, o.info = "escape";
  }
  return e.pos = r + 1, !0;
}
function nd(e, t) {
  let r = e.pos;
  if (e.src.charCodeAt(r) !== 96)
    return !1;
  const n = r;
  r++;
  const u = e.posMax;
  for (; r < u && e.src.charCodeAt(r) === 96; )
    r++;
  const s = e.src.slice(n, r), o = s.length;
  if (e.backticksScanned && (e.backticks[o] || 0) <= n)
    return t || (e.pending += s), e.pos += o, !0;
  let a = r, c;
  for (; (c = e.src.indexOf("`", a)) !== -1; ) {
    for (a = c + 1; a < u && e.src.charCodeAt(a) === 96; )
      a++;
    const l = a - c;
    if (l === o) {
      if (!t) {
        const d = e.push("code_inline", "code", 0);
        d.markup = s, d.content = e.src.slice(r, c).replace(/\n/g, " ").replace(/^ (.+) $/, "$1");
      }
      return e.pos = a, !0;
    }
    e.backticks[l] = c;
  }
  return e.backticksScanned = !0, t || (e.pending += s), e.pos += o, !0;
}
function sd(e, t) {
  const r = e.pos, i = e.src.charCodeAt(r);
  if (t || i !== 126)
    return !1;
  const n = e.scanDelims(e.pos, !0);
  let u = n.length;
  const s = String.fromCharCode(i);
  if (u < 2)
    return !1;
  let o;
  u % 2 && (o = e.push("text", "", 0), o.content = s, u--);
  for (let a = 0; a < u; a += 2)
    o = e.push("text", "", 0), o.content = s + s, e.delimiters.push({
      marker: i,
      length: 0,
      // disable "rule of 3" length checks meant for emphasis
      token: e.tokens.length - 1,
      end: -1,
      open: n.can_open,
      close: n.can_close
    });
  return e.pos += n.length, !0;
}
function ds(e, t) {
  let r;
  const i = [], n = t.length;
  for (let u = 0; u < n; u++) {
    const s = t[u];
    if (s.marker !== 126 || s.end === -1)
      continue;
    const o = t[s.end];
    r = e.tokens[s.token], r.type = "s_open", r.tag = "s", r.nesting = 1, r.markup = "~~", r.content = "", r = e.tokens[o.token], r.type = "s_close", r.tag = "s", r.nesting = -1, r.markup = "~~", r.content = "", e.tokens[o.token - 1].type === "text" && e.tokens[o.token - 1].content === "~" && i.push(o.token - 1);
  }
  for (; i.length; ) {
    const u = i.pop();
    let s = u + 1;
    for (; s < e.tokens.length && e.tokens[s].type === "s_close"; )
      s++;
    s--, u !== s && (r = e.tokens[s], e.tokens[s] = e.tokens[u], e.tokens[u] = r);
  }
}
function od(e) {
  const t = e.tokens_meta, r = e.tokens_meta.length;
  ds(e, e.delimiters);
  for (let i = 0; i < r; i++)
    t[i] && t[i].delimiters && ds(e, t[i].delimiters);
}
const Mo = {
  tokenize: sd,
  postProcess: od
};
function ad(e, t) {
  const r = e.pos, i = e.src.charCodeAt(r);
  if (t || i !== 95 && i !== 42)
    return !1;
  const n = e.scanDelims(e.pos, i === 42);
  for (let u = 0; u < n.length; u++) {
    const s = e.push("text", "", 0);
    s.content = String.fromCharCode(i), e.delimiters.push({
      // Char code of the starting marker (number).
      //
      marker: i,
      // Total length of these series of delimiters.
      //
      length: n.length,
      // A position of the token this delimiter corresponds to.
      //
      token: e.tokens.length - 1,
      // If this delimiter is matched as a valid opener, `end` will be
      // equal to its position, otherwise it's `-1`.
      //
      end: -1,
      // Boolean flags that determine if this delimiter could open or close
      // an emphasis.
      //
      open: n.can_open,
      close: n.can_close
    });
  }
  return e.pos += n.length, !0;
}
function fs(e, t) {
  const r = t.length;
  for (let i = r - 1; i >= 0; i--) {
    const n = t[i];
    if (n.marker !== 95 && n.marker !== 42 || n.end === -1)
      continue;
    const u = t[n.end], s = i > 0 && t[i - 1].end === n.end + 1 && // check that first two markers match and adjacent
    t[i - 1].marker === n.marker && t[i - 1].token === n.token - 1 && // check that last two markers are adjacent (we can safely assume they match)
    t[n.end + 1].token === u.token + 1, o = String.fromCharCode(n.marker), a = e.tokens[n.token];
    a.type = s ? "strong_open" : "em_open", a.tag = s ? "strong" : "em", a.nesting = 1, a.markup = s ? o + o : o, a.content = "";
    const c = e.tokens[u.token];
    c.type = s ? "strong_close" : "em_close", c.tag = s ? "strong" : "em", c.nesting = -1, c.markup = s ? o + o : o, c.content = "", s && (e.tokens[t[i - 1].token].content = "", e.tokens[t[n.end + 1].token].content = "", i--);
  }
}
function cd(e) {
  const t = e.tokens_meta, r = e.tokens_meta.length;
  fs(e, e.delimiters);
  for (let i = 0; i < r; i++)
    t[i] && t[i].delimiters && fs(e, t[i].delimiters);
}
const jo = {
  tokenize: ad,
  postProcess: cd
};
function ld(e, t) {
  let r, i, n, u, s = "", o = "", a = e.pos, c = !0;
  if (e.src.charCodeAt(e.pos) !== 91)
    return !1;
  const l = e.pos, d = e.posMax, f = e.pos + 1, h = e.md.helpers.parseLinkLabel(e, e.pos, !0);
  if (h < 0)
    return !1;
  let p = h + 1;
  if (p < d && e.src.charCodeAt(p) === 40) {
    for (c = !1, p++; p < d && (r = e.src.charCodeAt(p), !(!F(r) && r !== 10)); p++)
      ;
    if (p >= d)
      return !1;
    if (a = p, n = e.md.helpers.parseLinkDestination(e.src, p, e.posMax), n.ok) {
      for (s = e.md.normalizeLink(n.str), e.md.validateLink(s) ? p = n.pos : s = "", a = p; p < d && (r = e.src.charCodeAt(p), !(!F(r) && r !== 10)); p++)
        ;
      if (n = e.md.helpers.parseLinkTitle(e.src, p, e.posMax), p < d && a !== p && n.ok)
        for (o = n.str, p = n.pos; p < d && (r = e.src.charCodeAt(p), !(!F(r) && r !== 10)); p++)
          ;
    }
    (p >= d || e.src.charCodeAt(p) !== 41) && (c = !0), p++;
  }
  if (c) {
    if (typeof e.env.references > "u")
      return !1;
    if (p < d && e.src.charCodeAt(p) === 91 ? (a = p + 1, p = e.md.helpers.parseLinkLabel(e, p), p >= 0 ? i = e.src.slice(a, p++) : p = h + 1) : p = h + 1, i || (i = e.src.slice(f, h)), u = e.env.references[Ur(i)], !u)
      return e.pos = l, !1;
    s = u.href, o = u.title;
  }
  if (!t) {
    e.pos = f, e.posMax = h;
    const _ = e.push("link_open", "a", 1), m = [["href", s]];
    _.attrs = m, o && m.push(["title", o]), e.linkLevel++, e.md.inline.tokenize(e), e.linkLevel--, e.push("link_close", "a", -1);
  }
  return e.pos = p, e.posMax = d, !0;
}
function dd(e, t) {
  let r, i, n, u, s, o, a, c, l = "";
  const d = e.pos, f = e.posMax;
  if (e.src.charCodeAt(e.pos) !== 33 || e.src.charCodeAt(e.pos + 1) !== 91)
    return !1;
  const h = e.pos + 2, p = e.md.helpers.parseLinkLabel(e, e.pos + 1, !1);
  if (p < 0)
    return !1;
  if (u = p + 1, u < f && e.src.charCodeAt(u) === 40) {
    for (u++; u < f && (r = e.src.charCodeAt(u), !(!F(r) && r !== 10)); u++)
      ;
    if (u >= f)
      return !1;
    for (c = u, o = e.md.helpers.parseLinkDestination(e.src, u, e.posMax), o.ok && (l = e.md.normalizeLink(o.str), e.md.validateLink(l) ? u = o.pos : l = ""), c = u; u < f && (r = e.src.charCodeAt(u), !(!F(r) && r !== 10)); u++)
      ;
    if (o = e.md.helpers.parseLinkTitle(e.src, u, e.posMax), u < f && c !== u && o.ok)
      for (a = o.str, u = o.pos; u < f && (r = e.src.charCodeAt(u), !(!F(r) && r !== 10)); u++)
        ;
    else
      a = "";
    if (u >= f || e.src.charCodeAt(u) !== 41)
      return e.pos = d, !1;
    u++;
  } else {
    if (typeof e.env.references > "u")
      return !1;
    if (u < f && e.src.charCodeAt(u) === 91 ? (c = u + 1, u = e.md.helpers.parseLinkLabel(e, u), u >= 0 ? n = e.src.slice(c, u++) : u = p + 1) : u = p + 1, n || (n = e.src.slice(h, p)), s = e.env.references[Ur(n)], !s)
      return e.pos = d, !1;
    l = s.href, a = s.title;
  }
  if (!t) {
    i = e.src.slice(h, p);
    const _ = [];
    e.md.inline.parse(
      i,
      e.md,
      e.env,
      _
    );
    const m = e.push("image", "img", 0), v = [["src", l], ["alt", ""]];
    m.attrs = v, m.children = _, m.content = i, a && v.push(["title", a]);
  }
  return e.pos = u, e.posMax = f, !0;
}
const fd = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/, hd = /^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;
function pd(e, t) {
  let r = e.pos;
  if (e.src.charCodeAt(r) !== 60)
    return !1;
  const i = e.pos, n = e.posMax;
  for (; ; ) {
    if (++r >= n) return !1;
    const s = e.src.charCodeAt(r);
    if (s === 60) return !1;
    if (s === 62) break;
  }
  const u = e.src.slice(i + 1, r);
  if (hd.test(u)) {
    const s = e.md.normalizeLink(u);
    if (!e.md.validateLink(s))
      return !1;
    if (!t) {
      const o = e.push("link_open", "a", 1);
      o.attrs = [["href", s]], o.markup = "autolink", o.info = "auto";
      const a = e.push("text", "", 0);
      a.content = e.md.normalizeLinkText(u);
      const c = e.push("link_close", "a", -1);
      c.markup = "autolink", c.info = "auto";
    }
    return e.pos += u.length + 2, !0;
  }
  if (fd.test(u)) {
    const s = e.md.normalizeLink("mailto:" + u);
    if (!e.md.validateLink(s))
      return !1;
    if (!t) {
      const o = e.push("link_open", "a", 1);
      o.attrs = [["href", s]], o.markup = "autolink", o.info = "auto";
      const a = e.push("text", "", 0);
      a.content = e.md.normalizeLinkText(u);
      const c = e.push("link_close", "a", -1);
      c.markup = "autolink", c.info = "auto";
    }
    return e.pos += u.length + 2, !0;
  }
  return !1;
}
function _d(e) {
  return /^<a[>\s]/i.test(e);
}
function md(e) {
  return /^<\/a\s*>/i.test(e);
}
function bd(e) {
  const t = e | 32;
  return t >= 97 && t <= 122;
}
function gd(e, t) {
  if (!e.md.options.html)
    return !1;
  const r = e.posMax, i = e.pos;
  if (e.src.charCodeAt(i) !== 60 || i + 2 >= r)
    return !1;
  const n = e.src.charCodeAt(i + 1);
  if (n !== 33 && n !== 63 && n !== 47 && !bd(n))
    return !1;
  const u = e.src.slice(i).match(Ql);
  if (!u)
    return !1;
  if (!t) {
    const s = e.push("html_inline", "", 0);
    s.content = u[0], _d(s.content) && e.linkLevel++, md(s.content) && e.linkLevel--;
  }
  return e.pos += u[0].length, !0;
}
const vd = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i, wd = /^&([a-z][a-z0-9]{1,31});/i;
function yd(e, t) {
  const r = e.pos, i = e.posMax;
  if (e.src.charCodeAt(r) !== 38 || r + 1 >= i) return !1;
  if (e.src.charCodeAt(r + 1) === 35) {
    const u = e.src.slice(r).match(vd);
    if (u) {
      if (!t) {
        const s = u[1][0].toLowerCase() === "x" ? parseInt(u[1].slice(1), 16) : parseInt(u[1], 10), o = e.push("text_special", "", 0);
        o.content = Gi(s) ? Dr(s) : Dr(65533), o.markup = u[0], o.info = "entity";
      }
      return e.pos += u[0].length, !0;
    }
  } else {
    const u = e.src.slice(r).match(wd);
    if (u) {
      const s = Oo(u[0]);
      if (s !== u[0]) {
        if (!t) {
          const o = e.push("text_special", "", 0);
          o.content = s, o.markup = u[0], o.info = "entity";
        }
        return e.pos += u[0].length, !0;
      }
    }
  }
  return !1;
}
function hs(e) {
  const t = {}, r = e.length;
  if (!r) return;
  let i = 0, n = -2;
  const u = [];
  for (let s = 0; s < r; s++) {
    const o = e[s];
    if (u.push(0), (e[i].marker !== o.marker || n !== o.token - 1) && (i = s), n = o.token, o.length = o.length || 0, !o.close) continue;
    t.hasOwnProperty(o.marker) || (t[o.marker] = [-1, -1, -1, -1, -1, -1]);
    const a = t[o.marker][(o.open ? 3 : 0) + o.length % 3];
    let c = i - u[i] - 1, l = c;
    for (; c > a; c -= u[c] + 1) {
      const d = e[c];
      if (d.marker === o.marker && d.open && d.end < 0) {
        let f = !1;
        if ((d.close || o.open) && (d.length + o.length) % 3 === 0 && (d.length % 3 !== 0 || o.length % 3 !== 0) && (f = !0), !f) {
          const h = c > 0 && !e[c - 1].open ? u[c - 1] + 1 : 0;
          u[s] = s - c + h, u[c] = h, o.open = !1, d.end = s, d.close = !1, l = -1, n = -2;
          break;
        }
      }
    }
    l !== -1 && (t[o.marker][(o.open ? 3 : 0) + (o.length || 0) % 3] = l);
  }
}
function xd(e) {
  const t = e.tokens_meta, r = e.tokens_meta.length;
  hs(e.delimiters);
  for (let i = 0; i < r; i++)
    t[i] && t[i].delimiters && hs(t[i].delimiters);
}
function Ed(e) {
  let t, r, i = 0;
  const n = e.tokens, u = e.tokens.length;
  for (t = r = 0; t < u; t++)
    n[t].nesting < 0 && i--, n[t].level = i, n[t].nesting > 0 && i++, n[t].type === "text" && t + 1 < u && n[t + 1].type === "text" ? n[t + 1].content = n[t].content + n[t + 1].content : (t !== r && (n[r] = n[t]), r++);
  t !== r && (n.length = r);
}
const oi = [
  ["text", ed],
  ["linkify", rd],
  ["newline", id],
  ["escape", ud],
  ["backticks", nd],
  ["strikethrough", Mo.tokenize],
  ["emphasis", jo.tokenize],
  ["link", ld],
  ["image", dd],
  ["autolink", pd],
  ["html_inline", gd],
  ["entity", yd]
], ai = [
  ["balance_pairs", xd],
  ["strikethrough", Mo.postProcess],
  ["emphasis", jo.postProcess],
  // rules for pairs separate '**' into its own text tokens, which may be left unused,
  // rule below merges unused segments back with the rest of the text
  ["fragments_join", Ed]
];
function fr() {
  this.ruler = new L();
  for (let e = 0; e < oi.length; e++)
    this.ruler.push(oi[e][0], oi[e][1]);
  this.ruler2 = new L();
  for (let e = 0; e < ai.length; e++)
    this.ruler2.push(ai[e][0], ai[e][1]);
}
fr.prototype.skipToken = function(e) {
  const t = e.pos, r = this.ruler.getRules(""), i = r.length, n = e.md.options.maxNesting, u = e.cache;
  if (typeof u[t] < "u") {
    e.pos = u[t];
    return;
  }
  let s = !1;
  if (e.level < n) {
    for (let o = 0; o < i; o++)
      if (e.level++, s = r[o](e, !0), e.level--, s) {
        if (t >= e.pos)
          throw new Error("inline rule didn't increment state.pos");
        break;
      }
  } else
    e.pos = e.posMax;
  s || e.pos++, u[t] = e.pos;
};
fr.prototype.tokenize = function(e) {
  const t = this.ruler.getRules(""), r = t.length, i = e.posMax, n = e.md.options.maxNesting;
  for (; e.pos < i; ) {
    const u = e.pos;
    let s = !1;
    if (e.level < n) {
      for (let o = 0; o < r; o++)
        if (s = t[o](e, !1), s) {
          if (u >= e.pos)
            throw new Error("inline rule didn't increment state.pos");
          break;
        }
    }
    if (s) {
      if (e.pos >= i)
        break;
      continue;
    }
    e.pending += e.src[e.pos++];
  }
  e.pending && e.pushPending();
};
fr.prototype.parse = function(e, t, r, i) {
  const n = new this.State(e, t, r, i);
  this.tokenize(n);
  const u = this.ruler2.getRules(""), s = u.length;
  for (let o = 0; o < s; o++)
    u[o](n);
};
fr.prototype.State = dr;
function kd(e) {
  const t = {};
  e = e || {}, t.src_Any = Do.source, t.src_Cc = So.source, t.src_Z = Po.source, t.src_P = Bi.source, t.src_ZPCc = [t.src_Z, t.src_P, t.src_Cc].join("|"), t.src_ZCc = [t.src_Z, t.src_Cc].join("|");
  const r = "[><｜]";
  return t.src_pseudo_letter = "(?:(?!" + r + "|" + t.src_ZPCc + ")" + t.src_Any + ")", t.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)", t.src_auth = "(?:(?:(?!" + t.src_ZCc + "|[@/\\[\\]()]).)+@)?", t.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?", t.src_host_terminator = "(?=$|" + r + "|" + t.src_ZPCc + ")(?!" + (e["---"] ? "-(?!--)|" : "-|") + "_|:\\d|\\.-|\\.(?!$|" + t.src_ZPCc + "))", t.src_path = "(?:[/?#](?:(?!" + t.src_ZCc + "|" + r + `|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!` + t.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + t.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + t.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + t.src_ZCc + `|["]).)+\\"|\\'(?:(?!` + t.src_ZCc + "|[']).)+\\'|\\'(?=" + t.src_pseudo_letter + "|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" + t.src_ZCc + "|[.]|$)|" + (e["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + // allow `,,,` in paths
  ",(?!" + t.src_ZCc + "|$)|;(?!" + t.src_ZCc + "|$)|\\!+(?!" + t.src_ZCc + "|[!]|$)|\\?(?!" + t.src_ZCc + "|[?]|$))+|\\/)?", t.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*', t.src_xn = "xn--[a-z0-9\\-]{1,59}", t.src_domain_root = // Allow letters & digits (http://test1)
  "(?:" + t.src_xn + "|" + t.src_pseudo_letter + "{1,63})", t.src_domain = "(?:" + t.src_xn + "|(?:" + t.src_pseudo_letter + ")|(?:" + t.src_pseudo_letter + "(?:-|" + t.src_pseudo_letter + "){0,61}" + t.src_pseudo_letter + "))", t.src_host = "(?:(?:(?:(?:" + t.src_domain + ")\\.)*" + t.src_domain + "))", t.tpl_host_fuzzy = "(?:" + t.src_ip4 + "|(?:(?:(?:" + t.src_domain + ")\\.)+(?:%TLDS%)))", t.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + t.src_domain + ")\\.)+(?:%TLDS%))", t.src_host_strict = t.src_host + t.src_host_terminator, t.tpl_host_fuzzy_strict = t.tpl_host_fuzzy + t.src_host_terminator, t.src_host_port_strict = t.src_host + t.src_port + t.src_host_terminator, t.tpl_host_port_fuzzy_strict = t.tpl_host_fuzzy + t.src_port + t.src_host_terminator, t.tpl_host_port_no_ip_fuzzy_strict = t.tpl_host_no_ip_fuzzy + t.src_port + t.src_host_terminator, t.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + t.src_ZPCc + "|>|$))", t.tpl_email_fuzzy = "(^|" + r + '|"|\\(|' + t.src_ZCc + ")(" + t.src_email_name + "@" + t.tpl_host_fuzzy_strict + ")", t.tpl_link_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
  // but can start with > (markdown blockquote)
  "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + t.src_ZPCc + "))((?![$+<=>^`|｜])" + t.tpl_host_port_fuzzy_strict + t.src_path + ")", t.tpl_link_no_ip_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
  // but can start with > (markdown blockquote)
  "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + t.src_ZPCc + "))((?![$+<=>^`|｜])" + t.tpl_host_port_no_ip_fuzzy_strict + t.src_path + ")", t;
}
function xi(e) {
  return Array.prototype.slice.call(arguments, 1).forEach(function(r) {
    r && Object.keys(r).forEach(function(i) {
      e[i] = r[i];
    });
  }), e;
}
function Lr(e) {
  return Object.prototype.toString.call(e);
}
function Cd(e) {
  return Lr(e) === "[object String]";
}
function Ad(e) {
  return Lr(e) === "[object Object]";
}
function Fd(e) {
  return Lr(e) === "[object RegExp]";
}
function ps(e) {
  return Lr(e) === "[object Function]";
}
function Dd(e) {
  return e.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}
const Bo = {
  fuzzyLink: !0,
  fuzzyEmail: !0,
  fuzzyIP: !1
};
function Sd(e) {
  return Object.keys(e || {}).reduce(function(t, r) {
    return t || Bo.hasOwnProperty(r);
  }, !1);
}
const Rd = {
  "http:": {
    validate: function(e, t, r) {
      const i = e.slice(t);
      return r.re.http || (r.re.http = new RegExp(
        "^\\/\\/" + r.re.src_auth + r.re.src_host_port_strict + r.re.src_path,
        "i"
      )), r.re.http.test(i) ? i.match(r.re.http)[0].length : 0;
    }
  },
  "https:": "http:",
  "ftp:": "http:",
  "//": {
    validate: function(e, t, r) {
      const i = e.slice(t);
      return r.re.no_http || (r.re.no_http = new RegExp(
        "^" + r.re.src_auth + // Don't allow single-level domains, because of false positives like '//test'
        // with code comments
        "(?:localhost|(?:(?:" + r.re.src_domain + ")\\.)+" + r.re.src_domain_root + ")" + r.re.src_port + r.re.src_host_terminator + r.re.src_path,
        "i"
      )), r.re.no_http.test(i) ? t >= 3 && e[t - 3] === ":" || t >= 3 && e[t - 3] === "/" ? 0 : i.match(r.re.no_http)[0].length : 0;
    }
  },
  "mailto:": {
    validate: function(e, t, r) {
      const i = e.slice(t);
      return r.re.mailto || (r.re.mailto = new RegExp(
        "^" + r.re.src_email_name + "@" + r.re.src_host_strict,
        "i"
      )), r.re.mailto.test(i) ? i.match(r.re.mailto)[0].length : 0;
    }
  }
}, Pd = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]", Id = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
function Od(e) {
  e.__index__ = -1, e.__text_cache__ = "";
}
function qd(e) {
  return function(t, r) {
    const i = t.slice(r);
    return e.test(i) ? i.match(e)[0].length : 0;
  };
}
function _s() {
  return function(e, t) {
    t.normalize(e);
  };
}
function Sr(e) {
  const t = e.re = kd(e.__opts__), r = e.__tlds__.slice();
  e.onCompile(), e.__tlds_replaced__ || r.push(Pd), r.push(t.src_xn), t.src_tlds = r.join("|");
  function i(o) {
    return o.replace("%TLDS%", t.src_tlds);
  }
  t.email_fuzzy = RegExp(i(t.tpl_email_fuzzy), "i"), t.link_fuzzy = RegExp(i(t.tpl_link_fuzzy), "i"), t.link_no_ip_fuzzy = RegExp(i(t.tpl_link_no_ip_fuzzy), "i"), t.host_fuzzy_test = RegExp(i(t.tpl_host_fuzzy_test), "i");
  const n = [];
  e.__compiled__ = {};
  function u(o, a) {
    throw new Error('(LinkifyIt) Invalid schema "' + o + '": ' + a);
  }
  Object.keys(e.__schemas__).forEach(function(o) {
    const a = e.__schemas__[o];
    if (a === null)
      return;
    const c = { validate: null, link: null };
    if (e.__compiled__[o] = c, Ad(a)) {
      Fd(a.validate) ? c.validate = qd(a.validate) : ps(a.validate) ? c.validate = a.validate : u(o, a), ps(a.normalize) ? c.normalize = a.normalize : a.normalize ? u(o, a) : c.normalize = _s();
      return;
    }
    if (Cd(a)) {
      n.push(o);
      return;
    }
    u(o, a);
  }), n.forEach(function(o) {
    e.__compiled__[e.__schemas__[o]] && (e.__compiled__[o].validate = e.__compiled__[e.__schemas__[o]].validate, e.__compiled__[o].normalize = e.__compiled__[e.__schemas__[o]].normalize);
  }), e.__compiled__[""] = { validate: null, normalize: _s() };
  const s = Object.keys(e.__compiled__).filter(function(o) {
    return o.length > 0 && e.__compiled__[o];
  }).map(Dd).join("|");
  e.re.schema_test = RegExp("(^|(?!_)(?:[><｜]|" + t.src_ZPCc + "))(" + s + ")", "i"), e.re.schema_search = RegExp("(^|(?!_)(?:[><｜]|" + t.src_ZPCc + "))(" + s + ")", "ig"), e.re.schema_at_start = RegExp("^" + e.re.schema_search.source, "i"), e.re.pretest = RegExp(
    "(" + e.re.schema_test.source + ")|(" + e.re.host_fuzzy_test.source + ")|@",
    "i"
  ), Od(e);
}
function zd(e, t) {
  const r = e.__index__, i = e.__last_index__, n = e.__text_cache__.slice(r, i);
  this.schema = e.__schema__.toLowerCase(), this.index = r + t, this.lastIndex = i + t, this.raw = n, this.text = n, this.url = n;
}
function Ei(e, t) {
  const r = new zd(e, t);
  return e.__compiled__[r.schema].normalize(r, e), r;
}
function j(e, t) {
  if (!(this instanceof j))
    return new j(e, t);
  t || Sd(e) && (t = e, e = {}), this.__opts__ = xi({}, Bo, t), this.__index__ = -1, this.__last_index__ = -1, this.__schema__ = "", this.__text_cache__ = "", this.__schemas__ = xi({}, Rd, e), this.__compiled__ = {}, this.__tlds__ = Id, this.__tlds_replaced__ = !1, this.re = {}, Sr(this);
}
j.prototype.add = function(t, r) {
  return this.__schemas__[t] = r, Sr(this), this;
};
j.prototype.set = function(t) {
  return this.__opts__ = xi(this.__opts__, t), this;
};
j.prototype.test = function(t) {
  if (this.__text_cache__ = t, this.__index__ = -1, !t.length)
    return !1;
  let r, i, n, u, s, o, a, c, l;
  if (this.re.schema_test.test(t)) {
    for (a = this.re.schema_search, a.lastIndex = 0; (r = a.exec(t)) !== null; )
      if (u = this.testSchemaAt(t, r[2], a.lastIndex), u) {
        this.__schema__ = r[2], this.__index__ = r.index + r[1].length, this.__last_index__ = r.index + r[0].length + u;
        break;
      }
  }
  return this.__opts__.fuzzyLink && this.__compiled__["http:"] && (c = t.search(this.re.host_fuzzy_test), c >= 0 && (this.__index__ < 0 || c < this.__index__) && (i = t.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null && (s = i.index + i[1].length, (this.__index__ < 0 || s < this.__index__) && (this.__schema__ = "", this.__index__ = s, this.__last_index__ = i.index + i[0].length))), this.__opts__.fuzzyEmail && this.__compiled__["mailto:"] && (l = t.indexOf("@"), l >= 0 && (n = t.match(this.re.email_fuzzy)) !== null && (s = n.index + n[1].length, o = n.index + n[0].length, (this.__index__ < 0 || s < this.__index__ || s === this.__index__ && o > this.__last_index__) && (this.__schema__ = "mailto:", this.__index__ = s, this.__last_index__ = o))), this.__index__ >= 0;
};
j.prototype.pretest = function(t) {
  return this.re.pretest.test(t);
};
j.prototype.testSchemaAt = function(t, r, i) {
  return this.__compiled__[r.toLowerCase()] ? this.__compiled__[r.toLowerCase()].validate(t, i, this) : 0;
};
j.prototype.match = function(t) {
  const r = [];
  let i = 0;
  this.__index__ >= 0 && this.__text_cache__ === t && (r.push(Ei(this, i)), i = this.__last_index__);
  let n = i ? t.slice(i) : t;
  for (; this.test(n); )
    r.push(Ei(this, i)), n = n.slice(this.__last_index__), i += this.__last_index__;
  return r.length ? r : null;
};
j.prototype.matchAtStart = function(t) {
  if (this.__text_cache__ = t, this.__index__ = -1, !t.length) return null;
  const r = this.re.schema_at_start.exec(t);
  if (!r) return null;
  const i = this.testSchemaAt(t, r[2], r[0].length);
  return i ? (this.__schema__ = r[2], this.__index__ = r.index + r[1].length, this.__last_index__ = r.index + r[0].length + i, Ei(this, 0)) : null;
};
j.prototype.tlds = function(t, r) {
  return t = Array.isArray(t) ? t : [t], r ? (this.__tlds__ = this.__tlds__.concat(t).sort().filter(function(i, n, u) {
    return i !== u[n - 1];
  }).reverse(), Sr(this), this) : (this.__tlds__ = t.slice(), this.__tlds_replaced__ = !0, Sr(this), this);
};
j.prototype.normalize = function(t) {
  t.schema || (t.url = "http://" + t.url), t.schema === "mailto:" && !/^mailto:/i.test(t.url) && (t.url = "mailto:" + t.url);
};
j.prototype.onCompile = function() {
};
const Ne = 2147483647, V = 36, Qi = 1, or = 26, Ud = 38, $d = 700, No = 72, Go = 128, Ho = "-", Ld = /^xn--/, Td = /[^\0-\x7F]/, Md = /[\x2E\u3002\uFF0E\uFF61]/g, jd = {
  overflow: "Overflow: input needs wider integers to process",
  "not-basic": "Illegal input >= 0x80 (not a basic code point)",
  "invalid-input": "Invalid input"
}, ci = V - Qi, Z = Math.floor, li = String.fromCharCode;
function ae(e) {
  throw new RangeError(jd[e]);
}
function Bd(e, t) {
  const r = [];
  let i = e.length;
  for (; i--; )
    r[i] = t(e[i]);
  return r;
}
function Wo(e, t) {
  const r = e.split("@");
  let i = "";
  r.length > 1 && (i = r[0] + "@", e = r[1]), e = e.replace(Md, ".");
  const n = e.split("."), u = Bd(n, t).join(".");
  return i + u;
}
function Qo(e) {
  const t = [];
  let r = 0;
  const i = e.length;
  for (; r < i; ) {
    const n = e.charCodeAt(r++);
    if (n >= 55296 && n <= 56319 && r < i) {
      const u = e.charCodeAt(r++);
      (u & 64512) == 56320 ? t.push(((n & 1023) << 10) + (u & 1023) + 65536) : (t.push(n), r--);
    } else
      t.push(n);
  }
  return t;
}
const Nd = (e) => String.fromCodePoint(...e), Gd = function(e) {
  return e >= 48 && e < 58 ? 26 + (e - 48) : e >= 65 && e < 91 ? e - 65 : e >= 97 && e < 123 ? e - 97 : V;
}, ms = function(e, t) {
  return e + 22 + 75 * (e < 26) - ((t != 0) << 5);
}, Vo = function(e, t, r) {
  let i = 0;
  for (e = r ? Z(e / $d) : e >> 1, e += Z(e / t); e > ci * or >> 1; i += V)
    e = Z(e / ci);
  return Z(i + (ci + 1) * e / (e + Ud));
}, Zo = function(e) {
  const t = [], r = e.length;
  let i = 0, n = Go, u = No, s = e.lastIndexOf(Ho);
  s < 0 && (s = 0);
  for (let o = 0; o < s; ++o)
    e.charCodeAt(o) >= 128 && ae("not-basic"), t.push(e.charCodeAt(o));
  for (let o = s > 0 ? s + 1 : 0; o < r; ) {
    const a = i;
    for (let l = 1, d = V; ; d += V) {
      o >= r && ae("invalid-input");
      const f = Gd(e.charCodeAt(o++));
      f >= V && ae("invalid-input"), f > Z((Ne - i) / l) && ae("overflow"), i += f * l;
      const h = d <= u ? Qi : d >= u + or ? or : d - u;
      if (f < h)
        break;
      const p = V - h;
      l > Z(Ne / p) && ae("overflow"), l *= p;
    }
    const c = t.length + 1;
    u = Vo(i - a, c, a == 0), Z(i / c) > Ne - n && ae("overflow"), n += Z(i / c), i %= c, t.splice(i++, 0, n);
  }
  return String.fromCodePoint(...t);
}, Jo = function(e) {
  const t = [];
  e = Qo(e);
  const r = e.length;
  let i = Go, n = 0, u = No;
  for (const a of e)
    a < 128 && t.push(li(a));
  const s = t.length;
  let o = s;
  for (s && t.push(Ho); o < r; ) {
    let a = Ne;
    for (const l of e)
      l >= i && l < a && (a = l);
    const c = o + 1;
    a - i > Z((Ne - n) / c) && ae("overflow"), n += (a - i) * c, i = a;
    for (const l of e)
      if (l < i && ++n > Ne && ae("overflow"), l === i) {
        let d = n;
        for (let f = V; ; f += V) {
          const h = f <= u ? Qi : f >= u + or ? or : f - u;
          if (d < h)
            break;
          const p = d - h, _ = V - h;
          t.push(
            li(ms(h + p % _, 0))
          ), d = Z(p / _);
        }
        t.push(li(ms(d, 0))), u = Vo(n, c, o === s), n = 0, ++o;
      }
    ++n, ++i;
  }
  return t.join("");
}, Hd = function(e) {
  return Wo(e, function(t) {
    return Ld.test(t) ? Zo(t.slice(4).toLowerCase()) : t;
  });
}, Wd = function(e) {
  return Wo(e, function(t) {
    return Td.test(t) ? "xn--" + Jo(t) : t;
  });
}, Ko = {
  /**
   * A string representing the current Punycode.js version number.
   * @memberOf punycode
   * @type String
   */
  version: "2.3.1",
  /**
   * An object of methods to convert from JavaScript's internal character
   * representation (UCS-2) to Unicode code points, and back.
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode
   * @type Object
   */
  ucs2: {
    decode: Qo,
    encode: Nd
  },
  decode: Zo,
  encode: Jo,
  toASCII: Wd,
  toUnicode: Hd
}, Qd = {
  options: {
    // Enable HTML tags in source
    html: !1,
    // Use '/' to close single tags (<br />)
    xhtmlOut: !1,
    // Convert '\n' in paragraphs into <br>
    breaks: !1,
    // CSS language prefix for fenced blocks
    langPrefix: "language-",
    // autoconvert URL-like texts to links
    linkify: !1,
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    // Internal protection, recursion limit
    maxNesting: 100
  },
  components: {
    core: {},
    block: {},
    inline: {}
  }
}, Vd = {
  options: {
    // Enable HTML tags in source
    html: !1,
    // Use '/' to close single tags (<br />)
    xhtmlOut: !1,
    // Convert '\n' in paragraphs into <br>
    breaks: !1,
    // CSS language prefix for fenced blocks
    langPrefix: "language-",
    // autoconvert URL-like texts to links
    linkify: !1,
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    // Internal protection, recursion limit
    maxNesting: 20
  },
  components: {
    core: {
      rules: [
        "normalize",
        "block",
        "inline",
        "text_join"
      ]
    },
    block: {
      rules: [
        "paragraph"
      ]
    },
    inline: {
      rules: [
        "text"
      ],
      rules2: [
        "balance_pairs",
        "fragments_join"
      ]
    }
  }
}, Zd = {
  options: {
    // Enable HTML tags in source
    html: !0,
    // Use '/' to close single tags (<br />)
    xhtmlOut: !0,
    // Convert '\n' in paragraphs into <br>
    breaks: !1,
    // CSS language prefix for fenced blocks
    langPrefix: "language-",
    // autoconvert URL-like texts to links
    linkify: !1,
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    // Internal protection, recursion limit
    maxNesting: 20
  },
  components: {
    core: {
      rules: [
        "normalize",
        "block",
        "inline",
        "text_join"
      ]
    },
    block: {
      rules: [
        "blockquote",
        "code",
        "fence",
        "heading",
        "hr",
        "html_block",
        "lheading",
        "list",
        "reference",
        "paragraph"
      ]
    },
    inline: {
      rules: [
        "autolink",
        "backticks",
        "emphasis",
        "entity",
        "escape",
        "html_inline",
        "image",
        "link",
        "newline",
        "text"
      ],
      rules2: [
        "balance_pairs",
        "emphasis",
        "fragments_join"
      ]
    }
  }
}, Jd = {
  default: Qd,
  zero: Vd,
  commonmark: Zd
}, Kd = /^(vbscript|javascript|file|data):/, Xd = /^data:image\/(gif|png|jpeg|webp);/;
function Yd(e) {
  const t = e.trim().toLowerCase();
  return Kd.test(t) ? Xd.test(t) : !0;
}
const Xo = ["http:", "https:", "mailto:"];
function ef(e) {
  const t = ji(e, !0);
  if (t.hostname && (!t.protocol || Xo.indexOf(t.protocol) >= 0))
    try {
      t.hostname = Ko.toASCII(t.hostname);
    } catch {
    }
  return lr(Mi(t));
}
function tf(e) {
  const t = ji(e, !0);
  if (t.hostname && (!t.protocol || Xo.indexOf(t.protocol) >= 0))
    try {
      t.hostname = Ko.toUnicode(t.hostname);
    } catch {
    }
  return Ve(Mi(t), Ve.defaultChars + "%");
}
function N(e, t) {
  if (!(this instanceof N))
    return new N(e, t);
  t || Ni(e) || (t = e || {}, e = "default"), this.inline = new fr(), this.block = new $r(), this.core = new Hi(), this.renderer = new Ke(), this.linkify = new j(), this.validateLink = Yd, this.normalizeLink = ef, this.normalizeLinkText = tf, this.utils = il, this.helpers = zr({}, ol), this.options = {}, this.configure(e), t && this.set(t);
}
N.prototype.set = function(e) {
  return zr(this.options, e), this;
};
N.prototype.configure = function(e) {
  const t = this;
  if (Ni(e)) {
    const r = e;
    if (e = Jd[r], !e)
      throw new Error('Wrong `markdown-it` preset "' + r + '", check name');
  }
  if (!e)
    throw new Error("Wrong `markdown-it` preset, can't be empty");
  return e.options && t.set(e.options), e.components && Object.keys(e.components).forEach(function(r) {
    e.components[r].rules && t[r].ruler.enableOnly(e.components[r].rules), e.components[r].rules2 && t[r].ruler2.enableOnly(e.components[r].rules2);
  }), this;
};
N.prototype.enable = function(e, t) {
  let r = [];
  Array.isArray(e) || (e = [e]), ["core", "block", "inline"].forEach(function(n) {
    r = r.concat(this[n].ruler.enable(e, !0));
  }, this), r = r.concat(this.inline.ruler2.enable(e, !0));
  const i = e.filter(function(n) {
    return r.indexOf(n) < 0;
  });
  if (i.length && !t)
    throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + i);
  return this;
};
N.prototype.disable = function(e, t) {
  let r = [];
  Array.isArray(e) || (e = [e]), ["core", "block", "inline"].forEach(function(n) {
    r = r.concat(this[n].ruler.disable(e, !0));
  }, this), r = r.concat(this.inline.ruler2.disable(e, !0));
  const i = e.filter(function(n) {
    return r.indexOf(n) < 0;
  });
  if (i.length && !t)
    throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + i);
  return this;
};
N.prototype.use = function(e) {
  const t = [this].concat(Array.prototype.slice.call(arguments, 1));
  return e.apply(e, t), this;
};
N.prototype.parse = function(e, t) {
  if (typeof e != "string")
    throw new Error("Input data should be a String");
  const r = new this.core.State(e, this, t);
  return this.core.process(r), r.tokens;
};
N.prototype.render = function(e, t) {
  return t = t || {}, this.renderer.render(this.parse(e, t), this.options, t);
};
N.prototype.parseInline = function(e, t) {
  const r = new this.core.State(e, this, t);
  return r.inlineMode = !0, this.core.process(r), r.tokens;
};
N.prototype.renderInline = function(e, t) {
  return t = t || {}, this.renderer.render(this.parseInline(e, t), this.options, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rf = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, uf = (e) => (...t) => ({ _$litDirective$: e, values: t });
class nf {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, r, i) {
    this._$Ct = t, this._$AM = r, this._$Ci = i;
  }
  _$AS(t, r) {
    return this.update(t, r);
  }
  update(t, r) {
    return this.render(...r);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class ki extends nf {
  constructor(t) {
    if (super(t), this.it = P, t.type !== rf.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(t) {
    if (t === P || t == null) return this._t = void 0, this.it = t;
    if (t === Te) return t;
    if (typeof t != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (t === this.it) return this._t;
    this.it = t;
    const r = [t];
    return r.raw = r, this._t = { _$litType$: this.constructor.resultType, strings: r, values: [] };
  }
}
ki.directiveName = "unsafeHTML", ki.resultType = 1;
const sf = uf(ki), of = se`
  :host {
    height: 100%;
  }

  .dataisland-widget__placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .dataisland-widget__placeholder-img {
    width: 50px;
  }
`, af = "data:image/svg+xml,%3csvg%20width='213'%20height='223'%20viewBox='0%200%20213%20223'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M160.17%20188.212L132.394%20148.728H72.5907L44.815%20188.212H160.17Z'%20fill='url(%23paint0_linear_1524_258352)'/%3e%3cpath%20d='M102.497%200.107422L0.154297%20143.583V222.107L102.497%2078.9116L179.383%20188.212L212.154%20155.979L102.497%200.107422Z'%20fill='url(%23paint1_linear_1524_258352)'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_1524_258352'%20x1='106.154'%20y1='0.107422'%20x2='106.154'%20y2='222.107'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%232D63FE'/%3e%3cstop%20offset='1'%20stop-color='%23457AFE'/%3e%3c/linearGradient%3e%3clinearGradient%20id='paint1_linear_1524_258352'%20x1='106.154'%20y1='0.107422'%20x2='106.154'%20y2='222.107'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%232D63FE'/%3e%3cstop%20offset='1'%20stop-color='%23457AFE'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e";
var cf = Object.defineProperty, lf = Object.getOwnPropertyDescriptor, df = (e, t, r, i) => {
  for (var n = i > 1 ? void 0 : i ? lf(t, r) : t, u = e.length - 1, s; u >= 0; u--)
    (s = e[u]) && (n = (i ? s(t, r, n) : s(n)) || n);
  return i && n && cf(t, r, n), n;
};
let Rr = class extends W {
  render() {
    return U`
      <div class="dataisland-widget__placeholder">
        <img
          class="dataisland-widget__placeholder-img"
          src="${af}"
          alt="logo"
        />
        <p class="dataisland-widget__placeholder-text">
          ${$e("I am ready to answer your questions.")}
        </p>
      </div>
    `;
  }
};
Rr.styles = of;
Rr = df([
  $i()
], Rr);
customElements.define("chat-placeholder", Rr);
const ff = se`
  .dataisland-widget-loader {
    width: 25px;
    aspect-ratio: 2;
    --_g: no-repeat radial-gradient(circle closest-side, #000 90%, #0000);
    background:
      var(--_g) 0% 50%,
      var(--_g) 50% 50%,
      var(--_g) 100% 50%;
    background-size: calc(100% / 3) 50%;
    animation: l3 1s infinite linear;
  }
  @keyframes l3 {
    20% {
      background-position:
        0% 0%,
        50% 50%,
        100% 50%;
    }
    40% {
      background-position:
        0% 100%,
        50% 0%,
        100% 50%;
    }
    60% {
      background-position:
        0% 50%,
        50% 100%,
        100% 0%;
    }
    80% {
      background-position:
        0% 50%,
        50% 50%,
        100% 100%;
    }
  }
`, Ji = class Ji extends W {
  render() {
    return U`<div class="dataisland-widget-loader"></div>`;
  }
};
Ji.styles = ff;
let Ci = Ji;
customElements.define("chat-message-loader", Ci);
var hf = Object.defineProperty, Vi = (e, t, r, i) => {
  for (var n = void 0, u = e.length - 1, s; u >= 0; u--)
    (s = e[u]) && (n = s(t, r, n) || n);
  return n && hf(t, r, n), n;
};
const Ki = class Ki extends W {
  constructor() {
    super(...arguments), this.messages = [], this.loading = !0, this.markdown = new N();
  }
  updated(t) {
    super.updated(t), (t.has("messages") || t.has("loading") || this.messages.length) && this.scrollToBottom();
  }
  scrollToBottom() {
    this.messagesContainer && (this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight);
  }
  render() {
    return U`
      <div class="messages">
        ${this.messages.length === 0 ? U`<chat-placeholder></chat-placeholder>` : this.messages.map((t, r) => U`
                <div class="messages__item">${t._question}</div>

                ${this.loading && r === this.messages.length - 1 ? U`<div class="messages__item">
                      <chat-message-loader></chat-message-loader>
                    </div>` : U`
                      <div class="messages__item">
                        ${sf(this.markdown.render(t._answer))}
                      </div>
                    `}
              `)}
      </div>
    `;
  }
};
Ki.styles = m0;
let Je = Ki;
Vi([
  B({ type: Array })
], Je.prototype, "messages");
Vi([
  B({ type: Boolean })
], Je.prototype, "loading");
Vi([
  ka(".messages")
], Je.prototype, "messagesContainer");
customElements.define("chat-messages", Je);
const pf = "data:image/svg+xml,%3csvg%20width='34'%20height='34'%20viewBox='0%200%2034%2034'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3crect%20width='34'%20height='34'%20rx='8'%20fill='%23356AFE'/%3e%3cpath%20d='M11.2097%2024.6695L13.9506%2020.7732H19.852L22.5929%2024.6695H11.2097Z'%20fill='white'/%3e%3cpath%20d='M16.9009%206.10742L27%2020.2656V28.0143L16.9009%2013.8838L9.31373%2024.6695L6.0799%2021.4888L16.9009%206.10742Z'%20fill='white'/%3e%3c/svg%3e";
async function _f(e, t, r, i, n) {
  try {
    const u = `${e}/api/v1/Keys/user/token/jwt?apiKey=${encodeURIComponent(t)}&userId=${encodeURIComponent(r)}&userName=${encodeURIComponent(i)}&userMetadata=${encodeURIComponent(n)}`;
    return (await fetch(u)).json();
  } catch (u) {
    console.error("request error:", u);
  }
}
const Yo = (e) => (e == null ? void 0 : e.organizations.current) ?? "", bs = async (e) => {
  if (!e)
    throw new Error("no sdk!");
  const t = Yo(e);
  return await (e == null ? void 0 : e.organizations.get(t).chats.create(yo.Dataisland, "")) || null;
}, mf = async (e, t) => {
  if (!e)
    throw new Error("no sdk!");
  const r = Yo(e);
  await (e == null ? void 0 : e.organizations.get(r).chats.delete(t));
}, bf = (e) => {
  var r, i;
  const t = ((r = e == null ? void 0 : e.organizations) == null ? void 0 : r.current) ?? "";
  if (t)
    return (i = e == null ? void 0 : e.organizations.get(t)) == null ? void 0 : i.chats.collection;
  throw new Error("no OrgId!");
}, gf = (e, t, r) => {
  const i = e[t];
  return i ? typeof i == "function" ? i() : Promise.resolve(i) : new Promise((n, u) => {
    (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(
      u.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + t + (t.split("/").length !== r ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
}, vf = "en", wf = [
  "ro",
  "ru",
  "ua"
], { getLocale: yf, setLocale: xf } = n0({
  sourceLocale: vf,
  targetLocales: wf,
  loadLocale: (e) => gf(/* @__PURE__ */ Object.assign({ "./generated/locales/ro.ts": () => import("./ro-BEIcvIu6.js"), "./generated/locales/ru.ts": () => import("./ru-Cgl2LgwE.js"), "./generated/locales/ua.ts": () => import("./ua-tYK9C8LH.js") }), `./generated/locales/${e}.ts`, 4)
});
var Ef = Object.defineProperty, $ = (e, t, r, i) => {
  for (var n = void 0, u = e.length - 1, s; u >= 0; u--)
    (s = e[u]) && (n = s(t, r, n) || n);
  return n && Ef(t, r, n), n;
};
const Xi = class Xi extends W {
  constructor() {
    super(), this.lang = "en", this.apiKey = "", this.apiUrl = "", this.buttonImageUrl = pf, this.title = "Dataisland Chat", this.message = "", this.messages = [], this.isChatOpen = !1, this.sdk = null, this.tokenFromKey = null, this.isChatInitialised = !1, this.chat = null, this.chats = null, this.messageLoading = !1, this.updateAnswer = (t) => {
      const r = [...this.messages], i = r.length - 1;
      r[i] = { ...t }, this.messages = r;
    }, this.clientSignature = null, this.isChatInitialised = !!localStorage.getItem(br.userId);
  }
  computedApiUrl() {
    return this.apiUrl ? this.apiUrl : void 0;
  }
  computedApiKey() {
    return this.apiKey ? this.apiKey : void 0;
  }
  async connectedCallback() {
    super.connectedCallback(), this.lang !== yf() && xf(this.lang), this.isChatInitialised && this.initializeChat();
  }
  startChat() {
    this.isChatInitialised = !0, this.initializeChat();
  }
  generateClientSignature() {
    const t = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    let r = localStorage.getItem(br.userId);
    r || (r = crypto.randomUUID(), localStorage.setItem(br.userId, r)), this.clientSignature = {
      userId: r,
      userName: "Anonymous",
      userMetadata: Object.values(t).join()
    };
  }
  async createChatHandler(t) {
    const r = bf(this.sdk);
    if (this.chats = r, t === Xt.initial)
      r != null && r.length ? this.chat = r[0] : this.chat = await bs(this.sdk);
    else if (t === Xt.new) {
      const i = this.getPrevChat();
      i && await mf(this.sdk, i.id), this.chat = await bs(this.sdk);
    }
    this.chat && await this.getMessagesDialog(this.chat.id);
  }
  getPrevChat() {
    var t;
    return ((t = this.chats) == null ? void 0 : t.filter((r) => {
      var i;
      return r.id !== ((i = this.chat) == null ? void 0 : i.id);
    })[0]) ?? null;
  }
  async revertChat() {
    const t = this.getPrevChat();
    if (!t) throw Error("no lastChat");
    this.chat = t, this.getMessagesDialog(t.id);
  }
  async initializeChat() {
    this.generateClientSignature();
    const { clientSignature: t } = this;
    this.tokenFromKey = await _f(
      this.computedApiUrl(),
      this.computedApiKey(),
      t.userId,
      t.userName,
      t.userMetadata
    ), this.initializeSdk();
  }
  async initializeSdk() {
    if (window != null && window.dataIslandApp)
      return this.sdk = window.dataIslandApp;
    if (this.computedApiUrl && this.tokenFromKey)
      try {
        const { authSchemaName: t, userJwtToken: r } = this.tokenFromKey;
        this.sdk = await ti.dataIslandApp("dataisland-client", async (i) => {
          i.useHost(this.computedApiUrl()), i.useCredential(
            new ti.CustomCredential(t, r)
          );
        }), window.dataIslandApp = this.sdk, this.createChatHandler(Xt.initial);
      } catch (t) {
        console.error("Failed to initialize SDK:", t);
      }
    else
      console.error("apiUrl not provided");
  }
  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }
  sendQuestionMessage() {
    this.messageLoading = !0, this.messages = [
      ...this.messages,
      {
        _question: this.message,
        status: 0,
        id: String(Date.now())
      }
    ];
  }
  async handleSendMessage() {
    if (!(!this.chat || this.message.trim() === "")) {
      this.sendQuestionMessage();
      try {
        const t = await this.chat.ask(this.message, ti.ChatAnswerType.SHORT);
        t == null || t.subscribe(async (r) => {
          this.updateAnswer(r.data), this.messageLoading && (this.messageLoading = !1);
        });
      } catch (t) {
        console.error("Failed to ask in chat:", t);
      } finally {
        this.message = "";
      }
    }
  }
  async getMessagesDialog(t) {
    var r, i;
    if (this.chat)
      try {
        this.messageLoading = !0;
        const n = ((r = this.sdk) == null ? void 0 : r.organizations.current) ?? "", u = (i = this.sdk) == null ? void 0 : i.organizations.get(n).chats.get(t).collection;
        return u ? (this.messages = u, u) : void 0;
      } catch (n) {
        console.log("error", n);
      } finally {
        this.messageLoading = !1;
      }
  }
  render() {
    var t;
    return U`
      <div class="dataisland-widget">
        ${this.isChatOpen ? null : U`
              <chat-button
                .buttonImageUrl="${this.buttonImageUrl}"
                @toggle-chat="${this.toggleChat}"
              ></chat-button>
            `}

        <div
          class="dataisland-widget__wrapper ${this.isChatOpen ? "open" : ""}"
        >
          <chat-header
            .title="${this.title}"
            .showLastChatButton="${!!this.chats && ((t = this.chats) == null ? void 0 : t.length) > 1}"
            @last-chat="${this.revertChat}"
            @new-chat="${() => this.createChatHandler(Xt.new)}"
            @toggle-chat="${this.toggleChat}"
          >
          </chat-header>

          <chat-messages
            .messages="${this.messages}"
            .loading="${this.messageLoading}"
          >
          </chat-messages>

          <chat-input
            .message="${this.message}"
            .isChatInitialised="${this.isChatInitialised}"
            @message-input="${(r) => this.message = r.detail}"
            @send-message="${this.handleSendMessage}"
            @start-chat="${this.startChat}"
          >
          </chat-input>
        </div>
      </div>
    `;
  }
};
Xi.styles = [Ca, wa];
let q = Xi;
$([
  B({ type: String })
], q.prototype, "lang");
$([
  B({ type: String })
], q.prototype, "apiKey");
$([
  B({ type: String })
], q.prototype, "apiUrl");
$([
  B({ type: String })
], q.prototype, "buttonImageUrl");
$([
  B({ type: String })
], q.prototype, "title");
$([
  J()
], q.prototype, "message");
$([
  J()
], q.prototype, "messages");
$([
  J()
], q.prototype, "isChatOpen");
$([
  J()
], q.prototype, "sdk");
$([
  J()
], q.prototype, "clientSignature");
$([
  J()
], q.prototype, "tokenFromKey");
$([
  J()
], q.prototype, "isChatInitialised");
$([
  J()
], q.prototype, "chat");
$([
  J()
], q.prototype, "chats");
$([
  J()
], q.prototype, "messageLoading");
customElements.define("dataisland-widget", q);
