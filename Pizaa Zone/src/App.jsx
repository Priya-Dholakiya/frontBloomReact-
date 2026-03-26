import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Bookreserve from './componet/booknowreserve'
import Bookbanner from './componet/booknowbanner'
import Reservation from './componet/Reservation'
import Bookmap from './componet/bookmap'
import Header from './componet/header'
import Footer from './componet/footer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
      <Bookbanner />
      <Bookreserve />
      <Bookmap/>
      <Reservation/>
      <Footer/>
    </>
  )
}

export default App
