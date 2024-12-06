import { NextResponse } from "next/server";
import { jobs } from "../../../db/db.js";

export async function GET(req: Request) {
  const pageSize = 5;

  const { searchParams } = new URL(req.url);

  // Get query parameters
  const type = searchParams.get("type");
  const query = searchParams.get("query");
  const category = searchParams.get("category");
  const location = searchParams.get("location");
  const page = parseInt(searchParams.get("page") || "1");
  const isFeatured = searchParams.get("featured") === "true";

  let filteredJobs = jobs;

  // Filter by `featured` if the parameter is provided
  if (isFeatured) {
    filteredJobs = filteredJobs.filter((job) => job.featured === true);
  }

  if (query) {
    const lowerCaseQuery = query.toLowerCase();
    filteredJobs = filteredJobs.filter((job) =>
      job.title.toLowerCase().includes(lowerCaseQuery)
    );
  }

  // Filter by `category` if the parameter is provided
  if (category && category.toLowerCase() !== "all") {
    const lowerCaseCategory = category.toLowerCase();
    filteredJobs = filteredJobs.filter((job) =>
      job.category.toLowerCase().includes(lowerCaseCategory)
    );
  }

  if (type) {
    const lowerCaseQuery = type.toLowerCase();
    filteredJobs = filteredJobs.filter((job) =>
      job.type.toLowerCase().includes(lowerCaseQuery)
    );
  }

  if (location) {
    const lowerCaseQuery = location.toLowerCase();
    filteredJobs = filteredJobs.filter((job) =>
      job.location.toLowerCase().includes(lowerCaseQuery)
    );
  }

  const startIndex = (page - 1) * pageSize;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + pageSize);

  return NextResponse.json({
    jobs: paginatedJobs, // Paginated jobs for the current page
    totalJobs: filteredJobs.length, // Total filtered jobs
    currentPage: page, // Current page number
    totalPages: Math.ceil(filteredJobs.length / pageSize), // Total number of pages
  });
}
