import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/src/services/authService";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password required" },
      { status: 400 }
    );
  }
  const result = await authenticate(email, password);
  if (!result) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  return NextResponse.json({
    user: {
      id: result.user.id,
      email: result.user.email,
      role: result.user.role,
    },
    token: result.token,
    refreshToken: result.refreshToken,
  });
}
