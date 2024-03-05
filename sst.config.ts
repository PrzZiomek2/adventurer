import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
   config(_input) {
      return {
         name: "adventurer",
         region: "eu-central-1",
      };
   },
   stacks(app) {
      app.stack(function Site({ stack }) {
         const site = new NextjsSite(stack, "Site", {
            timeout: "30 seconds",
            memorySize: "2024 MB",
            environment: {
               NEXT_PUBLIC_NEXTAUTH_URL: process.env.NEXT_PUBLIC_NEXTAUTH_URL!,
               NEXT_PUBLIC_GOOGLE_MAPS_KEY:
                  process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
               NEXT_PUBLIC_GOOGLE_PLACES_KEY:
                  process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY!,
               NEXT_PUBLIC_GOOGLE_MAP_ID:
                  process.env.NEXT_PUBLIC_GOOGLE_MAP_ID!,
            },
         });

         stack.addOutputs({
            SiteUrl: site.url,
         });
      });
   },
} satisfies SSTConfig;
