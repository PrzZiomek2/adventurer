import { NextResponse } from 'next/server';

export async function POST(req: Request) {
   try {
      const body = await req.json();  
      const {name, password, email} = body as RegisterFormValues; 
      console.log({body});
      
      return NextResponse.json({
         message: "Rejestracja się udała",
         status: 201,
      });
   } 
   catch (error) {
      return NextResponse.json({
         message: "Bład podczas rejestracji",
         status: 500,
      });
   }
};
