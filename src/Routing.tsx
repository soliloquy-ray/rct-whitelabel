import { Routes, Route } from 'react-router-dom';
import { Brands } from './pages/Brands';
import { Home } from './pages/Home';
import { Checkout } from './pages/Checkout';
import { UserInfo } from './components/UserInfo';

const Routing = () => {
  return (         
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/brands/:code" element={<Brands />} />
      <Route path='/checkout' element={<Checkout />} />
    </Routes>
  );
}
export default Routing;