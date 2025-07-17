import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'




export default function ResetPassword() {
    const [error,setError] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const [showPass , setShowPass]=useState('password')
    const navigate = useNavigate()
    const email = localStorage.getItem('resetEmail')

    function toggleShowPass(){
    setShowPass(showPass === 'password' ? 'text':'password')
    }

    const passReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{5,}$/
    
    
    
    useEffect(()=>{
        if(!email){
        toast.error('No email found, please go through Forgot Password first.')
        navigate("/forgotPassword");
        }
    },[email, navigate])
    
    
    const validationSchema = Yup.object({
        newPassword: Yup.string().required('*password is required').matches(passReg , '* Minimum 5 characters, at least one upper case English letter, one lower case English letter, one number and one special character'),
    })
    
    async function resetPassword(values) {
    setIsLoading(true);
    const options = {
        url:'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
        method:'put',
        headers: {
            'Content-Type': 'application/json',
        },
        data:{
            email,
            newPassword: values.newPassword,
        }
        
        }
        const loadingToast = toast.loading('Resetting password...');

    try{

        const {data} = await axios.request(options)
        console.log('reset password response', data);
        setError(null)
        toast.success('Password reset successfully!')
        localStorage.removeItem('resetEmail')
        setTimeout(() => {
            navigate('/login')
        }, 200)

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
        newPassword : ''
        },
        onSubmit:
        resetPassword,
        validationSchema,
    })
    
    useEffect(()=>{
        document.title = 'Reset Password';
    },[]) 
    
    return (
        <>
        <section className='flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8'>
            <div className="w-full max-w-md space-y-6 bg-white p-8 shadow-md rounded-xl">
                <form onSubmit={formik.handleSubmit} className="space-y-6 w-full max-w-md px-4 sm:px-6 md:px-8">
                    <h2 className='text-xl sm:text-2xl text-center font-semibold text-secondaryColor flex justify-center items-center gap-3'>Create New password</h2>
                    {/* newPassword */}
                    <div className='flex flex-col relative'>
                        <label htmlFor="newPassword">New Password: </label>
                        <input className='focus:outline-none bg-white grow px-3 py-1 rounded-xl border-2 border-slate-200' 
                        id="newPassword"
                        autoComplete="current-password"
                        type={showPass}
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder='newPassword' 
                        name="newPassword" 
                        />
                        <div className='cursor-pointer absolute right-4 top-[55%]' onClick={toggleShowPass}>
                        {
                            showPass ==='password' ?
                            (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>)
                            :
                            (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>)
                        }
                        
                        </div>
                    </div>
                    {formik.errors.newPassword && formik.touched.newPassword &&  <p className='py-2 font-medium my-2 text-red-600 rounded-2xl'>
                        {formik.errors.newPassword}
                        </p>
                        }
                    <div className='flex items-center justify-between'>
                        <button type="submit"
                        disabled={isLoading}
                        className={`cusrsor-pointer px-5 py-2.5 flex rounded-lg items-center justify-center text-white text-sm tracking-wider font-medium border-none outline-none ${
                            isLoading ? 'bg-secondaryColor cursor-not-allowed' : 'bg-secondaryColor hover:bg-secondaryColor active:bg-secondaryColor'
                        }`}>

                        {isLoading? (
                            <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18px" fill="#fff" className="mr-2 inline animate-spin"
                            viewBox="0 0 26.349 26.35">
                            <circle cx="13.792" cy="3.082" r="3.082" data-original="#000000" />
                            <circle cx="13.792" cy="24.501" r="1.849" data-original="#000000" />
                            <circle cx="6.219" cy="6.218" r="2.774" data-original="#000000" />
                            <circle cx="21.365" cy="21.363" r="1.541" data-original="#000000" />
                            <circle cx="3.082" cy="13.792" r="2.465" data-original="#000000" />
                            <circle cx="24.501" cy="13.791" r="1.232" data-original="#000000" />
                            <path
                                d="M4.694 19.84a2.155 2.155 0 0 0 0 3.05 2.155 2.155 0 0 0 3.05 0 2.155 2.155 0 0 0 0-3.05 2.146 2.146 0 0 0-3.05 0z"
                                data-original="#000000" />
                            <circle cx="21.364" cy="6.218" r=".924" data-original="#000000" />
                            </svg>
                            </>
                        ): ( 'Reset Password')}
                        </button>

                        <Link to={'/forgotPassword'} className='text-green-700 md:text-md sm:text-sm cursor-pointer'>forgot password?</Link>
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
