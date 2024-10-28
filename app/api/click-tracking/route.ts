import { serialize, parse } from "cookie";
import { NextResponse } from "next/server";

interface RequestBody {
   name: string;
   id: string;
   click_location: "map" | "details";
}

export async function POST(req: Request) {
   const body: RequestBody = await req.json();
   const { name, id, click_location } = body;
   let resContent = {};

   try {
      if (!name || !id || !click_location) {
         throw new Error("All fields are required");
      }

      const res = await fetch(`${process.env.NODE_SERVER_URL}/api/place`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "Accept-Encoding": "gzip, deflate, br, compress",
         },
         body: JSON.stringify({
            place: { name, id, click_location },
         }),
      });

      if (res.status === 500) throw new Error("server error");

      resContent = {
         message: "success",
         status: 200,
      };
   } catch (error) {
      resContent = {
         message: `request rejected: ${name}`,
         status: 500,
      };
   } finally {
      return NextResponse.json(resContent);
   }
}
