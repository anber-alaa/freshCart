import React from 'react'
import AmazonLogo from '../../assets/images/amazon-pay.png'
import AmericanLogo from '../../assets/images/American-Express-Color.png'
import MasterLogo from '../../assets/images/mastercard.webp'
import PaypalLogo from '../../assets/images/paypal.png'
import AppleLogo from '../../assets/images/get-apple-store.png'
import GooglePlayLogo from '../../assets/images/get-google-play.png'

export default function Footer() {
    return (
        <>
        <footer className='bg-mainColor w-full py-10'>
            <div className="container space-y-6 px-4">
                {/* title , email */}
                <div>
                    <h5 className='text-xl sm:text-2xl text-slate-700 font-semibold'>Get The FreshCart App</h5>
                    <p className='text-gray-500 text-sm sm:text-base my-2'>We will send you a link, open it on your phone to download the app </p>
                </div>
                {/* input , button */}
                <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
                    <input className='focus:outline-none bg-white grow px-3 py-1 rounded-lg border-2 border-slate-200' 
                    type="text" 
                    placeholder='Email' 
                    name="email" 
                    />

                    <button className='bg-secondaryColor cursor-pointer rounded-lg text-white py-1 px-6'>Get App Link</button>
                </div>

                <hr className='border-gray-200'/>
                
                {/* payment & store logos */}
                <div className='flex flex-col lg:flex-row justify-between gap-4 mt-6'>
                    <div className='flex items-center gap-2'>
                        <h3 className='font-medium text-sm text-gray-700'>Payment Partener</h3>
                        <img className='w-7 md:w-16 cusrsor-pointer' src={AmazonLogo} alt="AmazonLogo" />
                        <img className='w-7 md:w-16 cusrsor-pointer' src={AmericanLogo} alt="AmericanLogo" />
                        <img className='w-7 md:w-16 cusrsor-pointer' src={MasterLogo} alt="MasterLogo" />
                        <img className='w-7 md:w-16 cusrsor-pointer' src={PaypalLogo} alt="PaypalLogo" />
                    </div>

                    <div className='flex flex-wrap items-center gap-4'>
                        <h3 className='font-medium text-sm text-gray-700'>Get deliveries with FreshCart</h3>
                        <img className='w-7 md:w-16 cusrsor-pointer' src={AppleLogo} alt="" />
                        <img className='w-7 md:w-16 cusrsor-pointer' src={GooglePlayLogo} alt="" />
                    </div>
                </div>
                <hr className='border-gray-200'/>
                <div className='text-center text-sm text-gray-600'>
                    <h5>© 2025 <span className='font-semibold text-secondaryColor'>Anber Alaa</span>. All rights reserved.</h5>
                </div>
            </div>
        </footer>
        </>
    )
}
