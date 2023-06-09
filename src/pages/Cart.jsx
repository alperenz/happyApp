import React, { useEffect, useState } from "react";
import SuccessPurchaseModal from "../components/modal/SuccessPurchaseModal";

const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;

function Cart() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch(`${VITE_APP_API_URL}/cart`)
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
        console.log(data.discountTotal);
      });
  }, []);

  function updateCart(newCart) {
    newCart.total = newCart.products.reduce((acc, product) => {
      return acc + product.total;
    }, 0);
    newCart.discountedTotal = newCart.products.reduce((acc, product) => {
      return acc + product.discountedPrice;
    }, 0);
    newCart.totalQuantity = newCart.products.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);
    newCart.totalProducts = newCart.products.length;
    fetch(`${VITE_APP_API_URL}/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCart),
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
      });
  }

  function deleteProductFromCart(product) {
    const newCart = { ...cart };
    newCart.products = newCart.products.filter((p) => p.id !== product.id);
    newCart.total = newCart.products.reduce((acc, product) => {
      return acc + product.total;
    }, 0);
    newCart.discountedTotal = newCart.products.reduce((acc, product) => {
      return acc + product.discountedPrice;
    }, 0);
    newCart.totalQuantity = newCart.products.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);
    newCart.totalProducts = newCart.products.length;
    fetch(`${VITE_APP_API_URL}/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCart),
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
      });
  }

  function resetCart() {
    fetch(`${VITE_APP_API_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: cart?.id,
        products: [],
        total: 0,
        discountedTotal: 0,
        userId: cart?.userId,
        totalProducts: 0,
        totalQuantity: 0,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
      });
  }

  if (!cart?.products?.length)
    return (
      <div className='flex w-screen h-screen flex-col items-center justify-center'>
        <svg
          className='w-12 h-12 text-gray-500'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
        </svg>
        <h2 className='mt-2 text-lg font-medium text-gray-500'>
          Your basket is empty
        </h2>
        <p className='mt-1 text-sm text-gray-400'>
          Start adding items to your basket.
        </p>
      </div>
    );
  else
    return (
      <div className='h-screen pt-20'>
        <h1 className='mb-10 text-center text-2xl font-bold'>Cart Items</h1>
        <div className='mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0'>
          <div className='rounded-lg md:w-2/3'>
            {cart?.products?.map((product, idx) => (
              <div
                key={idx}
                className='justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start'
              >
                <img
                  src={product?.thumbnail}
                  alt='product-image'
                  className='w-full rounded-lg sm:w-40'
                />
                <div className='sm:ml-4 sm:flex sm:w-full sm:justify-between'>
                  <div className='mt-5 sm:mt-0'>
                    <h2 className='text-lg font-bold text-gray-900'>
                      {product?.title}
                    </h2>
                  </div>
                  <div className='mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6'>
                    <div className='flex items-center border-gray-100'>
                      <span
                        className='cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-primary-500 hover:text-primary-50'
                        onClick={(e) => {
                          const newCart = { ...cart };
                          newCart.products[idx].quantity--;
                          newCart.products[idx].total =
                            newCart.products[idx].quantity *
                            newCart.products[idx].price;
                          newCart.products[idx].discountedPrice = Math.floor(
                            newCart.products[idx].total -
                              newCart.products[idx].total *
                                (newCart.products[idx].discountPercentage / 100)
                          );
                          if (newCart.products[idx].quantity === 0) {
                            newCart.products = newCart.products.filter(
                              (p) => p.id !== product.id
                            );
                          }
                          setCart(newCart);
                          updateCart(newCart);
                        }}
                      >
                        {" "}
                        -{" "}
                      </span>
                      <input
                        className='h-8 w-16 border bg-white text-center text-black text-xs outline-none'
                        type='number'
                        min={0}
                        value={product?.quantity}
                        onChange={(e) => {
                          const newCart = { ...cart };
                          newCart.products[idx].quantity = e.target.value;
                          newCart.products[idx].total =
                            newCart.products[idx].quantity *
                            newCart.products[idx].price;
                          newCart.products[idx].discountedPrice = Math.floor(
                            newCart.products[idx].total -
                              newCart.products[idx].total *
                                (newCart.products[idx].discountPercentage / 100)
                          );
                          setCart(newCart);
                          updateCart(newCart);
                        }}
                      />
                      <span
                        className='cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-primary-500 hover:text-primary-50'
                        onClick={() => {
                          const newCart = { ...cart };
                          newCart.products[idx].quantity++;
                          newCart.products[idx].total =
                            newCart.products[idx].quantity *
                            newCart.products[idx].price;
                          newCart.products[idx].discountedPrice = Math.floor(
                            newCart.products[idx].total -
                              newCart.products[idx].total *
                                (newCart.products[idx].discountPercentage / 100)
                          );
                          if (newCart.products[idx].quantity === 0) {
                            newCart.products = newCart.products.filter(
                              (p) => p.id !== product.id
                            );
                          }
                          setCart(newCart);
                          updateCart(newCart);
                        }}
                      >
                        {" "}
                        +{" "}
                      </span>
                    </div>
                    <div className='flex items-center space-x-4'>
                      <p className='text-xs line-through'>
                        {product?.price} TL
                      </p>
                      <p className='text-sm'>
                        {product?.price -
                          (product?.price * product?.discountPercentage) /
                            100}{" "}
                        TL
                      </p>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='h-5 w-5 cursor-pointer duration-150 hover:text-red-500'
                        onClick={() => {
                          deleteProductFromCart(product);
                        }}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M6 18L18 6M6 6l12 12'
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <!-- Sub total --> */}
          <div className='mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3'>
            <div className='mb-2 flex justify-between'>
              <p className='text-gray-700'>Total</p>
              <p className='text-gray-700'>{cart?.total} TL</p>
            </div>
            <div className='flex justify-between'>
              <p className='text-gray-700'>Discount</p>
              <p className='text-gray-700'>
                {parseFloat(cart?.total - cart?.discountTotal).toFixed(2)} TL
              </p>
            </div>
            <hr className='my-4' />
            <div className='flex justify-between'>
              <p className='text-lg font-bold'>Total</p>
              <div className=''>
                <p className='mb-1 text-lg font-bold'>
                  {parseFloat(cart?.discountTotal).toFixed(2)} TL
                </p>
                <p className='text-sm text-gray-700'>including KDV</p>
              </div>
            </div>
            <button
              className='mt-6 w-full rounded-md bg-primary-500 py-1.5 font-medium text-white hover:bg-primary-600'
              onClick={() => setShowSuccessModal(true)}
            >
              Check out
            </button>
          </div>
        </div>
        <SuccessPurchaseModal
          showModal={showSuccessModal}
          setShowModal={setShowSuccessModal}
          resetCart={resetCart}
        />
      </div>
    );
}

export default Cart;
