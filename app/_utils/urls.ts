export const urls = () => ({
   rootPath: process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_NEXTAUTH_URL,
   googleMaps: `https://maps.googleapis.com/maps/api`,
   hereRevgeocode: "https://revgeocode.search.hereapi.com/v1/revgeocode",
   googleGeocodingAPI: "https://maps.googleapis.com/maps/api/geocode/json",
   placeNearbyByArea: (area: string) =>
      `${urls().googleMaps}/place/nearbysearch/json?type=locality&viewport=${area}&key=${process.env.GOOGLE_PLACES_KEY}`,
});
