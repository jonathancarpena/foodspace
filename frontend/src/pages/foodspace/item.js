import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
// Redux
import { useSelector } from 'react-redux'

// Router
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom'

// URL
import { API } from '../../lib/urls'

// Constants
import { unitMeasure } from '../../lib/constants'

// Utils
import { convertToValidDate, toTitleCase } from '../../lib/utils'

// Components
import Dropdown, { DropdownItem } from '../../components/Dropdown'
import Avatar from '../../components/pages/Account/Avatar'

// Icons
import { BiArrowBack, BiCheck } from 'react-icons/bi'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import Button from '../../components/Button'

function FoodSpaceItem() {
    const { name, stockNum } = useParams()
    const { token, user } = useSelector(state => state.auth)
    const location = useLocation()
    const navigate = useNavigate()
    const [item, setItem] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errors, setErrors] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [unit, setUnit] = useState({
        show: false,
        value: null
    })
    const [area, setArea] = useState({
        show: false,
        value: null
    })
    const [owner, setOwner] = useState({
        show: false,
        value: "everyone"
    })
    const [purchasedDate, setPurchasedDate] = useState(null)

    useEffect(() => {
        if (!location.state) {
            navigate('/')
        }
        const foodSpace = location.state.foodSpace
        const stockItem = location.state.foodSpace.stock[stockNum - 1]
        if (stockItem.owner) {
            if (foodSpace.admin.email !== user.email) {
                if (stockItem.owner.email !== user.email) {
                    alert(`Only ${stockItem.owner.first_name} ${stockItem.owner.last_name[0]}. can make changes to this item.`)
                    navigate(`${location.state.prevPath}`, { state: { foodSpace: location.state.foodSpace } })
                }
            }

        }


        setItem(stockItem)
        setQuantity(stockItem.quantity)
        setUnit({ ...unit, value: stockItem.unit })
        setArea({ ...area, value: stockItem.area })
        setOwner({ ...owner, value: stockItem.owner ? stockItem.owner.first_name : "everyone" })
        setPurchasedDate(stockItem.purchasedDate)


    }, [])

    async function handleEditSubmit(e) {
        e.preventDefault()
        const foodSpace = location.state.foodSpace


        let itemOwner = null;
        if (owner.value !== "everyone") {
            let sameOwner = false;
            let newOwner;
            if (foodSpace.stock[stockNum - 1].owner.first_name === owner.value) {
                sameOwner = foodSpace.stock[stockNum - 1].owner
                itemOwner = foodSpace.stock[stockNum - 1].owner
            }
            if (!sameOwner) {
                if (owner.value === foodSpace.admin.first_name) {
                    newOwner = foodSpace.admin
                } else {
                    newOwner = foodSpace.users.find((user) => user.first_name === owner.value)
                }
                itemOwner = newOwner
            }
        }

        const convertedDate = moment(purchasedDate, "YYYY-MM-DD").toString()

        const data = {
            item_id: item._id,
            info: {
                owner: itemOwner,
                area: area.value,
                quantity,
                unit: unit.value,
                purchasedDate: convertedDate
            },
            foodSpace_id: foodSpace._id
        }


        try {
            const res = await axios({
                method: "POST",
                url: `${API.FOODSPACE.updateItem}`,
                data,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.status = 200) {
                alert(`Updated item #${stockNum}`)
                navigate(`/foodSpace/${name}`, { state: { foodSpace: location.state.foodSpace } })
            }

        } catch (error) {
            console.log(error)
            const { message } = error.response.data
            alert(message)
        }
    }


    async function handleRemoveItem() {
        console.log('DELETE ', item)
        const userConfirm = window.confirm(`Would you like to remove ${toTitleCase(item.product.brand)} ${toTitleCase(item.product.name)}?`)

        if (userConfirm) {
            try {
                const res = await axios({
                    method: "DELETE",
                    url: `${API.FOODSPACE.removeItem}`,
                    data: {
                        item_id: item._id,
                        foodSpace_id: location.state.foodSpace._id
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (res.status === 200) {
                    alert(`Removed ${toTitleCase(item.product.brand)} ${toTitleCase(item.product.name)}`)
                    navigate(`/foodSpace/${location.state.foodSpace.name}`, {
                        state: {
                            foodSpace: location.state.foodSpace
                        }
                    })
                }
            } catch (error) {
                const { message } = error.response.data
                console.log(message)
            }
        }

    }



    if (!item || !location.state) {
        return <h1>Loading...</h1>
    }
    return (
        <div className='min-h-screen bg-white overflow-visible mb-[4.2rem]'>

            <div className='bg-white fixed top-6 w-full text-center z-[50]'>
                {/* Back Button */}
                <Link to={`/foodSpace/${location.state.foodSpace.name}`} state={location.state}>
                    <span className=''>
                        <BiArrowBack className=' absolute left-6 inline-block text-[1rem] text-main mr-1 mb-1' />
                    </span>
                </Link>

                {/* Header */}
                <span className=' inline-block mx-auto  text-[1rem] font-semibold'>
                    Item #{stockNum} in {location.state.foodSpace.name}
                </span>

                {/* Save Button */}
                <span onClick={handleEditSubmit} className=' absolute right-6 cursor-pointer'>
                    <BiCheck className='inline-block text-[1.8rem] text-main  mb-1' />
                </span>
            </div>




            {/* Image, Name, Brand */}
            <div className='flex flex-col items-center justify-center h-[40vh]'>

                {/* Item Image */}
                <Avatar
                    emoji={item.product.image}
                    bg={'bg-neutral-200'}
                    ring
                    size='xl'
                />
                <h1 className='text-3xl capitalize text-main font-semibold mt-3 '>
                    {item.product.name}
                </h1>
                <h2 className='text-xl capitalize text-secondary'>
                    {item.product.brand}
                </h2>

            </div>


            {/* Form */}
            <form onSubmit={handleEditSubmit} className="flex flex-col space-y-7 w-[80%] mx-auto">
                {/* Quantity */}
                <div className='flex justify-between'>
                    <label className='text-lg font-semibold'>Quantity</label>
                    <input
                        name="quantity"
                        type="number"
                        min={1}
                        step={1}
                        className='text-xl w-[75px] bg-white rounded-lg p-2 focus:outline-offset-1 focus:outline-sky-300'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>


                {/* Unit */}
                <div className='flex justify-between'>
                    <label className='text-lg font-semibold'>Unit</label>
                    <Dropdown
                        select
                        sx={`w-max z-[50] p-2 bg-white rounded-lg ${unit.show ? 'ring-[1.5px] ring-sky-300 ring-offset-1' : ''}`}
                        direction="left"
                        button={
                            <div onClick={() => setUnit({ ...unit, show: !unit.show })} className="cursor-pointer text-center">
                                <span className='text-xl '>
                                    {unit.value}
                                    {!unit.show
                                        ? <FaCaretDown className="mb-1 ml-1 inline-block" />
                                        : <FaCaretUp className="mb-1 ml-1 inline-block" />
                                    }
                                </span>
                            </div>
                        }>
                        {unitMeasure[item.product.type].map((item) => (
                            <DropdownItem key={item} sx={`text-xl bg-white px-4 py-2 cursor-pointer hover:bg-neutral-200 z-50`} onClick={() => setUnit({ show: false, value: item })} >
                                {item}
                            </DropdownItem>
                        ))}
                    </Dropdown>
                </div>


                {/* Areas */}
                <div className='flex justify-between'>
                    <label className='text-lg font-semibold'>Area</label>
                    <Dropdown
                        select
                        sx={`w-max z-[30] p-2 bg-white rounded-lg ${area.show ? 'ring-[1.5px] ring-sky-300 ring-offset-1' : ''}`}
                        direction="left"
                        button={
                            <div onClick={() => setArea({ ...area, show: !area.show })} className="cursor-pointer text-center">
                                <span className='text-xl capitalize'>
                                    {area.value}
                                    {!area.show
                                        ? <FaCaretDown className="mb-1 ml-1 inline-block" />
                                        : <FaCaretUp className="mb-1 ml-1 inline-block" />
                                    }
                                </span>
                            </div>
                        }>
                        {location.state.foodSpace.areas.map((item) => (
                            <DropdownItem key={item} sx={`text-xl px-4 py-2 cursor-pointer hover:bg-neutral-200 capitalize`} onClick={() => setArea({ show: false, value: item })} >
                                {item}
                            </DropdownItem>
                        ))}
                    </Dropdown>

                </div>


                {/* Purchase Date */}
                <div className='flex justify-between '>
                    <label className='text-lg font-semibold'>Date Purchased</label>
                    <input
                        className='text-xl p-2 bg-white rounded-lg focus:outline-offset-1 focus:outline-sky-300 cursor-pointer'
                        name="purchasedDate"
                        type="date"
                        value={purchasedDate}
                        onChange={(e) => setPurchasedDate(e.target.value)}
                    />
                </div>

                {/* Owner */}
                <div className='flex justify-between'>
                    <label className='text-lg font-semibold'>Owner</label>
                    <Dropdown
                        select
                        sx={`w-max z-[20] p-2 bg-white rounded-lg ${owner.show ? 'ring-[1.5px] ring-sky-300 ring-offset-1' : ''}`}
                        direction="left"
                        button={
                            <div onClick={() => setOwner({ ...owner, show: !owner.show })} className="cursor-pointer text-center">
                                <span className='text-xl capitalize'>
                                    {owner.value}
                                    {!owner.show
                                        ? <FaCaretDown className="mb-1 ml-1 inline-block" />
                                        : <FaCaretUp className="mb-1 ml-1 inline-block" />
                                    }
                                </span>
                            </div>
                        }>

                        {/* Admin */}
                        <DropdownItem sx={`text-xl px-4 py-2 cursor-pointer hover:bg-neutral-200 capitalize`} onClick={() => setOwner({ show: false, value: location.state.foodSpace.admin.first_name })}>
                            <div className='flex items-center space-x-3'>
                                <Avatar size="xs" emoji={location.state.foodSpace.admin.avatar.emoji} bg={location.state.foodSpace.admin.avatar.favoriteColor} />
                                <span>{location.state.foodSpace.admin.first_name}</span>
                            </div>
                        </DropdownItem>

                        {/* Users */}
                        {location.state.foodSpace.users.map((item) => (

                            <DropdownItem key={item._id} sx={`text-xl px-4 py-2 cursor-pointer hover:bg-neutral-200 capitalize `} onClick={() => setOwner({ show: false, value: item.first_name })} >
                                <div className='flex items-center space-x-3'>
                                    <Avatar size="xs" emoji={item.avatar.emoji} bg={item.avatar.favoriteColor} />
                                    <span className='inline-block'>{item.first_name} </span>
                                </div>
                            </DropdownItem>
                        ))}

                        <DropdownItem sx={`text-xl px-4 py-2 cursor-pointer hover:bg-neutral-200 capitalize`} onClick={() => setOwner({ show: false, value: "everyone" })} >
                            <div className='flex items-center space-x-3'>
                                <Avatar size="xs" emoji={'😀'} />
                                <span className='inline-block'>Everyone</span>
                            </div>
                        </DropdownItem>
                    </Dropdown>

                </div>

            </form>

            <div className='mt-5 block w-[80%] mx-auto'>
                <Button onClick={() => handleRemoveItem()} type="button" sx="w-full">
                    Delete
                </Button>
            </div>


        </div>
    )
}

export default FoodSpaceItem