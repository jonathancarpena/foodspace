import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

// Router
import { Link, useLocation, useNavigate } from 'react-router-dom'

// Redux
import { useDispatch, useSelector } from 'react-redux'

// Urls
import { API } from '../../../lib/urls'

// Constants
import { unitMeasure } from '../../../lib/constants'


// Icons
import { BsSearch } from 'react-icons/bs'
import { BiArrowBack } from 'react-icons/bi'
import { MdCancel } from 'react-icons/md'
import { FaTimes, FaPlusCircle, FaAngleRight } from 'react-icons/fa'
import { toTitleCase } from '../../../lib/utils'


export async function addToFoodSpace(token, foodSpace, itemToAdd, input) {
    let item;
    if (!input) {
        item = {
            product: itemToAdd,
            quantity: 1,
            area: foodSpace.areas[0],
            purchaseDate: moment(new Date(Date.now())).format("YYYY-MM-DD"),
            owner: null,
        }
    } else {
        item = {
            ...input
        }
    }

    const res = await axios({
        method: "POST",
        url: `${API.FOODSPACE.addItem}`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            items: [item],
            foodSpace_id: foodSpace._id
        }
    })
    return res
}

// Components
const ProductDisplay = ({ data, foodSpace }) => {
    console.log("COMPONENT ", data)
    const { token } = useSelector(state => state.auth)

    async function quickAdd(item) {
        const res = await addToFoodSpace(token, foodSpace, item)
        if (res.status === 200) {
            alert(`${toTitleCase(item.brand)} ${toTitleCase(item.name)} was added to ${toTitleCase(foodSpace.name)}.`)
        }
    }
    return (
        <ul className='flex flex-col space-y-3'>
            {data.map((item) => (
                <li key={item._id}>

                    <div className='py-3 px-4 bg-white rounded-xl flex justify-between drop-shadow-md items-center w-full  '>
                        <Link
                            className='cursor-pointer w-full '
                            to={`/foodSpace/add-item/${item._id}`}
                            state={{
                                foodSpace: foodSpace,
                                foodSpace_id: foodSpace._id,
                                prevPath: '/foodSpace/add-item',
                            }}
                        >
                            <div className='flex items-center space-x-3'>
                                <span className='inline-block text-[2rem]'>{item.image}</span>
                                <div className='flex flex-col space-y-0.5'>
                                    <p className='font-semibold text-inherit capitalize '>{item.name}</p>
                                    <p className=' text-secondary text-xs capitalize'>{item.brand}</p>
                                </div>
                            </div>
                        </Link>
                        <FaPlusCircle onClick={() => quickAdd(item)} className='text-xl text-primary-500 active:text-primary-600 cursor-pointer' />
                    </div>


                </li>
            ))}
        </ul>
    )
}



function AddItem() {
    const navigate = useNavigate()
    const location = useLocation()
    const [foodSpace, setFoodSpace] = useState(null)
    const [products, setProducts] = useState(null)
    const [items, setItems] = useState([])
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errors, setErrors] = useState(null)




    useEffect(() => {
        if (!location.state.foodSpace) {
            navigate('/foodSpace/choose')
        } else {
            setFoodSpace(location.state.foodSpace)
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


    // Shows search Results
    useEffect(() => {
        if (search) {
            const results = []
            products.forEach((item) => {
                if (item.name.toLowerCase().includes(search.toLowerCase())) {
                    const itemChars = [...item.name.toLowerCase()]
                    const searchChars = [...search.toLowerCase()]
                    const match = searchChars.every((item, idx) => item === itemChars[idx])
                    if (match) {
                        results.push(item)
                    }
                }
                if (item.brand.toLowerCase().includes(search.toLowerCase())) {
                    const itemChars = [...item.brand.toLowerCase()]
                    const searchChars = [...search.toLowerCase()]
                    const match = searchChars.every((item, idx) => item === itemChars[idx])
                    if (match) {
                        results.push(item)
                    }
                }
            })

            let uniqueResults = []
            results.forEach((element) => {
                if (!uniqueResults.includes(element)) {
                    uniqueResults.push(element)
                }
            })

            console.log(uniqueResults)

            setSearchResults(uniqueResults)

        } else {
            setSearchResults(null)
        }
    }, [search])



    function handleRemoveItemClick(index) {
        const removedItem = items.filter((item, idx) => idx !== index)
        setItems(removedItem)
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
        return (
            <h1>{errors}</h1>
        )
    }


    if (!foodSpace || !products) {
        return (
            <h1>Loading...</h1>
        )
    }
    return (
        <div className='min-h-screen p-7 '>

            {/* Back Button */}
            <Link to={`/foodSpace/${foodSpace.name}`} state={state}>
                <span className='fixed top-6 left-6'>
                    <BiArrowBack className='inline-block text-[1rem] text-main mr-1 mb-1' />
                </span>
            </Link>

            {/* FoodSpace Name */}
            <h1 className='text-3xl font-semibold text-center mb-5'>
                {foodSpace.name}
            </h1>

            {/* Search */}

            <div className='relative w-full focus:fill-main mb-5'>
                <BsSearch htmlFor="search" className='absolute fill-secondary top-[50%] -translate-y-[50%] left-2 ' />
                <input
                    id="search"
                    className="bg-neutral-200 rounded-lg w-full px-8 py-1.5 focus:outline-none"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    placeholder="Search by name or brand..."
                />
                {search &&
                    <MdCancel
                        onClick={() => setSearch('')}
                        className='absolute fill-neutral-400 top-[50%] -translate-y-[50%] right-2 cursor-pointer hover:fill-neutral-500' />
                }
            </div>


            {/* Products */}
            {searchResults
                ? <>

                    {/* Search Results Length */}
                    <span>{searchResults.length} result{searchResults.length === 1 ? '' : 's'}</span>
                    <ProductDisplay data={searchResults} foodSpace={location.state.foodSpace} />

                    {(searchResults.length === 0)
                        ? <Link
                            to={`/product/create`}
                            state={{ name: search, prevPath: location.pathname }}
                        >
                            <div className='text-secondary flex flex-col  space-y-2 justify-center items-center h-[20vh] '>
                                <h1 className='text-3xl'>Create Item</h1>
                                <FaPlusCircle className='block mx-auto text-2xl' />
                            </div>
                        </Link>

                        : <Link
                            to={`/product/create`}
                            state={{ name: search, prevPath: location.pathname }}
                        >
                            <div className='text-secondary flex flex-col  space-y-2 justify-center items-center h-[20vh] '>
                                <h1 className='text-2xl'>Not what you're looking for?</h1>
                                <h1 className='text-2xl'>Create a new Item</h1>
                                <FaPlusCircle className='block mx-auto text-2xl' />
                            </div>
                        </Link>}


                </>

                : <>

                    {/* Products Length */}
                    <span>{products.length} result{products.length === 1 ? '' : 's'}</span>
                    <ProductDisplay data={products} foodSpace={location.state.foodSpace} />
                </>

            }




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



        </div>
    )
}

export default AddItem