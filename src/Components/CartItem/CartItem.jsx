import { useContext, useState } from "react"
import { cartContext } from "../../Context/CartContext"
import { Link } from "react-router-dom"
import { wishlistContext } from "../../Context/WishlistContext"

export default function CartItem({item}) {  
    const {removeProductFromCart,disableBtn, updateProductCount} = useContext(cartContext)
    const {addProductToWishlist} = useContext(wishlistContext)
    let [count , setCount] = useState(item?.count || 1)
    
    function updateYaNegm(){
        if(count == item.count){
            return 
        }
        updateProductCount(count , item.product._id)
    }
    
    
    
    return (
    <>
        <div className="justify-between mb-6 rounded-lg bg-white py-4 px-3 shadow-md sm:flex sm:justify-start">
                <img src={item?.product?.imageCover} alt={item?.product?.title}
                className="w-full h-30 object-cover rounded-lg sm:w-40" />


                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0 space-y-5">
                        <Link to={`/productDetails/${item.product._id}`} className="text-lg font-bold hover:text-secondaryColor text-gray-900">{item?.product?.title}</Link>
                        <p className="mt-1 text-xs text-gray-700">{item?.product?.category?.name}</p>
                        <div className="space-y-1">
                            <p className="text-sm font-medium flex items-center gap-1">
                                <span className="text-sm text-secondaryColor"> 
                                    Rate : 
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 text-yellow-500">
                                    <path fillRule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clipRule="evenodd" />
                                </svg>
                            {item?.product?.ratingsAverage}
                            </p>
                            <p className="text-sm font-medium">
                                <span className="text-sm text-secondaryColor"> 
                                    Price : 
                                </span>
                                <span> {item?.price * item?.count} LE</span>
                            </p>
                        </div>
                        
                    </div>

                <div className="mt-3 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex justify-end space-x-4">
                        <button onClick={() => addProductToWishlist(item?.product?._id)} className="cursor-pointer duration-100 hover:text-red-500 ">
                            <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                        </button>

                        <button onClick={()=>{removeProductFromCart(item?.product?._id)}} className="cursor-pointer duration-100 hover:text-red-500 ">
                            <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                        
                    </div>
                    <div className="flex items-center border-gray-100">
                        <button 
                        disabled={disableBtn}
                        onClick={()=>{updateProductCount(item?.count-1 , item?.product?._id)}}
                        className="disabled:cursor-not-allowed cursor-pointer rounded-full bg-gray-100 py-1 px-3.5 duration-100 hover:bg-secondaryColor hover:text-green-50">
                            - 
                        </button>

                        <input className="h-8 w-8 bg-white text-center text-xs outline-none" type="number"
                        onChange={(e)=>{
                            setCount(e.target.value)
                        }}
                        onBlur={updateYaNegm}
                        value={count} 
                        min={1} />
                        
                        
                        
                        
                        <button 
                        disabled={disableBtn}
                        onClick={()=>{updateProductCount(item?.count+1 , item?.product?._id)}} 
                        className="disabled:cursor-not-allowed cursor-pointer rounded-full bg-gray-100 py-1 px-3 duration-100 hover:bg-secondaryColor hover:text-green-50">
                            +
                        </button>
                    </div>
                    
                </div>
                </div>
        </div>
    </>
)
}
