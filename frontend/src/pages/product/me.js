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

// Icons
import { BsSearch } from 'react-icons/bs'
import { MdCancel } from 'react-icons/md'
import { FaAngleRight, FaRegClock, FaPlusCircle, FaTrashAlt } from 'react-icons/fa'

// Swiper Components
import { Swiper, SwiperSlide, useSwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// Components
const ProductDisplay = ({ handleRemoveItem, data }) => {
    const location = useLocation()
    return (
        <ul className='flex flex-col'>
            {data.map((item) => (
                <li key={item._id}>

                    <Swiper
                        initialSlide={1}
                        slidesPerView="auto"
                        className="w-full h-full"
                    >
                        <SwiperSlide className=' max-w-max p-2 flex  '>
                            <div onClick={() => handleRemoveItem(item)} className={`bg-red-600 cursor-pointer rounded-xl drop-shadow-lg flex flex-col justify-center items-center space-y-1  py-4 w-[15vw] `}>
                                <FaTrashAlt className='text-white inline-block text-[2rem] ' />
                                <span className='text-white text-sm'>Delete</span>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide className='w-[80vw] p-2 '>

                            <Link to={`/product/${item._id}`} state={{ prevPath: location.pathname }}>
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
                        </SwiperSlide>
                    </Swiper>


                </li>

            ))}
        </ul>
    )
}
function MyFood() {
    const location = useLocation()
    const { user, token } = useSelector(state => state.auth)
    const [myProducts, setMyProducts] = useState([])
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        if (user.myProducts) {
            setMyProducts(user.myProducts)
        } else {
            setMyProducts(null)
        }

    }, [])


    // Shows search Results
    useEffect(() => {
        if (search) {
            const results = []
            myProducts.forEach((item) => {
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


    async function handleRemoveItem(item) {
        const userConfirm = window.confirm(`Are you sure you want to remove ${item.brand} ${item.name} from your My Foods?`)
        if (userConfirm) {
            try {
                const res = await axios({
                    method: "DELETE",
                    url: `${API.PRODUCT.delete}`,
                    data: { item },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (res) {
                    setMyProducts(myProducts.filter((product) => product !== item))
                }
            } catch (error) {
                const { message } = error.response.data
                console.log(message)
            }
        }
    }



    return (
        <div className="min-h-screen ">

            {/* Search */}
            <div className='p-7 flex flex-col space-y-1 '>
                <label htmlFor="search" className="text-2xl font-semibold">My Foods</label>
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
                </div>
            </div>


            {/* My Foods Display */}
            <div className='mx-7'>
                {myProducts.length
                    ? <>
                        {searchResults &&
                            <span>{searchResults.length} result{searchResults.length === 1 ? '' : 's'}</span>
                        }

                        {!searchResults &&
                            <span>{myProducts.length} result{myProducts.length === 1 ? '' : 's'}</span>
                        }
                        <ProductDisplay data={searchResults ? searchResults : myProducts} handleRemoveItem={handleRemoveItem} />

                        {(searchResults && searchResults.length === 0) &&
                            <Link
                                to={`/product/create`}
                                state={{ name: search, prevPath: location.pathname }}
                            >
                                <div className='text-secondary flex flex-col  space-y-2 justify-center items-center h-[20vh] '>
                                    <h1 className='text-3xl'>Create Item</h1>
                                    <FaPlusCircle className='block mx-auto text-2xl' />
                                </div>
                            </Link>
                        }
                    </>
                    : <>
                        <span>0 results</span>
                        <Link
                            to={`/product/create`}
                            state={{ name: search, prevPath: location.pathname }}
                        >
                            <div className='text-secondary flex flex-col  space-y-2 justify-center items-center h-[20vh] '>
                                <h1 className='text-3xl'>Create Item</h1>
                                <FaPlusCircle className='block mx-auto text-2xl' />
                            </div>
                        </Link>
                    </>

                }

            </div>

        </div>
    )
}

export default MyFood