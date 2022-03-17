import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

function Layout({ children }) {
    return (
        <div className=' font-body'>
            <Navbar />
            <div className='mt-16 '>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout