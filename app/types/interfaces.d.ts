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
}

interface User {
   id: string;
   name: string;
   email: string;
   createdAt: string;
   tokens: number;
}

interface Session {
   data: {
      expires: string;
      token: {
         email: string;
         exp: number;
         iat: number;
         jti: string;
         name: string;
         sub: string;
      };
      user: {
         createdAt: string;
         email: string;
         id: string;
         name: string;
         tokens: number;
      };
   };
   status: string;
   update: Function;
}
