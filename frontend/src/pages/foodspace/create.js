import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Router 
import { useNavigate } from 'react-router-dom'

// Redux
import { refreshMe } from '../../redux/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'

// Utils
import { API } from '../../lib/urls'

// Icons
import { FaPlusCircle, FaTimes } from 'react-icons/fa'


// foodSpaceSchema //

// users
// areas
// stock

// userSchema //
// _id
// first_name
// last_name
// email
// avatar

// foodSpaceItemSchema //
// product: {
//     _id: required,
//     name: required,
//     imageUrl: required
//     measurement,
// },
// quantity
// area
// expired
// purchasedDate
// owner


function Create() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, token } = useSelector(state => state.auth)
    const [name, setName] = useState('jacks fridge')
    const [areas, setAreas] = useState([''])
    const [invitedUsers, setInvitedUsers] = useState([''])
    const [foodSpaceId, setFoodSpaceId] = useState(null)
    const [errors, setErrors] = useState(null)


    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [])

    async function handleCreateSubmit(e) {
        e.preventDefault()
        const areaInput = areas[0] !== ''
        const data = {
            admin: {
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                avatar: user.avatar
            },
            areas: areaInput ? areas : ['pantry'],
            name,
        }

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
    }

    async function handleInviteSubmit(e) {
        e.preventDefault()
        for (const email of invitedUsers) {
            const data = {
                email: email,
                foodSpace_id: foodSpaceId
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
                setErrors(null)
                if (res) {
                    dispatch(refreshMe())
                    navigate('/')
                }


            } catch (error) {
                const { message } = error.response.data
                setErrors(message)
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
        <div className='h-screen overflow-y-hidden'>
            <h1 className='text-3xl font-semibold tracking-tighter text-center'>
                Create FoodSpace
            </h1>


            {!foodSpaceId &&
                <form onSubmit={handleCreateSubmit}>
                    <div className='flex flex-col space-y-4'>
                        <label>Name
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="ml-2"
                            />
                        </label>

                        <div className='flex'>
                            <label>Areas</label>

                            <ul className='flex flex-col space-y-2'>
                                {areas.map((item, idx) => (
                                    <div key={`field-${idx}`}>
                                        <span className='ml-4'>#{idx}</span>
                                        <input
                                            type="text"
                                            value={areas[idx]}
                                            onChange={(e) => handleAddFieldChange(e, idx, areas, setAreas)}
                                            className="ml-2"
                                        />

                                        {(idx === areas.length - 1) || (areas.length === 0 && idx === 0)
                                            ? <FaPlusCircle
                                                onClick={() => setAreas([...areas, ''])}
                                                className='inline-block ml-1 cursor-pointer hover:text-primary-500 active:text-primary-600'
                                            />
                                            : <FaTimes
                                                onClick={() => removeField(idx, areas, setAreas)}
                                                className='inline-block ml-1 cursor-pointer hover:text-primary-500 active:text-primary-600'
                                            />

                                        }


                                    </div>
                                ))}
                            </ul>
                        </div>

                    </div>

                    <button type="submit" className='my-5'>
                        Submit
                    </button>
                </form>
            }

            {foodSpaceId &&
                <form onSubmit={handleInviteSubmit}>
                    <div className='flex'>
                        <label>Users To Invite</label>

                        <ul className='flex flex-col space-y-2'>
                            {invitedUsers.map((item, idx) => (
                                <div key={`field-${idx}`}>
                                    <span className='ml-4'>#{idx}</span>
                                    <input
                                        type="text"
                                        value={invitedUsers[idx]}
                                        onChange={(e) => handleAddFieldChange(e, idx, invitedUsers, setInvitedUsers)}
                                        className="ml-2"
                                    />

                                    {(idx === invitedUsers.length - 1) || (invitedUsers.length === 0 && idx === 0)
                                        ? <FaPlusCircle
                                            onClick={() => setInvitedUsers([...invitedUsers, ''])}
                                            className='inline-block ml-1 cursor-pointer hover:text-primary-500 active:text-primary-600'
                                        />
                                        : <FaTimes
                                            onClick={() => removeField(idx, invitedUsers, setInvitedUsers)}
                                            className='inline-block ml-1 cursor-pointer hover:text-primary-500 active:text-primary-600'
                                        />

                                    }

                                </div>
                            ))}
                        </ul>
                    </div>

                    {errors && <p>{errors}</p>}
                    <button type="submit">Submit</button>
                </form>
            }

        </div>
    )
}

export default Create