import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // TODO: Fetch newsletters
  return NextResponse.json({ message: "List of newsletters" });
}

export async function POST(req: NextRequest) {
  // TODO: Create or schedule newsletter
  return NextResponse.json({ message: "Newsletter created/scheduled" });
}

export async function PUT(req: NextRequest) {
  // TODO: Update newsletter
  return NextResponse.json({ message: "Newsletter updated" });
}

export async function DELETE(req: NextRequest) {
  // TODO: Delete newsletter
  return NextResponse.json({ message: "Newsletter deleted" });
}
