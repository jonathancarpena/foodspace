import React, { useEffect, useState } from 'react'

// Router
import { useLocation } from 'react-router-dom'

// Components
import Footer from './Footer'
import Navbar from './Navbar'

function Layout({ children }) {
    const [showFooter, setShowFooter] = useState(true)
    const [showNavbar, setShowNavbar] = useState(true)
    const location = useLocation()

    useEffect(() => {
        if (location.pathname.includes('login') || location.pathname.includes('signup')) {
            setShowFooter(false)
            setShowNavbar(false)
        } else {
            setShowFooter(true)
            setShowNavbar(true)
        }
    }, [location])

    return (
        <div className=' font-body'>
            {showNavbar && <Navbar />}
            <div className='mt-16 '>
                {children}
            </div>
            {showFooter && <Footer />}
        </div>
    )
}

export default Layout