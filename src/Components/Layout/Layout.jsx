
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import Banner from '../Banner/Banner'

export default function Layout() {
  
  return (
    <>
      <Banner/>
      <Navbar/>
      <div className="container bg-[url(src/assets/images/light-patten.svg)]">
        <Outlet/>
      </div>
      <Footer/>
    </>
  )
}
