import React, { useContext, useEffect } from 'react'
import { wishlistContext } from '../../Context/WishlistContext'
import WishlistItem from '../../Components/WishlistItem/WishlistItem'
import { Link } from 'react-router-dom'

export default function Wishlist() {

    const {wishlist,clearWishlist , getLoggedUserWishlist} = useContext(wishlistContext)
    
    useEffect(()=>{
        document.title = 'My Wishlist';
        if (localStorage.getItem('token')) {
        getLoggedUserWishlist()
        }       
    },[])

    return (
        <>
        <div className='py-10 bg-mainColor my-10 rounded-xl'>
            <div className='flex items-center mx-6 mb-6 space-x-2'>
                <Link to={'/'} className='flex items-center justify-center hover:scale-120 hover:rotate-3 transition-all duration-200 space-x-2 bg-secondaryColor size-7 rounded-full text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </Link>
                <h2 className="text-center text-2xl ms-10 font-bold text-gray-800">Favorite Products 💕</h2>
            </div>

            <div className="max-w-5xl mx-20 px-6 md:flex md:space-x-6 xl:px-0">

                <div className="rounded-lg md:w-full">
                {wishlist?.data?.map((item)=>(
                    <div key={item._id}>
                    <WishlistItem item={item}/>
                    <hr className='border-b-2 border-gray-200 my-4' />
                    </div>
                ))}
                </div>
            </div>

            <div className=" sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                <button
                disabled={!wishlist?.data?.length} 
                onClick={()=>{clearWishlist()}} 
                className={`mx-auto cursor-pointer text-sm px-3 py-1 rounded-2xl duration-100 flex items-center gap-1 ${wishlist?.data?.length ? 'bg-red-500 hover:bg-red-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    Clear all
                </button>
            </div>
        </div>
        
        </>
    )
}
