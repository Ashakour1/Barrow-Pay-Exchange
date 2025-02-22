// "use client"

// import { ArrowDown, ArrowUp, Bitcoin, University } from "lucide-react"
// import { useState } from "react"
// import { FaCcVisa, FaExchangeAlt } from "react-icons/fa"
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer"

// const Actions = () => {
 

//   return (
//     <section className="grid grid-cols-3 gap-4 mb-8">
//       {successMessage && (
//         <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50">
//           {successMessage}
//         </div>
//       )}
//       {errorMessage && (
//         <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
//           {errorMessage}
//         </div>
//       )}
//       {["Deposit", "Withdraw", "Swap"].map((action) => (
//         <Drawer key={action}>
//           <DrawerTrigger asChild>
//             <button
//               className="mt-4 p-4 flex flex-col items-center justify-center group"
//               onClick={() => setActiveAction(action)}
//             >
//               <div className="bg-green-100 p-3 rounded-full mb-2 group-hover:bg-green-200 transition duration-300">
//                 {action === "Deposit" && <ArrowDown className="text-green-600" size={24} />}
//                 {action === "Withdraw" && <ArrowUp className="text-green-600" size={24} />}
//                 {action === "Swap" && <FaExchangeAlt className="text-green-600" size={24} />}
//               </div>
//               <span className="text-sm font-medium text-green-800">{action}</span>
//             </button>
//           </DrawerTrigger>

