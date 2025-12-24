import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // TODO: Fetch categories
  return NextResponse.json({ message: "List of categories" });
}

export async function POST(req: NextRequest) {
  // TODO: Create new category
  return NextResponse.json({ message: "Category created" });
}

export async function PUT(req: NextRequest) {
  // TODO: Update category
  return NextResponse.json({ message: "Category updated" });
}

export async function DELETE(req: NextRequest) {
  // TODO: Soft delete category
  return NextResponse.json({ message: "Category deleted" });
}
