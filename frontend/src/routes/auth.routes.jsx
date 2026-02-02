import { Routes, Route } from "react-router-dom"

import RegistrationForm from "../pages/RegistrationForm"
import LoginForm from "../pages/LoginForm"
import ForgotPassword from "../pages/ForgotPassword"
import VerifyContact from "../pages/VerifyContact"
import AddEmail from "../pages/AddEmail"
import VerifyFacebookEmail from "../pages/VerifyFacebookEmail"

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="register" element={<RegistrationForm />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="verify-otp" element={<VerifyContact />} />
      <Route path="add-email" element={<AddEmail />} />
      <Route path="verify-email" element={<VerifyFacebookEmail />} />
    </Routes>
  )
}

export default AuthRoutes
