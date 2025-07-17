import React, { useEffect, useState } from 'react'
import ProductCard from '../../Components/ProductCard/ProductCard';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import noProduct from '../../assets/images/product-not-found.png'
import Loader from '../Loader/Loader';

export default function SpecificCategory() {
    let {id} = useParams()
    const [relatedProduct,setRelatedProduct] =useState(null)
    const [loading, setLoading] = useState(true);

    async function getRelatedProducts(categoryId) {
        setLoading(true);
        try{
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/?category[in]=${categoryId}`)
        console.log(data);
        setRelatedProduct(data.data)
        }catch(err){
        console.error(err);
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        getRelatedProducts(id)
    },[id])
    
    
    
    return (
    <>
        {loading ? (
            <div className="text-center py-10">
                <Loader/>
            </div>
            ) : (
            <>
            <Link to={'/'} className='mt-6 flex items-center justify-center hover:scale-120 transition-all duration-200 space-x-2 bg-secondaryColor size-7 rounded-full text-white'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
            </Link>
            <div className="grid mb-20 mt-10 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                
                {relatedProduct?.map((item) => (
                <ProductCard key={item._id} item={item} />
                ))}
            </div>
            </>
        )}
        {!loading && relatedProduct?.length === 0 && (
            
            <div className='size-full flex justify-center i'>
                <img src={noProduct} alt="" className='w-200 h-100 opacity-15' />
            </div>
            
        )}
    </>
)
}
