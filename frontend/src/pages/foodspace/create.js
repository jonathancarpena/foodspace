import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Router 
import { useNavigate, useLocation, Link } from 'react-router-dom'

// Redux
import { refreshMe } from '../../redux/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'

// Utils
import { API } from '../../lib/urls'

// Icons
import { MdCancel } from 'react-icons/md'
import { BiArrowBack, BiFridge } from 'react-icons/bi'
import { FaPlusCircle, FaTimes, FaSpinner } from 'react-icons/fa'
import { FiPlusCircle, FiDelete } from 'react-icons/fi'
import { BsSun } from 'react-icons/bs'

// Components 
import Button from '../../components/Button'


function Create() {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const { user, token } = useSelector(state => state.auth)
    const [name, setName] = useState('')
    const [areas, setAreas] = useState([''])
    const [foodSpaceId, setFoodSpaceId] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({ name: null, areas: null })



    async function handleCreateSubmit(e) {
        e.preventDefault()

        // Validation
        let validErrors = errors
        if (name.length <= 1) {
            validErrors["name"] = "Please provide a valid name."
        } else {
            validErrors["name"] = null
        }
        if (areas.length === 1 && areas[0] === "") {
            validErrors["areas"] = "Please provide an area."
        } else {
            validErrors["areas"] = null
        }
        setErrors({ ...validErrors })
        const readyToSubmit = Object.values(validErrors).every((item) => item === null)
        if (readyToSubmit) {
            const areaInput = []
            areas.forEach((item) => {
                if (item !== '') {
                    areaInput.push(item.toLowerCase())
                }
            })

            const data = {
                admin: {
                    _id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    avatar: user.avatar
                },
                areas: areaInput,
                name,
            }

            try {
                setIsLoading(true)
                const res = await axios({
                    method: "POST",
                    url: `${API.FOODSPACE.create}`,
                    data: data,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (res.data.foodSpace._id) {
                    setFoodSpaceId(res.data.foodSpace._id)
                }
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
            }
        }



    }

    function handleAddFieldChange(e, idx, array, setFn) {
        let copy = [...array]
        copy[idx] = `${e.target.value}`
        setFn(copy)
    }

    function removeField(idx, array, setFn) {
        let copy = [...array]
        copy.splice(idx, 1)
        setFn(copy)
    }

    return (
        <div className='min-h-screen p-7 flex flex-col justify-center items-center '>

            {/* Back Button */}
            {location.state
                ? <>
                    {(location.state.prevPath.includes('/product') && location.state.prevPath !== '/product/me') &&
                        <Link to={location.state.prevPath}>
                            <span className='fixed top-6 left-6'>
                                <BiArrowBack className='inline-block text-[1rem] text-main mr-1 mb-1' />
                                All Products
                            </span>
                        </Link>
                    }

                    {(location.state.prevPath.includes('/account') || location.state.prevPath.includes('/foodSpace')) &&
                        <Link to={"/"}>
                            <span className='fixed top-6 left-6'>
                                <BiArrowBack className='inline-block text-[1rem] text-main mr-1 mb-1' />
                                Home
                            </span>
                        </Link>
                    }

                    {location.state.prevPath === '/product/me' &&
                        <Link to={location.state.prevPath}>
                            <span className='fixed top-6 left-6'>
                                <BiArrowBack className='inline-block text-[1rem] text-main mr-1 mb-1' />
                                My Foods
                            </span>
                        </Link>
                    }
                </>
                : <Link to={"/product"}>
                    <span className='fixed top-6 left-6'>
                        <BiArrowBack className='inline-block text-[1rem] text-main mr-1 mb-1' />
                        All Products
                    </span>
                </Link>
            }


            {/* FoodSpace Not Created */}
            {!foodSpaceId &&
                <form onSubmit={handleCreateSubmit} className="flex flex-col space-y-5 min-w-[350px] max-w-[350px] min-h-[70vh]">
                    {/* Header */}
                    <h1 className='text-3xl font-semibold tracking-tight text-center'>
                        Create a FoodSpace
                    </h1>

                    {/* Icon */}
                    <div >
                        <div className='w-max bg-white rounded-full ring-4 ring-white drop-shadow-lg mx-auto'>
                            <BiFridge className='fill-main text-[80px] inline-block p-4' />
                        </div>

                    </div>

                    {/* Name */}
                    <div className='flex justify-center flex-col'>
                        <label htmlFor='name' className='font-semibold text-lg mr-2 block mb-1'>Name
                            {errors.name && <span className='inline-block text-xs text-red-600 font-normal ml-2'>{errors.name}</span>}
                        </label>

                        {/* Input */}
                        <div className='relative'>
                            <input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border-2 rounded-lg px-3 py-2 focus:outline-offset-1 focus:outline-sky-300 w-full"
                                placeholder='E.g. Refrigerator'
                            />
                            {name &&
                                <MdCancel onClick={() => setName('')} className='absolute right-3 top-[50%] -translate-y-[50%] inline-block  fill-neutral-400 hover:fill-neutral-500 text-lg cursor-pointer' />
                            }
                        </div>

                    </div>


                    {/* Areas */}
                    <div className='flex justify-center flex-col'>
                        <label htmlFor='area' className='font-semibold text-lg mr-2 block mb-1'>Areas
                            {errors.areas && <span className='inline-block text-xs text-red-600 font-normal ml-2'>{errors.areas}</span>}
                        </label>

                        <ul className='flex flex-col space-y-2.5'>
                            {/* Input */}
                            {areas.map((item, idx) => (
                                <div className='relative' key={`area-field-${idx}`}>
                                    <input
                                        id="areas"
                                        type="text"
                                        value={areas[idx]}
                                        onChange={(e) => handleAddFieldChange(e, idx, areas, setAreas)}
                                        className="border-2 rounded-lg px-3 py-2 focus:outline-offset-1 focus:outline-sky-300 w-[90%]"
                                        placeholder='E.g. Top Shelf'
                                    />

                                    {/* Add Area Button */}
                                    {(idx === areas.length - 1) &&
                                        <button
                                            type="button"
                                            onClick={() => setAreas([...areas, ''])}
                                            className="bg-white rounded-lg px-3 py-2  border-2 w-[90%] mt-2.5 flex items-center justify-center text-secondary"
                                        >
                                            <FiPlusCircle className='inline-block mr-1 ' />
                                            Add Area
                                        </button>
                                    }

                                    {/* Delete Button */}
                                    {(idx !== 0) &&
                                        <>

                                            <button
                                                type="button"
                                                className='inline-block absolute top-2 right-2'
                                                onClick={() => removeField(idx, areas, setAreas)}
                                            >
                                                <FiDelete className='inline-block text-xl' />
                                            </button>
                                        </>
                                    }
                                </div>
                            ))}
                        </ul>
                    </div>

                    <Button type="submit" sx="w-full">
                        Submit
                    </Button>
                </form>
            }

            {foodSpaceId &&
                <div >
                    <div className='flex flex-col justify-center items-center'>
                        {/* Header */}
                        <h1 className='text-3xl my-2 font-semibold tracking-tight text-center'>
                            {name}
                        </h1>
                        <h2 className='text-3xl my-2 font-semibold tracking-tight text-center'>
                            was created!
                        </h2>
                        <FaSpinner className=" absolute animate-spin-slow text-[20rem] text-secondary opacity-10" />
                    </div>


                    {/* User Action */}
                    <div className='mt-10'>
                        <Link
                            to={`/foodSpace/${name}`}
                            state={{ foodSpace_id: foodSpaceId, currentUsers: [] }}
                        >
                            <Button variant='outline'>
                                Your FoodSpace
                            </Button>
                        </Link>

                        <Link
                            to={`/foodSpace/admin/${name}/add-user`}
                            state={{ foodSpace_id: foodSpaceId }}
                        >
                            <Button>
                                Invite Users
                            </Button>
                        </Link>

                    </div>
                </div>
            }

        </div >
    )
}

export default Create