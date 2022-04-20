import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Router 
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom'

// Redux
import { refreshMe } from '../../../redux/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'

// Utils
import { API } from '../../../lib/urls'

// Icons
import { MdCancel, MdError } from 'react-icons/md'
import { BiArrowBack, BiFridge } from 'react-icons/bi'
import { RiErrorWarningFill } from 'react-icons/ri'
import { FaPlusCircle, FaTimes, FaCheckCircle, FaSpinner } from 'react-icons/fa'
import { FiPlusCircle, FiDelete, FiAlertCircle } from 'react-icons/fi'

// Components 
import Button from '../../../components/Button'
import Tooltip from '../../../components/Tooltip'


function AddUser() {
    const navigate = useNavigate()
    const { name } = useParams()
    const location = useLocation()
    const dispatch = useDispatch()
    const { user, token } = useSelector(state => state.auth)
    const [users, setUsers] = useState([{ value: '', edit: true, status: null, error: null }])
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
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

    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        if (users.length > 1) {
            for (const input of users) {
                setIsLoading(true)
                if (input.status === "success") {
                    const data = {
                        email: input.value,
                        foodSpace_id: location.state.foodSpace._id
                    }

                    try {
                        const res = await axios({
                            method: "POST",
                            url: `${API.ADMIN.addUser}`,
                            data: data,
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                    } catch (error) {
                        const { message } = error.response.data
                        setError(error)
                    }
                }

            }
        } else if (users.length === 1) {
            // Validating Previous User
            // Updating Previous User State 
            users[0]["edit"] = false
            users[0]["status"] = "loading"
            setUsers([...users])
            await validateUser(users, users[0], 0)
            if (users[0].status === "success") {
                const data = {
                    email: users[0].value,
                    foodSpace_id: location.state.foodSpace._id
                }

                try {
                    const res = await axios({
                        method: "POST",
                        url: `${API.ADMIN.addUser}`,
                        data: data,
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    console.log(res)
                } catch (error) {
                    const { message } = error.response.data
                    setError(message)
                }
            }
        }

        setIsLoading(false)

        if (!isLoading && !error) {
            dispatch(refreshMe())
            setSuccess(true)
            navigate(`/`)
            console.log('SUCCESS')
        }

    }

    function handleAddFieldChange(e, idx, array, setFn) {
        let copy = [...array]
        copy[idx] = {
            ...copy[idx],
            value: `${e.target.value}`,
        }
        setFn([...copy])
    }


    async function checkUserExist(user) {
        let status = user.status

        if (status === "loading") {
            try {
                const { data } = await axios({
                    method: "POST",
                    url: `${API.USER.email}`,
                    data: { email: user.value }
                })
                if (data.user) {
                    status = "success"
                }
            } catch (error) {
                status = "error"
            }
        }
        return status
    }

    function errorCheck(input) {
        let error
        const foodSpace = user.admin.find((item) => item._id === location.state.foodSpace._id)
        const userAlreadyAdded = foodSpace.users.find((item) => item.email === input.value)
        if (userAlreadyAdded) {
            error = "User is already added."
        }
        if (input.value === user.email) {
            error = "You cannot add yourself."
        }
        if (!input.value.includes('@')) {
            error = "Please provide a valid email."
        }
        return error
    }

    async function validateUser(fields, input, index) {
        console.log('Validating', fields)
        // let fields = [...users]
        let userToValidate = fields[index]


        // Validation
        const error = errorCheck(input)
        if (error) {
            // Shows User the Error
            userToValidate["error"] = error
            userToValidate["status"] = null
            fields[index] = userToValidate
            setUsers([...fields])

            // Removes the error
            setTimeout(() => {
                userToValidate["error"] = null
                userToValidate["edit"] = true
                fields[index] = userToValidate
                setUsers([...fields])
            }, [3000])
        } else {
            const status = await checkUserExist(userToValidate)
            if (status === "success") {
                userToValidate["status"] = status
                fields[index] = userToValidate
                setUsers([...fields])
            } else {
                userToValidate["status"] = status
                fields[index] = userToValidate
                setUsers([...fields])
            }
        }


    }
    async function addAnotherUserField(prevIndex) {
        let fields = [...users]
        let prevUser = fields[prevIndex]

        // Updating Previous User State 
        prevUser["edit"] = false
        prevUser["status"] = "loading"
        fields[prevIndex] = prevUser


        const error = errorCheck(prevUser)
        if (prevUser.value !== "" && !error) {
            // Adding New Field
            fields.push({ value: '', edit: true, status: null, error: null })

            // Updating State
            setUsers([...fields])
        }

        // Validating Previous User
        await validateUser(fields, prevUser, prevIndex)
    }


    function removeField(idx, array, setFn) {
        let copy = [...array]
        copy.splice(idx, 1)
        setFn(copy)
    }

    let prevPath;
    let state;
    try {
        prevPath = location.state.prevPath
        state = location.state
    } catch (error) {
        prevPath = '/'
        state = null
    }
    return (
        <div className='min-h-screen p-7 flex flex-col justify-center items-center'>

            {/* Back Button */}
            <Link to={prevPath} state={state}>
                <span className='fixed top-6 left-6'>
                    <BiArrowBack className='inline-block text-[1rem] text-main mr-1 mb-1' />
                </span>
            </Link>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-5 min-w-[350px] max-w-[350px] min-h-[70vh]">
                <div>
                    {/* Header */}
                    <h1 className='text-3xl font-semibold tracking-tight text-center'>
                        Adding Users to
                    </h1>

                    <h2 className='my-2 text-2xl font-semibold tracking-tight text-center capitalize'>
                        <BiFridge className='inline-block mb-1' /> {name}
                    </h2>
                </div>



                <ul className='flex flex-col space-y-5 items-center'>
                    {users.map((item, idx) => (
                        <div className='relative' key={`user-field-${idx}`}>
                            {users[idx].error &&
                                <span className='absolute text-xs text-red-600 -top-4'>{users[idx].error}</span>
                            }
                            <input
                                disabled={!users[idx].edit || users[idx].error}
                                type="text"
                                value={users[idx].value}
                                onChange={(e) => handleAddFieldChange(e, idx, users, setUsers)}
                                className={`${users[idx].error ? ' border-red-600 animate-wiggle' : ''} mr-2 border-2 rounded-lg px-3 py-2 focus:outline-offset-1 focus:outline-sky-300 min-w-[300px] max-w-[300px]`}
                                placeholder='Email'
                            />

                            {/* Loading */}
                            {(users[idx].status === "loading") &&
                                <FaSpinner className="inline-block ml-2 animate-spin fill-neutral-600" />
                            }

                            {/* Error */}
                            {(users[idx].status === "error") &&
                                <Tooltip message="User Doesn't Exist">
                                    <span>
                                        <RiErrorWarningFill className="absolute -top-3.5 -right-3.5 inline-block text-red-600" />
                                    </span>
                                </Tooltip>
                            }

                            {/* Success */}
                            {(users[idx].status === "success") &&
                                <Tooltip message="User Exist">
                                    <span>
                                        <FaCheckCircle className=" absolute -top-3.5 -right-3.5 inline-block text-green-600" />
                                    </span>
                                </Tooltip>
                            }

                            {/* Add Area Button */}
                            {(idx === users.length - 1) &&
                                <button
                                    type="button"
                                    onClick={() => addAnotherUserField(idx)}
                                    className=" bg-white rounded-lg px-3 py-2  border-2 min-w-[300px] max-w-[300px] mt-5 flex items-center justify-center text-secondary"
                                >
                                    <FiPlusCircle className='inline-block mr-1 ' />
                                    Add Another User
                                </button>
                            }

                            {/* Delete Button */}
                            {users.length > 1 &&
                                (users[idx].status !== "loading") &&
                                <>
                                    <button
                                        type="button"
                                        className={`inline-block absolute top-2 ${(users[idx].status === "success" || users[idx].status === "error") ? '-right-10' : '-right-5'}`}
                                        onClick={() => removeField(idx, users, setUsers)}
                                    >
                                        <FiDelete className='inline-block text-xl' />
                                    </button>
                                </>

                            }



                        </div>
                    ))
                    }
                </ul >

                <Button type="submit" sx="w-full" >
                    {isLoading && <FaSpinner className="inline-block right-2 animate-spin fill-white relative" />}
                    Submit
                </Button >
            </form >
        </div >
    )
}

export default AddUser