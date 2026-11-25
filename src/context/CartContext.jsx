import { createContext, useContext, useMemo, useState } from "react";
import { menuItems } from "../data/menu.js";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({});

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
