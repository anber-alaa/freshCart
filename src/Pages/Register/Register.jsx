import axios from 'axios'
import { CircleUserRound } from 'lucide-react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'



export default function Register() {

  let navigate = useNavigate()

const passReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{5,}$/
const phoneReg = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/;


const validationSchema = Yup.object({
    name : 
    Yup.string()
    .required('*Name is required')
    .min(3,'*The name must be at least 3 chars')
    .max(20,'*must be less than 20 chars'),

    email : 
    Yup.string()
    .required('*Email is required')
    .email('*must be an email'),
    
    password: 
    Yup.string()
    .required('*Password is required')
    .matches(passReg , '*Minimum five characters, at least one upper case English letter, one lower case English letter, one number and one special character'),
    
    rePassword:
    Yup.string()
    .required('*Confirm password is required')
    .oneOf([Yup.ref('password')],'*must match your password'),
    
    phone:
    Yup.string()
    .required('*Phone is required')
    .matches(phoneReg, '*must be Egyptian phone number')
})


async function sendDataToSignUp(values){
  console.log(values)
  const options ={
    url:'https://ecommerce.routemisr.com/api/v1/auth/signup',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      },
    data:values
  }


  let loadingToast = toast.loading('Loading...')
  try{
    const res = await axios.request(options)
    console.log(res)
    toast.success('Successfully created !')
    
    
    setTimeout(()=>{
      navigate('/login')
    },2000)
  }catch(err){
    console.error(err,'error in send data to signup')
    toast.error(err.response.data.message)
  }finally{
    toast.dismiss(loadingToast)
  }
  
}

let formik = useFormik({
  initialValues :{
    name :'',
    email :'',
    password: '',
    rePassword:'',
    phone:'',
  },
  onSubmit: sendDataToSignUp,
  validationSchema
})

useEffect(()=>{
  document.title = 'Register'
},[]) 

return (
    <>
      <div className='flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8'>
        <div className="w-full max-w-md space-y-6 bg-white p-8 shadow-md rounded-xl">        
        <form className='space-y-6 w-full max-w-md px-4 sm:px-6 md:px-8' onSubmit={formik.handleSubmit}>
          <h2 className='text-2xl font-semibold text-secondaryColor flex items-center justify-center gap-2'> Register Now <CircleUserRound/></h2>
          {/* UserName */}
          <div className='flex flex-col'>
            <label htmlFor="email">Name : </label>
            <input className='focus:outline-none bg-white grow px-3 py-1 rounded-xl border-2 border-slate-200' 
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Name' 
            name="name" 
            />

            {formik.errors.name && formik.touched.name &&  <p className='p-2 my-2 text-red-800 rounded-2xl'>
              {formik.errors.name}
            </p>
            }

          </div>
          {/* UserEmail */}
          <div className='flex flex-col'>
            <label htmlFor="email">Email address: </label>
            <input className='focus:outline-none bg-white grow px-3 py-1 rounded-xl border-2 border-slate-200' 
            type="email" 
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Email' 
            name="email" 
            />
            {formik.errors.email && formik.touched.email &&  <p className=' p-2 my-2 text-red-800 rounded-2xl'>
              {formik.errors.email}
            </p>
            }
          </div>
          {/* Password */}
          <div className='flex flex-col'>
            <label htmlFor="password">Password: </label>
            <input className='focus:outline-none bg-white grow px-3 py-1 rounded-xl border-2 border-slate-200' 
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='password' 
            name="password" 
            />
            {formik.errors.password && formik.touched.password &&  <p className=' p-2 my-2 text-red-800 rounded-2xl'>
              {formik.errors.password}
            </p>
            }
          </div>
          {/* Confirm Password */}
          <div className='flex flex-col'>
            <label htmlFor="password"> Confirm Password: </label>
            <input className='focus:outline-none bg-white grow px-3 py-1 rounded-xl border-2 border-slate-200' 
            type="password" 
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='Confirm password' 
            name="rePassword" 
            />
            {formik.errors.rePassword && formik.touched.rePassword &&  <p className='p-2 my-2 text-red-800 rounded-2xl'>
              {formik.errors.rePassword}
            </p>
            }
          </div>
          {/* Phone */}
          <div className='flex flex-col'>
            <label htmlFor="password"> Phone: </label>
            <input className='focus:outline-none bg-white grow px-3 py-1 rounded-xl border-2 border-slate-200' 
            type="tel"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder='phone' 
            name="phone" 
            />
            {formik.errors.phone && formik.touched.phone &&  <p className=' p-2 my-2 text-red-800 rounded-2xl'>
              {formik.errors.phone}
            </p>
            }
          </div>

          <button type='submit' className='px-5 py-2 bg-secondaryColor text-white rounded-xl hover:bg-secondaryColor/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondaryColor'>Register</button>
        </form>

        </div>
      </div>
    </>
  )
}
