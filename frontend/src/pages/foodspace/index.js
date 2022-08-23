import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

// Redux
import { useSelector } from 'react-redux'

// Router
import { Link, useLocation, useNavigate } from 'react-router-dom'

// Urls
import { API } from '../../lib/urls'

// Components
import UsersModal from '../../components/pages/FoodSpace/UsersModal'
import Button from '../../components/Button'
import Avatar from '../../components/pages/Account/Avatar'
import Dropdown, { DropdownItem } from '../../components/Dropdown'
import Loading from '../../components/Layout/Loading'
import Error from '../../components/Layout/Error'


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// Icons
import { FaTrashAlt, FaCog, FaRing } from 'react-icons/fa'
import { BiFridge } from 'react-icons/bi'
import { ImSpoonKnife } from 'react-icons/im'
import { MdPeopleAlt, MdPerson } from 'react-icons/md'
import { FiList, FiGrid } from 'react-icons/fi'

// Utils
import { toTitleCase } from '../../lib/utils'


function FoodSpace() {
    const location = useLocation()
    const navigate = useNavigate()
    const [foodSpace, setFoodSpace] = useState(null)
    const [stock, setStock] = useState(null)
    const [my_swiper, set_my_swiper] = useState({});
    const { user, token } = useSelector(state => state.auth)
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [area, setArea] = useState("all")
    const [showModal, setShowModal] = useState(false)
    const [adminView, setAdminView] = useState(false)
    const [stockView, setStockView] = useState('list')


    useEffect(() => {

        if (location.state) {
            setError(false)
            setIsLoading(true)
            axios({
                method: "GET",
                url: `${API.ADMIN.base}/${location.state.foodSpace_id || location.state.foodSpace._id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                if (res.status === 200) {
                    setFoodSpace(res.data.foodSpace)
                    setStock([...res.data.foodSpace.stock, ...res.data.foodSpace.expiredStock])
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
        } else {
            setError(true)
        }

    }, [location.state, token, user._id])

    async function handleRemoveItem(item) {
        const userConfirm = window.confirm(`Would you like to remove ${toTitleCase(item.product.brand)} ${toTitleCase(item.product.name)}?`)

        if (userConfirm) {
            try {
                const res = await axios({
                    method: "DELETE",
                    url: `${API.FOODSPACE.removeItem}`,
                    data: {
                        expired: item.expired,
                        item_id: item._id,
                        foodSpace_id: foodSpace._id
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (res.status === 200) {
                    const filteredStock = stock.filter((stock) => stock !== item)
                    setStock([...filteredStock])
                }

            } catch (error) {
                const { message } = error.response.data
                setError(message)
            }
        }

    }

    function areaSpecific() {
        if (area === "all") {
            return stock
        } else {
            return stock.filter((item) => item.area === area)
        }
    }

    function stockNumber(item) {
        return stock.findIndex((stock) => stock._id === item._id)
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
                setError(message)
            }
        }
    }


    function generateExpirationSoon(item) {
        const today = moment()
        const type = foodSpace.type
        const qty = item.product.lifeSpan[type].value
        if (qty === null) {
            return null
        } else {
            const time = item.product.lifeSpan[type].time
            const expDate = moment(item.purchasedDate).add(qty, time)
            const diff = expDate.diff(today, 'days')
            const message = moment.duration(diff, "days").humanize(true)
            return message
        }

    }


    if (isLoading) {
        return <Loading />
    }

    if (!foodSpace || error) {
        return <Error />

    }
    return (
        <div className='min-h-screen mb-[6rem]'>

            <UsersModal showModal={showModal} setShowModal={setShowModal} foodSpace={foodSpace} />

            {/* Header */}
            <div className='p-7 border-b-2'>

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
                            <DropdownItem onClick={() => navigate(`/foodSpace/admin/${foodSpace.name}/manage`, { state: { prevPath: location.pathname, foodSpace } })} >
                                Manage FoodSpace
                            </DropdownItem>
                            <DropdownItem onClick={handleDeleteFoodSpace}>
                                Delete FoodSpace
                            </DropdownItem>
                        </Dropdown >
                    }


                </div >

                {/* Add Button */}
                < div className='flex justify-between' >
                    <Button onClick={() => navigate(`/foodSpace/add-item`, { state: { prevPath: location.pathname, foodSpace } })} sx={'w-[50%]'}>
                        Add Item
                    </Button>

                    {foodSpace.expiredStock.length > 0 && <p className='text-sm'>{foodSpace.expiredStock.length} expired item(s)</p>}

                </div >

            </div >


            {/* Areas */}
            < Swiper
                onInit={(ev) => {
                    set_my_swiper(ev)
                }
                }
                spaceBetween={5}
                slidesPerView={3}
                onSlideChange={(swiper) => setArea(foodSpace.areas[swiper.activeIndex])
                }
            >
                {/* DEFAULT: ALL */}
                < SwiperSlide className='text-center my-5' >
                    <span
                        onClick={() => {
                            my_swiper.slideTo(0);
                            setArea("all")
                        }}
                        className={`${"all" === area ? 'text-main border-b-2 border-b-primary-500 ' : 'text-secondary'}   select-none font-semibold capitalize cursor-pointer `}>
                        All
                    </span>
                </SwiperSlide >

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
                ))
                }
            </Swiper >


            {/* Stock */}
            < div className='mx-5' >

                {/* Stock Length, Grid or List Buttons */}
                < div className='p-2 flex justify-between items-center' >
                    {(areaSpecific().length > 0) &&
                        <>
                            {/* Stock Length */}
                            <span className=''>
                                {areaSpecific().length} item{areaSpecific().length === 1 ? '' : 's'}
                            </span>

                            {/* Grid View */}
                            <div className='rounded-lg border-2 overflow-hidden'>
                                <button className={`p-2 border-r-2 ${stockView === 'grid' ? 'bg-primary-200' : 'bg-white text-secondary'}`} onClick={() => setStockView('grid')}>
                                    <FiGrid className='inline-block text-lg ' />
                                </button>
                                <button className={`p-2 ${stockView === 'list' ? 'bg-primary-200' : 'bg-white text-secondary'}`} onClick={() => setStockView('list')}>
                                    <FiList className='inline-block text-lg' />
                                </button>
                            </div>
                        </>
                    }
                </div >

                {(areaSpecific().length > 0) &&
                    // List View
                    <>
                        {stockView === "list" && (
                            <div className='flex flex-col space-y-3'>
                                {areaSpecific().map((item, idx) => (
                                    <Swiper
                                        key={`list-${item._id}-${idx}`}
                                        initialSlide={0}
                                        slidesPerView={"auto"}
                                        className=" w-full drop-shadow-lg min-h-full "
                                    >
                                        <SwiperSlide className={`w-[80vw]  px-1.5 cursor-pointer`}>
                                            <Link
                                                to={`/foodSpace/${foodSpace.name}/item/${stockNumber(item) + 1}`}
                                                state={{
                                                    prevPath: location.pathname,
                                                    product: item,
                                                    foodSpace
                                                }}>
                                                <span className='text-xs absolute top-2 left-4 text-secondary'>#{stockNumber(item) + 1}</span>

                                                <div className={`${item.expired ? 'border-4 border-red-500 bg-white' : 'bg-white'}  py-5 px-3 rounded-xl flex w-full justify-between items-center`}>
                                                    <div className='flex items-center space-x-3'>

                                                        {/* Image */}
                                                        <Avatar
                                                            emoji={item.product.image}
                                                            size="sm"
                                                        />

                                                        {/* Name */}
                                                        <div className={``}>
                                                            <p className='text-secondary text-xs capitalize'>{item.product.brand}</p>
                                                            <p className='text-main capitalize'>{item.product.name}</p>
                                                            {/* Qty */}
                                                            <p>{item.quantity} <span className='text-secondary'>{item.unit}</span></p>
                                                        </div>

                                                        {/* Owner */}
                                                        {item.owner &&
                                                            <div className='text-center ml-4 border-l-2 pl-4'>
                                                                <span className='text-xs text-secondary mb-1 block'><MdPerson className='inline-block mb-0.5 mr-0.5' /></span>
                                                                {/* First and Last Initial */}
                                                                <span className='text-xs text-secondary mb-1 block'>
                                                                    {toTitleCase(item.owner.first_name)} {toTitleCase(item.owner.last_name[0])}.
                                                                </span>
                                                            </div>
                                                        }
                                                    </div>

                                                    {/* Expired */}
                                                    <div className='text-center text-xs'>
                                                        {generateExpirationSoon(item) === null
                                                            ? <>
                                                                <p className='text-xs'>Not Recommended</p>
                                                                <p className='text-xs'>in FoodSpace</p>
                                                            </>
                                                            : <>
                                                                <p>{item.expired ? 'Expired' : 'Expires'}</p>
                                                                <p>{generateExpirationSoon(item)}</p>
                                                            </>
                                                        }

                                                    </div>

                                                </div>
                                            </Link>
                                        </SwiperSlide>

                                        <SwiperSlide className='max-w-max '>
                                            <div onClick={() => handleRemoveItem(item)} className={`bg-red-500 cursor-pointer flex flex-col justify-center items-center rounded-xl  space-y-1 h-[105px] w-[15vw] `}>
                                                <FaTrashAlt className='text-white inline-block text-[2rem] ' />
                                                <span className='text-white text-sm'>Delete</span>
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>

                                ))}
                            </div>
                        )}

                        {/* Grid View */}
                        {stockView === "grid" && (
                            <div className='grid grid-cols-2 gap-2 px-1.5'>
                                {areaSpecific().map((item, idx) => (
                                    <Swiper
                                        key={`grid-${item._id}-${idx}`}
                                        initialSlide={0}
                                        slidesPerView={1}
                                        className="overflow-hidden w-full drop-shadow-lg truncate"
                                    >
                                        <SwiperSlide className='w-full cursor-pointer '>
                                            <Link
                                                to={`/foodSpace/${foodSpace.name}/item/${stockNumber(item) + 1}`}
                                                state={{
                                                    prevPath: location.pathname,
                                                    foodSpace
                                                }}>
                                                <div className={`${item.expired ? 'border-4 border-red-500' : ''} p-5 bg-white  rounded-xl  flex justify-between items-center w-full`}>
                                                    <span className='text-xs absolute top-4 right-4 text-secondary'>#{stockNumber(item) + 1}</span>

                                                    <div className='flex items-center space-x-3 '>
                                                        {/* Name */}
                                                        <div >
                                                            <p className='text-secondary text-xs capitalize'>{item.product.brand}</p>
                                                            <p className='text-main capitalize '>
                                                                {item.product.name.length > 14
                                                                    ? `${item.product.name.substring(0, 14)}...`
                                                                    : `${item.product.name}`
                                                                }
                                                            </p>
                                                            {/* Qty */}
                                                            <p>{item.quantity} <span className='text-secondary'>{item.unit}</span></p>
                                                        </div>
                                                    </div>


                                                </div>
                                            </Link>
                                        </SwiperSlide>

                                        <SwiperSlide>
                                            <div onClick={() => handleRemoveItem(item)} className={`bg-red-500 cursor-pointer rounded-xl flex flex-col justify-center items-center space-y-1 h-full mx-auto w-[95%] `}>
                                                <FaTrashAlt className='text-white inline-block text-[2rem] ' />
                                                <span className='text-white text-sm'>Delete</span>
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>

                                ))}
                            </div>
                        )}

                    </>

                }

                {/* No Items */}
                {(areaSpecific().length === 0) &&
                    <div className='flex justify-center items-center h-[30vh] '>
                        <h1 className='text-secondary text-2xl'>
                            Empty Space
                            <FaRing className='inline-block mb-1 ml-3' />
                            <ImSpoonKnife className='inline-block mb-1 ml-1' />
                        </h1>
                    </div>
                }


            </div >
        </div >
    )
}

export default FoodSpace