import React, { useEffect, useState } from 'react'

// Router
import { useLocation } from 'react-router-dom'

// Components
import Footer from './Footer'
import Navbar from './Navbar'

// Constants
const fullScreenPages = [
    '/account/login',
    '/account/signup',
    '/account/onboarding',
    '/foodSpace/create'
]

function Layout({ children }) {
    const [showFooter, setShowFooter] = useState(true)
    const [showNavbar, setShowNavbar] = useState(true)
    const location = useLocation()

    useEffect(() => {
        if (fullScreenPages.includes(location.pathname)) {
            setShowFooter(false)
            setShowNavbar(false)
        } else {
            setShowFooter(true)
            setShowNavbar(true)
        }
    }, [location])

    return (
        <div className={`${(showNavbar && showFooter) ? 'bg-white' : 'bg-[#F7F6F3]'} font-body `}>
            {showNavbar && <Navbar />}
            <div className={`${showNavbar ? 'mt-16' : ''}`}>
                {children}
            </div>
            {showFooter && <Footer />}
        </div>
    )
}

export default Layout