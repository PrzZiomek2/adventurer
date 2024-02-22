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
