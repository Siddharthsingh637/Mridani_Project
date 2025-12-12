import React, { useEffect } from "react";
import { CheckCircle } from "lucide-react";

const Welcome = ({ onRedirect }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRedirect();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onRedirect]);

  return (
    <div className="space-y-6 w-full text-center">
      <div className="flex justify-center mt-10">
        <div className="bg-green-100 p-10 rounded-full shadow-lg">
          <CheckCircle className="text-green-500" size={120} />
        </div>
      </div>

      <h2 className="mt-8 text-3xl font-bold text-green-600">Signup Successful!</h2>
      <p className="mt-4 text-gray-500 text-lg">Redirecting to your profile...</p>
    </div>
  );
};

export default Welcome;
