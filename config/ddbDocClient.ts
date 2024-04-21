import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const ddbClient = new DynamoDBClient({
   region: "eu-central-1",
   credentials: {
      accessKeyId: process.env.DB_ACCESS_KEY_ID!,
      secretAccessKey: process.env.DB_SECRET_ACCESS_KEY!,
   },
});

const marshallOptions = {
   convertEmptyValues: false,
   removeUndefinedValues: true,
   convertClassInstanceToMap: false,
};

const unmarshallOptions = {
   wrapNumbers: false,
};

const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, {
   marshallOptions,
   unmarshallOptions,
});

export { ddbDocClient };
