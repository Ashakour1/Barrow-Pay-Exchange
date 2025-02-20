import {
  ArrowDown,
  ArrowUp,
  Bitcoin,
  Copy,
  Phone,
  University,
} from "lucide-react";
import React, { useState } from "react";
import { FaCcVisa, FaExchangeAlt } from "react-icons/fa";
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

const Actions = () => {
  const [activeAction, setActiveAction] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const [depositData, setDepositData] = useState({
    wallet_name: "evcplus" || "card" || "crypto",
    amount: "",
  });

  const handlePaymentMethodChange = (event) => {
    const selectedMethod = event.target.value;
    setPaymentMethod(selectedMethod);
    setShowInstructions(true);

    setDepositData((prevData) => ({
      ...prevData,
      wallet_name: selectedMethod,
    }));

    console.log(selectedMethod);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepositData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const handleDeposit = async (e) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const access = userData.access_token;

    console.log(depositData);

    e.preventDefault();
    try {
      const response = await fetch("/api/deposit/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify(depositData),
      });

      console.log(response);
      const result = await response.json();
      console.log(result);

      // Display success message
      const successMessage = document.createElement("p");
      successMessage.textContent = "Deposit successfully";
      successMessage.className = "text-green-600 font-semibold mt-4";
      e.target.appendChild(successMessage);

      // Clear the form fields
      setDepositData({
        wallet_name: "",
        amount: "",
      });

      // Hide the message after a delay
      setTimeout(() => {
        e.target.removeChild(successMessage);
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault(); // Prevent form submission

    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData || !userData.access_token) {
      console.error("User not authenticated.");
      return;
    }
    const access = userData.access_token;

    const formData = new FormData(e.target);

    const amount = parseFloat(formData.get("amount")); // Convert to number
    const wallet_name = formData.get("wallet_name");
    const withdrawData = {
      wallet_name,
      amount,
    };

    if (!withdrawData.wallet_name || !withdrawData.amount) {
      console.error("Wallet name and amount are required for withdrawal.");
      return;
    }

    try {
      const response = await fetch("/api/payout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify(withdrawData),
      });

      if (!response.ok) {
        throw new Error("Withdrawal request failed");
      }

      const result = await response.json();
      console.log("Withdrawal successful:", result);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleSwap = async (e) => {
    e.preventDefault();
    const swapData = {
      from_wallet: e.target.from_wallet.value,
      to_wallet: e.target.to_wallet.value,
      amount: e.target.amount.value,
    };

    const userData = JSON.parse(localStorage.getItem("userData"));

    const access = userData.access_token;

    if (!access) {
      console.error("User not authenticated.");
      return;
    }

    try {
      const response = await fetch("/api/swap/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify(swapData),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="grid grid-cols-3 gap-4 mb-8">
      {["Deposit", "Withdraw", "Swap"].map((action) => (
        <Drawer key={action}>
          <DrawerTrigger asChild>
            <button
              className="p-4 flex flex-col items-center justify-center group"
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
                <>
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
                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-green-700 transition duration-300"
                    >
                      Deposit
                    </button>
                  </form>
                </>
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
                      <option value="evcplus">EVC PLUS</option>
                      <option value="card">MONEY GO</option>
                      <option value="crypto">GOLIS</option>
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
                <button className="w-full bg-gray-500 text-white py-4 rounded-lg hover:bg-gray-600 transition">
                  Close
                </button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </section>
  );
};

export default Actions;
