import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'

export default function Brands() {
      const [page, setPage] = useState(1);



  let {data , error, isError , isLoading}= useQuery({
    queryKey: ['brands', page],
    queryFn:()=>{
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands?page=${page}`)
    },
  })
  
  useEffect(()=>{
    document.title = 'Brands'
  },[]) 
  

  if (isLoading) return <div className="h-screen flex justify-center items-center">
    <Loader /></div>;

  if (isError) {
    return (
      <div className="h-screen flex flex-col justify-center items-center text-red-500">
        <h2 className="text-2xl">Error fetching Brands</h2>
        <p>{error.message}</p>
      </div>
    );
  }
  
  const numberOfPages = data?.data?.metadata?.numberOfPages || 1;



  return (
    <>
    <div className="py-10 px-4 sm:px-6">
      <hr className='border-gray-300'/>
      <h2 className="text-lg sm:text-xl text-center font-bold my-2 text-secondaryColor">Shop by Brands</h2>
      <hr className='border-gray-300 mb-4'/>
      
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {data?.data?.data.map((item) => (
            <Link
              to={`/specificBrand/${item._id}`}
              key={item._id}
              className="bg-gray-50 w-full overflow-hidden hover:scale-110 hover:shadow-md transition-transform duration-300 rounded-full border border-gray-200 cursor-pointer"
            >
              <img src={item.image} alt={item.name} className="rounded-full w-full" />
            </Link>
          ))}
          </div>
        {numberOfPages > 1 && (
        <div className="flex justify-center mt-8 gap-2 flex-wrap">
          {[...Array(numberOfPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`px-3 py-1 rounded-lg border text-sm ${
                page === index + 1
                  ? 'bg-secondaryColor text-white'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      </div>
    </>
  )
}
