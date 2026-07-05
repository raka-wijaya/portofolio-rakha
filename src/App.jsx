import './App.css'
import Navbar from './components/GlassSurface/Navbar/Navbar'
import Home from './pages/Home'
import Portofolio from './pages/Portfolio'
import Contact from './pages/Contact'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Certificate from './pages/Certificate'



function App() {


  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Portofolio" element={<Portofolio />} />
        <Route path="/Certificate" element={<Certificate />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes> 
    </BrowserRouter>
    </>
  )
}

export default App
