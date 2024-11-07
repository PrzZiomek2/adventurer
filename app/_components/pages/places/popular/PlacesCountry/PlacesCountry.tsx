"use client";
import { UserLocationContext } from "@/components/context/UserLocationProvider";
import { useContext, useEffect, useState } from "react";
import { PlacesList } from "../../parts/PlacesList";
import { Map } from "@/components/common/Map/Map";
import { hereAPI } from "app/_utils/hereApi";
import { postServerData } from "app/_utils/handlersApi";
import { getPlacesCoords } from "app/_utils/handlers";
import { MapPlacesContainer } from "../../parts/MapPlacesContainer";
import { PlacesCountryOptions } from "./parts/PlacesCountryOptions";

export const PlacesCountry = () => {
   const { coords } = useContext(UserLocationContext);
   const [clickedPlace, setClickedPlace] = useState("");
   const [places, setPlaces] = useState<MapPlace[]>([]);
   const [countryLocation, setCountryLocation] = useState<Coords>();
   const [placesLoading, setPlacesLoading] = useState(false);
   const [currentCountry, setCurrentCountry] = useState("Poland");

   const userPosition = coords
      ? {
           lat: coords.latitude,
           lng: coords.longitude,
        }
      : { lat: 52.4, lng: 16.9 };

   const fetchPlaces = async (name: string) => {
      if (!name) return;
      const results = await postServerData<
         PlacesApiPostRes & NextResponseBasic
      >("places", {
         phrase: `most interesting and popular tourist places in ${name}`,
         regionName: name,
      });
      if (results.data) {
         setPlaces(results.data.places);
         setCountryLocation(results.data.coords);
      }
   };

   useEffect(() => {
      const getPlaces = async () => {
         try {
            setPlacesLoading(true);
            const decodeRes =
               await hereAPI.reverseGeocode<CountryRes>(userPosition);
            if (decodeRes) {
               const name = decodeRes?.address.countryName;
               setCurrentCountry(name);
               await fetchPlaces(name);
            }
         } catch (err) {
            console.log(err);
         } finally {
            setPlacesLoading(false);
         }
      };

      if (userPosition.lat && userPosition.lng) {
         getPlaces();
      }
   }, [userPosition?.lat, userPosition?.lng]);

   useEffect(() => {
      if (!currentCountry) return;
      const getPlaces = async () => {
         try {
            setPlacesLoading(true);
            await fetchPlaces(currentCountry);
         } catch (err) {
            console.log(err);
         } finally {
            setPlacesLoading(false);
         }
      };
      getPlaces();
   }, [currentCountry]);

   const handlePlaceClick = (place: PlaceCoords) => {
      const { name, id } = place;
      if (!id) return;
      setClickedPlace(id);
      postServerData("click-tracking", {
         name,
         id,
         click_location: "map",
         place_type: "country",
      });
   };

   const placesCoords = places && getPlacesCoords(places);

   return (
      <MapPlacesContainer>
         <PlacesCountryOptions
            currentCountry={currentCountry}
            setCurrentCountry={setCurrentCountry}
         />
         <PlacesList
            clickedPlace={clickedPlace}
            places={places}
            loadingData={placesLoading}
            placeType="country"
         />
         <Map
            userLocalized
            places={placesCoords}
            placeClickHandler={handlePlaceClick}
            mapSettings={{
               center: countryLocation || { lat: 51.919, lng: 19.14 },
               zoom: 5,
            }}
         />
      </MapPlacesContainer>
   );
};
