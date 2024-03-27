import { PlaceItem } from "./PlaceItem";
import { PlaceSkeleton } from "./PlaceSkeleton";

interface PlacesListProps {
   places: MapPlace[];
   loadingData: boolean;
   clickedPlace: string;
}

export const PlacesList = ({
   places,
   loadingData,
   clickedPlace,
}: PlacesListProps) => {
   const placeItems = places?.map((place) => (
      <PlaceItem
         key={place.place_id}
         place={place}
         highlight={clickedPlace === place.place_id}
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
