import PageNotFound from "../pages/common/PageNotFound"
import ViewAdminProducts from "../pages/admin/ViewAdminProducts"
import Cart from "../pages/order/Cart"
import PaymentPage from "../pages/payment/PaymentPage"
import CategoryBasedTopProduct from "../pages/product/CategoryBasedTopProduct"
import CreateProduct from "../pages/product/CreateProduct"
import FilterByItems from "../pages/product/FilterByItems"
import ProductItems from "../pages/product/ProductItems"
import SearchItem from "../pages/product/SearchItem"
import UpdateProduct from "../pages/product/UpdateProduct"
import ViewAllProducts from "../pages/product/ViewAllProducts"
import ViewProductDetail from "../pages/product/ViewProductDeatail"
import AddressForm from "../pages/user/AddressForm"
import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"

const ProductRoutes = () => {
  return (
    <Routes>
      <Route
        path="all"
        element={<ViewAllProducts />}
      />
      <Route
        path="create"
        element={
          <ProtectedRoute role ="seller">
            <CreateProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="detail/:product_id"
        element={<ViewProductDetail />}
      />

      <Route
        path="seller"
        element={<ViewAdminProducts />}
      />

      <Route
        path="cart"
        element={<Cart />}
      />
      <Route
        path="cart/address"
        element={<AddressForm />}
      />
      <Route
        path="cart/address/payment"
        element={<PaymentPage />}
      />

      <Route
        path="search/:searchValue"
        element={<SearchItem />}
      />
      <Route
        path=":category"
        element={<CategoryBasedTopProduct />}
      />
      <Route
        path=":category/:subCategory/:item"
        element={<ProductItems />}
      />
      <Route
        path="filter/:category/:subCategory/:item"
        element={<FilterByItems />}
      />

      <Route
        path="*"
        element={<PageNotFound />}
      />
    </Routes>
  )
}

export default ProductRoutes
