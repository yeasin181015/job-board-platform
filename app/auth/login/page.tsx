"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    const storedUsers = localStorage.getItem("users");

    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const isValid = users.find(
        (user: any) =>
          user.username === values.username && user.password === values.password
      );
      if (isValid) {
        const token = `${values.username}:${Date.now()}`;
        localStorage.setItem("token", token);
        setError("");
        router.push("/job-listing");
      } else {
        setError("Invalid credentials");
      }
    } else {
      setError("Account doesnt exist. Please sign up first!");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label>Username</label>
              <Field name="username" className="border p-2 w-full" />
              <ErrorMessage
                name="username"
                component="p"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <label>Password</label>
              <Field
                name="password"
                type="password"
                className="border p-2 w-full"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#E9DED3] hover:bg-[#F6F2ED] focus:ring-4 focus:outline-none focus:ring-[#E9DED3] font-medium rounded-md px-4 py-2 dark:bg-[#E9DED3] dark:hover:bg-[#E9DED3] dark:focus:ring-[#E9DED3]"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="flex justify-center gap-1 mt-2 w-full">
        <p>Don't have an account?</p> <Link href="/auth/signup">Sign up</Link>
      </div>
      <p className="text-red-600 text-center">{error}</p>
    </div>
  );
};

export default LoginPage;
