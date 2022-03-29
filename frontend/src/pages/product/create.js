import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Router
import { useNavigate } from 'react-router-dom'

// Redux
import { useSelector } from 'react-redux'

// Urls
import { API } from '../../lib/urls'

// Utils
import { toTitleCase, convertToMs } from '../../lib/utils'

// Constants
import { unitMeasure, emojiDictionary } from '../../lib/constants'

// authorSchema //
// _id
// first_name
// last_name
// email
// avatar

// productSchema //
// name: required
// author: required
// type
// unit
// image
// lifeSpan
// barcode
// createdAt

function Create() {
    const navigate = useNavigate()
    const { user, token } = useSelector(state => state.auth)
    const [name, setName] = useState('')
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


    // Shows search Results
    useEffect(() => {
        if (search) {
            const results = []

            products.forEach((item) => {
                if (item.name.includes(search)) {
                    const itemChars = [...item.name]
                    const searchChars = [...search]
                    const match = searchChars.every((item, idx) => item === itemChars[idx])
                    if (match) {
                        results.push(item)
                    }
                }
            })

            setSearchResults(results)
        } else {
            setSearchResults([])
        }
    }, [search])


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
        <div>

            {/* Search Bar */}
            <div className='relative'>
                <input
                    value={search}
                    type="text"
                    placeholder='Search...'
                    className='border-2'
                    onChange={(e) => setSearch(e.target.value)}
                />

                {searchResults
                    ? <ul>
                        {searchResults.map((item, idx) => (
                            <div key={`${item.name}-${idx}`}>
                                <span>{item.image}</span>
                                <span className="bg-neutral-200">
                                    {item.name}
                                </span>

                            </div>
                        ))}
                    </ul>
                    : <h1>No Image</h1>
                }
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col">
                {/* Name */}
                <label htmlFor='name'>Name
                    <input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-2"
                    />
                </label>

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
    )
}

export default Create