import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeItem, selectCartCount, selectCartItems, selectCartTotal, updateQuantity } from './CartSlice.jsx';

function Navbar({ onHomeClick, onPlantsClick, onCartClick }) {
  const count = useSelector(selectCartCount);
  return <nav className="site-nav" aria-label="Main navigation">
    <button className="brand nav-brand" type="button" onClick={onHomeClick}>Paradise Nursery<small>Grow at home</small></button>
    <div className="nav-links"><button type="button" onClick={onHomeClick}>Home</button><button type="button" onClick={onPlantsClick}>Plants</button><button className="cart-link" type="button" onClick={onCartClick} aria-label={`Cart, ${count} items`}>
      <span aria-hidden="true">🛒</span> Cart <span id="cart_quantity_count" className="cart-badge cart_quantity_count">{count}</span>
    </button></div>
  </nav>;
}

export default function CartItem({ onHomeClick, onPlantsClick, onCartClick }) {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const count = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);
  const [message, setMessage] = useState('');

  function checkout() {
    setMessage('Coming Soon — checkout will be available soon.');
    window.setTimeout(() => setMessage(''), 2800);
  }

  function handleIncrement(item) {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  }

  function handleDecrement(item) {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
  }

  function handleRemove(item) {
    dispatch(removeItem(item.name));
  }

  return <>
    <Navbar onHomeClick={onHomeClick} onPlantsClick={onPlantsClick} onCartClick={onCartClick} />
    <main className="cart-page cart-container">
      <header className="cart-header"><div><p className="eyebrow">Your leafy picks</p><h1>Shopping Cart</h1><p>{count} {count === 1 ? 'item' : 'items'} in your cart</p></div></header>
      {items.length === 0 ? <section className="empty-cart">
        <p className="eyebrow">Room to grow</p><h2>Your cart is looking a little bare.</h2><p>Find a plant that feels like home and it will show up here.</p>
        <button className="button button-green get-started-button" type="button" onClick={onPlantsClick}>Continue Shopping</button>
      </section> : <div className="cart-layout">
        <section className="cart-items" aria-label="Cart items">
          {items.map((item) => <article className="cart-row" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="cart-product"><h2>{item.name}</h2><p>Unit price: ${item.cost.toFixed(2)}</p>
              <div className="cart-actions"><div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => handleIncrement(item)}>+</button>
              </div><button className="icon-button" type="button" onClick={() => handleRemove(item)}>Delete</button></div>
            </div>
            <div className="line-total">${(item.cost * item.quantity).toFixed(2)}</div>
          </article>)}
        </section>
        <aside className="summary"><h2>Order Summary</h2>
          <div className="summary-line"><span>Plants ({count})</span><span>${total.toFixed(2)}</span></div>
          <div className="summary-line"><span>Delivery</span><span>Calculated at checkout</span></div>
          <div className="summary-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
          <button className="button button-green get-started-button1" type="button" onClick={checkout}>Checkout</button>
          <button className="button button-outline get-started-button" type="button" onClick={onPlantsClick}>Continue Shopping</button>
          <button className="icon-button" type="button" onClick={() => dispatch(clearCart())}>Clear cart</button>
        </aside>
      </div>}
      {message && <div className="toast" role="status">{message}</div>}
    </main>
  </>;
}
