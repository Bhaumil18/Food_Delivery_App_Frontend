import { Banknote, Clock, Dot } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const SearchResultCard = ({ restaurant }) => {
    return (
        <NavLink to={`/restuarant/${restaurant._id}`} className='flex flex-col md:flex-row rounded-xl gap-4'>
            <div id='image' className='rounded-xl overflow-hidden'>
                <img src={restaurant.imageUrl} className='w-full md:aspect-video h-52 object-cover rounded-xl hover:scale-105 transition-all ease-linear duration-100' alt="" />
                {/* <img src={'https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg'} className='w-full md:aspect-video h-44 object-cover rounded-xl hover:scale-105 transition-all ease-linear duration-100' alt="" /> */}
            </div>
            <div id='content' className='flex flex-1 gap-2'>
                <div className='flex flex-1 flex-col w-3/5 gap-5'>
                    <div id='resName' className='flex text-xl font-bold'>{restaurant.restaurantName}</div>
                    <div className='flex flex-wrap gap-2'>
                        {
                            restaurant.cuisines.map((item, index) => {
                                return <span key={index} className='flex h-fit'>
                                    <span className='hover:underline transition-all ease-linear duration-150'>{item}</span>
                                    {index < restaurant.cuisines.length - 1 ? <Dot /> : null}
                                </span>
                            })
                        }
                    </div>
                </div>
                <div className='flex flex-col justify-center w-2/5 gap-5'>
                    <div className='flex gap-4'>
                        <Clock className='text-red-500' />
                        <span>{restaurant.estimatedDeliveryTime} mins</span>
                    </div>
                    <div className='flex gap-4'>
                        <Banknote className='text-green-500' />
                        <span>Delivery starts from {restaurant.deliveryPrice}₹.</span>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}

export default SearchResultCard