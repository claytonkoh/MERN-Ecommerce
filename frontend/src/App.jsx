import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Product from './pages/Product'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Contact from './pages/Contact'
import Login from './pages/Login'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import Verify from './pages/Verify'

import { ToastContainer, toast } from 'react-toastify';

// Animate Transition
const App = () => {
  const location = useLocation();

  const pageTransition = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
    transition: { duration: 0.33, ease: "easeInOut" },
  };

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-21'>
      <ToastContainer/>
      <NavBar />
      <SearchBar/>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={
            <motion.div {...pageTransition}><Home/></motion.div>
          } />
          <Route path='/collection' element={
            <motion.div {...pageTransition}><Collection/></motion.div>
          } />
          <Route path='/about' element={
            <motion.div {...pageTransition}><About/></motion.div>
          } />
          <Route path='/contact' element={
            <motion.div {...pageTransition}><Contact/></motion.div>
          } />
          <Route path='/product/:productId' element={
            <motion.div {...pageTransition}><Product/></motion.div>
          } />
          <Route path='/cart' element={
            <motion.div {...pageTransition}><Cart/></motion.div>
          } />
          <Route path='/login' element={
            <motion.div {...pageTransition}><Login/></motion.div>
          } />
          <Route path='/place-order' element={
            <motion.div {...pageTransition}><PlaceOrder/></motion.div>
          } />
          <Route path='/orders' element={
            <motion.div {...pageTransition}><Orders/></motion.div>
          } />
          <Route path='/verify' element={
            <motion.div {...pageTransition}><Verify/></motion.div>
          } />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default App


// const App = () => {
//   return (
//     <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
//       <NavBar/>
//       <Routes>
//         <Route path='/' element={<Home/>} />
//         <Route path='/collection' element={<Collection/>}/>
//         <Route path='/about' element={<About/>}/>
//         <Route path='/contact' element={<Contact/>}/>
//         <Route path='/product/:productid' element={<Product/>}/>
//         <Route path='/cart' element={<Cart/>}/>
//         <Route path='/login' element={<Login/>}/>
//         <Route path='/place-order' element={<PlaceOrder/>}/>
//         <Route path='/orders' element={<Orders/>}/>
//       </Routes>
//       <Footer/>
//     </div>
//   )
// }

// export default App
