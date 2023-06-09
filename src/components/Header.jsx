import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuth = localStorage.getItem("user");
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch(`${VITE_APP_API_URL}/cart`)
            .then((res) => res.json())
            .then((data) => {
                setCart(data);
            });
    }, []);

    return (
        <nav className='bg-primary-500 border-gray-200'>
            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
                <Link to='/' className='flex items-center'>
                    <img
                        src='/icon/medipol.png'
                        className='h-8 mr-3'
                        alt='Medipol Logo'
                    />
                    <span className='self-center text-2xl  font-semibold whitespace-nowrap text-white'>
                        Happy
                    </span>
                </Link>
                <div className='flex md:order-2'>
                    <button
                        type='button'
                        data-collapse-toggle='navbar-search'
                        aria-controls='navbar-search'
                        aria-expanded='false'
                        className='md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1'
                    >
                        <svg
                            className='w-5 h-5'
                            aria-hidden='true'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fillRule='evenodd'
                                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                                clipRule='evenodd'
                            ></path>
                        </svg>
                        <span className='sr-only'>Search</span>
                    </button>
                    <div className='relative hidden md:block'>
                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <svg
                                className='w-5 h-5 text-gray-500'
                                aria-hidden='true'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                                    clipRule='evenodd'
                                ></path>
                            </svg>
                            <span className='sr-only'>Search icon</span>
                        </div>
                        <input
                            type='text'
                            id='search-navbar1'
                            className='block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-secondary-500 focus:border-secondary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary-500 dark:focus:border-secondary-500'
                            placeholder='Search...'
                        />
                    </div>

                    <button
                        data-collapse-toggle='navbar-search'
                        type='button'
                        className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                        aria-controls='navbar-search'
                        aria-expanded='false'
                    >
                        <span className='sr-only'>Open menu</span>
                        <svg
                            className='w-6 h-6'
                            aria-hidden='true'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fillRule='evenodd'
                                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                                clipRule='evenodd'
                            ></path>
                        </svg>
                    </button>
                </div>
                <div
                    className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
                    id='navbar-search'
                >
                    <div className='relative mt-3 md:hidden'>
                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <svg
                                className='w-5 h-5 text-gray-500'
                                aria-hidden='true'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                                    clipRule='evenodd'
                                ></path>
                            </svg>
                        </div>
                        <input
                            type='text'
                            id='search-navbar2'
                            className='block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-secondary-500 focus:border-secondary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-secondary-500 dark:focus:border-secondary-500'
                            placeholder='Search...'
                        />
                    </div>
                    <ul className='flex flex-col p-4 md:p-0 mt-4 font-medium md:flex-row md:space-x-8 md:mt-0 md:border-0'>
                        <li>
                            <Link
                                to='/'
                                className={`block py-2 pl-3 pr-4 text-white rounded md:p-0  ${clsx(
                                    {
                                        "border-b-2 border-secondary-500":
                                            location.pathname === "/",
                                    }
                                )}`}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='about'
                                className={`block py-2 pl-3 pr-4 text-white rounded md:p-0  ${clsx(
                                    {
                                        "border-b-2 border-secondary-500":
                                            location.pathname === "/about",
                                    }
                                )}`}
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/contact'
                                className={`block py-2 pl-3 pr-4 text-white rounded md:p-0  ${clsx(
                                    {
                                        "border-b-2 border-secondary-500":
                                            location.pathname === "/contact",
                                    }
                                )}`}
                            >
                                Contant
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/products'
                                className={`block py-2 pl-3 pr-4 text-white rounded md:p-0  ${clsx(
                                    {
                                        "border-b-2 border-secondary-500":
                                            location.pathname === "/products",
                                    }
                                )}`}
                            >
                                Products
                            </Link>
                        </li>
                    </ul>
                </div>
                {!isAuth ? (
                    <div className='flex space-x-4 items-center md:order-3'>
                        <Link to='/signin' className='text-white text-sm'>
                            LOGIN
                        </Link>
                        <Link
                            to='/register'
                            className='bg-secondary-600 px-4 py-2 rounded text-white hover:bg-secodary-500 text-sm'
                        >
                            SIGNUP
                        </Link>
                    </div>
                ) : (
                    <div className='flex space-x-4 items-center md:order-3'>
                        <div
                            className='bg-red-600 px-4 py-2 rounded text-white hover:bg-secodary-500 text-sm'
                            onClick={() => {
                                localStorage.removeItem("user");
                                navigate("/signin");
                            }}
                        >
                            LOGOUT
                        </div>
                    </div>
                )}
                <Link to='/cart' className=' md:order-4'>
                    <div className='relative py-2 cursor-pointer'>
                        <div className='t-0 absolute left-3'>
                            <p className='flex h-2 w-2 items-center justify-center rounded-full bg-secondary-500 p-3 text-xs text-white'>
                                {cart?.totalQuantity}
                            </p>
                        </div>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='#fff'
                            className='file: mt-4 h-6 w-6'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                            />
                        </svg>
                    </div>
                </Link>
            </div>
        </nav>
    );
}
