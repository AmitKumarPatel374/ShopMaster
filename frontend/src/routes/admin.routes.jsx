import AdminOrders from "../pages/admin/AdminOrders"
import ViewAdminProducts from "../pages/admin/ViewAdminProducts"
import ViewUsers from "../pages/admin/ViewUsers"
import OrderUpdateForm from "../pages/order/OrderUpdateForm"
import CreateProduct from "../pages/product/CreateProduct"
import UpdateProduct from "../pages/product/UpdateProduct"
import { Routes, Route } from "react-router-dom"

// import ViewUsers from "../pages/ViewUsers"
// import ViewAdminProducts from "../pages/ViewAdminProducts"
// import AdminOrders from "../pages/AdminOrders"
// import OrderUpdateForm from "../pages/OrderUpdateForm"
// import CreateProduct from "../pages/CreateProduct"
// import UpdateProduct from "../pages/UpdateProduct"

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Users */}
      <Route path="users" element={<ViewUsers />} />

      {/* Products */}
      <Route path="products" element={<ViewAdminProducts />} />
      <Route path="products/create" element={<CreateProduct />} />
      <Route path="products/update/:product_id" element={<UpdateProduct />} />

      {/* Orders */}
      <Route path="orders" element={<AdminOrders />} />
      <Route
        path="orders/update/:order_id"
        element={<OrderUpdateForm />}
      />
    </Routes>
  )
}

export default AdminRoutes
