import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Building,
  User,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import WorkingMap from "../components/UI/WorkingMap";

// Configure toastr
toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-right",
  timeOut: 5000,
};

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Map markers data
  const mapMarkers = [
    {
      id: "main-office",
      position: { lat: 19.076090158701667, lng: 72.87511931490205 },
      title: "Namaste EXIM - Main Office",
      description: "Our headquarters and main export facility",
      type: "office" as const,
      details: {
        address:
          "133 Shree Vinayak Township Devguradiya Bicholi Mardana Indore 452016",
        phone: "+91-7806070556",
        email: "info@namasteeximventures.com",
        products: ["Rice", "Jaggery", "Spices", "Nuts"],
        volume: "50,000+ MT annually",
      },
    },
    {
      id: "warehouse-mumbai",
      position: { lat: 19.076090158701667, lng: 72.87511931490205 },
      title: "Indore Warehouse",
      description: "Primary storage and packaging facility",
      type: "warehouse" as const,
      details: {
        address:
          "133 Shree Vinayak Township Devguradiya Bicholi Mardana Indore 452016",
        phone: "+91-7806070556",
        email: "namasteeximventures@gmail.com",
        products: ["Bulk Storage", "Quality Control", "Packaging"],
        volume: "25,000 MT capacity",
      },
    },
  ];

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
      case "subject":
        if (!value.trim()) return "Subject is required";
        if (value.trim().length < 5)
          return "Subject must be at least 5 characters";
        return "";
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10)
          return "Message must be at least 10 characters";
        return "";
      default:
        return "";
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const fields = ["name", "email", "phone", "company", "subject", "message"];

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

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allFields = [
      "name",
      "email",
      "phone",
      "company",
      "subject",
      "message",
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
      const response = await fetch("/api/contact", {
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
          subject: "",
          message: "",
        });
        setErrors({});
        setTouched({});
      } else {
        toastr.error(
          result.message || "Error submitting form. Please try again."
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
        <p className="text-gray-600 mb-6">Processing your message...</p>
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

  return (
    <>
      {isSubmitting && <PremiumLoader />}
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold text-white mb-6">Get in Touch</h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Ready to start your journey with premium Indian agricultural
              products? Our team is here to help you succeed in global markets.
            </p>
          </div>
        </section>

        {/* Contact Form & Map Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-3xl shadow-2xl p-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      Send us a Message
                    </h2>
                    <p className="text-gray-600">
                      Fill out the form below and we'll get back to you within
                      24 hours.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 transition-all duration-300 ${
                          errors.subject && touched.subject
                            ? "border-red-500 focus:ring-red-100 focus:border-red-500"
                            : "border-gray-200 focus:ring-emerald-100 focus:border-emerald-500"
                        }`}
                        placeholder="What is this about?"
                      />
                      {errors.subject && touched.subject && (
                        <div className="mt-2 flex items-center text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.subject}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <MessageSquare className="w-4 h-4 inline mr-2" />
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        rows={5}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 transition-all duration-300 resize-none ${
                          errors.message && touched.message
                            ? "border-red-500 focus:ring-red-100 focus:border-red-500"
                            : "border-gray-200 focus:ring-emerald-100 focus:border-emerald-500"
                        }`}
                        placeholder="Tell us about your requirements..."
                      />
                      {errors.message && touched.message && (
                        <div className="mt-2 flex items-center text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.message}
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 px-6 rounded-2xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>

              {/* Map Section */}
              <div className="lg:col-span-1">
                <WorkingMap
                  center={{ lat: 19.076090158701667, lng: 72.87511931490205 }}
                  zoom={15}
                  markers={mapMarkers}
                  height="500px"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Additional Contact Information */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Find Us on the <span className="text-emerald-600">Map</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Visit our office in Mumbai, India. We're located in the heart of
                the export district.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Office Location */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Office Location
                </h3>
                <p className="text-gray-600">
                  Export Plaza
                  <br />
                  Mumbai, Maharashtra 400001
                  <br />
                  India
                </p>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Business Hours
                </h3>
                <div className="text-gray-600 space-y-1">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 1:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Contact Information
                </h3>
                <div className="text-gray-600 space-y-2">
                  <p className="flex items-center justify-center space-x-2">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>+91-7806070556</span>
                  </p>
                  <p className="flex items-center justify-center space-x-2">
                    <Mail className="w-4 h-4 text-emerald-600" />
                    <span>info@namasteeximventures.com</span>
                  </p>
                  <p className="flex items-center justify-center space-x-2">
                    <Mail className="w-4 h-4 text-emerald-600" />
                    <span>namasteeximventures@gmail.com</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;
