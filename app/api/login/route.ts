import * as bcrypt from "bcrypt";
import { serialize } from "cookie";

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
   try {
      const body: RequestBody = await req.json();
      const { password, email } = body;

      if (!password || !email) {
         return NextResponse.json({
            message: "Uzupełnij wszystkie pola",
            status: 500,
         });
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
         const tokenSerialized = serialize("jwt", accessToken || "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 3,
            path: "/",
         });
         console.log({ userNoPassword });

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
         message: `Bład podczas logowania: ${error}`,
         status: 500,
      });
   }
}
