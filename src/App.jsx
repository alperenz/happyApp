import "swiper/css"
import Footer from "./components/Footer"
import Header from "./components/Header"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
function App() {

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="w-full flex items-center justify-center">
        <div className="w-full max-w-[1300px]">
          <Outlet />
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  )
}

export default App
