import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";
const JWT_EXPIRES_IN = "1h";
const JWT_REFRESH_EXPIRES_IN = "7d";

export async function authenticate(email: string, password: string) {
  const user = await User.findOne({ where: { email } });
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
  const refreshToken = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  });
  return { user, token, refreshToken };
}

export function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}
