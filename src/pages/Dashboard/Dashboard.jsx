import Actions from "@/components/Actions";
import RecentTransactions from "@/components/RecentTransactions";
import { ArrowDown, ArrowUp, Lock } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import WalletBalance from "./WalletBalance";

const Dashboard = () => {
  return (
    <main className="px-4 pt-20 pb-24">
      {/* Wallet Balance */}
      <WalletBalance />
      
      <Actions />

      {/* Recent Transactions */}
      <RecentTransactions />
    </main>
  );
};

export default Dashboard;
