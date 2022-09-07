import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { refreshMe } from '../../redux/features/auth/authSlice'

// Router
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom'

// Urls
import { API } from '../../lib/urls'

// Constants
import { unitMeasure } from '../../lib/constants'

// Icons
import { BiArrowBack } from 'react-icons/bi'
import { IoMdBarcode } from 'react-icons/io'
import { ImCross } from 'react-icons/im'
import { MdMailOutline, MdPermIdentity, MdDocumentScanner, MdCancel } from 'react-icons/md'
import {
    FaPencilAlt,
    FaHashtag,
    FaFilter,
    FaRulerVertical,
    FaClock,
    FaRegEdit,
    FaCalendarTimes,
    FaCheck,
    FaRegTrashAlt,
    FaCaretDown,
    FaCaretUp
} from 'react-icons/fa'

// Components
import Dropdown, { DropdownItem } from '../../components/Dropdown'
import Avatar from '../../components/pages/Account/Avatar'

import Loading from '../../components/Layout/Loading'
import Error from '../../components/Layout/Error'


const LifeSpanInput = ({ refrigeratorInput, setRefrigeratorInput, pantryInput, setPantryInput, freezerInput, setFreezerInput }) => {
    return (
        <>
            {/* Freezer Input */}
            <div className='block'>
                <label className='mr-2'>Freezer</label>
                <input
                    id="lifeSpan"
                    type="number"
                    step={1}
                    min={0}
                    value={freezerInput.value}
                    onChange={(e) => setFreezerInput({ ...freezerInput, value: e.target.value })}
                    className="border-2 p-2 capitalize focus:outline-offset-1 focus:outline-sky-300 w-[60px]"
                />
                <Dropdown
                    select
                    sx={`w-max z-[15] p-1.5 bg-white relative top-[1.5px] ${freezerInput.time.show ? 'ring-[1.5px] ring-sky-300  border-y-2 border-r-2' : 'border-y-2 border-r-2'}`}
                    direction="center"
                    button={
                        <div onClick={() => setFreezerInput({ ...freezerInput, time: { ...freezerInput.time, show: true } })} className="cursor-pointer text-center">
                            <span className='text-xl '>
                                {freezerInput.time.value}
                                {!freezerInput.time.show
                                    ? <FaCaretDown className="mb-1 ml-1 inline-block" />
                                    : <FaCaretUp className="mb-1 ml-1 inline-block" />
                                }
                            </span>
                        </div>
                    }>
                    {['day', 'month', 'year', 'hour'].map((item) => (
                        <DropdownItem key={item} sx={`text-xl bg-white px-4 py-2 cursor-pointer hover:bg-neutral-200 z-[15]`} onClick={() => setFreezerInput({ ...freezerInput, time: { value: item, show: false } })} >
                            {item}
                        </DropdownItem>
                    ))}
                </Dropdown>
            </div>
            {/* Refrigerator Input */}
            <div className='block'>
                <label className='mr-2'>Refrigerator</label>
                <input
                    id="lifeSpan"
                    type="number"
                    step={1}
                    min={0}
                    value={refrigeratorInput.value}
                    onChange={(e) => setRefrigeratorInput({ ...refrigeratorInput, value: e.target.value })}
                    className="border-2 p-2 capitalize focus:outline-offset-1 focus:outline-sky-300 w-[60px]"
                />
                <Dropdown
                    select
                    sx={`w-max z-[10] p-1.5 bg-white relative top-[1.5px] ${refrigeratorInput.time.show ? 'ring-[1.5px] ring-sky-300  border-y-2 border-r-2' : 'border-y-2 border-r-2'}`}
                    direction="center"
                    button={
                        <div onClick={() => setRefrigeratorInput({ ...refrigeratorInput, time: { ...refrigeratorInput.time, show: true } })} className="cursor-pointer text-center">
                            <span className='text-xl '>
                                {refrigeratorInput.time.value}
                                {!refrigeratorInput.time.show
                                    ? <FaCaretDown className="mb-1 ml-1 inline-block" />
                                    : <FaCaretUp className="mb-1 ml-1 inline-block" />
                                }
                            </span>
                        </div>
                    }>
                    {['day', 'month', 'year', 'hour'].map((item) => (
                        <DropdownItem key={item} sx={`text-xl bg-white px-4 py-2 cursor-pointer hover:bg-neutral-200 z-[10]`} onClick={() => setRefrigeratorInput({ ...refrigeratorInput, time: { value: item, show: false } })} >
                            {item}
                        </DropdownItem>
                    ))}
                </Dropdown>
            </div>

            {/* Pantry Input */}
            <div className='block'>
                <label className='mr-2'>Pantry</label>
                <input
                    id="lifeSpan"
                    type="number"
                    step={1}
                    min={0}
                    value={pantryInput.value}
                    onChange={(e) => setPantryInput({ ...pantryInput, value: e.target.value })}
                    className="border-2 p-2 capitalize focus:outline-offset-1 focus:outline-sky-300 w-[60px]"
                />
                <Dropdown
                    select
                    sx={`w-max z-[5] p-1.5 bg-white relative top-[1.5px] ${pantryInput.time.show ? 'ring-[1.5px] ring-sky-300  border-y-2 border-r-2' : 'border-y-2 border-r-2'}`}
                    direction="center"
                    button={
                        <div onClick={() => setPantryInput({ ...pantryInput, time: { ...pantryInput.time, show: true } })} className="cursor-pointer text-center">
                            <span className='text-xl '>
                                {pantryInput.time.value}
                                {!pantryInput.time.show
                                    ? <FaCaretDown className="mb-1 ml-1 inline-block" />
                                    : <FaCaretUp className="mb-1 ml-1 inline-block" />
                                }
                            </span>
                        </div>
                    }>
                    {['day', 'month', 'year', 'hour'].map((item) => (
                        <DropdownItem key={item} sx={`text-xl bg-white px-4 py-2 cursor-pointer hover:bg-neutral-200 z-[5]`} onClick={() => setPantryInput({ ...pantryInput, time: { value: item, show: false } })} >
                            {item}
                        </DropdownItem>
                    ))}
                </Dropdown>
            </div>
        </>
    )
}

