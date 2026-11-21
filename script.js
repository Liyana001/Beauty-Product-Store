/* ============================================================
   Liyana's storefront
   Edit the CONFIG block and the PRODUCTS list to customize.
   ============================================================ */
const CONFIG = {
  brand: "Liyana's",
  // Live chat (tawk.to): Property ID is on your tawk.to dashboard under Administration > Overview.
  // Widget ID stays "default" unless your tawk.to embed code ends in a different ID.
  tawk: { propertyId: "6b01a7f77a329b3cbd98b3ca", widgetId: "1k7v7g8hc" },
  currency: "USD",
  freeShippingOver: 75,
  // Crypto wallets shown at checkout. Double-check any change here: a wrong character means lost funds.
  wallets: [
    { id: "btc", name: "Bitcoin",  ticker: "BTC", network: "Bitcoin network",  address: "bc1qex40nlgampcadnz2r9qa9tmqw0cgpzystpnjwq" },
    { id: "ltc", name: "Litecoin", ticker: "LTC", network: "Litecoin network", address: "ltc1qaqfxgnvdxwhutnrr9v7t2mduv4t4celr34hn82" },
    { id: "trx", name: "Tron",     ticker: "TRX", network: "Tron network",     address: "TBYVxoRqpPwW6byTyDaRq17tdmwJJkN1pd" }
  ]
};

// Placeholder products. Replace names, prices and descriptions with your own.
// "shape" controls the placeholder bottle illustration; "tones" colors its backdrop.
const PRODUCTS = [
  { id: 1,  name: "Golden Hour Serum",     cat: "Skincare", price: 68, tag: "Bestseller", shape: "dropper", tones: ["#f6e6c4", "#d9bc8a"], desc: "A silky vitamin-rich serum for lit-from-within radiance." },
  { id: 2,  name: "Velvet Cloud Cream",    cat: "Skincare", price: 54, tag: "",           shape: "jar",     tones: ["#f3ebdd", "#d8c6a6"], desc: "Cushiony daily moisturizer with a soft, dewy finish." },
  { id: 3,  name: "Pearl Milk Cleanser",   cat: "Skincare", price: 32, tag: "New",        shape: "pump",    tones: ["#f7f1e6", "#e0d2b8"], desc: "A gentle creamy wash that melts away the day." },
  { id: 4,  name: "Rose Quartz Mist",      cat: "Skincare", price: 28, tag: "",           shape: "spray",   tones: ["#f3dcd5", "#d3a99d"], desc: "Hydrating floral mist to refresh at any hour." },
  { id: 5,  name: "Satin Skin Foundation", cat: "Makeup",   price: 46, tag: "Bestseller", shape: "pump",    tones: ["#efd9bd", "#c79f74"], desc: "Weightless, buildable coverage with a natural glow." },
  { id: 6,  name: "Silk Lip Color",        cat: "Makeup",   price: 34, tag: "",           shape: "tube",    tones: ["#f0d0cb", "#b8756d"], desc: "Creamy, comfortable color in a rich satin finish." },
  { id: 7,  name: "Sunlit Highlighter",    cat: "Makeup",   price: 38, tag: "New",        shape: "jar",     tones: ["#f8e8c2", "#dcb877"], desc: "A champagne glow that catches the light beautifully." },
  { id: 8,  name: "Noir Lash Mascara",     cat: "Makeup",   price: 29, tag: "",           shape: "tube",    tones: ["#e9e1d3", "#8f8271"], desc: "Lengthening, lifting formula for dramatic lashes." },
  { id: 9,  name: "Argan Gloss Oil",       cat: "Hair",     price: 42, tag: "",           shape: "dropper", tones: ["#f3e0b8", "#c99d58"], desc: "Lightweight shine oil that smooths and protects." },
  { id: 10, name: "Silk Repair Mask",      cat: "Hair",     price: 40, tag: "Bestseller", shape: "jar",     tones: ["#ede3d0", "#bda980"], desc: "Deep-conditioning treatment for soft, healthy hair." },
  { id: 11, name: "Malibu Bronzing Oil",   cat: "Body",     price: 36, tag: "New",        shape: "spray",   tones: ["#f3d9a2", "#b98348"], desc: "A shimmering dry oil for a sun-kissed bronze." },
  { id: 12, name: "Honey Body Butter",     cat: "Body",     price: 38, tag: "",           shape: "jar",     tones: ["#f5e2b2", "#cfa55f"], desc: "Rich whipped butter for all-day, silky softness." }
];

