import React, { useEffect, useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;


export default function Register() {
  const navigate = useNavigate();
  const [userForCreate, setUserForCreate] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });


  function registerUser(data) {
    fetch(`${VITE_APP_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/signin")
      });
  }

  function onSubmitRegister(e) {
    e.preventDefault();
    if (userForCreate.password !== userForCreate.passwordConfirm) {
      alert("Şifreler aynı değil");
      return;
    }
    e.preventDefault();
    const { email, password } = userForCreate;
    registerUser({ id: uuidv4(), email, password });
  }

  return (
    <section className='dark:bg-gray-900 flex justify-center items-center h-full'>
      <div className='flex justify-center h-full py-8 px-4 mx-auto max-w-screen-xl lg:py-16'>
        <div className='w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800'>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
            Happy'e kayit ol
          </h2>
          <form className='mt-8 space-y-6' action='#' onSubmit={onSubmitRegister}>
            <div>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Mail Adresi
              </label>
              <input
                type='email'
                name='email'
                id='email'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='name@company.com'
                required
                value={userForCreate.email}
                onChange={(e) =>
                  setUserForCreate({ ...userForCreate, email: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Şifre
              </label>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='••••••••'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                required
                value={userForCreate.password}
                onChange={(e) =>
                  setUserForCreate({
                    ...userForCreate,
                    password: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Şifre Tekrar
              </label>
              <input
                type='password'
                name='passwordConfirm'
                id='passwordConfirm'
                placeholder='••••••••'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                required
                value={userForCreate.passwordConfirm}
                onChange={(e) =>
                  setUserForCreate({
                    ...userForCreate,
                    passwordConfirm: e.target.value,
                  })
                }
              />
            </div>
            <div className='flex items-start'>

              <a
                href='#'
                className='ml-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500'
              >
                Şifre mi unuttunuz?
              </a>
            </div>
            <button
              type='submit'
              className='w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Giriş Yap
            </button>
            <div className='text-sm font-medium text-gray-900 dark:text-white'>
              Henuz hesabiniz yok mu ?{" "}
              <a
                href=' http://localhost:5173/register'
                className='href text-blue-600 hover:underline dark:text-blue-500'
              >
                Hesap Olustur
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
