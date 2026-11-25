import { useState } from "react";
import { ArrowLeft, ArrowRight, ChefHat, ShoppingBag, Truck, Store } from "lucide-react";
import { useCart } from "./context/CartContext.jsx";
import { businessSettings } from "./data/businessSettings.js";

const formatNaira = (amount) => new Intl.NumberFormat("en-NG", {
  style: "currency", currency: "NGN", maximumFractionDigits: 0
}).format(amount);

export default function CheckoutPage() {
  const { cart, cartItems, cartTotal, changeQuantity } = useCart();
  const [details, setDetails] = useState({ name: "", phone: "", email: "", fulfilment: "Delivery", address: "", notes: "" });
  const [review, setReview] = useState(false);
  const [error, setError] = useState("");

  function update(event) {
    setDetails((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function submit(event) {
    event.preventDefault();
    if (!details.name.trim() || !details.phone.trim() || (details.fulfilment === "Delivery" && !details.address.trim())) {
      setError("Please provide your name, phone number and delivery address where applicable.");
      return;
    }
    setError("");
    setReview(true);
  }

  if (cartItems.length === 0) return <div className="site-shell"><div className="announcement">GOOD FOOD. GOOD MOOD. MADE WITH LOVE.</div><main className="checkout-empty"><ShoppingBag size={40}/><h1>Your basket is empty</h1><p>Add some food from our menu before checking out.</p><a className="primary-button" href="/menu">Browse the menu <ArrowRight size={16}/></a></main></div>;

  return <div className="site-shell">
    <div className="announcement">GOOD FOOD. GOOD MOOD. MADE WITH LOVE.</div>
    <header className="site-header"><a className="brand" href="/"><span className="brand-mark"><ChefHat size={22}/></span><span><strong>MAMA'S</strong><small>FOOD & KITCHEN</small></span></a><a className="text-link" href="/menu"><ArrowLeft size={15}/> Back to menu</a></header>
    <main className="checkout-layout section-pad">
      <div className="checkout-main">
        <span className="eyebrow">ALMOST THERE</span><h1>Complete your <em>order.</em></h1>
        {review ? <section className="checkout-review"><h2>Review your order details</h2><p><strong>{details.name}</strong> · {details.phone}</p><p>{details.fulfilment}: {details.fulfilment === "Delivery" ? details.address : "Pickup from Mama's Food (details to be confirmed)"}</p><p>Payment method: Bank transfer</p><p className="review-notice">This is a front-end review only. Your order has not been sent or confirmed. Mama's Food must connect its order system and verify payment before accepting orders.</p><button className="primary-button" onClick={() => setReview(false)}>Edit details</button></section> :
        <form className="quote-form checkout-form" onSubmit={submit}>
          <h2>Your details</h2><div className="form-grid">
            <label>Full name *<input name="name" value={details.name} onChange={update} placeholder="Your name"/></label>
            <label>Phone number *<input name="phone" value={details.phone} onChange={update} placeholder="+234..."/></label>
            <label className="full-field">Email address (optional)<input type="email" name="email" value={details.email} onChange={update} placeholder="you@example.com"/></label>
          </div>
          <h2>How would you like to receive your order?</h2>
          <div className="fulfilment-options"><label className={details.fulfilment === "Delivery" ? "fulfilment-option selected" : "fulfilment-option"}><input type="radio" name="fulfilment" value="Delivery" checked={details.fulfilment === "Delivery"} onChange={update}/><Truck/> Delivery</label><label className={details.fulfilment === "Pickup" ? "fulfilment-option selected" : "fulfilment-option"}><input type="radio" name="fulfilment" value="Pickup" checked={details.fulfilment === "Pickup"} onChange={update}/><Store/> Pickup</label></div>
          {details.fulfilment === "Delivery" && <label className="checkout-address">Delivery address *<textarea name="address" value={details.address} onChange={update} rows="3" placeholder="Street, area, city and any directions"/></label>}
          <label className="checkout-address">Additional instructions (optional)<textarea name="notes" value={details.notes} onChange={update} rows="3" placeholder="Anything we should know?"/></label>
          <h2>Payment method</h2><div className="bank-transfer-note"><strong>Bank transfer</strong><p>Bank account details will be provided by Mama's Food after the order is reviewed. Do not transfer money to an unverified account.</p>{businessSettings.bankName && <p>{businessSettings.bankName} · {businessSettings.accountName} · {businessSettings.accountNumber}</p>}</div>
          {error && <p className="form-error" role="alert">{error}</p>}<button className="primary-button quote-submit" type="submit">Review order <ArrowRight size={17}/></button>
        </form>}
      </div>
      <aside className="order-summary"><span className="eyebrow">YOUR BASKET</span><h2>Order summary</h2>{cartItems.map((item) => <div className="summary-line" key={item.id}><img src={item.image} alt=""/><div><strong>{item.name}</strong><small>{formatNaira(item.price)} each</small><div className="quantity-control"><button type="button" onClick={() => changeQuantity(item.id,-1)} aria-label={`Remove one ${item.name}`}>−</button><span>{cart[item.id]}</span><button type="button" onClick={() => changeQuantity(item.id,1)} aria-label={`Add one ${item.name}`}>+</button></div></div><b>{formatNaira(item.price * cart[item.id])}</b></div>)}<div className="summary-total"><span>Subtotal</span><strong>{formatNaira(cartTotal)}</strong></div><p>Delivery fee, if applicable, will be confirmed by the business.</p><a href="/menu" className="text-link"><ArrowLeft size={14}/> Continue shopping</a></aside>
    </main>
    <footer className="site-footer"><a className="brand footer-brand" href="/"><span className="brand-mark"><ChefHat size={22}/></span><span><strong>MAMA'S</strong><small>FOOD & KITCHEN</small></span></a><p>Good food, made with love.</p><div className="footer-meta"><span>© {new Date().getFullYear()} Mama's Food</span><span>Made for sharing.</span></div></footer>
  </div>;
}
