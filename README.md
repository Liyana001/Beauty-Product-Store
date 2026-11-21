# Liyana's

A luxury beauty storefront based in Los Angeles, California. English language, prices in USD. Static site (HTML, CSS, JavaScript) with no build step.

## Publish on GitHub Pages

1. Create a new repository on GitHub (for example `liyanas`).
2. Upload `index.html`, `styles.css`, `script.js` and this `README.md` to the repository root.
3. Go to **Settings → Pages**, set **Source** to "Deploy from a branch", choose the `main` branch and `/ (root)`, then save.
4. After a minute, your site will be live at `https://<your-username>.github.io/<repo-name>/`.

## Customize

Open `script.js`:

- `CONFIG.tawk` holds your tawk.to Property ID and Widget ID for the live chat. Support buttons all open that chat.
- `PRODUCTS` is the product list. Edit names, categories, prices and descriptions.
- To use real product photos, add images to an `images/` folder and replace the `bottleSVG(...)` call inside `renderGrid()` with an `<img src="images/your-photo.jpg" alt="...">`.

## How ordering works

There is no payment processor. At checkout, the customer taps "Pay with Crypto", picks Bitcoin, Litecoin or Tron, copies your wallet address and sends payment from their own wallet. They then tap "I've sent payment", which opens the tawk.to chat with their order details copied to the clipboard to paste in, and logs a "payment-sent" event (total, coin, items) on their visitor timeline in your tawk.to dashboard. Verify each transaction ID on a block explorer before shipping. A second link lets them ask you for the exact crypto amount at today's rate.

## Live chat setup (tawk.to)

- The chat bubble only appears on the site address set as the "Property URL" in tawk.to (Administration > Overview). If you later use a custom domain, update it there.
- If the bubble does not appear, go to Administration > Channels > Chat Widget, copy the embed code and look at the link `https://embed.tawk.to/<PROPERTY_ID>/<WIDGET_ID>`. Put both values into `CONFIG.tawk` in `script.js`.

Wallet addresses live in `CONFIG.wallets` in `script.js`. If you ever change one, double-check every character: crypto payments cannot be reversed.
