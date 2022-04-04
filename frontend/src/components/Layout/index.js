import React, { useEffect, useState } from 'react'

// Redux
import { useSelector } from 'react-redux'

// Router
import { useLocation, useNavigate } from 'react-router-dom'

// Components
import Footer from './Footer'
import Navbar from './Navbar'

// Icons 
import { BsFillGridFill, BsFillPlusSquareFill } from 'react-icons/bs'
import { FaRegUser, FaUserAlt, FaBell, FaRegBell } from 'react-icons/fa'


// Constants
const publicPages = [
    '/',
    '/product',
]



function Layout({ children }) {
    const [showFooter, setShowFooter] = useState(true)
    const [showNavbar, setShowNavbar] = useState(true)
    const auth = useSelector(state => state.auth)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (auth.token && location.pathname === '/') {
            navigate('/account')
        }

        if (publicPages.includes(location.pathname)) {
            setShowFooter(true)
            setShowNavbar(true)
        } else {
            setShowFooter(false)
            setShowNavbar(false)

        }
    }, [location])

    return (
        <div className={`${(showNavbar && showFooter) ? 'bg-white' : 'bg-[#F7F6F3] '}  font-body `}>
            {showNavbar && <Navbar />}
            <div className={`${showNavbar ? 'mt-16' : ''}`}>
                {children}
            </div>

            {/* Mobile Footer */}
            <footer className='sm:hidden bg-red-400 fixed bottom-0  w-full p-5 flex justify-evenly items-center'>
                <BsFillGridFill className='inline-block text-xl text-secondary' />
                <FaRegBell className='inline-block text-xl text-secondary' />
                <BsFillPlusSquareFill className='inline-block text-3xl fill-primary-500' />
                {location.pathname === '/account'
                    ? <FaUserAlt className='inline-block text-xl text-secondary' />
                    : <FaRegUser className='inline-block text-xl text-secondary' />
                }

            </footer>

            {showFooter && <Footer />}
        </div>
    )
}

export default Layout