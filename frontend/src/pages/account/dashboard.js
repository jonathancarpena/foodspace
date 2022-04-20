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


// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Icons 
import { FaCrown } from 'react-icons/fa'
import { BsCircleFill } from 'react-icons/bs'
import { BiFridge, BiTrash } from 'react-icons/bi'


function Dashboard() {
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


    function foodSpaceLength() {
        let total = 0;
        if (user.admin.length) {
            total += user.admin.length
        }

        if (user.foodSpaces.length) {
            total += user.foodSpaces.length
        }

        return total;
    }
    function logout() {
        dispatch(clearAuth())
        navigate('/')
    }
    if (!ready) {
        return (<div>Not a User</div>)
    }

    console.log(user)
    return (
        <div className='flex flex-col space-y-5 min-h-screen pb-20'>

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
                    <h1 className='font-semibold text-2xl'>Hello, <span className='capitalize'>{user.first_name}</span></h1>
                    <h2 className='text-secondary'>What are we having today?</h2>
                </div>


                <Link to='/account' className='cursor-pointer'>
                    <span className='cursor-pointer'>
                        <Avatar
                            emoji={user.avatar.emoji}
                            bg={user.avatar.favoriteColor}
                            ring={true}
                            size='sm'
                            sx="cursor-pointer"
                        />
                    </span>
                </Link>

            </div>



            {/* Header */}
            <div className='bg-primary-500 p-5 mx-7 rounded-xl relative overflow-hidden '>
                <div>
                    <h1 className='text-white text-sm'>Today</h1>
                    <h2 className='text-white text-xl font-semibold mt-2'>5 items</h2>
                </div>

                <BiTrash className='text-[8rem] rotate-[25deg] text-primary-700 absolute right-5 bottom-[-2rem]' />
            </div>


            {/* Tasks */}
            <div className='mx-7'>
                <h1 className='font-semibold text-xl'>To do
                    <span className='bg-primary-100 rounded-xl px-3 text-primary-600 ml-1'>
                        {user.tasks.length}
                    </span>
                </h1>

                <Swiper spaceBetween={20} watchSlidesProgress={true} >
                    {["a", "b", "c", "d", "e"].map((item) => (
                        <SwiperSlide key={item} className='max-w-max '>
                            {() => (
                                <>
                                    {/* <Link
                                key={item.name}
                                to={`/foodSpace/admin/${item.name}`}
                                state={{ foodSpace_id: item._id }}> */}
                                    <div className={` cursor-pointer bg-primary-50 capitalize rounded-xl  flex flex-col space-y-3 justify-evenly h-[150px] w-[150px] drop-shadow-lg mt-4 mb-2 p-3`}>
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
                                </>
                            )}

                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>


            {/* FoodSpaces */}
            <div className='px-7 '>
                <h1 className='font-semibold text-xl'>
                    FoodSpaces
                    <span className='bg-primary-100 rounded-xl px-3 text-primary-600 ml-1'>
                        {foodSpaceLength()}
                    </span>
                </h1>


                <ul className='flex flex-col space-y-8 mt-5 '>
                    {user.admin &&
                        user.admin.map((item) => (
                            <Link
                                key={item.name}
                                to={`/foodSpace/${item.name}`}
                                state={{ foodSpace_id: item._id, foodSpace: item }}>
                                <div className='relative flex cursor-pointer p-4 bg-white capitalize rounded-xl h-[200px] drop-shadow-lg overflow-hidden'>

                                    <div className='flex flex-col justify-evenly'>

                                        {/* Admin + Users */}
                                        <div className='mb-5 flex '>

                                            {/* Admin */}
                                            <div className='inline-block mr-3 relative'>
                                                <FaCrown className='absolute text-yellow-500 text-xs -top-4 left-[50%] -translate-x-[50%]' />
                                                <Avatar bg={item.admin.avatar.favoriteColor} emoji={item.admin.avatar.emoji} ring={true} size={'xs'} />
                                            </div>

                                            {/* Users */}
                                            {(item.users.length > 0) &&
                                                <div className='inline-block border-l-2 pl-7'>
                                                    {item.users.map((user, idx) => (
                                                        <React.Fragment key={user._id}>
                                                            <Avatar bg={user.avatar.favoriteColor} emoji={user.avatar.emoji} ring={true} size={'xs'} sx={`mx-[-15px] z-[${idx}]`} />
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            }



                                        </div>

                                        {/* Expired Stock */}
                                        {item.expiredStock.length
                                            ? <p className='text-sm'>{item.expiredStock.length} items to throw</p>
                                            : <p className='text-sm'>Clean Space.</p>
                                        }


                                        {/* FoodSpace Name */}
                                        <p className='font-semibold tracking-tighter text-3xl'>{item.name}</p>
                                    </div>

                                    {/* FoodSpace Image */}
                                    <BiFridge className='text-[12rem]  text-main absolute right-8 bottom-[-3rem]' />

                                </div>
                            </Link>

                        ))
                    }
                    {user.foodSpaces &&
                        user.foodSpaces.map((item) => (
                            <Link
                                key={item.name}
                                to={`/foodSpace/${item.name}`}
                                state={{ foodSpace_id: item._id, foodSpace: item }}>
                                <div className='relative flex cursor-pointer p-4 bg-white capitalize rounded-xl h-[200px] drop-shadow-lg overflow-hidden'>

                                    <div className='flex flex-col justify-evenly'>

                                        {/* Admin + Users */}
                                        <div className='mb-5 flex '>

                                            {/* Admin */}
                                            <div className='inline-block mr-3 relative'>
                                                <FaCrown className='absolute text-yellow-500 text-xs -top-4 left-[50%] -translate-x-[50%]' />
                                                <Avatar bg={item.admin.avatar.favoriteColor} emoji={item.admin.avatar.emoji} ring={true} size={'xs'} />
                                            </div>

                                            {/* Users */}
                                            {(item.users.length > 0) &&
                                                <div className='inline-block border-l-2 pl-7'>
                                                    {item.users.map((user, idx) => (
                                                        <React.Fragment key={user._id}>
                                                            <Avatar bg={user.avatar.favoriteColor} emoji={user.avatar.emoji} ring={true} size={'xs'} sx={`mx-[-15px] z-[${idx}]`} />
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            }



                                        </div>

                                        {/* Expired Stock */}
                                        {item.expiredStock.length
                                            ? <p className='text-sm'>{item.expiredStock.length} items to throw</p>
                                            : <p className='text-sm'>Clean Space.</p>
                                        }


                                        {/* FoodSpace Name */}
                                        <p className='font-semibold tracking-tighter text-3xl'>{item.name}</p>
                                    </div>

                                    {/* FoodSpace Image */}
                                    <BiFridge className='text-[12rem]  text-main absolute right-8 bottom-[-3rem]' />

                                </div>
                            </Link>

                        ))
                    }
                </ul>

            </div >

        </div >
    )
}

export default Dashboard