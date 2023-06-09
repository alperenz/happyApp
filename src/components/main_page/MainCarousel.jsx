import React from "react";
import { Link, useNavigate } from "react-router-dom";
export default function MainCarousel() {
  const navigate = useNavigate();

  const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;

  const appleProduct = {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    images: [
      {
        src: "https://i.dummyjson.com/data/products/1/1.jpg",
        description: "Alperen buraya girecek",
      },
      {
        src: "https://i.dummyjson.com/data/products/1/4.jpg",
        description: "alperen buraya girecek",
      },
    ],
  };

  function onBuyProduct() {
    let addedProduct = { ...appleProduct, quantity: 1 };
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
    <div className='bg-gray-50'>
      <div className='mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8'>
        {/* Details section */}
        <section aria-labelledby='details-heading'>
          <div className='flex flex-col items-center text-center'>
            <h2
              id='details-heading'
              className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'
            >
              {appleProduct.title}
            </h2>
            <p className='mt-3 max-w-3xl text-lg text-gray-600'>
              {appleProduct.description}
            </p>
          </div>

          <div className='mt-16 grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8'>
            <div>
              <div className='aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg'>
                <img
                  src={appleProduct.images[0].src}
                  alt='...'
                  className='h-full w-full object-cover object-center cursor-pointer'
                  onClick={onBuyProduct}
                />
              </div>
              <p className='mt-8 text-base text-gray-500'>
                {appleProduct.images[0].description}
              </p>
            </div>
            <div>
              <div className='aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg'>
                <img
                  onClick={onBuyProduct}
                  src={appleProduct.images[1].src}
                  alt='Front zipper pouch with included key ring.'
                  className='h-full w-full object-cover object-center cursor-pointer'
                />
              </div>
              <p className='mt-8 text-base text-gray-500'>
                {appleProduct.images[1].description}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
