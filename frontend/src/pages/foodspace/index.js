import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Redux
import { useSelector } from 'react-redux'

// Router
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

// Urls
import { API } from '../../lib/urls'

// Components
import UsersModal from '../../components/pages/FoodSpace/UsersModal'
import Tooltip from '../../components/Tooltip'
import Button from '../../components/Button'
import Avatar from '../../components/pages/Account/Avatar'
import Dropdown, { DropdownItem } from '../../components/Dropdown'


// Import Swiper React components
import { Swiper, SwiperSlide, useSwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// Icons
import { FaTrashAlt, FaEdit, FaCheck, FaCrown, FaCog, FaRing } from 'react-icons/fa'
import { BiFridge } from 'react-icons/bi'
import { ImCross, ImSpoonKnife } from 'react-icons/im'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { MdPeopleAlt } from 'react-icons/md'

// Utils
import { toTitleCase } from '../../lib/utils'


function Admin() {
    const location = useLocation()
    const navigate = useNavigate()
    const [foodSpace, setFoodSpace] = useState(null)
    const [my_swiper, set_my_swiper] = useState({});
    const { user, token } = useSelector(state => state.auth)
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [area, setArea] = useState("all")
    const [showModal, setShowModal] = useState(false)
    const [adminView, setAdminView] = useState(false)


    useEffect(() => {
        setError(false)
        setIsLoading(true)
        axios({
            method: "GET",
            url: `${API.ADMIN.base}/${location.state.foodSpace._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.status === 200) {
                setFoodSpace(res.data.foodSpace)
                if (res.data.foodSpace.admin._id === user._id) {
                    setAdminView(true)
                }
            }
            setIsLoading(false)
        }).catch((err) => {
            console.log(err)
            const { message } = err.response.data
            setError(message)
            setIsLoading(false)
        })
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
                        foodSpace_id: foodSpace._id
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
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

    function areaSpecific() {
        if (area === "all") {
            return foodSpace.stock
        } else {
            return foodSpace.stock.filter((item) => item.area === area)
        }
    }

    function stockNumber(item) {
        return foodSpace.stock.findIndex((stock) => stock._id === item._id)
    }

    async function handleDeleteFoodSpace() {
        const userConfirm = window.confirm(`Are you sure you want to delete ${foodSpace.name}?`)
        if (userConfirm) {
            try {
                const res = await axios({
                    method: "DELETE",
                    url: `${API.ADMIN.delete}`,
                    data: {
                        foodSpace_id: foodSpace._id
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (res) {
                    navigate('/')
                }

            } catch (error) {
                const { message } = error.response.data
            }
        }
    }



    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!foodSpace || error) {
        return <div> {error} </div>

    }
    return (
        <div className='min-h-screen mb-[4.2rem]'>

            <UsersModal showModal={showModal} setShowModal={setShowModal} foodSpace={foodSpace} />

            {/* Header */}
            <div className='border-b-2 p-7'>

                <div className='pb-5 flex justify-between items-center'>
                    {/* FoodSpace Name, Users Modal */}
                    <div>
                        <BiFridge className='inline-block text-5xl mb-1 mr-2' />
                        <h1 className='inline-block capitalize font-semibold text-3xl tracking-tight border-r-2 pr-3'>{foodSpace.name}</h1>
                        <span onClick={() => setShowModal(true)} className='ml-3 text-secondary cursor-pointer'>{foodSpace.users.length + 1} <MdPeopleAlt className='inline-block mb-1 text-lg' /></span>
                    </div>

                    {/* Admin Settings */}
                    {adminView &&
                        <Dropdown sx={'z-[50]'} button={<FaCog className='text-secondary text-2xl hover:text-neutral-600 cursor-pointer' />}>
                            <DropdownItem onClick={() => navigate(`/foodSpace/admin/${foodSpace.name}/add-user`, { state: { prevPath: location.pathname, foodSpace } })} >
                                Add User
                            </DropdownItem>
                            <DropdownItem onClick={() => navigate(`/foodSpace/admin/${foodSpace.name}/add-area`, { state: { prevPath: location.pathname, foodSpace } })} >
                                Add Area
                            </DropdownItem>
                            <DropdownItem onClick={() => navigate(`/foodSpace/admin/${foodSpace.name}/manage`, { state: { prevPath: location.pathname, foodSpace } })} >
                                Manage FoodSpace
                            </DropdownItem>
                            <DropdownItem onClick={handleDeleteFoodSpace}>
                                Delete FoodSpace
                            </DropdownItem>
                        </Dropdown>
                    }


                </div>

                {/* Add Button */}
                <div className='flex justify-between'>
                    <Button onClick={() => navigate(`/foodSpace/add-item`, { state: { prevPath: location.pathname, foodSpace } })} sx={'w-[50%]'}>
                        Add Item
                    </Button>

                    <div>
                        <p>{foodSpace.stock.length} items</p>
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
                    <SwiperSlide key={item} className='text-center my-5'>
                        <span
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
            <div className='mx-5'>
                {areaSpecific().length > 0
                    ? areaSpecific().map((item, idx) => (
                        <div key={`${idx}-${idx}`} className="flex space-x-3">
                            <Swiper
                                initialSlide={0}
                                slidesPerView={"auto"}
                                className="w-full "
                            >
                                <SwiperSlide className='w-[80vw] pb-5 px-1.5 cursor-pointer'>
                                    <Link
                                        to={`/foodSpace/${foodSpace.name}/item/${stockNumber(item) + 1}`}
                                        state={{
                                            prevPath: location.pathname,
                                            foodSpace
                                        }}>
                                        <div className='p-5 bg-white  rounded-xl drop-shadow-lg flex w-full justify-between items-center'>
                                            <div className='flex items-center space-x-3'>

                                                <span className='text-xs absolute top-4 left-4 text-secondary'>#{stockNumber(item) + 1}</span>
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
                                    </Link>
                                </SwiperSlide>

                                <SwiperSlide className='text-left max-w-max  pb-5 px-1.5 flex '>
                                    <div onClick={() => handleRemoveItem(item)} className={`bg-red-600 cursor-pointer rounded-xl drop-shadow-lg flex flex-col justify-center items-center space-y-1 h-full w-[15vw] `}>
                                        <FaTrashAlt className='text-white inline-block text-[2rem] ' />
                                        <span className='text-white text-sm'>Delete</span>
                                    </div>

                                </SwiperSlide>


                            </Swiper>


                        </div>
                    ))
                    : <div className='flex justify-center items-center h-[30vh] '>
                        <h1 className='text-secondary text-2xl'>
                            Empty Space
                            <FaRing className='inline-block mb-1 ml-3' />
                            <ImSpoonKnife className='inline-block mb-1 ml-1' />
                        </h1>
                    </div>
                }

            </div>
        </div >
    )
}

export default Admin