import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Field, ErrorMessage, FieldArray, } from 'formik'
import React from 'react'

const MenuSection = ({ values }) => {
    return (
        <div className='space-y-3'>
            <div className='space-y-1'>
                <h2 className='text-2xl font-bold'>Menu</h2>
                <p className='text-md font-normal text-gray-500'>Create your menu and give item a name and a price.</p>
            </div>
            <div className='space-y-4'>
                <FieldArray name="menu">
                    {
                        ({ insert, remove, push }) => (
                            <div className='space-y-2'>
                                {
                                    values.menu.map((_, index) => {
                                        return <div key={index} className='flex flex-col md:flex-row gap-6'>
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex gap-4 items-center'>
                                                    <Label>Name</Label>
                                                    <ErrorMessage name={`menu.${index}.name`} component="div" style={{ color: 'red' }} />
                                                </div>
                                                <Field placeholder='pizza' type="text" name={`menu.${index}.name`} className='bg-white capitalize flex-1 px-2 py-2 border rounded-md' />
                                            </div>
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex gap-4 items-center'>
                                                    <Label>Price </Label>
                                                    <ErrorMessage name={`menu.${index}.price`} component="div" style={{ color: 'red' }} />
                                                </div>
                                                <Field placeholder='299' type="text" name={`menu.${index}.price`}  className='bg-white capitalize flex-1 px-2 py-2 border rounded-md' />
                                            </div>
                                            <div className='flex flex-col justify-end mb-1'>
                                                <Button className='bg-red-500' type="button" onClick={() => remove(index)}>Remove</Button>
                                            </div>
                                        </div>
                                    })
                                }
                                <Button className='bg-orange-500' type="button" onClick={() => push({ name: '', price: '' })}>Add MenuItem</Button>
                            </div>
                        )
                    }
                </FieldArray>
            </div>
        </div>
    )
}

export default MenuSection