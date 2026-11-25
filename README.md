# Mama's Food

A responsive React + Vite food ordering and catering website.

## Current customer features

- Browse, search and filter the sample food menu.
- Add menu items to a shared cart that stays available when navigating between pages in the same browser.
- Review an order, choose delivery or pickup, and enter customer details.
- Explore the catering information page.
- Submit a custom catering enquiry with event type, guest count, date, location, budget, preferred dishes and dietary notes.
- Responsive navigation and layouts for mobile screens.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Important setup before launch

The menu items, prices and food photography in `src/data/menu.js` are demonstration content. Replace them with Mama's Food's verified menu.

Business contact and bank transfer fields are in `src/data/businessSettings.js`. Add only verified business details. The current checkout intentionally does not accept or confirm payments.

## Current limitations

This repository currently contains a front-end prototype. The checkout review is not an order submission, and the catering enquiry form is not yet delivered to the business. There is no FastAPI backend, database, authentication, admin dashboard, persistent order management, quotation workflow, payment verification or customer notifications yet.

For production, connect a FastAPI service and database. The business should verify every bank transfer independently before confirming an order or catering booking. An uploaded receipt alone must not be treated as proof of payment.
