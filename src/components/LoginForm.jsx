import { useAuth } from "@/hooks/useUser";
import { Lock, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    phone_number: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(loginData);

    try {
      const response = await fetch("/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      login(data);

      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="bg-green-100 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-600">Barrow Pay</h1>
          <p className="text-green-600 mt-2">
            Welcome back! Please login to your account.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-green-700 text-sm font-bold mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="w-5 h-5 text-green-700" />
              </span>
              <input
                className="appearance-none border bg-white border-green-300 rounded-lg w-full py-4 px-3 pl-10 text-primary-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                id="phone_number"
                type="text"
                placeholder="Enter your phone number"
                value={loginData.phone_number}
                onChange={(e) =>
                  setLoginData({ ...loginData, phone_number: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label
              className="block text-green-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="w-5 h-5 text-green-700" />
              </span>
              <input
                className="appearance-none bg-white border border-green-300 rounded-lg w-full py-3 px-3 pl-10 text-primary-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none transition duration-300"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="text-center text-primary-600 text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="font-bold hover:text-primary-700">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
