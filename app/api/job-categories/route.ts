import { NextResponse } from "next/server";
import { categories } from "../../../db/db.js";

export async function GET(req: Request) {
  let jobCategories = categories;

  return NextResponse.json(jobCategories);
}
