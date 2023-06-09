import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VITE_APP_API_URL = import.meta.env.VITE_APP_API_URL;

const SignIn = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("serenareyes@zizzle.com");
  const [password, setPassword] = useState("123");


  useEffect(() => {
    axios.get(`${VITE_APP_API_URL}/users`).then((res) => {
      setUsers(res.data)
    });
  }, []);

  const handleSubmit = (e) => {
    console.log({ email, password })
    e.preventDefault();
    const user = users.find((user) => user.email === email);
    console.log(user)
    if (user) {
      if (user.password === password) {
        toast.success("Giriş Başarılı");
        localStorage.setItem("user", JSON.stringify(user));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error("Şifre Hatalı");
      }
    }
    else {
      toast.error("Kullanıcı Bulunamadı");
    }


  };

  return (
    <section className='dark:bg-gray-900 flex justify-center items-center h-full'>
      <div className='flex justify-center h-full py-8 px-4 mx-auto max-w-screen-xl lg:py-16'>
        <div className='w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800'>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
            Happy'e gırış yap
          </h2>
          <form className='mt-8 space-y-6' action='#'>
            <div>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Maıl Adresı
              </label>
              <input
                type='email'
                name='email'
                id='email'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='name@company.com'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='flex items-start'>
              <div className='flex items-center h-5'>
                <input
                  id='remember'
                  aria-describedby='remember'
                  name='remember'
                  type='checkbox'
                  className='w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600'
                  required
                />
              </div>
              <div className='ml-3 text-sm'>
                <label
                  htmlFor='remember'
                  className='font-medium text-gray-500 dark:text-gray-400'
                >
                  Benı Hatırla
                </label>
              </div>
              <a
                href='#'
                className='ml-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500'
              >
                Şıfre mı unuttunuz?
              </a>
            </div>
            <button
              type='submit'
              className='w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              onClick={handleSubmit}
            >
              Giriş Yap
            </button>
            <div className='text-sm font-medium text-gray-900 dark:text-white'>
              Henuz hesabınız yok mu ?{" "}
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
};

export default SignIn;
