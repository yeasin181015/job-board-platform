import { NextResponse } from "next/server";
import { jobs } from "../../../db/db.js";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const jobId = searchParams.get("jobId");

  let jobDetails;

  if (jobId) {
    jobDetails = jobs.find((job) => job.id === parseInt(jobId));
  }

  return NextResponse.json({
    jobDetails,
  });
}
