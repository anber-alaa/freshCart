import React, { useEffect, useState } from 'react'

export default function BackTop() {
    
    let [isVisable, setIsVisible] = useState(false);
    function scrollToTop() {
        window.scrollTo({
            top: 500,
            behavior: 'smooth'
        });
    }

    useEffect(()=>{
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }
        
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    },[])
    if(!isVisable) return null
    return (
        <>
        <div className='size-8 rounded-full bg-secondaryColor/65 hover:bg-secondaryColor hover:-translate-y-3 transition-all duration-200 z-10 fixed bottom-20 right-4'>
            <button onClick={()=>{
                scrollToTop()
            }} className='flex items-center justify-center cursor-pointer text-white h-full w-full'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 md:size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                </svg>
            </button>
        </div>
        </>
    )
}
