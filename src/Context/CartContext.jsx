import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'



export let cartContext = createContext(null)


export default function CartContextProvider({children}) {
    const [cart, setCart] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [disableBtn, setDisableBtn] = useState(false)
    
    
    
    async function getLoggedUserCart(){
        const token = localStorage.getItem('token');
        if (!token) return;
        
        setIsLoading(true)
        try{
            let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
                headers:{
                    token : localStorage.getItem('token')
                }
            })
            setCart(data)
        }catch(err){
            console.error(err);
        }finally{
            setIsLoading(false)
        }
    }
    // add product to cart
    async function addProductToCart(productId){
        try{
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
                productId
            },{
                headers:{
                    token : localStorage.getItem('token')
                }
            })
            await getLoggedUserCart()
            toast.success("Added to cart successfully")
            setCart(data)
        }catch(err){
            toast.error(err.response?.data?.message)
            console.error(err);
        }
    }
    //remove product from cart
    async function removeProductFromCart(cartItemId){
        try{
            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`,{
                headers:{
                    token : localStorage.getItem('token')
                }
            })
            toast.success("Product removed from cart successfully")
            setCart(data)
        }catch(err){
            toast.error(err.response?.data?.message || "Failed to add product to cart")
            console.error(err);
        }
    }
    // update product count in cart
    async function updateProductCount(count, cartItemId){
        setDisableBtn(true)
        try{
            let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`,{
                count
            },{
                headers:{
                    token : localStorage.getItem('token')
                }
            })
            toast.success("Product count updated successfully")
            setCart(data)
        }catch(err){
            toast.error(err.response?.data?.message)
            console.error(err);
        }finally{
            setDisableBtn(false)
        }
    }
    // clear cart
    async function clearCart(){
        try{
            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
                headers:{
                    token : localStorage.getItem('token')
                }
            })
            toast.success("Cart cleared successfully")
            setCart(data)
        }catch(err){
            toast.error(err.response?.data?.message)
            console.error(err);
        }
    }
    
    
    useEffect(()=>{
        getLoggedUserCart()
    },[])
    
    
    
    return(
        <cartContext.Provider value={{
            disableBtn,
            cart,
            getLoggedUserCart ,
            updateProductCount,
            addProductToCart ,
            removeProductFromCart,
            clearCart,
            isLoading
        }}>
            {children}
        </cartContext.Provider>
    
    )
}
