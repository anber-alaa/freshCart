import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import OrderItem from '../../Components/OrderItem/OrderItem';




export default function Allorders() {
    
    
    let [orders , setOrders] = useState([])
    
    async function getAllOrders(userId) {
        try{
            let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
            console.log(data);
            setOrders(data)
        }catch(err){
            console.error(err);
        }
    }
    
    useEffect(()=>{
        document.title = 'AllOrders'
        const userId = localStorage.getItem('userId')
        if(userId){
            getAllOrders(userId)
        }
    },[])

    return (
        <>
        <div className='flex px-5 items-center justify-between mt-5 flex-wrap gap-4'>
            <Link to={'/cart'} className='flex items-center justify-center bg-secondaryColor size-8 rounded-full text-white hover:scale-110 hover:rotate-6 transition-transform duration-300'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
            </Link>
            <h2 className="flex-1 text-center text-xl sm:text-2xl font-bold text-gray-800">Track Your Orders</h2>
            <i className="fa-solid fa-truck-fast text-xl sm:text-2xl text-secondaryColor"></i>
        </div>
        <div className='mt-6 px-5 space-y-4'>
            {orders.map((order)=>(
            <OrderItem key={order.id} order={order}/>
        ))}
        </div>
        </>
    )
}
