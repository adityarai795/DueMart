import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (inputData.password !== inputData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      // API Call Example:
      // await signupService(inputData);

      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Check console.");
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          {/* Title */}
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Create Account on DueMart
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Sign up to get started
          </p>

          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={inputData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={inputData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={inputData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-gray-600 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={inputData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Sign Up Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 py-4 rounded-xl mb-4 text-white font-semibold text-lg hover:bg-green-700 active:opacity-70 transition"
          >
            Sign Up
          </button>

          {/* Footer */}
          <div className="flex justify-center">
            <span className="text-gray-500 mr-1">Already have an account?</span>
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold hover:underline"
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
