import { NextRequest, NextResponse } from "next/server";

import { urls } from "app/_utils/urls";

interface Params {
   category: string;
   location: string;
   radius: number;
}

export async function GET(req: NextRequest) {
   try {
      const { searchParams } = req.nextUrl;
      const category = searchParams.get("category");
      const location = searchParams.get("location");
      const radius = searchParams.get("radius");
      const { googleMaps } = urls();

      if (!category || !location || !radius) {
         return NextResponse.json({
            message: "parameters: category or location or radius not provided",
            status: 500,
         });
      }

      const response = await fetch(`
         ${googleMaps}/place/textsearch/json?query=${category}&location=${location}&radius=${radius}&key=${process.env.GOOGLE_MAPS_KEY} 
      `);

      const resData = await response.json();

      if (resData) {
         return NextResponse.json({
            status: 200,
            data: resData.results,
         });
      }
   } catch (error) {
      return NextResponse.json({
         message: `error when connecting place API: ${error}`,
         status: 500,
      });
   }
}
