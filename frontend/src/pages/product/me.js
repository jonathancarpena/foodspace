import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Router
import { Link, useNavigate } from 'react-router-dom'

// Redux
import { useSelector } from 'react-redux'

// Urls
import { API } from '../../lib/urls'

// Utils
import { toTitleCase, convertToMs } from '../../lib/utils'

// Constants
import { unitMeasure, emojiDictionary } from '../../lib/constants'

function MyFood() {
    const navigate = useNavigate()
    const { user, token } = useSelector(state => state.auth)
    const [myProducts, setMyProducts] = useState(user.myProducts)
    const [time, setTime] = useState('day')


    // Adding Edit Status
    useEffect(() => {
        const addEditStatus = user.myProducts.map((item) => {
            return {
                ...item,
                edit: false
            }
        })
        setMyProducts(addEditStatus)
    }, [])

    async function handleSubmit(e, idx) {
        e.preventDefault()

        try {

            const data = {
                _id: myProducts[idx]._id,
                name: myProducts[idx].name,
                type: myProducts[idx].type,
                unit: myProducts[idx].unit,
                barcode: myProducts[idx].barcode,
                lifeSpan: myProducts[idx].lifeSpan,
                image: myProducts[idx].image ? myProducts[idx].image : emojiDictionary[myProducts[idx].type],
            }
            const res = await axios({
                method: "PUT",
                url: `${API.PRODUCT.update}`,
                data: { data },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res)
            if (res) {
                let updatedProducts = myProducts
                updatedProducts[idx].edit = false
                setMyProducts([...updatedProducts])
            }
        } catch (error) {
            console.log(error)
            const { message } = error.response.data
            console.log(message)
        }

    }

    function handleLifeSpanChange(e, idx) {
        let newProduct = [...myProducts]
        if (e.target.name === "time") {
            newProduct[idx].lifeSpan = {
                ...newProduct[idx].lifeSpan,
                time: e.target.value
            }
        }
        if (e.target.name === "value") {
            newProduct[idx].lifeSpan = {
                ...newProduct[idx].lifeSpan,
                value: e.target.value
            }
        }
        setMyProducts([...newProduct])
    }

    function handleEditChange(e, idx) {
        let newProduct = myProducts
        newProduct[idx][e.target.name] = e.target.value
        setMyProducts([...newProduct])
    }

    async function handleRemoveItem(item) {
        const userConfirm = window.confirm(`Are you sure you want to delete ${item.name}?`)
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

    function editStatus(index) {
        let copy = myProducts
        copy[index].edit = true
        setMyProducts([...copy])
    }

    return (
        <div>
            <h1>My Product</h1>
            {myProducts.length
                ? <ul className="flex flex-col space-y-3">
                    {myProducts.map((item, idx) => (
                        item.edit
                            ? <form onSubmit={(e) => handleSubmit(e, idx)} className='flex space-x-3'>
                                <span>EDITING</span>
                                <label>Image:
                                    <input
                                        name="image"
                                        value={item.image}
                                        onChange={(e) => handleEditChange(e, idx)}
                                        className="w-[30px]"
                                    />
                                </label>

                                <label>Name:
                                    <input
                                        name="name"
                                        value={item.name}
                                        onChange={(e) => handleEditChange(e, idx)}
                                        className="w-[50px]"
                                    />
                                </label>

                                <label>LifeSpan:
                                    <input
                                        type="number"
                                        name="value"
                                        value={item.lifeSpan.value}
                                        onChange={(e) => handleLifeSpanChange(e, idx)}
                                        className="w-[50px]"
                                    />
                                    <select
                                        value={item.lifeSpan.time}
                                        name="time"
                                        onChange={(e) => handleLifeSpanChange(e, idx)}
                                    >
                                        <option value={'year'}>years</option>
                                        <option value={'month'}>months</option>
                                        <option value={'day'}>days</option>
                                        <option value={'hour'}>hours</option>
                                    </select>
                                </label>

                                <label>Type:
                                    <select
                                        id="type"
                                        name="type"
                                        value={item.type}
                                        onChange={(e) => handleEditChange(e, idx)}
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

                                <label>Unit:
                                    <select
                                        id="unit"
                                        name="unit"
                                        value={item.unit}
                                        onChange={(e) => handleEditChange(e, idx)}
                                        className="border-2">
                                        {unitMeasure[item.type].map((item) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <label>Barcode:
                                    <input
                                        name="barcode"
                                        value={item.barcode ? item.barcode : ''}
                                        onChange={(e) => handleEditChange(e, idx)}
                                        className="w-[50px]"
                                    />
                                </label>

                                <button type="submit">✔</button>
                            </form>
                            : <div className='flex space-x-3'>
                                <button onClick={() => handleRemoveItem(item)}>Remove</button>
                                <button onClick={() => editStatus(idx)}>Edit</button>
                                <span>{item.image}</span>
                                <span>{item.name}</span>
                                <span>{item.lifeSpan.value} {item.lifeSpan.time}</span>
                                <span>Type: {item.type}</span>
                                <span>Unit: {item.unit}</span>
                                <span>Barcode: {item.barcode}</span>
                            </div>

                        // <div key={item._id} className='flex space-x-2 justify-evenly'>
                        //     <span>{item.image}</span>
                        //     <span>Name: {item.name}</span>
                        //     <span>LifeSpan: {item.lifeSpan}</span>
                        //     <span>Type: {item.type}</span>
                        //     <span>Unit: {item.unit}</span>
                        //     <span>Barcode: {item.barcode}</span>
                        // </div>
                    ))}
                </ul>
                : <div>
                    <Link to='/product/create'>Create Product</Link>
                </div>
            }


        </div>
    )
}

export default MyFood