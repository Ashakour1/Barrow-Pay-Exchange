import { Lock, User, User2 } from "lucide-react";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="bg-green-100 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-600">FinTech 2025</h1>
          <p className="text-green-600 mt-2 ">
            Welcome back! Please login to your account.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-green-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="w-5 h-5 text-green-700" />
              </span>
              <input
                className="appearance-none border bg-white border-green-300 rounded-lg w-full py-4 px-3 pl-10 text-primary-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                className="appearance-none bg-white border border-green-3000 rounded-lg w-full py-3 px-3 pl-10 text-primary-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          <a href="#" className="font-bold hover:text-primary-700">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
