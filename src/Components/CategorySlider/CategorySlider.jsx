import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation} from 'swiper/modules';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

export default function CategorySlider() {
    
    let {data} = useQuery({
        queryKey: ['Categories'],
        queryFn: () => {
            return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
        }
    })    
    return (
        <>
        <div className='w-full bg-white py-8 px-4'>
            <h2 className='text-secondaryColor text-center text-2xl mb-3 font-semibold'>Top Categories</h2>
            <p className='text-center text-gray-500 text-md mb-5'>Click quick! these best-selling sale styles are almost gone...</p>
            <Swiper 
            modules={[ Navigation]}
            navigation ={true}
            spaceBetween={10}
            watchSlidesProgress={true}
            slidesPerView={2}          
            breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 5 },
                1280: { slidesPerView: 6 },
            }}
            className="mySwiper">
                
                {data?.data?.data?.map((category) => (
                    <SwiperSlide key={category?._id}>
                        <Link to={`/specificCategory/${category._id}`} className="flex flex-col justify-center items-center">
                            <img
                                src={category?.image}
                                alt={category?.name}
                                className="size-50 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
                            />
                            <div className="mt-3 text-center">
                                <h4 className="text-slate-900 text-sm font-semibold">{category?.name}</h4>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
        </>
    )
}
