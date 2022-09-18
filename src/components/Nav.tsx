import React from "react";
import './styles/Nav.scss'

export const Nav = ({ user }) => {
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