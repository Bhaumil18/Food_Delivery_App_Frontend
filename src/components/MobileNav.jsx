import { NavLink } from 'react-router-dom'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from './ui/sheet'
import { CircleUser, Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LogOut } from '@/actions/User'

const MobileNav = () => {

  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail('' || user?.email);
  }, [user])

  const handleLogout = () => {
    dispatch(LogOut());
  }

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Menu className='text-orange-500' />
        </SheetTrigger>
        <SheetContent className='space-y-3'>
          <SheetTitle className='mt-8'>
            {user == null ? (
              <span>Welcome to MernRestaurant</span>
            ) : (
              <div className='flex gap-2 items-center'>
                <CircleUser className='text-orange-500' />
                {email}
              </div>
            )}
          </SheetTitle>
          <Separator />
          <SheetDescription className='flex'>
            {user == null ? (
              <Button className='bg-orange-500 font-bold flex-1'>
                <NavLink to={'/login'}>Log In</NavLink>
              </Button>
            ) : (
              <span className='flex flex-1 flex-col gap-4'>
                <NavLink to={'/user-profile'}>User Profile</NavLink>
                <Button onClick={handleLogout} className='bg-orange-500 font-bold flex flex-1'>
                  Logout
                </Button>
              </span>
            )}
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileNav
