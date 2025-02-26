import React from 'react'
import Header from './Components/Header'

import Body from './Components/Body'
import {  Route, Routes} from 'react-router-dom'


// import { Footer } from './Components/Footer'

import CartDetails from './Components/CartDetails'
import CartInfo from './Components/CartInfo'
import Cartdesc from './Components/CartDesc'




const App = () => {
  
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Body/>}></Route>
      
        <Route path='/cartDetails/:resId' element={<CartDetails/>}></Route>
        <Route path='/cart' element={<CartInfo/>}></Route>
        <Route path='/Cartdesc' element={<Cartdesc/>}></Route>
      </Routes>
      {/* <Footer/> */}
      </>
  )
}

export default App