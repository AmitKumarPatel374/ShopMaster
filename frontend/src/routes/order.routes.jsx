import PageNotFound from "../pages/common/PageNotFound"
import AdminOrders from "../pages/admin/AdminOrders"
import OrderPage from "../pages/order/OrderPage"
import OrderUpdateForm from "../pages/order/OrderUpdateForm"
import TrackOrder from "../pages/order/TrackOrder"
import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"


const OrderRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<OrderPage />} />
      <Route path="track/:order_id" element={<TrackOrder />} />

      {/* Seller */}
      <Route path="seller" element={<ProtectedRoute role="seller"><AdminOrders /></ProtectedRoute>} />
      <Route
        path="seller/update/:order_id"
        element={<ProtectedRoute role="seller"><OrderUpdateForm /></ProtectedRoute>}
      />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default OrderRoutes
