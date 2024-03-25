import React from 'react'
import { Label } from '@/components/ui/label';
import { Field, ErrorMessage } from 'formik';

const DetailsSection = () => {


    return (
        <div className='space-y-3'>
            <div className='space-y-1'>
                <h2 className='text-2xl font-bold'>Details</h2>
                <p className='text-md font-normal text-gray-500'>Enter the details about your restaurant</p>
            </div>
            <div className='space-y-1'>
                <Label>Name</Label>
                <ErrorMessage name='restaurantName' component="span" className='text-red-500 font-semibold ml-4' />
                <div className='flex'>
                    <Field
                        id="restaurantName"
                        name="restaurantName"
                        type="text"
                        className='bg-white capitalize flex-1 px-2 py-2 border rounded-md'>
                    </Field>
                </div>
            </div>
            <div className='flex gap-5'>
                <div className='space-y-1 flex-1'>
                    <Label>City</Label>
                    <ErrorMessage name='city' component="span" className='text-red-500 font-semibold ml-4' />
                    <div className='flex'>
                        <Field
                            type="text"
                            name="city" className='bg-white capitalize flex-1 px-2 py-2 border rounded-md' />
                    </div>
                </div>
                <div className='space-y-1 flex-1'>
                    <Label>Country</Label>
                    <ErrorMessage name='country' component="span" className='text-red-500 font-semibold ml-4' />
                    <div className='flex'>
                        <Field
                            type="text"
                            name="country" className='bg-white capitalize flex-1 px-2 py-2 border rounded-md' />
                    </div>
                </div>
            </div>
            <div className='space-y-1'>
                <Label>Delivery Price (₹)</Label>
                <ErrorMessage name='deliveryPrice' component="span" className='text-red-500 font-semibold ml-4' />
                <div className='flex'>
                    <Field
                        type="number"
                        name="deliveryPrice" className='bg-white capitalize flex-1 px-2 py-2 border rounded-md' />
                </div>
            </div>
            <div className='space-y-1'>
                <Label>Estimated Delivery Time (minutes)</Label>
                <ErrorMessage name='estimatedDeliveryTime' component="span" className='text-red-500 font-semibold ml-4' />
                <div className='flex'>
                    <Field
                        type="number"
                        name="estimatedDeliveryTime" className='bg-white capitalize flex-1 px-2 py-2 border rounded-md' />
                </div>
            </div>
        </div>
    )
}

export default DetailsSection