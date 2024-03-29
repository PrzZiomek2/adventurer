"use client";
import { UserLocationContext } from "@/components/context/UserLocationProvider";
import { useContext, useEffect, useState } from "react";
import { PlacesList } from "../../parts/PlacesList";
import { Map } from "@/components/common/Map/Map";
import { hereAPI } from "app/_utils/hereApi";
import { getServerData, postServerData } from "app/_utils/handlersApi";
import { getPlacesCoords } from "app/_utils/handlers";
import { MapPlacesContainer } from "../../parts/MapPlacesContainer";
import { PlacesCountryOptions } from "./parts/PlacesCountryOptions";

type CountryRes = {
   address: {
      countryName: string;
      countryCode: string;
   };
};

export const PlacesCountry = () => {
   const { coords } = useContext(UserLocationContext);
   const [clickedPlace, setClickedPlace] = useState("");
   const [places, setPlaces] = useState<MapPlace[]>([]);
   const [countryLocation, setCountryLocation] = useState<Coords>();
   const [placesLoading, setPlacesLoading] = useState(false);
   const [currentCountry, setCurrentCountry] = useState("Poland");
   const [cities, setCities] = useState<string[]>([]);

   const userPosition = coords
      ? {
           lat: coords.latitude,
           lng: coords.longitude,
        }
      : { lat: 52.4, lng: 16.9 };

   useEffect(() => {
      const getPlaces = async () => {
         try {
            setPlacesLoading(true);
            const decodeRes =
               await hereAPI.reverseGeocode<CountryRes>(userPosition);
            if (decodeRes) {
               const name = decodeRes?.address.countryName;
               setCurrentCountry(name);
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
      const getCities = async () => {
         try {
            const results = await getServerData<{ data: MapPlace[] }>(
               `places/country?name=${currentCountry}`,
            );
            console.log({ results });

            if (results.data) {
            }
            setCities(cities);
         } catch (err) {
            console.log(err);
         }
      };

      getCities();
   }, [currentCountry]);
   console.log({ cities });

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
         />
         <Map
            userLocalized
            places={placesCoords}
            setClickedPlace={setClickedPlace}
            mapSettings={{
               center: countryLocation || { lat: 51.919, lng: 19.14 },
               zoom: 6,
            }}
         />
      </MapPlacesContainer>
   );
};
