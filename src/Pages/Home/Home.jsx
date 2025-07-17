import ProductCard from "../../Components/ProductCard/ProductCard";
import axios from 'axios'
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import HomeSlider from "../../Components/HomeSlider/HomeSlider";
import BrandSlider from "../../Components/BrandSlider/BrandSlider";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import BackTop from "../../Components/BackTop/BackTop";
import { useEffect} from "react";
import Testimonials from "../../Components/Testimonials/Testimonials";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";



export default function Home() {    
    let {data , isLoading , isError , error} = useQuery({
        queryKey: ['products'],
        queryFn:()=>{
            return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        },
    })

    useEffect(()=>{
        document.title = 'Home'
    },[])

    return (
    <>
    <HomeSlider/>
    <BrandSlider/>
    <CategorySlider/>
    <section className="my-2 py-6">
        <div className="container px-4">
            <h2 className="section-title text-2xl text-center font-bold text-secondaryColor mb-3">
            Trending Products
            </h2>
            <p className="text-center text-gray-500 text-md mb-5">
            Top views this week
            </p>

            {isLoading ? (
            <Loader />
            ) : isError ? (
            <div className="text-red-500 text-center">
                <h2 className="text-2xl">Error fetching products</h2>
                <p>{error.message}</p>
            </div>
            ) : data?.data?.data?.length === 0 ? (
            <p className="text-center text-gray-400">No trending products available.</p>
            ) : (
            <Swiper
                modules={[Navigation, Autoplay]}
                slidesPerView={1}
                spaceBetween={20}
                breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
                }}
                navigation
                autoplay={{ delay: 3000, disableOnInteraction: false }}
            >
                {data?.data?.data.map((item) => (
                <SwiperSlide key={item._id}>
                    <ProductCard item={item} />
                </SwiperSlide>
                ))}
            </Swiper>
            )}
        </div>
    </section>
    <Testimonials/>
    <BackTop/>
    </>
    )
}
