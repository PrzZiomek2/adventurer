interface DestinationCriteria{
   tags: string[];
   disliked: string[];
   favourite: string[];
   temperature
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