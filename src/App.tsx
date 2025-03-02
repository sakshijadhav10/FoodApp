import React from "react";
import Header from "./Components/Header";

import Body from "./Components/Body";
import { Route, Routes } from "react-router-dom";

// import { Footer } from './Components/Footer'

import CartDetails from "./Components/CartDetails";
import CartInfo from "./Components/CartInfo";
// import Cartdesc from './Components/CartDesc'
import SearchItem from "./Components/SearchItem";
// import CartDesc from './Components/CartDesc'
import { Toaster } from "react-hot-toast";
import AddtoCart from "./Components/AddtoCart";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Body />}></Route>
        <Route path="/search" element={<SearchItem />}></Route>
        <Route path="/cartDetails/:resId" element={<CartDetails />}></Route>
        <Route path="/Cartdesc" element={<CartInfo />}></Route>
        <Route
          path="/addtocart"
          element={
            <AddtoCart
              open={false}
              onClose={function (): void {
                throw new Error("Function not implemented.");
              }}
              handleAddAgain={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          }
        />
        {/* <Route path='/cartinfo' element={<CartInfo/>}></Route> */}
        {/* <Route path='/Cartdesc' element={<CartDesc />}></Route> */}
      </Routes>
      <Toaster />
      {/* <Footer/> */}
    </>
  );
};

export default App;
