import axios from 'axios';
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import {Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

export default function VerifyResetCode() {
  const [error,setError] = useState(null)
  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate()
  const email = localStorage.getItem('resetEmail')

  useEffect(()=>{
    if(!email){
      toast.error('No email found, please go through Forgot Password first.')
      navigate("/forgotPassword");
    }
  },[email, navigate])
  const validationSchema = Yup.object({
      resetCode : Yup.string().required('*Code is required'),
  })
  
async function verifyResetCode(values) {
  setIsLoading(true);
  console.log(values)
  const options = {
      url:'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
      method:'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data:values,
    }
    const loadingToast = toast.loading('Verifying code...');

  try{

    const {data} = await axios.request(options)
    console.log('Forgot Password Response:', data);
    setError(null)
    toast.success('Code verified successfully!');
    setTimeout(() => {
        navigate('/resetPassword');
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
      resetCode:''
    },
    onSubmit:
    verifyResetCode,
    validationSchema,
  })
  
  useEffect(()=>{
    document.title = 'Verify ResetCode';
  },[]) 
  
  return (
    <>
        <section className='flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8'>
            <div className="w-full max-w-md space-y-6 bg-white p-8 shadow-md rounded-xl">
                <form onSubmit={formik.handleSubmit} className="space-y-6 w-full max-w-md px-4 sm:px-6 md:px-8">
                    <h2 className='text-xl sm:text-2xl text-center font-semibold text-secondaryColor flex justify-center items-center gap-3'>Check your email</h2>
                    {/* UserEmail */}
                    <div className='flex flex-col'>
                      <label htmlFor="resetCode">Enter the reset code: </label>
                      <input className='focus:outline-none bg-white grow px-3 py-1 rounded-xl border-2 border-slate-200' 
                      id="resetCode"
                      type="text" 
                      value={formik.values.resetCode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder='e.g. 123456' 
                      name="resetCode" 
                      />
                      {formik.errors.resetCode  && formik.touched.resetCode  &&  <p className='p-2 my-2 text-red-800 rounded-2xl'>
                        {formik.errors.resetCode }
                      </p>
                      }
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        type="submit"
                        className="bg-secondaryColor rounded-2xl cursor-pointer text-white py-1 px-6"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Verifying...' : 'Verify Code'}
                      </button>
                      <Link to="/login" className="text-secondaryColor cursor-pointer">
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
