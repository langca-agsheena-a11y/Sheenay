# AI Usage Documentation

Complete the evaluation and modification fields yourself after you have tested and understood the code. These must reflect what you actually did.

## Interaction 1 - Generate the application

| Field | Entry |
|---|---|
| Prompt Used | *(Paste the exact prompt you submitted: the "Context / Objectives / Requirements / Constraints / Expected output" message.)* |
| Purpose | Generate a multi-page Student Supplies Ordering System (HTML, internal CSS, JavaScript) covering browse, cart, payment validation, confirmation, and receipt. |
| AI Response | Produced five pages (`index`, `cart`, `payment`, `confirmation`, `receipt`), a shared `js/app.js`, and six product images, plus this README. |
| Your Evaluation | *(Correct / partially correct / incorrect, and why. Note: the AI could not download real photographs, so the product images are illustrations.)* |
| Modifications Made | *(List what you changed, for example real product photos, shop name, colors.)* |

## Interaction 2 - Review the payment validation

| Field | Entry |
|---|---|
| Prompt Used | *(Example: "Review my cash payment validation code. Identify errors that allow blank, negative, or insufficient payments, and suggest corrections. Explain the changes.")* |
| Purpose | Check `validatePayment()` in `js/app.js` against the required error cases. |
| AI Response | *(Summarize what it said.)* |
| Your Evaluation | *(Was it correct? Did you test it?)* |
| Modifications Made | *(What you changed before using it.)* |

## Be ready to explain

- `validatePayment(raw, total)`: trims the input, rejects blank and non-numeric values, then negative values, then amounts below the total.
- `changeQty()`: clamps quantity to 1-99, so it never reaches zero; Remove deletes the item.
- `cartLines()` / `cartTotal()`: subtotal = price x quantity, total = sum of subtotals.
- Why `sessionStorage` is used: it carries the cart and transaction between separate pages without a database.
