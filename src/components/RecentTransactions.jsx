import React, { useEffect, useState } from "react";
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

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="animate-pulse space-y-4">
    <div className="flex items-center justify-between p-3 border border-green-100 rounded-xl">
      <div className="flex items-center space-x-3">
        <div className="w-20 h-12 bg-gray-300 rounded"></div>
        <div className="space-y-2">
          <div className="w-32 h-4 bg-gray-300 rounded"></div>
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="w-24 h-6 bg-gray-300 rounded"></div>
    </div>
  </div>
);

const RecentTransactions = () => {
  const [modalData, setModalData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setUser(userData);
  }, []);

  const fetchTransactions = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const access = userData?.access;
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
      setIsLoading(false); // Stop loading when data is fetched
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false); // Stop loading even if there's an error
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-green-800">
        Recent Transactions
      </h2>

      <div className="space-y-4">
        {isLoading ? (
          // Render skeleton loader when loading
          <>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </>
        ) : (
          // Render actual transactions once loaded
          transactions.slice(0, 4).map((transaction) => (
            <Drawer key={transaction.id}>
              <DrawerTrigger className="w-full">
                <div
                  className="flex items-center justify-between p-3 border border-green-100 rounded-xl transition duration-300 cursor-pointer hover:bg-green-50"
                  onClick={() => setModalData(transaction)}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={
                        transaction.wallet === "evcplus"
                          ? "evc-plus.png"
                          : "/premier-wallet.png"
                      }
                      className="w-20"
                      alt="Transaction"
                    />

                    <div>
                      <p className="font-medium text-green-800">
                        {transaction.type}
                      </p>
                      <p className="text-xs text-green-500">
                        {transaction.created_at.slice(0, 10)}
                      </p>
                    </div>
                  </div>
                  <span className={`${transaction.color} font-medium`}>
                    {transaction.type === "Payout" ? (
                      <span className="text-red-500">
                        -${Math.abs(transaction.amount).toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-green-500">
                        +${Math.abs(transaction.amount).toFixed(2)}
                      </span>
                    )}
                  </span>
                </div>
              </DrawerTrigger>

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
                        <p className="text-green-800 text-lg font-semibold ">
                          Transaction ID
                        </p>
                        <p className="font-medium text-lg">
                          {modalData.transaction_id}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-green-800 text-lg font-semibold">
                          Type
                        </p>
                        <p className="font-medium text-lg ">{modalData.type}</p>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-green-800 text-lg font-semibold">
                          Amount
                        </p>
                        <p className="font-medium text-lg">
                          ${modalData.amount}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-green-800 text-lg font-semibold">
                          Date
                        </p>
                        <p className="font-medium text-lg ">
                          {modalData.created_at.slice(0, 10)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <p className="text-green-800 text-lg font-semibold">
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
                    </>
                  )}
                </DrawerDescription>
                <DrawerFooter className="border-t pt-4">
                  <DrawerClose>
                    <button className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-primary-700 transition">
                      Close
                    </button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ))
        )}
      </div>
    </section>
  );
};

export default RecentTransactions;
