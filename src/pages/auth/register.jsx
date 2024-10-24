import ComponentForm from '@/components/common/form';
import { registerFormControls } from '@/config';
import React, { useState } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { registerUser } from '@/store/authSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


const AuthRegister = () => {
  const initialState = {
    userName: '',
    email: '',
    password: '',
  }
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit =  (e) => {
    e.preventDefault();
    dispatch(registerUser(formData))
    .unwrap() // Unwraps the result of the thunk action, allowing us to handle fulfilled and rejected states directly
    .then((response) => {
      toast.success(`${response?.data?.message || 'Registration successful'}`);
      navigate('/auth/login');
    })
    .catch((error) => {
      toast.error(`Registration failed: ${error?.data?.message || 'Something went wrong'}`);
    });

}
  return (
    <main className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>
          Create a new account
        </h1>
        <p className='mt-2'>Already have an account?
          <Link className="font-medium text-primary ml-2 hover:underline" to="/auth/login">Login</Link>
        </p>
      </div>

      <ComponentForm 
      formControls={registerFormControls}
      formData={formData}
      setFormData={setFormData}
      buttonText="Register"
      onSubmit={handleSubmit}
      />
    </main>
  )
}

export default AuthRegister