import PageNotFound from "../pages/common/PageNotFound"
import AddEmail from "../pages/auth/AddEmail"
import ForgotPassword from "../pages/auth/ForgotPassword"
import LoginForm from "../pages/auth/LoginForm"
import RegistrationForm from "../pages/auth/RegistrationForm"
import VerifyContact from "../pages/auth/VerifyContact"
import VerifyFacebookEmail from "../pages/auth/VerifyFacebookEmail"
import { Routes, Route } from "react-router-dom"


const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="register" element={<RegistrationForm />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="verify-otp" element={<VerifyContact />} />
      <Route path="add-email" element={<AddEmail />} />
      <Route path="verify-email" element={<VerifyFacebookEmail />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default AuthRoutes
