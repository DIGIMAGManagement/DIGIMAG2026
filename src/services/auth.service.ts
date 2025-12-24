import bcrypt from "bcrypt";
import User from "../models/user";
import RefreshToken from "../models/refreshToken";
import { signAccessToken, signRefreshToken, verifyToken } from "../utils/token";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

export default class AuthService {
  static async register(payload: any) {
    const hashed = await bcrypt.hash(payload.password, SALT_ROUNDS);
    const user = await User.create({ ...payload, password: hashed });
    return { id: user.id, email: user.email, name: user.name, role: user.role };
  }

  static async authenticate(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user || !user.password) return null;
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return null;
    const access = signAccessToken({ sub: user.id, role: user.role });
    const refresh = signRefreshToken({ sub: user.id });
    await RefreshToken.create({ token: refresh, userId: user.id });
    return {
      access,
      refresh,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  static async refresh(token: string) {
    try {
      const payload: any = verifyToken(token) as any;
      const record = await RefreshToken.findOne({
        where: { token, userId: payload.sub, revoked: false },
      });
      if (!record) return null;
      const user = await User.findByPk(payload.sub);
      if (!user) return null;
      const access = signAccessToken({ sub: user.id, role: user.role });
      const refresh = signRefreshToken({ sub: user.id });
      // rotate refresh token
      record.token = refresh;
      await record.save();
      return { access, refresh };
    } catch (err) {
      return null;
    }
  }

  static async revoke(token: string) {
    const record = await RefreshToken.findOne({ where: { token } });
    if (!record) return false;
    record.revoked = true;
    await record.save();
    return true;
  }
}
