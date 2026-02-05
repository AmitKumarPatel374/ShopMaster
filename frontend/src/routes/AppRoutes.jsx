import { Routes, Route } from "react-router-dom"

import AuthRoutes from "./auth.routes"
import UserRoutes from "./user.routes"
import ProductRoutes from "./product.routes"
import OrderRoutes from "./order.routes"
import AdminRoutes from "./admin.routes"
import About from "../pages/public/About"
import Home from "../pages/public/Home"
import PageNotFound from "../pages/common/PageNotFound"

// import Home from "../pages/Home"
// import About from "../pages/public/About"
// import PageNotFound from "../pages/common/PageNotFound"

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />

      {/* Modules */}
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/user/*" element={<UserRoutes />} />
      <Route path="/product/*" element={<ProductRoutes />} />
      <Route path="/orders/*" element={<OrderRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* Fallback */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default AppRoutes
