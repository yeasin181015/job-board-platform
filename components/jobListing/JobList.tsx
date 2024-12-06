import { Job } from "@/types/job";
import { useRouter } from "next/navigation";

interface JobListProps {
  jobs: Array<Job>;
}

const JobList = ({ jobs }: JobListProps) => {
  const router = useRouter();
  return (
    <div>
      {jobs?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job: Job) => (
            <div key={job.id} className="p-4 border rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p>Category: {job.category}</p>
              <p>Location: {job.location}</p>
              <p>Type: {job.type}</p>
              <button
                onClick={() => router.push(`/job-listing/${job.id}`)}
                className="mt-4 bg-[#E9DED3] hover:bg-[#F6F2ED] focus:ring-4 focus:outline-none focus:ring-[#E9DED3] font-medium rounded-md px-4 py-2 dark:bg-[#E9DED3] dark:hover:bg-[#E9DED3] dark:focus:ring-[#E9DED3]"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No jobs found</p>
      )}
    </div>
  );
};

export default JobList;
