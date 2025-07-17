import Layout from "./Components/Layout/Layout"
import '@fortawesome/fontawesome-free'
import Home from "./Pages/Home/Home"
import Products from "./Pages/Products/Products"
import { Toaster } from 'react-hot-toast';
import{createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"
import Categories from "./Pages/Categories/Categories"
import Brands from "./Pages/Brands/Brands"
import Cart from "./Pages/Cart/Cart";
import ProtectedRoutes from "./Protected/ProtectedRoutes/ProtectedRoutes";
import AuthContextProvider from "./Context/AuthContext";
import LoginProtected from "./Protected/LoginProtected";
import NotFound from "./Pages/NotFound/NotFound";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Wishlist from "./Pages/Wishlist/Wishlist";
import WishlistContextProvider from "./Context/WishlistContext";
import SpecificCategory from "./Pages/SpecificCategory/SpecificCategory";
import SpecificBrand from "./Pages/SpecificBrand/SpecificBrand";
import AllOrders from "./Pages/AllOrders/AllOrders";
import VerifyResetCode from "./Pages/VerifyResetCode/VerifyResetCode";



let routes = createBrowserRouter([
  {path:'/',element:<Layout/>,children:[
    {index:true , element:(
      <ProtectedRoutes>
        <Home/>
      </ProtectedRoutes>
    )},
    {path:'/products',element:(
      <ProtectedRoutes>
        <Products/>
      </ProtectedRoutes>
    )},
    {path:'/productDetails/:id',element:(
      <ProtectedRoutes>
        <ProductDetails/>
      </ProtectedRoutes>
    )},
    {path:'/categories',element:(
      <ProtectedRoutes>
        <Categories/>
      </ProtectedRoutes>
    )},
    {path:'/specificCategory/:id',element:(
      <ProtectedRoutes>
        <SpecificCategory/>
      </ProtectedRoutes>
    )},
    {path:'/cart',element:(
      <ProtectedRoutes>
        <Cart/>
      </ProtectedRoutes>
    )},
    {path:'/brands',element:(
      <ProtectedRoutes>
        <Brands/>
      </ProtectedRoutes>
    )},
    {path:'/specificBrand/:id',element:(
      <ProtectedRoutes>
        <SpecificBrand/>
      </ProtectedRoutes>
    )},
    {path:'/allorders',element:(
      <ProtectedRoutes>
        <AllOrders/>
      </ProtectedRoutes>
    )},
    {path:'/wishlist',element:(
      <ProtectedRoutes>
        <Wishlist/>
      </ProtectedRoutes>
    )},
    
    
    
    {path:'/login',element:(
    <LoginProtected>
      <Login/>
    </LoginProtected>
    )
    },
    {path:'/register',element:(
      <LoginProtected>
        <Register/>
      </LoginProtected>
    )},

    {
        path: '/forgotPassword',
        element: (
          <LoginProtected>
            <ForgotPassword />
          </LoginProtected>
        ),
      },
    {
        path: '/verifyResetCode',
        element: (
          <LoginProtected>
            <VerifyResetCode />
          </LoginProtected>
        ),
      },
      {
        path: '/resetPassword',
        element: (
          <LoginProtected>
            <ResetPassword />
          </LoginProtected>
        ),
      },
      {
        path: '*',
        element: <NotFound />
      }
  ]}
])

function App() {


  let client = new QueryClient()

  return (
    <>
    <QueryClientProvider client={client}>
      <AuthContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <RouterProvider router={routes}/>
            <Toaster position="top-right"/>
          </WishlistContextProvider>
        </CartContextProvider>
      </AuthContextProvider>


      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </>
  )
}

export default App
