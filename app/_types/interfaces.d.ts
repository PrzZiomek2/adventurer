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

// interface Session {
//    data: {
//       expires: string;
//       token: SessionToken;
//       user: User
//    };
//    status: string;
//    update: Function;
// }
