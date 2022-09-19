import { useEffect, useState } from "react";

const Geolocator = () => {
  const storeLoc = import.meta.env.VITE_KITCHEN_GEOLOCATION;
  const [dist, setDist] = useState(0);
  
  const degreesToRadians = (degrees) => {
    return degrees * Math.PI / 180;
  }
  
  const distanceInKmBetweenEarthCoordinates = (lat1, lon1, lat2, lon2) => {
    const earthRadiusKm = 6371;
  
    const dLat = degreesToRadians(lat2-lat1);
    const dLon = degreesToRadians(lon2-lon1);
  
    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);
  
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return earthRadiusKm * c;
  }

  const successCallback = (position) => {
    const { coords } = position;
    const [ lat, long ] = storeLoc.split(",");
    const distance = distanceInKmBetweenEarthCoordinates(coords.latitude, coords.longitude, lat, long);
    setDist(Number(distance).toFixed(2));
  };
  
  const errorCallback = (error) => {
    console.log(error);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, [])

  return (
    <>
      <h2> You are {dist} KM away from the restaurant!</h2>
    </>
  )
};

export default Geolocator;