import { useState } from 'react';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';

function LandingPage({ onGetStarted }) {
  return (
    <main className="background-image landing">
      <div className="landing-shade" />
      <section className="landing-content">
        <p className="eyebrow light">A greener kind of home</p>
        <h1>Welcome to<br />Paradise Nursery</h1>
        <p className="landing-copy">Bring the calm and beauty of nature into your everyday.</p>
        <button className="button button-light get-started-button" type="button" onClick={onGetStarted}>Get Started <span aria-hidden="true">→</span></button>
      </section>
      <div className="landing-note"><span>01 / 03</span><span>Find your happy place</span></div>
    </main>
  );
}

export default function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleHomeClick = () => { setShowProductList(false); setShowCart(false); };
  const handlePlantsClick = () => { setShowProductList(true); setShowCart(false); };
  const handleCartClick = () => { setShowProductList(false); setShowCart(true); };
  const handleGetStartedClick = () => { setShowProductList(true); setShowCart(false); };

  return (
    <>
      {showCart ? <CartItem onHomeClick={handleHomeClick} onPlantsClick={handlePlantsClick} onCartClick={handleCartClick} />
        : showProductList ? <><ProductList onHomeClick={handleHomeClick} onPlantsClick={handlePlantsClick} onCartClick={handleCartClick} /><AboutUs /></>
          : <LandingPage onGetStarted={handleGetStartedClick} />}
    </>
  );
}
