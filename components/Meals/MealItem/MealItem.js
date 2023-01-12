import { useDispatch, useSelector } from "react-redux";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
// import CartContext from "../../../store/CartContext";
import { cartActions } from "../../../store/CartSlice";

const MealItem = (props) => {
  const dispatch = useDispatch();

  const price = `${props.price.toFixed(2)}`;
  const addToCartHandler = (amount) => {
    dispatch(
      cartActions.addItem({
        id: props.id,
        name: props.name,
        amount: amount,
        price: props.price,
      })
    );
  };
  const cart = useSelector((state) => state.cart);
  const jsonObj = JSON.stringify(cart);
  localStorage.setItem("cart", jsonObj);

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>&#8377;{price}</div>
      </div>
      <div>
        <img src={props.img} alt="food" />
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
