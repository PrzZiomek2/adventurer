import { useTranslations } from "next-intl";
import { PlacesList } from "../../../parts/PlacesList";

interface PlacesNearbyListProps {
   places: MapPlace[];
   loadingData: boolean;
   clickedPlace: string;
   placeType: PlaceType;
   loadList: boolean | null;
}

export default function PlacesNearbyList({
   places,
   loadingData,
   clickedPlace,
   loadList,
}: PlacesNearbyListProps) {
   const t = useTranslations("suggestions");
   const noUserLocalizationInfo = (
      <div className="h-full px-12 flex text-lg justify-center items-center text-center order-2 lg:order-1">
         {t("userLocation")}
      </div>
   );

   return loadList ? (
      <PlacesList
         clickedPlace={clickedPlace}
         loadingData={loadingData}
         places={places}
         placeType="nearby"
      />
   ) : (
      noUserLocalizationInfo
   );
}
