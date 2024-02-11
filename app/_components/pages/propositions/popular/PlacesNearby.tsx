import { Map } from "@/components/common/Map/Map";
import { Heading } from "@/components/ui/Heading";
import { getServerData } from "app/_utils/handlersApi";
import { urls } from "app/_utils/urls";

export const PlacesNearby = async () => {
   const { rootPath } = urls();
   const res = await fetch(
      `${rootPath}/api/places?category=bar|restaurant|tourist_attraction|cafe&radius=1000&location=52.237049,21.017532`,
   );
   const placesData = await res?.json();

   if (!placesData) return <div>Błąd podczas wyszukiwania</div>;

   return (
      <>
         <div className="flex flex-col gap-6">
            <Heading
               className="col-span-full"
               variant="h2"
            >
               W okolicy
            </Heading>
            <div>PlacesNearby</div>
         </div>
         <Map
            userLocalized
            places={placesData.data}
         />
      </>
   );
};
