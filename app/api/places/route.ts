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

      const sortedRes = (resData.results as MapPlace[])
         ?.sort((a, b) => b.rating - a.rating)
         .filter(
            ({ types }) =>
               !types.includes("store") ||
               !types.includes("grocery_or_supermarket") ||
               !types.includes("liquor_store"),
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

interface RequestBody {
   name: string;
}

export async function POST(req: NextRequest) {
   const body: RequestBody = await req.json();
   const { name } = body;

   const { googleGeocodingAPI } = urls();
   let resContent = {};

   try {
      if (!name) {
         throw new Error("country name not provided");
      }

      const response = await fetch(`
         ${googleGeocodingAPI}?address=${name}&key=${process.env.GOOGLE_PLACES_KEY} 
      `);

      const resData = await response.json();

      if (resData) {
         resContent = {
            status: 200,
            data: resData.results[0].geometry.location,
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
