import React from "react";
import MainCarousel from "../components/main_page/MainCarousel";
import ItemCarousel from "../components/main_page/ItemCarousel";
import PopularProduct from "../components/main_page/PopularProduct";

export default function MainPage() {
  return (
    <div className='h-full flex flex-col gap-y-32'>
      <MainCarousel />
      <ItemCarousel />
      <PopularProduct />
    </div>
  );
}
