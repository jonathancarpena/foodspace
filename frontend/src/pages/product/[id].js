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
    FaRegTrashAlt
} from 'react-icons/fa'

// Components
import Avatar from '../../components/pages/Account/Avatar'
import Modal from '../../components/Modal'
import BarcodeScannerComponent from "react-qr-barcode-scanner"
const LoadingContainer = () => {
    return (
        <div className=" rounded-md p-4 bg-white ">
            <div className="animate-pulse flex flex-col space-y-4">

                <div className="h-4 w-[150px] bg-neutral-300 rounded"></div>

                {/* Lines */}
                <div className="flex-1 space-y-3 py-1">
                    <div className="h-2 bg-neutral-300 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-2 bg-neutral-300 rounded col-span-2"></div>
                            <div className="h-2 bg-neutral-300 rounded col-span-1"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const BarcodeScanModal = ({ setScan, setBarcode }) => {
    const barcodeScannerComponentHandleUpdate = (error, result) => {
        if (result) {
            setBarcode(result.text);
            window.navigator.vibrate(100);
            setScan(false);
        }
    };
    return (
        <div className='h-[350px] relative '>
            <div className="w-[80%] h-12 mx-auto mt-7 ">
                <BarcodeScannerComponent
                    onUpdate={barcodeScannerComponentHandleUpdate}
                />
            </div>

        </div>

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
    const [type, setType] = useState(null)
    const [lifeSpan, setLifeSpan] = useState(null)
    const [time, setTime] = useState(null)
    const [barcode, setBarcode] = useState(null)
    const [scan, setScan] = useState(false)

    // Grabbing Product
    useEffect(() => {
        setIsLoading(true)
        axios.get(`${API.PRODUCT.base}/${id}`)
            .then((res) => {
                if (res.status == 200) {
                    console.log(res.data)
                    console.log(res.data.author._id === user._id)
                    if (res.data.author._id === user._id) {
                        setAuthor(true)
                        setName(res.data.name)
                        setBrand(res.data.brand)
                        setType(res.data.type)
                        setLifeSpan(res.data.lifeSpan.value)
                        setTime(res.data.lifeSpan.time)
                        setBarcode(res.data.barcode)
                    }
                    setProduct(res.data)
                }

                setIsLoading(false)
            })
            .catch((err) => setErrors(err))
    }, [])



    async function handleSubmit(e, idx) {
        e.preventDefault()

        const userConfirm = window.confirm(`Are you sure you want to apply these changes to ${product.brand} ${product.name}`)

        if (userConfirm) {
            try {
                const data = {
                    _id: product._id,
                    name: name,
                    type: type,
                    barcode: barcode,
                    lifeSpan: {
                        value: lifeSpan,
                        time: time
                    },
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
                    dispatch(refreshMe())
                    navigate(location.state ? location.state.prevPath : '/product')
                }
            } catch (error) {
                const { message } = error.response.data
                console.log(message)
            }
        }
    }

    if (errors) {
        return <h1>Error...</h1>
    }


    return (
        <div className='min-h-screen bg-white overflow-visible mb-[4.2rem]'>

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



            {/* Image, Name, Brand */}
            <div className='flex flex-col items-center justify-center h-[40vh]'>
                {isLoading
                    ?
                    <div className="animate-pulse flex flex-col space-y-2">
                        {/* Circle */}
                        <div className="rounded-full bg-neutral-200 w-[135px] h-[135px]"></div>

                        {/* Lines */}
                        <div className="flex-1 space-y-3 py-1">
                            <div className="h-5 bg-neutral-300 rounded"></div>
                            <div className="h-2 bg-neutral-300 rounded "></div>
                        </div>
                    </div>

                    : <>

                        {author &&
                            <div className='fixed top-6 right-6 flex items-center justify-evenly space-x-3 bg-white  px-4 py-2 rounded-xl'>
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

                    </>
                }
            </div>


            {/* Author, ID, Type, Date Added */}
            <div className='flex flex-col space-y-3 px-7 '>

                {isLoading
                    ? <>
                        <LoadingContainer />
                        <LoadingContainer />
                        <LoadingContainer />
                        <LoadingContainer />
                        <LoadingContainer />
                        <LoadingContainer />
                    </>
                    : <>
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
                                    <p className='capitalize'>
                                        <MdPermIdentity className='inline-block mr-1.5' />
                                        {product.author.first_name} {product.author.last_name[0]}.
                                    </p>

                                    <p>
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
                                <span className='font-semibold'>Category: </span>
                            </div>

                            {(editStatus && author)
                                ? <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className='py-3 ml-7 capitalize active:outline-none focus:outline-none w-max'>
                                    <option value={'food'}>
                                        food
                                    </option>
                                    <option value={'liquid'}>
                                        liquid
                                    </option>
                                </select>
                                : <p className='py-3 ml-7 capitalize'>
                                    {product.type}
                                </p>
                            }


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
                                ? <div>
                                    <input
                                        value={lifeSpan}
                                        type="number"
                                        onChange={(e) => setLifeSpan(e.target.value)}
                                        className='py-3 ml-7 capitalize active:outline-none focus:outline-none w-[45px] inline-block' />
                                    <select
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        className='inline-block py-3 capitalize active:outline-none focus:outline-none w-max'
                                    >
                                        <option value={'year'}>years</option>
                                        <option value={'month'}>months</option>
                                        <option value={'day'}>days</option>
                                        <option value={'hour'}>hours</option>
                                    </select>
                                </div>
                                : <p className='py-3 ml-7 capitalize'>
                                    {product.lifeSpan.value}  {product.lifeSpan.time}s
                                </p>
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
                                        : <MdDocumentScanner onClick={() => setScan(true)} className='inline-block  fill-neutral-500  text-xl cursor-pointer ' />
                                    }


                                    <Modal
                                        showModal={scan}
                                        setShowModal={setScan}
                                        header="Scan the Barcode"
                                        content={<BarcodeScanModal setScan={setScan} setBarcode={setBarcode} />}
                                    />

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


                    </>
                }







            </div>



        </div>
    )
}

export default ProductDetails