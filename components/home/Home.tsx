"use client";

import SearchBar from "./SearchBar";
import JobCategories from "./JobCategories";
import FeaturedJobsSlider from "./FeaturedJobsSlider";
import { useEffect, useState } from "react";
import { WebsiteLoader } from "../common/Loader";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null); 
      try {
        const [categoriesRes, featuredJobRes] = await Promise.all([
          fetch(`/api/job-categories`),
          fetch(`/api/jobs?featured=true`),
        ]);

        if (!categoriesRes.ok || !featuredJobRes.ok) {
          throw new Error(
            `Error fetching data: Categories ${categoriesRes.status}, Jobs ${featuredJobRes.status}`
          );
        }

        const categoriesData = await categoriesRes.json();
        const jobsData = await featuredJobRes.json();

        setCategories(categoriesData);
        setJobs(jobsData.jobs);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        setError(error.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <WebsiteLoader />;

  return (
    <div>
      <SearchBar />
      <FeaturedJobsSlider jobs={jobs} />
      <JobCategories categories={categories} />
    </div>
  );
};

export default Home;
