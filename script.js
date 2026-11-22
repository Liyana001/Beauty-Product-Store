/* ============================================================
   Liyana's storefront
   Edit the CONFIG block, the PRODUCTS list and the SKINCARE_IMAGES list to customize.
   ============================================================ */
const CONFIG = {
  brand: "Liyana's",
  // Live chat (tawk.to): Property ID is on your tawk.to dashboard under Administration > Overview.
  // Widget ID stays "default" unless your tawk.to embed code ends in a different ID.
  tawk: { propertyId: "6b01a7f77a329b3cbd98b3ca", widgetId: "1k7v7g8hc" },
  currency: "USD",
  freeShippingOver: 75,
  // Launch countdown. The time is midnight Los Angeles time (PST, UTC-08:00) at the start of launch day.
  // Set lockCheckoutUntilLaunch to true if you want the checkout button disabled until then.
  launch: { iso: "2026-12-17T00:00:00-08:00", label: "17 December 2026", lockCheckoutUntilLaunch: false },
  // Crypto wallets shown at checkout. Double-check any change here: a wrong character means lost funds.
  wallets: [
    { id: "btc", name: "Bitcoin",  ticker: "BTC", network: "Bitcoin network",  address: "bc1qex40nlgampcadnz2r9qa9tmqw0cgpzystpnjwq" },
    { id: "ltc", name: "Litecoin", ticker: "LTC", network: "Litecoin network", address: "ltc1qaqfxgnvdxwhutnrr9v7t2mduv4t4celr34hn82" },
    { id: "trx", name: "Tron",     ticker: "TRX", network: "Tron network",     address: "TBYVxoRqpPwW6byTyDaRq17tdmwJJkN1pd" }
  ]
};

/* ------------------------------------------------------------
   PRODUCTS
   "prices" maps each length (inches) to a price in USD.
   The per-length prices below are spread evenly across the price range
   you gave for each product, so CHECK THEM and edit any that are wrong.
   "img" is the photo in the images/ folder (leave it out to show "Photo coming soon").
   ------------------------------------------------------------ */
const PRODUCTS = [
  {
    id: "straight", name: "Silky Straight Hair", cat: "Straight", img: "images/hair-straight.jpg",
    desc: "Sleek, silky straight bundles with a natural shine.",
    specs: [["Type", "100% virgin Remy human hair"], ["Texture", "Silky, straight"], ["Colour", "Natural black (1B)"], ["Weight", "100g per bundle"]],
    prices: { 12: 85, 14: 97, 16: 109, 18: 121, 20: 133, 22: 144, 24: 156, 26: 168, 28: 180, 30: 192 }
  },
  {
    id: "loose-wave", name: "Loose Wave Hair", cat: "Wavy", img: "images/hair-loose-wave.jpg",
    desc: "Soft, loose waves with effortless movement.",
    specs: [["Type", "Virgin Remy human hair"], ["Texture", "Loose, soft waves"], ["Colour", "Natural black"], ["Weight", "100g per bundle"]],
    prices: { 12: 60, 14: 61, 16: 62, 18: 63, 20: 64, 22: 66, 24: 67, 26: 68, 28: 69, 30: 70 }
  },
  {
    id: "body-wave", name: "Body Wave Hair", cat: "Wavy", img: "",   // add a photo: img: "images/hair-body-wave.jpg"
    desc: "Soft, flowing waves with natural body.",
    specs: [["Type", "Virgin Remy human hair"], ["Texture", "Soft flowing waves"], ["Colour", "Natural black"], ["Weight", "100g per bundle"]],
    prices: { 14: 20, 16: 30, 18: 40, 20: 50, 22: 60, 24: 70, 26: 80, 28: 90, 30: 100 }
  },
  {
    id: "kinky-curly", name: "Kinky Curly Hair", cat: "Curly", img: "images/hair-kinky-curly.jpg",
    desc: "Tight, defined natural curls with full volume.",
    specs: [["Type", "Virgin human hair"], ["Texture", "Tight natural curls"], ["Colour", "Natural black"], ["Weight", "100g per bundle"]],
    prices: { 12: 129, 14: 160, 16: 192, 18: 223, 20: 255, 22: 286, 24: 318, 26: 349 }
  }
];

