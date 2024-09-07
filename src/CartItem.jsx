import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';
import ProductList from './ProductList';


const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [cartCount, setCartCount] = useState(0);
  const [addedToCart, setAddedToCart] = useState({});
  

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + parseFloat(item.cost.replace("$","")) * parseInt(item.quantity), 0);
  };

  // Handle "Continue Shopping" button functionality
  const handleContinueShopping = (e) => {
    
    
};

  // Handle "Checkout" button functionality
  const handleCheckoutShopping = (e) => {
    alert('Checkout functionality to be implemented');
  };

  // Increment item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    setCartCount(cartCount + 1);
    
  };

  // Decrement item quantity or remove it from the cart if quantity is 0
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
      setCartCount(cartCount - 1);
    } else {
      dispatch(removeItem(item.name));  // Remove item if quantity reaches 0
      setCartCount(cartCount - 1);
    }
    
  };


  // Remove item from cart
  const handleRemove = (item) => {
    console.log("Removing item:", item.name);  // Debug log
    dispatch(removeItem({name: item.name}));
    setCartCount(cartCount - 1);
  };

  // Calculate total cost for a single item based on quantity
  const calculateTotalCost = (item) => {
    return parseFloat(item.cost.replace("$","")) * parseInt(item.quantity);
  };

  // Calculate total number of items in the cart
  const calculateTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Remove an item from Cart</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount">
        Total Items: {calculateTotalItems()}
      </div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={onContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
