import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";
import PasswordStep from "./PasswordStep";
import Welcome from "./Welcome";
import { registerUser, loginUser } from "../../../Service/API/auth";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleSubmit = async (password) => {
    setError("");
  
    // Combine all form data before sending
    const fullData = {
      ...formData,
      password: password,
      mobile: formData.mobile ? Number(formData.mobile) : null,
    };
  
    if (!fullData.mobile || isNaN(fullData.mobile)) {
      setError("Please enter a valid mobile number.");
      return;
    }
  
    try {
      // Signup API
      await registerUser(fullData);
  
      // Optional short wait (if race condition suspected)
      await new Promise((res) => setTimeout(res, 300));
  
      // Login API
      const loginResponse = await loginUser({
        username: fullData.username,
        password: fullData.password,
      });
  
      sessionStorage.setItem("authToken", loginResponse.token);
      sessionStorage.setItem("username", loginResponse.username);
  
      setStep(3); // Show Welcome
    } catch (err) {
      console.error("Signup failed:", err);
      setError(err?.message || "Signup failed. Please try again.");
    }
  };
  
  const handleRedirect = () => {
    navigate("/profile");
  };

  return (
    <div className="min-h-screen w-full bg-white flex">
      {/* Left Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-20 py-10">
        <div className="w-full max-w-md">
          <img
            src="https://ik.imagekit.io/siddharth637/assets/Mridani_Logo.avif?updatedAt=1747042433959"
            alt="Mridani Logo"
            className="h-16 mx-auto mb-10"
          />

          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          <div className="transition-all duration-500">
            {step === 1 && (
              <UserDetails
                onNext={() => setStep(2)}
                updateFormData={updateFormData}
              />
            )}
            {step === 2 && (
              <PasswordStep
                onBack={() => setStep(1)}
                onSubmit={handleSubmit}
                updateFormData={updateFormData}
              />
            )}
            {step === 3 && <Welcome onRedirect={handleRedirect} />}
          </div>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="hidden md:flex w-1/2 h-screen">
        <img
          src="https://ik.imagekit.io/siddharth637/assets/About/ab1.webp?updatedAt=1747042434540"
          alt="Signup Illustration"
          className="w-full h-full rounded-4xl object-cover p-5"
        />
      </div>
    </div>
  );
};

export default Signup;
