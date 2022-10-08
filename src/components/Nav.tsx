import './styles/Nav.scss'
import { Link } from 'react-router-dom';
import KeyValuePairList from '../models/key-value-pairs.interface';

type Nav = {
  user: KeyValuePairList;
}

export const Nav = ({ user }: Nav) => {
  /* if (!user) return (
    <></>
  ); */
  return (
    <nav>
      <ul>
        <li><Link to='/'><img src="./vite.svg"/></Link></li>
        <li><Link to='/businesses'>Business Profiles</Link></li>                
        <li><Link to='/agents'>Agent Profiles</Link></li>
        <li><Link to='brands'>Brands</Link></li>
        <li><Link to='categories'>Categories</Link></li>
        <li><Link to='products'>Products</Link></li>
        <li><Link to='inventory'>Inventory</Link></li>
        {/* <li><Link to='/brands'>Brands</Link></li> */}
        {/* <li><Link to='/checkout'>Checkout</Link></li> */}
        {/* <li><a>Categories</Link></li>
        <li><a>Products</Link></li>
        <li><a>Inventory</Link></li> */}
      </ul>
    </nav>
  );
}