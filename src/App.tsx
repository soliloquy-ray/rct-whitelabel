import { useState } from 'react'
import { Header } from './components/Header';
import localStorageService from './services/localStorage.service';
import './App.scss'
import Routing from './Routing';
import { Nav } from './components/Nav';
import Geolocator from './components/Geolocator';

export const App = () => {
  const localStorageServiceInstance = new localStorageService();
  const userData = localStorageServiceInstance.getData('userData');
  const [appData, setUser] = useState(userData);
  const [locationData, setLocData] = useState('');
  const [geoDisabled, setGeoDisabled] = useState(false);
  const [locationSet, setLocationSet] = useState(false);

  return (
    <div className="App" style={appStyle}>
      <Header data={appData} setData={setUser}  locationData={locationData} setLocData={setLocData} setLocationSet={setLocationSet} locationSet={locationSet} />
      <Nav user={appData}/>
      <Geolocator geoDisabled={geoDisabled} locationSet={locationSet} locationData={locationData} setLocData={setLocData} setGeoDisabled={setGeoDisabled} setLocationSet={setLocationSet}/>
      <Routing />
    </div>
  )
}

const appStyle = {
  height:'100%',
  width:'100%',
  // border: '1px solid yellow'
}