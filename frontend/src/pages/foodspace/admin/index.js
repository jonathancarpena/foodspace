import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Redux
import { useSelector } from 'react-redux'

// Router
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

// Urls
import { API } from '../../../lib/urls'

// Components
import Tooltip from '../../../components/Tooltip'
import Button from '../../../components/Button'
import Avatar from '../../../components/pages/Account/Avatar'
import Dropdown, { DropdownItem } from '../../../components/Dropdown'


// Import Swiper React components
import { Swiper, SwiperSlide, useSwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// Icons
import { FaTrashAlt, FaEdit, FaCheck, FaCrown, FaCog } from 'react-icons/fa'
import { BiFridge } from 'react-icons/bi'
import { ImCross } from 'react-icons/im'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { MdPeopleAlt } from 'react-icons/md'

// Utils
import { toTitleCase } from '../../../lib/utils'




function Admin() {
    const { state: { foodSpace_id } } = useLocation()
    const navigate = useNavigate()
    const location = useLocation()
    const [my_swiper, set_my_swiper] = useState({});
    const auth = useSelector(state => state.auth)
    const [foodSpace, setFoodSpace] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [area, setArea] = useState("all")


    useEffect(() => {
        setError(false)
        setLoading(true)
        axios({
            method: "GET",
            url: `${API.ADMIN.base}/${foodSpace_id}`,
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        }).then((res) => {
            if (res.data) {
                const addEditStatus = res.data.foodSpace.stock.map((item) => {
                    return {
                        ...item,
                        edit: false
                    }
                })
                setFoodSpace({ ...res.data.foodSpace, stock: addEditStatus })
            }
            setLoading(false)
        }).catch((err) => {
            console.log(err)
            const { message } = err.response.data
            setError(message)
            setLoading(false)
        })
        console.log('FETCH')
    }, [])



    async function handleRemoveItem(item) {
        const userConfirm = window.confirm(`Would you like to remove ${toTitleCase(item.product.brand)} ${toTitleCase(item.product.name)}?`)

        if (userConfirm) {
            try {
                const res = await axios({
                    method: "DELETE",
                    url: `${API.FOODSPACE.removeItem}`,
                    data: {
                        item_id: item._id,
                        foodSpace_id
                    },
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                })
                const filteredStock = foodSpace.stock.filter((stock) => stock !== item)
                setFoodSpace({ ...foodSpace, stock: filteredStock })
            } catch (error) {
                const { message } = error.response.data
                setError(message)
            }
        }

    }

    function editStatus(item) {
        const index = foodSpace.stock.findIndex((element) => element._id === item._id)
        let copy = foodSpace.stock
        copy[index].edit = !copy[index].edit
        setFoodSpace({ ...foodSpace, stock: copy })
    }

    async function handleEditSubmit(e, item) {
        e.preventDefault()
        let owner = null
        const index = foodSpace.stock.findIndex((element) => element._id === item._id)
        if (foodSpace.stock[index].owner !== "everyone") {
            owner = foodSpace.users.find((item) => item.first_name === foodSpace.stock[index].owner)
            if (!owner) {
                if (foodSpace.admin.first_name === foodSpace.stock[index].owner) {
                    owner = foodSpace.admin
                }
            }
        }


        const data = {
            item_id: foodSpace.stock[index]._id,
            info: {
                owner,
                area: foodSpace.stock[index].area,
                quantity: foodSpace.stock[index].quantity
            },
            foodSpace_id
        }

        try {
            const res = await axios({
                method: "POST",
                url: `${API.FOODSPACE.updateItem}`,
                data,
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            })
            if (res) {
                let updatedStock = foodSpace.stock
                updatedStock[index].owner = owner
                updatedStock[index].edit = false
                setFoodSpace({ ...foodSpace, stock: updatedStock })
            }

        } catch (error) {
            console.log(error)
            const { message } = error.response.data
            alert(message)
            let updatedStock = foodSpace.stock
            updatedStock[index].edit = false
            setFoodSpace({ ...foodSpace, stock: updatedStock })

        }

    }

    function handleEditChange(e, item, qty) {
        const index = foodSpace.stock.findIndex((element) => element._id === item._id)
        const key = e.target.getAttribute('name')
        let newStock = foodSpace.stock
        if (key === "quantity") {
            if (qty === "increase") {
                newStock[index][key] += 1
            } else {
                if (newStock[index][key] !== 0) {
                    newStock[index][key] -= 1
                }
            }

        } else {
            newStock[index][key] = e.target.value
        }
        setFoodSpace({ ...foodSpace, stock: newStock })
    }

    function areaSpecific() {
        if (area === "all") {
            return foodSpace.stock
        } else {
            return foodSpace.stock.filter((item) => item.area === area)
        }
    }

    async function handleDeleteFoodSpace() {
        const userConfirm = window.confirm('Are you sure you want to delete this FoodSpace?')
        if (userConfirm) {
            try {
                const res = await axios({
                    method: "DELETE",
                    url: `${API.ADMIN.delete}`,
                    data: {
                        foodSpace_id
                    },
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                })
                if (res) {
                    navigate('/account')
                }

            } catch (error) {
                const { message } = error.response.data
            }
        }
    }

    async function handleRemoveArea(area) {
        const userConfirm = window.confirm(`Are you sure you want to remove ${area} from this FoodSpace?`)
        if (userConfirm) {
            try {
                const res = await axios({
                    method: "DELETE",
                    url: `${API.ADMIN.removeArea}`,
                    data: {
                        area,
                        foodSpace_id
                    },
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                })
                setFoodSpace({ ...foodSpace, areas: foodSpace.areas.filter((item) => item !== area) })
            } catch (error) {
                const { message } = error.response.data
            }
        }
    }

    async function handleDeleteItem(item) {
        const userResponse = window.confirm(`Would you like to remove ${toTitleCase(item.product.brand)} ${toTitleCase(item.product.name)}?`)
    }


    if (loading) {
        return <div>Loading...</div>
    }

    if (!foodSpace || error) {
        return <div> {error} </div>

    }
    return (
        <div className='min-h-screen'>
            {/* <Link to={`/foodSpace/${foodSpace.name}/add-item`} state={{ foodSpace, foodSpace_id }}>
                <Button>
                    Add Item
                </Button>
            </Link>


            <Button onClick={() => handleDeleteFoodSpace()}>
                Delete FoodSpace
            </Button>

            <Link to={`/foodSpace/admin/${foodSpace.name}/add-area`} state={{ foodSpace, foodSpace_id }}>
                <Button>
                    Add Area
                </Button>
            </Link>

            <Link to={`/foodSpace/admin/${foodSpace.name}/manage/users`} state={{ foodSpace, foodSpace_id }}>
                <Button>
                    Manage Users
                </Button>
            </Link> */}


            {/* Header */}
            <div className='border-b-2 p-7'>

                <div className='pb-5 flex justify-between items-center'>
                    <div>
                        <BiFridge className='inline-block text-5xl mb-1 mr-2' />
                        <h1 className='inline-block capitalize font-semibold text-3xl tracking-tight border-r-2 pr-3'>{foodSpace.name}</h1>
                        <span className='ml-3 text-secondary'>{foodSpace.users.length + 1} <MdPeopleAlt className='inline-block mb-1 text-lg' /></span>
                    </div>

                    {/* Admin View */}
                    <Dropdown button={<FaCog className='text-secondary text-2xl hover:text-neutral-600 cursor-pointer' />}>
                        <DropdownItem>
                            <Link to={`/foodSpace/admin/${foodSpace.name}/add-user`} state={{ prevPath: location.pathname }}>
                                Add User
                            </Link>
                        </DropdownItem>
                        <DropdownItem>Another action</DropdownItem>
                        <DropdownItem>Something Else Here</DropdownItem>
                        <DropdownItem>Hey</DropdownItem>
                    </Dropdown>
                </div>


                {/* Admin Display */}
                <div className=' flex space-x-2 '>

                    {/* Admin */}
                    <div className='relative '>
                        <FaCrown className='absolute -top-4 left-[50%] -translate-x-[50%] text-yellow-500' />
                        <h2 className='capitalize '>
                            <Tooltip message={`${foodSpace.admin.first_name} ${foodSpace.admin.last_name[0]}.`} direction={`bottom`}>
                                <Avatar
                                    sx='inline-block'
                                    emoji={foodSpace.admin.avatar.emoji}
                                    bg={foodSpace.admin.avatar.favoriteColor}
                                    size="sm"
                                    ring
                                />
                            </Tooltip>
                        </h2>
                    </div>

                    {/* Users */}
                    <div className='pl-[27px] border-l-2'>
                        {foodSpace.users.map((user) => (
                            <Tooltip message={`${user.first_name} ${user.last_name[0]}.`} direction={`bottom`}>
                                <Avatar
                                    bg={user.avatar.favoriteColor}
                                    emoji={user.avatar.emoji}
                                    size="sm"
                                    ring
                                    sx="mx-[-15px]"
                                />
                            </Tooltip>
                        ))}
                    </div>

                </div>
            </div>


            {/* Areas */}
            <Swiper
                onInit={(ev) => {
                    set_my_swiper(ev)
                }}
                spaceBetween={5}
                className="w-[100vw] "
                slidesPerView={3}
                // centeredSlides={true}
                onSlideChange={(swiper) => setArea(foodSpace.areas[swiper.activeIndex])}
            >
                {/* DEFAULT: ALL */}
                <SwiperSlide className='text-center my-5'>
                    <span
                        onClick={() => {
                            my_swiper.slideTo(0);
                            setArea("all")
                        }}
                        className={`${"all" === area ? 'text-main border-b-2 border-b-primary-500 ' : 'text-secondary'}   font-semibold capitalize cursor-pointer `}>
                        All
                    </span>
                </SwiperSlide>

                {/* AREA */}
                {foodSpace.areas.map((item, idx) => (
                    <SwiperSlide className='text-center my-5'>
                        <span
                            key={item}
                            onClick={() => {
                                my_swiper.slideTo(idx);
                                setArea(item)
                            }}
                            className={`${item === area ? 'text-main border-b-2 border-b-primary-500 ' : 'text-secondary'}   font-semibold capitalize cursor-pointer `}>
                            {item}
                        </span>
                    </SwiperSlide>
                ))}
            </Swiper>


            {/* Stock */}
            <div className='mx-5 '>
                {areaSpecific().map((item, idx) => (
                    <div key={`${idx}-${idx}`} className="flex space-x-3">
                        {item.edit
                            ?
                            <Swiper
                                initialSlide={1}
                                slidesPerView={"auto"}
                                className="w-full  "
                            >
                                <form onSubmit={(e) => handleEditSubmit(e, item)} >
                                    <SwiperSlide className='text-left max-w-max  pb-5 px-1.5 flex '>
                                        <div onClick={() => editStatus(item)} className={`bg-red-600 cursor-pointer rounded-xl drop-shadow-lg flex flex-col justify-center items-center space-y-1 h-full w-[15vw] `}>
                                            <ImCross className='text-white inline-block text-[2rem] ' />
                                            <span className='text-white text-sm'>Cancel</span>
                                        </div>
                                    </SwiperSlide>

                                    <SwiperSlide className='w-[80vw] pb-5 px-1.5 '>
                                        <div className='p-5 flex rounded-xl drop-shadow-lg w-full justify-between bg-white'>
                                            {/* NAME, IMAGE, QTY */}
                                            <div className='flex space-x-3 '>
                                                {/* Image */}
                                                <Avatar
                                                    emoji={item.product.image}
                                                    size="sm"
                                                />

                                                {/* Name */}
                                                <div>
                                                    <p className='text-secondary text-xs capitalize'>{item.product.brand}</p>
                                                    <p className='text-main capitalize'>{item.product.name}</p>

                                                    {/* Quantity */}
                                                    <div className='mr-2 inline-block'>
                                                        <AiOutlineMinusCircle name="quantity" onClick={(e) => handleEditChange(e, item, 'decrease')} className='cursor-pointer inline-block' />
                                                        <span className='mx-2'>{item.quantity}</span>
                                                        <AiOutlinePlusCircle name="quantity" onClick={(e) => handleEditChange(e, item, 'increase')} className='cursor-pointer inline-block' />
                                                    </div>
                                                    <span className='text-secondary'>{item.product.unit}</span>
                                                </div>
                                            </div>

                                            {/* AREA */}
                                            <div className='flex flex-col'>
                                                <span className=''>Area </span>
                                                <select
                                                    name="area"
                                                    value={item.area}
                                                    onChange={(e) => handleEditChange(e, item)}
                                                >
                                                    {foodSpace.areas.map((item) => (
                                                        <option value={item} >{toTitleCase(item)}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* OWNER */}
                                            <div className=''>
                                                <span className='block'>Owner </span>
                                                <select
                                                    name="owner"
                                                    onChange={(e) => handleEditChange(e, item)}
                                                    value={item.owner ? item.owner : "everyone"}
                                                    className=""
                                                >
                                                    {/* Admin */}
                                                    <option value={foodSpace.admin.first_name}>
                                                        {toTitleCase(foodSpace.admin.first_name)}
                                                    </option>

                                                    {/* Users */}
                                                    {foodSpace.users.map((user) => (
                                                        <option value={user.first_name}>
                                                            {toTitleCase(user.first_name)}
                                                        </option>
                                                    ))}

                                                    {/* Everyone */}
                                                    <option value={"everyone"}>
                                                        Everyone
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                    </SwiperSlide>

                                    <SwiperSlide className='text-left max-w-max  pb-5 px-1.5 flex '>
                                        <div onClick={(e) => handleEditSubmit(e, item)} className={`bg-green-600 cursor-pointer rounded-xl drop-shadow-lg flex flex-col justify-center items-center space-y-1 h-full w-[15vw] `}>
                                            <FaCheck className='text-white inline-block text-[2rem] ' />
                                            <span className='text-white text-sm'>Save</span>
                                        </div>

                                    </SwiperSlide>

                                </form>
                            </Swiper>


                            : <Swiper
                                initialSlide={1}
                                slidesPerView={"auto"}
                                className="w-full "
                            >

                                <SwiperSlide className='text-left max-w-max  pb-5 px-1.5 flex '>
                                    <div onClick={() => editStatus(item)} className={`bg-neutral-600 cursor-pointer rounded-xl drop-shadow-lg flex flex-col justify-center items-center space-y-1 h-full w-[15vw] `}>
                                        <FaEdit className='text-white inline-block text-[2rem] ' />
                                        <span className='text-white text-sm'>Edit</span>
                                    </div>
                                </SwiperSlide>

                                <SwiperSlide className='w-[80vw] pb-5 px-1.5 '>
                                    <div className='p-5 bg-white  rounded-xl drop-shadow-lg flex w-full justify-between items-center'>
                                        <div className='flex items-center space-x-3'>

                                            {/* Image */}
                                            <Avatar
                                                emoji={item.product.image}
                                                size="sm"
                                            />


                                            {/* Name */}
                                            <div className={`${item.owner ? 'border-r-2 pr-4' : ''}`}>
                                                <p className='text-secondary text-xs capitalize'>{item.product.brand}</p>
                                                <p className='text-main capitalize'>{item.product.name}</p>
                                                {/* Qty */}
                                                <p>{item.quantity} <span className='text-secondary'>{item.product.unit}</span></p>
                                            </div>

                                            {/* Owner */}
                                            {item.owner &&
                                                <div className='text-center ml-4'>
                                                    <span className='text-xs text-secondary mb-1 block'>Owner </span>
                                                    <Avatar
                                                        bg={item.owner.avatar.favoriteColor}
                                                        emoji={item.owner.avatar.emoji}
                                                        size="xs"
                                                    />
                                                    {/* First and Last Initial */}
                                                    <span className='text-xs text-secondary mb-1 block'>
                                                        {toTitleCase(item.owner.first_name)} {toTitleCase(item.owner.last_name[0])}.
                                                    </span>
                                                </div>
                                            }
                                        </div>

                                        {/* Expired */}
                                        <p>{item.expired ? "expired" : "Expires in 2 days"}</p>


                                    </div>
                                </SwiperSlide>

                                <SwiperSlide className='text-left max-w-max  pb-5 px-1.5 flex '>
                                    <div onClick={() => handleRemoveItem(item)} className={`bg-red-600 cursor-pointer rounded-xl drop-shadow-lg flex flex-col justify-center items-center space-y-1 h-full w-[15vw] `}>
                                        <FaTrashAlt className='text-white inline-block text-[2rem] ' />
                                        <span className='text-white text-sm'>Delete</span>
                                    </div>

                                </SwiperSlide>


                            </Swiper>
                        }

                    </div>
                ))}
            </div>
        </div >
    )
}

export default Admin