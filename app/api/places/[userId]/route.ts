import { verifyJwtToken } from "app/_lib/jwt";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
   const accessToken = req.headers.get("authorization");
   let resContent = {};
   try {
      if (accessToken && verifyJwtToken(accessToken)) {
         resContent = { message: "Sukces", status: 200 };
      }
   } catch (error) {
      resContent = { message: `Blad: ${error}`, status: 500 };
   } finally {
      return NextResponse.json(resContent);
   }
}
