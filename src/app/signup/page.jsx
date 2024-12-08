"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const Signup = () => {
  const [success, setSuccess] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      email: yup.string().email("Invalid email ID").required("Email is required"),
      password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),

    onSubmit: async (values) => {
      try {
        const response = await fetch("/pages/api/database", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const data = await response.json();
          setSuccess("Signup successful!");
        } else {
          const errorData = await response.json();
          setSuccess(`Signup failed: ${errorData.message}`);
        }
      } catch (err) {
        setSuccess(`Error: ${err.message}`);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 space-y-6 bg-black rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold white">Signup</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium white">Name</label>
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className={`w-full px-4 py-2 mt-1 white border ${
                formik.errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formik.errors.name && (
              <div className="mt-1 text-sm text-red-500">{formik.errors.name}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium white">Email</label>
            <input
              type="text"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className={`w-full px-4 py-2 mt-1 text-gray-700 border ${
                formik.errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formik.errors.email && (
              <div className="mt-1 text-sm text-red-500">{formik.errors.email}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium white">Password</label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className={`w-full px-4 py-2 mt-1 text-gray-700 border ${
                formik.errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />

            {formik.errors.password && (
              <div className="mt-1 text-sm text-red-500">{formik.errors.password}</div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Submit
            </button>
          </div>
        </form>

        {success && (
          <div
            className={`mt-4 p-2 text-center font-medium text-white rounded-lg ${
              success.startsWith("Signup successful!")
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {success}
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
