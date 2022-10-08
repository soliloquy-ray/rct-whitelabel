import { useState } from 'react'
import { Header } from './components/Header';
import localStorageService from './services/localStorage.service';
import './App.scss'
import './components/styles/Header.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routing from './Routing';
import { Nav } from './components/Nav';

export const App = () => {
  const localStorageServiceInstance = new localStorageService();
  const {user, token} = localStorageServiceInstance.getData();
  const [data, setData] = useState(user);

  return (
    <div className="App" style={appStyle}>
      <Header data={data} setData={setData}/>
      {
        data ? (<Nav user={data}/>) : (<></>)
      }
      <Routing />
    </div>
  )
}

const appStyle = {
  height:'100%',
  width:'100%',
  border: '1px solid yellow'
}