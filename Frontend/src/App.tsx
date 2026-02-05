import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Order from "./pages/Order/Order";
import Profile from "./pages/Profile/profile";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { CartProvider } from "./context/cartContext";
import AllProducts from "./pages/Product/AllProducts";

// Layout for main site
const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes (No Navbar/Footer) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Main Website Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order" element={<Order />} />
            <Route path="/products" element={<AllProducts />} /> {/* Add this line for AllProducts page */}
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
