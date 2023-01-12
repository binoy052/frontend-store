import { Fragment, useState } from "react";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

import Checkout from "./Checkout";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/CartSlice";

const Cart = (props) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState();
  const [didSubmit, setDidSubmit] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);

  let totalAmount = useSelector((state) => state.cart.totalAmount);
  totalAmount = totalAmount.toFixed(2);

  const orderedItems = useSelector((state) => state.cart.items);
  const hasItems = orderedItems.length > 0;

  const cartItemRemoveHandler = (id) => {
    dispatch(cartActions.removeItem(id));
  };

  const cartItemAddHandler = (item) => {
    dispatch(cartActions.addItem({ ...item, amount: 1 }));
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };
  // ${process.env.REACT_APP_FIREBASE_DATABASE_API}/orders.json
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    const sendData = {
      user: userData,
      orderedItems,
    };
    //console.log(sendData);
    const url = `${process.env.REACT_APP_API}/order`;
    await fetch(url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(sendData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsSubmitting(false);
    setDidSubmit(true);
    dispatch(cartActions.clearCart());
    localStorage.removeItem("cart");
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {orderedItems.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>&#8377;{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );
  return (
    <Modal onClick={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
