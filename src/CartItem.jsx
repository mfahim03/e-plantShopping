import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart, decreaseQuantity, increaseQuantity, removeFromCart, selectCartCount, selectCartTotal } from './CartSlice.jsx';

function Navbar() {
  const count = useSelector(selectCartCount);
  return <nav className="site-nav" aria-label="Main navigation">
    <Link className="brand" to="/">Paradise Nursery<small>Grow at home</small></Link>
    <div className="nav-links"><Link to="/">Home</Link><Link to="/plants">Plants</Link><Link className="cart-link" to="/cart" aria-label={`Cart, ${count} items`}>
      <span aria-hidden="true">🛒</span> Cart <span className="cart-badge">{count}</span>
    </Link></div>
  </nav>;
}

export default function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const count = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);
  const [message, setMessage] = useState('');

  function checkout() {
    setMessage('Coming Soon — checkout will be available soon.');
    window.setTimeout(() => setMessage(''), 2800);
  }

  return <>
    <Navbar />
    <main className="cart-page">
      <header className="cart-header"><div><p className="eyebrow">Your leafy picks</p><h1>Shopping Cart</h1><p>{count} {count === 1 ? 'item' : 'items'} in your cart</p></div></header>
      {items.length === 0 ? <section className="empty-cart">
        <p className="eyebrow">Room to grow</p><h2>Your cart is looking a little bare.</h2><p>Find a plant that feels like home and it will show up here.</p>
        <Link className="button button-green" to="/plants">Continue Shopping</Link>
      </section> : <div className="cart-layout">
        <section className="cart-items" aria-label="Cart items">
          {items.map((item) => <article className="cart-row" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="cart-product"><h2>{item.name}</h2><p>Unit price: ${item.price.toFixed(2)}</p>
              <div className="cart-actions"><div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => dispatch(decreaseQuantity(item.id))}>−</button>
                <span>{item.quantity}</span>
                <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
              </div><button className="icon-button" type="button" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button></div>
            </div>
            <div className="line-total">${(item.price * item.quantity).toFixed(2)}</div>
          </article>)}
        </section>
        <aside className="summary"><h2>Order Summary</h2>
          <div className="summary-line"><span>Plants ({count})</span><span>${total.toFixed(2)}</span></div>
          <div className="summary-line"><span>Delivery</span><span>Calculated at checkout</span></div>
          <div className="summary-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
          <button className="button button-green" type="button" onClick={checkout}>Checkout</button>
          <Link className="button button-outline" to="/plants">Continue Shopping</Link>
          <button className="icon-button" type="button" onClick={() => dispatch(clearCart())}>Clear cart</button>
        </aside>
      </div>}
      {message && <div className="toast" role="status">{message}</div>}
    </main>
  </>;
}
