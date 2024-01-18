import { NextResponse } from "next/server";

import { provideDestination } from "../../../openAiCommands";

export async function POST(req: Request) {
   const body = await req.json();
   const { tags, disliked, favourite, temperature } = body as DestinationCriteria;

   const content = provideDestination({
      tags,
      disliked,
      favourite,
   });

   return NextResponse.json({ completion: {} });
}
