import React from 'react'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination'
import { useDispatch, useSelector } from 'react-redux'
import { FetchAllRest } from '@/actions/Restaurants';
import { useParams } from 'react-router-dom';

const PaginationSelector = () => {

    const { city } = useParams();
    const dispatch = useDispatch();

    const { cuisines } = useSelector(state => state.cuisines)
    const { sortOptionInd } = useSelector(state => state.sortOptions)
    const { pagination } = useSelector(state => state.restaurants)

    const pages = [];
    for (let index = Math.max(pagination.page - 1, 1); index <= Math.min(pagination.page + 1, pagination.pages); index++) {
        pages.push(index);
    }

    const OnPageChange = (e) => {
        const page = parseInt(e.target.innerText);
        // console.log(typeof (page));
        dispatch(FetchAllRest({ city, page, cuisines, sortOption:sortOptionInd }));
    }

    const OnPrevious = (e) => {
        const page = (pagination.page - 1) > 0 ? (pagination.page - 1) : pagination.page;
        dispatch(FetchAllRest({ city, page, cuisines, sortOption:sortOptionInd }));
    }

    const OnNext = (e) => {
        const page = (pagination.page + 1) <= (pagination.pages) ? (pagination.page + 1) : pagination.page;
        dispatch(FetchAllRest({ city, page, cuisines, sortOption:sortOptionInd }));
    }

    return (
        <Pagination>
            <PaginationContent>
                {
                    pagination.page > 1 ? <PaginationItem className='cursor-pointer'>
                        <PaginationPrevious onClick={OnPrevious} />
                    </PaginationItem> : null
                }
                {
                    pagination.page - 1 >= 2 ?
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem> : null
                }
                {
                    pages.map((item) => {
                        return <PaginationItem key={item} className='cursor-pointer'>
                            <PaginationLink isActive={pagination.page == item} onClick={(pagination.page != item) ? OnPageChange : () => { }}>{item}</PaginationLink>
                        </PaginationItem>
                    })
                }
                {
                    pagination.pages - pagination.page >= 2 ?
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem> : null
                }
                {
                    pagination.page < pagination.pages ? <PaginationItem disabled className='cursor-pointer ' >
                        <PaginationNext onClick={OnNext} />
                    </PaginationItem> : null
                }
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationSelector