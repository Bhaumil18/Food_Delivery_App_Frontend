import { Field, Form, Formik } from 'formik'
import { SearchIcon } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

const SearchBar = ({ placeholder, onSubmit, required = true, reset }) => {
    return (
        <div className='flex justify-around border border-gray-500 rounded-3xl gap-4 py-2 px-4 items-center'>
            <SearchIcon className='hidden md:block text-orange-500' />
            <Formik initialValues={{ search: '' }} onSubmit={onSubmit} onReset={onSubmit}>
                <Form className='flex flex-1 gap-1 md:gap-4 items-center'>
                    <Field className='flex-1 bg-white text-sm md:px-2 outline-none' placeholder={placeholder} name='search' type='text' required={required}></Field>
                    {
                        reset ? <Button className='bg-white text-xs md:text-sm text-black hover:bg-black hover:text-white rounded-3xl' type='reset'>Reset</Button> : null
                    }
                    <Button className='bg-orange-500 rounded-3xl text-xs md:text-sm' type='submit'>Search</Button>
                </Form>
            </Formik>
        </div>
    )
}

export default SearchBar