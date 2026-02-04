// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        {/* Error Code */}
        <h1 className="text-7xl font-extrabold text-slate-800 mb-2">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-slate-700 mb-3">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-slate-500 mb-6">
          Sorry, the page you are looking for doesn’t exist or has been moved.
          Please check the URL or return to the homepage.
        </p>

        {/* Action Button */}
        <Link
          to="/"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