/* Skincare pictures shown in the Liyana Skincare gallery (files in images/). */
const SKINCARE_IMAGES = [
  ["skin-09.jpg", "Liyana Skincare: Reveal your natural glow"],
  ["skin-01.jpg", "Liyana Skincare collection"],
  ["skin-04.jpg", "Liyana Skincare: healthy, radiant and youthful skin"],
  ["skin-08.jpg", "Liyana Skincare: radiant skin, timeless beauty"],
  ["skin-06.jpg", "Liyana Face Wash"],
  ["skin-07.jpg", "Liyana Sun Cream SPF 50+"],
  ["skin-02.jpg", "Liyana Skincare product range"],
  ["skin-03.jpg", "Liyana Skincare product range"],
  ["skin-05.jpg", "Liyana Skincare: moisturizer, sun cream, face wash and serum"],
  ["skin-10.jpg", "Liyana toner, serum, sun cream, body lotion and creams"],
  ["skin-16.jpg", "Gold-capped skincare set"],
  ["skin-18.jpg", "Skincare bottles and tubes"],
  ["skin-12.jpg", "Skincare bottles with baby's breath"],
  ["skin-13.jpg", "Serums, creams and airless pumps"],
  ["skin-14.jpg", "Rich face cream"],
  ["skin-15.jpg", "Face cream jar"],
  ["skin-17.jpg", "Skincare tube, pump bottle and jar"]
];

/* ---------- helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const money = n => new Intl.NumberFormat("en-US", { style: "currency", currency: CONFIG.currency }).format(n);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const lengthsOf = p => Object.keys(p.prices).map(Number).sort((a, b) => a - b);
const photo = (p, cls = "") => p.img
  ? `<img class="${cls}" src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy">`
  : `<div class="nophoto ${cls}"><span>Photo coming soon</span></div>`;

/* ---------- live chat (tawk.to) ---------- */
window.Tawk_API = window.Tawk_API || {};
window.Tawk_LoadStart = new Date();
function loadChat() {
  const t = CONFIG.tawk;
  if (!t || !t.propertyId) return;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://embed.tawk.to/${t.propertyId}/${t.widgetId || "default"}`;
  s.charset = "UTF-8";
  s.setAttribute("crossorigin", "*");
  document.head.appendChild(s);
}
function toast(msg) {
  const el = $("#toast"); if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toast.t);
  toast.t = setTimeout(() => el.classList.remove("show"), 5000);
}
async function openChat(copy) {
  let copied = false;
  if (copy) copied = await copyText(copy);
  const api = window.Tawk_API;
  if (api && typeof api.maximize === "function") {
    api.maximize();
    if (copy) toast(copied ? "Your order details are copied. Paste them into the chat." : "Chat opened. Please type your order details.");
  } else {
    toast("Chat is still loading. Please try again in a moment.");
  }
}

/* ---------- cart state ---------- */
// Each cart line is one product at one length: { id, len, qty }
let cart = [];
try {
  cart = JSON.parse(localStorage.getItem("liyanas-cart") || "[]");
  cart = cart.filter(i => i && i.len && PRODUCTS.some(p => p.id === i.id && p.prices[i.len] != null));
} catch (e) { cart = []; }
const saveCart = () => { try { localStorage.setItem("liyanas-cart", JSON.stringify(cart)); } catch (e) {} };
const lineKey = i => `${i.id}|${i.len}`;
const findLine = key => cart.find(i => lineKey(i) === key);

function addToCart(id, len) {
  const item = findLine(`${id}|${len}`);
  item ? item.qty++ : cart.push({ id, len: +len, qty: 1 });
  renderCart();
  openCart();
}
function changeQty(key, delta) {
  const item = findLine(key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => lineKey(i) !== key);
  renderCart();
}
function removeItem(key) { cart = cart.filter(i => lineKey(i) !== key); renderCart(); }

function cartDetailed() {
  return cart.map(i => {
    const p = PRODUCTS.find(x => x.id === i.id);
    return p ? { key: lineKey(i), id: p.id, name: p.name, img: p.img, len: i.len, qty: i.qty, unit: p.prices[i.len] } : null;
  }).filter(Boolean);
}

