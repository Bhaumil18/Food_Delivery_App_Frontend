import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout1 from './layouts/Layout1'
import HomePage from './pages/HomePage'
import Layout2 from './layouts/Layout2'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import UserProfile from './pages/UserProfile'
import ProtectedRoute from './auth/ProtectedRoute'
import ManageRestaurantPage from './pages/ManageRestaurantPage'
import { useDispatch, useSelector } from 'react-redux'
import { FetchUser } from './actions/User'
import SearchPage from './pages/SearchPage'

const AppRoutes = () => {

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  const getData = () => {
    dispatch(FetchUser());
  }

  useEffect(() => {
    if (!user) {
      getData();
    }
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Layout1><HomePage /></Layout1>}></Route>
      <Route path='/login' element={<Layout2><LoginPage /></Layout2>}></Route>
      <Route path='/signup' element={<Layout2><SignUpPage /></Layout2>}></Route>
      <Route element={<ProtectedRoute />}>
        <Route path='/user-profile' element={<Layout2><UserProfile /></Layout2>}></Route>
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path='/my-restaurant' element={<Layout2><ManageRestaurantPage /></Layout2>}></Route>
      </Route>
      <Route path='restaurants/:city' element={<Layout2><SearchPage /></Layout2>}></Route>
      <Route path='*' element={<Navigate to={'/'}></Navigate>}></Route>
    </Routes>
  )
}

export default AppRoutes