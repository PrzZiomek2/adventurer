import { PlaceItem } from "./PlaceItem";
import { PlaceSkeleton } from "./PlaceSkeleton";
import { postServerData } from "app/_utils/handlersApi";

interface PlacesListProps {
   places: MapPlace[];
   loadingData: boolean;
   clickedPlace: string;
   placeType: PlaceType;
}

export const PlacesList = ({
   places,
   loadingData,
   clickedPlace,
   placeType,
}: PlacesListProps) => {
   const handlePlaceLinkClick = (name: string, id: string) => {
      if (!id) return;
      postServerData("click-tracking", {
         name,
         id,
         click_location: "details",
         place_type: placeType,
      });
   };

   const placeItems = places?.map((place) => (
      <PlaceItem
         key={place.place_id}
         place={place}
         highlight={clickedPlace === place.place_id}
         handlePlaceLinkClick={handlePlaceLinkClick}
      />
   ));

   const loadingSkeletons = Array.from({ length: 4 }).map((_, i) => (
      <PlaceSkeleton key={i} />
   ));

   return (
      <section
         className={`
               flex flex-col items-center gap-6 md:gap-4 pl-1 pr-2 md:pr-3 pt-1 pb-1
               max-h-[550px] wide:max-h-[600px] overflow-auto with-scroll
            `}
      >
         {loadingData && !places.length ? loadingSkeletons : placeItems}
      </section>
   );
};
