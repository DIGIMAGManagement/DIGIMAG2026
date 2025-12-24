import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // TODO: Fetch authors
  return NextResponse.json({ message: "List of authors" });
}

export async function POST(req: NextRequest) {
  // TODO: Create new author
  return NextResponse.json({ message: "Author created" });
}

export async function PUT(req: NextRequest) {
  // TODO: Update author
  return NextResponse.json({ message: "Author updated" });
}

export async function DELETE(req: NextRequest) {
  // TODO: Soft delete author
  return NextResponse.json({ message: "Author deleted" });
}
