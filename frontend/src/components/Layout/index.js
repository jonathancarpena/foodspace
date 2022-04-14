import React, { useEffect, useState } from 'react'

// Redux
import { useSelector } from 'react-redux'

// Router
import { useLocation, useNavigate, Link } from 'react-router-dom'

// Components
import Footer from './Footer'
import Navbar from './Navbar'

// Icons 
import { BsFillXCircleFill, BsFillPlusCircleFill, BsSearch } from 'react-icons/bs'
import { FaRegUser, FaUserAlt, FaBell, FaRegBell, FaHome, FaPlus } from 'react-icons/fa'
import { AiOutlineHome, AiFillHome } from 'react-icons/ai'
import AddModal from './AddModal'



// Constants
const publicPages = [
    '/',
]



function Layout({ children }) {
    const [showFooter, setShowFooter] = useState(true)
    const [showNavbar, setShowNavbar] = useState(true)
    const [showAddModal, setShowAddModal] = useState(false)
    const auth = useSelector(state => state.auth)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (auth.token && location.pathname === '/') {
            navigate('/account/dashboard')
        }

        if (publicPages.includes(location.pathname)) {
            setShowFooter(true)
            setShowNavbar(true)
        } else {
            setShowFooter(false)
            setShowNavbar(false)

        }
    }, [location])

    const homePages = ["dashboard", "foodSpace"]
    const productPages = ["product"]
    const accountPages = ["account"]
    function highlightMobileFooter(extensions) {
        return location.pathname.split('/').some((item) => extensions.includes(item))
    }


    return (
        <div className={`${(showNavbar && showFooter) ? 'bg-white' : 'bg-[#F7F6F3] '}  font-body `}>

            <AddModal showModal={showAddModal} setShowModal={setShowAddModal} />
            {showNavbar && <Navbar />}
            <div className={`${showNavbar ? 'mt-16' : ''} sm:mb-[4.2rem]`}>
                {children}
            </div>

            {/* Mobile Footer */}
            <footer className='sm:hidden fixed bottom-0 w-full px-5 pb-3 pt-3 flex justify-between items-center bg-white'>

                <div className='flex space-x-10 ml-8 w-[30vw]'>
                    <Link to='/account/dashboard' className={`${highlightMobileFooter(homePages) ? 'text-primary-500' : 'text-secondary'}`}>
                        {highlightMobileFooter(homePages)
                            ? <AiFillHome className='block text-xl  mx-auto cursor-pointer' />
                            : <AiOutlineHome className='block text-xl  mx-auto cursor-pointer' />
                        }
                        <span className='text-sm'>Home</span>
                    </Link>

                    <Link to='/account/notifications' className={`${location.pathname === '/account/notifications' ? 'text-primary-500' : 'text-secondary'}`}>
                        {location.pathname === '/account/notifications'
                            ? <FaBell className='block mx-auto text-xl cursor-pointer' />
                            : <FaRegBell className='block mx-auto text-xl cursor-pointer' />
                        }
                        <span className='text-sm'>Activity</span>
                    </Link>
                </div>



                <span className="bg-primary-500 rounded-full ring-[20px] ring-white absolute bottom-8 left-[50%] -translate-x-[50%] ">
                    <FaPlus onClick={() => setShowAddModal(true)} className='  inline-block text-[2.5rem] p-2 fill-white cursor-pointer' />
                </span>


                <div className='flex space-x-10 mr-8 w-[30vw]'>
                    <Link to='/account' className={`${location.pathname === '/account' ? 'text-primary-500' : 'text-secondary'}`}>
                        {location.pathname === '/account'
                            ? <FaUserAlt className='block text-xl mx-auto cursor-pointer' />
                            : <FaRegUser className='block text-xl mx-auto cursor-pointer' />
                        }
                        <span className='text-sm'>Account</span>
                    </Link>

                    <Link to='/product' className={`${highlightMobileFooter(productPages) ? 'text-primary-500' : 'text-secondary'}`}>
                        {highlightMobileFooter(productPages)
                            ? <BsSearch className='block text-xl mx-auto  cursor-pointer' />
                            : <BsSearch className='block text-xl  mx-auto  cursor-pointer' />
                        }
                        <span className='text-sm'>Products</span>
                    </Link>
                </div>


            </footer>

            {showFooter && <Footer />}
        </div>
    )
}

export default Layout