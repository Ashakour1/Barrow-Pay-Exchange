import RecentTransactions from "@/components/RecentTransactions";
import WalletBalance from "./WalletBalance";

const Dashboard = () => {
  return (
    <main className="px-4 pt-20 pb-24">
      {/* Wallet Balance */}
      <WalletBalance />

      {/* Recent Transactions */}
      <RecentTransactions />

      {/* WhatsApp Floating Button */}
    </main>
  );
};

export default Dashboard;
