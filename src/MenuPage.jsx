import { useMemo, useState } from "react";
import { ArrowLeft, Plus, Search, ShoppingBag, ChefHat, X, Minus, ArrowRight, Menu as MenuIcon } from "lucide-react";
import { categories, menuItems } from "./data/menu.js";
import { useCart } from "./context/CartContext.jsx";

const formatNaira = (amount) => new Intl.NumberFormat("en-NG", {
  style: "currency", currency: "NGN", maximumFractionDigits: 0
}).format(amount);

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart, cartItems, cartCount, cartTotal, changeQuantity } = useCart();

  const visibleItems = useMemo(() => menuItems.filter((item) => {
    const categoryMatch = activeCategory === "All" || item.category === activeCategory;
    const searchMatch = `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(search.toLowerCase());
    return categoryMatch && searchMatch;
  }), [activeCategory, search]);

  return <div className="site-shell">
    <div className="announcement">GOOD FOOD. GOOD MOOD. MADE WITH LOVE.</div>
    <header className="site-header">
      <a className="brand" href="/" aria-label="Mama's Food home"><span className="brand-mark"><ChefHat size={22}/></span><span><strong>MAMA'S</strong><small>FOOD & KITCHEN</small></span></a>
      <nav className={mobileMenuOpen ? "main-nav menu-page-nav open" : "main-nav menu-page-nav"}><a href="/">Home</a><a className="current" href="/menu">Our menu</a><a href="/catering">Catering</a><a href="/#about">Our story</a><a href="/#contact">Contact</a></nav>
      <div className="header-actions"><button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${cartCount} items`}><ShoppingBag size={18}/><span>My order</span><b>{cartCount}</b></button><button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">{mobileMenuOpen ? <X/> : <MenuIcon/>}</button></div>
    </header>
    <main>
      <section className="menu-page-hero"><a href="/" className="menu-back"><ArrowLeft size={15}/> Back to home</a><span className="eyebrow">MADE FRESH, SERVED WITH LOVE</span><h1>Our <em>menu.</em></h1><p>Explore the flavours, find your favourites and add something delicious to your order.</p></section>
      <section className="menu-section section-pad menu-page-section">
        <div className="section-heading"><div><span className="eyebrow">GOODNESS FOR EVERY CRAVING</span><h2>What are you <em>hungry for?</em></h2><p>Browse all our dishes and treats.</p></div><div className="menu-search"><Search size={18}/><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search our menu..." aria-label="Search menu"/></div></div>
        <div className="category-list" role="group" aria-label="Filter menu by category">{categories.map((category) => <button key={category} className={activeCategory === category ? "category-chip active" : "category-chip"} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>
        <div className="food-grid">{visibleItems.map((item) => <article className="food-card" key={item.id}><div className="food-image-wrap"><img src={item.image} alt={item.name} loading="lazy"/><span className="food-tag">{item.tag}</span><button className="quick-add" onClick={() => changeQuantity(item.id, 1)} aria-label={`Add ${item.name} to order`}><Plus size={18}/></button></div><div className="food-info"><span className="food-category">{item.category}</span><h3>{item.name}</h3><p>{item.description}</p><div className="food-bottom"><strong>{formatNaira(item.price)}</strong><button onClick={() => changeQuantity(item.id, 1)}>Add to order <Plus size={15}/></button></div></div></article>)}</div>
        {visibleItems.length === 0 && <div className="empty-state">No menu items found. Try another search or category.</div>}
      </section>
    </main>
    <footer className="site-footer"><a className="brand footer-brand" href="/"><span className="brand-mark"><ChefHat size={22}/></span><span><strong>MAMA'S</strong><small>FOOD & KITCHEN</small></span></a><p>Good food, made with love.</p><div className="footer-meta"><span>© {new Date().getFullYear()} Mama's Food</span><span>Made for sharing.</span></div></footer>
    {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(e) => e.stopPropagation()}><div className="drawer-heading"><div><span className="eyebrow">YOUR SELECTION</span><h2>Your order</h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close cart"><X/></button></div>{cartItems.length === 0 ? <div className="cart-empty"><ShoppingBag size={35}/><h3>Your order is empty</h3><p>Add something delicious from our menu.</p><button className="primary-button" onClick={() => setCartOpen(false)}>Explore menu</button></div> : <><div className="cart-lines">{cartItems.map((item) => <div className="cart-line" key={item.id}><img src={item.image} alt=""/><div className="cart-line-info"><strong>{item.name}</strong><small>{formatNaira(item.price)}</small><div className="quantity-control"><button onClick={() => changeQuantity(item.id,-1)} aria-label="Decrease quantity"><Minus size={14}/></button><span>{cart[item.id]}</span><button onClick={() => changeQuantity(item.id,1)} aria-label="Increase quantity"><Plus size={14}/></button></div></div><b>{formatNaira(item.price * cart[item.id])}</b></div>)}</div><div className="cart-total"><span>Subtotal</span><strong>{formatNaira(cartTotal)}</strong></div><p className="delivery-note">Delivery or pickup details and payment instructions will be confirmed during checkout.</p><a className="primary-button checkout-button" href="/checkout">Continue to checkout <ArrowRight size={17}/></a></>}</aside></div>}
  </div>;
}
