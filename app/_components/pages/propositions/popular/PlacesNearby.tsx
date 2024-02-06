import { Map } from "@/components/common/Map/Map";
import { Heading } from "@/components/ui/Heading";

export const PlacesNearby = () => {
   return (
      <>
         <Heading
            className="col-span-full"
            variant="h2"
         >
            W okolicy
         </Heading>
         <Map userLocalized />
      </>
   );
};
