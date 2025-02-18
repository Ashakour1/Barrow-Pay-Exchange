import React, { useState } from "react";
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
import { transactions } from "../../data/transaction";
const TransactionList = () => {
  const [modalData, setModalData] = useState(null);

 
  const OpenDrawer = (transaction) => {
    setModalData(transaction);
  };

  //   const closeModal = () => {
  //     setModalData(null);
  //   };

  return (
    <div className="bg-white text-primary-950">
      <Header />

      <main className="px-4 pt-20 pb-24">
        <section className="mb-8">
          <div className="space-y-4 bg">
            <Drawer>
              {transactions.map((transaction) => (
                <DrawerTrigger key={transaction.id} className="w-full">
                  <div
                    key={transaction.id}
                    on
                    className="flex items-center justify-between p-3 border border-primary-100 rounded-xl transition duration-300 cursor-pointer hover:bg-primary-50"
                    onClick={() => setModalData(transaction)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary-100 p-2 rounded-full">
                        <img
                          src={transaction.img}
                          className="w-18 "
                          alt="Transaction"
                        />
                      </div>
                      <div>
                        <p className="font-medium  text-primary-800">
                          {transaction.type}
                        </p>
                        <p className="text-xs text-start text-primary-500">
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                    <span className={`${transaction.color} font-medium`}>
                      {transaction.type === "Withdraw"
                        ? `-$${transaction.amount.toFixed(2)}`
                        : `+$${transaction.amount.toFixed(2)}`}
                    </span>
                  </div>
                </DrawerTrigger>
              ))}

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
                        <p className="font-medium text-lg">{modalData.id}</p>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-primary-800 text-lg font-semibold">
                          Type
                        </p>
                        <p className="font-medium  text-lg ">
                          {modalData.type}
                        </p>
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
                        <p className="font-medium text-lg ">{modalData.date}</p>
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TransactionList;
