import * as bcrypt from "bcrypt";
import { serialize } from "cookie";

import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "config/ddbDocClient";
import { NextResponse } from "next/server";
import { signJwtToken } from "app/lib/jwt";
import { TableName } from "app/types/enums";

interface RequestBody {
   email: string;
   password: string;
}

export async function POST(req: Request) {
   try {
      const body: RequestBody = await req.json();
      const { password, email } = body;
      const command = new GetCommand({
         TableName: TableName.USERS,
         Key: {
            email,
         },
      });

      const { Item } = await ddbDocClient.send(command);

      if (Item && (await bcrypt.compare(password, Item.password))) {
         const { password, userIP, ...userNoPassword } = Item;
         const accessToken = signJwtToken(userNoPassword);
         const tokenSerialized = serialize("jwt", accessToken || "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 3,
            path: "/",
         });

         return NextResponse.json({
            message: "Zalogowano",
            status: 200,
            user: userNoPassword,
         });
      } else {
         throw new Error(
            "Nie znaleziono uzytkownika z podanym hasłem lub email",
         );
      }
   } catch (error) {
      return NextResponse.json({
         message: `Bład serwera podczas logowania: ${error}`,
         status: 500,
      });
   }
}
