import React from "react";
import Product from "../components/Product";

const Cardiovascular = ({ products }) => {
  const productsArray = products.map((product, i) => (
    <Product data={product} key={i} />
  ));

  return productsArray;
};

export default Cardiovascular;
