import React from "react"
import { useNavigate } from "react-router-dom"

const UnauthorizedPage = () => {

  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 bg-gray-50">

      <img
        src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
        alt="Unauthorized"
        className="w-40 h-40 object-contain opacity-90"
      />

      <h1 className="text-3xl font-bold text-gray-800 mt-6 text-center">
        Unauthorized Access
      </h1>

      <p className="text-gray-500 text-center mt-3 max-w-md leading-relaxed">
        You do not have permission to access this page.
      </p>

      <div className="flex gap-4 mt-8 flex-wrap justify-center">

        <button
          onClick={() => navigate("/")}
          className="
            px-6
            py-3
            bg-black
            text-white
            rounded-xl
            hover:bg-gray-800
            transition-all
          "
        >
          Go Home
        </button>

        <button
          onClick={() => navigate(-1)}
          className="
            px-6
            py-3
            border
            border-gray-300
            rounded-xl
            hover:bg-gray-100
            transition-all
          "
        >
          Go Back
        </button>

      </div>

    </div>
  )
}

export default UnauthorizedPage