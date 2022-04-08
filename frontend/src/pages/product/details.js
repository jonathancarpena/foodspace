import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Router
import { useParams, Link } from 'react-router-dom'

// Urls
import { API } from '../../lib/urls'

// Icons
import { BiArrowBack } from 'react-icons/bi'
import { IoMdBarcode } from 'react-icons/io'
import { MdMailOutline, MdPermIdentity } from 'react-icons/md'
import { FaPencilAlt, FaHashtag, FaFilter, FaRulerVertical, FaClock, FaBarcode } from 'react-icons/fa'

// Components
import Avatar from '../../components/pages/Account/Avatar'
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

function ProductDetails() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errors, setErrors] = useState(null)
    useEffect(() => {
        setIsLoading(true)
        axios.get(`${API.PRODUCT.base}/${id}`)
            .then((res) => {
                setProduct(res.data)
                setIsLoading(false)
            })
            .catch((err) => setErrors(err))
    }, [])


    if (errors) {
        return <h1>Error...</h1>
    }


    return (
        <div className='min-h-screen bg-white overflow-visible mb-16'>

            <Link to="/product">
                <span className='fixed top-6 left-6'>
                    <BiArrowBack className='inline-block text-[1rem] text-main mr-1 mb-1' />
                    All Products
                </span>
            </Link>


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
                        <Avatar
                            emoji={product.image}
                            bg={'bg-neutral-200'}
                            ring
                            size='xl'
                            sx="mb-2.5"
                        />

                        <h1 className='text-3xl capitalize text-main font-semibold'>
                            {product.name}
                        </h1>
                        <h2 className='text-xl capitalize text-secondary'>
                            {product.brand}
                        </h2>
                    </>
                }
            </div>


            {/* Author, ID, Type, Unit, Date Added */}
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
                                {product.unit}
                            </p>

                        </div>

                        {/* Barcode */}
                        <div className='border-b-2 flex flex-col text-xl'>
                            <div>
                                <IoMdBarcode className='inline-block mr-2 mb-0.5' />
                                <span className='font-semibold'>Barcode: </span>
                            </div>
                            <p className='py-3 ml-7 capitalize'>
                                {product.barcode ? product.barcode : "None"}
                            </p>
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
                                {new Date(product.createdAt).toDateString().substring(3)}
                            </p>
                        </div>
                    </>
                }





            </div>



        </div>
    )
}

export default ProductDetails