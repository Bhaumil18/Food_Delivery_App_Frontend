import React from 'react'
import { useSelector } from 'react-redux'

const Checkout = () => {
    const { restaurantName, items, total } = useSelector(state => state.cart)


    return (
        <div>
            <span>
                Your order will coming soon ...
            </span>

        </div>
    )
}

export default Checkout