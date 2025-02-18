import React, { useState } from "react";
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
import { transactions } from "@/data/transaction";

const RecentTransactions = () => {
    const [modalData, setModalData] = useState(null);

    return (
        <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-green-800">
                Recent Transactions
            </h2>
            <div className="space-y-4">
                {transactions.slice(0, 2).map((transaction) => (
                    <Drawer key={transaction.id}>
                        <DrawerTrigger className="w-full">
                            <div
                                className="flex items-center justify-between p-3 border border-green-100 rounded-xl transition duration-300 cursor-pointer hover:bg-green-50"
                                onClick={() => setModalData(transaction)}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="bg-green-100 p-2 rounded-full">
                                        <img
                                            src={transaction.img}
                                            className="w-8"
                                            alt="Transaction"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium text-green-800">
                                            {transaction.type}
                                        </p>
                                        <p className="text-xs text-green-500">{transaction.date}</p>
                                    </div>
                                </div>
                                <span className={`${transaction.color} font-medium`}>
                                    {transaction.amount}
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
                                            <p className="font-medium text-lg">{modalData.id}</p>
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
                                            <p className="font-medium text-lg ">{modalData.date}</p>
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
                ))}
            </div>
        </section>
    );
};

export default RecentTransactions;
