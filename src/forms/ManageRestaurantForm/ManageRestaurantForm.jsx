import React, { useEffect, useState } from 'react'
import DetailsSection from './DetailsSection'
import { Button } from '@/components/ui/button';
import { Oval } from 'react-loader-spinner'
import { Formik, Form, FastField } from "formik";
import * as Yup from 'yup'
import { Separator } from '@/components/ui/separator';
import CuisinesForm from './CuisinesSection';
import MenuSection from './MenuSection';
import ImageSection from './ImageSection';
import axios from 'axios';
import { toast } from 'sonner';

const validationSchema = Yup.object().shape({
    restaurantName: Yup.string().required('Restaurant name is required.'),
    city: Yup.string().required('City name is required.'),
    country: Yup.string().required('Country name is required.'),
    deliveryPrice: Yup.number().positive('Delivery price must be positive.').required('Delivery price is required.'),
    estimatedDeliveryTime: Yup.number().positive('Estimated delivery time must be positive.').required('Estimated delivery time is required.'),
    cuisines: Yup.array().required('At least one agreement must be checked').min(1, 'At least one agreement must be checked'),
    menu: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required('Name is required'),
            price: Yup.number().positive('Price must be positive').required('Price is required'),
        })
    ),
    // image: Yup.mixed()
})

const ManageRestaurantForm = () => {

    // For Loading Button
    const [isButtonLoading, setIsButtonLoading] = useState(false)

    // For Loading page
    const [isLoading, setIsLoading] = useState(false);

    // Schema of menuItems
    const [menuItems, setMenuItems] = useState([{ name: '', price: '' }]);

    // For initialValue
    const [details, setdetails] = useState(
        {
            restaurantName: '',
            city: '',
            country: '',
            deliveryPrice: '50',
            estimatedDeliveryTime: '30',
            cuisines: [],
            menu: menuItems,
            image: null
        }
    )

    // Image URL
    const [imageURL, setImageURL] = useState('');

    // Editing or Not
    const [edit, setEdit] = useState(false);

    const getRestaurantData = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem('token');
            const restaurant = await axios.get(' https://food-delivery-app-backend-3oiy.onrender.com/api/my/restaurant', {
                headers: {
                    Authorization: `Sonu ${token}`
                }
            })
            // console.log(restaurant)
            if (restaurant.data.data != null) {
                setEdit(true);
                const data = restaurant.data.data;
                setdetails((prev) => ({
                    ...prev,
                    ['restaurantName']: data.restaurantName,
                    ['city']: data.city,
                    ['country']: data.country,
                    ['deliveryPrice']: data.deliveryPrice,
                    ['estimatedDeliveryTime']: data.estimatedDeliveryTime,
                    ['cuisines']: data.cuisines,
                    ['menu']: data.menuItems
                }))
                setImageURL(data.imageUrl);
            }
            setIsLoading(false);
            // console.log(restaurant.data.data);
        } catch (error) {

        }
    }

    useEffect(() => {
        getRestaurantData();
    }, [])


    const handleSubmit = async (values) => {
        setIsButtonLoading(true)
        let formData = new FormData();
        formData.append("restaurantName", values.restaurantName)
        formData.append("city", values.city)
        formData.append("country", values.country)
        formData.append("deliveryPrice", values.deliveryPrice)
        formData.append("estimatedDeliveryTime", values.estimatedDeliveryTime)

        values.cuisines.forEach((item, index) => {
            formData.append(`cuisines[${index}]`, item);
        });

        values.menu.forEach((item, index) => {
            formData.append(`menuItems[${index}][name]`, item.name)
            formData.append(`menuItems[${index}][price]`, item.price)
        })

        formData.append('image', values.image);

        const token = localStorage.getItem('token');


        try {
            if (edit) {
                const response = await axios.put(' https://food-delivery-app-backend-3oiy.onrender.com/api/my/restaurant', formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Sonu ${token}`
                        },
                    });
                toast.success(response.data.msg)
                // setEdit(false)
            }
            else {
                const response = await axios.post('http://localhost:5000/api/my/restaurant', formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Sonu ${token}`
                        },
                    });
                toast.success(response.data.msg)
            }
            // console.log('Image uploaded successfully:', response.data);

        } catch (error) {
            toast.error(error.response.data.msg);
        }

        setIsButtonLoading(false);
    };

    if (isLoading) {
        return <Oval
            visible={true}
            height="100"
            width="100"
            strokeWidth="5"
            color="#fff"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    }

    return (

        <Formik initialValues={details} validationSchema={validationSchema} onSubmit={handleSubmit}>

            {({ values, setFieldValue, formikProps }) => (

                <Form className='space-y-8'>
                    <DetailsSection />

                    <Separator />

                    <CuisinesForm />

                    <Separator />

                    <MenuSection
                        values={values}
                    />

                    <ImageSection setFieldValue={setFieldValue} imageURL={imageURL} />

                    <Button type='submit' className='bg-orange-500 min-w-[10rem]'>{
                        isButtonLoading ?
                            <Oval
                                visible={true}
                                height="20"
                                width="20"
                                strokeWidth="5"
                                color="#fff"
                                ariaLabel="oval-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                            : <>Submit</>}</Button>

                </Form>
            )}
        </Formik>
    )
}

export default ManageRestaurantForm