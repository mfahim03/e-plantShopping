import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectAddedToCart, selectCartCount } from './CartSlice.jsx';

const categories = [
  { name: 'Leafy favourites', plants: [
    ['monstera-deliciosa', 'Monstera Deliciosa', 32, 'A statement-making split-leaf beauty for a bright corner.', 'photo-1614594975525-e45190c55d0b'],
    ['rubber-plant', 'Rubber Plant', 28, 'Glossy leaves and an easygoing nature make this a classic.', 'photo-1501004318641-b39e6451bec6'],
    ['bird-of-paradise', 'Bird of Paradise', 48, 'Bring a tropical feel home with bold, oversized foliage.', 'photo-1597055181300-df9b6e9b2f23'],
    ['calathea-orbifolia', 'Calathea Orbifolia', 36, 'Silvery stripes give this leafy beauty a soft, sculptural look.', 'photo-1497250681960-ef046c08a56e'],
    ['parlor-palm', 'Parlor Palm', 24, 'A graceful palm that adds gentle movement to any room.', 'photo-1509423350716-97f9360b4e09'],
    ['fiddle-leaf-fig', 'Fiddle Leaf Fig', 42, 'Large violin-shaped leaves create a striking focal point.', 'photo-1509937528035-ad76254b0356'],
  ]},
  { name: 'Easy-care plants', plants: [
    ['snake-plant', 'Snake Plant', 22, 'Architectural upright leaves and a wonderfully forgiving routine.', 'photo-1593691509543-c55fb32e5cee'],
    ['zz-plant', 'ZZ Plant', 26, 'Shiny, deep-green leaflets for low-fuss indoor greenery.', 'photo-1632207691143-643e2f4e6e2d'],
    ['pothos', 'Golden Pothos', 18, 'A trailing favourite that brings a cascade of cheerful green.', 'photo-1600411832986-5c2f9f3f7aa8'],
    ['spider-plant', 'Spider Plant', 20, 'Fresh, arching leaves and charming little plantlets.', 'photo-1572688484438-313a6e50c333'],
    ['jade-plant', 'Jade Plant', 19, 'A compact succulent with plump leaves and a tree-like form.', 'photo-1509423350716-97f9360b4e09'],
    ['peace-lily', 'Peace Lily', 25, 'Rich green foliage and elegant white blooms for your home.', 'photo-1593691509543-c55fb32e5cee'],
  ]},
  { name: 'Small-space gems', plants: [
    ['heartleaf-philodendron', 'Heartleaf Philodendron', 17, 'Heart-shaped leaves trail beautifully from a shelf or hanger.', 'photo-1501004318641-b39e6451bec6'],
    ['string-of-pearls', 'String of Pearls', 21, 'A playful, beaded succulent made for bright hanging spots.', 'photo-1459411552884-841db9b3cc2a'],
    ['pilea-peperomioides', 'Chinese Money Plant', 23, 'Round coin-like leaves on slender stems bring a playful shape.', 'photo-1497250681960-ef046c08a56e'],
    ['air-plant', 'Tillandsia Air Plant', 14, 'A petite, soil-free plant for shelves and creative displays.', 'photo-1509423350716-97f9360b4e09'],
    ['succulent-garden', 'Succulent Trio', 27, 'Three petite succulents, ready to brighten a sunny windowsill.', 'photo-1459411552884-841db9b3cc2a'],
    ['mini-monstera', 'Mini Monstera', 29, 'A compact climber with charming fenestrated leaves.', 'photo-1614594975525-e45190c55d0b'],
  ]},
];

function Navbar({ onHomeClick, onPlantsClick, onCartClick }) {
  const count = useSelector(selectCartCount);
  return <nav className="site-nav" aria-label="Main navigation">
    <button className="brand nav-brand" type="button" onClick={onHomeClick}>Paradise Nursery<small>Grow at home</small></button>
    <div className="nav-links"><button type="button" onClick={onHomeClick}>Home</button><button type="button" onClick={onPlantsClick}>Plants</button><button className="cart-link" type="button" onClick={onCartClick} aria-label={`Cart, ${count} items`}>
      <span aria-hidden="true">🛒</span> Cart <span id="cart_quantity_count" className="cart-badge cart_quantity_count">{count}</span>
    </button></div>
  </nav>;
}

export default function ProductList({ onHomeClick, onPlantsClick, onCartClick }) {
  const dispatch = useDispatch();
  const addedToCart = useSelector(selectAddedToCart);
  return <>
    <Navbar onHomeClick={onHomeClick} onPlantsClick={onPlantsClick} onCartClick={onCartClick} />
    <main className="catalog">
      <div className="section-heading"><div><p className="eyebrow">Find your new favourite</p><h1>Plants for every space</h1><p>Thoughtfully chosen greens, ready to make themselves at home.</p></div></div>
      {categories.map(({ name, plants }) => <section className="category" key={name} aria-label={name}>
        <h2 className="category-heading">{name}</h2>
        <div className="product-list">
          {plants.map(([id, title, cost, description, image]) => {
            const added = addedToCart[title];
            const imageUrl = `https://images.unsplash.com/${image}?auto=format&fit=crop&w=750&q=80`;
            return <article className="plant-card" key={id}>
              <img src={imageUrl} alt={title} loading="lazy" />
              <div className="plant-info"><h3>{title}</h3><p>{description}</p>
                <div className="plant-bottom"><span className="price">${cost.toFixed(2)}</span>
                  <button className="button button-green" type="button" disabled={addedToCart[title]}
                    onClick={() => dispatch(addItem({ id, name: title, cost, image: imageUrl }))}>
                    {added ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </article>;
          })}
        </div>
      </section>)}
    </main>
  </>;
}
