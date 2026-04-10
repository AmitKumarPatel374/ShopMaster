import PageNotFound from "../pages/common/PageNotFound"
import AdminOrders from "../pages/admin/AdminOrders"
import ViewAdminProducts from "../pages/admin/ViewAdminProducts"
import ViewUsers from "../pages/admin/ViewUsers"
import OrderUpdateForm from "../pages/order/OrderUpdateForm"
import CreateProduct from "../pages/product/CreateProduct"
import UpdateProduct from "../pages/product/UpdateProduct"
import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Users */}
      <Route
        path="users"
        element={<ViewUsers />}
      />

      {/* Products */}
      <Route
        path="products"
        element={
          <ProtectedRoute role="seller">
            <ViewAdminProducts />
          </ProtectedRoute>
        }
      />
      <Route
        path="products/update/:product_id"
        element={
          <ProtectedRoute role="seller">
            <UpdateProduct />
          </ProtectedRoute>
        }
      />

      {/* Orders */}
      <Route
        path="orders"
        element={
          <ProtectedRoute role="seller">
            <AdminOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="orders/update/:order_id"
        element={
          <ProtectedRoute role="seller">
            <OrderUpdateForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={<PageNotFound />}
      />
    </Routes>
  )
}

export default AdminRoutes
