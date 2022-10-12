import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import "boxicons";
import { Carrito } from "../component/Carrito/Carrito";
import "../../styles/index.css";
import { ProductList } from "../component/Products/ProductList";
import { ReviewsCarousel } from "../component/ReviewsCarousel";
import { Carousel } from "../component/Carousel";
import { ProductosPrivados } from "../component/Products/ProductosPrivados";

export const Home = () => {
  const { store, actions } = useContext(Context)

  return (
    <>
      <Carousel />
      <Carrito />
      <h2 className="border-bottom mx-5">Nuestros Productos</h2>
      <div className="productos">
        <ProductosPrivados products={store.products.result} />
      </div>
      <ReviewsCarousel />
    </>
  );
};
