import React, { useState, useEffect } from 'react'

// Router
import { Link, useNavigate } from 'react-router-dom'

// Redux
import { refreshMe, clearAuth } from '../../redux/features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'

// Components
import Avatar, { AvatarModal } from '../../components/pages/Account/Avatar'
import Button from '../../components/Button'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";


// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Icons 
import { FaCarrot, FaCog, FaEdit } from 'react-icons/fa'
import { MdSpaceDashboard, MdLogout } from 'react-icons/md'


const links = [
    {
        link: "/account/dashboard",
        icon: <MdSpaceDashboard className='block mx-auto text-[4rem] fill-primary-500' />,
        header: "dashboard"
    },
    {
        link: "/product/me",
        icon: <FaCarrot className='block mx-auto text-[4rem] fill-primary-500' />,
        header: "my foods"
    },
    {
        link: "/account/manage",
        icon: <FaCog className='block mx-auto text-[4rem] fill-primary-500' />,
        header: "manage account"
    },
    {
        link: "/account/logout",
        icon: <MdLogout className='block mx-auto text-[4rem] fill-primary-500' />,
        header: "logout"
    },
]
function Account() {
    const [showModal, setShowModal] = useState(false)
    const [newAvatar, setNewAvatar] = useState(null)
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function handleUpdateAvatar() {
        const userConfirm = window.confirm('Does everything look correct?')
    }
    function handleLogout() {
        dispatch(clearAuth())
        navigate('/')
    }
    return (
        <div className=' min-h-screen flex flex-col items-center pb-20'>
            <AvatarModal showModal={showModal} setShowModal={setShowModal} handleComplete={handleUpdateAvatar} />

            <div className='h-[35vh] bg-white p-7 w-screen flex flex-col justify-center items-center border-b-2'>
                <div className='relative'>
                    <Avatar
                        emoji={user.avatar.emoji}
                        bg={user.avatar.favoriteColor}
                        ring={true}
                        size='xl'
                    />
                    <span onClick={() => setShowModal(true)} className='cursor-pointer absolute top-0 -right-9 inline-block border-2 border-primary-400 p-1.5 rounded-full'>
                        <FaEdit className='fill-primary-500 text-center' />
                    </span>

                </div>

                <h1 className='capitalize font-semibold text-2xl mt-3'>
                    {user.first_name} {user.last_name}
                </h1>

                <h2 className='text-secondary'>{user.email}</h2>
            </div>

            <div className='grid grid-cols-2 gap-5 m-5'>
                {links.map((item) => {
                    if (item.link.includes('logout')) {
                        return (
                            <div onClick={handleLogout} className='w-full bg-white border-2 border-white text-center mx-auto p-5 rounded-2xl drop-shadow-lg active:bg-primary-200 cursor-pointer active:drop-shadow-2xl active:border-primary-500'>
                                {item.icon}
                                <h1 className='text-xl font-semibold capitalize mt-5 text-main'>{item.header}</h1>
                            </div>
                        )
                    }
                    return (
                        <Link to={item.link} key={item.link}>
                            <div className='w-full bg-white border-2 border-white text-center mx-auto p-5 rounded-2xl drop-shadow-lg active:bg-primary-200 cursor-pointer active:drop-shadow-2xl active:border-primary-500'>
                                {item.icon}
                                <h1 className='text-xl font-semibold capitalize mt-5 text-main'>{item.header}</h1>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Account