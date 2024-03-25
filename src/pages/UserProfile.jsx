import { UpdateUser } from '@/actions/User'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const UserProfile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);


    const [data, setData] = useState({
        email: '',
        name: '',
        address: '',
        city: '',
        pincode: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(UpdateUser(data))
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const loadData = () => {
        const { name, email, address, city, pincode } = user || {};
        setData({
            name: name || '',
            email: email || '',
            address: address || '',
            city: city || '',
            pincode: pincode || ''
        });
    };


    useEffect(() => {
        loadData();
    }, [user])

    return (
        <div className='bg-gray-100 rounded-lg p-5 md:p-10'>
            <form className='space-y-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-1'>
                    <h2 className='text-2xl font-bold'>User Profile</h2>
                    <p className='text-md'>View and change profile information here.</p>
                </div>
                <div className='flex flex-col gap-1'>
                    <Label className='font-semibold'>Email</Label>
                    <Input disabled value={data?.email} name='email' className='shadow-sm' />
                </div>
                <div className='flex flex-col gap-1'>
                    <Label className='font-semibold'>Name</Label>
                    <Input onChange={handleChange} value={data?.name} name='name' className='shadow-sm' />
                </div>
                <div className='flex flex-col gap-1'>
                    <Label className='font-semibold'>Address</Label>
                    <Input onChange={handleChange} value={data?.address} name='address' className='shadow-sm' />
                </div>
                <div className='flex gap-5'>
                    <div className='flex flex-1 flex-col gap-1'>
                        <Label className='font-semibold'>City</Label>
                        <Input onChange={handleChange} value={data?.city} name='city' className='shadow-sm' />
                    </div>
                    <div className='flex flex-1 flex-col gap-1'>
                        <Label className='font-semibold'>Pincode</Label>
                        <Input onChange={handleChange} value={data?.pincode} name='pincode' className='shadow-sm' />
                    </div>
                </div>
                <div className='flex'>
                    <Button className='flex-1 bg-orange-500 hover:bg-white hover:text-orange-500'>Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default UserProfile