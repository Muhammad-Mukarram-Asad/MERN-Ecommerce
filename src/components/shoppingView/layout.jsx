import React from 'react'
import { Outlet } from 'react-router-dom'
import ShoppingHeader from './header'

const ShoppingLayout = () => {
  return (
    <main className='flex flex-col bg-white overflow-hidden'>
        {/* Common Header */}
        <ShoppingHeader />
        <div className='flex flex-col w-full'>
            <Outlet />
        </div>

    </main>
  )
}

export default ShoppingLayout