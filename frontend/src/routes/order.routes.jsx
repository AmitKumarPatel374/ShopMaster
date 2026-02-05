import AdminOrders from "../pages/admin/AdminOrders"
import OrderPage from "../pages/order/OrderPage"
import OrderUpdateForm from "../pages/order/OrderUpdateForm"
import TrackOrder from "../pages/order/TrackOrder"
import { Routes, Route } from "react-router-dom"


const OrderRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<OrderPage />} />
      <Route path="track/:order_id" element={<TrackOrder />} />

      {/* Seller */}
      <Route path="seller" element={<AdminOrders />} />
      <Route
        path="seller/update/:order_id"
        element={<OrderUpdateForm />}
      />
    </Routes>
  )
}

export default OrderRoutes