function renderCart() {
  const box = $("#cartItems");
  const detailed = cartDetailed();
  const count = detailed.reduce((s, i) => s + i.qty, 0);
  const subtotal = detailed.reduce((s, i) => s + i.unit * i.qty, 0);

  $("#cartCount").textContent = count;
  $("#subtotal").textContent = money(subtotal);

  if (!detailed.length) {
    box.innerHTML = `<p class="empty">Your bag is empty.<br>Discover something lovely.</p>`;
  } else {
    box.innerHTML = detailed.map(i => `
      <div class="line">
        <div class="mini">${i.img ? `<img src="${esc(i.img)}" alt="">` : ""}</div>
        <div>
          <h4>${esc(i.name)}</h4>
          <p class="small">${i.len} inch · ${money(i.unit)} each</p>
          <div class="qty">
            <button data-act="dec" data-key="${esc(i.key)}" aria-label="Decrease quantity">−</button>
            <span>${i.qty}</span>
            <button data-act="inc" data-key="${esc(i.key)}" aria-label="Increase quantity">+</button>
          </div>
          <button class="rm" data-act="rm" data-key="${esc(i.key)}">Remove</button>
        </div>
        <strong class="price">${money(i.unit * i.qty)}</strong>
      </div>`).join("");
  }

  const remaining = CONFIG.freeShippingOver - subtotal;
  $("#shipNote").textContent = !detailed.length ? ""
    : remaining > 0 ? `Add ${money(remaining)} more for complimentary shipping.`
    : "You've unlocked complimentary shipping.";

  const locked = launchLocked();
  $("#checkout").disabled = !detailed.length || locked;
  $("#checkout").textContent = locked ? `Checkout opens ${CONFIG.launch.label}` : "Pay with Crypto";
  saveCart();
}

/* ---------- drawer ---------- */
function openCart() {
  $("#drawer").classList.add("open");
  $("#drawer").setAttribute("aria-hidden", "false");
  $("#overlay").classList.add("show");
}
function closeCart() {
  $("#drawer").classList.remove("open");
  $("#drawer").setAttribute("aria-hidden", "true");
  $("#overlay").classList.remove("show");
}

/* ---------- shop grid + filters ---------- */
let activeFilter = "All";
function renderFilters() {
  const cats = ["All", ...new Set(PRODUCTS.map(p => p.cat))];
  $("#filters").innerHTML = cats.map(c =>
    `<button class="filter ${c === activeFilter ? "active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
}
function renderGrid() {
  const list = activeFilter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.cat === activeFilter);
  $("#grid").innerHTML = list.map(p => {
    const lens = lengthsOf(p);
    const first = lens[0];
    return `
    <article class="card reveal" data-id="${esc(p.id)}">
      <div class="thumb">${photo(p)}</div>
      <span class="cat">${esc(p.cat)}</span>
      <h3>${esc(p.name)}</h3>
      <p class="desc">${esc(p.desc)}</p>
      <dl class="specs">${p.specs.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
      <label class="len-label">Length
        <select class="len" aria-label="Choose length for ${esc(p.name)}">
          ${lens.map(l => `<option value="${l}">${l} inch</option>`).join("")}
        </select>
      </label>
      <p class="range">${lens[0]}–${lens[lens.length - 1]} inches · ${money(p.prices[lens[0]])} to ${money(p.prices[lens[lens.length - 1]])}</p>
      <div class="foot">
        <span class="price" data-price>${money(p.prices[first])}</span>
        <button class="add" data-add="${esc(p.id)}">Add to Bag</button>
      </div>
    </article>`;
  }).join("");
  observeReveals();
}
function setFilter(cat) {
  activeFilter = cat;
  renderFilters();
  renderGrid();
}

/* ---------- skincare gallery + lightbox ---------- */
function renderGallery() {
  const box = $("#gallery"); if (!box) return;
  box.innerHTML = SKINCARE_IMAGES.map(([f, alt], i) =>
    `<button class="g-item reveal" type="button" data-i="${i}" aria-label="View larger: ${esc(alt)}"><img src="images/${esc(f)}" alt="${esc(alt)}" loading="lazy"></button>`).join("");
  observeReveals();
}
let lbIndex = 0;
function showLightbox(i) {
  lbIndex = (i + SKINCARE_IMAGES.length) % SKINCARE_IMAGES.length;
  const [f, alt] = SKINCARE_IMAGES[lbIndex];
  $("#lbImg").src = `images/${f}`;
  $("#lbImg").alt = alt;
  $("#lightbox").classList.add("show");
  $("#lightbox").setAttribute("aria-hidden", "false");
}
function closeLightbox() {
  $("#lightbox").classList.remove("show");
  $("#lightbox").setAttribute("aria-hidden", "true");
}

/* ---------- reveal on scroll ---------- */
let io;
function observeReveals() {
  if (!("IntersectionObserver" in window)) { $$(".reveal").forEach(el => el.classList.add("in")); return; }
  io = io || new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: .12 });
  $$(".reveal:not(.in)").forEach(el => io.observe(el));
}

/* ---------- crypto checkout ---------- */
let activeCoin = CONFIG.wallets[0].id;

function orderDetails() {
  const items = cartDetailed();
  const total = items.reduce((s, i) => s + i.unit * i.qty, 0);
  const lines = items.map(i => `• ${i.name}, ${i.len} inch x${i.qty} (${money(i.unit * i.qty)})`).join("\n");
  return { items, total, lines };
}

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; }
  catch (e) {
    const t = document.createElement("textarea");
    t.value = text; document.body.appendChild(t); t.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (_) {}
    t.remove();
    return ok;
  }
}

function selectCoin(id) {
  const w = CONFIG.wallets.find(x => x.id === id) || CONFIG.wallets[0];
  activeCoin = w.id;
  $$(".coin-tab").forEach(b => {
    const on = b.dataset.coin === w.id;
    b.classList.toggle("active", on);
    b.setAttribute("aria-selected", on);
  });
  $("#coinPanel").innerHTML = `
    <p class="coin-net">Send <strong>${esc(w.ticker)}</strong> on the <strong>${esc(w.network)}</strong> only</p>
    <div class="addr-box"><code>${esc(w.address)}</code></div>
    <button class="btn btn-ghost btn-block" id="copyAddr" type="button" data-addr="${esc(w.address)}">Copy ${esc(w.name)} address</button>`;

  const { total, lines } = orderDetails();
  $("#paidBtn").dataset.copy = (
    `Hello ${CONFIG.brand}, I've sent payment for my order:\n\n${lines}\n\nTotal: ${money(total)}\nPaid in: ${w.name} (${w.network})\nSent to: ${w.address}\n\nTransaction ID: (pasting below)`);
  $("#askAmount").dataset.copy = (
    `Hello ${CONFIG.brand}, my order total is ${money(total)}. What exact ${w.ticker} amount should I send?\n\n${lines}`);
}

function openPay() {
  const { items, total } = orderDetails();
  if (!items.length) return;
  $("#paySummary").innerHTML =
    items.map(i => `<div class="row"><span>${esc(i.name)}, ${i.len}" × ${i.qty}</span><span>${money(i.unit * i.qty)}</span></div>`).join("") +
    `<div class="row total"><span>Total (USD)</span><strong>${money(total)}</strong></div>`;
  $("#coinTabs").innerHTML = CONFIG.wallets.map(w =>
    `<button class="coin-tab" role="tab" type="button" data-coin="${w.id}">${esc(w.name)}</button>`).join("");
  selectCoin(activeCoin);
  closeCart();
  $("#payModal").classList.add("show");
  $("#payModal").setAttribute("aria-hidden", "false");
}
function closePay() {
  $("#payModal").classList.remove("show");
  $("#payModal").setAttribute("aria-hidden", "true");
}

/* ---------- launch countdown ---------- */
const launchTime = () => new Date(CONFIG.launch.iso).getTime();
const launchLocked = () => !!CONFIG.launch.lockCheckoutUntilLaunch && Date.now() < launchTime();
function updateAnnounce(live) {
  const el = $("#announce"); if (!el) return;
  const ship = `Complimentary shipping on orders over ${money(CONFIG.freeShippingOver)} · Shipping from Los Angeles, California`;
  el.textContent = live ? ship : `Launching ${CONFIG.launch.label} · ${ship}`;
}
function initCountdown() {
  const box = $("#countdown");
  const pad = n => String(n).padStart(2, "0");
  let timer;
  function tick() {
    const left = launchTime() - Date.now();
    if (left <= 0) {
      clearInterval(timer);
      if (box) { box.classList.add("live"); $("#cdTitle").textContent = "We're live. Welcome to Liyana's!"; }
      updateAnnounce(true);
      renderCart();
      return;
    }
    if (box) {
      const s = Math.floor(left / 1000);
      $("#cd-d").textContent = pad(Math.floor(s / 86400));
      $("#cd-h").textContent = pad(Math.floor((s % 86400) / 3600));
      $("#cd-m").textContent = pad(Math.floor((s % 3600) / 60));
      $("#cd-s").textContent = pad(s % 60);
    }
  }
  if (box) $("#cdTitle").textContent = `Launching ${CONFIG.launch.label}`;
  updateAnnounce(false);
  tick();
  if (launchTime() > Date.now()) timer = setInterval(tick, 1000);
}

/* ---------- init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  loadChat();

  $("#year").textContent = new Date().getFullYear();
  renderFilters();
  renderGrid();
  renderGallery();
  renderCart();
  initCountdown();
  $$(".values > div, .coll, .story-copy, .story-art, .visit-grid > div, .section-head, .skin-cta").forEach(el => el.classList.add("reveal"));
  observeReveals();

  // events
  $("#filters").addEventListener("click", e => { const b = e.target.closest("[data-cat]"); if (b) setFilter(b.dataset.cat); });
  $$(".coll[data-filter]").forEach(c => c.addEventListener("click", () => setFilter(c.dataset.filter)));
  $("#grid").addEventListener("click", e => {
    const b = e.target.closest("[data-add]"); if (!b) return;
    const card = b.closest(".card");
    addToCart(b.dataset.add, card.querySelector(".len").value);
  });
  $("#grid").addEventListener("change", e => {
    const sel = e.target.closest(".len"); if (!sel) return;
    const card = sel.closest(".card");
    const p = PRODUCTS.find(x => x.id === card.dataset.id);
    card.querySelector("[data-price]").textContent = money(p.prices[sel.value]);
  });
  $("#cartItems").addEventListener("click", e => {
    const b = e.target.closest("[data-act]"); if (!b) return;
    const key = b.dataset.key;
    if (b.dataset.act === "inc") changeQty(key, 1);
    if (b.dataset.act === "dec") changeQty(key, -1);
    if (b.dataset.act === "rm") removeItem(key);
  });
  $("#cartBtn").addEventListener("click", openCart);
  $("#closeCart").addEventListener("click", closeCart);
  $("#overlay").addEventListener("click", closeCart);
  document.addEventListener("keydown", e => { if (e.key === "Escape") { closeCart(); closeLightbox(); } });

  // skincare lightbox
  $("#gallery").addEventListener("click", e => { const b = e.target.closest("[data-i]"); if (b) showLightbox(+b.dataset.i); });
  $("#lbClose").addEventListener("click", closeLightbox);
  $("#lbPrev").addEventListener("click", () => showLightbox(lbIndex - 1));
  $("#lbNext").addEventListener("click", () => showLightbox(lbIndex + 1));
  $("#lightbox").addEventListener("click", e => { if (e.target.id === "lightbox") closeLightbox(); });
  document.addEventListener("keydown", e => {
    if (!$("#lightbox").classList.contains("show")) return;
    if (e.key === "ArrowLeft") showLightbox(lbIndex - 1);
    if (e.key === "ArrowRight") showLightbox(lbIndex + 1);
  });

  // mobile menu
  $("#menuBtn").addEventListener("click", () => $("#nav").classList.toggle("open"));
  $$("#nav a").forEach(a => a.addEventListener("click", () => $("#nav").classList.remove("open")));

  // live chat buttons (support, specialist, payment confirmation)
  document.addEventListener("click", e => {
    const el = e.target.closest("[data-chat]");
    if (!el) return;
    e.preventDefault();
    if (el.id === "paidBtn") {
      try {
        const o = orderDetails();
        window.Tawk_API.addEvent("payment-sent", { total: money(o.total), coin: activeCoin, items: o.items.map(i => `${i.name} ${i.len}in x${i.qty}`).join(", ") }, function () {});
      } catch (_) {}
    }
    openChat(el.dataset.copy);
  });

  // crypto checkout
  $("#checkout").addEventListener("click", openPay);
  $("#closePay").addEventListener("click", closePay);
  $("#payModal").addEventListener("click", e => { if (e.target.id === "payModal") closePay(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closePay(); });
  $("#coinTabs").addEventListener("click", e => { const b = e.target.closest("[data-coin]"); if (b) selectCoin(b.dataset.coin); });
  $("#coinPanel").addEventListener("click", async e => {
    const b = e.target.closest("#copyAddr"); if (!b) return;
    const ok = await copyText(b.dataset.addr);
    const old = b.textContent;
    b.textContent = ok ? "Copied ✓" : "Select the address and copy it";
    setTimeout(() => { b.textContent = old; }, 2000);
  });
});
