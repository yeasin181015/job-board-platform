"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Job, JobCategoryTypes } from "@/types/job";
import CategoryFilter from "@/components/jobListing/CategoryFilter";
import TypeFilter from "@/components/jobListing/TypeFilter";
import LocationFilter from "@/components/jobListing/LocationFilter";
import JobList from "@/components/jobListing/JobList";
import Button from "@/components/common/Button";
import CustomPagination from "@/components/common/CustomPagination";
import { useAuth } from "@/context/AuthProvider";
import { WebsiteLoader } from "@/components/common/Loader";

const JobCategoryPage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const category = searchParams.get("category") || "All";
  const type = searchParams.get("type") || "";
  const location = searchParams.get("location") || "";
  const page = parseInt(searchParams.get("page") || "1");

  const [jobs, setJobs] = useState<Array<Job>>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [jobCategories, setJobCategories] = useState<Array<JobCategoryTypes>>(
    []
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobCategories = async () => {
      try {
        const res = await fetch("/api/job-categories");
        const data = await res.json();
        setJobCategories(data);
      } catch (error) {
        console.error("Error fetching job categories:", error);
      }
    };

    fetchJobCategories();
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchJobs = async () => {
      const query = new URLSearchParams({
        category: category !== "All" ? category : "",
        type,
        location,
        page: page.toString(),
      }).toString();

      const res = await fetch(`/api/jobs?${query}`);
      const { jobs, totalPages } = await res.json();
      setJobs(jobs);
      setTotalPages(totalPages);
    };

    fetchJobs();
    setLoading(false);
  }, [category, type, location, page]);

  const updateFilters = (key: string, value: string | number) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, String(value));
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="mt-4 sm:mt-8 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 text-center">
        {category !== "All" ? `Jobs in ${category}` : "All Jobs"}
      </h1>

      {/* Filters */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
          <CategoryFilter
            category={category}
            updateFilters={updateFilters}
            jobCategories={jobCategories}
          />

          <TypeFilter type={type} updateFilters={updateFilters} />

          <LocationFilter location={location} updateFilters={updateFilters} />
        </div>
        {isAuthenticated && (
          <Button
            buttonText="Post a Job"
            onClick={() => router.push("/post-job")}
          />
        )}
      </div>

      {/* Jobs Listing */}
      {loading ? <WebsiteLoader /> : <JobList jobs={jobs} />}

      {/* Pagination */}
      {totalPages !== 1 && (
        <CustomPagination
          page={page}
          totalPages={totalPages}
          updateFilters={updateFilters}
        />
      )}
    </div>
  );
};

export default JobCategoryPage;
