import { useState } from 'react'
import { Header } from './components/Header';
import localStorageService from './services/localStorage.service';
import './App.scss'
import Routing from './Routing';
import { Nav } from './components/Nav';

export const App = () => {
  const localStorageServiceInstance = new localStorageService();
  const localData = localStorageServiceInstance.getData();
  const [data, setData] = useState(localData);

  return (
    <div className="App" style={appStyle}>
      <Header data={data} setData={setData}/>
      <Nav user={data}/>
      <Routing />
    </div>
  )
}

const appStyle = {
  height:'100%',
  width:'100%',
  border: '1px solid yellow'
}