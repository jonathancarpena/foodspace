import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Router 
import { useNavigate, useLocation, useParams } from 'react-router-dom'

// Redux
import { refreshMe } from '../../../redux/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'

// Utils
import { API } from '../../../lib/urls'

// Icons

import { BiFridge } from 'react-icons/bi'
import { RiErrorWarningFill } from 'react-icons/ri'
import { FaSpinner } from 'react-icons/fa'


// Components 
import Button from '../../../components/Button'

function AddUser() {
    const navigate = useNavigate()
    const { name } = useParams()
    const location = useLocation()
    const dispatch = useDispatch()
    const { user, token } = useSelector(state => state.auth)
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()



    useEffect(() => {
        if (!location.state) {
            navigate("/foodSpace/choose", {
                state: {
                    prevPath: location.state.prevPath,
                    nextPath: location.pathname
                }
            })
        }

    }, [location.pathname, location.state, navigate])

    async function checkUserExist() {
        let exist = false
        setLoading(true)
        try {
            const { data } = await axios({
                method: "POST",
                url: `${API.USER.email}`,
                data: { email: email }
            })
            if (data.user) {
                exist = true
            }
        } catch (error) {
            exist = false
        }
        return exist
    }
    function errorCheck() {
        let errorMessage = ''
        let valid = true
        const foodSpace = user.admin.find((item) => item._id === location.state.foodSpace._id)
        const userAlreadyAdded = foodSpace.users.find((item) => item.email === email)

        if (userAlreadyAdded) {
            errorMessage = "User is already added."
            setError(errorMessage)
            valid = false
        }
        if (email === user.email) {
            errorMessage = "You cannot add yourself."
            setError(errorMessage)
            valid = false
        }

        return valid
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const exist = await checkUserExist()


        if (exist) {
            const valid = errorCheck(email)
            if (valid) {
                const data = {
                    email,
                    foodSpace_id: location.state.foodSpace._id
                }

                try {
                    setLoading(true)
                    const res = await axios({
                        method: "POST",
                        url: `${API.ADMIN.addUser}`,
                        data: data,
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    setLoading(false)

                    if (res.status === 200) {
                        dispatch(refreshMe())
                        navigate('/')
                    }
                } catch (error) {
                    const { message } = error.response.data
                    setError(message)
                }
            }

        } else {
            setError("User does not exist")
        }


    }


    return (
        <div className='min-h-screen p-7 flex flex-col justify-center items-center'>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-5 min-w-[350px] max-w-[350px] min-h-[70vh]">
                <div>

                    <h1 className='text-3xl font-semibold tracking-tight text-center'>
                        Adding User to
                    </h1>

                    <h2 className='my-2 text-2xl font-semibold tracking-tight text-center capitalize'>
                        <BiFridge className='inline-block mb-1' /> {name}
                    </h2>
                </div>
                <div className='relative'>
                    {error &&
                        <span className='absolute text-xs text-red-600 -top-4'>{error}</span>
                    }
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`${error ? ' border-red-600 animate-wiggle' : ''} mr-2 border-2 rounded-lg px-3 py-2 focus:outline-offset-1 focus:outline-sky-300 min-w-[300px] max-w-[300px]`}
                        placeholder='Email'
                    />

                    {(loading) &&
                        <FaSpinner className="inline-block ml-2 animate-spin fill-neutral-600" />
                    }


                    {(error) &&
                        <span>
                            <RiErrorWarningFill className="absolute -top-3.5 -right-3.5 inline-block text-red-600" />
                        </span>

                    }

                </div>

                <Button type="submit" sx="w-full" >
                    {loading && <FaSpinner className="inline-block right-2 animate-spin fill-white relative" />}
                    Submit
                </Button >
            </form >
        </div>
    )
}

export default AddUser