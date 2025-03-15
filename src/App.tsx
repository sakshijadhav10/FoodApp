import Header from "./Components/Layout/Header";
import { Route, Routes } from "react-router-dom";
import CartDetails from "./Restaurants/RestaurantInfo";

import SearchItem from "./Restaurants/Components/SearchRestaurant";
import { Toaster } from "react-hot-toast";
import AddtoCart from "./Cart/AddtoCartPopUp";
import HomePage from "./Restaurants/HomePage";
import DealsOfDay from "./Restaurants/DealsOfDay";
import CheckoutPage from "./Cart/CheckoutPage";
import AuthDrawer from "./Auth/AuthDrawer";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchItem />}></Route>
        <Route path="/cartDetails/:resId" element={<CartDetails />}></Route>
        <Route path="/cart" element={<CheckoutPage />}></Route>
        <Route path="/dealsofday" element={<DealsOfDay />}></Route>
        {/* <Route path="/checkout" element={<CheckoutPage />}></Route> */}
        <Route path="/auth" element={<AuthDrawer />}></Route>

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
