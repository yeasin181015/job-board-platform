"use client";

import * as yup from "yup";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";

const signupSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const SignupPage = () => {
  const router = useRouter();

  const getUsersFromLocalStorage = (): Array<{
    username: string;
    password: string;
  }> => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  };

  const saveUsersToLocalStorage = (
    users: Array<{ username: string; password: string }>
  ) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const handleSignup = async (values: {
    username: string;
    password: string;
  }) => {
    const data = {
      username: values.username,
      password: values.password,
    };

    const users = getUsersFromLocalStorage();
    users.push(data);
    saveUsersToLocalStorage(users);
    router.push("/auth/login");
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Signup</h1>
      <Formik
        initialValues={{ username: "", password: "", confirmPassword: "" }}
        validationSchema={signupSchema}
        onSubmit={handleSignup}
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
            <div className="mb-4">
              <label>Confirm Password</label>
              <Field
                name="confirmPassword"
                type="password"
                className="border p-2 w-full"
              />
              <ErrorMessage
                name="confirmPassword"
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
                {isSubmitting ? "Signing up..." : "Signup"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="flex justify-center gap-1 mt-2 w-full">
        <p>Already have an account?</p> <Link href="/auth/login">Login</Link>
      </div>
    </div>
  );
};

export default SignupPage;
