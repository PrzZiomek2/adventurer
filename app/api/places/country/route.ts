import { NextRequest, NextResponse } from "next/server";

import { urls } from "app/_utils/urls";

export async function GET(req: NextRequest) {
   const { searchParams } = req.nextUrl;
   const country = searchParams.get("name");
   const { googleMaps, googleGeocodingAPI } = urls();
   let resContent = {};

   try {
      if (!country) {
         throw new Error("country name not provided");
      }

      const geocodingResponse = await fetch(
         `${googleGeocodingAPI}?address=${encodeURIComponent(country)}&key=${process.env.GOOGLE_PLACES_KEY}`,
      );
      const geocodingData = await geocodingResponse.json();

      if (!geocodingData) {
         throw new Error("Can not get geocoding data");
      }
      const countryBounds = geocodingData.results[0].geometry.bounds;
      const { southwest, northeast } = countryBounds || {};
      const boundArea = `${southwest.lat},${southwest.lng}|${northeast.lat},${northeast.lng}`;

      const citiesResponse = await fetch(
         `${googleMaps}/place/nearbysearch/json?type=locality&viewport=${boundArea}&key=${process.env.GOOGLE_PLACES_KEY}`,
      );
      const resData = await citiesResponse.json();
      console.log({ resData });

      if (resData?.error_message) {
         //console.log(resData);
      }

      if (resData) {
         resContent = {
            status: 200,
            data: resData,
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
