import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import KeyValuePairList from '../models/key-value-pairs.interface';
import { UserInfo } from './UserInfo'
import { cities } from "../assets/ph";
import { closestLocation, Coordinates, distanceInKmBetweenEarthCoordinates, geoLocate } from '../utils/tools';

type Header = {
  data: KeyValuePairList;
  setData: Dispatch<SetStateAction<Record<string, any>[]>>;
  locationData: string;
  setLocData: Dispatch<SetStateAction<string>>;
  locationSet: boolean;
  setLocationSet: Dispatch<SetStateAction<boolean>>;
  setGeoDisabled: Dispatch<SetStateAction<boolean>>;
}

export const Header = ({ data, setData, locationData, setLocData, locationSet, setLocationSet, setGeoDisabled }: Header) => {
  const user = data?.user;
  const token = data?.token;
  const [dist, setDist] = useState('0');
  const storeLoc = import.meta.env.VITE_KITCHEN_GEOLOCATION;

  const successCallback = (position: any) => {
    const { coords } = position;
    const [ lat, long ] = storeLoc.split(",");
    const distance = distanceInKmBetweenEarthCoordinates(Number(coords.latitude), Number(coords.longitude), lat, long);
    setDist(Number(distance).toFixed(2));
    const closest = closestLocation(coords);
    setLocData(closest.lat+","+closest.lng);
    setLocationSet(true);
  };
  
  const errorCallback = (error: KeyValuePairList) => {
    setGeoDisabled(true);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  const locChangeHandler = (e: any) => {
    const coordsData = geoLocate(e.target.value);
    successCallback(coordsData);
  }
  return (
    <>
      <header className="Header">
        <section>
          <span>
            <img src="/img/logo.png"/>
          </span>
          
          <main className="geoLocator">
            <form>
              <div className="form-group">
                <label>Your location: </label>
                <select id='locSelector' value={locationData} onChange={locChangeHandler} >
                  <option disabled value={''}></option>
                  {
                    cities.map((ct, cIndex) => {
                      return (
                        <option key={cIndex} value={`${ct.lat},${ct.lng}`}>{ct.city}</option>
                      )
                    })
                  }
                </select>
              </div>
            </form>
          </main>
          <UserInfo user={user} token={token} setData={setData} />
        </section>
      </header>
    </>
  )
}

Header.defaultProps = {

}

Header.propTypes = {
  
}


