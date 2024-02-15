import { NextResponse } from "next/server";

export async function POST(req: Request) {
   const body = await req.json();
   let resContent = {};

   try {
      const { tags, disliked, favourite, temperature } =
         body as DestinationCriteria;
   } catch (error) {
      console.error(error);
      resContent = { status: 500, message: `error: ${error}` };
   } finally {
      return NextResponse.json({ completion: {} });
   }
}
