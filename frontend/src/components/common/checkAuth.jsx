import { Navigate, useLocation } from "react-router-dom"


const CheckAuth = ({ isAuthenticated, user, children }) => {
  // console.log(isAuthenticated, user?.role);
  const locationOfRoute = useLocation();

  // if user not authenticated and try to access "routes" other then login and register
  if (!isAuthenticated 
    && 
    !(locationOfRoute.pathname.includes('/login') || locationOfRoute.pathname.includes('/register'))) 
    {
      return <Navigate to='/auth/login'/>
  };

  // if user authenticated and try to access login and register
  if(isAuthenticated && (locationOfRoute.pathname.includes('/login') || locationOfRoute.pathname.includes('/register') || locationOfRoute.pathname.includes('/auth'))){
    if(user?.role === 'admin'){
      return <Navigate to='/admin/dashboard'/>
    }else{
      return <Navigate to='/shop/home'/>
    }
  };

  // if "user role" is admin access shopping route
  if(user?.role === 'admin' && locationOfRoute.pathname.includes('/shop')){
    return <Navigate to='/admin/dashboard'/>
  };

  // if "user" is not admin and access admin route
  if(user?.role !== 'admin' && locationOfRoute.pathname.includes('/admin')){
    return <Navigate to='/shop/home'/>
  };

  return <>{children}</>
}

export default CheckAuth;
