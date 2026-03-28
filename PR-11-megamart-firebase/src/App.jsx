import { Route, Routes } from "react-router"
import Header from "./Components/Header/Header"
import HomePage from "./Components/HomePage/HomePage"
import Add from "./Components/Add/Add"
import Men from "./Components/Men/Men"
import Footer from "./Components/Footer/Footer"
import Edit from "./Components/Edit/Edit"
import Women from "./Components/Women/Women"
import SignIn from "./Components/SignIn/SignIn"
import SignUp from "./Components/SignUp/SignUp"
import Kids from "./Components/Kids/Kids"


function App() {

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/Add" element={<Add></Add>}></Route>
        <Route path="/Men" element={<Men></Men>}></Route>
        <Route path="/Women" element={<Women></Women>}></Route>
        <Route path="/Kids" element={<Kids></Kids>}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/Edit/:id" element={<Edit></Edit>}></Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
