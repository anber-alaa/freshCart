import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import axios from "axios";



export default function BrandSlider() {
    
    let {data}= useQuery({
    queryKey: ['brands'],
    queryFn:()=>{
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    },
    })


    const brands = data?.data?.data || [];
    return (
    <>
    <div className="w-full bg-white py-8">
        <Swiper
            modules={[Autoplay]}
            spaceBetween={15}
            slidesPerView={10}
            loop={brands.length > 7}
            speed={3000}
            autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
            }}
            breakpoints={{
            300:{slidesPerView: 4},
            320: { slidesPerView: 4 },
            640: { slidesPerView: 6 },
            1024: { slidesPerView: 7 },
            }}
            className="!w-[100%]"
        >
            {data?.data?.data?.map((brand) => (
            <SwiperSlide key={brand._id}>
                <div className="flex justify-center items-center">
                <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-32 h-20 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
                </div>
            </SwiperSlide>
            ))}
        </Swiper>
    </div>
    </>
  )
}
