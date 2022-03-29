import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Router
import { Link, useLocation, useNavigate } from 'react-router-dom'

// Redux
import { useDispatch, useSelector } from 'react-redux'

// Urls
import { API } from '../../lib/urls'

// Constants
import { unitMeasure } from '../../lib/constants'

// Components

// Icons
import { FaTimes, FaPlusCircle } from 'react-icons/fa'

// Product Schema //
// _id: required
// name: required
// imageUrl: required
// unit

// User Schema //
// _id: required
// first_name: required
// last_name: required
// email: required
// avatar: required

// Body Schema //
// product: required (Product Schema)
// quantity
// area
// expired
// purchasedDate
// owner (User Schema)

// const { item, foodSpace_id } = body

function AddItem() {
    const navigate = useNavigate()
    const { state: { foodSpace, foodSpace_id } } = useLocation()
    const { token } = useSelector(state => state.auth)
    const [products, setProducts] = useState(null)
    const [items, setItems] = useState([])
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState('')

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

    function handleAddItemClick(item) {
        const newItem = {
            product: {
                ...item,
                unit: unitMeasure[item.type][0]
            },
            quantity: 1,
            area: foodSpace.areas[0],
            purchaseDate: new Date(Date.now()).toJSON().split('T')[0],
            owner: "everyone"
        }
        setSearch('')
        setItems([...items, newItem])
    }

    function handleRemoveItemClick(index) {
        const removedItem = items.filter((item, idx) => idx !== index)
        setItems(removedItem)
    }

    function handleSearchSubmit(e) {
        e.preventDefault()
        if (searchResults.length === 1) {
            const newItem = {
                product: {
                    ...searchResults[0],
                    unit: unitMeasure[searchResults[0].type][0]
                },
                quantity: 1,
                area: foodSpace.areas[0],
                purchaseDate: new Date(Date.now()).toJSON().split('T')[0],
                owner: "everyone"
            }
            console.log(newItem)
            setSearch('')
            setItems([...items, newItem])
        }
    }


    async function handleAddToFoodSpace(e) {
        e.preventDefault()
        let updatedItems = []

        for (const element of items) {
            let owner = null
            if (element.owner !== "everyone") {
                if (foodSpace.admin.first_name === element.owner) {
                    owner = foodSpace.admin
                } else {
                    owner = foodSpace.users.find((user) => user.first_name === element.owner)
                }
            }

            const item = {
                product: element.product,
                quantity: element.quantity,
                area: element.area,
                purchaseDate: element.purchaseDate,
                owner
            }

            updatedItems.push(item)
        }



        const res = await axios({
            method: "POST",
            url: `${API.FOODSPACE.addItem}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                items: updatedItems,
                foodSpace_id
            }
        })
        if (res) {
            navigate('/')
        }
    }

    function handleValueChange(e, index) {
        const key = e.target.name
        let updateItem = items[index]

        if (key === "unit") {
            updateItem.product.unit = e.target.value
        } else {
            updateItem[key] = e.target.value
        }
        let updatedItems = [];

        items.forEach((item, idx) => {
            if (idx === index) {
                updatedItems.push(updateItem)
            } else {
                updatedItems.push(item)
            }
        })
        setItems(updatedItems)
    }


    return (
        <div>
            <Link to={'/account'}>GO Back</Link>
            <h1 className='text-2xl font-semibold'>
                Add an Item to your FoodSpace
            </h1>

            <div className='relative'>

                <form onSubmit={handleSearchSubmit}>
                    <input
                        value={search}
                        type="text"
                        placeholder='Search...'
                        className='border-2'
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </form>

                {searchResults
                    ? <ul>
                        {searchResults.map((item, idx) => (
                            <div key={`${item.name}-${idx}`}>
                                <span className="bg-neutral-200">
                                    {item.name}
                                </span>
                                <FaPlusCircle
                                    onClick={() => handleAddItemClick(item)}
                                    className='inline-block ml-1 cursor-pointer hover:text-primary-500 active:text-primary-600'
                                />

                            </div>
                        ))}
                    </ul>
                    : <h1>No item</h1>
                }

            </div>


            <form onSubmit={handleAddToFoodSpace}>
                <h1 className="text-2xl border-b-2">
                    Items to Add
                </h1>
                <ul className="flex flex-col space-y-2">
                    {items.map((item, index) => (
                        <div key={`${item.product._id}-${index}`} className=' flex flex-col space-x-3 items-center justify-evenly'>

                            {/* Item */}
                            <div>
                                <span>{item.product.name}</span>

                                {/* Delete */}
                                <FaTimes
                                    onClick={() => handleRemoveItemClick(index)}
                                    className='inline-block ml-1 cursor-pointer hover:text-primary-500 active:text-primary-600'
                                />
                            </div>


                            <div>
                                {/* Quantity */}
                                <input
                                    name="quantity"
                                    type="number"
                                    className='w-[50px] bg-neutral-200'
                                    value={item.quantity}
                                    onChange={(e) => handleValueChange(e, index)}
                                />

                                {/* Unit */}
                                <select
                                    name="unit"
                                    value={item.product.unit}
                                    onChange={(e) => handleValueChange(e, index)}
                                >
                                    {unitMeasure[item.product.type].map((item) => (
                                        <option key={item} value={item}>{item}</option>
                                    ))}
                                </select>

                                {/* Areas */}
                                <select
                                    name="area"
                                    value={item.area}
                                    onChange={(e) => handleValueChange(e, index)}
                                >
                                    {foodSpace.areas.map((item) => (
                                        <option key={item} value={item}>{item}</option>
                                    ))}
                                </select>

                                {/* Purchase Date */}
                                <input
                                    name="purchaseDate"
                                    type="date"
                                    value={item.purchaseDate}
                                    onChange={(e) => handleValueChange(e, index)}
                                />

                                {/* Owner */}
                                <select
                                    name="owner"
                                    value={item.owner}
                                    onChange={(e) => handleValueChange(e, index)}
                                >
                                    {/* Admin */}
                                    <option value={foodSpace.admin.first_name}>
                                        {foodSpace.admin.first_name}
                                    </option>

                                    {/* Users */}
                                    {foodSpace.users.map((user) => (
                                        <option key={user._id} value={user.first_name}>
                                            {user.first_name}
                                        </option>
                                    ))}

                                    {/* Everyone */}
                                    <option value={"everyone"}>
                                        everyone
                                    </option>

                                </select>
                            </div>

                        </div>
                    ))}
                </ul>

                <button type="submit">Submit</button>
            </form>

        </div>
    )
}

export default AddItem