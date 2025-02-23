import React, { useState } from "react";
import { University, Bitcoin, Copy } from "lucide-react";
import { toast } from "react-toastify";
import { FaCcVisa } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";

const Deposit = ({ closeModal, fetchBalance, pendingPayment }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [depositData, setDepositData] = useState({
    wallet_name: "",
    amount: "",
    phone_number: "",
  });

  const handlePaymentMethodChange = (event) => {
    const selectedMethod = event.target.value;
    setPaymentMethod(selectedMethod);
    setShowInstructions(true);
    setDepositData((prevData) => ({
      ...prevData,
      wallet_name: selectedMethod,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepositData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCopyUSSD = () => {
    const ussdCode = `*712*${depositData.phone_number}*${depositData.amount}#`;
    navigator.clipboard.writeText(ussdCode).then(() => {
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    });
  };

  const navigate = useNavigate();
  const handleDeposit = async (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("userData"));
    const access = userData.access;

    if (depositData.amount < 0) {
      toast.error("Amount cannot be negative");
      return;
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

      if (response.ok) {
        navigate("/");
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

  return (
    <div className="mt-20 px-5">
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
              <img
                src="evc-plus.png"
                className="text-3xl w-9 h-9 text-green-600 mb-2"
              />
              <input
                type="radio"
                name="wallet_name"
                value="evcplus"
                className="sr-only"
                onChange={handlePaymentMethodChange}
                required
              />
              <span className="text-sm text-primary-700">EVC PLUS</span>
            </label>
            <label className="flex flex-col items-center bg-primary-50 border border-green-600 rounded-lg p-4 cursor-pointer hover:border-primary-500 transition-colors">
              <img
                src="moneyGo.png"
                className="text-3xl w-7 h-7 text-green-600 mb-2"
              />
              <input
                type="radio"
                name="wallet_name"
                value="card"
                className="sr-only"
                onChange={handlePaymentMethodChange}
                required
              />
              <span className="text-sm text-primary-700">MONEYGO</span>
            </label>
            <label className="flex flex-col items-center bg-primary-50 border border-green-600 rounded-lg p-4 cursor-pointer hover:border-primary-500 transition-colors">
              <img
                src="golis.png"
                className="text-3xl w-7 h-7 text-green-600 mb-2"
              />
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
            <label className="flex flex-col items-center bg-primary-50 border border-green-600 rounded-lg p-4 cursor-pointer hover:border-primary-500 transition-colors">
              <img
                src="usdt.webp"
                className="text-3xl w-7 h-7 text-green-600 mb-2"
              />
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
            <label className="flex flex-col items-center bg-primary-50 border border-green-600 rounded-lg p-4 cursor-pointer hover:border-primary-500 transition-colors">
              <img
                src="premier-walltet.png"
                className="text-3xl w-10 h-10 text-green-600 mb-2"
              />
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
            <label className="flex flex-col items-center bg-primary-50 border border-green-600 rounded-lg p-4 cursor-pointer hover:border-primary-500 transition-colors">
              <img
                src="sahal.png"
                className="text-3xl w-7 h-7 text-green-600 mb-2"
              />
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
        {showInstructions && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
            <p>Please dial the USSD code below to complete your deposit</p>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                  *712*{depositData.phone_number}*{depositData.amount}#
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
        <div className="flex gap-4">
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-green-700 transition duration-300"
          >
            Deposit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Deposit;
