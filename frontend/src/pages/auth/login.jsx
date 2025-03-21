import { Link } from 'react-router-dom';
import CommonForm from '../../components/common/commonForm';
import { loginFormControl } from '../../config/index.js';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/auth-slice/authSlice';
import toast from 'react-hot-toast';

const initialState = {
  email: "",
  password: ""
};


const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const handleOnSubmit = (event) => {
    event.preventDefault();
    // console.log(formData);
    dispatch(loginUser(formData)).then((data) => {
      // console.log(data);
      if(data?.payload?.success){
        toast.success(data?.payload?.message);
      }else{
        toast.error(data?.error?.message || data?.payload?.message);
      }
    })
  }
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-black'>Login</h1>
        <p className='mt-2'>Don't have an account? <Link className='font-medium text-black hover:underline' to="/auth/register">SignUp</Link> </p>
        
      </div>

      <CommonForm 
        formControls={loginFormControl}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleOnSubmit}
        buttonText={"Login"}
      />
    </div>
  )
}

export default Login
