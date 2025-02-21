import { useAuth } from "../hooks/useUser";
import { Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Phone } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Label, Input, Button, Checkbox } from "../components/ui";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

const Login = () => {
  const [loginData, setLoginData] = useState({
    phone_number: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/auth/jwt/create/", {
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-green-500 ">
            Sign in
          </h2>
          <p className="text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className=" p-5 pl-10 "
                  value={loginData.phone_number}
                  onChange={(e) =>
                    setLoginData({
                      ...loginData,
                      phone_number: e.target.value.replace(/[^\d+\-\s()]/g, ""),
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={loginData.password}
                  placeholder="Enter your password"
                  className="p-5"
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-7 w-7"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className=" text-sm font-normal">
                Remember me for 30 days
              </Label>
            </div>
          </div>

          <Button
            type="submit"
            className=" bg-green-500 p-6 w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="ml-2">Signing in...</span>
              </div>
            ) : (
              <span>Sign in</span>
            )}
          </Button>

          <div className="text-center">
            <span className="text-muted-foreground text-sm">
              Don&apos;t have an account?{" "}
            </span>
            <Link
              to="/register"
              className="text-primary hover:underline underline-offset-4 inline-flex items-center text-sm"
            >
              Create an account
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
