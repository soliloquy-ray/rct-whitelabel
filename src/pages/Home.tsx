import { useEffect, useState } from 'react'
import { Struct } from '../components/Struct';
import ApiService from '../services/api.service';
import localStorageService from '../services/localStorage.service';

export const Home = () => {
  const localStorageServiceInstance = new localStorageService();
  const apiServiceInstance = new ApiService();
  const userData = localStorageServiceInstance.getData('userData');
  const brandsData = localStorageServiceInstance.getData('brands');
  const [appData, setUser] = useState(userData);
  const [brands, setBrands] = useState<Record<string, any>[]>([]);
  /* useEffect(() => {
    if (brandsData.length > 1) {
      setBrands(brandsData);
      return;
    }
    apiServiceInstance.get(`Shared/brand_kcode/KT7570`).then((response) => {
      setBrands(response);
      localStorageServiceInstance.saveData('brands', response);
    });
  }, []); */

  return (
    <main className='page Home' style={appStyle}>
      <Struct data={appData}/>
    </main>
  )
}

const appStyle = {
  height:'100%',
  width:'100%',
  // border: '1px solid yellow'
}