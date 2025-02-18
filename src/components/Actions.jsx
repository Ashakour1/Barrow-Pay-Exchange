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
  const [copySuccess, setCopySuccess] = useState(false); // State for copy success message

  const [depositData, setDepositData] = useState({
    depositAmount: "",
    phoneNumber: "",
    depositMethod: "",
  });

  const handlePaymentMethodChange = (event) => {
    const selectedMethod = event.target.value;
    setPaymentMethod(selectedMethod);
    setShowInstructions(true); // Show instructions when a payment method is selected
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepositData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function handleCopy(text, e) {
    // e.preventDefault();


    console.log(text);
    // navigator.clipboard.writeText(text).then(() => {
    //   setCopySuccess(true);
    //   setTimeout(() => setCopySuccess(false), 2000);
    // });
  }

  const HandlePay = (e) => {
    e.preventDefault();

    if (depositData.phoneNumber) {
      window.location.href = `tel:*712*${depositData.phoneNumber}*${depositData.depositAmount}#`;
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
                  <form>
                    <div className="mb-4">
                      <label
                        htmlFor="depositAmount"
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
                          id="depositAmount"
                          name="depositAmount"
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
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium text-primary-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-green-500 text-sm ">
                          <Phone className="" />
                        </span>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          required
                          className="w-full pl-10 pr-12 py-2 border border-green-500 rounded-md focus:ring-green-500 focus:border-green-500"
                          placeholder="Enter your phone number"
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
                            name="depositMethod"
                            value="bank"
                            className="sr-only  "
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
                            name="depositMethod"
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
                            name="depositMethod"
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
                    {showInstructions && (
                      <div
                        id="paymentInstructions"
                        className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4"
                      >
                        <h3 className="text-lg font-semibold text-green-800 mb-2">
                          To finish deposit, please follow the payment
                          instructions:
                        </h3>
                        <div className="flex items-center justify-between bg-white p-3 rounded-md">
                          <span className="text-green-700 font-medium">
                            *712*{depositData.phoneNumber}*
                            {depositData.depositAmount}#
                          </span>
                          <button
                            onClick={() =>
                              handleCopy(
                                `*712*${depositData.phoneNumber}*${depositData.depositAmount}#`
                              )
                            }
                            className="text-green-600 hover:text-green-800"
                          >
                            <Copy className="w-5" />
                          </button>
                        </div>
                        {copySuccess && (
                          <div className="mt-2 text-green-500 text-sm">
                            Copied to clipboard!
                          </div>
                        )}
                        <div className="mt-4 flex justify-between">
                          <button
                            type=""
                            onClick={HandlePay}
                            className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                          >
                            Dir Lacagta
                          </button>
                          <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">
                            Complete
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </>
              )}
              {activeAction === "Withdraw" && (
                <form id="withdrawForm">
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
                        id="withdrawAmount"
                        name="withdrawAmount"
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
                      id="withdrawMethod"
                      name="withdrawMethod"
                      required
                      className="block w-full py-2 px-3 border border-green-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select a method</option>
                      <option value="bank">EVC PLUS</option>
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
                <form onsubmit="handleSwap(event)">
                  <div class="mb-4">
                    <label
                      for="fromCurrency"
                      class="block text-sm font-medium text-green-700 mb-1"
                    >
                      From
                    </label>
                    <select
                      id="fromCurrency"
                      name="fromCurrency"
                      required
                      class="block w-full py-2 px-3 border border-green-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="USD">USD</option>
                    </select>
                  </div>
                  <div class="mb-4">
                    <label
                      for="toCurrency"
                      class="block text-sm font-medium text-green-700 mb-1"
                    >
                      To
                    </label>
                    <select
                      id="toCurrency"
                      name="toCurrency"
                      required
                      class="block w-full py-2 px-3 border border-green-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="USDT">USDT</option>
                    </select>
                  </div>
                  <div class="mb-4">
                    <label
                      for="swapAmount"
                      class="block text-sm font-medium text-green-700 mb-1"
                    >
                      Amount
                    </label>
                    <input
                      type="number"
                      id="swapAmount"
                      name="swapAmount"
                      min="0"
                      step="0.01"
                      required
                      class="block w-full py-2 px-3 border border-green-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      placeholder="0.00"
                    />
                  </div>
                  <button
                    type="submit"
                    class="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-green-700 transition duration-300"
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
