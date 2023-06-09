import clsx from 'clsx'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;

function Products() {
    const navigate = useNavigate();
    const [sortPopup, setSortPopup] = React.useState(false);
    const [filterPopup, setFilterPopup] = React.useState(false);
    const [products, setProducts] = React.useState([])
    const [categoryFilter, setCategoryFilter] = React.useState([])
    const [colorFilter, setColorFilter] = React.useState('')

    const handleCategorySelect = (e) => {
        if (e.target.checked) {
            setCategoryFilter([...categoryFilter, e.target.value])
        }
        else {
            setCategoryFilter(categoryFilter.filter(category => category !== e.target.value))
        }
    }

    const handleColorSelect = (e) => {
        if (colorFilter === e.target.value) {
            setColorFilter('')
            return;
        }
        setColorFilter(e.target.value)
    }

    const handleSortSelect = (e) => {
        if (parseInt(e.target.name) === 0) {
            setProducts(products.sort((a, b) => b.rating - a.rating))
        } else if (parseInt(e.target.name) === 1) {
            setProducts(products.sort((a, b) => a.price - b.price))
        } else if (parseInt(e.target.name) === 2) {
            setProducts(products.sort((a, b) => b.price - a.price))
        }
    }

    useEffect(() => {
        fetch(`${VITE_APP_API_URL}/products`)
            .then(res => res.json())
            .then(data => {
                setProducts(data)
            })
    }, [])


    function onBuyProduct(product) {
        let addedProduct = { ...product, quantity: 1 }
        fetch(`${VITE_APP_API_URL}/cart`)
            .then((res) => res.json())
            .then((fetchedCart) => {
                const newCart = { ...fetchedCart };
                newCart.products.push(addedProduct);
                newCart.totalProduct = newCart.products.length;
                newCart.total = newCart.products.reduce((acc, cur) => acc + cur.price, 0);
                newCart.totalQuantity = newCart.products.reduce((acc, cur) => acc + cur.quantity, 0);
                newCart.discountTotal = newCart.products.reduce((acc, cur) => acc + (cur.price - (cur.price * cur.discountPercentage / 100)), 0);
                console.log(newCart)
                fetch(`${VITE_APP_API_URL}/cart`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newCart),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        navigate("/cart")
                    });
            });
    }

    return (

        <div className="bg-white">
            <div>
                <div className={`relative z-40 lg:hidden ${clsx(
                    {
                        'block': filterPopup,
                        'hidden': !filterPopup,
                    }
                )}`} role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-black bg-opacity-25"></div>
                    <div className="fixed inset-0 z-40 flex">
                        <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                <button type="button" className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400" onClick={
                                    () => {
                                        setFilterPopup(!filterPopup)
                                    }

                                }>
                                    <span className="sr-only">Close menu</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            {/* <!-- Filters --> */}
                            <form className="mt-4 border-t border-gray-200">

                                <div className="border-t border-gray-200 px-4 py-6">
                                    <h3 className="-mx-2 -my-3 flow-root">
                                        {/* <!-- Expand/collapse section button --> */}
                                        <button type="button" className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-0" aria-expanded="false">
                                            <span className="font-medium text-gray-900">Color</span>
                                            <span className="ml-6 flex items-center">
                                                {/* <!-- Expand icon, show/hide based on section open state. --> */}
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                                </svg>
                                                {/* <!-- Collapse icon, show/hide based on section open state. --> */}
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        </button>
                                    </h3>
                                    {/* <!-- Filter section, show/hide based on section state. --> */}
                                    <div className="pt-6" id="filter-section-mobile-0">
                                        <div className="space-y-6">
                                            <div className="flex items-center">
                                                <input onClick={handleColorSelect} id="filter-mobile-color-0" name="color[]" value="white" type="radio" className="h-4 w-4 rounded border-gray-300 text-secondary-600 focus:ring-secondary-500" />
                                                <label htmlFor="filter-mobile-color-0" className="ml-3 min-w-0 flex-1 text-gray-500">White</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input onClick={handleColorSelect} id="filter-mobile-color-1" name="color[]" value="beige" type="radio" className="h-4 w-4 rounded border-gray-300 text-secondary-600 focus:ring-secondary-500" />
                                                <label htmlFor="filter-mobile-color-1" className="ml-3 min-w-0 flex-1 text-gray-500">Beige</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input onClick={handleColorSelect} id="filter-mobile-color-2" name="color[]" value="blue" type="radio" className="h-4 w-4 rounded border-gray-300 text-secondary-600 focus:ring-secondary-500" />
                                                <label htmlFor="filter-mobile-color-2" className="ml-3 min-w-0 flex-1 text-gray-500">Blue</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input onClick={handleColorSelect} id="filter-mobile-color-3" name="color[]" value="brown" type="radio" className="h-4 w-4 rounded border-gray-300 text-secondary-600 focus:ring-secondary-500" />
                                                <label htmlFor="filter-mobile-color-3" className="ml-3 min-w-0 flex-1 text-gray-500">Brown</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input onClick={handleColorSelect} id="filter-mobile-color-4" name="color[]" value="green" type="radio" className="h-4 w-4 rounded border-gray-300 text-secondary-600 focus:ring-secondary-500" />
                                                <label htmlFor="filter-mobile-color-4" className="ml-3 min-w-0 flex-1 text-gray-500">Green</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input onClick={handleColorSelect} id="filter-mobile-color-5" name="color[]" value="purple" type="radio" className="h-4 w-4 rounded border-gray-300 text-secondary-600 focus:ring-secondary-500" />
                                                <label htmlFor="filter-mobile-color-5" className="ml-3 min-w-0 flex-1 text-gray-500">Purple</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 px-4 py-6">
                                    <h3 className="-mx-2 -my-3 flow-root">
                                        {/* <!-- Expand/collapse section button --> */}
                                        <button type="button" className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-1" aria-expanded="false">
                                            <span className="font-medium text-gray-900">Category</span>
                                            <span className="ml-6 flex items-center">
                                                {/* <!-- Expand icon, show/hide based on section open state. --> */}
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                                </svg>
                                                {/* <!-- Collapse icon, show/hide based on section open state. --> */}
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        </button>
                                    </h3>
                                    {/* <!-- Filter section, show/hide based on section state. --> */}
                                    <div className="pt-6" id="filter-section-mobile-1">
                                        <div className="space-y-6">
                                            <div className="flex items-center">
                                                <input onClick={handleCategorySelect} id="filter-mobile-category-0" name="category[]" value="smartphones" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-secondary-600 focus:ring-secondary-500" />
                                                <label htmlFor="filter-mobile-category-0" className="ml-3 min-w-0 flex-1 text-primary-600">Smart Phones</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input onClick={handleCategorySelect} id="filter-mobile-category-1" name="category[]" value="laptops" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-secondary-600 focus:ring-secondary-500" />
                                                <label htmlFor="filter-mobile-category-1" className="ml-3 min-w-0 flex-1 text-gray-500">Laptops</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input onClick={handleCategorySelect} id="filter-mobile-category-2" name="category[]" value="fragrances" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-secondary-600 focus:ring-secondary-500" />
                                                <label htmlFor="filter-mobile-category-2" className="ml-3 min-w-0 flex-1 text-gray-500">Fragrances</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input onClick={handleCategorySelect} id="filter-mobile-category-3" name="category[]" value="skincare" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-secondary-600 focus:ring-secondary-500" />
                                                <label htmlFor="filter-mobile-category-3" className="ml-3 min-w-0 flex-1 text-gray-500">Skin Care</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input onClick={handleCategorySelect} id="filter-mobile-category-4" name="category[]" value="groceries" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-secondary-600 focus:ring-secondary-500" />
                                                <label htmlFor="filter-mobile-category-4" className="ml-3 min-w-0 flex-1 text-gray-500">Groceries</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-primary-600">New Arrivals</h1>

                        <div className="flex items-center">
                            <div className="relative inline-block text-left" onClick={
                                () => {
                                    setSortPopup(!sortPopup)
                                }
                            }>
                                <div>
                                    <button type="button" className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" id="menu-button" aria-expanded="false" aria-haspopup="true">
                                        Sort
                                        <svg className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                                <div className={`absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none ${clsx({
                                    'hidden': !sortPopup,
                                })}`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                    <div className="py-1" role="none">
                                        <a href="#" onClick={handleSortSelect} name="0" className="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">Best Rating</a>
                                        <a href="#" onClick={handleSortSelect} name="1" className="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">Price: Low to High</a>
                                        <a href="#" onClick={handleSortSelect} name="2" className="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-4">Price: High to Low</a>
                                    </div>
                                </div>
                            </div>

                            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <button type="button" className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden" onClick={
                                () => {
                                    setFilterPopup(!filterPopup)
                                }

                            }>
                                <span className="sr-only">Filters</span>
                                <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">Products</h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* <!-- Filters --> */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                <div className="border-b border-gray-200 py-6">
                                    <h3 className="-my-3 flow-root">
                                        {/* <!-- Expand/collapse section button --> */}
                                        <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                                            <span className="font-medium text-gray-900">Color</span>
                                            <span className="ml-6 flex items-center">
                                                {/* <!-- Expand icon, show/hide based on section open state. --> */}
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                                </svg>
                                                {/* <!-- Collapse icon, show/hide based on section open state. --> */}
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        </button>
                                    </h3>
                                    {/* <!-- Filter section, show/hide based on section state. --> */}
                                    <div className="pt-6" id="filter-section-0">
                                        <div className="space-y-4">
                                            <div className="flex items-center">
                                                <input onClick={handleColorSelect} id="filter-color-0" name="color[]" value="white" type="radio" className="h-4 w-4 rounded border-gray-300 text-secondary-600 focus:ring-secondary-500" />
                                                <label htmlFor="filter-color-0" className="ml-3 text-sm text-gray-600">White</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input onClick={handleColorSelect} id="filter-color-1" name="color[]" value="beige" type="radio" className="h-4 w-4 rounded border-gray-300 text-secondary-600 focus:ring-secondary-500" />
                                                <label htmlFor="filter-color-1" className="ml-3 text-sm text-gray-600">Beige</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input onClick={handleColorSelect} id="filter-color-2" name="color[]" value="blue" type="radio" className="h-4 w-4 rounded border-gray-300 text-secondary-600 focus:ring-secondary-500" />
                                                <label htmlFor="filter-color-2" className="ml-3 text-sm text-gray-600">Blue</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input onClick={handleColorSelect} id="filter-color-3" name="color[]" value="brown" type="radio" className="h-4 w-4 rounded border-gray-300 text-secondary-600 focus:ring-secondary-500" />
                                                <label htmlFor="filter-color-3" className="ml-3 text-sm text-gray-600">Brown</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input onClick={handleColorSelect} id="filter-color-4" name="color[]" value="green" type="radio" className="h-4 w-4 rounded border-gray-300 text-secondary-600 focus:ring-secondary-500" />
                                                <label htmlFor="filter-color-4" className="ml-3 text-sm text-gray-600">Green</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input onClick={handleColorSelect} id="filter-color-5" name="color[]" value="purple" type="radio" className="h-4 w-4 rounded border-gray-300 text-secondary-600 focus:ring-secondary-500" />
                                                <label htmlFor="filter-color-5" className="ml-3 text-sm text-gray-600">Purple</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-b border-gray-200 py-6">
                                    <h3 className="-my-3 flow-root">
                                        {/* <!-- Expand/collapse section button --> */}
                                        <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-1" aria-expanded="false">
                                            <span className="font-medium text-gray-900">Category</span>
                                            <span className="ml-6 flex items-center">
                                                {/* <!-- Expand icon, show/hide based on section open state. --> */}
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                                </svg>
                                                {/* <!-- Collapse icon, show/hide based on section open state. --> */}
                                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        </button>
                                    </h3>
                                    {/* <!-- Filter section, show/hide based on section state. --> */}
                                    <div className="pt-6" id="filter-section-1">
                                        <div className="space-y-4">
                                            <div className="flex items-center">
                                                <input onClick={handleCategorySelect} id="filter-category-0" name="category[]" value="smartphones" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-secondary-600 focus:ring-secondary-500" />
                                                <label htmlFor="filter-category-0" className="ml-3 text-sm text-primary-600">Smart Phones</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input onClick={handleCategorySelect} id="filter-category-1" name="category[]" value="laptops" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-secondary-600 focus:ring-secondary-500" />
                                                <label htmlFor="filter-category-1" className="ml-3 text-sm text-gray-600">Laptops</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input onClick={handleCategorySelect} id="filter-category-2" name="category[]" value="fragrances" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-secondary-600 focus:ring-secondary-500" />
                                                <label htmlFor="filter-category-2" className="ml-3 text-sm text-gray-600">Fragrances</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input onClick={handleCategorySelect} id="filter-category-3" name="category[]" value="skincare" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-secondary-600 focus:ring-secondary-500" />
                                                <label htmlFor="filter-category-3" className="ml-3 text-sm text-gray-600">Skin Care</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input onClick={handleCategorySelect} id="filter-category-4" name="category[]" value="groceries" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-secondary-600 focus:ring-secondary-500" />
                                                <label htmlFor="filter-category-4" className="ml-3 text-sm text-gray-600">Groceries</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input onClick={handleCategorySelect} id="filter-category-5" name="category[]" value="home-decoration" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-secondary-600 focus:ring-secondary-500" />
                                                <label htmlFor="filter-category-5" className="ml-3 text-sm text-gray-600">Home Decoration</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            {/* <!-- Product grid --> */}
                            <div className="lg:col-span-3">
                                <div className="bg-white">
                                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                                        <h2 className="sr-only">Products</h2>

                                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                            {
                                                products
                                                    .filter(product => !categoryFilter.length || categoryFilter.includes(product.category))
                                                    .filter(product => !colorFilter || product.color === colorFilter)
                                                    .map(product => (
                                                        <a key={product.title} href="#" className="group">
                                                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                                                <img src={product.thumbnail} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." className="h-full w-full object-cover object-center group-hover:opacity-75" />
                                                            </div>
                                                            <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                                                            <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                                                            <button class="bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
                                                                onBuyProduct(product)
                                                            }}>
                                                                Buy Now
                                                            </button>
                                                        </a>
                                                    ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>

    )
}

export default Products