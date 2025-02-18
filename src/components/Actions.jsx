import { ArrowDown, ArrowUp } from "lucide-react";
import React, { useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
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

  const openDrawer = (action) => {
    setActiveAction(action);
  };

  const closeDrawer = () => {
    setActiveAction(null);
  };

  return (
    <section className="grid grid-cols-3 gap-4 mb-8">
      <button
        className="p-4 flex flex-col items-center justify-center group"
        onClick={() => openDrawer("Deposit")}
      >
        <div className="bg-green-100 p-3 rounded-full mb-2 group-hover:bg-green-200 transition duration-300">
          <ArrowDown className="text-green-600" size={24} />
        </div>
        <span className="text-sm font-medium text-green-800">Deposit</span>
      </button>
      <button
        className="p-4 flex flex-col items-center justify-center group"
        onClick={() => openDrawer("Withdraw")}
      >
        <div className="bg-green-100 p-3 rounded-full mb-2 group-hover:bg-green-200 transition duration-300">
          <ArrowUp className="text-green-600" size={24} />
        </div>
        <span className="text-sm font-medium text-green-800">Withdraw</span>
      </button>
      <button
        className="p-4 flex flex-col items-center justify-center group"
        onClick={() => openDrawer("Swap")}
      >
        <div className="bg-green-100 p-3 rounded-full mb-2 group-hover:bg-green-200 transition duration-300">
          <FaExchangeAlt className="text-green-600" size={24} />
        </div>
        <span className="text-sm font-medium text-green-800">Swap</span>
      </button>

      <Drawer isOpen={!!activeAction} onClose={closeDrawer}>
        <DrawerContent className="max-w-[600px] mx-auto rounded-t-3xl p-4">
          <DrawerHeader>
            <DrawerTitle className="text-start text-xl border-b pb-4 pt-2">
              {activeAction} Details
            </DrawerTitle>
            <DrawerClose onClick={closeDrawer} />
          </DrawerHeader>
          <DrawerDescription className="p-4">
            {activeAction === "Deposit" && (
              <div>
                <p>Deposit specific content goes here...</p>
              </div>
            )}
            {activeAction === "Withdraw" && (
              <div>
                <p>Withdraw specific content goes here...</p>
              </div>
            )}
            {activeAction === "Swap" && (
              <div>
                <p>Swap specific content goes here...</p>
              </div>
            )}
          </DrawerDescription>
          <DrawerFooter className="border-t pt-4">
            <button
              className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-primary-700 transition"
              onClick={closeDrawer}
            >
              Close
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </section>
  );
};

export default Actions;
