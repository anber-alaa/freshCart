import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let authContext = createContext()


export default function AuthContextProvider({children}) {

    let [token , setToken] = useState(localStorage.getItem('token')||null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);


    async function verifyToken() {
      if (!localStorage.getItem('token')) {
      setUser(null);
      localStorage.removeItem("token");
      setLoading(false);
      return;
    }

if(localStorage.getItem('token')){
  try{
        setLoading(true);
          let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/auth/verifyToken',{
              headers:{
                token: localStorage.getItem('token')
              }
          })
          localStorage.setItem('userId',data.decoded.id)
          setUser(data.user)
          setLoading(false)   
      }catch(err){
        setError(err.response?.data?.message);
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        setLoading(false);
        console.error("Error verifying token:", err);
      }
}
    
}


  useEffect(()=>{
    verifyToken()
  }
  ,[])


  return (
    <>
      <authContext.Provider value={{token , setToken ,error, setError, user, setUser, loading, setLoading ,verifyToken}}>
        {children}
      </authContext.Provider>
    </>
  )
}
