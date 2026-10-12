# Student Supplies Ordering System

IT415 Midterm Practical Examination - Student Supplies Ordering System

A browser-based point-of-sale app for a small school supplies shop near the campus. Customers browse products, build a cart, pay in cash, and receive a digital receipt. Built with plain HTML, internal CSS, and JavaScript. No database, no login, no frameworks.

## Features

- **Browse products** - six supplies with image, name, description, and price; live search.
- **Add to cart** - one click per item, with a toast notification, an in-cart tag, and a floating mini-cart bar.
- **Review order** - quantity `+` / `-` buttons (never below 1), a Remove button per item, Clear Cart, automatic subtotals and total.
- **Enter payment** - numeric cash input with quick-amount buttons.
- **Validate & Compute** - errors for blank, non-numeric, negative, and insufficient payments; computes change when valid.
- **Confirm payment** - animated confirmation with the transaction details.
- **Digital receipt** - reference number, date and time, items, quantities, unit prices, subtotals, total, amount paid, change, and a confirmation message. Printable.
- **New Transaction** - clears the cart, payment, messages, and receipt.
- **Keyboard support** - `/` focuses search, `Tab` + `Enter` adds items, `Enter` validates the payment, `N` starts a new transaction on the receipt page.

## Products

| Product | Price |
|---|---|
| Ballpen | ₱12.00 |
| Pencil | ₱10.00 |
| Notebook | ₱35.00 |
| Yellow Pad | ₱45.00 |
| Eraser | ₱8.00 |
| Ruler | ₱15.00 |

Formulas: `Subtotal = Unit Price x Quantity`, `Total = sum of subtotals`, `Change = Amount Paid - Total`.

## How to run

No installation needed. Open `index.html` in any modern browser (double-click it), or serve the folder:

```
python -m http.server 8000
```

then visit http://localhost:8000.

## Project structure

```
StudentSuppliesOrderingSystem/
├── index.html          Browse products
├── cart.html           Review order
├── payment.html        Enter payment, validate and compute
├── confirmation.html   Payment confirmation
├── receipt.html        Digital receipt, New Transaction
├── js/app.js           Shared logic: products, cart, validation, formatting
└── images/             Product images
```

Each page has its own internal CSS. The cart and transaction are kept in `sessionStorage` (browser memory for the tab), not in a database.

## Using real product photos

The bundled images are illustrations (`images/*.svg`). To use real photographs, save them in `images/` (for example `images/ballpen.jpg`) and change the `img` path of that product at the top of `js/app.js`:

```js
{ id: 'ballpen', name: 'Ballpen', price: 12, desc: '...', img: 'images/ballpen.jpg' },
```

## Git and GitHub workflow

Commit in stages, as the exam requires:

```
git init
git branch -M main
git add .
git commit -m "Initial commit: Set up project and basic interface"
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Then, after each stage: "Add product list and basic user interface", "Implement cart and order calculations", "Add payment validation and digital receipt", "Fix bugs and improve application", each with `git add .`, `git commit -m "..."`, and `git push`.
