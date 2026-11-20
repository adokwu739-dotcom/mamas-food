import { useMemo, useState } from "react";
import {
  ArrowRight, ShoppingBag, Search, Menu as MenuIcon, X, Plus, Minus,
  Instagram, MapPin, Clock, Phone, Heart, ChefHat, Truck, ShieldCheck
} from "lucide-react";

import { categories, menuItems } from "./data/menu.js";
import MenuPage from "./MenuPage.jsx";

const formatNaira = (amount) => new Intl.NumberFormat("en-NG", {
  style: "currency", currency: "NGN", maximumFractionDigits: 0
}).format(amount);

function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const visibleItems = useMemo(() => menuItems.filter((item) => {
    const categoryMatch = activeCategory === "All" || item.category === activeCategory;
    const searchMatch = `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(search.toLowerCase());
    return categoryMatch && searchMatch;
  }), [activeCategory, search]);

  const cartItems = menuItems.filter((item) => cart[item.id] > 0);
  const cartCount = cartItems.reduce((sum, item) => sum + cart[item.id], 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * cart[item.id], 0);

  function changeQuantity(id, amount) {
    setCart((current) => {
      const next = { ...current, [id]: Math.max(0, (current[id] || 0) + amount) };
      if (next[id] === 0) delete next[id];
      return next;
    });
  }

  function sendOrder() {
    // Replace this with the vendor's WhatsApp number in international format, without + or spaces.
    const whatsappNumber = "";
    if (!whatsappNumber) {
      alert("The vendor's WhatsApp number has not been added yet. Please contact the site owner to configure it.");
      return;
    }
    const lines = cartItems.map((item) => `• ${item.name} x${cart[item.id]} — ${formatNaira(item.price * cart[item.id])}`);
    const message = `Hello Mama's Food! I'd like to place an order:\n\n${lines.join("\n")}\n\nTotal: ${formatNaira(cartTotal)}\n\nPlease confirm availability and delivery details.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="site-shell">
      <div className="announcement">GOOD FOOD. GOOD MOOD. MADE WITH LOVE.</div>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Mama's Food home">
          <span className="brand-mark"><ChefHat size={22} /></span>
          <span><strong>MAMA'S</strong><small>FOOD & KITCHEN</small></span>
        </a>
        <nav className={mobileMenuOpen ? "main-nav open" : "main-nav"}>
          <a href="/" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="/menu" onClick={() => setMobileMenuOpen(false)}>Our menu</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>Our story</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        </nav>
        <div className="header-actions">
          <button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${cartCount} items`}>
            <ShoppingBag size={19} /><span>My order</span><b>{cartCount}</b>
          </button>
          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <span className="eyebrow"><span /> FRESHLY PREPARED, ALWAYS</span>
            <h1>A little taste of <em>home.</em></h1>
            <p>Delicious meals, made with care and served with love. From everyday cravings to special celebrations, there's something for everyone.</p>
            <div className="hero-actions">
              <a className="primary-button" href="/menu">Explore our menu <ArrowRight size={17} /></a>
              <a className="text-link" href="#about">Get to know us</a>
            </div>
            <div className="hero-note"><span className="note-icon"><Heart size={16} fill="currentColor" /></span><span><strong>Made with love</strong><small>Every plate, every time.</small></span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-image" role="img" aria-label="A delicious meal served fresh" />
            <div className="hero-stamp"><span>GOOD FOOD</span><strong>GOOD<br />MOOD</strong><small>✳ EST. WITH LOVE ✳</small></div>
            <div className="floating-label"><span>✦</span> Freshly made for you</div>
          </div>
        </section>

        <section className="benefits" aria-label="Why order from us">
          <div><span><ChefHat /></span><p><strong>Made fresh</strong><small>Prepared with care</small></p></div>
          <div><span><ShieldCheck /></span><p><strong>Quality ingredients</strong><small>Goodness in every bite</small></p></div>
          <div><span><Truck /></span><p><strong>Easy ordering</strong><small>Simple and convenient</small></p></div>
        </section>

        <section className="menu-section section-pad" id="menu">
          <div className="section-heading">
            <div><span className="eyebrow">A MENU FULL OF GOODNESS</span><h2>Find your <em>favourite.</em></h2><p>Something delicious is waiting for you.</p></div>
            <div className="menu-search"><Search size={18} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search our menu..." aria-label="Search menu" /></div>
          </div>
          <div className="category-list" role="group" aria-label="Filter menu by category">
            {categories.map((category) => <button key={category} className={activeCategory === category ? "category-chip active" : "category-chip"} onClick={() => setActiveCategory(category)}>{category}</button>)}
          </div>
          <div className="food-grid">
            {visibleItems.map((item) => (
              <article className="food-card" key={item.id}>
                <div className="food-image-wrap"><img src={item.image} alt={item.name} loading="lazy" /><span className="food-tag">{item.tag}</span><button className="quick-add" onClick={() => changeQuantity(item.id, 1)} aria-label={`Add ${item.name} to order`}><Plus size={18} /></button></div>
                <div className="food-info"><span className="food-category">{item.category}</span><h3>{item.name}</h3><p>{item.description}</p><div className="food-bottom"><strong>{formatNaira(item.price)}</strong><button onClick={() => changeQuantity(item.id, 1)}>Add to order <Plus size={15} /></button></div></div>
              </article>
            ))}
          </div>
          {visibleItems.length === 0 && <div className="empty-state">No menu items found. Try another search or category.</div>}
        </section>

        <section className="story-section section-pad" id="about">
          <div className="story-image" role="img" aria-label="Fresh ingredients prepared for cooking"><span>FROM OUR KITCHEN<br />TO YOUR TABLE</span></div>
          <div className="story-copy"><span className="eyebrow">A LITTLE ABOUT US</span><h2>Food tastes better when it's made with <em>love.</em></h2><p>At Mama's Food, we believe a good meal brings people together. We put care into every ingredient, every recipe and every plate, so you can enjoy comforting flavours whenever you need them.</p><a href="#contact" className="text-link">Come say hello <ArrowRight size={16} /></a></div>
        </section>

        <section className="contact-band section-pad" id="contact">
          <div><span className="eyebrow">WE'D LOVE TO HEAR FROM YOU</span><h2>Ready for something <em>delicious?</em></h2><p>Reach out to place an order or ask us a question.</p></div>
          <a className="light-button" href="https://wa.me/" target="_blank" rel="noreferrer">Chat with us on WhatsApp <ArrowRight size={17} /></a>
        </section>
      </main>

      <footer className="site-footer"><a className="brand footer-brand" href="#home"><span className="brand-mark"><ChefHat size={22} /></span><span><strong>MAMA'S</strong><small>FOOD & KITCHEN</small></span></a><p>Good food, made with love.</p><div className="footer-meta"><span>© {new Date().getFullYear()} Mama's Food</span><span>Made for sharing.</span></div></footer>

      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(e) => e.stopPropagation()}><div className="drawer-heading"><div><span className="eyebrow">YOUR SELECTION</span><h2>Your order</h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close cart"><X /></button></div>
        {cartItems.length === 0 ? <div className="cart-empty"><ShoppingBag size={35} /><h3>Your order is empty</h3><p>Add something delicious from our menu.</p><button className="primary-button" onClick={() => setCartOpen(false)}>Explore menu</button></div> : <><div className="cart-lines">{cartItems.map((item) => <div className="cart-line" key={item.id}><img src={item.image} alt="" /><div className="cart-line-info"><strong>{item.name}</strong><small>{formatNaira(item.price)}</small><div className="quantity-control"><button onClick={() => changeQuantity(item.id, -1)} aria-label="Decrease quantity"><Minus size={14} /></button><span>{cart[item.id]}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label="Increase quantity"><Plus size={14} /></button></div></div><b>{formatNaira(item.price * cart[item.id])}</b></div>)}</div><div className="cart-total"><span>Subtotal</span><strong>{formatNaira(cartTotal)}</strong></div><p className="delivery-note">Delivery fee, if applicable, will be confirmed when you order.</p><button className="primary-button checkout-button" onClick={sendOrder}>Continue on WhatsApp <ArrowRight size={17} /></button></>}</aside></div>}
    </div>
  );
}


export default function App() {
  return window.location.pathname.replace(/\\/$/, "") === "/menu" ? <MenuPage /> : <HomePage />;
}
