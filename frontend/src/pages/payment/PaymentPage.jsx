import React, { useContext, useState } from "react"
import apiInstance from "../../config/apiInstance"
import { toast } from "react-toastify"
import { usercontext } from "../../context/DataContext"
import { useNavigate } from "react-router-dom"

const PaymentPage = () => {
  const [selectedMethod, setSelectedMethod] = useState("")
  const { totalAmount, currency, addressId } = useContext(usercontext)
  const navigate = useNavigate()

  const amountToPay = totalAmount || localStorage.getItem("amountToPay")
  const currencyToPay =
    currency || localStorage.getItem("currencyToPay") || "INR"

  const address = addressId || localStorage.getItem("addressId")

  const orderHandler = async () => {
    try {
      await apiInstance.post("/order/create", {
        amountToPay,
        currencyToPay,
        selectedMethod,
        address,
      })
    } catch (error) {
      console.log("order error:", error)
    }
  }

  const handleCOD = async () => {
    await orderHandler()
    toast.success("Order placed successfully!")
    navigate("/orders")
  }

  const paymentHandler = async () => {
    try {
      const res = await apiInstance.post("/payment/process", {
        amount: amountToPay,
        currency: currencyToPay,
      })

      const options = {
        key: import.meta.env.VITE_RAZORPAY_API_KEY,
        amount: res.data.orders.amount,
        currency: res.data.orders.currency,
        name: "ShopMaster",
        description: "Order Payment",
        order_id: res.data.orders.id,
        handler: async function (response) {
          const verifyRes = await apiInstance.post("/payment/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          })

          if (verifyRes.data.payment?.status === "paid") {
            await orderHandler()
            toast.success("Payment Successful!")
            navigate("/orders")
          } else {
            toast.error("Payment verification failed.")
          }
        },
        theme: { color: "#2563eb" },
      }

      new window.Razorpay(options).open()
    } catch (error) {
      toast.error("Payment failed. Try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border p-8">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Complete Your Payment
        </h1>

        {/* ORDER SUMMARY */}
        <div className="bg-gray-50 rounded-xl p-5 mb-6 border">
          <h2 className="font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between text-gray-600 mb-2">
            <span>Subtotal</span>
            <span>{currencyToPay} {amountToPay}</span>
          </div>

          <div className="flex justify-between text-gray-600 mb-2">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-bold text-lg text-gray-900">
            <span>Total</span>
            <span>{currencyToPay} {amountToPay}</span>
          </div>
        </div>

        {/* PAYMENT OPTIONS */}
        <h2 className="font-semibold text-gray-800 mb-4">
          Select Payment Method
        </h2>

        {/* COD */}
        <div
          onClick={() => setSelectedMethod("COD")}
          className={`p-4 mb-4 rounded-xl border cursor-pointer transition ${
            selectedMethod === "COD"
              ? "border-blue-600 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          }`}
        >
          <div className="flex items-start gap-3">
            <input
              type="radio"
              checked={selectedMethod === "COD"}
              onChange={() => setSelectedMethod("COD")}
              className="mt-1"
            />
            <div>
              <p className="font-medium">Cash on Delivery</p>
              <p className="text-sm text-gray-600">
                Pay when your order is delivered.
              </p>
            </div>
          </div>
        </div>

        {/* ONLINE */}
        <div
          onClick={() => setSelectedMethod("ONLINE")}
          className={`p-4 rounded-xl border cursor-pointer transition ${
            selectedMethod === "ONLINE"
              ? "border-blue-600 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          }`}
        >
          <div className="flex items-start gap-3">
            <input
              type="radio"
              checked={selectedMethod === "ONLINE"}
              onChange={() => setSelectedMethod("ONLINE")}
              className="mt-1"
            />
            <div>
              <p className="font-medium">Online Payment</p>
              <p className="text-sm text-gray-600">
                UPI, Cards, Net Banking & Wallets.
              </p>
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <button
          disabled={!selectedMethod}
          onClick={() => {
            if (selectedMethod === "COD") handleCOD()
            else if (selectedMethod === "ONLINE") paymentHandler()
          }}
          className={`w-full mt-6 py-3 rounded-xl text-lg font-semibold transition ${
            selectedMethod
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {selectedMethod === "ONLINE"
            ? `Pay ${currencyToPay} ${amountToPay}`
            : "Place Order"}
        </button>

        <p className="text-xs text-gray-500 mt-6 text-center">
          Secure payments powered by Razorpay.
        </p>
      </div>
    </div>
  )
}

export default PaymentPage