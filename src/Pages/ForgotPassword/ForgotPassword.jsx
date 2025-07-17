import axios from 'axios';
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import {Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

export default function ForgotPassword() {
  const [error,setError] = useState(null)
  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate()


  const validationSchema = Yup.object({
      email : Yup.string().required('*Email is required').email('must be an email'),
  })
  
async function sendResetCode(values) {
  setIsLoading(true);
  console.log(values)
  const options = {
      url:'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      method:'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data:values,
    }
    const loadingToast = toast.loading('Sending reset code...');

  try{

    const {data} = await axios.request(options)
    console.log('Forgot Password Response:', data);
    setError(null)
    localStorage.setItem('resetEmail',values.email)
    toast.success('Reset code sent to your email!');
    setTimeout(() => {
        navigate('/verifyResetCode');
      }, 200);
  }catch(err){
    console.error('API Error:', err.response || err.message);
    toast.error(err.response?.data?.message)
    setError(err.response?.data?.message)
  }finally{
    toast.dismiss(loadingToast)
    setIsLoading(false)
  }
}


  let formik = useFormik({
    initialValues :{
      email:''
    },
    onSubmit:
    sendResetCode,
    validationSchema,
  })
  
  useEffect(()=>{
    document.title = 'Forgot Password'
  },[])
  
  return (
    <>
        <section className='flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8'>
            <div className="w-full max-w-md space-y-6 bg-white p-8 shadow-md rounded-xl">
                <form onSubmit={formik.handleSubmit} className="space-y-6 w-full px-2 sm:px-0">
                    <h2 className='text-xl sm:text-2xl text-center font-semibold text-secondaryColor flex justify-center items-center gap-3'> Forgot your password ?</h2>
                    {/* UserEmail */}
                    <div className='flex flex-col'>
                      <label htmlFor="email">Enter your email address </label>
                      <input className='focus:outline-none bg-white grow px-3 py-1 rounded-xl border-2 border-slate-200' 
                      id="email"
                      autoComplete='email'
                      type="email" 
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder='Email' 
                      name="email" 
                      />
                      {formik.errors.email && formik.touched.email &&  <p className='p-2 my-2 text-red-800 rounded-2xl'>
                        {formik.errors.email}
                      </p>
                      }
                    </div>
                    <div className="flex items-center gap-3 justify-between">
                      <button
                        type="submit"
                        className="bg-secondaryColor rounded-2xl cursor-pointer text-white px-3 py-1 md:px-6"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Sending...' : 'Send Reset Code'}
                      </button>
                      <Link to="/login" className="text-secondaryColor text-sm cursor-pointer">
                        Back to Login
                      </Link>
                    </div>
                    {error && (
                        <p className='text-red-700'>{error}</p>
                    )}
                </form>
            </div>
        </section>
    </>
  )
}
