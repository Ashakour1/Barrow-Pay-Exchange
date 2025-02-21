import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";

const WalletBalance = () => {
  const [balance, setBalance] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBalance = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const access = userData.access;
    if (!access) {
      navigate(`/?redirectTo=${location.pathname}`);
    }
    try {
      const response = await fetch("/api/balance/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setBalance(data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
    const interval = setInterval(fetchBalance, 60000); // Refresh every 1 minute
    return () => clearInterval(interval);
  }, []);

  // Skeleton loader component
  const renderSkeleton = () => (
    <div className="space-y-6">
      <div className="bg-gray-300 w-40 h-4 rounded-md animate-pulse"></div>
      <div className="flex items-baseline gap-0.5">
        <div className="bg-gray-300 w-8 h-8 rounded-full animate-pulse"></div>
        <div className="bg-gray-300 w-28 h-10 rounded-md animate-pulse"></div>
        <div className="bg-gray-300 w-14 h-6 rounded-md animate-pulse"></div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full">
      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-green-500/20 via-green-500/40 to-green-500/20 blur-xl" />
      <Card className="relative overflow-hidden backdrop-blur-sm border-green-500/10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-green-500/10 rounded-full -translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-500/10 rounded-full translate-x-16 translate-y-16" />
        <div className="relative px-8 py-10">
          {loading ? (
            renderSkeleton() // Show skeleton loader while loading
          ) : (
            <div className="space-y-6">
              <div className="text-sm font-medium text-green-600 dark:text-green-400">
                Current Balance
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-2xl font-medium text-green-600 dark:text-green-400">
                  $
                </span>
                <span className="text-5xl font-bold tracking-tight text-green-500">
                  {balance.evcplus}
                </span>
                <span className="text-xl font-medium text-green-500/70">
                  .00
                </span>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default WalletBalance;
