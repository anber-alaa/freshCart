import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Links, NavLink, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import SwiperCore from 'swiper';
import { useRef } from 'react'
import ProductCard from '../../Components/ProductCard/ProductCard';
import { wishlistContext } from '../../Context/WishlistContext';
import { cartContext } from '../../Context/CartContext';

export default function ProductDetails() {
  let {id} = useParams()
  const [product,setProduct] =useState(null)
  const [activeImage, setActiveImage] = useState(null)
  const sliderRef = useRef(null); 
  const [relatedProduct,setRelatedProduct] =useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let {addProductToWishlist} = useContext(wishlistContext) 
  let {addProductToCart}= useContext(cartContext)
  
  async function getProductDetails(){
    try{
      setLoading(true);
      let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      getRelatedProducts(data.data.category._id)
      setProduct(data.data)
      setActiveImage(data.data.imageCover)
      setLoading(false);
    }catch(err){
      setError('error in fetching product details');
      setLoading(false);
      console.error(err);
    }
  }
  
  async function getRelatedProducts(categoryId) {
    try{
      let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/?category[in]=${categoryId}`)
      setRelatedProduct(data.data)
    }catch(err){
      console.error(err);
    }
  }

useEffect(()=>{
    getProductDetails()
  },[id])

  useEffect(()=>{
    if(product?.images?.length){
      setActiveImage(product.images[0])
    }
    if(product?.title){
          document.title = product?.title.split(' ').slice(0,2).join(' ');
    }
  },[product])

  if (loading) return(
    <>
      <div className="box mx-auto overflow-hidden animate-pulse">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:w-1/3 p-4 relative">
            <div className="w-full h-64 bg-gray-200 rounded-lg" />
            <button className="absolute top-10 right-5 text-red-500 hover:text-red-600 focus:outline-none">
              <div className="w-6 h-6 absolute top-0 right-2 bg-gray-200 rounded" />
            </button>
          </div>
          <div className="md:w-2/3 p-6">
            <div className="text-2xl font-bold text-gray-800 mb-2 h-6 bg-gray-200 rounded w-1/2" />
            <div className="text-sm text-gray-600 mb-4 h-16 bg-gray-200 rounded" />
            <div className="flex items-center mb-4">
              <span className="text-sm font-medium text-gray-500 h-4 bg-gray-200 rounded w-1/4" />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-3xl font-bold text-gray-900 h-8 bg-gray-200 rounded w-1/4" />
              </div>
              <span className="text-xs font-semibold h-4 bg-gray-200 rounded w-1/4" />
            </div>
            <div className="text-green-600 text-sm font-semibold mb-4 h-4 bg-gray-200 rounded w-1/4" />
            <div className="flex space-x-4">
              <button className="flex gap-4 hover:bg-primaryColor bg-secondaryColor text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 h-10" />
              <button className="flex hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 h-10 bg-gray-200" />
            </div>
          </div>
        </div>
        <div className="mt-20">
          <div className="font-bold text-2xl my-5 h-6 bg-gray-200 rounded w-1/4" />
          <hr className="border-gray-300" />
        </div>
        <div className="grid mb-20 mt-10 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="h-56 bg-gray-200 rounded flex-auto" />
          <div className="h-56 bg-gray-200 rounded flex-auto" />
          <div className="h-56 bg-gray-200 rounded flex-auto" />
          <div className="h-56 bg-gray-200 rounded flex-auto" />
        </div>
    </div>
    </>
  );
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
    

  return (
    <>
      <div className="max-w-6Xl w-full px-6">
        <p className='mt-7'>
          <NavLink to={'/'} className='font-semibold text-green-700'>Home</NavLink> /
          <NavLink to={'/products'} className='font-semibold text-green-700'> Products</NavLink> /
          <span className='font-semibold text-green-700'> {product?.category?.name}</span> /
          <span className="text-secondaryColor"> {product?.title}</span>
        </p>
        <div className="flex flex-col md:flex-row gap-16 mt-4">
          {/* Product Image */}
          <div className="flex flex-col-reverse md:flex-row gap-3 md:w-1/2 w-full p-4 relative">
            <div>
              <Swiper
                direction='vertical'
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={3}
                autoplay={{
                  delay: 1500, 
                  disableOnInteraction: false, 
                }}
                loop={true}
                breakpoints={{
                  320: { slidesPerView: 2 ,
                    direction: 'horizontal',
                  },
                  640: { 
                    direction: 'vertical',
                    slidesPerView: 3 },
                }}
                className="md:w-[100px] w-full md:h-[400px] h-auto"
                style={{ maxHeight: '400px' }}
                onSlideChange={(swiper) => {
                  const currentImage = product?.images[swiper.realIndex];
                  setActiveImage(currentImage);
                }}
                onSwiper={(swiper) => {
                  sliderRef.current = swiper;
                }}
              >
                {product?.images.map((image, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={image}
                    className={`w-full h-30 object-cover rounded cursor-pointer hover:opacity-80 transition-all duration-300
                        ${image === activeImage ? 'ring-2 ring-secondaryColor' : ''}`}
                    alt={`Product Image ${i + 1}`}
                    onClick={() => {
                      setActiveImage(image)
                    }}
                  />
                </SwiperSlide>
                ))}
              </Swiper>
            </div>


            <div>
              <img src={activeImage} alt={product.title} className="w-full max-h-[400px] object-contain rounded-lg" />
              {/* <button onClick={() => addProductToWishlist(product._id)}
              className="absolute cursor-pointer top-10 right-10 text-red-500 hover:text-red-600 focus:outline-none">
                <svg className="w-6 h-6 absolute top-0 right-2" fill='none' stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button> */}
            </div>
          </div>

          
          {/* Product Details */}
          <div className="md:w-2/3 w-full py-10 ">
            <h1 className="text-2xl font-bold text-headingColor mb-2">
              {product?.title}
            </h1>
            <p className="text-sm font-bold text-txtColor mb-4">{product?.category?.name}</p>
            <p className="text-sm font-bold text-gray-600 mb-4">{product?.brand?.name} | <span className='text-emerald-500'>Available</span></p>
            <p className="text-md font-medium text-gray-500 mb-4">
              {product?.description}
            </p>
            <div className="flex items-center mb-4">
              <span className="bg-amber-300 text-white text-sm font-semibold px-2.5 py-0.5 rounded">
                ★ {product?.ratingsAverage} 
              </span>
              <span className="text-sm text-gray-500 ml-2">{product?.ratingsQuantity} reviews </span>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xl font-bold text-gray-900">{product?.price} LE</span>
                <span className="ml-2 text-sm font-medium text-gray-500 line-through">{product?.price+200} LE</span>
              </div>
              <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">Save 10%</span>
            </div>
            <p className="text-green-600 text-sm font-semibold mb-4">Free Delivery</p>
            <div className="flex space-x-4">
              <button onClick={() => addProductToWishlist(product._id)}
              className="flex cursor-pointer hover:bg-primaryColor bg-secondaryColor text-xl text-white font-semibold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>

              </button>
              <button onClick={()=>addProductToCart(product._id)}
              className="flex gap-2 cursor-pointer bg-gray-300 hover:bg-gray-300 text-gray-800 text-md font-semibold py-2 px-3 rounded-lg focus:outline-none focus:shadow-outline transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>

                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Related Products*/}
      <div className='mt-20'>
        <h3 className='font-bold text-2xl my-5 text-green-950'>Related Products</h3>
        <hr className='border-gray-300' />
      </div>
      <div className="grid mb-20 mt-10 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {relatedProduct?.map((item)=>(
          <ProductCard key={item._id} item={item} />
        ))}

      </div>
      </div>
      
    </>
    
)
  }