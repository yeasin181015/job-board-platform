"use client";

import { Suspense } from "react";
import { WebsiteLoader } from "@/components/common/Loader";
import JobListingPageComponent from "@/components/jobListing/JobListingPageComponent";

const JobCategoryPage = () => {
  return (
    <Suspense fallback={<WebsiteLoader />}>
      <JobListingPageComponent />
    </Suspense>
  );
};

export default JobCategoryPage;
