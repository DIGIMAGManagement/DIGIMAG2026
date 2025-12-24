import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // TODO: Fetch tags
  return NextResponse.json({ message: "List of tags" });
}

export async function POST(req: NextRequest) {
  // TODO: Create new tag
  return NextResponse.json({ message: "Tag created" });
}

export async function PUT(req: NextRequest) {
  // TODO: Update tag
  return NextResponse.json({ message: "Tag updated" });
}

export async function DELETE(req: NextRequest) {
  // TODO: Soft delete tag
  return NextResponse.json({ message: "Tag deleted" });
}
