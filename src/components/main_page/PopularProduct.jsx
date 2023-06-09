import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import items from "../../items";
const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;
export default function PopularProduct() {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${VITE_APP_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      });
  }, []);

  return (
    <div className='w-full flex flex-col justify-center items-center gap-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:w-[800px] sm:w-[500px] w-[300px]'>
        {items
          .slice(0, 19)
          .slice(6 * (currentPage - 1), 6 * currentPage)
          .map((item) => (
            <Item key={item.title} data={item} />
          ))}
      </div>

      <ul className='inline-flex items-center -space-x-px gap-2'>
        <li className='hover:cursor-pointer'>
          <a
            onClick={() => setCurrentPage(1)}
            aria-current='page'
            className='px-3 py-2 rounded-full leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          >
            1
          </a>
        </li>
        <li className='hover:cursor-pointer'>
          <a
            onClick={() => setCurrentPage(2)}
            className='px-3 py-2 rounded-full leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          >
            2
          </a>
        </li>
        <li className='hover:cursor-pointer'>
          <a
            onClick={() => setCurrentPage(3)}
            className='px-3 py-2 rounded-full leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          >
            3
          </a>
        </li>
      </ul>
    </div>
  );
}

function Item({ data }) {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    let addedProduct = { ...data, quantity: 1 };
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
  };
  return (
    <div className='w-full max-w-sm bg-white border hover:shadow-lg border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-400'>
      <a href='#'>
        <img
          className='p-8 rounded-t-lg'
          src={data.thumbnail}
          alt='product image'
        />
      </a>
      <div className='px-5 pb-5 flex flex-col gap-y-6'>
        <a href='#'>
          <h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
            {data.title}
          </h5>
        </a>
        <div className='flex items-center justify-between'>
          <span className='text-2xl font-bold text-gray-900 dark:text-white'>
            {data.price}
          </span>
          <a
            onClick={handleClick}
            className='select-none hover:cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Add to cart
          </a>
        </div>
      </div>
    </div>
  );
}
