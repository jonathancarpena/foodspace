import React, { useState, useEffect } from 'react'

// Router
import { Link, useNavigate } from 'react-router-dom'

// Redux
import { refreshMe, clearAuth } from '../../redux/features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'

// Components
import Avatar from '../../components/pages/Account/Avatar'
import Button from '../../components/Button'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Icons 
import { FaCrown } from 'react-icons/fa'
import { BsCircleFill } from 'react-icons/bs'
import { BiFridge, BiTrash } from 'react-icons/bi'

import { toTitleCase } from '../../lib/utils'

function Account() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { ready, user } = useSelector(state => state.auth)

    useEffect(() => {
        if (ready && user.avatar) {
            dispatch(refreshMe())
        } else {
            navigate('/')
        }
    }, [])


    function logout() {
        dispatch(clearAuth())
        navigate('/')
    }
    if (!ready) {
        return (<div>Not a User</div>)
    }
    console.log(user)
    return (
        <div className='flex flex-col space-y-5 '>

            <Link to='/foodSpace/create'>
                <Button>
                    Create FoodSpace
                </Button>
            </Link>

            <Link to='/product/create'>
                <Button>
                    Create Product
                </Button>
            </Link>

            <Link to='/product/me'>
                <Button>
                    My Products
                </Button>
            </Link>

            <Link to='/product'>
                <Button>
                    All Products
                </Button>
            </Link>

            <Button onClick={logout}>
                Logout
            </Button>


            {/* Loading Animation */}
            {/* <div className="border  shadow rounded-md p-4 max-w-sm w-full mx-auto">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-slate-400 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-slate-400 rounded"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-slate-400 rounded col-span-2"></div>
                                <div className="h-2 bg-slate-400 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-slate-400 rounded"></div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className='flex px-7 pt-5 pb-2.5 items-center justify-between'>
                <div>
                    <h1 className='font-semibold '>Hello, <span className='capitalize'>{user.first_name}</span></h1>
                    <h2 className='text-secondary text-xs'>What are we having today?</h2>
                </div>

                <Avatar
                    emoji={user.avatar.emoji}
                    bg={user.avatar.favoriteColor}
                    ring={false}
                    size='xs'
                    sx='inline-block'
                />
            </div>


            {/* Header */}
            <div className='bg-primary-500 p-5 mx-7 rounded-xl relative overflow-hidden '>
                <div>
                    <h1 className='text-white text-sm'>Today</h1>
                    <h2 className='text-white text-xl font-semibold mt-2'>5 items</h2>
                </div>

                <BiTrash className='text-[8rem] rotate-[25deg] text-primary-700  x absolute right-5 bottom-[-2rem]' />
            </div>


            {/* Tasks */}
            <div className='mx-7'>
                <h1 className='font-semibold'>To do
                    <span className='bg-primary-100 rounded-xl px-3 text-primary-600 ml-1'>
                        5
                    </span>
                </h1>

                <Swiper spaceBetween={25} >
                    {["a", "b", "c", "d", "e"].map((item) => (
                        <SwiperSlide key={item}>
                            {/* <Link
                                key={item.name}
                                to={`/foodSpace/admin/${item.name}`}
                                state={{ foodSpace_id: item._id }}> */}
                            <div className='cursor-pointer bg-white capitalize rounded-xl  flex flex-col space-y-3 justify-evenly h-[150px] w-[150px] drop-shadow-lg mt-4 mb-2 p-3'>
                                <p className='text-secondary text-xs'>
                                    <BiFridge className='inline-block mr-1 text-lg' />FoodSpace {item}
                                </p>
                                <p className='font-semibold'>
                                    Tomato
                                </p>
                                <p className='text-secondary text-xs'>
                                    <BsCircleFill className='inline-block mr-1.5 mb-0.5 text-blue-500' />
                                    Exp. 3 days ago
                                </p>
                            </div>
                            {/* </Link> */}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>


            {/* FoodSpaces */}
            <div className='px-7 pb-24'>
                <h1 className='font-semibold'>FoodSpaces</h1>


                <ul className='flex flex-col space-y-8 mt-5 '>
                    {user.admin &&
                        user.admin.map((item) => (
                            <Link
                                key={item.name}
                                to={`/foodSpace/admin/${item.name}`}
                                state={{ foodSpace_id: item._id }}>
                                <div className='relative cursor-pointer bg-white capitalize rounded-xl h-[150px] drop-shadow-lg '>
                                    <div>
                                        <h1>Admin</h1>
                                        {/* <Avatar bg={item.admin.avatar.favoriteColor} emoji={item.admin.avatar.emoji} /> */}
                                    </div>

                                    <BiFridge className='block mx-auto text-5xl ' />
                                    <p className=''>{item.name}</p>
                                </div>
                            </Link>

                        ))
                    }
                    {user.foodspaces &&
                        user.foodspaces.map((item) => (
                            <Link
                                key={item.name}
                                to={`/foodSpace/admin/${item.name}`}
                                state={{ foodSpace_id: item._id }}>
                                <div className='relative cursor-pointer bg-white capitalize rounded-xl flex flex-col items-center justify-center h-[150px] w-[150px] drop-shadow-lg '>
                                    <BiFridge className='block mx-auto text-5xl ' />
                                    <p className=''>{item.name}</p>
                                </div>
                            </Link>
                        ))
                    }
                </ul>

            </div >


        </div >
    )
}

export default Account