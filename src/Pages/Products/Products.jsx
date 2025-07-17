import axios from 'axios';
import React, { useEffect, useState, useRef  } from 'react'
import ProductCard from '../../Components/ProductCard/ProductCard';
import SearchProduct from '../../Components/SearchProducts/SearchProduct';
import BackTop from '../../Components/BackTop/BackTop';
import Loader from '../Loader/Loader';
import { debounce } from 'lodash';




export default function Products() {
  const [allProducts, setAllProducts] = useState([])
  const [products,setProducts] = useState([])
  const [pagination , setPagination] = useState(null)
  const [currentPage , setCurrentPage] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue , setSearchValue] =useState('')
  const productsRef = useRef(null)
  
  
  async function getAllProducts(page =1){ 
    try {
      setIsLoading(true)
      let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`)
      setAllProducts(data.data)
      setProducts(data.data)
      setPagination(data.metadata)
      setCurrentPage(page)
      } catch (error) {
          console.error(error)
      }finally {
        setIsLoading(false)
      }
  }
  
  useEffect(()=>{
    document.title = 'Products';
      getAllProducts()
  },[])

  function handlePageChange(currentPage){
    getAllProducts(currentPage)
      productsRef.current.scrollIntoView({ behavior: 'smooth' })
  }

    
    const debouncedSearch  =  debounce((value)=>{      
      //search filter
      if(value.trim() === ''){
        setProducts(allProducts)
      }else{
        const filtered = allProducts.filter((item)=>
          item.title.toLowerCase().includes(value.toLowerCase())
        );
        setProducts(filtered)
      }
    },300)
    
    useEffect(()=>{
      debouncedSearch(searchValue)
      return () => debouncedSearch.cancel();
    },[searchValue, allProducts])

  //   const handleFilterClick = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };
  if (isLoading) return <div className="h-screen flex justify-center items-center">
      <Loader /></div>;

  return (
    <>
      <SearchProduct 
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        />
      {/* <FilterSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        setFilters={setFilters}
      /> */}
      <section className="my-5 py-5" ref={productsRef}>
        <div className="container">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {products.map((item)=>(
                    <ProductCard key={item._id} item={item}/>
                ))}
            </div>
        </div>
        <div className='flex justify-center items-center gap-3 my-10'>
          {[...Array(pagination?.numberOfPages)].map((_,index)=>(
            <button
            key={index} 
            onClick={()=>{
              handlePageChange(index+1)
            }}
            className={`cursor-pointer rounded-full w-8 h-8 text-sm font-medium ${
                currentPage === index + 1
                  ? 'bg-secondaryColor text-white'
                  : 'bg-secondaryColor/40 text-white hover:bg-secondaryColor'
              }`}
              >
              {index+1}
            </button>
          ))}
        </div>
        <BackTop/>
      </section>
    </>
  )
}
