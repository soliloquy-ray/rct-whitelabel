import KeyValuePairList from "../models/key-value-pairs.interface";
import './styles/Nav.scss'
import { Link } from 'react-router-dom';

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
        <li><Link to='/'>Home</Link></li>
        {/* <li><Link to='/brands'>Brands</Link></li> */}
        <li><Link to='/checkout'>Checkout</Link></li>
        {/* <li><a>Categories</a></li>
        <li><a>Products</a></li>
        <li><a>Inventory</a></li> */}
      </ul>
    </nav>
  );
}