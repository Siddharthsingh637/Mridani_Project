import React, { useState } from "react";

const PasswordStep = ({ onBack, updateFormData, onSubmit }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinue = () => {
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    // ✅ Update parent state
    updateFormData({ password });

    // ✅ Wait 50ms before submit — safer for state batching
    setTimeout(() => {
      onSubmit(password); // pass password to parent
      setIsSubmitting(false);
    }, 50);
  };

  return (
    <div className="space-y-6 w-full">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Set Your Password
      </h2>

      <div className="space-y-4 mt-6">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create your password"
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>

      <div className="flex justify-between gap-4 mt-6">
        <button
          onClick={onBack}
          className="w-1/2 py-3 text-base font-medium bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
        >
          ← Back
        </button>
        <button
          onClick={handleContinue}
          disabled={isSubmitting}
          className={`w-1/2 py-3 text-base font-semibold rounded-md transition ${
            isSubmitting
              ? "bg-red-400 cursor-not-allowed"
              : "bg-red-700 text-white hover:bg-red-800"
          }`}
        >
          {isSubmitting ? "Processing..." : "Continue →"}
        </button>
      </div>
    </div>
  );
};

export default PasswordStep;
