import { HousePlug, Menu, ShoppingCart } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '../../config/index'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'


function MenuItems(){
  return(
    <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
      {
        shoppingViewHeaderMenuItems.map((menuItem) => <Link className='text-sm font-medium' key={menuItem.id} to={menuItem.path}>{menuItem.label}</Link>)
      }
    </nav>
  )
}

function HeaderRightContent(){
  return (
    <div className='flex lg:items-center lg:flex-row flex-col gap-4'>
      <Button variant="outline" size="icon">
        <ShoppingCart className='w-6 h-6'/>
        <span className='sr-only'>User Cart</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black" size="icon">
            <AvatarFallback className="bg-black text-white font-extrabold">JB</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>
            Logged in as
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
const ShoppingHeader = () => {
  const {isAuthenticated, user} = useSelector((state) => state.auth_slice);
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-gray-300'>
      <div className='flex h-16 items-center justify-between px-4 md:px-6'>
        <Link to={"/shop/home"} className='flex items-center gap-2'>
        <HousePlug className='h-6 w-6'/>
        <span className='font-bold'>Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden" >
              <Menu className='h-6 w-6' />
              <span className='sr-only'>Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full bg-white max-w-xs" >
            <MenuItems />
          </SheetContent>
        </Sheet>

        <div className='hidden lg:block'>
          <MenuItems />
        </div>

        {
          isAuthenticated ? <div>
            <HeaderRightContent />
          </div> : null
        }
      </div>
    </header>
  )
}

export default ShoppingHeader
