"use client";

import { useAuth } from "@/context/AuthProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import * as yup from "yup";

export interface Job {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  type: string;
  companyInfo: string;
  requirements: string[];
}

// Define the validation schema using Yup
const jobSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  location: yup.string().required("Location is required"),
  type: yup.string().required("Type is required"),
  companyInfo: yup.string().required("Company Info is required"),
  requirements: yup
    .string()
    .required("Requirements are required")
    .test(
      "is-comma-separated",
      "Requirements must be comma-separated",
      (value) => {
        return value?.split(",").every((req) => req.trim().length > 0);
      }
    ),
});

const PostJob = () => {
  const router = useRouter();
  const initialValues = {
    title: "",
    description: "",
    category: "",
    location: "",
    type: "",
    companyInfo: "",
    requirements: "",
  };

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <p>Loading...</p>; // Show loading while checking auth
  }

  const handleSubmit = async (values: typeof initialValues) => {
    const newJob: Job = {
      ...values,
      id: Math.random(), // Generate a random ID
      requirements: values.requirements.split(",").map((req) => req.trim()), // Convert requirements to an array
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),
      });

      if (!res.ok) {
        console.error("Failed to post job");
        return;
      }

      router.push("/job-listing");
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-3 sm:px-0">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Post a Job</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={jobSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="h-[400px] overflow-y-scroll">
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Title</label>
                  <Field name="title" className="border p-2 w-full rounded" />
                  <ErrorMessage
                    name="title"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 font-medium">Description</label>
                  <Field
                    as="textarea"
                    name="description"
                    className="border p-2 w-full rounded"
                  />
                  <ErrorMessage
                    name="description"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 font-medium">Category</label>
                  <Field
                    name="category"
                    className="border p-2 w-full rounded"
                  />
                  <ErrorMessage
                    name="category"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 font-medium">Location</label>
                  <Field
                    name="location"
                    className="border p-2 w-full rounded"
                  />
                  <ErrorMessage
                    name="location"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 font-medium">Type</label>
                  <Field name="type" className="border p-2 w-full rounded" />
                  <ErrorMessage
                    name="type"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 font-medium">Company Info</label>
                  <Field
                    name="companyInfo"
                    className="border p-2 w-full rounded"
                  />
                  <ErrorMessage
                    name="companyInfo"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 font-medium">
                    Requirements (comma-separated)
                  </label>
                  <Field
                    name="requirements"
                    className="border p-2 w-full rounded"
                  />
                  <ErrorMessage
                    name="requirements"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#E9DED3] hover:bg-[#F6F2ED] focus:ring-4 focus:outline-none focus:ring-[#E9DED3] font-medium rounded-md px-4 py-2 dark:bg-[#E9DED3] dark:hover:bg-[#E9DED3] dark:focus:ring-[#E9DED3] w-full"
                >
                  {isSubmitting ? "Posting..." : "Post"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PostJob;
