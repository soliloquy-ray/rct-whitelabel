import { useState } from 'react'
import { Header } from './components/Header';
import localStorageService from './services/localStorage.service';
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import Routing from './Routing';
import { Nav } from './components/Nav';
import Geolocator from './components/Geolocator';
import KeyValuePairList from './models/key-value-pairs.interface';

export const App = () => {
  const localStorageServiceInstance = new localStorageService();
  const userData = localStorageServiceInstance.getData('userData');
  const [appData, setUser] = useState(userData);
  const [locationData, setLocData] = useState('');
  const [geoDisabled, setGeoDisabled] = useState(false);
  const [locationSet, setLocationSet] = useState(false);
  const [checkout, setCheckout] = useState<KeyValuePairList[]>([]);

  return (
    <div className="App" style={appStyle}>
      <Header data={appData} setData={setUser}  locationData={locationData} setLocData={setLocData} setLocationSet={setLocationSet} locationSet={locationSet} setGeoDisabled={setGeoDisabled} checkout={checkout} />
      <Nav user={appData}/>
      <Geolocator geoDisabled={geoDisabled} locationSet={locationSet} locationData={locationData} setLocData={setLocData} setGeoDisabled={setGeoDisabled} setLocationSet={setLocationSet}/>
      <Routing checkout={checkout} setCheckout={setCheckout} />
    </div>
  )
}

const appStyle = {
  height:'100%',
  width:'100%',
  // border: '1px solid yellow'
}