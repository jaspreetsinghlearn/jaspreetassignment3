import React, { useState } from "react";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  const shoes = [
    {
      id: 1,
      name: "Nike Air Max",
      price: 120,
      image: "/images/nike.jpg",
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      price: 140,
      image: "/images/adidas.jpg",
    },
    {
      id: 3,
      name: "Puma Rider",
      price: 100,
      image: "/images/puma.jpg",
    },
    {
      id: 4,
      name: "Reebok Classic",
      price: 110,
      image: "/images/rebok.jpg",
    },
    {
      id: 5,
      name: "New Balance 574",
      price: 130,
      image: "/images/balance.jpg",
    },
    {
      id: 6,
      name: "Converse Chuck",
      price: 90,
      image: "/images/converse.jpg",
    },
  ];

  const addToCart = (shoe) => {
    const item = cart.find((c) => c.id === shoe.id);
    if (item) {
      setCart(
        cart.map((c) =>
          c.id === shoe.id ? { ...c, quantity: c.quantity + 1 } : c
        )
      );
    } else {
      setCart([...cart, { ...shoe, quantity: 1 }]);
    }
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="app">
      <h1>Shoe Store App</h1>
      <div className="container">
        <div className="shoe-list">
          <h2>Available Shoes</h2>
          <div className="shoe-grid">
            {shoes.map((shoe) => (
              <div className="shoe-card" key={shoe.id}>
                <img src={shoe.image} alt={shoe.name} />
                <h3>{shoe.name}</h3>
                <p>${shoe.price}</p>
                <button onClick={() => addToCart(shoe)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </div>

        <div className="cart">
          <h2>Shopping Cart</h2>
          {cart.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-details">
                    <h4>{item.name}</h4>
                    <p>Price: ${item.price}</p>
                    <div className="quantity-controls">
                      <button onClick={() => decreaseQuantity(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>
                  </div>
                </div>
              ))}
              <h3>Total: ${getTotal()}</h3>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
