import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET(req: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), "public/resume", "Resume_Mohd-Uwaish.pdf");

    // Ensure file exists
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const file = await fs.readFile(filePath);
    const response = new NextResponse(file);
    
    response.headers.set("Content-Type", "application/pdf");
    response.headers.set("Content-Disposition", "attachment; filename=Resume_Mohd_Uwaish.pdf");

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
