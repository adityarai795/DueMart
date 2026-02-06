import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error, clearError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleLogin = async () => {
    try {
      setLocalError("");
      clearError();

      // Validation
      if (!email.trim()) {
        setLocalError("Email is required");
        return;
      }
      if (!password.trim()) {
        setLocalError("Password is required");
        return;
      }

      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setLocalError(err.message || "Login failed");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back to DueMart
        </h1>
        <p className="text-center text-gray-500 mb-8">Login to your account</p>

        {/* Error Messages */}
        {(localError || error) && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {localError || error}
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setLocalError("");
            }}
            onKeyPress={handleKeyPress}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-600 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setLocalError("");
            }}
            onKeyPress={handleKeyPress}
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 py-4 rounded-xl mb-4 text-white font-semibold text-lg hover:bg-blue-700 active:opacity-70 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <div className="flex justify-center">
          <span className="text-gray-500 mr-1">Don't have an account?</span>
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-600 font-semibold hover:underline"
            disabled={loading}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
