import { FetchAllRest } from '@/actions/Restaurants';
import CuisinesFilter from '@/components/CuisinesFilter';
import PaginationSelector from '@/components/PaginationSelector';
import SearchBar from '@/components/SearchBar';
import SearchResultCard from '@/components/SearchResultCard';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom';
import { cuisineList } from './../config/RestaurantOptionCuisines';
import { SetCuisine } from '@/reducers/CuisineFilter';

const SearchPage = () => {

    const dispatch = useDispatch();
    const { isLoading, restaurants, pagination } = useSelector(state => state.restaurants);
    const { city } = useParams();
    const { cuisines } = useSelector(state => state.cuisines)

    useEffect(() => {
        dispatch(FetchAllRest({ city }));
    }, [])

    if (isLoading || !restaurants) {
        return <>Loading...</>
    }

    let newArr = new Array();
    newArr = [...cuisines];

    const onSubmit = (values) => {
        const searchBy = values.search;
        if (cuisineList.includes(searchBy)) {
            newArr.push(searchBy);
            dispatch(SetCuisine(newArr));
        }
        dispatch(FetchAllRest({ city, searchBy }));
    }

    return (
        <div className='flex gap-4 lg:flex-row flex-col'>
            <div className='md:min-w-96'>
                <CuisinesFilter />
            </div>
            <div className='flex flex-col flex-1 gap-5'>
                <SearchBar placeholder={"Search cuisine or Restaurant's name"} onSubmit={onSubmit} required={true} reset={true} />
                <div id='r-first' className='flex justify-between'>
                    <div className='flex gap-2 items-center'>
                        <span className='text-xl font-bold'>{pagination?.total} Restaurant found in {city}.</span>
                        <NavLink to={'/'} className={'text-sm font-semibold text-blue-700'}>Change Location</NavLink>
                    </div>
                    <div>
                        Show dropdown here...
                    </div>
                </div>
                <div className='flex flex-col gap-8'>
                    {
                        restaurants?.map((restaurant, index) => {
                            return <SearchResultCard key={index} restaurant={restaurant} />
                        })
                    }
                </div>
                <PaginationSelector />
            </div>
        </div>
    )
}

export default SearchPage