import { NextRequest, NextResponse } from "next/server";

import { urls } from "app/_utils/urls";

export async function GET(
   req: NextRequest,
   params: { params: { slug: string } },
) {
   const id = params.params.slug;
   const { googleMaps } = urls();
   let resContent = {};

   try {
      if (!id) {
         throw new Error("place id not provided");
      }

      const response = await fetch(
         `${googleMaps}/place/details/json?place_id=${id}&key=${process.env.GOOGLE_PLACES_KEY}`,
      );
      const resData = await response.json();

      if (resData?.error_message) {
         console.log(resData);
      }

      if (resData) {
         resContent = {
            status: 200,
            data: resData.result,
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
