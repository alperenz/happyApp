import React from "react";
import { Link } from "react-router-dom";

function NoPage() {
    return (
        <main className='h-screen w-full flex flex-col justify-center items-center'>
            <h1 className='text-9xl font-extrabold text-[#003F62] tracking-widest'>
                404
            </h1>
            <div className='bg-[#003F62] px-2 text-sm rounded rotate-12 absolute'></div>
            <Link to='/'>
                <button className='mt-5'>
                    <a className='relative inline-block text-sm font-medium text-white group active:text-primary-500 focus:outline-none focus:ring'>
                        <span className='absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-secondary-500 group-hover:translate-y-0 group-hover:translate-x-0'></span>

                        <span className='relative block px-8 py-3 bg-secondary-500 border border-current'>
                            Go Home
                        </span>
                    </a>
                </button>
            </Link>
        </main>
    );
}

export default NoPage;
