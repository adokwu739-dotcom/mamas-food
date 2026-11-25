import { useState } from "react";
import { ArrowRight, ChefHat, CalendarDays, MapPin, Users, Utensils, Menu as MenuIcon, X } from "lucide-react";

const initialForm = {
  name: "", email: "", phone: "", eventType: "", guests: "", eventDate: "",
  location: "", budget: "", dishes: "", dietary: "", notes: "", service: "Delivery"
};

export default function CateringPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError("");
  }

  function submit(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.eventType || !form.guests || !form.eventDate || !form.location.trim()) {
      setError("Please complete your name, phone, event type, guest count, date and event location.");
      return;
    }
    setSubmitted(true);
  }

  return <div className="site-shell">
    <div className="announcement">GOOD FOOD. GOOD MOOD. MADE WITH LOVE.</div>
    <header className="site-header">
      <a className="brand" href="/" aria-label="Mama's Food home"><span className="brand-mark"><ChefHat size={22}/></span><span><strong>MAMA'S</strong><small>FOOD & KITCHEN</small></span></a>
      <nav className={mobileMenuOpen ? "main-nav menu-page-nav open" : "main-nav menu-page-nav"}><a href="/">Home</a><a href="/menu">Our menu</a><a className="current" href="/catering">Catering</a><a href="/#about">Our story</a><a href="/#contact">Contact</a></nav>
      <div className="header-actions"><a className="cart-button" href="/menu">Explore menu <ArrowRight size={16}/></a><button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">{mobileMenuOpen ? <X/> : <MenuIcon/>}</button></div>
    </header>
    <main>
      <section className="catering-hero">
        <div className="catering-hero-copy"><span className="eyebrow">FOR THE MOMENTS THAT MATTER</span><h1>Make your event <em>delicious.</em></h1><p>From family celebrations to weddings and corporate gatherings, let Mama's Food take care of the food while you enjoy the moment.</p><a className="primary-button" href="#catering-request">Request a catering quote <ArrowRight size={17}/></a></div>
        <div className="catering-hero-image" role="img" aria-label="A beautifully arranged catering spread"/>
      </section>
      <section className="catering-intro section-pad"><span className="eyebrow">CATERING, YOUR WAY</span><h2>Choose a starting point. <em>We'll handle the details.</em></h2><p>Choose a fixed package once our current menu and pricing are confirmed, or tell us what you have in mind and request a custom quotation. We can discuss different guest counts, menus and budgets.</p></section>
      <section className="catering-options section-pad">
        <article className="catering-option-card"><div className="option-icon"><Utensils/></div><span className="eyebrow">SIMPLE & CONVENIENT</span><h3>Fixed catering packages</h3><p>We can help you select a package based on your guest count, preferred dishes and event needs. Package contents and prices are confirmed by our team before booking.</p><a href="#catering-request" className="text-link">Ask about packages <ArrowRight size={16}/></a></article>
        <article className="catering-option-card featured"><div className="option-icon"><ChefHat/></div><span className="eyebrow">MADE AROUND YOUR EVENT</span><h3>Custom catering quote</h3><p>Share your event type, guest count, food preferences, budget and location. Our team will review your request and prepare a quotation.</p><a href="#catering-request" className="text-link">Build my request <ArrowRight size={16}/></a></article>
      </section>
      <section className="catering-process section-pad"><div><span className="eyebrow">HOW IT WORKS</span><h2>A clear plan, from <em>first hello to event day.</em></h2></div><div className="process-grid"><div><b>01</b><h3>Tell us about it</h3><p>Send your event details and the number of guests you expect.</p></div><div><b>02</b><h3>Review your quote</h3><p>We'll discuss the menu, availability, delivery and pricing with you.</p></div><div><b>03</b><h3>Confirm your booking</h3><p>Once you approve the quotation, we'll share payment instructions and confirm the booking after payment verification.</p></div></div></section>
      <section className="quote-section section-pad" id="catering-request">
        <div className="quote-heading"><span className="eyebrow">LET'S PLAN SOMETHING SPECIAL</span><h2>Request a <em>catering quote.</em></h2><p>There is no fixed minimum guest count. Tell us what you need and we'll review it with you.</p><div className="quote-contact"><span><CalendarDays/> Event date and details</span><span><Users/> Any guest count</span><span><MapPin/> Delivery or event location</span></div></div>
        <div className="quote-form-wrap">
          {submitted ? <div className="quote-success"><span className="success-mark">✓</span><h3>Your request is ready.</h3><p>This form is currently a front-end demonstration. It has not been sent to Mama's Food yet. Connect the backend and business contact details to receive enquiries.</p><button className="primary-button" onClick={() => { setForm(initialForm); setSubmitted(false); }}>Submit another request</button></div> :
          <form className="quote-form" onSubmit={submit}>
            <div className="form-grid">
              <label>Your name *<input name="name" value={form.name} onChange={update} placeholder="Full name" /></label>
              <label>Phone number *<input name="phone" value={form.phone} onChange={update} placeholder="+234..." /></label>
              <label>Email address<input type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com" /></label>
              <label>Event type *<select name="eventType" value={form.eventType} onChange={update}><option value="">Choose event type</option><option>Wedding</option><option>Birthday</option><option>Corporate event</option><option>Family gathering</option><option>Graduation</option><option>Other</option></select></label>
              <label>Expected guests *<input type="number" min="1" name="guests" value={form.guests} onChange={update} placeholder="e.g. 50" /></label>
              <label>Event date *<input type="date" name="eventDate" value={form.eventDate} onChange={update} /></label>
              <label className="full-field">Event location *<input name="location" value={form.location} onChange={update} placeholder="Area, city and venue if known" /></label>
              <label>Estimated budget (optional)<input name="budget" value={form.budget} onChange={update} placeholder="Your budget range" /></label>
              <label>Preferred service<select name="service" onChange={update} defaultValue="Delivery"><option>Delivery</option><option>Pickup</option><option>Discuss with me</option></select></label>
              <label className="full-field">Preferred dishes or package ideas<textarea name="dishes" value={form.dishes} onChange={update} rows="3" placeholder="Tell us what you would like served..." /></label>
              <label className="full-field">Dietary requirements<textarea name="dietary" value={form.dietary} onChange={update} rows="2" placeholder="Allergies, vegetarian options or other needs..." /></label>
              <label className="full-field">Additional instructions<textarea name="notes" value={form.notes} onChange={update} rows="3" placeholder="Anything else we should know?" /></label>
            </div>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="primary-button quote-submit" type="submit">Review my quote request <ArrowRight size={17}/></button>
            <p className="form-disclaimer">Submitting this demo form does not confirm a booking or payment. Our team must review the request and send a quotation first.</p>
          </form>}
        </div>
      </section>
    </main>
    <footer className="site-footer"><a className="brand footer-brand" href="/"><span className="brand-mark"><ChefHat size={22}/></span><span><strong>MAMA'S</strong><small>FOOD & KITCHEN</small></span></a><p>Good food, made with love.</p><div className="footer-meta"><span>© {new Date().getFullYear()} Mama's Food</span><span>Made for sharing.</span></div></footer>
  </div>;
}
