import axios from 'axios'
import { useFormik } from 'formik'
import { CircleUserRound } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { authContext } from '../../Context/AuthContext'




export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error , setError]=useState()
  const [showPass , setShowPass]=useState('password')
  const navigate = useNavigate()
  const {setToken , verifyToken} = useContext(authContext)

function toggleShowPass(){
  setShowPass(showPass === 'password' ? 'text':'password')
}

const passReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{5,}$/

const validationSchema = Yup.object({
    email : Yup.string().required('*Email is required').email('*must be an email'),
    password: Yup.string().required('*password is required').matches(passReg , '* Minimum 5 characters, at least one upper case English letter, one lower case English letter, one number and one special character'),
})


async function sendDataToSignIn(values){
  setIsLoading(true);
  
  const options ={
    url:'https://ecommerce.routemisr.com/api/v1/auth/signin',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      },
    data:values
  }


  let loadingToast = toast.loading('Loading...')

  try{
    const data = await axios.request(options)
    localStorage.setItem('token', data?.data?.token)
    setToken(data?.data?.token)
    
    
    verifyToken()
    toast.success('logged in!')
    navigate('/')
  }catch(err){
    console.error(err)
    toast.error(err.response?.data?.message)
    setError(err.response?.data?.message)
  }finally{
    toast.dismiss(loadingToast)
    setIsLoading(false)
  }
  
}

let formik = useFormik({
  initialValues :{
    email :'',
    password: '',
  },
  onSubmit:
    sendDataToSignIn,
  validationSchema
})
  
useEffect(()=>{
  document.title = 'Login'
},[]) 
  
  return (
    <>
      <section className='flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md space-y-6 bg-white p-8 shadow-md rounded-xl'>
        <form className='space-y-6 w-full' onSubmit={formik.handleSubmit}>
          <h2 className='text-xl sm:text-2xl text-center font-semibold text-secondaryColor flex justify-center items-center gap-3'> Login <CircleUserRound/></h2>
          {/* UserEmail */}
          <div className='flex flex-col'>
            <label htmlFor="email">Email address: </label>
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
            {formik.errors.email && formik.touched.email &&  <p className='py-2 my-2 font-medium text-red-600 rounded-2xl'>
              {formik.errors.email}
            </p>
            }
          </div>
          {/* Password */}
          <div className='flex flex-col relative'>
            <label htmlFor="password">Password: </label>
            <input className='focus:outline-none bg-white grow px-3 py-1 rounded-xl border-2 border-slate-200' 
            id="password"
            autoComplete="current-password"
            type={showPass}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='password' 
            name="password" 
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
          {formik.errors.password && formik.touched.password &&  <p className='py-2 font-medium my-2 text-red-600 rounded-2xl'>
              {formik.errors.password}
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
              ): ( 'Login')}
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
