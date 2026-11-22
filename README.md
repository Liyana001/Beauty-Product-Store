# Liyana's

A luxury hair and skincare storefront based in Los Angeles, California. English language, prices in USD. Static site (HTML, CSS, JavaScript) with no build step.

## Files to upload to GitHub

Upload everything, including the `images` folder, keeping this structure:

```
index.html
styles.css
script.js
README.md
images/   (all the .jpg photos)
```

Then in your repository go to **Settings → Pages**, set **Source** to "Deploy from a branch", choose `main` and `/ (root)`, and save. The site goes live within a minute or two.

## Customize (everything is in `script.js`)

- **Hair products and prices:** edit the `PRODUCTS` list. Each product has a `prices` list that maps each length (inches) to a price in USD. The prices between the lowest and highest were spread evenly across your price range, so check them and change any that are wrong.
- **Photos:** put images in the `images/` folder and set `img: "images/your-photo.jpg"` on a product. A product with no `img` shows "Photo coming soon". Body Wave is waiting for its photo.
- **Skincare pictures:** edit the `SKINCARE_IMAGES` list.
- **Launch countdown:** edit `CONFIG.launch`. It counts down to midnight Los Angeles time on 17 December 2026. After that moment the countdown is replaced by a "We're live" message. Set `lockCheckoutUntilLaunch: true` to disable checkout until launch day.
- **Live chat:** `CONFIG.tawk` holds your tawk.to Property ID and widget ID.
- **Crypto wallets:** `CONFIG.wallets`. Double-check any change here: crypto payments cannot be reversed.

## How ordering works

There is no payment processor. At checkout, the customer taps "Pay with Crypto", picks Bitcoin, Litecoin or Tron, copies your wallet address and sends payment from their own wallet. They then tap "I've sent payment", which copies their order details and opens the live chat so they can paste them along with the transaction ID. Verify each payment on a block explorer before shipping.

## Live chat setup (tawk.to)

- The chat bubble only appears on the site address set as the "Property URL" in tawk.to (Administration > Overview). If you later use a custom domain, update it there.
