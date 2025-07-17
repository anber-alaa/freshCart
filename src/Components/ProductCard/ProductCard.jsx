import React, { useContext } from 'react'

import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import { wishlistContext } from '../../Context/WishlistContext';


export default function ProductCard({item}) {
  
  let {addProductToCart} = useContext(cartContext)
  const {toggleWishlist, productIds} = useContext(wishlistContext)

  const isFavourite = productIds.includes(item._id);




  return (
    <>
      <div 
          key={item._id}
          className="flex flex-col group bg-mainColor max-w-sm w-full mx-auto overflow-hidden border border-gray-200 border-t-3 border-t-secondaryColor rounded-xl dark:border-t-secondaryColor dark:shadow-neutral-700/70"
      >
        {/* Card img */}
        <div className='relative overflow-hidden rounded-t-xl'>
          <img 
          loading="lazy"
          className='w-full h-56 sm:h-60 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300' 
          src={item?.imageCover} 
          alt={item?.title} 
          />

          {/* layer of buttons */}
          <div className='layer -translate-y-1/2  flex justify-center items-center gap-4 absolute top-1/2 left-1/2  -translate-x-1/2'>
            {/* favourite */}
            <div className='bg-secondaryColor/70 p-2 hover:bg-secondaryColor icon opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100  hover:bg-darkPrimary duration-300 cursor-pointer bg-primary flex justify-center items-center size-12 bg-opacity-70 rounded-full text-white'
            
            >
              <svg xmlns="http://www.w3.org/2000/svg" 
              fill={isFavourite ? "red" : "none"} 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className={`w-6 h-6 ${isFavourite ? 'text-red-500' : 'text-white'}`}
              aria-label="Add to favorites"
              onClick={() => toggleWishlist(item._id)}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </div>
            {/* cart */}
            <div className='icon opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100 duration-300 cursor-pointer bg-secondaryColor/70 p-2 hover:bg-secondaryColor flex justify-center items-center size-12 bg-opacity-70 rounded-full text-white'
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
              className="size-6 text-white cursor-pointer"
              onClick={() => addProductToCart(item._id)}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
            {/* view details */}
            <Link to={`/productDetails/${item._id}`} className='bg-secondaryColor/70 hover:bg-secondaryColor p-2  icon opacity-0 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100  hover:bg-darkPrimary duration-300 cursor-pointer bg-primary flex justify-center items-center size-12 bg-opacity-70 rounded-full text-white'
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
              className="size-6 text-white cursor-pointer ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </Link>
          </div>

          <span className='text-xs absolute top-3 left-3 bg-white/80 px-2 font-semibold text-green-600 rounded-2xl border-1 border-green-300'>
          {item.category.name}
          </span>

          <span className=' absolute flex justify-center items-center gap-1 top-3 right-3 bg-white/80 text-sm px-1 font-medium text-amber-500 rounded-2xl border-1'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
              <path fillRule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clipRule="evenodd" />
            </svg>
            {item.ratingsAverage}
          </span>
        </div>
         {/* Card body */}
        <div className="p-3">
          <span className='text-black'>{item?.brand?.name} |</span>
          {item?.quantity > 0?
            <span className='text-green-600 px-1'> Available</span>
            :
            <span className='text-red-600 px-3'> Sold out</span>
          }
          <Link to={`/productDetails/${item._id}`} className="text-lg block font-bold text-gray-800">
            {item?.title.split(' ').slice(0,2).join(' ')}
          </Link>
          <span className='font-bold text-green-600'>EGP {item?.price.toFixed(2)}</span>
        </div>
      </div>
    </>
  )
}


