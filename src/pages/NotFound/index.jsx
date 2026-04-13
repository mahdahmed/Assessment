import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "../../components";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="p-15 flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">

        {/* Icon */}
        <div className="flex justify-center mb-6 text-red-500">
          <AlertTriangle size={64} />
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-bold text-gray-800 mb-2">
          404
        </h1>

        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-500 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex justify-center gap-3">

          {/* Back Button */}
          <Button variant="white" onClick={() => navigate(-1)} icon={<ArrowLeft size={18} />}>Go Back</Button>
         

          {/* Home Button */}
          <Button variant="primary" onClick={() => navigate("/")} icon={<Home size={18}/>}>Go Home</Button>

        </div>
      </div>
    </div>
  );
};

export default NotFound;