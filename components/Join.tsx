"use client";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { SparklesCore } from "@/components/ui/sparkles";

const Join: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset previous errors
    const errors = { name: "", email: "", phone: "", reason: "" };
    let hasError = false;

    // Validate each field
    if (!formData.name) {
      errors.name = "Name is required.";
      hasError = true;
    }
    if (!formData.email) {
      errors.email = "Email is required.";
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format.";
      hasError = true;
    }
    if (!formData.phone) {
      errors.phone = "Phone number is required.";
      hasError = true;
    }
    if (!formData.reason) {
      errors.reason = "Reason to join is required.";
      hasError = true;
    }

    setFormErrors(errors);

    // Stop submission if there are errors
    if (hasError) return;

    // If no errors, send email
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name, // Harus cocok dengan {{from_name}}
          message: formData.reason, // Harus cocok dengan {{message}}
          phone: formData.phone, // Harus cocok dengan {{phone}}
          to_name: "Jefta", // Harus cocok dengan {{to_name}}
          reply_to: formData.email, // Untuk membalas email
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(() => {
        setShowSuccessAlert(true);
        setFormData({ name: "", email: "", phone: "", reason: "" });
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
        alert("Failed to send message. Please try again.");
      });
  };

  return (
    <motion.section
      id="join"
      ref={sectionRef}
      className="w-full min-h-screen bg-black text-white flex items-center justify-center px-4 relative "
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Sparkles Effect */}
      <SparklesCore
        background="transparent"
        minSize={0.5}
        maxSize={1.5}
        particleDensity={80}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        particleColor="#FFFFFF"
      />

      {/* Alert Success */}
      {showSuccessAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-2">Success!</h2>
            <p className="text-gray-700 mb-4">We will contact you soon.</p>
            <button
              onClick={() => setShowSuccessAlert(false)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none transition duration-300"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Kontainer Utama */}
      <div className="relative z-10 w-full max-w-6xl">
        <AnimatePresence mode="wait">
          {!showForm ? (
            <motion.div
              key="intro"
              className="text-center space-y-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1
                className="text-5xl md:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Want to join in serving?
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Become part of our family in serving God with your talents.
                <br />
                Let’s grow together!
              </motion.p>
              <motion.button
                className="inline-block mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-lg font-semibold transition duration-300"
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowForm(true)}
              >
                Join Us
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              className="flex flex-col md:flex-row items-center justify-center gap-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              {/* Form Join Us */}
              <motion.div
                className="w-full md:w-1/2 relative p-4 md:p-6 rounded-[20px] border border-[#18212F] hover:border-purple-500 hover:shadow-[0_0_15px_4px_rgba(128,90,213,0.6)] max-h-[90vh] overflow-y-auto"
                style={{
                  background: "rgba(0, 0, 0, 0.3)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <h2 className="text-3xl font-bold mb-4 md:mb-6 text-center text-white">
                  Join Us
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-3 md:space-y-5"
                >
                  {/* Input Fields */}
                  <div>
                    <label className="block text-white mb-1 md:mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-2 py-1 md:px-3 md:py-2 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-white mb-1 md:mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-2 py-1 md:px-3 md:py-2 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-white mb-1 md:mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-2 py-1 md:px-3 md:py-2 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-white mb-1 md:mb-2">
                      Reason
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Why do you want to join?"
                      value={formData.reason}
                      onChange={(e) =>
                        setFormData({ ...formData, reason: e.target.value })
                      }
                      className="w-full px-2 py-1 md:px-3 md:py-2 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                    ></textarea>
                    {formErrors.reason && (
                      <p className="text-red-500 text-sm mt-1">
                        {formErrors.reason}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 md:py-3 rounded-lg font-semibold transition duration-300"
                  >
                    Submit
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default Join;
