import { Card, CardContent } from "@/components/ui/card";
import { CircleDollarSign, Lock, Wallet, Copy } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { ArrowDown, ArrowUp, Bitcoin, University } from "lucide-react";
import {
  FaBitcoin,
  FaCcVisa,
  FaCreditCard,
  FaExchangeAlt,
  FaMobileAlt,
} from "react-icons/fa";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const WalletBalance = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeAction, setActiveAction] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [pendingBalance, setPendingPayment] = useState(null);
  const [depositData, setDepositData] = useState({
    wallet_name: "",
    amount: "",
    phone_number: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (action) => {
    setActiveAction(action);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Fetch balance from the API
  const fetchBalance = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const access = userData.access;
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

  // Fetch pending payments from the API
  const pendingPayment = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const access = userData.access;
    try {
      const response = await fetch("/api/pending-payments/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPendingPayment(data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  // Fetch balance and pending payments on component mount
  useEffect(() => {
    pendingPayment();
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

  // Show skeleton loader while loading
  if (loading) {
    return renderSkeleton();
  }

  // Handle payment method change
  const handlePaymentMethodChange = (event) => {
    const selectedMethod = event.target.value;
    setPaymentMethod(selectedMethod);
    setShowInstructions(true);

    setDepositData((prevData) => ({
      ...prevData,
      wallet_name: selectedMethod,
    }));
  };

  // Handle input change for deposit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepositData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle deposit submission
  const handleDeposit = async (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("userData"));
    const access = userData.access;

    if (depositData.amount < 0) {
      toast.error("Amount cannot be negative");
    }

    try {
      const response = await fetch("/api/deposit/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify(depositData),
      });

      const responseData = await response.json();

      console.log(responseData.message);

      if (response.ok) {
        closeModal();
        fetchBalance();
        pendingPayment();
        toast.success(responseData.message);

        setDepositData({
          wallet_name: "",
          amount: "",
          phone_number: "",
        });
      } else {
        throw new Error(responseData.message || "Deposit failed");
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error:", error);
    }
  };

  // Handle withdrawal submission
  const handleWithdraw = async (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("userData"));
    const access = userData.access;

    const formData = new FormData(e.target);
    const withdrawData = {
      wallet_name: formData.get("wallet_name"),
      amount: Number.parseFloat(formData.get("amount")),
    };

    try {
      const response = await fetch("/api/payout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify(withdrawData),
      });

      const responseData = await response.json();

      if (response.ok) {
        closeModal();
        toast.success(responseData.message || "Withdrawal successful");
        fetchBalance();
        pendingPayment();
      } else {
        throw new Error(responseData.message || "Withdrawal failed");
      }
    } catch (error) {
      toast.error(error.errors);
      console.error("Error:", error);
    }
  };

  // Handle swap submission
  const handleSwap = async (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("userData"));
    const access = userData.access;

    const swapData = {
      from_wallet: e.target.from_wallet.value,
      to_wallet: e.target.to_wallet.value,
      amount: e.target.amount.value,
      swap_address: e.target.swap_address.value,
    };

    try {
      const response = await fetch("/api/swap/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify(swapData),
      });

      const responseData = await response.json();

      if (response.ok) {
        closeModal();
        toast.success(responseData.message || "Swap successful");
      } else {
        throw new Error(responseData.message || "Swap failed");
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error:", error);
    }
  };

  // Handle copying USSD code to clipboard
  const handleCopyUSSD = () => {
    const ussdCode = `*712*${depositData.phone_number}*${depositData.amount}#`;
    navigator.clipboard.writeText(ussdCode).then(() => {
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    });
  };

  return (
    <div>
      <ToastContainer />
      {/* Wallet Balance Card */}
      <Card className="w-full border-green-500 overflow-hidden bg-gradient-to-br bg-green-700 text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Wallet className="text-white w-7 h-7" />
            <h2 className="text-xl font-medium">Total Balance</h2>
          </div>

          <div className="mb-8">
            <div className="text-5xl font-bold">
              ${balance?.evcplus.toFixed(2) ?? "0.0"}
            </div>
            <div className="text-sm text-white mt-1">Total Balance</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 text-black dark:from-emerald-950/40 dark:to-teal-950/40 p-4 border border-emerald-100/50 dark:border-emerald-800/50">
              <div className="relative ">
                <Lock className="w-4 h-4 mb-3 text-emerald-600 dark:text-emerald-400" />
                <div className="text-xl font-semibold">
                  ${pendingBalance?.total_pending_balance ?? "0.0"}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Pending Money
                </div>
              </div>
              <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-emerald-100 to-transparent dark:from-emerald-900/20 rounded-full blur-3xl -mr-12 -mt-12" />
            </div>

            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 text-black dark:from-blue-950/40 dark:to-indigo-950/40 p-4 border border-blue-100/50 dark:border-blue-800/50">
              <div className="relative ">
                <CircleDollarSign className="w-4 h-4 mb-3 text-blue-600 dark:text-blue-400" />
                <div className="text-xl font-semibold">
                  ${balance?.evcplus.toFixed(2) ?? "0.0"}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Available
                </div>
              </div>
              <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-transparent dark:from-blue-900/20 rounded-full blur-3xl -mr-12 -mt-12" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions Section */}
      <section className="grid grid-cols-3 gap-4 mb-8">
        <Link
          to="/deposit"
          className="mt-4 p-4 flex flex-col items-center justify-center group"
        >
          <div className="bg-green-100 p-3 rounded-full mb-2 group-hover:bg-green-200 transition duration-300">
            <ArrowDown className="text-green-600" size={24} />
          </div>
          <span className="text-sm font-medium text-green-800">Deposit</span>
        </Link>
        <Link
          to="/withdraw"
          className="mt-4 p-4 flex flex-col items-center justify-center group"
        >
          <div className="bg-green-100 p-3 rounded-full mb-2 group-hover:bg-green-200 transition duration-300">
            <ArrowUp className="text-green-600" size={24} />
          </div>
          <span className="text-sm font-medium text-green-800">Withdraw</span>
        </Link>
        <Link
          to="/swap"
          className="mt-4 p-4 flex flex-col items-center justify-center group"
        >
          <div className="bg-green-100 p-3 rounded-full mb-2 group-hover:bg-green-200 transition duration-300">
            <FaExchangeAlt className="text-green-600" size={24} />
          </div>
          <span className="text-sm font-medium text-green-800">Swap</span>
        </Link>
      </section>

      {/* Modal */}
    </div>
  );
};

export default WalletBalance;
