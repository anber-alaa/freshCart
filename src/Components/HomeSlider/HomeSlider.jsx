import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import { EffectFade,Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Link } from "react-router-dom";
import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';


import slide1 from '../../assets/images/slider/slide5.jpg'
import slide2 from '../../assets/images/slider/slide4.jpg'
import slide3 from '../../assets/images/slider/slide10.jpg'
import slide4 from '../../assets/images/slider/slide16.jpg'
import slide5 from '../../assets/images/slider/slide9.jpg'
import slide6 from '../../assets/images/slider/slide15.jpg'

const slides = [
    {image:slide1, title:'Everything You Need, All in One Place' , desc:"Get 20% off for your first order"},
    {image:slide2, title:'Discover Your New Favorite Look' , desc:"from freedom - to move - onesises "},
    {image:slide3, title:'Summer Collection' , desc:"Latest Drops – Just for You"},
    {image:slide4, title:'End of Season sale' , desc:"Up to 40% off"},
    {image:slide5, title:'Discover Your New Favorite Look' , desc:"Shop More, Save More"},
    {image:slide6, title:'Summer Collection' , desc:"Latest Drops – Just for You"},
    
]



export default function HomeSlider() {
const slideRefs = useRef([]);
slideRefs.current = [];

const addToRefs = (el) => {
  if (el && !slideRefs.current.includes(el)) {
    slideRefs.current.push(el);
  }
};
    const animateSlide = (swiper) => {
  const current = slideRefs.current[swiper.realIndex];
  if (!current) return;

  const title = current.querySelector(".hero-title");
  const desc = current.querySelector(".hero-desc");
  const btn = current.querySelector(".hero-btn");

  gsap.set([title, desc, btn], { opacity: 0 });

  gsap.fromTo(
    title,
    { y: -50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.1 }
  );

  gsap.fromTo(
    desc,
    { x: 60, opacity: 0 },
    { x: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.5 }
  );

  
  gsap.fromTo(
    btn,
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.9 }
  );
};

useEffect(() => {
  animateSlide({ realIndex: 0 });
}, []);

    return (
        <>
        <Swiper
        effect={'fade'}
        modules={[EffectFade,Autoplay, Pagination, Navigation]}
        pagination ={{ clickable: true }}
        navigation
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        centeredSlides={true}
        autoplay={{
            delay: 3000,
            disableOnInteraction: false,
        }}
        onSlideChangeTransitionStart={animateSlide}
        onSwiper={(swiper) => animateSlide(swiper)}
        className="mySwiper">
            {slides.map(({image,title,desc},index)=>(
            <SwiperSlide key={index}>
                <div 
                ref={addToRefs}
                style={
                    {   backgroundImage: `url(${image})`,
                        backgroundSize:'cover' ,
                        backgroundPosition:'center'}}
                        className="w-full h-107">
                    <div className="overlay bg-gradient-to-b from-transparent to-black/80 w-full h-full flex items-center ">
                        <div className="container pl-20 space-y-3">
                        <h2 className="text-white text-3xl font-bold hero-title">{title}</h2>
                        <p className="text-white sm:text-lg md:text-xl hero-desc">{desc}</p>
                        <div className="hero-btn">
                            <Link to={'/products'} className="text-white font-medium bg-black hover:bg-gray-800 px-3 py-1">Shop now</Link>
                        </div>
                    </div>
                    </div>
                </div>
            </SwiperSlide>
            ))}
        </Swiper>
        </>
    )
}
