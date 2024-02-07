import { Map } from "@/components/common/Map/Map";
import { Heading } from "@/components/ui/Heading";

export const PlacesNearby = () => {
   return (
      <>
         <div className="flex gap-6">
            <Heading
               className="col-span-full"
               variant="h2"
            >
               W okolicy
            </Heading>
            <div>PlacesNearby</div>
         </div>
         <Map userLocalized />
      </>
   );
};
