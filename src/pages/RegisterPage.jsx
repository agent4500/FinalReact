import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Register = () => {
  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values); // Access form values here
    try {
      const response = await fetch("http://localhost:3000/users/reg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        localStorage.setItem("userId", data.foundedUser._id);
      } else {
        // Handle error message
      }
    } catch (error) {
      // Handle error message
    }
    setSubmitting(false);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-400 to-purple-500 min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-white mb-4">Register</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold">Name</label>
              <Field id="name" name="name" type="text" className="mt-2 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-indigo-500" />
              <ErrorMessage name="name" component="div" className="text-red-500 mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold">Email</label>
              <Field id="email" name="email" type="email" className="mt-2 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-indigo-500" />
              <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-bold">Password</label>
              <Field id="password" name="password" type="password" className="mt-2 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-indigo-500" />
              <ErrorMessage name="password" component="div" className="text-red-500 mt-1" />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-bold">Confirm Password</label>
              <Field id="confirmPassword" name="confirmPassword" type="password" className="mt-2 w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-indigo-500" />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 mt-1" />
            </div>

            <button type="submit" disabled={isSubmitting} className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
