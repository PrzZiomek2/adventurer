import { NextRequest, NextResponse } from "next/server";

import { urls } from "app/_utils/urls";

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
         ${googleMaps}/place/textsearch/json?query=${category}&location=${location}&radius=${radius}&key=${process.env.GOOGLE_PLACES_KEY} 
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
            data: sortedRes,
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
   phrase: string;
   regionName?: string;
   coords?: Coords;
   radius?: number;
}

export async function POST(req: NextRequest) {
   const body: RequestBody = await req.json();
   const { phrase, regionName } = body;

   const { googleMaps, googleGeocodingAPI } = urls();
   let resContent = {};

   try {
      if (!phrase) {
         throw new Error("region or phrase not provided");
      }

      if (regionName) {
         const fetcRegionCoords = fetch(`
            ${googleGeocodingAPI}?address=${regionName}&key=${process.env.GOOGLE_PLACES_KEY}
         `);
         const fetchPlaces = fetch(`
            ${googleMaps}/place/textsearch/json?query=${encodeURIComponent(phrase)}}&key=${process.env.GOOGLE_PLACES_KEY}  
         `);

         const resData = await Promise.all([
            fetcRegionCoords,
            fetchPlaces,
         ]).then((responses) =>
            Promise.all(responses.map((res) => res.json())),
         );

         if (resData) {
            const [regionCoords, places] = resData;
            const placesSorted = (places.results as MapPlace[])
               .sort((a, b) => b.rating - a.rating)
               .filter(({ types }) => !types.includes("colloquial_area"));

            resContent = {
               status: 200,
               data: {
                  coords: regionCoords.results[0].geometry?.location,
                  places: placesSorted,
               },
            };
         }
      }

      if (!regionName) {
         const getPlaces = await fetch(`
            ${googleMaps}/place/textsearch/json?query=${encodeURIComponent(phrase)}}&key=${process.env.GOOGLE_PLACES_KEY}  
         `);
         const resData = await getPlaces.json();

         if (resData) {
            resContent = {
               status: 200,
               data: {
                  places: resData.results,
               },
            };
         }
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
