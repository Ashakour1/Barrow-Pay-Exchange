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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const WalletBalance = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeAction, setActiveAction] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [pendingBalance, setPendingPayment] = useState(null);
  const [depositData, setDepositData] = useState({
    wallet_name: "",
    amount: "",
    phone_number: "",
  });

  // Ref to access the drawer close button
  const drawerCloseRef = useRef(null);

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

      if (response.ok) {
        // Close the drawer
        if (drawerCloseRef.current) {
          drawerCloseRef.current.click();
        }

        fetchBalance();
        pendingPayment();
        // Set success message
        setSuccessMessage(responseData.message || "Deposit successful");

        // Clear the form fields
        setDepositData({
          wallet_name: "",
          amount: "",
          phone_number: "",
        });

        // Clear success message after delay
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        throw new Error(responseData.message || "Deposit failed");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
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

      if (response.ok) {
        // Close the drawer
        if (drawerCloseRef.current) {
          drawerCloseRef.current.click();
        }

        // Set success message
        setSuccessMessage("Withdrawal successful");

        fetchBalance();
        pendingPayment();
        // Clear success message after delay
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        throw new Error("Withdrawal failed");
      }
    } catch (error) {
      setErrorMessage(error.errors);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
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
      const response = await fetch("api/swap/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify(swapData),
      });

      if (response.ok) {
        // Close the drawer
        if (drawerCloseRef.current) {
          drawerCloseRef.current.click();
        }

        // Set success message
        setSuccessMessage("Swap successful");

        // Clear success message after delay
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        throw new Error("Swap failed");
      }
    } catch (error) {
      setErrorMessage("An error occurred during swap. Please try again.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
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

  // // Handle completing the deposit
  // const handleComplete = () => {
  //   if (drawerCloseRef.current) {
  //     drawerCloseRef.current.click();
  //   }
  //   setDepositData({
  //     wallet_name: "",
  //     amount: "",
  //     phone_number: "",
  //   });
  //   setSuccessMessage("Deposit completed successfully!");
  //   setTimeout(() => {
  //     setSuccessMessage("");
  //   }, 3000);
  // };

  return (
    <div>
      {/* Success and Error Messages */}
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          {errorMessage}
        </div>
      )}

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
              <div className="relative z-10">
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
              <div className="relative z-10">
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
        {["Deposit", "Withdraw", "Swap"].map((action) => (
          <Drawer key={action}>
            <DrawerTrigger asChild>
              <button
                className="mt-4 p-4 flex flex-col items-center justify-center group"
                onClick={() => setActiveAction(action)}
              >
                <div className="bg-green-100 p-3 rounded-full mb-2 group-hover:bg-green-200 transition duration-300">
                  {action === "Deposit" && (
                    <ArrowDown className="text-green-600" size={24} />
                  )}
                  {action === "Withdraw" && (
                    <ArrowUp className="text-green-600" size={24} />
                  )}
                  {action === "Swap" && (
                    <FaExchangeAlt className="text-green-600" size={24} />
                  )}
                </div>
                <span className="text-sm font-medium text-green-800">
                  {action}
                </span>
              </button>
            </DrawerTrigger>

            <DrawerContent className="max-w-[600px] mx-auto rounded-t-3xl p-4">
              <DrawerHeader>
                <DrawerTitle className="text-start text-xl border-b pb-4 pt-2">
                  {activeAction} Details
                </DrawerTitle>
                <DrawerClose />
              </DrawerHeader>
              <DrawerDescription className="p-4">
                {activeAction === "Deposit" && (
                  <form onSubmit={handleDeposit}>
                    <div className="mb-4">
                      <label
                        htmlFor="amount"
                        className="block text-sm font-medium text-primary-700 mb-1"
                      >
                        Amount
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-primary-500">
                          $
                        </span>
                        <input
                          type="number"
                          id="amount"
                          name="amount"
                          value={depositData.amount}
                          min="0"
                          step="0.01"
                          required
                          className="block w-full pl-7 pr-12 py-2 border border-green-500 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          placeholder="0.00"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="phone_number"
                        className="block text-sm font-medium text-primary-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          id="phone_number"
                          name="phone_number"
                          value={depositData.phone_number}
                          min="0"
                          step="0.01"
                          required
                          className="block w-full pl-2 pr-12 py-2 border border-green-500 rounded-md focus:ring-primary-500 focus:border-primary-500"
                          placeholder="61635353"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-primary-700 mb-2">
                        Payment Method
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        <label className="flex flex-col items-center bg-primary-50 border border-green-600 rounded-lg p-4 cursor-pointer hover:border-primary-500 transition-colors">
                          <University className="text-3xl text-green-600 mb-2" />
                          <input
                            type="radio"
                            name="wallet_name"
                            value="evcplus"
                            className="sr-only"
                            onChange={handlePaymentMethodChange}
                            required
                          />
                          <span className="text-sm text-primary-700">
                            EVC PLUS
                          </span>
                        </label>
                        <label className="flex flex-col items-center bg-primary-50 border border-green-600 rounded-lg p-4 cursor-pointer hover:border-primary-500 transition-colors">
                          <FaCcVisa className="text-3xl text-green-600 mb-2" />
                          <input
                            type="radio"
                            name="wallet_name"
                            value="card"
                            className="sr-only"
                            onChange={handlePaymentMethodChange}
                            required
                          />
                          <span className="text-sm text-primary-700">
                            MONEYGO
                          </span>
                        </label>
                        <label className="flex flex-col items-center bg-primary-50 border border-green-600 rounded-lg p-4 cursor-pointer hover:border-primary-500 transition-colors">
                          <Bitcoin className="text-3xl text-green-600 mb-2" />
                          <input
                            type="radio"
                            name="wallet_name"
                            value="crypto"
                            className="sr-only"
                            onChange={handlePaymentMethodChange}
                            required
                          />
                          <span className="text-sm text-green-700">GOLIS</span>
                        </label>
                      </div>
                    </div>

                    {/* Instructions Box */}
                    {showInstructions && (
                      <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
                        <p>
                          Please dial the USSD code below to complete your
                          deposit
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-700">
                            <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                              *712*{depositData.phone_number}*
                              {depositData.amount}#
                            </span>
                          </p>
                          <button
                            type="button"
                            onClick={handleCopyUSSD}
                            className="flex items-center text-sm text-green-600 hover:text-green-700"
                          >
                            <Copy className="w-4 h-4 mr-1" />
                            {copySuccess ? "Copied!" : "Copy"}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Deposit and Complete Buttons */}
                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-green-700 transition duration-300"
                      >
                        Deposit
                      </button>
                    </div>
                  </form>
                )}
                {activeAction === "Withdraw" && (
                  <form id="withdrawForm" onSubmit={handleWithdraw}>
                    <div className="mb-4">
                      <label
                        htmlFor="withdrawAmount"
                        className="block text-sm font-medium text-green-700 mb-1"
                      >
                        Amount
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-green-500">
                          $
                        </span>
                        <input
                          type="number"
                          id="amount"
                          name="amount"
                          min="0"
                          step="0.01"
                          required
                          className="block w-full pl-7 pr-12 py-2 border-green-300 rounded-md focus:ring-green-500 outline-green-500 focus:border-green-500"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="withdrawMethod"
                        className="block text-sm font-medium text-green-700 mb-1"
                      >
                        Withdrawal Method
                      </label>
                      <select
                        id="wallet_name"
                        name="wallet_name"
                        required
                        className="block w-full py-2 px-3 border border-green-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Select a method</option>
                        <option value="evcplus">📱 EVC Plus</option>
                        <option value="card">💳 MONEY GO</option>
                        <option value="crypto">₿ GOLIS</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-green-700 transition duration-300"
                    >
                      Withdraw
                    </button>
                  </form>
                )}
                {activeAction === "Swap" && (
                  <form onSubmit={handleSwap}>
                    <div className="mb-4">
                      <label
                        htmlFor="fromCurrency"
                        className="block text-sm font-medium text-green-700 mb-1"
                      >
                        From
                      </label>
                      <select
                        id="from_wallet"
                        name="from_wallet"
                        required
                        className="block w-full py-2 px-3 border border-green-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Select A wallet</option>
                        <option value="evcplus">EVC PLUS</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="toCurrency"
                        className="block text-sm font-medium text-green-700 mb-1"
                      >
                        To
                      </label>
                      <select
                        id="to_wallet"
                        name="to_wallet"
                        required
                        className="block w-full py-2 px-3 border border-green-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Select A wallet</option>
                        <option value="usdt">USDT</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="swapAddress"
                        className="block text-sm font-medium text-green-700 mb-1"
                      >
                        Swap Address
                      </label>
                      <input
                        type="text"
                        id="swap_address"
                        name="swap_address"
                        required
                        className="block w-full py-2 px-3 border border-green-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter swap address"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="swapAmount"
                        className="block text-sm font-medium text-green-700 mb-1"
                      >
                        Amount
                      </label>
                      <input
                        type="number"
                        id="amount"
                        name="amount"
                        min="0"
                        step="0.01"
                        required
                        className="block w-full py-2 px-3 border border-green-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        placeholder="0.00"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-green-700 transition duration-300"
                    >
                      Swap
                    </button>
                  </form>
                )}
              </DrawerDescription>
              <DrawerFooter className="border-t pt-4">
                <DrawerClose asChild>
                  <button
                    ref={drawerCloseRef} // Attach ref to the close button
                    className="w-full bg-gray-500 text-white py-4 rounded-lg hover:bg-gray-600 transition"
                  >
                    Close
                  </button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ))}
      </section>
    </div>
  );
};

export default WalletBalance;
