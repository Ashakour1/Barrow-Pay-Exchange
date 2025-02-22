import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import {
  CreditCard,
  DollarSign,
  Phone,
  Mail,
  LogOut,
  User,
  IdCard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-24 w-24 bg-gray-300 rounded-full"></div>
    <div className="h-6 bg-gray-300 rounded w-1/3"></div>
    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
    <div className="h-6 bg-gray-300 rounded w-1/2"></div>
  </div>
);

export default function ProfilePage() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user details from the API
  const fetchUserDetails = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const access = userData?.access;
    if (!access) {
      navigate(`/?redirectTo=${location.pathname}`);
      return;
    }

    try {
      const response = await fetch("https://web-production-bcc7.up.railway.app/auth/users/me/", {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setUser(data); // Update the user state with fetched data
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchTransactions = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const access = userData?.access;
    if (!access) {
      navigate(`/?redirectTo=${location.pathname}`);
      return;
    }

    try {
      const cachedData = localStorage.getItem("transactions");
      if (cachedData) {
        setTransactions(JSON.parse(cachedData));
        setIsLoading(false);
      } else {
        const response = await fetch("https://web-production-bcc7.up.railway.app/api/transactions/", {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        localStorage.setItem("transactions", JSON.stringify(data)); // Cache the data
        setTransactions(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("userData");
    localStorage.removeItem("transactions");

    // Redirect to the login page
    navigate("/login");
  };

  useEffect(() => {
    fetchUserDetails(); // Fetch user details when the component mounts
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-background py-8 mt-10 px-4">
      <div className="w-full mx-auto space-y-6">
        {/* Profile Card */}
        <Card className="border border-green-500">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              {isLoading ? (
                <SkeletonLoader />
              ) : (
                <>
                  <Avatar className="w-24 h-24">
                    <AvatarImage
                      src="/placeholder.svg?height=96&width=96"
                      alt="User Avatar"
                    />
                    <AvatarFallback className="bg-green-500 text-5xl text-white">
                      {user?.full_name?.charAt(0) || "JD"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h1 className="text-2xl text-green-500 font-bold">
                      {user?.full_name || "John Doe"}
                    </h1>
                    <p className="text-muted-foreground">Verified</p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* User Info Card */}
        <Card className="border border-green-500">
          <CardContent className="pt-6">
            {isLoading ? (
              <SkeletonLoader />
            ) : (
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-green-500" />
                  <span>{user?.full_name || "john.doe@example.com"}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-5 w-5 text-green-500" />
                  <span>{user?.phone_number || "+1 (555) 123-4567"}</span>
                </div>

                {/* <div className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-green-500" />
                  <span>Visa •••• 4567</span>
                </div> */}
                {/* <div className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5 text-green-500" />
                  <span>Balance: $1,234.56</span>
                </div> */}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Transactions Card */}
        <Card className="border border-green-500">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold text-green-500 mb-4">
              Recent Transactions
            </h2>
            {isLoading ? (
              <SkeletonLoader />
            ) : (
              <div className="space-y-4">
                {transactions.slice(0, 3).map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p
                        className={`font-medium text-primary-800 ${
                          transaction.transaction_type === "Payout"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {transaction.type}
                      </p>
                      <p className="text-xs text-gray-500 text-start text-primary-500">
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      variant={transaction.amount > 0 ? "default" : "green"}
                      className={`font-medium ${
                        transaction.type === "Payout"
                          ? "text-red-500"
                          : "border bg-white  border-green-500 text-black text-sm"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : "-"}$
                      {Math.abs(transaction.amount).toFixed(2)}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button
          variant="outline"
          onClick={handleLogout}
          className="w-full border text-sm text-red-500 border-red-500 mt-4 flex justify-center items-center cursor-pointer"
        >
          <LogOut className="text-red-500  mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
