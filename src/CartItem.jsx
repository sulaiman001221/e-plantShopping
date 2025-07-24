"use client";

import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity, clearCart } from "./CartSlice";
import "./CartItem.css";

function CartItem({ onContinueShopping, onCheckout }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveItem = (itemName) => {
    dispatch(removeItem({ name: itemName }));
  };

  const handleUpdateQuantity = (itemName, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeItem({ name: itemName }));
    } else {
      dispatch(updateQuantity({ name: itemName, quantity: newQuantity }));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = Number.parseFloat(item.cost.replace("$", ""));
      return total + price * item.quantity;
    }, 0);
  };

  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your Cart</h2>
        <p>Your cart is empty</p>
        <button className="get-started-button1" onClick={onContinueShopping}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart ({calculateTotalItems()} items)</h2>

      {cartItems.map((item, index) => (
        <div key={index} className="cart-item">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            className="cart-item-image"
          />
          <div className="cart-item-details">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-cost">{item.cost}</div>
            <div className="cart-item-quantity">
              <button
                className="cart-item-button cart-item-button-dec"
                onClick={() =>
                  handleUpdateQuantity(item.name, item.quantity - 1)
                }
              >
                -
              </button>
              <span className="cart-item-quantity-value">{item.quantity}</span>
              <button
                className="cart-item-button cart-item-button-inc"
                onClick={() =>
                  handleUpdateQuantity(item.name, item.quantity + 1)
                }
              >
                +
              </button>
            </div>
            <div className="cart-item-total">
              Total: $
              {(
                Number.parseFloat(item.cost.replace("$", "")) * item.quantity
              ).toFixed(2)}
            </div>
            <button
              className="cart-item-delete"
              onClick={() => handleRemoveItem(item.name)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <div className="total_cart_amount">
        Total Cart Amount: ${calculateTotal().toFixed(2)}
      </div>

      <div className="continue_shopping_btn">
        <button className="get-started-button1" onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <button className="get-started-button1" onClick={onCheckout} style={{ marginLeft: "20px" }}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;
