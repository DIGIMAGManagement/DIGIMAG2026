import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // TODO: Fetch users
  return NextResponse.json({ message: "List of users" });
}

export async function POST(req: NextRequest) {
  // TODO: Create new user
  return NextResponse.json({ message: "User created" });
}

export async function PUT(req: NextRequest) {
  // TODO: Update user
  return NextResponse.json({ message: "User updated" });
}

export async function DELETE(req: NextRequest) {
  // TODO: Soft delete user
  return NextResponse.json({ message: "User deleted" });
}
