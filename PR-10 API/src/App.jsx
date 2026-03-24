import { Routes, Route } from 'react-router-dom'
import './App.css'
import Banner from './components/Banner/Banner'
import CTA from './components/CTA/CTA'
import Features from './components/Features/Feature'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import ShopCategory from './components/Shop/ShopCategory'
import Testimonials from './components/Testimonials/Testimonials'
import Products from './components/Products/Products'
import Category from './components/Category/Category'
import Sale from './components/Sale/Sale'
import About from './components/About/About'
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
  const CategoryPage = () =>(
    <>
      <Banner />
      <Category />
      <Footer />
    </>
  )

  const SalePage = () => (
    <>
      <Sale />
      <Footer />
    </>
  )

  const AboutPage = () => (
    <>
      <About />
      <Footer />
    </>
  )
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<CategoryPage />} />
        {/* <Route path="/shop" element={<ShopPage />} /> */}
        <Route path="/sale" element={<SalePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  )
}

export default App


