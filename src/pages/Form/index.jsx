import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Button, InputField } from "../../components";
import { validateEmail, validateName, validatePhone } from "../../utils";
import { Check } from "lucide-react";

const Form = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    selectedTags: [],
    sliderValue: 50,
    toggles: {
      emailAlerts: false,
      inAppNotifications: false,
      weeklyDigest: false,
    },
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
  });
  const [submitted, setSubmitted] = useState(false);

  // Available tags for multi-select
  const availableTags = [
    "Design",
    "Development",
    "Marketing",
    "Sales",
    "Customer Support",
  ];

  const toggleOptions = [
    { key: "emailAlerts", label: "Email Alerts" },
    { key: "inAppNotifications", label: "In-App Notifications" },
    { key: "weeklyDigest", label: "Weekly Digest" },
  ];

  // Computed validity for step 1
  const isStep1Valid = useMemo(() => {
    return (
      validateName(formData.name) &&
      validateEmail(formData.email) &&
      validatePhone(formData.phone)
    );
  }, [formData.name, formData.email, formData.phone]);

  // Error messages
  const getNameError = () => {
    if (touched.name && !validateName(formData.name)) return "Name is required";
    return null;
  };
  const getEmailError = () => {
    if (touched.email && !validateEmail(formData.email))
      return "Please enter a valid email address (e.g., name@example.com)";
    return null;
  };
  const getPhoneError = () => {
    if (touched.phone && !validatePhone(formData.phone))
      return "Phone must contain exactly 10 digits";
    return null;
  };

  // Handlers for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleTagChange = (tag) => {
    setFormData((prev) => {
      const isSelected = prev.selectedTags.includes(tag);
      if (isSelected) {
        return {
          ...prev,
          selectedTags: prev.selectedTags.filter((t) => t !== tag),
        };
      } else {
        return { ...prev, selectedTags: [...prev.selectedTags, tag] };
      }
    });
  };

  const handleSliderChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      sliderValue: parseInt(e.target.value, 10),
    }));
  };

  const handleToggleChange = (toggleName) => {
    setFormData((prev) => ({
      ...prev,
      toggles: { ...prev.toggles, [toggleName]: !prev.toggles[toggleName] },
    }));
  };

  // Navigation handlers
  const handleNext = () => {
    if (step === 1 && isStep1Valid) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    if (step === 3 && isStep1Valid) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setStep(1);
    setFormData({
      name: "",
      email: "",
      phone: "",
      selectedTags: [],
      sliderValue: 50,
      toggles: {
        emailAlerts: false,
        inAppNotifications: false,
        weeklyDigest: false,
      },
    });
    setTouched({ name: false, email: false, phone: false });
    setSubmitted(false);
  };


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (submitted) return;

      if (e.key === "Enter") {
        // Trigger the primary action (Next or Submit) if enabled
        if (step === 1 && isStep1Valid) {
          handleNext();
          e.preventDefault();
        } else if (step === 2) {
          // Step 2 has no validation, Next is always enabled
          handleNext();
          e.preventDefault();
        } else if (step === 3 && isStep1Valid) {
          handleSubmit();
          e.preventDefault();
        }
      } else if (e.key === "Escape") {
        if (step > 1) {
          handleBack();
          e.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step, isStep1Valid, submitted, handleNext, handleBack, handleSubmit]);

  // Success state
  if (submitted) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg text-center">
        <div className="mb-4 text-green-500 flex justify-center">
          <Check className="h-16 w-16" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Onboarding Complete!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for providing your information. Your preferences have been
          saved successfully.
        </p>
        <Button variant="primary" onClick={handleReset}>
          Start over
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      {/* Step Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNum
                    ? "bg-violet-800 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {stepNum}
              </div>
              <div className="text-xs mt-1 text-gray-600">
                {stepNum === 1 && "Personal"}
                {stepNum === 2 && "Preferences"}
                {stepNum === 3 && "Review"}
              </div>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 h-1 bg-gray-200 w-full rounded"></div>
          <div
            className="absolute top-0 h-1 bg-violet-800 rounded transition-all duration-300"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step 1: Personal Info */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <InputField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={() => handleBlur("name")}
              error={getNameError()}
              required
            />
            <InputField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={() => handleBlur("email")}
              error={getEmailError()}
              required
            />
            <InputField
              label="Phone"
              name="phone"
              type="tel"
              placeholder="e.g., 1234567890 or 123-456-7890"
              value={formData.phone}
              onChange={handleInputChange}
              onBlur={() => handleBlur("phone")}
              error={getPhoneError()}
              required
            />
          </div>
        </div>
      )}

      {/* Step 2: Preferences */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Preferences</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Areas of Interest (Select multiple)
              </label>
              <div className="flex flex-wrap gap-3">
                {availableTags.map((tag) => (
                  <label
                    key={tag}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.selectedTags.includes(tag)}
                      onChange={() => handleTagChange(tag)}
                      className="w-4 h-4 accent-violet-800"
                    />
                    <span className="text-gray-700">{tag}</span>
                  </label>
                ))}
              </div>
              {formData.selectedTags.length > 0 && (
                <p className="mt-2 text-sm text-gray-500">
                  Selected: {formData.selectedTags.join(", ")}
                </p>
              )}
            </div>

            {/* Range slider */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comfort Level: {formData.sliderValue}%
              </label>
              <input
                type="range"
                id="slider"
                min="0"
                max="100"
                value={formData.sliderValue}
                onChange={handleSliderChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-800"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0% (Beginner)</span>
                <span>100% (Expert)</span>
              </div>
            </div>

            {/* Toggle group */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notification Preferences
              </label>

              <div className="space-y-2">
                {toggleOptions.map(({ key, label }) => {
                  const isActive = formData.toggles[key];

                  return (
                    <label
                      key={key}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <span className="text-gray-700">{label}</span>

                      <button
                        type="button"
                        role="switch"
                        aria-checked={isActive}
                        onClick={() => handleToggleChange(key)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-violet-800 ${
                          isActive ? "bg-violet-800" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            isActive ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Review Screen */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Review Your Information
          </h2>
          <div className="bg-gray-50 p-4 rounded-md space-y-3">
            <div>
              <h3 className="font-medium text-gray-700">
                Personal Information
              </h3>
              <p className="text-gray-600">Name: {formData.name}</p>
              <p className="text-gray-600">Email: {formData.email}</p>
              <p className="text-gray-600">Phone: {formData.phone}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Preferences</h3>
              <p className="text-gray-600">
                Interests:
                {formData.selectedTags.length > 0
                  ? formData.selectedTags.join(", ")
                  : "None selected"}
              </p>
              <p className="text-gray-600">
                Comfort Level: {formData.sliderValue}%
              </p>
              <p className="text-gray-600">
                Notifications:{" "}
                {Object.entries(formData.toggles)
                  .filter(([, value]) => value)
                  .map(([key]) => {
                    switch (key) {
                      case "emailAlerts":
                        return "Email Alerts";
                      case "inAppNotifications":
                        return "In-App Notifications";
                      case "weeklyDigest":
                        return "Weekly Digest";
                      default:
                        return "";
                    }
                  })
                  .join(", ") || "None"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8 pt-4 border-t">
        <Button variant="white" onClick={handleBack} disabled={step === 1}>
          Back
        </Button>

        {step < 3 ? (
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={step === 1 && !isStep1Valid}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="success"
            onClick={handleSubmit}
            disabled={!isStep1Valid}
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default Form;