import React, { useState } from "react";
import {
  X,
  Send,
  Package,
  User,
  Mail,
  Phone,
  Building,
  AlertCircle,
} from "lucide-react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  productCategory?: string;
}

const QuoteRequestModal: React.FC<QuoteRequestModalProps> = ({
  isOpen,
  onClose,
  productName = "",
  productCategory = "",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    product: productName,
    quantity: "",
    requirements: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Configure toastr
  toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: "toast-top-right",
    timeOut: 10000, // Increased to 10 seconds
  };

  // Validation functions
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Full name is required";
        if (value.trim().length < 2)
          return "Name must be at least 2 characters";
        return "";
      case "email":
        if (!value.trim()) return "Email address is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value))
          return "Please enter a valid email address";
        return "";
      case "phone":
        if (!value.trim()) return "Phone number is required";
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, "")))
          return "Please enter a valid phone number";
        return "";
      case "company":
        if (!value.trim()) return "Company name is required";
        if (value.trim().length < 2)
          return "Company name must be at least 2 characters";
        return "";
      case "product":
        if (!value.trim()) return "Product selection is required";
        return "";
      case "quantity":
        if (!value.trim()) return "Quantity is required";
        if (value.trim().length < 2) return "Please specify quantity details";
        return "";
      case "requirements":
        if (!value.trim()) return "Requirements are required";
        if (value.trim().length < 10)
          return "Please provide detailed requirements (at least 10 characters)";
        return "";
      default:
        return "";
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const fields = [
      "name",
      "email",
      "phone",
      "company",
      "product",
      "quantity",
      "requirements",
    ];

    fields.forEach((field) => {
      const error = validateField(
        field,
        formData[field as keyof typeof formData]
      );
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allFields = [
      "name",
      "email",
      "phone",
      "company",
      "product",
      "quantity",
      "requirements",
    ];
    const newTouched: Record<string, boolean> = {};
    allFields.forEach((field) => {
      newTouched[field] = true;
    });
    setTouched(newTouched);

    // Validate form
    if (!validateForm()) {
      toastr.error("Please fill in all required fields correctly.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toastr.success(result.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          product: productName,
          quantity: "",
          requirements: "",
        });
        setErrors({});
        setTouched({});
        onClose();
      } else {
        toastr.error(
          result.message || "Error submitting quote request. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toastr.error(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Premium Loader Component
  const PremiumLoader = () => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-12 shadow-2xl max-w-md w-full mx-4 text-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto relative">
            <div className="absolute inset-0 rounded-full border-4 border-emerald-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Namaste EXIM</h3>
        <p className="text-gray-600 mb-6">Processing your quote request...</p>
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <>
      {isSubmitting && <PremiumLoader />}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Request Quote
              </h2>
              <p className="text-gray-600 mt-1">
                Get a detailed quote for your requirements
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Product Info */}
            {productName && (
              <div className="bg-emerald-50 p-4 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <Package className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="font-semibold text-emerald-900">Product</p>
                    <p className="text-emerald-700">{productName}</p>
                    {productCategory && (
                      <p className="text-emerald-600 text-sm">
                        {productCategory}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 transition-all duration-300 ${
                    errors.name && touched.name
                      ? "border-red-500 focus:ring-red-100 focus:border-red-500"
                      : "border-gray-200 focus:ring-emerald-100 focus:border-emerald-500"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && touched.name && (
                  <div className="mt-2 flex items-center text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.name}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 transition-all duration-300 ${
                    errors.email && touched.email
                      ? "border-red-500 focus:ring-red-100 focus:border-red-500"
                      : "border-gray-200 focus:ring-emerald-100 focus:border-emerald-500"
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && touched.email && (
                  <div className="mt-2 flex items-center text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 transition-all duration-300 ${
                    errors.phone && touched.phone
                      ? "border-red-500 focus:ring-red-100 focus:border-red-500"
                      : "border-gray-200 focus:ring-emerald-100 focus:border-emerald-500"
                  }`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && touched.phone && (
                  <div className="mt-2 flex items-center text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.phone}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Building className="w-4 h-4 inline mr-2" />
                  Company Name *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 transition-all duration-300 ${
                    errors.company && touched.company
                      ? "border-red-500 focus:ring-red-100 focus:border-red-500"
                      : "border-gray-200 focus:ring-emerald-100 focus:border-emerald-500"
                  }`}
                  placeholder="Enter company name"
                />
                {errors.company && touched.company && (
                  <div className="mt-2 flex items-center text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.company}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Package className="w-4 h-4 inline mr-2" />
                Quantity Required *
              </label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 transition-all duration-300 ${
                  errors.quantity && touched.quantity
                    ? "border-red-500 focus:ring-red-100 focus:border-red-500"
                    : "border-gray-200 focus:ring-emerald-100 focus:border-emerald-500"
                }`}
                placeholder="e.g., 1000 kg, 50 bags, etc."
              />
              {errors.quantity && touched.quantity && (
                <div className="mt-2 flex items-center text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.quantity}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Requirements *
              </label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                onBlur={handleBlur}
                rows={4}
                required
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 transition-all duration-300 resize-none ${
                  errors.requirements && touched.requirements
                    ? "border-red-500 focus:ring-red-100 focus:border-red-500"
                    : "border-gray-200 focus:ring-emerald-100 focus:border-emerald-500"
                }`}
                placeholder="Tell us about any specific requirements, packaging preferences, delivery timeline, etc."
              />
              {errors.requirements && touched.requirements && (
                <div className="mt-2 flex items-center text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.requirements}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 px-6 rounded-2xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit Quote Request</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all duration-300 font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default QuoteRequestModal;
