import React from "react";
import { toast } from "react-hot-toast";

const Withdraw = ({ closeModal, fetchBalance, pendingPayment }) => {
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
        toast.success(responseData.message);
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error:", error);
    }
  };

  return (
    <div className="mt-20 px-5">
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
    </div>
  );
};

export default Withdraw;
