import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import store from "./store";
import { Provider } from "react-redux";
import AdminScreen from "./screens/AdminScreen.jsx";
import AdminBanner from "./screens/AdminBanner.jsx";
import AdminAbout from "./screens/AdminAbout.jsx";
import AdminProduct from "./screens/AdminProduct.jsx";
import AdminContactPage from "./screens/AdminContactPage.jsx";
import AdminContactForm from "./screens/AdminContactForm.jsx";
import Home from "./screens/Home.jsx";
import About from "./screens/About.jsx";
import Contact from "./screens/Contact.jsx";
import Product from "./screens/Product.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import NotFound from "./screens/NotFound.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/about" element={<About />} />
      <Route path="/product" element={<Product />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/admin" element={<AdminScreen />} />
        <Route path="/admin/banner" element={<AdminBanner />} />
        <Route path="/admin/about" element={<AdminAbout />} />
        <Route path="/admin/product" element={<AdminProduct />} />
        <Route path="/admin/contact/page" element={<AdminContactPage />} />
        <Route path="/admin/contact/form" element={<AdminContactForm />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
