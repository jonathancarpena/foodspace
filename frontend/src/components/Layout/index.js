import React, { useEffect, useState } from 'react'

// Redux
import { useSelector } from 'react-redux'

// Router
import { useLocation, useNavigate, Link } from 'react-router-dom'

// Components
import Footer from './Footer'
import Navbar from './Navbar'

// Icons 
import { BsSearch } from 'react-icons/bs'
import { FaRegUser, FaUserAlt, FaClipboard, FaRegClipboard, FaPlus } from 'react-icons/fa'
import { AiOutlineHome, AiFillHome } from 'react-icons/ai'
import AddModal from './AddModal'


function Layout({ children }) {
    const [showAddModal, setShowAddModal] = useState(false)
    const auth = useSelector(state => state.auth)
    const navigate = useNavigate()
    const { pathname } = useLocation()

    useEffect(() => {
        if (auth.token && pathname === '/') {
            navigate('/account/dashboard')
        }


    }, [pathname, auth.token, navigate])

    const homePages = ["dashboard", "foodSpace"]
    const noNavbar = ['/signup', '/login', '/onboarding']
    const productPages = ["product"]
    function highlightMobileFooter(extensions) {
        return pathname.split('/').some((item) => extensions.includes(item))
    }


    return (
        <div className='bg-neutral-300 flex justify-center items-center'>
            <div className={`${((!auth.ready && !noNavbar.includes(pathname))) ? 'bg-white' : 'bg-[#F7F6F3] '}   relative min-h-screen flex flex-col  font-body overflow-hidden min-w-[410px] max-w-[410px] `}>

                <AddModal showModal={showAddModal} setShowModal={setShowAddModal} />
                {(!auth.ready && !noNavbar.includes(pathname)) && <Navbar />}

                <div className={`${(!auth.ready && !noNavbar.includes(pathname)) ? 'mt-16' : ''} `}>
                    {children}
                </div>

                {/* Navigator Buttons */}
                {auth.ready &&
                    <section className={`shadow-lg fixed bottom-0 w-full min-w-[410px] max-w-[410px]  pb-3 pt-3 flex justify-evenly items-center bg-white ${showAddModal ? 'z-[50]' : 'z-[90]'}`} >


                        <Link to='/account/dashboard' className={`${highlightMobileFooter(homePages) ? 'text-primary-500' : 'text-secondary'} w-[78px] flex justify-center  flex-col  items-center select-none`}>
                            {highlightMobileFooter(homePages)
                                ? <AiFillHome className='block text-xl  mx-auto cursor-pointer' />
                                : <AiOutlineHome className='block text-xl  mx-auto cursor-pointer' />
                            }
                            <span className='text-sm'>Home</span>
                        </Link>

                        <Link to='/account/tasks' className={`${pathname === '/account/tasks' ? 'text-primary-500' : 'text-secondary'} w-[78px] flex justify-center  flex-col  items-center select-none`}>
                            {pathname === '/account/tasks'
                                ? <FaClipboard className='block mx-auto text-xl cursor-pointer' />
                                : <FaRegClipboard className='block mx-auto text-xl cursor-pointer' />
                            }
                            <span className='text-sm'>Tasks</span>
                        </Link>





                        <button className='w-[78px]'>
                            <span onClick={() => setShowAddModal(true)} className='ring-[15px] left-[50%] -translate-x-[50%] ring-white absolute w-[50px] h-[50px] rounded-full  bottom-8 bg-primary-500 flex items-center justify-center'>
                                <FaPlus className='text-2xl   text-white' />
                            </span>
                        </button>




                        <Link to='/account' className={`${pathname === '/account' ? 'text-primary-500' : 'text-secondary'} w-[78px] flex justify-center  flex-col  items-center select-none`}>
                            {pathname === '/account'
                                ? <FaUserAlt className='block text-xl mx-auto cursor-pointer' />
                                : <FaRegUser className='block text-xl mx-auto cursor-pointer' />
                            }
                            <span className='text-sm'>Account</span>
                        </Link>

                        <Link to='/product' className={`${highlightMobileFooter(productPages) ? 'text-primary-500' : 'text-secondary'} w-[78px] flex justify-center  flex-col  items-center select-none`}>
                            {highlightMobileFooter(productPages)
                                ? <BsSearch className='block text-xl mx-auto  cursor-pointer' />
                                : <BsSearch className='block text-xl  mx-auto  cursor-pointer' />
                            }
                            <span className='text-sm'>Products</span>
                        </Link>



                    </section>
                }
                {(!auth.ready && !noNavbar.includes(pathname)) && <Footer />}
            </div>
        </div>
    )
}

export default Layout