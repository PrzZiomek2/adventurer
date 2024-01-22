import { NextResponse } from "next/server";

export async function POST(req: Request) {
   try {
      const body = await req.json();
      const { tags, disliked, favourite, temperature } =
         body as DestinationCriteria;

      return NextResponse.json({ completion: {} });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ status: 500, message: `error: ${error}` });
   }
}
