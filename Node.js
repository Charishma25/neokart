// Full NeoKart+ Enhanced Website (Frontend only)
// React + Tailwind CSS | Node.js & MongoDB backend will be hooked later

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Wishlist } from './pages/Wishlist';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <Router>
      <div className={`min-h-screen font-sans ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

// File: components/Header.jsx
export function Header({ darkMode, setDarkMode }) {
  return (
    <header className="shadow sticky top-0 bg-white dark:bg-gray-800 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">NeoKart+</Link>
        <div className="hidden sm:flex flex-1 mx-4">
          <input type="text" placeholder="Search products..." className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring dark:bg-gray-700 dark:text-white" />
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => setDarkMode(!darkMode)} className="text-xl">
            {darkMode ? '🌞' : '🌙'}
          </button>
          <Link to="/wishlist">❤️</Link>
          <Link to="/cart">🛒</Link>
          <Link to="/signin">🔐</Link>
        </div>
      </div>
    </header>
  );
}

// File: components/Footer.jsx
export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-center text-sm py-6 text-gray-600 dark:text-gray-400">
      © 2025 NeoKart+. Built with ❤️ using React + Tailwind.
    </footer>
  );
}

// File: pages/Home.jsx
export function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const dummyProducts = [
    { id: 1, title: 'Fresh Apples', price: '₹120/kg', img: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce', category: 'Fruits' },
    { id: 2, title: 'Almonds (Badam)', price: '₹850/kg', img: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2', category: 'Dry Fruits' },
    { id: 3, title: 'Basmati Rice', price: '₹90/kg', img: 'https://images.unsplash.com/photo-1586201375761-83865001e17b', category: 'Grains' },
  ];

  const filteredProducts = selectedCategory === 'All' ? dummyProducts : dummyProducts.filter(p => p.category === selectedCategory);

  return (
    <main className="px-4 max-w-7xl mx-auto">
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-12 rounded-2xl mt-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to NeoKart+</h1>
        <p className="text-lg mb-6">Shop fresh groceries, dry fruits, grains, and daily essentials at your doorstep.</p>
        <button className="bg-white text-indigo-600 px-6 py-3 font-semibold rounded-full hover:bg-gray-100">Start Shopping</button>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">🆕 New Arrivals</h2>

        <div className="mb-4 flex gap-2 flex-wrap">
          {['All', 'Fruits', 'Dry Fruits', 'Grains'].map(category => (
            <button
              key={category}
              className={`px-4 py-1 rounded-full border ${selectedCategory === category ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white'}`}
              onClick={() => setSelectedCategory(category)}>
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="border rounded-xl p-4 hover:shadow-lg dark:bg-gray-800 relative">
              <button className="absolute top-3 right-3 text-xl">🤍</button>
              <img src={product.img} alt={product.title} className="rounded-xl mb-2 h-48 w-full object-cover" />
              <h3 className="text-lg font-medium">{product.title}</h3>
              <p className="text-indigo-600 font-bold">{product.price}</p>
              <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">🔥 Trending Now</h2>
        <div className="bg-yellow-50 p-6 rounded-xl text-center text-lg text-yellow-800 font-medium dark:bg-yellow-100">
          "Seasonal Fruits & Organic Grains – Healthy choices for your family!"
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">💸 Best Deals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="border border-green-500 rounded-xl p-4 bg-green-50 hover:shadow dark:bg-green-100 relative">
              <button className="absolute top-3 right-3 text-xl">🤍</button>
              <img src={product.img} alt={product.title} className="rounded-xl mb-2 h-48 w-full object-cover" />
              <h3 className="text-lg font-medium">{product.title}</h3>
              <p className="text-green-600 font-bold">{product.price} <span className="line-through text-sm text-gray-400">₹149</span></p>
              <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700">Buy Now</button>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 bg-indigo-50 p-8 rounded-2xl dark:bg-indigo-900">
        <h2 className="text-2xl font-semibold mb-6 text-center">🌟 Customer Love</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <blockquote className="p-4 bg-white rounded-xl shadow dark:bg-gray-800">
            "Absolutely love the freshness and quality of NeoKart+ groceries. Highly recommend!"
            <footer className="mt-2 text-sm text-right">– Priya K.</footer>
          </blockquote>
          <blockquote className="p-4 bg-white rounded-xl shadow dark:bg-gray-800">
            "From fruits to dry fruits, all delivered neatly packed and on time. Great job!"
            <footer className="mt-2 text-sm text-right">– Anuj R.</footer>
          </blockquote>
        </div>
      </section>
    </main>
  );
}
