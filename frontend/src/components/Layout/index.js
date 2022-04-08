import React, { useEffect, useState } from 'react'

// Redux
import { useSelector } from 'react-redux'

// Router
import { useLocation, useNavigate, Link } from 'react-router-dom'

// Components
import Footer from './Footer'
import Navbar from './Navbar'

// Icons 
import { BsFillGridFill, BsFillPlusSquareFill, BsSearch } from 'react-icons/bs'
import { FaRegUser, FaUserAlt, FaBell, FaRegBell, FaHome } from 'react-icons/fa'
import { AiOutlineHome, AiFillHome } from 'react-icons/ai'



// Constants
const publicPages = [
    '/',
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

    const homePages = ["account", "foodSpace"]
    const productPages = ["product"]
    function highlightMobileFooter(extensions) {
        return location.pathname.split('/').some((item) => extensions.includes(item))
    }


    return (
        <div className={`${(showNavbar && showFooter) ? 'bg-white' : 'bg-[#F7F6F3] '}  font-body `}>
            {showNavbar && <Navbar />}
            <div className={`${showNavbar ? 'mt-16' : ''}`}>
                {children}
            </div>

            {/* Mobile Footer */}
            <footer className='sm:hidden fixed bottom-0  w-full p-5 flex justify-evenly items-center bg-white'>
                <Link to='/account'>
                    {highlightMobileFooter(homePages)
                        ? <AiFillHome className='inline-block text-xl text-secondary cursor-pointer' />
                        : <AiOutlineHome className='inline-block text-xl text-secondary cursor-pointer' />
                    }
                </Link>
                <FaRegBell className='inline-block text-xl text-secondary' />
                <BsFillPlusSquareFill className='inline-block text-3xl fill-primary-500' />
                {location.pathname === '/account/manage'
                    ? <FaUserAlt className='inline-block text-xl text-secondary' />
                    : <FaRegUser className='inline-block text-xl text-secondary' />
                }
                <Link to='/product'>
                    {highlightMobileFooter(productPages)
                        ? <BsSearch className='inline-block text-xl fill-primary-500 cursor-pointer' />
                        : <BsSearch className='inline-block text-xl text-secondary cursor-pointer' />

                    }
                </Link>

            </footer>

            {showFooter && <Footer />}
        </div>
    )
}

export default Layout