function ProductDetails() {
    // Router
    const { id } = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    // Redux
    const { user, token } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errors, setErrors] = useState(null)

    // Author's View
    const [author, setAuthor] = useState(null)
    const [editStatus, setEditStatus] = useState(false)
    const [name, setName] = useState(null)
    const [brand, setBrand] = useState(null)
    const [barcode, setBarcode] = useState(null)

    // Life Span
    const [refrigeratorInput, setRefrigeratorInput] = useState({ value: 0, time: { show: false, value: 'week' } })
    const [pantryInput, setPantryInput] = useState({ value: 0, time: { show: false, value: 'week' } })
    const [freezerInput, setFreezerInput] = useState({ value: 0, time: { show: false, value: 'week' } })

    // Grabbing Product
    useEffect(() => {
        setIsLoading(true)
        axios.get(`${API.PRODUCT.base}/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data)
                    console.log(res.data.author._id === user._id)
                    if (res.data.author._id === user._id) {
                        setAuthor(true)
                        setName(res.data.name)
                        setBrand(res.data.brand)
                        setRefrigeratorInput({ value: res.data.lifeSpan.refrigerator.value, time: { show: false, value: res.data.lifeSpan.refrigerator.time } })
                        setFreezerInput({ value: res.data.lifeSpan.freezer.value, time: { show: false, value: res.data.lifeSpan.freezer.time } })
                        setPantryInput({ value: res.data.lifeSpan.pantry.value, time: { show: false, value: res.data.lifeSpan.pantry.time } })
                        setBarcode(res.data.barcode)
                    }
                    setProduct(res.data)
                }

                setIsLoading(false)
            })
            .catch((err) => setErrors(err))
    }, [id, user._id])

    function generateDefaultLifeSpan() {
        let lifeSpan = {
            refrigerator: {
                value: parseInt(refrigeratorInput.value),
                time: refrigeratorInput.time.value
            },
            freezer: {
                value: parseInt(freezerInput.value),
                time: freezerInput.time.value
            },
            pantry: {
                value: parseInt(pantryInput.value),
                time: pantryInput.time.value
            }
        }

        return lifeSpan
    }

    async function handleSubmit(e, idx) {
        e.preventDefault()

        const userConfirm = window.confirm(`Are you sure you want to apply these changes to ${product.brand} ${product.name}`)

        if (userConfirm) {
            try {
                const lifeSpan = generateDefaultLifeSpan()
                const data = {
                    _id: product._id,
                    name: name,
                    barcode: barcode,
                    lifeSpan,
                }
                const res = await axios({
                    method: "PUT",
                    url: `${API.PRODUCT.update}`,
                    data: { data },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (res.status === 200) {
                    setProduct({ ...product, ...data })
                    setEditStatus(false)
                }

            } catch (error) {
                console.log(error)
                const { message } = error.response.data
                console.log(message)
            }
        }



    }

    async function handleRemoveItem() {
        const userConfirm = window.confirm(`Are you sure you want to remove ${product.brand} ${product.name} from your My Foods?`)
        if (userConfirm) {
            try {
                const res = await axios({
                    method: "DELETE",
                    url: `${API.PRODUCT.delete}`,
                    data: { item: product },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (res.status === 200) {
                    dispatch(refreshMe({ forceRefresh: true }))
                    navigate(location.state ? location.state.prevPath : '/product')
                }
            } catch (error) {
                const { message } = error.response.data
                console.log(message)
            }
        }
    }

    if (errors) return <Error />

    if (isLoading) return <Loading />

    return (
        <div className='relative min-h-screen bg-white overflow-visible mb-[4.2rem]'>


            <Link to={"/product"}>
                <span className='absolute top-6 left-6'>
                    <BiArrowBack className='inline-block text-[1rem] text-main mr-1 mb-1' />
                    All Products
                </span>
            </Link>




            {/* Image, Name, Brand */}
            <div className='flex flex-col items-center justify-center h-[40vh]'>

                {author &&
                    <div className='absolute top-6 right-6 flex items-center justify-evenly space-x-3 bg-white  px-4 py-2 rounded-xl'>
                        {editStatus
                            ? <>
                                <div onClick={() => setEditStatus(false)} className='text-center text-red-600 cursor-pointer'>
                                    <ImCross className='block mx-auto text-3xl' />
                                    <span className='text-xs'>Cancel</span>
                                </div>
                                <div onClick={handleSubmit} className='text-center text-green-700 cursor-pointer'>
                                    <FaCheck className='block mx-auto text-3xl' />
                                    <span className='text-xs'>Save</span>
                                </div>
                            </>
                            : <>
                                <div onClick={() => setEditStatus(!editStatus)} className='text-center text-neutral-700 cursor-pointer'>
                                    <FaRegEdit className='block mx-auto text-3xl' />
                                    <span className='text-xs'>Edit</span>
                                </div>
                                <div onClick={handleRemoveItem} className='text-center text-red-600 cursor-pointer'>
                                    <FaRegTrashAlt className='block mx-auto text-3xl' />
                                    <span className='text-xs'>Delete</span>
                                </div>
                            </>

                        }
                    </div>
                }


                {/* Product Image */}
                <Avatar
                    emoji={product.image}
                    bg={'bg-neutral-200'}
                    ring
                    size='xl'

                />


                {(editStatus && author)
                    ? <>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='text-3xl capitalize text-main font-semibold mt-3 text-center active:outline-none focus:outline-none '

                        />
                        <input
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            className='text-xl capitalize text-secondary text-center active:outline-none focus:outline-none'
                        />
                    </>
                    : <>
                        <h1 className='text-3xl capitalize text-main font-semibold mt-3 '>
                            {product.name}
                        </h1>
                        <h2 className='text-xl capitalize text-secondary'>
                            {product.brand}
                        </h2>

                    </>
                }
            </div>


            {/* Author, ID, Type, Date Added */}
            <div className='flex flex-col space-y-3 px-7 '>


                {/* Author */}
                <div className='border-y-2 flex flex-col text-xl'>
                    <p className='text-xl pt-3'>
                        <FaPencilAlt className='inline-block mr-2 mb-0.5' />
                        <span className='font-semibold'>Author: </span>
                    </p>

                    <div className='flex space-x-2 items-center ml-5 py-3'>
                        <Avatar
                            bg={product.author.avatar.favoriteColor}
                            emoji={product.author.avatar.emoji}
                        />
                        <div>
                            <p className='capitalize text-sm'>
                                <MdPermIdentity className='inline-block mr-1.5' />
                                {product.author.first_name} {product.author.last_name[0]}.
                            </p>

                            <p className='text-sm'>
                                <MdMailOutline className='inline-block mr-1.5' />
                                {product.author.email}
                            </p>
                        </div>
                    </div>
                </div>



                {/* Category */}
                <div className='border-b-2 flex flex-col text-xl'>
                    <div>
                        <FaFilter className='inline-block mr-2 mb-0.5' />
                        <span className='font-semibold'>Type: </span>
                    </div>

                    <p className='py-3 ml-7 capitalize'>
                        {product.type}
                    </p>



                </div>


                {/* Unit */}
                <div className='border-b-2 flex flex-col text-xl'>
                    <div>
                        <FaRulerVertical className='inline-block mr-2 mb-0.5' />
                        <span className='font-semibold'>Unit of Measure: </span>
                    </div>

                    <p className='py-3 ml-7 capitalize'>
                        {unitMeasure[product.type].map((item, idx) => <span key={item}>{item}{`${idx === unitMeasure[product.type].length - 1 ? '' : ', '}`}</span>)}
                    </p>

                </div>

                {/* LifeSpan */}
                <div className='border-b-2 flex flex-col text-xl'>
                    <div>
                        <FaCalendarTimes className='inline-block mr-2 mb-0.5' />
                        <span className='font-semibold'>LifeSpan: </span>
                    </div>
                    {(editStatus && author)
                        ? <div className='py-3 ml-7 capitalize'>
                            <LifeSpanInput
                                refrigeratorInput={refrigeratorInput}
                                setRefrigeratorInput={setRefrigeratorInput}
                                pantryInput={pantryInput}
                                setPantryInput={setPantryInput}
                                freezerInput={freezerInput}
                                setFreezerInput={setFreezerInput}
                            />
                        </div>
                        : <div className='py-3 ml-7  text-base'>
                            <p>Freezer:
                                <span className='ml-1 mr-1'>{product.lifeSpan.freezer.value
                                    ? `${product.lifeSpan.freezer.value} ${product.lifeSpan.freezer.time ? product.lifeSpan.freezer.time : ''}${product.lifeSpan.freezer.value > 1 ? 's' : ''}`
                                    : "Not Recommended"}
                                </span>
                            </p>
                            <p>Refrigerator:
                                <span className='ml-1 mr-1'>{product.lifeSpan.refrigerator.value
                                    ? `${product.lifeSpan.refrigerator.value} ${product.lifeSpan.refrigerator.time ? product.lifeSpan.refrigerator.time : ''}${product.lifeSpan.refrigerator.value > 1 ? 's' : ''}`
                                    : "Not Recommended"}
                                </span>
                            </p>
                            <p>Pantry:
                                <span className='ml-1 mr-1'>{product.lifeSpan.pantry.value
                                    ? `${product.lifeSpan.pantry.value} ${product.lifeSpan.pantry.time ? product.lifeSpan.pantry.time : ''}${product.lifeSpan.pantry.value > 1 ? 's' : ''}`
                                    : "Not Recommended"}
                                </span>
                            </p>

                        </div>
                    }
                </div>

                {/* Barcode */}
                <div className='border-b-2 flex flex-col text-xl'>
                    <div>
                        <IoMdBarcode className='inline-block mr-2 mb-0.5' />
                        <span className='font-semibold'>Barcode: </span>
                    </div>
                    {(editStatus && author)
                        ? <div className='py-3 ml-7  flex items-center   bg-white '>


                            <span className='text-secondary mr-7'>{barcode ? barcode : '00000000'}</span>
                            {barcode
                                ? <MdCancel onClick={() => setBarcode(null)} className='inline-block  fill-neutral-400 hover:fill-neutral-500  text-lg cursor-pointer ' />
                                : <MdDocumentScanner onClick={() => alert('Feature not supported yet.')} className='inline-block  fill-neutral-500  text-xl cursor-pointer ' />
                            }


                        </div>
                        : <p className='py-3 ml-7 capitalize'>
                            {product.barcode ? product.barcode : "None"}
                        </p>
                    }

                </div>

                {/* ID */}
                <div className='border-b-2 flex flex-col text-xl'>
                    <div>
                        <FaHashtag className='inline-block mr-2 mb-0.5' />
                        <span className='font-semibold '>Product ID: </span>
                    </div>

                    <p className='py-3 ml-7'>
                        {product._id}
                    </p>
                </div>

                {/* Date Added */}
                <div className='border-b-2 flex flex-col text-xl'>
                    <div>
                        <FaClock className='inline-block mr-2 mb-0.5' />
                        <span className='font-semibold'>Date Added: </span>
                    </div>
                    <p className='py-3 ml-7 capitalize'>
                        {product.createdAt}
                    </p>
                </div>

            </div>



        </div>
    )
}

export default ProductDetails