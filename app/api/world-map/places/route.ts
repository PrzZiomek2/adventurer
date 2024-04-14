import { urls } from "app/_utils/urls";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
   body: google.maps.LatLngBounds | undefined;
}

export async function POST(req: NextRequest) {
   const body: RequestBody = await req.json();
   const { placeNearbyByArea } = urls();
   let resContent = {};

   try {
      if (!body) {
         throw new Error("bouding values not provided");
      }
      /* TO DO: get bounds values
      const southwest = body.getSouthWest();
      const northeast = body.getNorthEast();
      const boundArea = `${southwest.lat()},${southwest.lng()}|${northeast.lat()},${northeast.lng()}`;

      const getPlaces = await fetch(placeNearbyByArea(boundArea));
      const resData = await getPlaces.json();
      console.log({ resData });

      if (resData) {
         resContent = {
            status: 200,
            data: {
               places: resData.results,
            },
         };
      } */
   } catch (error) {
      resContent = {
         message: `error when connecting place API: ${error}`,
         status: 500,
      };
   } finally {
      return NextResponse.json(resContent);
   }
}
