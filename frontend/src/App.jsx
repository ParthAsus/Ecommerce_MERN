import { Route, Routes } from "react-router-dom"
import AuthLayout from "./components/auth/layout"
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"
import AdminLayout from "./components/admin-view/layout"
import AdminDashboardPage from "./pages/admin-view/adminDashboardPage"
import AdminFeaturesPage from "./pages/admin-view/adminFeaturesPage"
import AdminOrdersPage from "./pages/admin-view/adminOrdersPage"
import AdminProductsPage from "./pages/admin-view/adminProducts"
import NotFoundPage from "./pages/not-found/notFoundPage"
import ShoppingLayout from "./components/shopping-view/layout"
import ShoppingAccountPage from "./pages/shopping-view/shoppingAccountPage"
import ShoppingCheckoutPage from "./pages/shopping-view/shoppingCheckoutPage"
import ShoppingHomePage from "./pages/shopping-view/shoppingHomePage"
import ShoppingListingPage from "./pages/shopping-view/shoppingListingPage"
import CheckAuth from "./components/common/checkAuth"
import { Toaster } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./store/auth-slice/authSlice"

function App() {

  const isAuthenticated = true;
  const user = {
    name: "John Doe",
    role: 'admin'
  };

  const {isLoading} = useSelector((state) => state.auth_slice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if(isLoading){
    return <h1>Loading..</h1>
  }

  // console.log(isAuthenticated, user?.role);
  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white">
        <Routes>
          <Route path="*" element={<NotFoundPage />} />

          {/* Auth Routes */}
          <Route path="/auth" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout/>
            </CheckAuth>
          }>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout/>
            </CheckAuth>
          }>
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="features" element={<AdminFeaturesPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="products" element={<AdminProductsPage />} />
          </Route>

          {/* Shopping Routes */}
          <Route path="/shop" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }>
            <Route path="account" element={<ShoppingAccountPage />} />
            <Route path="checkout" element={<ShoppingCheckoutPage />} />
            <Route path="home" element={<ShoppingHomePage />} />
            <Route path="listing" element={<ShoppingListingPage />} />
          </Route>


        </Routes>
      </div>

      <Toaster />
    </>
  )
}

export default App
