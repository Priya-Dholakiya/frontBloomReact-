
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Components/Header/Header'
import AddHotel from './Components/AddHotel'
import EditHotel from './Components/EditHotel'
import Home from './Components/Home'
import ViewRoom from './Components/View'
import AddRoom from './Components/AddRoom'
import EditRoom from './Components/EditRoom'
import SignIN from './Components/Sign-In '
import AuthListener from './Services/Auth'
import SignUP from './Components/Sign-Up'

function App() {


  return (
    <>
      <Header/>
      <AuthListener/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/add-hotel" element={<AddHotel />} />
      <Route path="/edit-hotel/:id" element={<EditHotel />} />

<Route path="/add-room" element={<AddRoom />} />
      <Route path="/edit-room/:id" element={<EditRoom />} />
      <Route path="/rooms" element={<Home />} />
      <Route path="/room/:id" element={<ViewRoom />} />
      <Route path="/sign-in" element={<SignIN />} />
      <Route path="/sign-up" element={<SignUP />} />
     </Routes>
    </>
  )
}

export default App
