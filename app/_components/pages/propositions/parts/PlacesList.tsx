import { WithLoader } from "@/components/ui/Loader/WithLoader";
import { PlaceItem } from "./PlaceItem";

interface PlacesListProps {
   places: MapPlace[];
   loadingData: boolean;
}

export const PlacesList = ({ places, loadingData }: PlacesListProps) => {
   return (
      <WithLoader loading={loadingData && !places.length}>
         <section
            className={`
               grid grid-cols-1 gap-5 md:p-3
               max-h-[600px] overflow-auto with-scroll
            `}
         >
            {places.map((place) => (
               <PlaceItem
                  key={place.place_id}
                  place={place}
               />
            ))}
         </section>
      </WithLoader>
   );
};
