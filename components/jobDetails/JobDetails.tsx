"use client";

import { Job } from "@/types/job";
import { useState } from "react";
import { WebsiteLoader } from "../common/Loader";

interface JobProps {
  job: Job;
}

const JobDetails = ({ job }: JobProps) => {
  const [activeTab, setActiveTab] = useState("description");

  if (!job) {
    return <WebsiteLoader />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        {/* Job Title and Info */}
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
          {job.title}
        </h1>
        <p className="text-gray-500 mb-6">
          <span className="text-sm sm:text-base font-semibold text-gray-600">
            {job.category}
          </span>{" "}
          |{" "}
          <span className="text-sm sm:text-base font-semibold text-gray-600">
            {job.location}
          </span>
        </p>

        {/* Tabs */}
        <div className="flex flex-row sm:flex-col justify-between sm:gap-0">
          <div className="w-[20%] flex flex-wrap flex-col sm:flex-row sm:w-auto justify-center border-b mb-6">
            {["description", "requirements", "company"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-01 sm:px-6 py-2 text-sm sm:text-lg font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? "border-b-4 border-[#f4dabf] text-[#f4dabf]"
                    : "text-gray-500 hover:[#f4dabf]"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="w-[70%] text-gray-700 mt-2 sm:mt-4">
            {activeTab === "description" && (
              <div>
                <h2 className="text-sm sm:text-xl font-semibold mb-2">
                  Description
                </h2>
                <p className="leading-relaxed">{job.description}</p>
              </div>
            )}
            {activeTab === "requirements" && (
              <div>
                <h2 className="text-sm sm:text-xl font-semibold mb-2">
                  Requirements
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
            {activeTab === "company" && (
              <div>
                <h2 className="text-sm sm:text-xl font-semibold mb-2">
                  Company
                </h2>
                <p className="leading-relaxed">{job.company}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