/* ---------- helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const money = n => new Intl.NumberFormat("en-US", { style: "currency", currency: CONFIG.currency }).format(n);

/* ---------- placeholder bottle art ---------- */
function bottleSVG(shape) {
  const body = "#fffaf0", cap = "#2b2420", gold = "#c9a96e";
  const label = `<rect x="22" y="${shape === "tube" ? 40 : 58}" width="36" height="22" rx="2" fill="${body}" opacity=".9"/>
    <text x="40" y="${shape === "tube" ? 54 : 72}" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="8" fill="#2b2420">Liyana's</text>`;
  const shapes = {
    dropper: `<rect x="34" y="4" width="12" height="22" rx="5" fill="${cap}"/><rect x="30" y="26" width="20" height="8" fill="${gold}"/><rect x="14" y="34" width="52" height="86" rx="10" fill="${gold}" opacity=".55"/><rect x="14" y="34" width="52" height="86" rx="10" fill="none" stroke="${gold}" stroke-width="1.5"/>${label.replace(/58|72/g, m => m === "58" ? 60 : 74)}`,
    jar:     `<rect x="12" y="38" width="56" height="16" rx="4" fill="${cap}"/><rect x="12" y="54" width="56" height="52" rx="10" fill="${gold}" opacity=".6"/><rect x="12" y="54" width="56" height="52" rx="10" fill="none" stroke="${gold}" stroke-width="1.5"/><text x="40" y="84" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="9" fill="#2b2420">Liyana's</text>`,
    pump:    `<rect x="36" y="2" width="22" height="6" rx="2" fill="${cap}"/><rect x="38" y="8" width="6" height="18" fill="${cap}"/><rect x="26" y="26" width="28" height="9" fill="${gold}"/><rect x="16" y="35" width="48" height="86" rx="12" fill="${gold}" opacity=".55"/><rect x="16" y="35" width="48" height="86" rx="12" fill="none" stroke="${gold}" stroke-width="1.5"/>${label.replace(/58|72/g, m => m === "58" ? 62 : 76)}`,
    spray:   `<rect x="28" y="2" width="24" height="10" rx="3" fill="${cap}"/><rect x="34" y="12" width="12" height="14" fill="${cap}"/><rect x="18" y="26" width="44" height="96" rx="9" fill="${gold}" opacity=".55"/><rect x="18" y="26" width="44" height="96" rx="9" fill="none" stroke="${gold}" stroke-width="1.5"/><rect x="24" y="58" width="32" height="22" rx="2" fill="${body}" opacity=".9"/><text x="40" y="72" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="8" fill="#2b2420">Liyana's</text>`,
    tube:    `<rect x="26" y="4" width="28" height="30" rx="4" fill="${cap}"/><rect x="22" y="34" width="36" height="86" rx="6" fill="${gold}" opacity=".6"/><rect x="22" y="34" width="36" height="86" rx="6" fill="none" stroke="${gold}" stroke-width="1.5"/><text x="40" y="82" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="8" fill="#2b2420">Liyana's</text>`
  };
  return `<svg viewBox="0 0 80 125" fill="none" aria-hidden="true">${shapes[shape] || shapes.jar}</svg>`;
}

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
let cart = [];
try { cart = JSON.parse(localStorage.getItem("liyanas-cart") || "[]"); } catch (e) { cart = []; }
const saveCart = () => { try { localStorage.setItem("liyanas-cart", JSON.stringify(cart)); } catch (e) {} };

function addToCart(id) {
  const item = cart.find(i => i.id === id);
  item ? item.qty++ : cart.push({ id, qty: 1 });
  renderCart();
  openCart();
}
function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  renderCart();
}
function removeItem(id) { cart = cart.filter(i => i.id !== id); renderCart(); }

