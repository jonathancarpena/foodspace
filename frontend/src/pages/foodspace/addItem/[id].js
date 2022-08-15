import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

// Redux
import { useSelector } from 'react-redux'

// Router
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom'

// Urls
import { API } from '../../../lib/urls'

// Constants
import { unitMeasure } from '../../../lib/constants'

// Utils
import { addToFoodSpace } from '.'
import { toTitleCase } from '../../../lib/utils'

// Icons
import { BiArrowBack, BiCheck } from 'react-icons/bi'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa'

// Components
import Avatar from '../../../components/pages/Account/Avatar'
import Dropdown, { DropdownItem } from '../../../components/Dropdown'
import Loading from '../../../components/Layout/Loading'
import Error from '../../../components/Layout/Error'


function AddItemDetails() {
    // Router
    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    // Redux
    const { token } = useSelector(state => state.auth)

    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errors, setErrors] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [unit, setUnit] = useState(null)
    const [area, setArea] = useState(null)
    const [owner, setOwner] = useState({
        show: false,
        value: "everyone"
    })
    const [purchasedDate, setPurchasedDate] = useState(moment(new Date(Date.now())).format("YYYY-MM-DD"))



    // Grabbing Product
    useEffect(() => {

        if (!product && !area && !unit) {
            setIsLoading(true)
            axios.get(`${API.PRODUCT.base}/${id}`)
                .then((res) => {
                    if (res.status === 200) {
                        setProduct(res.data)
                        if (location.state.foodSpace) {
                            setArea({ show: false, value: location.state.foodSpace.areas[0] })
                            setUnit({ show: false, value: unitMeasure[res.data.type][0] })
                        } else {
                            navigate('/foodSpace/choose', {
                                state: {
                                    prevPath: '/',
                                    nextPath: location.pathname
                                }
                            })
                        }
                    }
                    setIsLoading(false)
                })
                .catch((err) => setErrors(err))
        }

    }, [id, location.state.foodSpace, location.pathname, navigate, area, product, unit])


    async function handleFormSubmit(e) {
        e.preventDefault()
        let ownerInput = null
        if (owner.value !== "everyone") {
            if (owner.value !== location.state.foodSpace.admin.first_name) {
                ownerInput = location.state.foodSpace.users.find((item) => item.first_name === owner.value)
            } else {
                ownerInput = location.state.foodSpace.admin
            }
        }

        const input = {
            product,
            quantity,
            area: area.value,
            unit: unit.value,
            purchasedDate,
            owner: ownerInput
        }

        const res = await addToFoodSpace(token, location.state.foodSpace, product, input)
        if (res.status === 200) {
            alert(`${toTitleCase(input.product.brand)} ${toTitleCase(input.product.name)} was added to ${toTitleCase(location.state.foodSpace.name)}.`)
            navigate(`/foodSpace/add-item`, {
                state: {
                    prevPath: location.pathname,
                    foodSpace: location.state.foodSpace
                }
            })
        }
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
    if (errors) {
        return <Error />
    }

    if (!product || isLoading || !location.state.foodSpace) {
        return (
            <Loading />
        )
    }

    return (
        <div className='min-h-screen relative  mb-[5rem]'>
            {/* Back Button */}
            <Link to={prevPath} state={state}>
                <span className='absolute top-6 left-6'>
                    <BiArrowBack className='inline-block text-[1rem] text-main mr-1 mb-1' />
                </span>
            </Link>

            <span onClick={handleFormSubmit} className='absolute top-6 right-6 cursor-pointer'>
                <BiCheck className='inline-block text-[1.8rem] text-main  mb-1' />
            </span>


            {/* Image, Name, Brand */}
            <div className='flex flex-col items-center justify-center h-[40vh]'>

                {/* Product Image */}
                <Avatar
                    emoji={product.image}
                    bg={'bg-neutral-200'}
                    ring
                    size='xl'

                />
                <h1 className='text-3xl capitalize text-main font-semibold mt-3 '>
                    {product.name}
                </h1>
                <h2 className='text-xl capitalize text-secondary'>
                    {product.brand}
                </h2>

            </div>


            {/* Form */}
            <form onSubmit={handleFormSubmit} className="flex flex-col space-y-7 mx-5">
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
                        {unitMeasure[product.type].map((item) => (
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

                            <DropdownItem key={item._id} sx={`text-xl px-4 py-2 cursor-pointer hover:bg-neutral-200 capitalize`} onClick={() => setOwner({ show: false, value: item.first_name })} >
                                <div className='flex items-center space-x-3'>
                                    <Avatar size="xs" emoji={item.avatar.emoji} bg={item.avatar.favoriteColor} />
                                    <span className='inline-block'>{item.first_name}</span>
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



        </div >
    )
}

export default AddItemDetails