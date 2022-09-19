import { useEffect, useState } from 'react'
import { Struct } from './components/Struct';
import { Header } from './components/Header';
import localStorageService from './services/localStorage.service';
import './App.scss'
import Routing from './Routing';
import { Nav } from './components/Nav';
import Geolocator from './components/Geolocator';

export const App = () => {
  const localStorageServiceInstance = new localStorageService();
  const userData = localStorageServiceInstance.getData('userData');
  const brandsData = localStorageServiceInstance.getData('brands');
  const [appData, setUser] = useState(userData);
  const [brands, setBrands] = useState<Record<string, any>[]>([]);
  useEffect(() => {
    if (brandsData.length > 1) {
      setBrands(brandsData);
      return;
    }
    fetch('http://localhost/cloudbistro/Shared/brand_kcode/KT7570')
      .then((response) => response.json())
      .then((data) => {
         setBrands(data);
         localStorageServiceInstance.saveData('brands', data);
      })
      .catch((err) => {
         console.log(err.message);
      });
  }, []);

  return (
    <div className="App" style={appStyle}>
      <Header data={appData} setData={setUser}/>
      <Nav user={appData}/>
      <Geolocator />
      <Routing />
    </div>
  )
}

const appStyle = {
  height:'100%',
  width:'100%',
  // border: '1px solid yellow'
}