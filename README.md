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

There is no payment processor. When a customer taps "Order via WhatsApp", their bag is written into a WhatsApp message to your number so you can confirm details and take payment directly.
