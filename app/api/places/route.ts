import { NextRequest, NextResponse } from "next/server";

import { urls } from "app/_utils/urls";

interface Params {
   category: string;
   location: string;
   radius: number;
}

export async function GET(req: NextRequest) {
   const { searchParams } = req.nextUrl;
   const category = searchParams.get("category");
   const location = searchParams.get("location");
   const radius = searchParams.get("radius");
   const { googleMaps } = urls();
   let resContent = {};

   try {
      if (!category || !location || !radius) {
         throw new Error(
            "parameters: category or location or radius not provided",
         );
      }

      const response = await fetch(`
         ${googleMaps}/place/textsearch/json?query=${category}&location=${location}&radius=${radius}&key=${process.env.GOOGLE_MAPS_KEY} 
      `);

      const resData = await response.json();

      if (resData) {
         resContent = {
            status: 200,
            data: resData.results,
         };
      }
   } catch (error) {
      resContent = {
         message: `error when connecting place API: ${error}`,
         status: 500,
      };
   } finally {
      return NextResponse.json(resContent);
   }
}
