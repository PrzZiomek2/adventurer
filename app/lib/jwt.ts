import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
   expiresIn: string | number;
}

const DEFAULT_OPTION: SignOption = {
   expiresIn: "1h"
}

export const  signJwtToken = (payload: JwtPayload, options = DEFAULT_OPTION) => {
   const secretKey = process.env.SECRET_KEY;
   const token = jwt.sign(payload, secretKey!, options);
   return token;
}

export const  verifyJwtToken = (token: string) => {
  try{
   const secretKey = process.env.SECRET_KEY;
   const decoded = jwt.verify(token, secretKey!);
   return decoded as JwtPayload;
  }
  catch(err){
   console.log(err);
   return null;
  }
}