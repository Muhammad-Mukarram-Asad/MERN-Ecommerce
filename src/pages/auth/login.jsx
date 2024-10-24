import ComponentForm from '@/components/common/form';
import { loginFormControls } from '@/config';
import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'

const Authlogin = () => {
  const initialState = {
    email: '',
    password: '',
  }
  const [formData, setFormData] = useState(initialState);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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