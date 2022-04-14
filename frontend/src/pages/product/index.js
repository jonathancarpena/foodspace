import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Router
import { Link, useLocation } from 'react-router-dom'

// Urls
import { API } from '../../lib/urls'

// Icons
import { BsSearch } from 'react-icons/bs'
import { MdCancel } from 'react-icons/md'
import { FaAngleRight, FaRegClock, FaPlusCircle, FaPlusSquare } from 'react-icons/fa'
import Tooltip from '../../components/Tooltip'

// Components
const ProductDisplay = ({ data }) => {
    return (
        <ul className='flex flex-col space-y-2'>
            {data.map((item) => (
                <li key={item._id}>
                    <Link to={`/product/${item._id}`}>
                        <div className='p-4 bg-white rounded-xl flex justify-between drop-shadow-md items-center w-full active:bg-primary-200 '>

                            <div className='flex items-center space-x-3'>
                                <span className='inline-block text-[2rem]'>{item.image}</span>
                                <div className='flex flex-col space-y-0.5'>
                                    <p className='font-semibold text-inherit capitalize '>{item.name}</p>
                                    <p className=' text-secondary text-xs capitalize'>{item.brand}</p>
                                    <p className=' text-secondary text-xs capitalize'><FaRegClock className='inline-block' /> Date Added: {new Date(item.createdAt).toDateString().substring(3)}</p>
                                </div>
                            </div>

                            <FaAngleRight className='text-xl text-secondary' />

                        </div>
                    </Link>
                </li>

            ))}
        </ul>
    )
}

const LoadingContainer = () => {
    return (
        <div className=" drop-shadow-md rounded-md p-4 mx-7 bg-white ">
            <div className="animate-pulse flex space-x-4">
                {/* Circle */}
                <div className="rounded-full bg-neutral-200 h-10 w-10"></div>

                {/* Lines */}
                <div className="flex-1 space-y-3 py-1">
                    <div className="h-2 bg-neutral-300 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-2 bg-neutral-300 rounded col-span-2"></div>
                            <div className="h-2 bg-neutral-300 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-neutral-300 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
function Products() {
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [errors, setErrors] = useState(false)
    const [sort, setSort] = useState("name:asc")
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const location = useLocation()

    useEffect(() => {
        setIsLoading(true)
        axios.get(`${API.PRODUCT.base}`)
            .then((res) => {
                if (res) {
                    setIsLoading(false)
                    setProducts(res.data)
                }
            })
            .catch((err) => {
                setErrors(true)
            })
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
            setSearchResults(uniqueResults)
        } else {
            setSearchResults(null)
        }
    }, [search])


    function handleSortChange(e) {
        setSort(e.target.value)
        const key = e.target.value.split(':')[0]
        const value = e.target.value.split(':')[1]
        let items;
        if (search) {
            items = [...searchResults]
        } else {
            items = [...products]
        }
        if (key === "name") {
            if (value === "asc") {
                items.sort((a, b) => {
                    return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                })
            } else {
                items.sort((a, b) => {
                    return b.name.toLowerCase().localeCompare(a.name.toLowerCase())
                })
            }
        } else {
            if (value === "asc") {
                items.sort((a, b) => {
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                })
            } else {
                items.sort((a, b) => {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                })
            }
        }

        if (search) {
            setSearchResults(items)
        } else {
            setProducts(items)
        }

    }

    if (errors) {
        <div>
            <h1>Oops there was an error</h1>
        </div>
    }

    return (
        <div className='min-h-screen pb-20'>

            {/* Search */}
            <div className='p-7 flex flex-col space-y-1 '>
                <label htmlFor="search" className="text-2xl font-semibold">Search</label>
                <div className='relative w-max'>
                    <BsSearch htmlFor="search" className='absolute fill-secondary top-[50%] -translate-y-[50%] left-2' />
                    <input
                        id="search"
                        className="bg-neutral-200 rounded-xl px-8 py-1.5 focus:outline-none"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        placeholder="Search by name or brand..."
                    />
                    {search &&
                        <MdCancel
                            onClick={() => setSearch('')}
                            className='absolute fill-neutral-400 top-[50%] -translate-y-[50%] right-2 cursor-pointer hover:fill-neutral-500' />
                    }
                    <Link
                        to={`/product/create`}
                        state={{ name: search, prevPath: location.pathname }}
                    >
                        <Tooltip message={"Create an Item"}>
                            <FaPlusSquare className='inline-block ml-1 text-lg text-primary-500 cursor-pointer' />
                        </Tooltip>

                    </Link>
                </div>
            </div>

            {/* Sort */}
            <div className='px-7 pb-7'>
                <span className='inline-block mr-2'>Sort by</span>
                <select value={sort} onChange={handleSortChange} className="p-2 active:outline-none focus:outline-none">
                    <option value="name:asc">A-Z</option>
                    <option value="name:des">Z-A</option>
                    <option value="createdAt:des">Recently Added</option>
                    <option value="createdAt:asc">Oldest</option>
                </select>
            </div>

            {/* Loading Animation */}
            {isLoading &&
                <>
                    <div className='flex flex-col space-y-2'>
                        <LoadingContainer />
                        <LoadingContainer />
                        <LoadingContainer />
                        <LoadingContainer />
                        <LoadingContainer />
                        <LoadingContainer />
                    </div>

                </>
            }


            {/* Products Display */}
            {!isLoading &&
                <>
                    <div className='mx-7'>

                        {searchResults
                            ? <>
                                {/* Search Results Length */}
                                <span>{searchResults.length} result{searchResults.length === 1 ? '' : 's'}</span>
                                <ProductDisplay data={searchResults} />
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
                                <ProductDisplay data={products} />
                            </>

                        }










                    </div>
                </>
            }


        </div >
    )
}

export default Products

