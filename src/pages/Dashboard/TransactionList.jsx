import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
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
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const TransactionList = () => {
  const [modalData, setModalData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(transactions);

  const OpenDrawer = (transaction) => {
    setModalData(transaction);
  };

  const handleRecheck = () => {
    console.log("Rechecking...");
    // Add your recheck logic here
  };

  const navigate = useNavigate();

  const fetchTransactions = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const access = userData.access;
    // if (!access) {
    //   navigate(`/?redirectTo=${location.pathname}`);
    //   return;
    // }
    try {
      const response = await fetch(
        "https://web-production-bcc7.up.railway.app/api/transactions/",
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTransactions(data);
      setLoading(false); // Set loading to false once the data is fetched
    } catch (error) {
      console.error("Error:", error);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const renderSkeleton = () => (
    <div className="flex items-center justify-between p-3 border border-primary-100 rounded-xl">
      <div className="flex items-center space-x-3">
        <div className="bg-primary-100 p-2 border rounded-xl animate-pulse">
          <div className="bg-gray-300 w-18 h-18 rounded-xl"></div>
        </div>
        <div className="space-y-2">
          <div className="bg-gray-300 w-24 h-4 rounded-md animate-pulse"></div>
          <div className="bg-gray-300 w-16 h-4 rounded-md animate-pulse"></div>
        </div>
      </div>
      <div className="bg-gray-300 w-24 h-6 rounded-md animate-pulse"></div>
    </div>
  );

  return (
    <div className="bg-white text-primary-950">
      <Header />

      <main className="px-4 pt-20 pb-24">
        <section className="mb-8">
          <div className="space-y-4">
            <Drawer>
              {loading ? (
                // Display skeletons if loading
                Array(5)
                  .fill()
                  .map((_, index) => <div key={index}>{renderSkeleton()}</div>)
              ) : transactions.length === 0 ? (
                <p>No transactions available</p>
              ) : (
                transactions.map((transaction) => (
                  <DrawerTrigger
                    key={transaction.transaction_id}
                    className="w-full"
                  >
                    <div
                      key={transaction.transaction_id}
                      className="flex items-center justify-between p-3 border border-primary-100 rounded-xl transition duration-300 cursor-pointer hover:bg-primary-50"
                      onClick={() => setModalData(transaction)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-primary-100 p-2 border rounded-xl">
                          <img
                            src={
                              transaction.wallet === "evcplus"
                                ? "evc-plus.png"
                                : "/premier-wallet.png"
                            }
                            className="w-18"
                            alt="Transaction"
                          />
                        </div>
                        <div>
                          <p
                            className={`font-medium text-start text-primary-800 ${
                              transaction.type === "Deposit"
                                ? "text-green-600"
                                : transaction.type === "Payout"
                                ? "text-red-500"
                                : transaction.type === "Swap"
                                ? "text-yellow-500"
                                : null
                            }`}
                          >
                            {transaction.type}
                          </p>
                          <p className="text-xs text-gray-500 text-start text-primary-500">
                            {new Date(
                              transaction.created_at
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`${
                          transaction.type === "Deposit"
                            ? "text-green-600"
                            : transaction.type === "Payout" ||
                              transaction.type === "Swap"
                            ? "text-red-500"
                            : "text-yellow-500"
                        } font-medium`}
                      >
                        {transaction.type === "Payout" ||
                        transaction.type === "Swap"
                          ? `-$${transaction.amount.toFixed(2)}`
                          : `+$${transaction.amount.toFixed(2)}`}
                      </span>
                    </div>
                  </DrawerTrigger>
                ))
              )}

              <DrawerContent className="max-w-[600px] mx-auto rounded-t-3xl p-4">
                <DrawerHeader>
                  <DrawerTitle className="text-start text-xl border-b pb-4 pt-2">
                    Transaction Details
                  </DrawerTitle>
                  <DrawerClose />
                </DrawerHeader>
                <DrawerDescription className="p-4">
                  {modalData && (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-primary-800 text-lg font-semibold ">
                          Transaction ID
                        </p>
                        <p className="font-medium text-lg">
                          {modalData.transaction_id}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-primary-800 text-lg font-semibold">
                          Type
                        </p>
                        <p className="font-medium text-lg ">{modalData.type}</p>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-primary-800 text-lg font-semibold">
                          Amount
                        </p>
                        <p className="font-medium text-lg">
                          ${modalData.amount}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-primary-800 text-lg font-semibold">
                          Date
                        </p>
                        <p className="font-medium text-lg ">
                          {new Date(modalData.created_at).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <p className="text-primary-800 text-lg font-semibold">
                          Status
                        </p>
                        <p className="text-lg font-semibold">
                          {modalData.status === "Completed" ? (
                            <span className="bg-green-100 font-semibold text-green-800 px-2 py-1 rounded-full text-lg">
                              Completed
                            </span>
                          ) : modalData.status === "Rejected" ? (
                            <span className="bg-red-100 font-semibold text-red-800 px-2 py-1 rounded-full text-lg">
                              Rejected
                            </span>
                          ) : (
                            <span className="bg-red-100 font-semibold text-yellow-800 px-2 py-1 rounded-full text-lg">
                              Pending
                            </span>
                          )}
                        </p>
                      </div>

                      {modalData.type === "Deposit" &&
                      modalData.status === "Pending" ? (
                        <Button
                          onClick={handleRecheck}
                          className="w-full rounded-full bg-red-500 border border-red-500 text-white  flex items-center space-x-2 px-4  text-sm sm:text-base my-2 py-5"
                        >
                          <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
                          <span>Recheck</span>
                        </Button>
                      ) : null}
                    </>
                  )}
                </DrawerDescription>
                <DrawerFooter className="border-t pt-4">
                  <DrawerClose>
                    <button className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-primary-700 transition">
                      Close
                    </button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TransactionList;
