import { NextRequest, NextResponse } from "next/server";
import { Kafka } from "kafkajs";

interface RequestBody {
   name: string;
   id: string;
   click_location: "map" | "details";
}

const kafka = new Kafka({
   clientId: "nextjs-click-tracker",
   brokers: ["localhost:9092"],
});

const producer = kafka.producer();

export async function GET(req: NextRequest) {
   let resContent = {};

   try {
      const res = await fetch(
         `${process.env.NODE_SERVER_URL}/api/place-most-clicks`,
      );

      const data = await res.json();

      if (!data) {
         throw new Error("Server error");
      }

      resContent = {
         message: "success",
         status: 200,
         data: data.place,
      };
   } catch (error) {
      resContent = {
         message: `server error: ${error}`,
         status: 500,
      };
   } finally {
      return NextResponse.json(resContent);
   }
}

export async function POST(req: NextRequest) {
   const body: RequestBody = await req.json();
   const { name, id, click_location } = body;
   let resContent = {};

   try {
      if (!name || !id || !click_location) {
         throw new Error("All fields are required");
      }

      await producer.connect();
      const res = await producer.send({
         topic: "click-events",
         messages: [{ value: JSON.stringify({ name, id, click_location }) }],
      });

      if (!res) {
         throw new Error("server error");
      }

      resContent = {
         message: "success",
         status: 200,
      };
   } catch (error) {
      resContent = {
         message: `request rejected: ${error}`,
         status: 500,
      };
   } finally {
      return NextResponse.json(resContent);
   }
}
