import React, { useState } from 'react'
import axios from 'axios'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { clearAuth } from '../../../redux/features/auth/authSlice'

// Router
import { Link, useNavigate } from 'react-router-dom'

// Urls
import { API } from '../../../lib/urls'

// Icons
import { BiArrowBack } from 'react-icons/bi'
import { FiAlertCircle } from 'react-icons/fi'
import { FaSpinner, FaRegSadCry } from 'react-icons/fa'

function DeleteAccount() {
    const { user, token } = useSelector(state => state.auth)
    const [isLoading, setIsLoading] = useState(false)
    const dispath = useDispatch()
    const navigate = useNavigate()


    async function handleDeleteMe() {
        const userConfirm = window.confirm('Are you sure you want to permanently delete this account?')
        let solidConfirm;
        if (userConfirm) {
            solidConfirm = window.confirm("Are you actually sure? There's no going back.")
            if (solidConfirm) {
                setIsLoading(true)
                try {
                    const res = await axios.delete(`${API.USER.deleteMe}`, {
                        data: {
                            user
                        },
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    if (res.status === 200) {
                        setIsLoading(false)
                        dispath(clearAuth())
                        navigate('/')
                    }
                } catch (error) {
                    console.log(error)
                    setIsLoading(false)
                }
            }
        }
    }
    return (
        <div className='min-h-screen p-7 flex justify-center items-center'>

            {/* Back Button */}
            <Link to={'/account/manage'}>
                <span className='fixed top-7 left-7'>
                    <BiArrowBack className='inline-block text-[1rem] text-main mr-1 mb-1' />
                </span>
            </Link>

            <div className='text-red-600 flex flex-col space-y-4 items-center'>
                {isLoading &&
                    <>
                        <h1 className='font-semibold text-[1.5rem] text-center'>
                            Deleting Account <FaRegSadCry className='inline-block mb-1 ml-1' />
                        </h1>
                        <FaSpinner className="animate-spin text-[2rem]" />
                    </>
                }

                {!isLoading &&
                    <>
                        <FiAlertCircle className='text-red-600 text-[5rem] mx-auto' />
                        <h1 className='font-semibold text-[1.5rem] text-center'>Delete this Account Forever.</h1>
                        <button
                            onClick={handleDeleteMe}
                            className='w-[60%] font-semibold bg-red-600 text-white text-[1.5rem] rounded-lg py-1 px-2 hover:bg-red-500 active:ring-8 active:ring-red-300 active:bg-red-500'>
                            Proceed
                        </button>
                    </>
                }

            </div>
        </div>
    )
}

export default DeleteAccount