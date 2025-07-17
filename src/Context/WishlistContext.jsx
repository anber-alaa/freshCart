import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let wishlistContext = createContext(null)



export default function WishlistContextProvider({children}) {

    let [wishlist ,setWishlist]= useState(null)
    let [productIds , setProductIds] = useState([])
    
    async function getLoggedUserWishlist() {
        try{
            let {data} =await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
                headers:{
                    token : localStorage.getItem('token')
                }
            })
            setWishlist(data)
            setProductIds(data?.data?.map(item => item._id || item.product._id));
        }catch(err){
        console.error(err);
        }
    }
    // add product to wishlist
    async function addProductToWishlist(productId) {
        try{
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
                productId
            },{
                headers:{
                    token : localStorage.getItem('token')
                }
            })
            setWishlist(data)
            
            toast.success("Product added to wishlist successfully")
        }catch(err){
            toast.error(err.response?.data?.message) || "Failed to add product to wishlist";
            console.error(err.response.data.message);
        }
    }
    // remove product from wishlist
    async function removeProductFromWishlist(productId) {
        try{
            let {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
                headers:{
                    token : localStorage.getItem('token')
                }
            })
            setWishlist(data)
            toast.success("removed from wishlist successfully")
        }catch(err){
            toast.error(err.response?.data?.message || "Failed to remove product from wishlist")
            console.error(err);
        }
    }
    //clear wishlist
    function clearWishlist(){
        setWishlist(null)
        setProductIds([])
        toast.success("Wishlist cleared successfully")
    }
    

async function toggleWishlist(productId){
    const isExisting = productIds.includes(productId);
    if (isExisting) {
        await removeProductFromWishlist(productId);
        setProductIds(prev => prev.filter(id => id !== productId));
        toast.success("removed from wishlist successfully");
    } else {
        await addProductToWishlist(productId);
        setProductIds(prev => [...prev, productId]);
    }
}

    useEffect(()=>{
        getLoggedUserWishlist()
    },[])
    
    
    
    
    return (
        <>
            <wishlistContext.Provider value={{
                wishlist,
                toggleWishlist,
                productIds,
                clearWishlist,
                getLoggedUserWishlist,
                addProductToWishlist,
                removeProductFromWishlist
                }}>

                {children}
            </wishlistContext.Provider>
        </>
    )
}
