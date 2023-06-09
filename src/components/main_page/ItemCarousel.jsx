import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;
export default function ItemCarousel() {
  const [products, setProducts] = React.useState([]);
  useEffect(() => {
    fetch(`${VITE_APP_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);
  return (
    <div className='w-full px-5 items-center justify-center flex'>
      <Swiper
        className='w-3/4'
        centeredSlidesBounds
        centeredSlides={true}
        autoplay={{
          delay: 1200,
        }}
        spaceBetween={5}
        slidesPerView={1}
        breakpoints={{
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        modules={[Autoplay]}
      >
        {products.map((product, i) => (
          <SwiperSlide key={i} className='flex items-center justify-center'>
            <Item product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function Item({ product }) {
  const navigate = useNavigate();
  function onBuyProduct(product) {
    let addedProduct = { ...product, quantity: 1 };
    fetch(`${VITE_APP_API_URL}/cart`)
      .then((res) => res.json())
      .then((fetchedCart) => {
        const newCart = { ...fetchedCart };
        newCart.products.push(addedProduct);
        newCart.totalProduct = newCart.products.length;
        newCart.total = newCart.products.reduce(
          (acc, cur) => acc + cur.price,
          0
        );
        newCart.totalQuantity = newCart.products.reduce(
          (acc, cur) => acc + cur.quantity,
          0
        );
        newCart.discountTotal = newCart.products.reduce(
          (acc, cur) =>
            acc + (cur.price - (cur.price * cur.discountPercentage) / 100),
          0
        );
        console.log(newCart);
        fetch(`${VITE_APP_API_URL}/cart`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCart),
        })
          .then((res) => res.json())
          .then((data) => {
            navigate("/cart");
          });
      });
  }

  return (
    <div className='w-[200px] h-[350px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-between'>
      <div style={{ height: 200 }}>
        <img
          className='p-8 rounded-t-lg'
          style={{ height: "100%", objectFit: "contain" }}
          src={product.thumbnail}
          alt='product image'
        />
      </div>
      <div className='px-5 '>
        <a>
          <h5 className='text-base font-semibold tracking-tight text-gray-900 dark:text-white'>
            {product.title}
          </h5>
          <p className='mt-1 text-lg font-medium text-gray-900'>
            ${product.price}
          </p>
          <button
            class='bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => {
              onBuyProduct(product);
            }}
          >
            Add to cart
          </button>
        </a>
      </div>
    </div>
  );
}
