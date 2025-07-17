import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect } from 'react'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'

export default function Categories() {
  
  
  let {data , isLoading , isError , error} = useQuery({
        queryKey: ['Categories'],
        queryFn:()=>{
            return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        },
    })
useEffect(()=>{
  document.title = 'Categories'
},[]) 



  if (isLoading) return <div className="h-screen flex justify-center items-center">
      <Loader /></div>;
  
    if (isError) {
      return (
        <div className="h-screen flex flex-col justify-center items-center text-red-500">
          <h2 className="text-2xl">Error fetching Categories</h2>
          <p>{error.message}</p>
        </div>
      );
    }



    
  return (
    <>
      <div className="py-8 px-4 sm:px-6">
        <hr className='border-gray-300'/>
        <h2 className="text-xl text-center font-semibold my-2 text-secondaryColor">Shop by category</h2>
        <hr className='border-gray-300 mb-4'/>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {data?.data?.data?.map((item)=>(
                <Link to={`/specificCategory/${item._id}`} key={item._id} className=" p-1 group overflow-hidden cusrsor-pointer rounded-lg  cursor-pointer">
                  <img src={item.image} alt={item.name} className="h-40 w-full group-hover:scale-103 overflow-hidden transition-all border border-gray-200 p-1 duration-300 rounded-lg object-cover" />
                  <div className="mt-3 text-center">
                    <h3 className="text-slate-900 text-sm font-semibold">{item.name}</h3>
                </div>
                </Link>  
            ))}
        </div>
      </div>

    </>
  )
}
