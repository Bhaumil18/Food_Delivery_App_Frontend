import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import React from 'react'

const Layout1 = ({children , image = true}) => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            {
            image ? <Hero /> : null
            }
            <div className="container flex-1 py-10 ">{children}</div>
            <Footer />
        </div>
    )
}

export default Layout1