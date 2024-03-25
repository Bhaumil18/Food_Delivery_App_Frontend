import { Label } from '@radix-ui/react-dropdown-menu'
import { ErrorMessage, Field } from 'formik';
import React from 'react'

const ImageSection = ({ setFieldValue, imageURL }) => {
    return (
        <div className='space-y-3'>
            <div className='space-y-1'>
                <h2 className='text-2xl font-bold'>Image Section</h2>
                <span className='text-md font-thin text-gray-500'>Add your restaurant image here.</span>
            </div>
            <div className='flex flex-col gap-4'>
                <Label className='text-xl font-semibold'>Input Image</Label>
                {
                    imageURL !== '' ? <div>
                        <img className='aspect-auto' src={imageURL} alt='image'></img>
                    </div>
                        : null
                }
                <div>
                    <ErrorMessage name={`image`} component="div" style={{ color: 'red' }} />
                    <Field name="image">
                        {({ field, form }) => (
                            <div>
                                <input
                                    id="image"
                                    name="image"
                                    type="file"
                                    onChange={(event) => {
                                        setFieldValue('image', event.currentTarget.files[0]);
                                    }}
                                />
                            </div>
                        )}
                    </Field>
                </div>
            </div>
        </div>
    )
}

export default ImageSection