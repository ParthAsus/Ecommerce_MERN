import { useDispatch } from 'react-redux';
import CommonForm from '../../components/common/commonForm';
import { registerFormControl } from '../../config/index.js';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../store/auth-slice/authSlice';
import toast from 'react-hot-toast';

const initialState = {
  userName: "",
  email: "",
  password: ""
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOnSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      console.log(data);
      if(data.payload.success){
        toast.success(data?.payload?.message);
        navigate('/auth/login');
      }else{
        toast.error(data?.error?.message || data?.payload?.message);
      }
    });
  }
  
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-black'>Create new Account </h1>
        <p className='mt-2'>Already have an account? <Link className='font-medium text-black hover:underline' to="/auth/login">Login</Link> </p>
        
      </div>

      <CommonForm 
        formControls={registerFormControl}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleOnSubmit}
        buttonText={"Sign Up"}
      />
    </div>
  )
}

export default Register
