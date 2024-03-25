import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { CircleUser } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { LogOut } from '@/actions/User'

function MainMenu({ email }) {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(LogOut());
    }

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className='flex justify-center items-center gap-2'>
                    <CircleUser className='text-orange-500'></CircleUser>
                    <span className='text-black font-semibold'>{email}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='space-y-0.5'>
                    <DropdownMenuItem>
                        <NavLink to={'/user-profile'}>User Profile</NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <NavLink to={'/my-restaurant'}>Manage Restaurant</NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Button onClick={handleLogout} className='flex flex-1 bg-orange-500'>LogOut</Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default MainMenu