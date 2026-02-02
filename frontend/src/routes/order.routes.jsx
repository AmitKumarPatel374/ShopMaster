import { Routes, Route } from "react-router-dom"

import OrderPage from "../pages/OrderPage"
import TrackOrder from "../pages/TrackOrder"
import AdminOrders from "../pages/AdminOrders"
import OrderUpdateForm from "../pages/OrderUpdateForm"

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
