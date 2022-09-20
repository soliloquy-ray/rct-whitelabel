import { useEffect, useState } from 'react'
import localStorageService from '../services/localStorage.service';

export const Checkout = () => {
  const localStorageServiceInstance = new localStorageService();
  const userData = localStorageServiceInstance.getData('userData');
  const brandsData = localStorageServiceInstance.getData('brands');
  useEffect(() => {
  }, []);

  return (
    <section className='Checkout'>
      <h1>Checkout Page!</h1>
    </section>
  )
}

const appStyle = {
  height:'100%',
  width:'100%',
  // border: '1px solid yellow'
}