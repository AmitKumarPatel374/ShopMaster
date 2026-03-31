import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import { usercontext } from "../context/DataContext"

const ProtectedRoute = ({ children, role }) => {

  const {
    token,
    role: userRole,
    authLoading
  } = useContext(usercontext)

  // auth checking
  if (authLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-xl font-semibold text-gray-700">
          Loading...
        </h1>
      </div>
    )
  }

  // not logged in
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // role restriction
  if (role && role !== userRole) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}

export default ProtectedRoute