import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { animated, useSpring } from 'react-spring';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {

  const slideInAnimation = useSpring({
    opacity: 1,
    transform: 'translateX(0)',
    from: { opacity: 0, transform: 'translateX(-50px)' },
    config: { duration: 500 },
  });

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const response = await fetch("http://localhost:3000/users/log", {
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
        // setMessage(data.message);
      }
    } catch (error) {
      // setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-400 to-purple-500 min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-white mb-4">Login</h2>
      <animated.div style={slideInAnimation}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              handleSubmit(values);
              setSubmitting(false);
            }, 500);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
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

              <button type="submit" disabled={isSubmitting} className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105">Submit</button>
            </Form>
          )}
        </Formik>
      </animated.div>
    </div>
  );
};

export default Login;
