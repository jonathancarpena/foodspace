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
import { unitMeasure, emojiDictionary } from '../../lib/constants'

// Components
import BarcodeScannerComponent from "react-qr-barcode-scanner";

// Icons
import { BiArrowBack } from 'react-icons/bi'
import { BsCameraFill } from 'react-icons/bs'


function Create() {
    const [scan, setScan] = useState(false);
    const [logs, setLog] = useState([]);
    const barcodeScannerComponentHandleUpdate = (error, result) => {

        if (result) {
            setLog([...logs, result.text]);
            window.navigator.vibrate(100);
            setScan(false);
        }
    };


    const navigate = useNavigate()
    const { user, token } = useSelector(state => state.auth)
    const location = useLocation()
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [type, setType] = useState('food')
    const [image, setImage] = useState('')
    const [imageSearch, setImageSearch] = useState([])
    const [unit, setUnit] = useState(unitMeasure[type][0])
    const [lifeSpan, setLifeSpan] = useState('')
    const [time, setTime] = useState('day')
    const [barcode, setBarcode] = useState(null)

    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])


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




    // Shows Image Search Results
    useEffect(() => {
        if (image) {
            const results = []

            Object.keys(emojiDictionary).forEach((key) => {
                if (key.includes(image)) {
                    results.push({ key, emoji: emojiDictionary[key] })
                }
            })
            if (results.length === 0) {
                setImageSearch(null)
            } else {
                setImageSearch(results)
            }
        }
        else {
            setImageSearch([])
        }
    }, [image])

    function handleImageSearchClick(emoji) {
        setImage(emoji)
        setImageSearch([])
    }


    async function handleSubmit(e) {
        e.preventDefault()
        const product = {
            name,
            brand,
            type,
            unit,
            barcode,
            lifeSpan: {
                value: lifeSpan,
                time: time,
            },
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
    return (
        <div className='min-h-screen p-7 flex flex-col justify-center items-center'>

            {location.state.prevPath === '/product' &&
                <Link to="/product">
                    <span className='fixed top-6 left-6'>
                        <BiArrowBack className='inline-block text-[1rem] text-main mr-1 mb-1' />
                        All Products
                    </span>
                </Link>
            }

            {location.state.prevPath === '/account' &&
                <Link to="/">
                    <span className='fixed top-6 left-6'>
                        <BiArrowBack className='inline-block text-[1rem] text-main mr-1 mb-1' />
                        Home
                    </span>
                </Link>
            }


            <div className="flex flex-col space-y-5">
                <h1 className='text-3xl font-semibold mx-auto'>Create a Product</h1>
                <form onSubmit={handleSubmit} >

                    <div>

                        <div className='w-max bg-neutral-300 rounded-full ring-4 ring-white drop-shadow-lg mx-auto'>
                            <BsCameraFill className='fill-white text-[70px] inline-block p-5' />
                        </div>


                        {/* Image */}
                        <label htmlFor='image'>Image
                            <input
                                id="image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className="border-2"
                            />
                        </label>

                        {imageSearch
                            && <ul>
                                {imageSearch.map((item, idx) => (
                                    <div key={`${item}-${idx}`} onClick={() => handleImageSearchClick(item.emoji)} className="cursor-pointer">
                                        <span className="bg-neutral-200">
                                            {item.emoji} {item.key}
                                        </span>
                                    </div>
                                ))}
                            </ul>
                        }
                    </div>
                    {/* Name */}
                    <div>
                        <label htmlFor='name' className='font-semibold text-lg mr-2 block mb-1'>Name</label>
                        <input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border-2 rounded-lg px-3 py-2"
                            placeholder='E.g. cereal'
                        />
                    </div>



                    {/* Brand */}
                    <div>
                        <label htmlFor='brand' className='font-semibold text-lg mr-2 block mb-1'>Brand </label>
                        <input
                            id="brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            className="border-2 rounded-lg px-3 py-2"
                            placeholder='E.g. generic'
                        />
                    </div>




                    {/* Type */}
                    <label htmlFor='type'>Type
                        <select
                            id="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="border-2"
                        >
                            <option value={'food'}>
                                food
                            </option>
                            <option value={'liquid'}>
                                liquid
                            </option>
                        </select>
                    </label>

                    {/* Unit */}
                    <label htmlFor='unit'>unit
                        <select
                            id="unit"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            className="border-2">
                            {unitMeasure[type].map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </label>

                    {/* LifeSpan */}
                    <label htmlFor='lifeSpan'>lifeSpan
                        <input
                            id="lifeSpan"
                            type="number"
                            value={lifeSpan}
                            onChange={(e) => setLifeSpan(e.target.value)}
                            className="border-2"
                        />

                        <select
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        >
                            <option value={'year'}>years</option>
                            <option value={'month'}>months</option>
                            <option value={'day'}>days</option>
                            <option value={'hour'}>hours</option>
                        </select>
                    </label>

                    <button>Submit</button>
                </form>
            </div>


            {/* <div className="App">
                <button onClick={() => setScan(true)}>SCAN</button>
                <button onClick={() => setScan(false)}>CANCEL</button>
                {scan && (
                    <div className="w-full h-12">
                        <BarcodeScannerComponent
                            onUpdate={barcodeScannerComponentHandleUpdate}
                        />
                    </div>
                )}
                <div>
                    {logs.map((log) => (
                        <div key={log}>{log}</div>
                    ))}

                    <button onClick={() => setLog([])}>CLEAR</button>
                </div>
            </div> */}
        </div>
    )
}

export default Create