import React, { useState, useEffect } from 'react'

// Router
import { useLocation, useNavigate } from 'react-router-dom'

// Redux
import { useSelector } from 'react-redux'

// Components
import Dropdown, { DropdownItem } from '../../components/Dropdown'

// Icons
import { BiFridge } from 'react-icons/bi'
import { FaCaretDown, FaCaretUp, FaCrown } from 'react-icons/fa'
import Button from '../../components/Button'
import axios from 'axios'
import { API } from '../../lib/urls'


function ChooseFoodSpace() {
    const { user, token } = useSelector(state => state.auth)
    const location = useLocation()
    const navigate = useNavigate()
    const [showOptions, setShowOptions] = useState(false)
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        let noFoodSpaces = false
        if (!user.foodSpaces.length) {
            if (!user.admin.length) {
                noFoodSpaces = true
            }
        } else if (!user.admin.length) {
            noFoodSpaces = true
        }

        if (noFoodSpaces) {
            navigate('/')
        }


    }, [])

    function handleSelectChange(item) {
        setSelected(item)
        setShowOptions(false)
    }

    async function fetchFoodSpace() {
        const res = await axios.get(`${API.FOODSPACE.base}/${selected._id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.status === 200) {
            return res.data.foodSpace
        }
    }
    async function handleSubmit(e) {
        e.preventDefault()
        const foodSpace = await fetchFoodSpace()
        navigate(`${location.state.nextPath}`, {
            state: {
                prevPath: location.state.prevPath,
                foodSpace: foodSpace
            }
        })
    }

    return (
        <div className='min-h-screen p-7 flex flex-col justify-center items-center'>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-5 min-w-[350px] max-w-[350px] min-h-[50vh]">
                <h1 className='text-3xl font-semibold tracking-tight text-center'>
                    Which FoodSpace?
                </h1>

                <Dropdown
                    select
                    sx="w-full z-[50]"
                    direction="center"
                    button={
                        <div onClick={() => setShowOptions(!showOptions)} className="cursor-pointer text-center">
                            <span className='capitalize text-2xl font-semibold'>
                                {!selected ? "Pick One" : selected.name}
                                {!showOptions
                                    ? <FaCaretDown className="mb-1 ml-1 inline-block" />
                                    : <FaCaretUp className="mb-1 ml-1 inline-block" />
                                }
                            </span>
                        </div>
                    }>
                    {user.admin &&
                        user.admin.map((item) => (
                            <DropdownItem key={item._id} sx={`p-5 cursor-pointer capitalize hover:bg-neutral-200`} onClick={() => handleSelectChange(item)} value={item.name}>
                                <FaCrown className='inline-block mr-2 mb-1 text-yellow-500' />
                                {item.name}
                            </DropdownItem>
                        ))
                    }
                    {user.foodSpaces &&
                        user.foodSpaces.map((item) => (
                            <DropdownItem key={item._id} sx={`p-5 cursor-pointer capitalize hover:bg-neutral-200`} onClick={() => handleSelectChange(item)} value={item.name}>{item.name}</DropdownItem>
                        ))
                    }
                </Dropdown>

                {selected &&
                    <div className='flex space-x-4'>
                        <Button onClick={() => navigate('/')} type="button" sx="w-full">Go Home</Button>
                        <Button type="submit" sx="w-full">Continue</Button>
                    </div>
                }


            </form>
        </div>
    )
}

export default ChooseFoodSpace



