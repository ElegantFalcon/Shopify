import React, { useState, useEffect } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const cartTotal = cart.reduce((total, product) => total + product.price, 0);
  const cartCount = cart.length;

  const filteredProducts = products.filter(product => {
    const titleMatch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const minPriceMatch = minPrice ? product.price >= minPrice : true;
    const maxPriceMatch = maxPrice ? product.price <= maxPrice : true;
    return titleMatch && minPriceMatch && maxPriceMatch;
  });

  return (
    <div>
      <h1>Shopify</h1>
      <p>Cart Count: {cartCount} | Total: ${cartTotal.toFixed(2)}</p>
      <button onClick={handleLogout}>Logout</button>
      <input 
        type="text" 
        placeholder="Search products by name..." 
        value={searchTerm}
        onChange={handleSearchChange} 
      />
      <input 
        type="number" 
        placeholder="Min price" 
        value={minPrice}
        onChange={handleMinPriceChange} 
      />
      <input 
        type="number" 
        placeholder="Max price" 
        value={maxPrice}
        onChange={handleMaxPriceChange} 
      />
      <div>
        <h2>Products</h2>
        <div>
          {filteredProducts.map(product => (
            <div key={product.id}>
              <h3>{product.title}</h3>
              <img src={product.thumbnail} alt={product.title} style={{ width: '100px' }} />
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
