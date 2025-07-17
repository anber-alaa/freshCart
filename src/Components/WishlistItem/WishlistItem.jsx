import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { wishlistContext } from '../../Context/WishlistContext'
import { cartContext } from '../../Context/CartContext'

export default function WishlistItem({item}) {
    const {removeProductFromWishlist} = useContext(wishlistContext)
    const {addProductToCart} = useContext(cartContext)


    return (
    <>
        <div className="justify-between mb-6 rounded-lg  py-4 px-3 sm:flex sm:justify-start">
            <img src={item?.imageCover} alt={item?.title}
            className="w-full h-30 object-cover rounded-lg sm:w-40" />

            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0 space-y-5">
                    <Link to={`/productDetails/${item?._id}`} className="text-lg font-bold hover:text-secondaryColor text-gray-900">{item?.title}</Link>
                    <div className="space-y-1">
                        <p className="text-sm font-medium flex items-center gap-1">
                            <span className="text-sm text-secondaryColor"> 
                                Rate : 
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 text-yellow-500">
                                <path fillRule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clipRule="evenodd" />
                            </svg>
                        {item?.ratingsAverage}
                        </p>
                        <p className="text-sm font-medium">
                            <span className="text-sm text-secondaryColor"> 
                                Price : 
                            </span>
                            <span> {item?.price} LE</span>
                        </p>
                    </div>
                    <p className="mt-1 text-xs text-gray-700">{item?.category?.name} | {item?.brand?.name} | <span className='text-emerald-500'>Available</span></p>
                </div>
            </div>
            <div className="flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                <div className="flex items-center justify-between mt-4 sm:justify-start sm:mt-0 sm:space-x-4">
                    <button onClick={() => addProductToCart(item._id)} className="cursor-pointer duration-300 text-white hover:bg-emerald-500 bg-emerald-600 px-4 py-1 rounded-2xl flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-basket-icon lucide-shopping-basket size-6">
                            <path d="m15 11-1 9"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"/><path d="M4.5 15.5h15"/><path d="m5 11 4-7"/><path d="m9 11 1 9"/>
                        </svg>                        
                    </button>

                    <button onClick={()=>{removeProductFromWishlist(item?._id)}} className="cursor-pointer text-sm bg-red-500 px-3 py-1 rounded-2xl duration-100 hover:text-white hover:bg-red-700 text-white flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                        Remove
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}
