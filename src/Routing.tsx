import { Routes, Route } from 'react-router-dom';
import { UserInfo } from './components/UserInfo';
import KeyValuePairList from './models/key-value-pairs.interface';
import { Dispatch, SetStateAction } from 'react';
import { Home } from './pages/Home';
import { BusinessProfiles } from './pages/BusinessProfiles';
import { AgentProfiles } from './pages/AgentProfiles';

const Routing = () => {
  return (         
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/businesses' element={<BusinessProfiles />} />
      <Route path='/agents' element={<AgentProfiles />} />
      {/* <Route path="/brands/:code" element={<Brands checkout={checkout} setCheckout={setCheckout}/>} /> */}
      {/* <Route path='/checkout' element={<Checkout />} /> */}
    </Routes>
  );
}
export default Routing;