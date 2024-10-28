import ComponentForm from '@/components/common/form';
import { loginFormControls } from '@/config';
import React, { useState } from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { loginUser } from '@/store/authSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const Authlogin = () => {
  const initialState = {
    email: '',
    password: '',
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(formData))
    .unwrap() // Unwraps the result of the thunk action, allowing us to handle fulfilled and rejected states directly
    .then((response) => {
      toast.success(`${response?.data?.message || 'Login successful'}`);
    })
    .catch((error) => {
      toast.error(`Login failed: ${error?.message}`);
    });
  }
  return (
    <main className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>
          Login to your account
        </h1>
        <p className='mt-2'>Don't have an account?
          <Link className="font-medium text-primary ml-2 hover:underline" to="/auth/register">Signup</Link>
        </p>
      </div>

      <ComponentForm 
      formControls={loginFormControls}
      formData={formData}
      setFormData={setFormData}
      buttonText="Login"
      onSubmit={handleSubmit}
      />
    </main>
  )
}

export default Authlogin