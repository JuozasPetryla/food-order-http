import classes from "./Checkout.module.css";
import Modal from "../UI/Modal";
import useInput from "../../hooks/use-input";
import CartContext from "../../store/cart-context";
import { useContext } from "react";

const Checkout = (props) => {
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const { totalAmount } = cartCtx;

  const postCartItems = async () => {
    try {
      const response = await fetch(
        "https://react-http-learning-5ea49-default-rtdb.firebaseio.com/cart.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items, totalAmount }),
        }
      );

      const data = await response.json();

      console.log(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const inputValidation = (value) => {
    return value.trim() !== "";
  };

  const {
    inputValue: nameInputValue,
    inputIsValid: nameIsValid,
    inputShowError: nameError,
    inputChange: nameInputChange,
    inputBlur: nameInputBlur,
    reset: resetName,
  } = useInput(inputValidation);

  const {
    inputValue: streetInputValue,
    inputIsValid: streetIsValid,
    inputShowError: streetError,
    inputChange: streetInputChange,
    inputBlur: streetInputBlur,
    reset: resetStreet,
  } = useInput(inputValidation);

  const {
    inputValue: postalInputValue,
    inputIsValid: postalIsValid,
    inputShowError: postalError,
    inputChange: postalInputChange,
    inputBlur: postalInputBlur,
    reset: resetPostal,
  } = useInput(inputValidation);

  const {
    inputValue: cityInputValue,
    inputIsValid: cityIsValid,
    inputShowError: cityError,
    inputChange: cityInputChange,
    inputBlur: cityInputBlur,
    reset: resetCity,
  } = useInput(inputValidation);

  let formIsValid = false;

  if (nameIsValid && streetIsValid && postalIsValid && cityIsValid) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    resetName();
    resetStreet();
    resetPostal();
    resetCity();

    console.log(cartCtx);
  };

  return (
    <Modal onClose={props.onClose}>
      <form className={classes.form} onSubmit={confirmHandler}>
        <div
          className={
            nameError
              ? `${classes.control} ${classes.invalid}`
              : classes.control
          }
        >
          <label htmlFor="name">Your Name</label>
          <input
            value={nameInputValue}
            onChange={nameInputChange}
            onBlur={nameInputBlur}
            type="text"
            id="name"
          />
        </div>
        <div
          className={
            streetError
              ? `${classes.control} ${classes.invalid}`
              : classes.control
          }
        >
          <label htmlFor="street">Street</label>
          <input
            value={streetInputValue}
            onChange={streetInputChange}
            onBlur={streetInputBlur}
            type="text"
            id="street"
          />
        </div>
        <div
          className={
            postalError
              ? `${classes.control} ${classes.invalid}`
              : classes.control
          }
        >
          <label htmlFor="postal">Postal Code</label>
          <input
            value={postalInputValue}
            onChange={postalInputChange}
            onBlur={postalInputBlur}
            type="text"
            id="postal"
          />
        </div>
        <div
          className={
            cityError
              ? `${classes.control} ${classes.invalid}`
              : classes.control
          }
        >
          <label htmlFor="city">City</label>
          <input
            value={cityInputValue}
            onChange={cityInputChange}
            onBlur={cityInputBlur}
            type="text"
            id="city"
          />
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={props.onClose}>
            Cancel
          </button>
          <button
            onClick={postCartItems}
            disabled={!formIsValid}
            className={classes.submit}
          >
            Confirm
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Checkout;
