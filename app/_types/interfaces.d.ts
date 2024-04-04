interface DestinationCriteria {
   tags: string[];
   disliked: string[];
   favourite: string[];
   temperature;
}

interface LoginFormValues {
   email: string;
   password: string;
}

interface RegisterFormValues {
   name: string;
   email: string;
   password: string;
}

interface NextResponseBasic {
   message: string;
   status: number;
   ok?: boolean | string;
}

interface User {
   id: string;
   name: string;
   email: string;
   createdAt: string;
   tokens: number;
}

interface SessionToken {
   email: string;
   exp: number;
   iat: number;
   jti: string;
   name: string;
   sub: string;
}

interface MapPlace {
   business_status: string;
   formatted_address: string;
   geometry: { location: { lat: number; lng: number } };
   icon: string;
   icon_background_color: string;
   icon_mask_base_uri: string;
   name: string;
   opening_hours: { open_now: boolean };
   photos: [
      {
         height: number;
         photo_reference: string;
         width: number;
      },
   ];
   place_id: string;
   plus_code: { compound_code: string; global_code: string };
   price_level: number;
   rating: number;
   reference: string;
   types: string[];
   user_ratings_total: number;
}

interface Coords {
   lat: number;
   lng: number;
}

interface PlaceCoords {
   lat: number;
   lng: number;
   place_id: string;
   name: string;
}

interface PlacesApiPostRes {
   data: {
      coords: Coords;
      places: MapPlace[];
   };
}

interface Region {
   value: string;
   label: string;
   coordinates: Coords;
}

interface PlaceDetails {
   adr_address: string;
   business_status: string;
   delivery: boolean;
   dine_in: boolean;
   formatted_address: string;
   formatted_phone_number: string;
   geometry: {
      location: {
         lat: number;
         lng: number;
      };
      viewport: {
         northeast: {
            lat: number;
            lng: number;
         };
         southwest: {
            lat: number;
            lng: number;
         };
      };
   };
   icon: string;
   icon_background_color: string;
   icon_mask_base_uri: string;
   international_phone_number: string;
   name: string;
   permanently_closed: boolean;
   photos: {
      height: number;
      html_attributions: string[];
      photo_reference: string;
      width: number;
   }[];
   place_id: string;
   plus_code: {
      compound_code: string;
      global_code: string;
   };
   price_level: number;
   rating: number;
   reference: string;
   reviews: {
      author_name: string;
      author_url: string;
      language: string;
      profile_photo_url: string;
      rating: number;
      relative_time_description: string;
      text: string;
      time: number;
   }[];
   serves_beer: boolean;
   serves_breakfast: boolean;
   serves_brunch: boolean;
   serves_dinner: boolean;
   serves_lunch: boolean;
   serves_vegetarian_food: boolean;
   serves_wine: boolean;
   takeout: boolean;
   types: string[];
   url: string;
   user_ratings_total: number;
   utc_offset: number;
   vicinity: string;
   website: string;
   wheelchair_accessible_entrance: boolean;
}
