import { AlignJustify, LogOut } from 'lucide-react'
import React from 'react'
import Button from '@/components/ui/button'

const AdminHeader = ({setOpen}) => {
  return (
    <header className='flex items-center justify-between px-4 py-3 bg-background border-b'>
       <Button className='lg:hidden sm:block text-white' onClick={() => setOpen(true)}>
        <AlignJustify />
        <span className='sr-only'>Toggle Menu</span>
       </Button>
       <div className='flex flex-1 justify-end '>
        <Button className='text-white inline-flex items-center rounded-md px-4 py-2 text-sm font-medium shadow'>
          <LogOut />
          Logout
        </Button>

       </div>
    </header>
  )
}

export default AdminHeader