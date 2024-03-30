import { getRestaurantData } from '@/actions/Restaurant';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import RestaurantMenu from '@/components/RestaurantMenu';

const RestaurantDetail = () => {
    const dispatch = useDispatch();
    const { restaurantId } = useParams();
    const { restaurant } = useSelector(state => state.restaurant);

    useEffect(() => {
        dispatch(getRestaurantData({ id: restaurantId }))
    }, [])

    if (!restaurant) {
        return <>Loading ...</>
    }

    return (
        <RestaurantMenu />
    )
}

export default RestaurantDetail