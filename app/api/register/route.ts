import { PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import { headers } from "next/headers";
import { ddbDocClient } from "config/ddbDocClient";
import { TableName } from "app/_types/enums";

export async function POST(req: Request) {
   let resContent = {};
   const body = await req.json();
   const { name, password, email } = body as RegisterFormValues;

   try {
      if (!name || !password || !email) {
         throw new Error("Uzupełnij wszystkie pola");
      }

      if (process.env.NODE_ENV === "production") {
         throw new Error("registration not working in this version");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const params: PutCommandInput = {
         TableName: TableName.USERS,
         Item: {
            name,
            password: hashedPassword,
            email,
            createdAt: new Date().toLocaleDateString(),
            id: crypto.randomUUID(),
            tokens: 5000,
         },
         ConditionExpression: "attribute_not_exists(email)",
      };

      await ddbDocClient.send(new PutCommand(params));

      resContent = {
         message: "Rejestracja się udała",
         status: 201,
      };
   } catch (error) {
      resContent = {
         message: `Bład podczas rejestracji: ${error}`,
         status: 500,
      };
   } finally {
      return NextResponse.json(resContent);
   }
}
