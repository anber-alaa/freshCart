import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { authContext } from '../../Context/AuthContext'
import Logo from '../../assets/images/logo.png'
import shoppingCart from '../../assets/images/minilogo.png'
import { LogIn, LogOut, ShoppingBasket, UserPlus } from 'lucide-react'
import { cartContext } from '../../Context/CartContext'
import { wishlistContext } from '../../Context/WishlistContext'
import facebook from '../../assets/images/facebook.png'
import instagram from '../../assets/images/instagram.png'
import twitter from '../../assets/images/twitter.png'
import linkedin from '../../assets/images/linkedin.png'
import { motion } from "framer-motion";


export default function Navbar() {

  const { token, setToken } = useContext(authContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {cart} = useContext(cartContext)
  const {wishlist , productIds} = useContext(wishlistContext)
  const hasWishlistItems  = productIds.length > 0;
  let [cartCounter, setCounter] = useState(cart?.numOfCartItems)
  let [wishCounter, setWishCounter] = useState(wishlist?.numOfCartItems)


  const logout = ()=>{
    localStorage.removeItem('token')
    setToken(null)
    setTimeout(()=>{
      navigate('/login')
    },200)
  }

  const toggleMobileMenu = ()=>{
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() =>{
      setCounter(cart?.numOfCartItems)
      setWishCounter(wishlist?.numOfCartItems)
  },[cart,wishlist])

  return (
    <>
    <nav className={`sticky top-0 bg-mainColor text-gray-800 tracking-wide z-50 transition-all duration-300`}>
        
      <section className="flex items-center flex-wrap lg:justify-center gap-4 py-2 sm:px-10 px-4 border-gray-200 border-b min-h-[70px]">
        
        <Link to={'/'} className="max-sm:hidden"><img src={Logo} alt="logo" className="w-30" />
        </Link>
        <Link to={'/'} className="hidden max-sm:block"><img src={shoppingCart} alt="logo" className="w-9" />
        </Link>
        
        {/* Cart , wishlist , logout , login , register */}
        <ul className="lg:absolute lg:right-10 flex items-center ml-auto space-x-4">
          {token && (
            <>
              {/* whishList */}
              <li>
                <NavLink to={'/wishlist'} className="relative group">
                  <motion.svg
                    whileHover={{
                      rotate: [0, -25, 25, -20, 20, -10, 10, 0],
                      x: [0, -8, 8, -6, 6, -4, 4, 0],
                      transition: { duration: 1.8, ease: "easeInOut" },
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill={hasWishlistItems ? "currentColor" : "none"}
                    stroke={hasWishlistItems ? "#00C88C" : "currentColor"}
                    strokeWidth="2.5"
                    className={`lucide lucide-heart-icon lucide-heart cursor-pointer transition-colors duration-300 ${
                      hasWishlistItems ? 'text-secondaryColor font-bold' : 'text-gray-800'
                    }`}
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  </motion.svg>
                  {wishCounter > 0 && (
                    <span className="absolute left-auto -ml-1 top-0 rounded-full bg-secondaryColor px-1 py-0 text-xs min-w-[15px] text-center text-white">
                    {wishlist?.numOfCartItems}
                  </span>
                  )}
                </NavLink>
              </li>
              {/* cart */}
              <li>
                <NavLink to={'/cart'} className="relative group">
                <ShoppingBasket size={24} strokeWidth={1.25} />
                  {cartCounter > 0 && (
                    <span className="absolute left-auto -ml-2 top-0 rounded-full bg-secondaryColor px-1 py-0 text-xs min-w-[15px] text-center text-white">
                    {cart?.numOfCartItems}
                  </span>
                  )}
                </NavLink>
              </li>
              {/* social media icons */}
              <ul className="hidden lg:flex items-center ml-auto gap-1">
                {[facebook, instagram, twitter, linkedin].map((icon, index) => (
                  <li key={index}>
                    <Link className="block p-1 hover:-translate-y-2 transition-all duration-300">
                      <img
                        src={icon}
                        alt={`icon-${index}`}
                        className="size-3.5 object-contain"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Logout */}
              <li className='hidden lg:block cursor-pointer group' onClick={logout}>
                <span className={`hover:text-green-700 transition-colors duration-300 text-sm flex flex-col items-center`}>
                        <LogOut size={16} strokeWidth={2.5} />
                  LogOut
                </span>
              </li>
            </>
          )}
          
          {!token && (
            <>
              <li>
                <NavLink to={'/login'} className={({ isActive }) =>
                  `flex  flex-col items-center cursor-pointer hover:text-green-700 transition-colors duration-300 ${
                    isActive ? 'text-green-700' : 'text-gray-800'
                  }`}>
                  <LogIn size={16} strokeWidth={2.5} />
                  Login
                </NavLink>
              </li>

              <li>
                <NavLink to="/register" className={({ isActive }) =>
                  `flex  flex-col items-center cursor-pointer hover:text-green-700 transition-colors duration-300 ${
                    isActive ? 'text-green-700' :'text-gray-800'
                  }`}>
                    <UserPlus size={16} strokeWidth={2.5} />
                    Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </section>

      {/* Desktop */}
      {token && (
        <>
        <div className="flex flex-wrap justify-center px-4 lg:py-3 relative bg-mainColor">
      
          {/* Navigation links */}
            <ul className="hidden lg:flex items-center gap-4">
                  <li>
                    <NavLink to={'/'} className={({isActive})=>`max-lg:px-3 hover:text-secondaryColor transition-all duration-100 ${isActive? 'font-bold text-secondaryColor rounded-xl px-3': ''}`}>Home</NavLink>
                  </li>
                  <li>
                    <NavLink to={'/categories'}
                    className={({isActive})=>` max-lg:px-3 hover:text-secondaryColor transition-all duration-100 ${isActive? 'font-bold text-secondaryColor rounded-xl px-3': ''}`}>
                      Categories
                    </NavLink>
                  </li>
                  
                  <li>
                    <NavLink to={'/products'} className={({isActive})=>`hover:text-secondaryColor transition-all duration-100 max-lg:px-3 ${isActive? 'font-bold text-secondaryColor rounded-xl px-3': ''}`}>
                    Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={'/brands'} className={({isActive})=>`hover:text-secondaryColor transition-all duration-100 max-lg:px-3  ${isActive? 'font-bold text-secondaryColor rounded-xl px-3': ''}`}>
                    Brands
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={'/allorders'} className={({isActive})=>`hover:text-secondaryColor transition-all duration-200 max-lg:px-3 ${isActive? 'font-bold rounded-xl text-secondaryColor px-3': ''}`}>
                    Orders
                    </NavLink>
                  </li>
            </ul>
        </div>
        </>
      )}
      {/* Mobile */}
      {token && (
        <>
        <div className="flex flex-wrap justify-center sm:px-10 py-1 relative bg-primaryColor">
          <div id="collapseMenu" className={`lg:hidden w-full overflow-hidden transition-all duration-300 ease-in-out absolute left-0 top-full bg-white shadow-md z-40 ${
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}>
              {token && (
                <>
                {/* Navigation links */}
                <ul  className="flex flex-col text-center gap-4 py-4">
                  <li>
                    <NavLink to={'/'} className={({isActive})=>`hover:text-secondaryColor  max-lg:px-3 max-lg:py-3 ${isActive? 'font-bold text-secondaryColor rounded-xl py-2 px-2': ''}`}>Home</NavLink>
                  </li>
                  <li className='relative'>
                    <NavLink to={'/categories'}
                    className={({isActive})=>` max-lg:px-3 hover:text-secondaryColor  max-lg:py-3 ${isActive? 'font-bold text-secondaryColor rounded-xl py-2 px-2': ''}`}>
                      Categories
                    </NavLink>
                  </li>
                  
                  <li><NavLink to={'/products'} className={({isActive})=>`hover:text-secondaryColor max-lg:px-3 max-lg:py-3 ${isActive? 'font-bold text-secondaryColor rounded-xl py-2 px-2': ''}`}>Products</NavLink></li>
                  <li><NavLink to={'/brands'} className={({isActive})=>`hover:text-secondaryColor  max-lg:px-3 max-lg:py-3 ${isActive? 'font-bold text-secondaryColor rounded-xl py-2 px-2': ''}`}>Brands</NavLink></li>
                  <li><NavLink to={'/allorders'} className={({isActive})=>`hover:text-secondaryColor  max-lg:px-3 max-lg:py-3 ${isActive? 'font-bold text-secondaryColor rounded-xl py-2 px-2': ''}`}>Orders</NavLink></li>
                </ul>
                {/* social media icons */}
                <ul className="flex justify-center items-center ml-auto gap-3">
                  {[facebook, instagram, twitter, linkedin].map((icon, index) => (
                    <li key={index}>
                      <Link to={''} className="block p-1 hover:-translate-y-2 transition-all duration-300">
                        <img
                          src={icon}
                          alt={`icon-${index}`}
                          className="size-4 object-contain"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
                {/*  logout , login , register */}
                <ul className="lg:absolute my-3 lg:right-10 flex items-center justify-center ml-auto space-x-4">
                  {token && (
                    <>
                      {/* Logout */}
                      <li className='cursor-pointer group' onClick={logout}>
                        <span className={`hover:text-green-700 transition-colors duration-300 text-sm flex flex-col items-center`}>
                          LogOut
                        </span>
                      </li>
                    </>
                  )}
                  
                  {!token && (
                    <>
                      <li>
                        <NavLink to={'/login'} className={({ isActive }) =>
                          `flex  flex-col items-center cursor-pointer hover:text-green-700 transition-colors duration-300 ${
                            isActive ? 'text-green-700' : 'text-gray-800'
                          }`}>
                          <LogIn size={16} strokeWidth={2.5} />
                          Login
                        </NavLink>
                      </li>

                      <li>
                        <NavLink to="/register" className={({ isActive }) =>
                          `flex  flex-col items-center cursor-pointer hover:text-green-700 transition-colors duration-300 ${
                            isActive ? 'text-green-700' :'text-gray-800'
                          }`}>
                            <UserPlus size={16} strokeWidth={2.5} />
                            Register
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
                </>
              )}
            
          </div>
          
          <div id="toggleOpen" className="flex ml-auto lg:hidden">
            <button 
            onClick={toggleMobileMenu}
            aria-label="Open mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="collapseMenu"
            className="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#3E7B27" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="size-7 mx-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
              </svg>
            </button>
          </div>
        </div>
        </>
      )}
    </nav>

    </>
  )
}
