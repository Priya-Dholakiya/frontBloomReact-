import { Routes, Route } from 'react-router-dom'
import './App.css'
import Banner from './components/Banner/Banner'
import CTA from './components/CTA/CTA'
import Features from './components/Features/Feature'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import ShopCategory from './components/Shop/Shopcategory'
import Testimonials from './components/Testimonials/Testimonials'
// Products component will be created later
import Products from './components/Products/Products'

function App() {
  const Home = () => (
    <>
      <Banner />
      <ShopCategory />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  )

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  )
}

export default App


