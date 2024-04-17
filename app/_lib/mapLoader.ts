import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
   apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
   version: "weekly",
});

export const getMapLoader = (): Loader => {
   let loaderEl = null;
   if (!loaderEl) {
      loaderEl = loader;
   }

   return loaderEl;
};
