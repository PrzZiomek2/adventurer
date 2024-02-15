import * as bcrypt from "bcrypt";
import { serialize, parse } from "cookie";

import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "config/ddbDocClient";
import { NextResponse } from "next/server";
import { signJwtToken } from "app/_lib/jwt";
import { TableName } from "app/_types/enums";

interface RequestBody {
   email: string;
   password: string;
}

export async function POST(req: Request) {
   const body: RequestBody = await req.json();
   const { password, email } = body;
   let resContent = {};

   try {
      if (!password || !email) {
         throw new Error("Uzupełnij wszystkie pola");
      }

      const command = new GetCommand({
         TableName: TableName.USERS,
         Key: {
            email,
         },
      });

      const { Item } = await ddbDocClient.send(command);

      if (Item && (await bcrypt.compare(password, Item.password))) {
         const { password, userIP, email, ...userNoPassword } = Item;
         const accessToken = signJwtToken(userNoPassword);
         let tokenSerialized = "";

         if (accessToken) {
            tokenSerialized = serialize("jwt", accessToken || "", {
               httpOnly: true,
               secure: process.env.NODE_ENV === "production",
               sameSite: "strict",
               maxAge: 60 * 60 * 24 * 3,
               path: "/",
            });
         }

         resContent = {
            message: "Zalogowano",
            status: 200,
            user: {
               ...userNoPassword,
               ...(tokenSerialized && { jwtToken: parse(tokenSerialized) }),
            },
         };
      } else {
         throw new Error(
            "Nie znaleziono uzytkownika z podanym hasłem lub email",
         );
      }
   } catch (error) {
      resContent = {
         message: `Bład podczas logowania: ${error}`,
         status: 500,
      };
   } finally {
      return NextResponse.json(resContent);
   }
}
