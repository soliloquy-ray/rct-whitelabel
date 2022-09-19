import { useEffect, useState } from 'react'
import { Struct } from '../components/Struct';
import localStorageService from '../services/localStorage.service';

export const Home = () => {
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
    <section className='Home'>
      <Struct data={appData} brands={brands} setBrands={setBrands}/>
    </section>
  )
}

const appStyle = {
  height:'100%',
  width:'100%',
  // border: '1px solid yellow'
}