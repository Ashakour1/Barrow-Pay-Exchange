import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Swap = () => {
  const [swapData, setSwapData] = useState({
    from_wallet: "",
    to_wallet: "",
    swap_address: "",
    amount: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSwapData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSwap = async (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("userData"));
    const access = userData.access;

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
        navigate("/");
        setSwapData({
          from_wallet: "",
          to_wallet: "",
          swap_address: "",
          amount: "",
        });

        toast.success(responseData.message || "Swap successful");
      } else {
        throw new Error(responseData.message || "Swap failed");
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error:", error);
    }
  };

  return (
    <div className="mt-20 px-5">
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
    </div>
  );
};

export default Swap;
