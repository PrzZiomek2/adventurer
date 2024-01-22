import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
   expiresIn: string | number;
}

const DEFAULT_OPTION: SignOption = {
   expiresIn: 60 * 60 * 24 * 3,
};

export const signJwtToken = (payload: JwtPayload, options = DEFAULT_OPTION) => {
   try {
      const secretKey = process.env.JWT_SECRET_KEY;
      const token = jwt.sign(payload, secretKey!, options);
      return token;
   } catch (err) {
      console.log(err);
      return null;
   }
};

export const verifyJwtToken = (token: string) => {
   try {
      const secretKey = process.env.JWT_SECRET_KEY;
      const decoded = jwt.verify(token, secretKey!);
      return decoded as JwtPayload;
   } catch (err) {
      console.log(err);
      return null;
   }
};
