import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <main className='flex min-h-screen w-full'>
        <section className='hidden lg:flex items-center justify-center bg-black w-1/2 px-12 '>
         <div className='max-w-md space-y-6 text-center text-primary-foreground'>
            <h1 className='text-4xl font-extrabold tracking-tight'>Welcome to M. Ecommerce Shopping</h1>
         </div>

        </section>

        <section className='flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
            <Outlet /> 
        </section>
    </main>
  )
}

export default AuthLayout