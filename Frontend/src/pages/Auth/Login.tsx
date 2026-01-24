import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { loginService } from "../../src/services/authService";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("john@example.com");
  const [password, setPassword] = useState("password123");

  const handleLogin = async () => {
    try {
      // const res = await loginService(email, password);
      // console.log("Login successful:", res);

      alert("Login successful!");
      navigate("/"); // or /dashboard
    } catch (err) {
      console.log("Login failed:", err);
      alert("Login failed. Check console.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-md">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back on DueMart
        </h1>
        <p className="text-center text-gray-500 mb-8">Login to your account</p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-600 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 py-4 rounded-xl mb-4 text-white font-semibold text-lg hover:bg-blue-700 active:opacity-70 transition"
        >
          Login
        </button>

        {/* Footer */}
        <div className="flex justify-center">
          <span className="text-gray-500 mr-1">Don't have an account?</span>
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