//           <DrawerContent className="max-w-[600px] mx-auto rounded-t-3xl p-4">
//             <DrawerHeader>
//               <DrawerTitle className="text-start text-xl border-b pb-4 pt-2">{activeAction} Details</DrawerTitle>
//               <DrawerClose />
//             </DrawerHeader>
//             <DrawerDescription className="p-4">
//               {activeAction === "Deposit" && (
//                 <>
//                   <form onSubmit={handleDeposit}>
//                     <div className="mb-4">
//                       <label htmlFor="amount" className="block text-sm font-medium text-primary-700 mb-1">
//                         Amount
//                       </label>
//                       <div className="relative">
//                         <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-primary-500">$</span>
//                         <input
//                           type="number"
//                           id="amount"
//                           name="amount"
//                           value={depositData.amount}
//                           min="0"
//                           step="0.01"
//                           required
//                           className="block w-full pl-7 pr-12 py-2 border border-green-500 rounded-md focus:ring-primary-500 focus:border-primary-500"
//                           placeholder="0.00"
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="mb-4">
//                       <label htmlFor="phone_number" className="block text-sm font-medium text-primary-700 mb-1">
//                         Phone Number
//                       </label>
//                       <div className="relative">
//                         <input
//                           type="number"
//                           id="phone_number"
//                           name="phone_number"
//                           value={depositData.phone_number}
//                           min="0"
//                           step="0.01"
//                           required
//                           className="block w-full pl-2 pr-12 py-2 border border-green-500 rounded-md focus:ring-primary-500 focus:border-primary-500"
//                           placeholder="61635353"
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="mb-4">
//                       <label className="block text-sm font-medium text-primary-700 mb-2">Payment Method</label>
//                       <div className="grid grid-cols-3 gap-4">
//                         <label className="flex flex-col items-center bg-primary-50 border border-green-600 rounded-lg p-4 cursor-pointer hover:border-primary-500 transition-colors">
//                           <University className="text-3xl text-green-600 mb-2" />
//                           <input
//                             type="radio"
//                             name="wallet_name"
//                             value="evcplus"
//                             className="sr-only"
//                             onChange={handlePaymentMethodChange}
//                             required
//                           />
//                           <span className="text-sm text-primary-700">EVC PLUS</span>
//                         </label>
//                         <label className="flex flex-col items-center bg-primary-50 border border-green-600 rounded-lg p-4 cursor-pointer hover:border-primary-500 transition-colors">
//                           <FaCcVisa className="text-3xl text-green-600 mb-2" />
//                           <input
//                             type="radio"
//                             name="wallet_name"
//                             value="card"
//                             className="sr-only"
//                             onChange={handlePaymentMethodChange}
//                             required
//                           />
//                           <span className="text-sm text-primary-700">MONEYGO</span>
//                         </label>
//                         <label className="flex flex-col items-center bg-primary-50 border border-green-600 rounded-lg p-4 cursor-pointer hover:border-primary-500 transition-colors">
//                           <Bitcoin className="text-3xl text-green-600 mb-2" />
//                           <input
//                             type="radio"
//                             name="wallet_name"
//                             value="crypto"
//                             className="sr-only"
//                             onChange={handlePaymentMethodChange}
//                             required
//                           />
//                           <span className="text-sm text-green-700">GOLIS</span>
//                         </label>
//                       </div>
//                     </div>
//                     <button
//                       type="submit"
//                       className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-green-700 transition duration-300"
//                     >
//                       Deposit
//                     </button>
//                   </form>
//                 </>
//               )}
//               {activeAction === "Withdraw" && (
//                 <form id="withdrawForm" onSubmit={handleWithdraw}>
//                   <div className="mb-4">
//                     <label htmlFor="withdrawAmount" className="block text-sm font-medium text-green-700 mb-1">
//                       Amount
//                     </label>
//                     <div className="relative">
//                       <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-green-500">$</span>
//                       <input
//                         type="number"
//                         id="amount"
//                         name="amount"
//                         min="0"
//                         step="0.01"
//                         required
//                         className="block w-full pl-7 pr-12 py-2 border-green-300 rounded-md focus:ring-green-500 outline-green-500 focus:border-green-500"
//                         placeholder="0.00"
//                       />
//                     </div>
//                   </div>
//                   <div className="mb-4">
//                     <label htmlFor="withdrawMethod" className="block text-sm font-medium text-green-700 mb-1">
//                       Withdrawal Method
//                     </label>
//                     <select
//                       id="wallet_name"
//                       name="wallet_name"
//                       required
//                       className="block w-full py-2 px-3 border border-green-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                     >
//                       <option value="">Select a method</option>
//                       <option value="evcplus">EVC PLUS</option>
//                       <option value="card">MONEY GO</option>
//                       <option value="crypto">GOLIS</option>
//                     </select>
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-green-700 transition duration-300"
//                   >
//                     Withdraw
//                   </button>
//                 </form>
//               )}
//               {activeAction === "Swap" && (
//                 <form onSubmit={handleSwap}>
//                   <div className="mb-4">
//                     <label htmlFor="fromCurrency" className="block text-sm font-medium text-green-700 mb-1">
//                       From
//                     </label>
//                     <select
//                       id="from_wallet"
//                       name="from_wallet"
//                       required
//                       className="block w-full py-2 px-3 border border-green-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                     >
//                       <option value="">Select A wallet</option>
//                       <option value="evcplus">EVC PLUS</option>
//                     </select>
//                   </div>
//                   <div className="mb-4">
//                     <label htmlFor="toCurrency" className="block text-sm font-medium text-green-700 mb-1">
//                       To
//                     </label>
//                     <select
//                       id="to_wallet"
//                       name="to_wallet"
//                       required
//                       className="block w-full py-2 px-3 border border-green-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
//                     >
//                       <option value="">Select A wallet</option>
//                       <option value="usdt">USDT</option>
//                     </select>
//                   </div>
//                   <div className="mb-4">
//                     <label htmlFor="swapAmount" className="block text-sm font-medium text-green-700 mb-1">
//                       Amount
//                     </label>
//                     <input
//                       type="number"
//                       id="amount"
//                       name="amount"
//                       min="0"
//                       step="0.01"
//                       required
//                       className="block w-full py-2 px-3 border border-green-300 rounded-md focus:ring-green-500 focus:border-green-500"
//                       placeholder="0.00"
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-green-700 transition duration-300"
//                   >
//                     Swap
//                   </button>
//                 </form>
//               )}
//             </DrawerDescription>
//             <DrawerFooter className="border-t pt-4">
//               <DrawerClose asChild>
//                 <button className="w-full bg-gray-500 text-white py-4 rounded-lg hover:bg-gray-600 transition">
//                   Close
//                 </button>
//               </DrawerClose>
//             </DrawerFooter>
//           </DrawerContent>
//         </Drawer>
//       ))}
//     </section>
//   )
// }

// export default Actions

