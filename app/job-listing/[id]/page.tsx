"use client";

import React, { useEffect, useState } from "react";
import { Job } from "@/types/job";
import JobDetails from "@/components/jobDetails/JobDetails";
import { WebsiteLoader } from "@/components/common/Loader";

interface PageProps {
  params: { id: string };
}

const JobDetailsPage = ({ params }: PageProps) => {
  const [jobDetails, setJobDetails] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/job-details?jobId=${params.id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch job details. Status: ${res.status}`);
        }

        const data: { jobDetails: Job } = await res.json();
        setJobDetails(data.jobDetails);
      } catch (err: any) {
        console.error("Error fetching job details:", err.message);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobDetails();
  }, [params.id]);

  if (isLoading) return <WebsiteLoader />;

  return jobDetails ? (
    <JobDetails job={jobDetails} />
  ) : (
    <div className="text-center text-gray-500">No job details available.</div>
  );
};

export default JobDetailsPage;
