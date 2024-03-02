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
         ${googleMaps}/place/textsearch/json?query=${category}&&limit=10&location=${location}&radius=${radius}&key=${process.env.GOOGLE_PLACES_KEY} 
      `);

      const resData = await response.json();

      if (resData?.error_message) {
         console.log(resData);
      }

      const sortedRes = (resData.results as MapPlace[])?.sort(
         (a, b) => b.rating - a.rating,
      );

      if (resData) {
         resContent = {
            status: 200,
            data: sortedRes?.slice(0, 10),
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
