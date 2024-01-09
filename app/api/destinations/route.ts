import { NextResponse } from 'next/server';

import { provideDestination } from '../../../openAiCommands';
import { getOpenaiCompletion } from 'app/lib/openai';

export async function POST(req: Request) {
   const body = await req.json(); 
   const {tags, disliked, favourite, temperature} = body as DestinationCriteria; console.log({body});

   const content = provideDestination({
      tags, 
      disliked, 
      favourite
   });

   const completion = await getOpenaiCompletion({
      content,
      temperature
   })
   .catch(err => console.log(err)); 

   return NextResponse.json({ completion });
};
