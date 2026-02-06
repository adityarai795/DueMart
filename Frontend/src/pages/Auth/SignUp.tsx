import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Signup = () => {
  const navigate = useNavigate();
  const { signup, loading, error, clearError } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileno: "",
  });
  const [localError, setLocalError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setLocalError("");
  };

  const validateForm = (): string | null => {
    if (!formData.name.trim()) return "Full name is required";
    if (formData.name.trim().length < 2)
      return "Full name must be at least 2 characters";

    if (!formData.email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return "Invalid email format";

    if (!formData.password) return "Password is required";
    if (formData.password.length < 6)
      return "Password must be at least 6 characters";

    if (!formData.confirmPassword) return "Please confirm your password";
    if (formData.password !== formData.confirmPassword)
      return "Passwords do not match";

    if (!formData.mobileno.trim()) return "Mobile number is required";
    if (!/^\d{10}$/.test(formData.mobileno.trim()))
      return "Mobile number must be 10 digits";

    return null;
  };

  const handleSubmit = async () => {
    try {
      clearError();
      const validationError = validateForm();
      if (validationError) {
        setLocalError(validationError);
        return;
      }

      await signup(
        formData.name,
        formData.email,
        formData.password,
        formData.mobileno,
      );
      navigate("/");
    } catch (err: any) {
      setLocalError(err.message || "Signup failed");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-y-auto py-10">
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Create Account on DueMart
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Sign up to get started
          </p>

          {/* Error Messages */}
          {(localError || error) && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {localError || error}
            </div>
          )}

          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Full Name *</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={loading}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={loading}
            />
          </div>

          {/* Mobile Number */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Mobile Number *</label>
            <input
              type="tel"
              name="mobileno"
              placeholder="Enter 10-digit mobile number"
              value={formData.mobileno}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Password *</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password (min 6 characters)"
              value={formData.password}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={loading}
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-gray-600 mb-1">
              Confirm Password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={loading}
            />
          </div>

          {/* Sign Up Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-green-600 py-4 rounded-xl mb-4 text-white font-semibold text-lg hover:bg-green-700 active:opacity-70 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          {/* Footer */}
          <div className="flex justify-center">
            <span className="text-gray-500 mr-1">Already have an account?</span>
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold hover:underline"
              disabled={loading}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
