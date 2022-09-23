import { Routes, Route } from 'react-router-dom';
import { Brands } from './pages/Brands';
import { Home } from './pages/Home';
import { Checkout } from './pages/Checkout';
import { UserInfo } from './components/UserInfo';
import KeyValuePairList from './models/key-value-pairs.interface';
import { Dispatch, SetStateAction } from 'react';

const Routing = ({ checkout, setCheckout }: {checkout: KeyValuePairList[], setCheckout: Dispatch<SetStateAction<KeyValuePairList[]>>}) => {
  return (         
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/brands/:code" element={<Brands checkout={checkout} setCheckout={setCheckout}/>} />
      <Route path='/checkout' element={<Checkout />} />
    </Routes>
  );
}
export default Routing;