import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import React, { useState } from 'react'
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FetchAllRest } from '@/actions/Restaurants'
import { setSortOption } from '@/reducers/SortOptions'

const sortOptions = ['Last Updated', 'Estimated Delivery Time', 'Delivery Price']


const SortByDropDown = () => {

    const { city } = useParams();
    const dispatch = useDispatch();

    const { cuisines } = useSelector(state => state.cuisines)
    const { sortOptionInd } = useSelector(state => state.sortOptions)

    const onChange = (index) => {
        dispatch(setSortOption(index))
        dispatch(FetchAllRest({ city, cuisines, sortOption:index }));
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='text-sm py-2 px-4 rounded-lg outline outline-1'>
                Sort By: {sortOptions[sortOptionInd]}
                {/* <DropdownMenuLabel>Sort By: {sortOptions[selectedOption]}</DropdownMenuLabel> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                    sortOptions.map((item, index) => {
                        return <DropdownMenuItem key={index} onClick={() => onChange(index)}>
                            <DropdownMenuLabel>{item}</DropdownMenuLabel>
                        </DropdownMenuItem>
                    })
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default SortByDropDown