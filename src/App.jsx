import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Recipes from './pages/Recipes'
import DrinkDetail from './pages/DrinkDetail'
import Subscription from './pages/Subscription'
import Community from './pages/Community'
import CommunityDetail from './pages/CommunityDetail'
import CreateDrink from './pages/CreateDrink'
import './App.css'

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<DrinkDetail />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/:id" element={<CommunityDetail />} />
          <Route path="/create" element={<CreateDrink />} />
          <Route path="/subscribe" element={<Subscription />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo">bev</span>
            <p>Craft bar-level drinks at home, any night of the week.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Product</h4>
              <a href="/recipes">All Recipes</a>
              <a href="/community">Community</a>
              <a href="/subscribe">Pricing</a>
            </div>
            <div className="footer-col">
              <h4>Support</h4>
              <a href="#">FAQ</a>
              <a href="#">Contact Us</a>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <a href="#">Terms of Service</a>
              <a href="#">Privacy Policy</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Bev. All rights reserved. Drink responsibly. Must be of legal drinking age.</p>
        </div>
      </footer>
    </div>
  )
}
