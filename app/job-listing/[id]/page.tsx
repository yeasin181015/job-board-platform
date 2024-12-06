import { Job } from "@/types/job";
import JobDetails from "@/components/jobDetails/JobDetails";

const JobDetailsPage = async ({ params }: { params: { id: string } }) => {
  const id = (await params).id;
  try {
    const res = await fetch(
      `${process.env.LOCALSERVER}/api/job-details?jobId=${id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch job details. Status: ${res.status}`);
    }

    const data: { jobDetails: Job } = await res.json();

    return <JobDetails job={data.jobDetails} />;
  } catch (error) {
    console.error(error);
    return (
      <div className="text-center text-red-500">Error fetching job details</div>
    );
  }
};

export default JobDetailsPage;
