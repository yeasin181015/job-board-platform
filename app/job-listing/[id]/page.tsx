import { Job } from "@/types/job";
import JobDetails from "@/components/jobDetails/JobDetails";

const JobDetailsPage = async ({ params }: { params: { id: string } }) => {
  const id = (await params).id;

  const res = await fetch(`http://localhost:3000/api/job-details?jobId=${id}`);
  if (!res.ok) {
    console.error("Failed to fetch job details");
    return <div>Error fetching job details</div>;
  }

  const data: { jobDetails: Job } = await res.json();

  return <JobDetails job={data.jobDetails} />;
};

export default JobDetailsPage;
