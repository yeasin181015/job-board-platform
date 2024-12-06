"use client";

import { useState } from "react";
import { JobCategoryTypes } from "@/types/job";

interface CategoriesProps {
  categories: Array<JobCategoryTypes>;
}
const JobCategories = ({ categories }: CategoriesProps) => {
  const [jobCategories, setJobCategories] =
    useState<Array<JobCategoryTypes>>(categories);

  return (
    <div className="flex justify-center px-5 lg:px-0">
      <div className="flex flex-wrap gap-3">
        {jobCategories?.map((cat, index) => (
          <div
            key={index}
            className="border border-black px-3 py-1 rounded-lg bg-[#d0d1d3] cursor-pointer hover:bg-[#dfe3ec]"
          >
            <p>{cat.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobCategories;
