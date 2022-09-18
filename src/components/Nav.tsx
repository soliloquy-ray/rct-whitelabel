import React from "react";
import KeyValuePairList from "../models/key-value-pairs.interface";
import './styles/Nav.scss'

type Nav = {
  user: KeyValuePairList;
}

export const Nav = ({ user }: Nav) => {
  if (!user) return (
    <></>
  );
  return (
    <nav>
      <ul>
        <li><a>Business Profiles</a></li>
        <li><a>Agent Profiles</a></li>
        <li><a>Brands</a></li>
        <li><a>Categories</a></li>
        <li><a>Products</a></li>
        <li><a>Inventory</a></li>
      </ul>
    </nav>
  );
}