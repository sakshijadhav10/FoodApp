import Header from "./Components/Layout/Header";
import { Route, Routes } from "react-router-dom";
import CartDetails from "./Restaurants/RestaurantInfo";
import CartInfo from "./Cart/CartInfo";
import SearchItem from "./Restaurants/Components/SearchRestaurant";
import { Toaster } from "react-hot-toast";
import AddtoCart from "./Cart/AddtoCartPopUp";
import HomePage from "./Restaurants/HomePage";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchItem />}></Route>
        <Route path="/cartDetails/:resId" element={<CartDetails />}></Route>
        <Route path="/cart" element={<CartInfo />}></Route>

        <Route
          path="/addtocart"
          element={
            <AddtoCart
              open={false}
              onClose={function (): void {
                throw new Error("Function not implemented.");
              }}
              onHandleAddAgain={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          }
        />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
