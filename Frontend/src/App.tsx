import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Profile from "./pages/Profile/profile";

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
    <BrowserRouter>
      <Routes>
        {/* Auth Routes (No Navbar/Footer) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Main Website Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
