import jwt, { JwtPayload } from "jsonwebtoken";

export class JwtService {
  private static instance: JwtService;
  private secret: string;

  private constructor() {
    this.secret = process.env.JWT_SECRET as string;
  }

  public static getInstance(): JwtService {
    if (!JwtService.instance) {
      JwtService.instance = new JwtService();
    }
    return JwtService.instance;
  }

  public generateToken(userId: string): string {
    const token = jwt.sign({ id: userId }, this.secret, {
      expiresIn: 60 * 60 * 1, // 1 hour
    });
    return token;
  }

  // public verifyToken(token: string){
  //   const decoded = jwt.verify(token, this.secret);
  //   // Validate JWT Token
  //   if (typeof decoded === "string" || !decoded.id || !decoded.role || !decoded.exp) {
  //     throw new Error("Invalid token");
  //   }
  //   // Verify Expiry
  //   const now = Date.now().valueOf() / 1000;
  //   if (typeof decoded.exp !== "undefined" && decoded.exp < now) {
  //     throw new Error("Token expired");
  //   }
  //   return {
  //     id: decoded.id,
  //     role: JSON.parse(decoded.role),
  //     token: token
  //   };
  // }

  public validateJwtPayload(payload: JwtPayload) {
    // Validate JWT Token
    console.log(payload);
    console.log(typeof payload);
    console.log(payload.id);
    console.log(payload.exp);
    if (typeof payload === "string" || !payload.id || !payload.exp) {
      throw new Error("Invalid token");
    }
    // Verify Expiry
    const now = Date.now().valueOf() / 1000;
    if (typeof payload.exp !== "undefined" && payload.exp < now) {
      throw new Error("Token expired");
    }
    return true;
  }
}
