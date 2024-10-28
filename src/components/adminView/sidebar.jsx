import { adminSidebarMenuItems } from '@/config';
import { ChartNoAxesCombined} from 'lucide-react';
import React, {Fragment} from 'react'
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '../ui/sheet';


const AdminSidebar = ({open, setOpen}) => {
  const navigate = useNavigate();


  function menuItems({setOpen}) {
    return (
      <nav className="mt-8 flex-col gap-2">
        {adminSidebarMenuItems.map((item) => (
          <div
            className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground text-xl cursor-pointer"
            key={item.id}
            onClick={() => {navigate(item.path);
              setOpen ? setOpen(false) : null
            }}
          >
            {item.icon}
            <span> {item.label} </span>
          </div>
        ))}
      </nav>
    );
  }
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
            <SheetClose className="p-0 bg-white hover:bg-transparent" />
            <SheetTitle className="flex gap-2 mt-10 mb-5">
              <ChartNoAxesCombined size={30} />
              <h1 className="text-xl font-extrabold">Admin Panel</h1>

            </SheetTitle>
            </SheetHeader>
            {menuItems({setOpen})}
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          className="flex items-center gap-2"
          onClick={() => navigate("/admin/dashboard")}
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-xl font-extrabold">Admin Panel</h1>
        </div>

        {menuItems({setOpen})}
      </aside>
    </Fragment>
  );
}

export default AdminSidebar