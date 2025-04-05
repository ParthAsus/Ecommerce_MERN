import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '../../config/index'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { logoutUser } from '../../store/auth-slice/authSlice'


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
  const {user} = useSelector((state) => state.auth_slice);

  function handleLogout(){
    dispatch(logoutUser());
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className='flex lg:items-center lg:flex-row flex-row gap-4'>
      <Button variant="outline" size="icon">
        <ShoppingCart className='w-6 h-6'/>
        <span className='sr-only'>User Cart</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black" size="icon">
            <AvatarFallback className="bg-black text-white font-extrabold">{user?.userName.toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56 bg-white mt-2">
          <DropdownMenuLabel>
            Logged in as {user?.userName.toUpperCase()}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate('/shop/account')} className='hover:bg-slate-300 cursor-pointer'>
            <UserCog className='mr-2 h-4 w-4'/>
            Account
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem className='hover:bg-slate-300 cursor-pointer' onClick={handleLogout} >
            <LogOut className='mr-2 h-4 w-4'/>
            Logout
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
const ShoppingHeader = () => {
  const {isAuthenticated} = useSelector((state) => state.auth_slice);
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
            <HeaderRightContent />
          </SheetContent>
        </Sheet>

        <div className='hidden lg:block'>
          <MenuItems />
        </div>

        {
          isAuthenticated ? <div className='hidden lg:block'>
            <HeaderRightContent />
          </div> : null
        }
      </div>
    </header>
  )
}

export default ShoppingHeader
