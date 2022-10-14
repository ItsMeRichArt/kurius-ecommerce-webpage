import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "boxicons";
import { Carrito } from "../component/Carrito/Carrito";
import "../../styles/index.css";
import { ProductList } from "../component/Products/ProductList";
import { ReviewsCarousel } from "../component/ReviewsCarousel";
import { Carousel } from "../component/Carousel";
import { ProductosPrivados } from "../component/Products/ProductosPrivados";
import { Barras } from "../component/Products/Barras";


export const Home = () => {
  const [color, changeColor] = useState("#ffffff");
  document.body.style.backgroundColor = color;

  const { store, actions } = useContext(Context)

  return (
    <>
      <Carousel />  
      <Carrito />
      <ProductosPrivados products={store.products.result} />
    </>
  );
};
