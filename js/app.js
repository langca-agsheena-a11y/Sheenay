/* Student Supplies Ordering System - shared logic (no database; state lives in sessionStorage) */

const PRODUCTS = [
  { id: 'ballpen',   name: 'Ballpen',    price: 12, desc: 'Smooth-writing blue ink ballpoint pen.', img: 'images/ballpen.svg' },
  { id: 'pencil',    name: 'Pencil',     price: 10, desc: 'Classic graphite pencil with eraser tip.', img: 'images/pencil.svg' },
  { id: 'notebook',  name: 'Notebook',   price: 35, desc: 'Spiral-bound notebook for everyday notes.', img: 'images/notebook.svg' },
  { id: 'yellowpad', name: 'Yellow Pad', price: 45, desc: 'Ruled yellow legal pad, 80 leaves.', img: 'images/yellowpad.svg' },
  { id: 'eraser',    name: 'Eraser',     price: 8,  desc: 'Soft, clean-erasing rubber eraser.', img: 'images/eraser.svg' },
  { id: 'ruler',     name: 'Ruler',      price: 15, desc: '30 cm ruler with clear cm/inch marks.', img: 'images/ruler.svg' }
];

const MAX_QTY = 99;
const KEY_CART = 'sso_cart';
const KEY_PAYMENT = 'sso_payment';
const KEY_TXN = 'sso_txn';

/* ---------- helpers ---------- */
function peso(n) {
  return '₱' + Number(n).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function getProduct(id) { return PRODUCTS.find(function (p) { return p.id === id; }); }
function esc(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}
function load(key, fallback) {
  try {
    var raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) { return fallback; }
}
function save(key, value) {
  try { sessionStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
}
function remove(key) {
  try { sessionStorage.removeItem(key); } catch (e) { /* ignore */ }
}

/* Product image. To use a real photo, put it in images/ and change the "img" path in PRODUCTS above. */
function productImg(p, cls) {
  return '<img class="' + (cls || '') + '" src="' + p.img + '" alt="' + esc(p.name) + '" loading="lazy">';
}

/* ---------- cart (object of id -> quantity) ---------- */
function getCart() { return load(KEY_CART, {}); }
function saveCart(cart) { save(KEY_CART, cart); updateBadge(); }

function addToCart(id) {
  var cart = getCart();
  cart[id] = Math.min((cart[id] || 0) + 1, MAX_QTY);
  saveCart(cart);
  return cart[id];
}
function changeQty(id, delta) {
  var cart = getCart();
  if (!cart[id]) return;
  var next = cart[id] + delta;
  if (next < 1) next = 1;            // never zero or negative; use Remove to delete
  if (next > MAX_QTY) next = MAX_QTY;
  cart[id] = next;
  saveCart(cart);
}
function removeFromCart(id) {
  var cart = getCart();
  delete cart[id];
  saveCart(cart);
}
function clearCart() { saveCart({}); }

function cartLines() {
  var cart = getCart();
  return PRODUCTS.filter(function (p) { return cart[p.id] > 0; }).map(function (p) {
    return { id: p.id, name: p.name, price: p.price, qty: cart[p.id], subtotal: p.price * cart[p.id], product: p };
  });
}
function cartTotal() {
  return cartLines().reduce(function (sum, l) { return sum + l.subtotal; }, 0);
}
function cartCount() {
  return cartLines().reduce(function (sum, l) { return sum + l.qty; }, 0);
}

/* ---------- payment validation ---------- */
/* Returns { ok:true, amount } or { ok:false, message } */
function validatePayment(raw, total) {
  var text = String(raw == null ? '' : raw).trim().replace(/^₱/, '').replace(/,/g, '');
  if (text === '') return { ok: false, message: 'Please enter the amount paid by the customer.' };
  if (!/^-?\d*\.?\d+$|^-?\d+\.$/.test(text) || isNaN(Number(text))) {
    return { ok: false, message: 'Payment must be a valid number (example: 100 or 100.50).' };
  }
  var amount = Math.round(Number(text) * 100) / 100;
  if (amount < 0) return { ok: false, message: 'Payment cannot be negative.' };
  if (amount < total) {
    return { ok: false, message: 'Payment is short by ' + peso(total - amount) + '. Amount due is ' + peso(total) + '.' };
  }
  return { ok: true, amount: amount };
}
function computeChange(amount, total) {
  return Math.round((amount - total) * 100) / 100;
}

/* ---------- transaction reference ---------- */
function makeReference() {
  var d = new Date();
  var pad = function (n) { return String(n).padStart(2, '0'); };
  var stamp = d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate());
  var rand = String(Math.floor(Math.random() * 90000) + 10000);
  return 'SSO-' + stamp + '-' + rand;
}
function formatDate(iso) {
  return new Date(iso).toLocaleString('en-PH', {
    year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', second: '2-digit'
  });
}

/* ---------- UI helpers ---------- */
function updateBadge() {
  var el = document.getElementById('cartBadge');
  if (!el) return;
  var n = cartCount();
  el.textContent = n;
  el.classList.toggle('hidden', n === 0);
  el.classList.remove('bump');
  void el.offsetWidth;               // restart animation
  if (n > 0) el.classList.add('bump');
}
function toast(message) {
  var box = document.getElementById('toasts');
  if (!box) return;
  box.innerHTML = '';                 // one toast at a time
  var t = document.createElement('div');
  t.className = 'toast';
  t.textContent = message;
  box.appendChild(t);
  setTimeout(function () { t.classList.add('out'); }, 1800);
  setTimeout(function () { t.remove(); }, 2300);
}
function newTransaction() {
  clearCart();
  remove(KEY_PAYMENT);
  remove(KEY_TXN);
  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', updateBadge);
