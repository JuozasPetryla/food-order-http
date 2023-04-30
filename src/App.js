import { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import Checkout from "./components/Checkout/Checkout";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [formIsShown, setFormIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const formShowHandler = () => {
    setCartIsShown(false);
    setFormIsShown(true);
  };

  const formHideHandler = () => {
    setFormIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && (
        <Cart onClose={hideCartHandler} onCheckout={formShowHandler} />
      )}
      {formIsShown && <Checkout onClose={formHideHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
