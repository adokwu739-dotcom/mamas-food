import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { menuItems } from "../data/menu.js";

const CartContext = createContext(null);
const STORAGE_KEY = "mamas-food-cart";

function readSavedCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readSavedCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // The cart still works for this browser session if storage is unavailable.
    }
  }, [cart]);

  function changeQuantity(id, amount) {
    setCart((current) => {
      const next = { ...current, [id]: Math.max(0, (current[id] || 0) + amount) };
      if (next[id] === 0) delete next[id];
      return next;
    });
  }

  const cartItems = useMemo(
    () => menuItems.filter((item) => cart[item.id] > 0),
    [cart]
  );
  const cartCount = cartItems.reduce((sum, item) => sum + cart[item.id], 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * cart[item.id], 0);

  const value = { cart, cartItems, cartCount, cartTotal, changeQuantity };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
