import React from 'react'
import { cuisineList } from './../../config/RestaurantOptionCuisines';
import { Field, ErrorMessage } from "formik";
import { Label } from '@/components/ui/label';


const CuisinesForm = () => {
  return (
    <div className='space-y-3'>
      <div className='space-y-1'>
        <h2 className='text-2xl font-bold'>Cuisines</h2>
        <p className='text-md font-normal text-gray-500'>Select the cuisines that your restaurant serves.</p>
      </div>
      <div className='space-y-1'>
        <div className='grid grid-cols-3 md:grid-cols-5 '>
          {
            cuisineList.map((cuisine, index) => {
              return (
                <div className='flex gap-3 p-2 items-center' key={`cuisine${index}`}>
                  <Field className='transform scale-125' type="checkbox" id={`cuisine${index}`} name="cuisines" value={cuisine} />
                  <Label htmlFor={`cuisine${index}`}>{cuisine}</Label>
                </div>
              )
            })
          }
        </div>
      </div>
      <ErrorMessage name='cuisines' component="span" className='text-red-500 font-semibold' />
    </div>
  )
}

export default CuisinesForm