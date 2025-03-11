import { BadgeCheck, LayoutDashboard, ShoppingBasket } from "lucide-react";
import { ChartNoAxesCombined } from 'lucide-react'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

export const adminSidebarMenuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: <LayoutDashboard />,
  },
  {
    id: 'products',
    label: 'Products',
    path: '/admin/products',
    icon: <ShoppingBasket />,
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/admin/orders',
    icon: <BadgeCheck />,
  },
];


function MenuItems({setOpen}){
  const navigate = useNavigate();
  return (
    <nav className='mt-8 flex-col flex gap-2'>
      {
        adminSidebarMenuItems.map((menuItems) => (
          <div className='flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer text-xl text-slate-600 hover:bg-emerald-200 hover:text-slate-950' key={menuItems.id} onClick={() => {
            navigate(menuItems.path);
            setOpen ? setOpen(false) : null;
          }}>
            {menuItems.icon}
            <span>{menuItems.label}</span>
          </div>
        ))
      }
    </nav>
  )
}

const AdminSideBar = ({open, setOpen}) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 bg-white">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30}/>
                <span>Admin Panel</span>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen}/>
          </div>
        </SheetContent>
      </Sheet>
      <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex bg-slate-50'>
        <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate('/admin/dashboard')}>
          <ChartNoAxesCombined />
          <h1 className='text-xl font-extrabold'>Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  )
}

export default AdminSideBar
