import React from 'react';

const Products = () => {
  const htevents = window.htevents;
  
  const products = [
    { id: 1, name: 'Basic Analytics', price: 49 },
    { id: 2, name: 'Advanced Analytics', price: 99 },
    { id: 3, name: 'Enterprise Suite', price: 299 }
  ];

  const handleProductView = (product) => {
    htevents.track('Product Viewed', {
      productId: product.id,
      productName: product.name,
      price: product.price
    });
  };

  const handleAddToCart = (product) => {
    htevents.track('Add To Cart', {
      productId: product.id,
      productName: product.name,
      price: product.price,
      currency: 'USD'
    });
  };

  return (
    <div className="page products-page">
      <h2>Products</h2>
      <p>Browse our selection of analytics packages</p>
      
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p className="price">${product.price}/month</p>
            <div className="product-actions">
              <button 
                onClick={() => handleProductView(product)}
                className="demo-button view-button"
              >
                View Details
              </button>
              <button 
                onClick={() => handleAddToCart(product)}
                className="demo-button cart-button"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;