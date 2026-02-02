import { Routes, Route } from "react-router-dom"

import ViewAllProducts from "../pages/ViewAllProducts"
import CreateProduct from "../pages/CreateProduct"
import UpdateProduct from "../pages/UpdateProduct"
import ViewProductDeatail from "../pages/ViewProductDeatail"
import ViewAdminProducts from "../pages/ViewAdminProducts"
import CategoryBasedTopProduct from "../pages/CategoryBasedTopProduct"
import ProductItems from "../pages/ProductItems"
import FilterByItems from "../pages/FilterByItems"
import SearchItem from "../pages/SearchItem"
import Cart from "../pages/Cart"
import AddressForm from "../pages/AddressForm"
import PaymentPage from "../pages/PaymentPage"

const ProductRoutes = () => {
  return (
    <Routes>
      <Route path="all" element={<ViewAllProducts />} />
      <Route path="create" element={<CreateProduct />} />
      <Route path="update/:product_id" element={<UpdateProduct />} />
      <Route path="detail/:product_id" element={<ViewProductDeatail />} />

      <Route path="seller" element={<ViewAdminProducts />} />

      <Route path="cart" element={<Cart />} />
      <Route path="cart/address" element={<AddressForm />} />
      <Route path="cart/address/payment" element={<PaymentPage />} />

      <Route path="search/:searchValue" element={<SearchItem />} />
      <Route path=":category" element={<CategoryBasedTopProduct />} />
      <Route path=":category/:subCategory/:item" element={<ProductItems />} />
      <Route
        path="filter/:category/:subCategory/:item"
        element={<FilterByItems />}
      />
    </Routes>
  )
}

export default ProductRoutes
