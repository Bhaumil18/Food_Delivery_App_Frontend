import React, { useEffect, useState } from 'react'
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { Dot } from 'lucide-react';
import { setItem, setRestaurant, setTotal } from '@/reducers/Cart';
import { Separator } from '@radix-ui/react-dropdown-menu'
import { TrashIcon } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Label } from './ui/label'
import { Input } from './ui/input'
import { UpdateUser } from '@/actions/User';
import { useNavigate } from 'react-router-dom';


const RestaurantMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { restaurant } = useSelector(state => state.restaurant);
    const { restaurantName, items, total } = useSelector(state => state.cart)

    const [open, setOpen] = useState(false);
    const [cartItems, setCartItems] = useState(items)
    const [indexs, setIndexs] = useState([]);
    const [cartTotal, setCartTotal] = useState(total)


    const addToCart = (menuItem) => {
        if (restaurantName != '' && restaurant.restaurantName != restaurantName) {
            setOpen(true);
            return;
        }
        dispatch(setRestaurant(restaurant.restaurantName));
        const findInd = indexs.findIndex((ind) => ind == menuItem._id);
        if (findInd < 0) {
            let newInd = [...indexs, menuItem._id];
            setIndexs(newInd);
        }
        setCartItems((prevCartItems) => {
            let updatedCartItem;
            const existCartItem = prevCartItems.find((cartItem) => cartItem._id == menuItem._id);
            if (existCartItem) {
                updatedCartItem = prevCartItems.map((cartItem) => {
                    if (cartItem._id == menuItem._id) {
                        return { ...cartItem, qty: cartItem.qty + 1 }
                    } else {
                        return cartItem;
                    }
                })
            }
            else {
                updatedCartItem = [...prevCartItems, { ...menuItem, qty: 1 }];
            }
            return updatedCartItem;
        })
    }

    const IncQty = (menuItem) => {
        setCartItems((prevCartItems) => {
            let updatedCartItem;
            updatedCartItem = prevCartItems.map((cartItem) => {
                if (cartItem._id == menuItem._id) {
                    return { ...cartItem, qty: cartItem.qty + 1 }
                } else {
                    return cartItem;
                }
            })
            return updatedCartItem;
        })
    }

    const DecQty = (menuItem) => {
        setCartItems((prevCartItems) => {
            let updatedCartItem;
            updatedCartItem = prevCartItems.map((cartItem) => {
                if (cartItem._id === menuItem._id) {
                    const updatedQty = cartItem.qty - 1;
                    if (updatedQty <= 0) {
                        const filteredIndexs = indexs.filter(id => id !== menuItem._id);
                        setIndexs(filteredIndexs);
                        return null;
                    } else {
                        return { ...cartItem, qty: updatedQty };
                    }
                } else {
                    return cartItem;
                }
            }).filter(Boolean)

            return updatedCartItem;
        })
    }

    const removeItem = (menuItemId) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.filter((cartItem) => cartItem._id !== menuItemId);
            return updatedCartItems;
        });
        setIndexs((prevIndexs) => {
            const updatedIndexs = prevIndexs.filter((id) => id !== menuItemId);
            return updatedIndexs;
        });
    };


    const ChangeRest = () => {
        setCartItems([]);
        setIndexs([]);
        dispatch(setItem([]));
        dispatch(setRestaurant(restaurant.restaurantName));
        setOpen(false);
    }

    useEffect(() => {
        if (cartItems.length == 0) {
            dispatch(setRestaurant(''));
        }
        dispatch(setItem(cartItems));
        let cartTotall = cartItems.reduce((total, cartItem) => { return total + cartItem.price * cartItem.qty }, 0);
        cartTotall += restaurant.deliveryPrice;
        setCartTotal(cartTotall);
        setTotal(cartTotall)
    }, [cartItems])

    const token = localStorage.getItem('token');

    const { user } = useSelector(state => state.user);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setData(user);
            setLoading(false);
        }, 1000);
    }, [user]);

    if (loading || !data) {
        return <div>Loading...</div>;
    }

    const onCng = (e) => {
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }

    const OnUpdateDetails = (value) => {
        dispatch(UpdateUser({
            email: value.email,
            name: value.name,
            address: value.address,
            city: value.city,
            pincode: value.pincode
        }))
        navigate('/checkout')
    }

    return (
        <div className='flex flex-col  space-y-4'>

            <AlertDialog open={open} >
                <AlertDialogContent className='w-96 md:w-full'>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Replace cart item?</AlertDialogTitle>
                        <AlertDialogDescription >
                            Your cart contains dishes from <strong>{restaurantName}</strong>.Do you want to discard the selection and add dishes from <strong>{restaurant.restaurantName}</strong>?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => { setOpen(false) }}>No</AlertDialogCancel>
                        <AlertDialogAction className='bg-orange-500' onClick={ChangeRest}>Yes</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>


            <img src={restaurant.imageUrl} alt="image" className='rounded-lg max-h-[500px]' />

            <div className='flex flex-col md:flex-row gap-4'>

                <div id='left' className='md:w-3/5 rounded-lg space-y-8'>
                    <Card className='flex flex-col p-8'>
                        <span className='text-3xl font-bold'>{restaurant.restaurantName}</span>
                        <span className='text-lg font-thin'>{restaurant.country}</span>
                        <div className='flex mt-6 flex-wrap'>
                            {
                                restaurant?.cuisines?.map((item, index) => {
                                    return <span key={index} className='flex h-fit'>
                                        <span className='hover:underline transition-all ease-linear duration-150'>{item}</span>
                                        {index < restaurant.cuisines.length - 1 ? <Dot /> : null}
                                    </span>
                                })
                            }
                        </div>
                    </Card>
                    <div className='flex flex-col gap-6'>
                        <span className='text-3xl font-bold'>Menu</span>
                        <div className='flex flex-col gap-4'>
                            {
                                restaurant?.menuItems?.map((item, index) => {
                                    return <Card key={index} className='flex justify-between items-center p-8'>
                                        <div className='flex flex-col gap-4'>
                                            <span className='text-xl font-semibold'>{item.name}</span>
                                            <span className='text-lg font-bold'>₹ {item.price}</span>
                                        </div>
                                        {
                                            indexs.includes(item._id) ? (
                                                <div className='flex gap-4'>
                                                    <Button onClick={() => DecQty(item)} className='bg-orange-500 text-md'>-</Button>

                                                    <Button onClick={() => IncQty(item)} className='bg-orange-500 text-md'>+</Button>
                                                </div>
                                            )
                                                : (<Button onClick={() => addToCart(item)} className='bg-orange-500 text-md'>Add to cart</Button>)
                                        }
                                    </Card>
                                })
                            }
                        </div>
                    </div>
                </div>
                {
                    cartItems.length ? <Card className='md:w-2/5 h-fit p-8 flex flex-col space-y-6'>
                        <div>
                            <span className='text-3xl font-bold'>Your Order</span>
                        </div>
                        <div className='flex flex-col gap-3 justify-between'>
                            <div className='flex text-lg font-medium '>
                                <span className='flex-1 ' >Name</span>
                                <span className='w-1/5 ' >Price</span>
                                <span className='flex justify-center flex-1 '>Qty</span>
                                <span className='w-1/6' ></span>
                            </div>

                        </div>
                        {
                            items?.map((cartItem, index) => {
                                return <div key={index} className='flex text-md '>
                                    <span className='flex-1' >{cartItem.name}</span>
                                    <span className='w-1/5' >{cartItem.price}</span>
                                    <div className='flex flex-1 gap-2 justify-center'>
                                        {cartItem.qty}
                                    </div>
                                    <TrashIcon className='w-1/6 cursor-pointer' onClick={() => removeItem(cartItem._id)} />
                                </div>
                            })
                        }
                        <Separator />
                        <div className='flex justify-between text-md font-medium'>
                            <span>Delivery Price:</span>
                            <span>{restaurant.deliveryPrice} ₹</span>
                        </div>
                        <div className='flex justify-between text-md font-medium'>
                            <span>Total:</span>
                            <span>{cartTotal} ₹</span>
                        </div>
                        <div className='flex'>
                            <Dialog>
                                <DialogTrigger asChild>
                                    {/* Checkout Button  */}
                                    <Button className='flex-1 bg-orange-500'>{token == undefined ? "Login for Checkout" : 'Checkout'}</Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-[350px] rounded-lg md:max-w-[600px] py-8 px-10">
                                    <DialogHeader>
                                        <DialogTitle>Confirm Delivery Details</DialogTitle>
                                        <DialogDescription>
                                            View and Change your profile here. Click save when you're done.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form >
                                        <div className='flex flex-col py-4 gap-4'>
                                            <div className='flex flex-col gap-4'>
                                                <Label>Email</Label>
                                                <Input onChange={onCng} name='email' value={data.email} disabled></Input>
                                            </div>
                                            <div className='flex flex-col gap-4'>
                                                <Label>Name</Label>
                                                <Input onChange={onCng} name='name' value={data.name}></Input>
                                            </div>
                                            <div className='flex flex-col gap-4'>
                                                <Label>Address</Label>
                                                <Input onChange={onCng} name='address' value={data.address} required></Input>
                                            </div>
                                            <div className='flex gap-4'>
                                                <div className='flex flex-1 flex-col gap-4'>
                                                    <Label>City</Label>
                                                    <Input onChange={onCng} name='city' value={data.city} required></Input>
                                                </div>
                                                <div className='flex flex-1 flex-col gap-4'>
                                                    <Label>Pincode</Label>
                                                    <Input onChange={onCng} name='pincode' value={data.pincode} required></Input>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <DialogFooter>
                                        <DialogClose>
                                            <Button type="submit" onClick={() => OnUpdateDetails(data)}>Continue to payment</Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </Card>
                        :
                        <Card className='md:w-2/5 h-fit p-8 flex flex-col space-y-6'>
                            <div>
                                <span className='text-3xl font-bold'>Your cart is empty.</span>
                            </div>
                        </Card>}
            </div>
        </div>
    )
}

export default RestaurantMenu