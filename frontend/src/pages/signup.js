import React, { useState } from 'react'
import axios from 'axios'

// Redux
import { userEmail, setupAuth } from '../redux/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'

// Router
import { Link, useNavigate } from 'react-router-dom'

// Icons
import { BiFridge } from 'react-icons/bi'
import { FaGoogle, FaApple, FaTimesCircle } from 'react-icons/fa'

// Components
import Button from '../components/Button'
import TransitionOpacity from '../components/Transition/TransitionOpacity'

// Utils
import { validateEmail, sendRegisterCode, generateHashCode } from '../lib/utils'

// Constants
import { API } from '../lib/urls'


function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [emailError, setEmailError] = useState('')
    // const [registerCode, setRegisterCode] = useState(generateHashCode())
    const [registerCode, setRegisterCode] = useState('jack')
    const [newUser, setNewUser] = useState({
        status: false,
        error: '',
        codeInput: ''
    })
    const [currentUser, setCurrentUser] = useState({
        status: false,
        error: '',
        passwordInput: ''
    })
    const [success, setSuccess] = useState(false)


    // Form Submit Handler
    async function handleEmailSubmit(e) {
        e.preventDefault()

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email.')
        } else {
            setEmailError('')
            const { data } = await axios({
                method: "POST",
                url: `${API.USER.email}`,
                data: { email }
            })


            if (!data.ok) {
                setNewUser({
                    ...newUser,
                    status: true
                })
                setCurrentUser({
                    ...currentUser,
                    status: false
                })
                const params = {
                    register_code: registerCode,
                    email: email
                }
                // sendRegisterCode(params)
            } else {
                setNewUser({
                    ...newUser,
                    status: false
                })
                setCurrentUser({
                    ...currentUser,
                    status: true
                })
            }


        }
    }

    async function handleLoginSubmit(e) {
        e.preventDefault()
        try {
            const data = {
                email: email,
                password: currentUser.passwordInput
            }

            dispatch(setupAuth({ type: "login", payload: data }))

            if (auth.ready) {
                setSuccess(true)
                setTimeout(() => {
                    navigate('/')
                }, [2000])
            }
        } catch (error) {
            if (error) {
                setCurrentUser({ ...currentUser, error: 'Incorrect password. Please try again' })
            }
        }

    }

    async function handleRegisterCodeSubmit(e) {
        e.preventDefault()
        if (newUser.codeInput === registerCode) {
            setNewUser({ ...newUser, error: '' })
            dispatch(userEmail({ email }))
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
                navigate('/onboarding')
            }, [2000])

        } else {
            setNewUser({ ...newUser, error: 'Your register code was incorrect. Please try again.' })
        }

    }

    // Clear Inputs
    function clearEmailInput() {
        setEmail('')
        setEmailError('')
        setNewUser({
            status: false,
            error: '',
            codeInput: ''
        })
        setCurrentUser({
            status: false,
            error: '',
            passwordInput: ''
        })
    }



    return (
        <section className='relative min-h-screen'>

            <div className='absolute top-4 left-4'>
                <Link to='/'>
                    {/* Icon */}
                    <BiFridge className='inline-block text-4xl mb-1' />

                    {/* Brand Name */}
                    <h1 className='inline-block ml-1 font-extrabold text-lg mt-1 text-main'>
                        FoodSpace
                    </h1>
                </Link>

            </div>


            {/* User Successfully Login or Register Code */}
            <TransitionOpacity show={success} relative={false} hidden={false}>
                <h1 className=' text-4xl absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%]'>
                    Welcome!
                </h1>
            </TransitionOpacity>


            {!success &&

                <>
                    <div className='mx-[5.25rem]  mt-16 flex flex-col justify-center items-center space-y-5'>

                        <h1 className='pt-[4.5rem] text-[50px] font-bold tracking-tighter'>
                            Sign up
                        </h1>

                        {/* Login Providers */}
                        <div className='flex flex-col space-y-3 w-full pb-5 border-b-[1px] '>

                            {/* Google Login */}
                            <Button sx='w-full py-1.5  text-sm font-normal mx-0 '>
                                <FaGoogle className='inline-block mb-1 mr-1' /> Continue with Google
                            </Button>

                            {/* Apple Login */}
                            <button className='py-1.5 ring-[1px] mx-0 ring-main rounded-sm  w-full text-sm drop-shadow-sm'>
                                <FaApple className='inline-block mb-1 mr-1 text-[1rem]' />Continue with Apple
                            </button>

                        </div>

                        {/* Login Form */}
                        <form className='w-full' onSubmit={handleEmailSubmit}>

                            {/* Email Input */}
                            <div className='w-full'>
                                <label htmlFor='email' className='block text-xs text-neutral-400 mb-1.5'>
                                    Email
                                </label>

                                {/* Input */}
                                <div className='relative mb-3.5'>
                                    <input
                                        disabled={newUser.status || currentUser.status}
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        id="email"
                                        placeholder='Enter your email address...'
                                        className={`block border-[1px] border-neutral-300 w-full px-2 py-1.5 
                            rounded-sm  bg-neutral-50 focus:outline-sky-200 
                            focus:outline-offset-2 focus:border-sky-300`}
                                    />

                                    {/* Erase All */}
                                    {email &&
                                        <button type="button" onClick={clearEmailInput} className='absolute top-3 right-3'>
                                            <FaTimesCircle className='text-neutral-400 active:text-neutral-500' />
                                        </button>
                                    }
                                </div>

                            </div>


                            {emailError &&
                                <p className='text-red-500 text-sm mt-2'>{emailError}</p>
                            }

                            {/* Submit Input */}
                            {!(newUser.status || currentUser.status) &&
                                <Button onClick={handleEmailSubmit} type='submit' variant='outline' sx='w-full py-1.5 text-sm font-normal mx-0 '>
                                    Continue with email
                                </Button>
                            }

                        </form>

                        {/* New User */}
                        {newUser.status &&
                            <div className='block w-full'>
                                <form onSubmit={handleRegisterCodeSubmit}>

                                    {/* Email Message */}
                                    <p className='text-neutral-400 text-center text-sm mt-[-1.5rem] mb-3'>
                                        We just sent you a temporary sign up code. Please check your inbox and paste the sign up code below.
                                    </p>
                                    <label htmlFor='registerCode' className='block text-xs text-neutral-400 mb-1.5'>
                                        Register code
                                    </label>

                                    {/* Register Code Input */}
                                    <input
                                        value={newUser.codeInput}
                                        onChange={(e) => setNewUser({ ...newUser, codeInput: e.target.value })}
                                        id="registerCode"
                                        placeholder='Paste register code.'
                                        className={`block border-[1px] border-neutral-300 w-full px-2 py-1.5 
                            rounded-sm  bg-neutral-50 focus:outline-sky-200 
                            focus:outline-offset-2 focus:border-sky-300 mb-3`}
                                    />

                                    <Button type='submit' variant='outline' sx='w-full py-1.5 text-sm font-normal mx-0 ' >
                                        Create new account
                                    </Button>

                                    {newUser.error &&
                                        <p className='text-red-500 text-sm text-center'>{newUser.error}</p>
                                    }

                                </form>
                            </div>
                        }


                        {/* Email Exist */}
                        {currentUser.status &&
                            <div className='block w-full'>
                                <form onSubmit={handleLoginSubmit}>

                                    {/* Label Password */}
                                    <p htmlFor='password' className='flex mt-[-1.2rem] justify-between w-full text-xs text-neutral-400 mb-1.5'>
                                        Password
                                        {/* Error: Password Incorrect */}
                                        {currentUser.error &&
                                            <span className='text-red-500 '>{currentUser.error}</span>
                                        }
                                    </p>


                                    {/* Input: Password */}
                                    <input
                                        type='password'
                                        value={currentUser.passwordInput}
                                        onChange={(e) => setCurrentUser({ ...currentUser, passwordInput: e.target.value })}
                                        id="password"
                                        placeholder='Enter Password...'
                                        className={`block border-[1px] border-neutral-300 w-full px-2 py-1.5 
                            rounded-sm  bg-neutral-50 focus:outline-sky-200 
                            focus:outline-offset-2 focus:border-sky-300 mb-3`}
                                    />


                                    {/* Log In */}
                                    <Button type='submit' variant='outline' sx='w-full py-1.5 text-sm font-normal mx-0 ' >
                                        Log in
                                    </Button>
                                </form>
                            </div>
                        }
                    </div>
                    <p className='text-xs text-secondary mt-24 text-center mx-1'>
                        By clicking “Continue with Google/Email” above, you acknowledge that you have read and understood, and agree to FoodSpace's
                        <span className='ml-1 cursor-pointer underline hover:text-primary-500 '>Terms & Conditions</span> and<span className='ml-1 cursor-pointer underline hover:text-primary-500 '>Privacy Policy</span>.
                    </p>
                </>
            }

        </section>
    )
}

export default Login