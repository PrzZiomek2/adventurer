import { PlaceItem } from "./PlaceItem";

interface PlacesListProps {
   places: MapPlace[];
}

export const PlacesList = ({ places }: PlacesListProps) => {
   return (
      <section
         className={`
         grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-h-[600px] overflow-auto
      `}
      >
         {places.map((place) => (
            <PlaceItem
               key={place.place_id}
               place={place}
            />
         ))}
      </section>
   );
};
