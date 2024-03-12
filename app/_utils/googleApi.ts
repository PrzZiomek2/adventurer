import { urls } from "./urls";

const url = urls();
// TOP DO: move google requests toi the api
export const googleAPI = {
   /*   geocode: <T>(address: string): Promise<T> =>
      fetch(
         `${url.googleMaps}geocode/json?address=${address}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY}`,
      )
         .then((res) => res.json())
         .then((data) => data.items[0])
         .catch((err) => {
            console.error("Error when using reverse geocoding:", err);
         }), */
};
