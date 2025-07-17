import React,{useContext, useEffect} from 'react'
import { cartContext } from '../../Context/CartContext'
import CartItem from '../../Components/CartItem/CartItem'
import { Link } from 'react-router-dom'
import CheckOut from '../../Components/CheckOut/CheckOut'



export default function Cart() {
    
    const {cart,getLoggedUserCart ,clearCart, isLoading} = useContext(cartContext)
    useEffect(()=>{
        document.title = 'Cart'
        if (localStorage.getItem('token')) {
            getLoggedUserCart();
        }
    },[])


    if(isLoading){
        return(
        <div className="pt-20 animate-pulse">
            <div className="mb-10 mx-auto w-1/2 h-12 bg-gray-200 rounded" />
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3">
                    <div className="h-32 bg-gray-200 mb-2 rounded-md" />
                    <div className="h-32 bg-gray-200 mb-2 rounded-md" />
                    <div className="h-32 bg-gray-200 mb-2 rounded-md" />
                </div>
                <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                    <div className="mb-2 flex justify-between h-4 bg-gray-200 rounded-md" />
                    <div className="flex justify-between h-4 bg-gray-200 rounded-md" />
                    <div className="my-4 h-0.5 bg-gray-200" />
                    <div className="flex justify-between h-4 bg-gray-200 rounded-md" />
                    <div className="mt-6 w-full rounded-md h-8 bg-gray-200" />
                </div>
            </div>
        </div>
        )
    }
    return (
    <>
    <div className='py-7 my-7 rounded-xl bg-mainColor'>
        <header className="mb-10 px-11 flex justify-between">
            <div className='flex items-center space-x-2'>
                <Link to={'/'} className='flex items-center justify-center hover:scale-120 hover:rotate-5 transition-all duration-200 space-x-2 bg-secondaryColor size-7 rounded-full text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </Link>
                <h2 className="text-center text-2xl ms-10 font-bold text-gray-800">Your Shopping Cart</h2>
            </div>
            
            <button onClick={()=>{clearCart()}} className="flex items-center space-x-2 text-gray-600 hover:text-red-500 hover:rotate-180 transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>
        </header>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
            {cart?.data?.products?.length > 0 ? (
                cart.data.products.map((item) => (
                    <CartItem key={item._id} item={item} />
                ))
                ) : (
                <p className="text-center text-gray-500">Cart is empty</p>
                )}
            </div>
            {/* CheckOut */}
            <CheckOut totalPrice={cart?.data?.totalCartPrice}/>
        </div>
    </div>

    </>
    )
}
