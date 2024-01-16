import { NextResponse } from 'next/server';

import { provideDestination } from '../../../openAiCommands';
import { getOpenaiCompletion } from 'app/lib/openai';
import { inferenceQuery } from 'app/lib/huggingface';
import { HfInference } from '@huggingface/inference';

export async function POST(req: Request) {
   const body = await req.json(); 
   const {tags, disliked, favourite, temperature} = body as DestinationCriteria; 

   const content = provideDestination({
      tags, 
      disliked, 
      favourite
   });

   return NextResponse.json({ completion: {} });
};
