/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
    colors: {
      'primary-100': '#E6F6FF',
      'primary-200': '#BFE3FF',
      'primary-300': '#99D0FF',
      'primary-400': '#4DA9FF',
      'primary-500': '#003F62',
      'primary-600': '#003A58',
      'primary-700': '#00263A',
      'primary-800': '#001C2D',
      'primary-900': '#00121F',
      'secondary-100': '#FFF5E6',
      'secondary-200': '#FFEBC0',
      'secondary-300': '#FFE0A0',
      'secondary-400': '#FFCD5F',
      'secondary-500': '#EDA415',
      'secondary-600': '#D49E0F',
      'secondary-700': '#8F6709',
      'secondary-800': '#6B4F07',
      'secondary-900': '#473706',


    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

