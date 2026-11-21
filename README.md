# Liyana's

A luxury beauty storefront based in Los Angeles, California. English language, prices in USD. Static site (HTML, CSS, JavaScript) with no build step.

## Publish on GitHub Pages

1. Create a new repository on GitHub (for example `liyanas`).
2. Upload `index.html`, `styles.css`, `script.js` and this `README.md` to the repository root.
3. Go to **Settings → Pages**, set **Source** to "Deploy from a branch", choose the `main` branch and `/ (root)`, then save.
4. After a minute, your site will be live at `https://<your-username>.github.io/<repo-name>/`.

## Customize

Open `script.js`:

- `CONFIG.whatsappNumber` is the WhatsApp number used for every support link, the floating chat button and cart checkout (digits only, with country code).
- `PRODUCTS` is the product list. Edit names, categories, prices and descriptions.
- To use real product photos, add images to an `images/` folder and replace the `bottleSVG(...)` call inside `renderGrid()` with an `<img src="images/your-photo.jpg" alt="...">`.

## How ordering works

There is no payment processor. At checkout, the customer taps "Pay with Crypto", picks Bitcoin, Litecoin or Tron, copies your wallet address and sends payment from their own wallet. They then tap "I've sent payment", which opens WhatsApp with their order, the coin used and a place to paste the transaction ID, so you can verify the payment on a block explorer before shipping. A second link lets them ask you for the exact crypto amount at today's rate.

Wallet addresses live in `CONFIG.wallets` in `script.js`. If you ever change one, double-check every character: crypto payments cannot be reversed.
