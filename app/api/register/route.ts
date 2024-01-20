import { PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "config/ddbDocClient";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { TableName } from "app/types/enums";

export async function POST(req: Request) {
   try {
      const body = await req.json();
      const { name, password, email } = body as RegisterFormValues;
      console.log({ body });
      const headersList = headers();

      const params: PutCommandInput = {
         TableName: TableName.USERS,
         Item: {
            name,
            password,
            email,
            createdAt: new Date().toLocaleDateString(),
            id: crypto.randomUUID(),
            userIP: headersList.get("x-forwarded-for"),
            tokens: 5000,
         },
      };

      await ddbDocClient.send(new PutCommand(params));

      return NextResponse.json({
         message: "Rejestracja się udała",
         status: 201,
      });
   } catch (error) {
      return NextResponse.json({
         message: "Bład podczas rejestracji",
         status: 500,
      });
   }
}
