import * as bcrypt from "bcrypt";

import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { TableName } from "app/types/enums";
import { ddbDocClient } from "config/ddbDocClient";
import { NextResponse } from "next/server";
import { signJwtToken } from "app/lib/jwt";

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
      console.log({ Item });

      if (
         Item &&
         Item.user &&
         (await bcrypt.compare(password, Item.user.password))
      ) {
         const { password, ...userNoPassword } = Item.user;
         const accessToken = signJwtToken(userNoPassword);
         console.log();
         const result = {
            user: userNoPassword,
            accessToken,
         };
         return NextResponse.json({
            message: "Zalogowano",
            status: 200,
            result,
         });
      } else {
         throw new Error(
            "Nie znaleziono uzytkownika z podanym hasłem lub email",
         );
      }
   } catch (error) {
      return NextResponse.json({
         message: "Bład podczas logowania",
         status: 500,
      });
   }
}
