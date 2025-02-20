import Actions from "@/components/Actions";
import RecentTransactions from "@/components/RecentTransactions";
import { ArrowDown, ArrowUp, Lock } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";

const Dashboard = () => {
  const [balance, setBalance] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBalance = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const access = userData.access_token;
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

  return (
    <main className="px-4 pt-20 pb-24">
      {/* Wallet Balance */}
      <section className="mb-8 bg-green-800 rounded-2xl p-6 shadow-lg text-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Total Balance</h2>
            <p className="text-4xl font-bold text-white">${balance.evcplus}</p>
          </div>
          <button className="text-white hover:text-green-200 transition duration-300">
            <i className="fas fa-ellipsis-v"></i>
          </button>
        </div>
        {/* <div className="flex justify-between items-center mb-4">
          <span className="text-green-300 flex items-center text-sm font-medium">
            <i className="fas fa-arrow-up mr-1"></i>
            +2.5% from last week
          </span>
          <span className="text-green-200 flex items-center text-sm">
            <Lock className="mr-1" size={16} />
            Updated 2 min ago
          </span>
        </div> */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-white bg-opacity-10 rounded-xl p-3">
            <p className="text-xs text-green-400 mb-1">Available</p>
            <p className="text-lg font-semibold text-green-500">$0.00</p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-xl p-3">
            <p className="text-xs text-green-400 mb-1">Locked</p>
            <p className="text-lg font-semibold text-green-500">$0.00</p>
          </div>
        </div>
      </section>
      {/* Actions */}

      <Actions />

      {/* Recent Transactions */}
      <RecentTransactions />
    </main>
  );
};

export default Dashboard;
