import { useParams, useNavigate } from "react-router-dom"
import apiInstance from "../../config/apiInstance"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"

const OrderUpdateForm = () => {
  const { order_id } = useParams()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState(null)
  const [orderNotFound, setorderNotFound] = useState(false)

  const [formData, setFormData] = useState({
    orderStatus: "",
    currentLocation: "",
    paymentStatus: "",
  })

  // Fetch existing order
  const fetchOrder = async () => {
    try {
      const res = await apiInstance.get(`/order/admin/order/${order_id}`)
      const data = res.data.order[0]
      console.log(data);
      
      setOrder(data)
      console.log(order);
      
      if (!data) {
        setorderNotFound(true);
      }
      

      // Pre-fill form
      setFormData({
        orderStatus: data.orderStatus,
        currentLocation: data.tracking?.currentLocation || "",
        paymentStatus: data.paymentStatus,
      })

      setLoading(false)
    } catch (error) {
      setorderNotFound(true)
      setLoading(false)
      console.log("error fetching order", error)
    }
  }

  console.log(orderNotFound);
  

  useEffect(() => {
    fetchOrder()
  }, [])

  // UPDATE ORDER
  const updateOrder = async () => {
    try {
      const res = await apiInstance.put(`/order/admin/order/update/${order_id}`, formData)
      toast.success("Order updated successfully!")
      navigate("/orders/seller")
    } catch (err) {
      console.log("update error", err)
    }
  }

  if (loading) return <p className="p-10 text-gray-700">Loading...</p>

   if (orderNotFound) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-5 bg-gray-50">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
          alt="Unauthorized Access"
          className="w-40 h-40 object-contain opacity-90"
        />

        <h1 className="text-3xl font-bold text-gray-800 mt-6 text-center">Unauthorized Access</h1>

        <p className="text-gray-500 text-center mt-3 max-w-md leading-relaxed">
          You are not authorized to access this order or this order does not belong to your account.
        </p>

        <div className="flex gap-4 mt-8 flex-wrap justify-center">
          <button
            onClick={() => navigate("/")}
            className="
        px-6
        py-3
        bg-black
        text-white
        rounded-xl
        hover:bg-gray-800
        transition-all
      "
          >
            Go To Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="
        px-6
        py-3
        border
        border-gray-300
        rounded-xl
        hover:bg-gray-100
        transition-all
      "
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }


  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">📝 Update Order</h1>

        {/* ORDER SUMMARY */}
        <div className="bg-gray-50 p-4 border rounded-lg mb-6">
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p>
            <strong>User ID:</strong> {order.userId}
          </p>
          <p>
            <strong>Seller ID:</strong> {order.seller_id}
          </p>
          <p>
            <strong>Payment:</strong> {order.paymentStatus}
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-5">
          {/* ORDER STATUS */}
          <div>
            <label className="font-medium text-gray-700">Order Status</label>
            <select
              value={formData.orderStatus}
              onChange={(e) => setFormData({ ...formData, orderStatus: e.target.value })}
              className="w-full p-3 border rounded-lg mt-1"
            >
              <option>Order Placed</option>
              <option>Packed</option>
              <option>Shipped</option>
              <option>Out for Delivery</option>
              <option>Delivered</option>
            </select>
          </div>

          {/* CURRENT LOCATION */}
          <div>
            <label className="font-medium text-gray-700">Current Location</label>
            <input
              type="text"
              value={formData.currentLocation}
              onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
              className="w-full p-3 border rounded-lg mt-1"
              placeholder="Update location.."
            />
          </div>

          {/* PAYMENT STATUS */}
          <div>
            <label className="font-medium text-gray-700">Payment Status</label>
            <select
              value={formData.paymentStatus}
              onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
              className="w-full p-3 border rounded-lg mt-1"
            >
              <option>Paid</option>
              <option>Cash on delivery!</option>
            </select>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={updateOrder}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Update Order
          </button>

          <button
            onClick={() => navigate("/orders/seller")}
            className="w-full bg-gray-300 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderUpdateForm
