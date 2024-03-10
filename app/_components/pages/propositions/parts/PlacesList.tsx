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
   const placeItems = places.map((place) => (
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
               flex flex-col items-center gap-6 pr-1 md:pr-3 pt-3 pb-1
               max-h-[500px] wide:max-h-[600px] overflow-auto with-scroll
            `}
      >
         {loadingData && !places.length ? loadingSkeletons : placeItems}
      </section>
   );
};
