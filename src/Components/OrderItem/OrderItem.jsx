import React from 'react'
import { Link } from 'react-router-dom'

export default function OrderItem({order}) {
  return (
    <>
    <section className='border border-gray-300 border-dashed rounded-xl my-8 p-5 space-y-5'>
        <div>
            <header className='flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-green-700 font-semibold'>
                <span>Transaction Number : #{order.id} </span>
                <span>Placed on : {new Date(order.createdAt).toLocaleDateString()}</span>
                <span>Payment : {order.paymentMethodType}</span>
                <div>
                    <Link to={'/products'} className='bg-secondaryColor font-medium rounded-lg text-sm text-white px-3 py-1 hover:bg-secondaryColor/90 w-fit'>
                        Add New Items
                    </Link>
                </div>
            </header>
            <hr className='border-b-1 my-5 border-gray-100'/>
        </div>
        
        {order.cartItems.map((item)=>(
            <div key={item._id} className='flex flex-col sm:flex-row gap-4'>
                <img src={item.product?.imageCover} className='w-32 h-32 object-cover rounded-xl' alt={item.product?.title} />
                <div className='flex flex-col justify-center gap-1'>
                <Link to={`/productDetails/${item.product._id}`} className='text-secondaryColor hover:text-headingColor font-bold text-lg'>
                {item.product.title}
                </Link>
                <h4 className='text-green-700 font-semibold text-md'>
                    Price: <span className='text-green-500 text-md'>EGP {item.price}</span>
                </h4>
                <h4 className='text-green-700 font-semibold text-md'>
                    Quantity: <span className='text-green-400 text-md'>{item.count}</span>
                </h4>
                <span className='font-semibold text-sm text-gray-500'>
                    {item.product.category?.name}
                </span>
                <span className='text-gray-500 text-sm'>{item.product.brand?.name}</span>
                <div className='flex flex-wrap gap-2 mt-2'>
                {order.isPaid? (
                    <div className='bg-green-300/50 w-15 text-center rounded-2xl text-green-800 text-sm'>Paid</div>
                ):(
                    <div className='bg-red-300/50 w-20 text-center rounded-2xl text-red-800 text-sm'>Not paid</div>
                )}
                {order.isDelivered? (
                    <div className='bg-green-300/50 w-15 text-center rounded-2xl text-green-800 text-sm'>Delivered</div>
                ):(
                    <div className='bg-red-300/50 w-30 text-center rounded-2xl text-red-800 text-sm'>Not Delivered</div>
                )}
                </div>
                
                </div>
            </div>
        ))}
        
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-headingColor/10 p-5 rounded-xl border border-dashed border-gray-300'>
            <h4 className='font-semibold text-slate-800'>
                Products Quantity: 
                <span className='text-secondaryColor ms-2 font-semibold'>
                    {order.cartItems.length}
                </span>
            </h4>
            <h4 className='font-semibold flex gap-10 text-slate-800'>
                Shipping Price : 
                <div className='text-secondaryColor font-medium relative'>
                    <span className='text-secondaryColor text-xs font-medium absolute top-0 -left-9'>EGP</span>
                {order.shippingPrice}
                </div>
            </h4>
            <h4 className='font-semibold flex gap-10 text-slate-800'>
                Taxes: 
                <div className='text-secondaryColor font-medium relative'>
                    <span className='text-secondaryColor text-xs font-medium absolute top-0 -left-7'>EGP</span>
                {order.taxPrice}
                </div>
            </h4>
            <h4 className='font-bold text-xl text-slate-800'>
                Total Order Price : <span className='text-secondaryColor font-bold'>{order.totalOrderPrice} EGP</span>
            </h4>
        </div>
    </section>
    </>
  )
}
