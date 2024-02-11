"server-only";
import { HfInference } from "@huggingface/inference";

const inference = new HfInference(process.env.HF_TOKEN);

export const inferenceQuery = async (text: string) => {
   const languageModels = {
      "pl-en": "Helsinki-NLP/opus-mt-pl-en",
   };

   const translationResponse = await inference.translation({
      model: languageModels["pl-en"],
      inputs: text,
   });

   return translationResponse.translation_text;
};
