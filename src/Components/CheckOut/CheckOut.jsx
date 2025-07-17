import React, { useContext, useState } from 'react'
import cashPaymentImg from '../../assets/images/cashpay.png'
import onlinePaymentImg from '../../assets/images/onlinepay.png'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { cartContext } from '../../Context/CartContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'



export default function CheckOut({totalPrice}) {
    
    const [pay , setPay] =useState('cash')
    const navigate = useNavigate()
    let {cart ,getLoggedUserCart}= useContext(cartContext)
    const phoneReg = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/;
    const validationSchema = Yup.object({
        "details": Yup.string().required('*required'),
        "phone": Yup.string().required('*required').matches(phoneReg, '*must be Egyptian phone number'),
        "city": Yup.string().required('*required').min(2,'*at least two chars')
    })
    let formik = useFormik({
        initialValues :{
            details: "",
            phone: "",
            city: ""
        },
        onSubmit:
            (x)=>{
                if(pay =='online'){
                    onlinePayment(x)
                }else{
                    cashPayment(x)
                }
            },
        validationSchema
    })
    
    async function onlinePayment(values) {
        try{
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5173`,
                {
                    shippingAddress:values
                },
                {
                    headers:{
                        token: localStorage.getItem('token')
                    }
                }
            )
            if(data.status == 'success'){
                window.location.href = data.session.url
            }
            
        }catch(err){
            console.error(err);
            
        }
    }
    async function cashPayment(values) {
        try{
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`,
                {
                    shippingAddress:values
                },
                {
                    headers:{
                        token: localStorage.getItem('token')
                    }
                }
            )

            toast.success('success')
            if(data.status == 'success'){
                navigate('/allorders')
                getLoggedUserCart()
            }
            
        }catch(err){
            console.error(err);
            
        }
    }
    
    
    return (
        <>
        <div className="mt-6 h-full rounded-lg border bg-white p-3 shadow-md md:mt-0 md:w-1/3">
            <div className="container  max-w-[535px] mt-7">
                <span className="block mt-12 mx-auto w-[200px] rounded-full h-[2px] bg-secondaryColor"></span>
                <h2 className="text-center my-2 font-bold text-lg Outfit">Check Out</h2>
                <span className="block  mx-auto w-[200px] rounded-full h-[2px] bg-secondaryColor"></span>

                <form
                onSubmit={formik.handleSubmit}
                id="checkOut"
                className="w-full p-6 border border-gray-300 rounded-lg duration-700 target:border-darkPrimary   flex flex-col gap-6 mt-12"
                >
                <h3 className="font-semibold text-lg -ml-2">Cart totals</h3>

                <div className="flex gap-4 items-center">
                    <span className="font-semibold">Total :</span>
                    <span className="text-secondaryColor font-semibold">
                    {totalPrice} EGP
                    </span>
                </div>
                {/* city input */}
                <div>
                    <input
                    className="px-2 py-1 w-full placeholder:text-sm rounded-xl border-1 outline-none border-secondaryColor focus:border-headingColor focus:border-2"
                    autoComplete="off"
                    type="text"
                    placeholder="Enter your city"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                    
                </div>
                {formik.errors.city && formik.touched.city &&(
                    <p className="text-red-600 font-semibold text-sm -my-3 ">
                        {formik.errors.city}
                    </p>
                )}


                {/* phone input */}
                <div>
                    <input
                    className="px-2 py-1 w-full placeholder:text-sm rounded-xl border-1 outline-none border-secondaryColor focus:border-headingColor focus:border-2"
                    autoComplete="off"
                    type="tel"
                    placeholder="Enter Your Phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                    
                </div>
                {formik.errors.phone && formik.touched.phone &&(
                    <p className="text-red-600 font-semibold text-sm -my-3 ">
                        {formik.errors.phone}
                    </p>
                )}
                
                {/* details input */}
                <div>
                    <textarea
                    className="px-2 py-1 w-full placeholder:text-sm rounded-xl border-1 outline-none border-secondaryColor focus:border-headingColor focus:border-2"
                    placeholder="Details"
                    name="details"
                    value={formik.values.details}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onInput={() => {}}
                    />
                    
                </div>
                {formik.errors.details && formik.touched.details &&(
                    <p className="text-red-600 font-semibold text-sm -my-3 ">
                        {formik.errors.details}
                    </p>
                )}

                <div className="flex max-md:flex-col  gap-3 justify-between items-center">
                    <button
                    onClick={() => {
                        setPay('cash')
                    }}
                    type="submit"
                    className="rounded-xl cursor-pointer bg-secondaryColor hover:bg-headingColor text-white w-full flex py-1 text-nowrap items-center justify-center gap-2"
                    >
                    <img
                        className="size-7"
                        src={cashPaymentImg}
                        alt="Cash Payment Img"
                    />
                    <span className='text-sm'> Cash Order</span>
                    </button>
                    <button
                    onClick={() => {
                        setPay('online')
                    }}
                    type="submit"
                    className="rounded-xl cursor-pointer flex py-1 text-nowrap items-center justify-center gap-2 hover:text-white hover:bg-secondaryColor bg-white text-darkPrimary w-full"
                    >
                    <img
                        className="size-7 object-cover"
                        src={onlinePaymentImg}
                        alt="Online Payment Img"
                    />
                    <span className='text-sm'>Online Order</span>
                    </button>
                </div>
                </form>
            </div>      
        </div>
        </>
    )
}
