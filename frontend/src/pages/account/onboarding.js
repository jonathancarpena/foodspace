import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { setupAuth } from '../../redux/features/auth/authSlice'

// Router
import { Link, useNavigate } from 'react-router-dom'

// Icons
import { FaUser, FaEye } from 'react-icons/fa'

// Components
import Button from '../../components/Button'
import Avatar, { AvatarModal } from '../../components/pages/Account/Avatar'

// Images
import img from '../../images/account/onboard.png'




function OnBoarding() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [avatar, setAvatar] = useState(null)
    const [showModal, setShowModal] = useState(false)


    useEffect(() => {
        if (!auth.user) {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        if (auth.ready) {
            navigate('/')
        }
    }, [auth.ready])

    async function handleSubmit(e) {
        e.preventDefault()
        const data = {
            "first_name": firstName,
            "last_name": lastName,
            "email": auth.user.email,
            "password": password,
            "avatar": avatar
        }
        dispatch(setupAuth({ type: "register", payload: data }))
    }

    function handleComplete(data) {
        setAvatar(data)
    }



    return (
        <section className='bg-[#F7F6F3]  h-screen relative flex flex-col justify-center items-center'>

            <AvatarModal showModal={showModal} setShowModal={setShowModal} handleComplete={handleComplete} />
            <div className=' mx-[5rem] flex flex-col space-y-6'>

                {/* Heading */}
                <div>
                    <h1 className='text-main text-center text-[1.6rem] tracking-tight '>
                        Welcome to FoodSpace
                    </h1>
                    <p className='text-center text-secondary text-base my-1.5'>
                        First things first, tell us a bit about yourself.
                    </p>
                </div>

                {/* Choose Avatar */}
                <div className='text-center'>
                    {!avatar
                        ? <>
                            <FaUser onClick={() => setShowModal(true)} className='mb-3.5 block mx-auto fill-[#D8D8D8] bg-[#F7F7F7] text-7xl pt-4 rounded-full drop-shadow-md cursor-pointer' />
                            <button onClick={() => setShowModal(true)} className='p-1.5 inline-block text-xs text-neutral-500 hover:bg-neutral-200'>
                                Choose Avatar
                            </button>
                        </>
                        : <Avatar
                            onClick={() => setShowModal(true)}
                            emoji={avatar.emoji}
                            bg={avatar.favoriteColor}
                            size='md'
                            ring={true}
                            sx='cursor-pointer'
                        />
                    }

                </div>

                {/* Form */}
                <div>
                    <form onSubmit={handleSubmit}>

                        {/* Input: First Name & Last Name */}
                        <div className='flex justify-between space-x-3'>

                            {/* First Name */}
                            <div>
                                <label htmlFor='firstName' className='block text-xs text-neutral-400 mb-1.5'>
                                    First Name
                                </label>

                                {/* Input */}
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    id="firstName"
                                    placeholder='e.g. John'
                                    className={` text-sm block border-[1px] border-neutral-300 w-full px-2 py-1.5 
                                rounded-sm  bg-neutral-50 focus:outline-sky-200 
                                focus:outline-offset-2 focus:border-sky-300`}
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label htmlFor='lastName' className='block text-xs text-neutral-400 mb-1.5'>
                                    Last Name
                                </label>

                                {/* Input */}
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    id="lastName"
                                    placeholder='e.g. Smith'
                                    className={`text-sm block border-[1px] border-neutral-300 w-full px-2 py-1.5 
                                rounded-sm  bg-neutral-50 focus:outline-sky-200 
                                focus:outline-offset-2 focus:border-sky-300`}
                                />
                            </div>

                        </div>

                        {/* Password */}
                        <div className='pt-4'>
                            <label htmlFor='password' className='block text-xs text-neutral-400 mb-1.5'>
                                Set a password
                            </label>

                            {/* Input */}
                            <div className='relative mb-3.5'>
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="password"
                                    placeholder='Minimum 6 characters.'
                                    className={`text-sm block border-[1px] border-neutral-300 w-full px-2 py-1.5 
                                rounded-sm  bg-neutral-50 focus:outline-sky-200 
                                focus:outline-offset-2 focus:border-sky-300`}
                                />

                                {/* Visible Password */}
                                <button onClick={() => setPasswordVisible(!passwordVisible)} className='absolute top-2.5 right-3'>
                                    <FaEye className={`${passwordVisible ? 'text-sky-400' : 'text-neutral-400'} active:text-neutral-500`} />
                                </button>
                            </div>
                        </div>

                        <Button type='submit' sx='w-full' disabled={!firstName || !lastName || (password.length < 6) || avatar === null}>
                            Continue
                        </Button>
                    </form>
                </div>
            </div>

            {/* Email Info */}
            <div className='flex flex-col space-y-1 text-center pt-12 tracking-tight z-30'>

                {/* User Email */}
                <p className='text-xs text-secondary'>
                    You're creating an account for
                    <span className='ml-1 text-neutral-600'>
                        {auth.user.email}.
                    </span>
                </p>

                {/* Link: Login Instead */}
                <p className='text-xs text-secondary'>
                    If you don't intend to set up a new account, you can
                    <Link to='/account/login'>
                        <span className='ml-1 underline hover:text-primary-500'>
                            log in with another email.
                        </span>
                    </Link>
                </p>
            </div>

            {/* Image */}
            <img src={img} className='absolute h-[160px] left-3 bottom-3 grayscale contrast-150 z-20' />
        </section>
    )
}

export default OnBoarding