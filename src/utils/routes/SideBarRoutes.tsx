import HomePage from "../../Restaurants/HomePage";
import SearchItem from "../../Restaurants/Components/SearchRestaurant";
import CartItemInfo from "../../Cart/CartItemInfo";

export const sidebar = [
  {
    routerName: "Home",
    routeHref: "/",
    icon: <HomePage />,
  },
  {
    routerName: "Search",
    routeHref: "/search",
    icon: <SearchItem />,
  },
  {
    routerName: "Offer",
    routeHref: "https://www.swiggy.com/offers-near-me",
    target: "blank",
  },
  {
    routerName: "Help",
    routeHref: "https://www.swiggy.com/support",
  },
  {
    routerName: "Cart",
    routeHref: "/cart",
    icon: <CartItemInfo />,
  },
  // {
  //   routeName: "SignIn",
  //   routeHref: <AuthDrawer />,
  //   icon: <AuthDrawer />,
  // },
];
