import React, { useState } from "react";

export default function Contact() {
  const [data, setData] = useState({
    name: undefined,
    email: undefined,
    message: undefined,
  });

  return (
    <div className='container mx-auto py-8'>
      <div className='max-w-md mx-auto bg-white rounded-lg shadow-md p-8'>
        <h2 className='text-2xl font-semibold mb-4'>İletişim</h2>
        <form>
          <div className='mb-4'>
            <label htmlFor='name' className='block font-medium'>
              Adınız
            </label>
            <input
              type='text'
              id='name'
              value={data?.name}
              onChange={(e) => setData({ ...data, name: e.target.data })}
              name='name'
              className='border-gray-300 border rounded-lg px-4 py-2 w-full'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='block font-medium'>
              E-posta Adresiniz
            </label>
            <input
              type='email'
              id='email'
              value={data?.email}
              onChange={(e) => setData({ ...data, email: e.target.data })}
              name='email'
              className='border-gray-300 border rounded-lg px-4 py-2 w-full'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='message' className='block font-medium'>
              Mesajınız
            </label>
            <textarea
              id='message'
              value={data?.message}
              onChange={(e) => setData({ ...data, message: e.target.data })}
              name='message'
              rows='4'
              className='border-gray-300 border rounded-lg px-4 py-2 w-full'
              required
            ></textarea>
          </div>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg'
          >
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
}