function renderCart() {
  const box = $("#cartItems");
  const detailed = cart.map(i => ({ ...PRODUCTS.find(p => p.id === i.id), qty: i.qty })).filter(i => i.name);
  const count = detailed.reduce((s, i) => s + i.qty, 0);
  const subtotal = detailed.reduce((s, i) => s + i.price * i.qty, 0);

  $("#cartCount").textContent = count;
  $("#subtotal").textContent = money(subtotal);

  if (!detailed.length) {
    box.innerHTML = `<p class="empty">Your bag is empty.<br>Discover something lovely.</p>`;
  } else {
    box.innerHTML = detailed.map(i => `
      <div class="line">
        <div class="mini" style="background:linear-gradient(160deg,${i.tones[0]},${i.tones[1]})">${bottleSVG(i.shape)}</div>
        <div>
          <h4>${i.name}</h4>
          <div class="qty">
            <button data-act="dec" data-id="${i.id}" aria-label="Decrease quantity">−</button>
            <span>${i.qty}</span>
            <button data-act="inc" data-id="${i.id}" aria-label="Increase quantity">+</button>
          </div>
          <button class="rm" data-act="rm" data-id="${i.id}">Remove</button>
        </div>
        <strong class="price">${money(i.price * i.qty)}</strong>
      </div>`).join("");
  }

  const remaining = CONFIG.freeShippingOver - subtotal;
  $("#shipNote").textContent = !detailed.length ? ""
    : remaining > 0 ? `Add ${money(remaining)} more for complimentary shipping.`
    : "You've unlocked complimentary shipping.";

  $("#checkout").disabled = !detailed.length;
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
    `<button class="filter ${c === activeFilter ? "active" : ""}" data-cat="${c}">${c}</button>`).join("");
}
function renderGrid() {
  const list = activeFilter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.cat === activeFilter);
  $("#grid").innerHTML = list.map(p => `
    <article class="card reveal">
      <div class="thumb" style="background:linear-gradient(160deg,${p.tones[0]},${p.tones[1]})">
        ${p.tag ? `<span class="tag">${p.tag}</span>` : ""}
        ${bottleSVG(p.shape)}
      </div>
      <span class="cat">${p.cat}</span>
      <h3>${p.name}</h3>
      <p class="desc">${p.desc}</p>
      <div class="foot">
        <span class="price">${money(p.price)}</span>
        <button class="add" data-add="${p.id}">Add to Bag</button>
      </div>
    </article>`).join("");
  observeReveals();
}
function setFilter(cat) {
  activeFilter = cat;
  renderFilters();
  renderGrid();
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
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function orderDetails() {
  const items = cart.map(i => ({ ...PRODUCTS.find(p => p.id === i.id), qty: i.qty })).filter(i => i.name);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const lines = items.map(i => `• ${i.name} x${i.qty} (${money(i.price * i.qty)})`).join("\n");
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
    items.map(i => `<div class="row"><span>${esc(i.name)} × ${i.qty}</span><span>${money(i.price * i.qty)}</span></div>`).join("") +
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

/* ---------- init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  loadChat();

  $("#year").textContent = new Date().getFullYear();
  renderFilters();
  renderGrid();
  renderCart();
  $$(".values > div, .coll, .story-copy, .story-art, .visit-grid > div, .section-head").forEach(el => el.classList.add("reveal"));
  observeReveals();

  // events
  $("#filters").addEventListener("click", e => { const b = e.target.closest("[data-cat]"); if (b) setFilter(b.dataset.cat); });
  $$(".coll").forEach(c => c.addEventListener("click", () => setFilter(c.dataset.filter)));
  $("#grid").addEventListener("click", e => { const b = e.target.closest("[data-add]"); if (b) addToCart(+b.dataset.add); });
  $("#cartItems").addEventListener("click", e => {
    const b = e.target.closest("[data-act]"); if (!b) return;
    const id = +b.dataset.id;
    if (b.dataset.act === "inc") changeQty(id, 1);
    if (b.dataset.act === "dec") changeQty(id, -1);
    if (b.dataset.act === "rm") removeItem(id);
  });
  $("#cartBtn").addEventListener("click", openCart);
  $("#closeCart").addEventListener("click", closeCart);
  $("#overlay").addEventListener("click", closeCart);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeCart(); });

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
        window.Tawk_API.addEvent("payment-sent", { total: money(o.total), coin: activeCoin, items: o.items.map(i => `${i.name} x${i.qty}`).join(", ") }, function () {});
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
