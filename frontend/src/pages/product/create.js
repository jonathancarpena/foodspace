import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Router
import { Link, useNavigate, useLocation } from 'react-router-dom'

// Redux
import { useSelector } from 'react-redux'

// Urls
import { API } from '../../lib/urls'

// Utils
import { toTitleCase, convertToMs } from '../../lib/utils'

// Constants
import { unitMeasure, emojiDictionary, shelfLife } from '../../lib/constants'

// Icons
import { BiArrowBack } from 'react-icons/bi'
import { MdDocumentScanner, MdCancel } from 'react-icons/md'
import { BsCameraFill, BsUpcScan } from 'react-icons/bs'
import { FaCheck, FaRegEdit, FaHashtag, FaCaretDown, FaCaretUp } from 'react-icons/fa'

// Components
import Button from '../../components/Button'
import Tooltip from '../../components/Tooltip'
import Modal from '../../components/Modal'
import Dropdown, { DropdownItem } from '../../components/Dropdown'
import BarcodeScannerComponent from "react-qr-barcode-scanner"
const ImageSearch = ({ setImage, setShowModal }) => {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const [userClick, setUserClick] = useState('')

    function handleSaveUserClick() {
        setImage(userClick)
        setShowModal(false)
    }

    // Shows Image Search Results
    useEffect(() => {
        if (search) {
            const searchResults = []

            Object.keys(emojiDictionary).forEach((key) => {
                if (key.includes(search)) {
                    searchResults.push({ key, emoji: emojiDictionary[key] })
                }
            })

            let uniqueResults = []
            searchResults.forEach((element) => {
                if (!uniqueResults.includes(element)) {
                    uniqueResults.push(element)
                }
            })

            if (searchResults.length === 0) {
                setResults(null)
            } else {
                setResults(uniqueResults)
            }
        }
        else {
            setResults(null)
        }
    }, [search])

    return (
        <div className='pb-10 w-[70vw] mx-auto '>

            <div className='flex justify-between items-center'>
                <div className='relative mt-8 mb-4 inline-block'>
                    <span className='absolute -top-4 left-1 text-secondary text-xs'>Search</span>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="E.g. Meat, Vegetable"
                        className='py-1 px-2 border-2 rounded-lg  focus:outline-none'
                    />
                </div>

                {userClick &&
                    <div className=''>
                        <span className='text-2xl border-b-2 border-b-primary-500 pb-1 mr-1'>{userClick}</span>
                        <FaCheck
                            onClick={handleSaveUserClick}
                            className='inline-block text-xl text-main ml-1 hover:text-primary-500'
                        />
                    </div>
                }

            </div>


            {search &&
                <div>
                    {results
                        ? <ul className='h-[300px] w-full flex flex-col overflow-y-scroll p-8 bg-neutral-200 rounded-xl'>
                            {results.map((item, idx) => (
                                <li
                                    key={item.emoji}
                                    onClick={() => setUserClick(item.emoji)}
                                    className={`${userClick === item.emoji ? "bg-neutral-400" : ""} py-2 text-3xl border-t-2 border-t-neutral-300 w-full flex items-center space-x-4 `}>
                                    <span>{item.emoji}</span>
                                    <span className='capitalize text-base'>{item.key}</span>
                                </li>
                            ))}
                        </ul>
                        : <p>No Results</p>

                    }
                </div>
            }

            {!search &&
                <div>
                    <ul className='w-full flex flex-col items-evenly  flex-wrap h-[300px] overflow-x-scroll p-8 bg-neutral-200 rounded-xl '>
                        {Object.keys(emojiDictionary).map((item, idx) => {
                            let uniqueEmoji = true

                            if (idx !== 0) {
                                let prevEmoji = emojiDictionary[Object.keys(emojiDictionary)[idx - 1]]
                                if (emojiDictionary[item] === prevEmoji) {
                                    uniqueEmoji = false
                                }
                            }

                            if (uniqueEmoji) {
                                return (
                                    <React.Fragment key={item}>
                                        <Tooltip message={item} size="sm">
                                            <li
                                                onClick={() => setUserClick(emojiDictionary[item])}
                                                className={`text-3xl mx-1 ${userClick === emojiDictionary[item] ? 'bg-neutral-400 p-2 rounded-full' : 'p-2'}`}>
                                                {emojiDictionary[item]}
                                            </li>
                                        </Tooltip>
                                    </React.Fragment>
                                )
                            }
                        })}
                    </ul>
                </div>
            }



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

// refrigerator: {
//     value: 1,
//     time: 'week'
// },
// freezer: {
//     value: 1,
//     time: 'year'
// },
// pantry: {
//     value: 1,
//     time: 'day'
// },
function Create() {
    const location = useLocation()
    const navigate = useNavigate()
    const { user, token } = useSelector(state => state.auth)
    const [products, setProducts] = useState([])
    const [brandSearch, setBrandSearch] = useState([])

    // Form
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [image, setImage] = useState('')
    const [barcode, setBarcode] = useState(null)
    const [errors, setErrors] = useState({ name: null, brand: null, image: null, lifeSpan: null })
    const [advancedOptions, setAdvancedOptions] = useState(false)
    const [refrigeratorInput, setRefrigeratorInput] = useState({ value: 0, time: { show: false, value: 'week' } })
    const [pantryInput, setPantryInput] = useState({ value: 0, time: { show: false, value: 'week' } })
    const [freezerInput, setFreezerInput] = useState({ value: 0, time: { show: false, value: 'week' } })

    const [type, setType] = useState({
        show: false,
        value: 'food'
    })
    const [category, setCategory] = useState({
        show: false,
        value: 'food'
    })

    // Modals
    const [showModal, setShowModal] = useState(false)
    const [scan, setScan] = useState(false);


    useEffect(() => {
        if (location.state) {
            if (location.state.name) {
                setName(location.state.name)
            }
        }
    }, [])


    // Gets ALl Products from Database
    useEffect(() => {
        async function fetchProductData() {
            const productDb = await axios.get(API.PRODUCT.base)
            if (productDb) {
                setProducts(productDb.data)
            }
        }
        fetchProductData()
    }, [])


    // Suggested Brands
    useEffect(() => {
        if (brand) {
            const results = []

            products.forEach((item) => {
                if (item.brand !== brand) {
                    if (item.brand.includes(brand)) {
                        results.push(item.brand)
                    }
                }

            })
            if (results.length === 0) {
                setBrandSearch(null)
            } else {
                let uniqueResults = []
                results.forEach((element) => {
                    if (!uniqueResults.includes(element)) {
                        uniqueResults.push(element)
                    }
                })

                setBrandSearch(uniqueResults)
            }
        }
        else if (brand === "") {
            setBrandSearch([])
        }



    }, [brand])


    async function handleSubmit(e) {
        e.preventDefault()
        const userConfirm = window.confirm("Are you sure everything is correct?")
        if (userConfirm) {

            // Validation
            let validErrors = errors
            if (name.length <= 1) {
                validErrors["name"] = "Please provide a valid name."
            } else {
                validErrors["name"] = null
            }
            if (brand.length <= 1) {
                validErrors["brand"] = "Please provide a valid brand."
            } else {
                validErrors["brand"] = null
            }
            if (!image) {
                validErrors["image"] = "Please provide an image."
            } else {
                validErrors["image"] = null
            }
            // if (!lifeSpan || parseInt(lifeSpan) === 0) {
            //     validErrors["lifeSpan"] = "Please provide a life span."
            // } else {
            //     validErrors["lifeSpan"] = null
            // }

            setErrors({ ...validErrors })
            const readyToSubmit = Object.values(validErrors).every((item) => item === null)
            if (readyToSubmit) {
                const product = {
                    name: name.toLowerCase(),
                    brand: brand.toLowerCase(),
                    type,
                    barcode: parseInt(barcode),



                    image: image ? image : emojiDictionary[type],
                    author: {
                        _id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        avatar: user.avatar
                    }
                }
                const res = await axios({
                    method: "POST",
                    url: `${API.PRODUCT.create}`,
                    data: { product },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (res) {
                    navigate('/')
                }
            }

        }


    }
    return (
        <div className='min-h-screen p-7 flex flex-col justify-center items-center '>

            {/* Back Button */}
            <Link to={`/foodSpace/`} state={location.state}>
                <span className=''>
                    <BiArrowBack className=' absolute left-6 inline-block text-[1rem] text-main mr-1 mb-1' />
                </span>
            </Link>


            <form onSubmit={handleSubmit} className="flex flex-col space-y-5 min-w-[350px] max-w-[350px] ">

                <h1 className='text-3xl font-semibold mx-auto tracking-tight'>Create a Product</h1>

                {/* Image */}
                <div onClick={() => {
                    if (!showModal) {
                        setShowModal(true)
                    }
                }} className={`cursor-pointer `}>
                    {image
                        ? <>
                            <div className='w-max bg-neutral-300 rounded-full ring-4 ring-white drop-shadow-lg mx-auto relative'>
                                <FaRegEdit className='absolute text-neutral-500 -right-6 text-xl' />
                                <span className='fill-white text-[40px] inline-block p-4' >{image}</span>
                            </div>
                        </>
                        : <>
                            <div className='w-max bg-neutral-300 rounded-full ring-4 ring-white drop-shadow-lg mx-auto'>
                                <BsCameraFill className='fill-white text-[80px] inline-block p-4' />
                            </div>
                            <span className='block text-center mt-2.5 text-secondary text-sm'>Add an Image</span>
                            {errors.image && <p className='text-xs text-red-600 font-normal text-center'>{errors.image}</p>}
                        </>
                    }

                    <Modal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        header="Add an Image"
                        content={<ImageSearch setImage={setImage} setShowModal={setShowModal} />}
                    />
                </div>


                {/* Name */}
                <div className='flex justify-center flex-col'>
                    <label htmlFor='name' className='font-semibold text-lg mr-2 block mb-1'>Name
                        {errors.name && <span className='inline-block text-xs text-red-600 font-normal ml-2'>{errors.name}</span>}
                    </label>

                    <div className='relative'>
                        <input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border-2 rounded-lg px-3 py-2 focus:outline-offset-1 focus:outline-sky-300 w-full"
                            placeholder='E.g. cereal'
                        />
                        {name &&
                            <MdCancel onClick={() => setName('')} className=' absolute right-3 top-[50%] -translate-y-[50%] inline-block  fill-neutral-400 hover:fill-neutral-500 text-lg cursor-pointer' />
                        }

                    </div>
                </div>



                {/* Brand */}
                <div className='relative flex justify-center flex-col'>
                    <label htmlFor='brand' className='font-semibold text-lg mr-2 block mb-1'>Brand
                        {errors.brand && <span className='inline-block text-xs text-red-600 font-normal ml-2'>{errors.brand}</span>}
                    </label>

                    <div className="relative">
                        <input
                            id="brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            className="border-2 rounded-lg px-3 py-2 focus:outline-offset-1 focus:outline-sky-300 w-full"
                            placeholder='E.g. generic'
                        />
                        {brand &&
                            <MdCancel onClick={() => setBrand('')} className=' absolute right-3 top-[50%] -translate-y-[50%] inline-block  fill-neutral-400 hover:fill-neutral-500 text-lg cursor-pointer' />
                        }

                    </div>

                    {brandSearch &&
                        <ul className={`${(brandSearch.length > 0) ? 'visible' : 'hidden'} absolute -bottom-[40px] w-full border-2 rounded-b-lg '`}>
                            {brandSearch.map((item) => (
                                <li
                                    key={item}
                                    className='capitalize cursor-pointer bg-white hover:bg-neutral-200 px-3 py-2'
                                    onClick={() => {
                                        setBrand(item)
                                        setBrandSearch([])
                                    }}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    }

                </div>


                {/* Type */}
                <div className=''>
                    <label htmlFor='type' className='font-semibold text-lg text-main mr-2'>
                        Type
                    </label>
                    <Dropdown
                        id="type"
                        select
                        sx={`w-max z-[50] p-1.5 bg-white relative top-[1.5px] ${type.show ? 'ring-[1.5px] ring-sky-300  border-2' : 'border-2 '} capitalize`}
                        direction="center"
                        button={
                            <div onClick={() => setType({ ...type, show: !type.show })} className="cursor-pointer text-center capitalize">
                                <span className='text-xl '>
                                    {type.value}
                                    {!type.show
                                        ? <FaCaretDown className="mb-1 ml-1 inline-block" />
                                        : <FaCaretUp className="mb-1 ml-1 inline-block" />
                                    }
                                </span>
                            </div>
                        }>
                        {["food", "liquid"].map((item) => (
                            <DropdownItem key={item} sx={`text-xl bg-white px-4 py-2 cursor-pointer hover:bg-neutral-200 z-50`} onClick={() => setType({ show: false, value: item })} >
                                {item}
                            </DropdownItem>
                        ))}
                    </Dropdown>
                </div>


                {/* Category */}
                <div className=''>
                    <label htmlFor='category' className='font-semibold text-lg text-main mr-2'>
                        Category
                    </label>
                    <Dropdown
                        select
                        listSx={`h-[200px] w-[300px] left-[-10px] overflow-y-scroll`}
                        sx={`w-max z-[40] p-1.5 bg-white relative top-[1.5px] ${category.show ? 'ring-[1.5px] ring-sky-300  border-2' : 'border-2 '}`}
                        direction="right"
                        button={
                            <div onClick={() => setCategory({ ...category, show: !category.show })} className="cursor-pointer text-center capitalize">
                                <span className='text-xl '>
                                    {category.value}
                                    {!category.show
                                        ? <FaCaretDown className="mb-1 ml-1 inline-block" />
                                        : <FaCaretUp className="mb-1 ml-1 inline-block" />
                                    }
                                </span>
                            </div>
                        }>
                        {Object.keys(shelfLife[type.value]).map((item) => (
                            <DropdownItem key={item} sx={`text-start text-xl bg-white px-4 py-2 cursor-pointer hover:bg-neutral-200 z-[40] capitalize`} onClick={() => setCategory({ show: false, value: item })} >
                                {item}
                            </DropdownItem>
                        ))}
                    </Dropdown>

                </div>


                {/* LifeSpan */}
                <div className='flex flex-col'>
                    <div>
                        {/* Label */}
                        <label htmlFor='lifeSpan' className='font-semibold text-lg text-main mr-2'>
                            LifeSpan
                        </label>

                        {/* Default Life Span Input */}
                        {!advancedOptions &&
                            <>
                                {/* Input */}
                                <div className='inline-block'>
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
                                        sx={`w-max z-[30] p-1.5 bg-white relative top-[1.5px] ${refrigeratorInput.time.show ? 'ring-[1.5px] ring-sky-300  border-y-2 border-r-2' : 'border-y-2 border-r-2'}`}
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
                                            <DropdownItem key={item} sx={`text-xl bg-white px-4 py-2 cursor-pointer hover:bg-neutral-200 z-[30]`} onClick={() => setRefrigeratorInput({ ...refrigeratorInput, time: { value: item, show: false } })} >
                                                {item}
                                            </DropdownItem>
                                        ))}
                                    </Dropdown>
                                    <span onClick={() => setAdvancedOptions(true)} className='text-xs underline text-primary-500 ml-3 cursor-pointer'>
                                        Advanced options
                                    </span>
                                </div>
                            </>
                        }

                        {/* All Life Span Inputs */}
                        {advancedOptions &&
                            <>
                                {/* Input */}
                                <div className='inline-block'>
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
                                        sx={`w-max z-[30] p-1.5 bg-white relative top-[1.5px] ${refrigeratorInput.time.show ? 'ring-[1.5px] ring-sky-300  border-y-2 border-r-2' : 'border-y-2 border-r-2'}`}
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
                                            <DropdownItem key={item} sx={`text-xl bg-white px-4 py-2 cursor-pointer hover:bg-neutral-200 z-[30]`} onClick={() => setRefrigeratorInput({ ...refrigeratorInput, time: { value: item, show: false } })} >
                                                {item}
                                            </DropdownItem>
                                        ))}
                                    </Dropdown>
                                    <span onClick={() => setAdvancedOptions(false)} className='text-xs underline text-primary-500 ml-3 cursor-pointer'>
                                        Hide options
                                    </span>
                                </div>
                            </>
                        }


                    </div>


                    {errors.lifeSpan && <p className='inline-block text-xs text-red-600 font-normal'>{errors.lifeSpan}</p>}

                </div>

                {/* Barcode */}
                <div className='w-full '>
                    <label htmlFor='barcode' className='font-semibold text-lg mr-2  mb-1 inline-block'>Barcode </label>
                    <div className='border-2 rounded-lg px-3 py-2 flex items-center justify-between w-full bg-white'>
                        <div>
                            <FaHashtag className='inline-block fill-secondary mr-2 mb-1' />
                            <span className='text-secondary'>{barcode ? barcode : '00000000'}</span>
                        </div>
                        {barcode
                            ? <MdCancel onClick={() => setBarcode(null)} className='inline-block  fill-neutral-400 hover:fill-neutral-500  text-lg cursor-pointer' />
                            : <MdDocumentScanner onClick={() => setScan(true)} className='inline-block  fill-neutral-500  text-xl cursor-pointer' />
                        }

                    </div>

                    <Modal
                        showModal={scan}
                        setShowModal={setScan}
                        header="Scan the Barcode"
                        content={<BarcodeScanModal setScan={setScan} setBarcode={setBarcode} />}
                    />

                </div>

                <Button type="submit" sx="w-full">
                    Submit
                </Button>

            </form >




        </div >
    )
}

export default Create