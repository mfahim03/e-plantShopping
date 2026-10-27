import { Link, Route, Routes } from 'react-router-dom';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';

function LandingPage() {
  return (
    <main className="landing">
      <div className="landing-shade" />
      <section className="landing-content">
        <p className="eyebrow light">A greener kind of home</p>
        <h1>Paradise<br />Nursery</h1>
        <p className="landing-copy">Bring the calm and beauty of nature into your everyday.</p>
        <Link className="button button-light" to="/plants">Get Started <span aria-hidden="true">→</span></Link>
      </section>
      <div className="landing-note"><span>01 / 03</span><span>Find your happy place</span></div>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/plants" element={<><ProductList /><AboutUs /></>} />
      <Route path="/cart" element={<CartItem />} />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}
