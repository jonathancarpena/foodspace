import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Router
import { useParams } from 'react-router-dom'

// Urls
import { API } from '../../lib/urls'

// Components
import Avatar from '../../components/pages/Account/Avatar'

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

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (errors) {
        return <h1>Error...</h1>
    }
    return (
        <div>
            <h1>Product ID: {product._id}</h1>
            <h1>Brand: {product.brand}</h1>
            <h1>Name: {product.name}</h1>
            <h1>Image: {product.image}</h1>
            <h1>Type: {product.type}</h1>
            <h1>Unit: {product.unit}</h1>
            <h1>Date Added: {product.createdAt}</h1>
            <h1>Author: <Avatar bg={product.author.avatar.favoriteColor} emoji={product.author.avatar.emoji} /> {product.author.email}</h1>
        </div>
    )
}

export default ProductDetails