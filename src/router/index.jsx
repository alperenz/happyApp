import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MainPage from "../pages/MainPage";
import DetailPage from "../pages/DetailPage";
import AboutPage from "../pages/AboutPage";
import Contact from "../pages/Contact";
import Register from "../pages/Register";
import SignIn from "../pages/SignIn";
import ProductCard from "../components/ProductCard";
import NoPage from "../pages/NoPage";
import Pricing from "../pages/Pricing";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import PrivacyPolicy from "../pages/privacyPolicy";
import TermsConditions from "../pages/TermsConditions";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/detail",
        element: <DetailPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/productcard",
        element: <ProductCard />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/privacypolicy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms_and_conditions",
        element: <TermsConditions />,
      },
      {
        path: "*",
        element: <NoPage />,
      },
    ],
  },
]);

export default router;
