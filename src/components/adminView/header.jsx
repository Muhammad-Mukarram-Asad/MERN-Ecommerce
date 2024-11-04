import { AlignJustify, LogOut } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import { logoutUser } from '@/store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AdminHeader = ({setOpen}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogoutUser = async () => {
    try{
      const response = await dispatch(logoutUser()).unwrap();
      console.log("logout response => ",response);
      toast.success(response?.data?.message);
      navigate('/auth/login');
    }
    catch(error){
      toast.error(error?.data?.message);
      console.log(error);
    }

  }
  return (
    <header className='flex items-center justify-between px-4 py-3 bg-background border-b'>
       <Button className='lg:hidden sm:block text-white' onClick={() => setOpen(true)}>
        <AlignJustify />
        <span className='sr-only'>Toggle Menu</span>
       </Button>
       <div className='flex flex-1 justify-end '>
        <Button className='text-white inline-flex items-center rounded-md px-4 py-2 text-sm font-medium shadow' onClick={handleLogoutUser}>
          <LogOut />
          Logout
        </Button>

       </div>
    </header>
  )
}

export default AdminHeader