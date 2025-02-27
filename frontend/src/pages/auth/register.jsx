import CommonForm from '../../components/common/commonForm';
import { registerFormControl } from '../../config/index.js';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const initialState = {
  userName: "",
  email: "",
  password: ""
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const handleOnSubmit = (event) => {
    event.preventDefault();
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
