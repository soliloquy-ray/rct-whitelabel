import { Dispatch, SetStateAction, useEffect, useState } from "react";
import KeyValuePairList from "../models/key-value-pairs.interface";
import { distanceInKmBetweenEarthCoordinates, geoLocate } from "../utils/tools";
import './styles/Geolocator.scss';

const Geolocator = ({locationData, setLocData, setGeoDisabled, setLocationSet, geoDisabled, locationSet }: { locationData: string, setLocData: Dispatch<SetStateAction<string>>, setGeoDisabled: Dispatch<SetStateAction<boolean>>, setLocationSet: Dispatch<SetStateAction<boolean>>, geoDisabled: boolean, locationSet: boolean }) => {
  const storeLoc = import.meta.env.VITE_KITCHEN_GEOLOCATION;
  const [dist, setDist] = useState('0');

  const successCallback = (position: KeyValuePairList) => {
    const { coords } = position;
    const [ lat, long ] = storeLoc.split(",");
    const distance = distanceInKmBetweenEarthCoordinates(coords.latitude, coords.longitude, lat, long);
    setDist(Number(distance).toFixed(2));
    setLocData(coords.latitude+","+coords.longitude);
    setLocationSet(true);
  };
  
  const errorCallback = (error: KeyValuePairList) => {
    setGeoDisabled(true);
  };

  useEffect(() => {
    const coordsData = geoLocate(locationData);
    successCallback(coordsData)
  }, [locationData])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  return (
    <>
      <div className="geoLocator">
        {
          locationSet ? 
          (<h2> You are <b>{dist}</b> KM away from the restaurant!</h2>)
          :
          (<h2>We are unable to detect your location. Please enable tracking or select your current location manually. </h2> )
        }
          
      </div>
    </>
  )
};

export default Geolocator;