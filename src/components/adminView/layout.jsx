import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './sidebar'
import AdminHeader from './header'
const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <main className='flex min-h-screen w-full'>
        {/* Admin Sidebar */}
        <AdminSidebar
        open={openSidebar}
        setOpen={setOpenSidebar}
        />
        <section className='flex flex-1 flex-col'>
            {/* Admin Header */}
            <AdminHeader
             open={openSidebar}
             setOpen={setOpenSidebar}
            />
            <div className='flex flex-1 bg-muted/40 p-4 md:p-6'>
                <Outlet />
            </div>

        </section>
    </main>
  )
}

export default AdminLayout