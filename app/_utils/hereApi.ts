import { urls } from "./urls";

const url = urls();

export const hereAPI = {
   reverseGeocode: <T>(coordinates: Coords): Promise<T> =>
      fetch(
         `${url.hereRevgeocode}?at=${coordinates.lat},${coordinates.lng}&apikey=${process.env.NEXT_PUBLIC_HERE_MAP}`,
      )
         .then((res) => res.json())
         .then((data) => data.items[0])
         .catch((err) => {
            console.error("Error when using reverse geocoding:", err);
         }),
};
