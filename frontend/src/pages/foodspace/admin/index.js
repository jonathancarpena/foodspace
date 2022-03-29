import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Redux
import { useSelector } from 'react-redux'

// Router
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

// Urls
import { API } from '../../../lib/urls'

// Components
import Button from '../../../components/Button'
import Avatar from '../../../components/pages/Account/Avatar'

// Icons
import { BiFridge } from 'react-icons/bi'

function Admin() {
    const { state: { foodSpace_id } } = useLocation()
    const navigate = useNavigate()
    const auth = useSelector(state => state.auth)
    const [foodSpace, setFoodSpace] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setError(false)
        setLoading(true)
        axios({
            method: "GET",
            url: `${API.FOODSPACE.admin}/${foodSpace_id}`,
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        }).then((res) => {
            if (res.data) {
                const addEditStatus = res.data.foodSpace.stock.map((item) => {
                    return {
                        ...item,
                        edit: false
                    }
                })
                setFoodSpace({ ...res.data.foodSpace, stock: addEditStatus })
                setLoading(false)
            }
        }).catch((err) => {
            const { message } = err.response.data
            setError(message)
            setLoading(false)
        })
        console.log('FETCH')
    }, [])

    async function handleRemoveItem(item) {
        try {
            const res = await axios({
                method: "DELETE",
                url: `${API.FOODSPACE.removeItem}`,
                data: {
                    item_id: item._id,
                    foodSpace_id
                },
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            })
            const filteredStock = foodSpace.stock.filter((stock) => stock !== item)
            setFoodSpace({ ...foodSpace, stock: filteredStock })
        } catch (error) {
            const { message } = error.response.data
            setError(message)
        }
    }

    function editStatus(index) {
        let copy = foodSpace.stock
        copy[index].edit = true
        setFoodSpace({ ...foodSpace, stock: copy })
    }

    async function handleEditSubmit(e, index) {
        e.preventDefault()
        let owner = null
        if (foodSpace.stock[index].owner !== "everyone") {
            owner = foodSpace.users.find((item) => item.first_name === foodSpace.stock[index].owner)
            if (!owner) {
                if (foodSpace.admin.first_name === foodSpace.stock[index].owner) {
                    owner = foodSpace.admin
                }
            }
        }


        const data = {
            item_id: foodSpace.stock[index]._id,
            info: {
                owner,
                area: foodSpace.stock[index].area,
                quantity: foodSpace.stock[index].quantity
            },
            foodSpace_id
        }

        try {
            const res = await axios({
                method: "POST",
                url: `${API.FOODSPACE.updateItem}`,
                data,
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            })
            if (res) {
                let updatedStock = foodSpace.stock
                updatedStock[index].owner = owner
                updatedStock[index].edit = false
                setFoodSpace({ ...foodSpace, stock: updatedStock })
            }

        } catch (error) {
            console.log(error)
            const { message } = error.response.data
            console.log(message)
        }

    }

    function handleEditChange(e, index) {
        let newStock = foodSpace.stock
        newStock[index][e.target.name] = e.target.value
        setFoodSpace({ ...foodSpace, stock: newStock })
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (!foodSpace || error) {
        return <div> Nothing to see here </div>

    }

    async function handleDeleteFoodSpace() {
        const userConfirm = window.confirm('Are you sure you want to delete this FoodSpace?')
        if (userConfirm) {
            try {
                const res = await axios({
                    method: "DELETE",
                    url: `${API.FOODSPACE.delete}`,
                    data: {
                        foodSpace_id
                    },
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                })
                if (res) {
                    navigate('/account')
                }

            } catch (error) {
                const { message } = error.response.data
            }
        }
    }

    async function handleRemoveArea(area) {
        const userConfirm = window.confirm(`Are you sure you want to remove ${area} from this FoodSpace?`)
        if (userConfirm) {
            try {
                const res = await axios({
                    method: "DELETE",
                    url: `${API.FOODSPACE.removeArea}`,
                    data: {
                        area,
                        foodSpace_id
                    },
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                })
                setFoodSpace({ ...foodSpace, areas: foodSpace.areas.filter((item) => item !== area) })
            } catch (error) {
                const { message } = error.response.data
            }
        }
    }

    return (
        <div>
            <Link to={`/foodSpace/${foodSpace.name}/add-item`} state={{ foodSpace, foodSpace_id }}>
                <Button>
                    Add Item
                </Button>
            </Link>


            <Button onClick={() => handleDeleteFoodSpace()}>
                Delete FoodSpace
            </Button>

            <Link to={`/foodSpace/${foodSpace.name}/add-area`} state={{ foodSpace, foodSpace_id }}>
                <Button>
                    Add Area
                </Button>
            </Link>

            <Link to={`/foodSpace/${foodSpace.name}/manage/users`} state={{ foodSpace, foodSpace_id }}>
                <Button>
                    Manage Users
                </Button>
            </Link>



            <div>
                <BiFridge className='inline-block text-5xl' />
                <h1 className='inline-block capitalize'>{foodSpace.name}</h1>
            </div>


            {/* Admin Display */}
            <div>
                <h2 className='capitalize'>
                    Admin:
                    <Avatar
                        sx='inline-block'
                        emoji={foodSpace.admin.avatar.emoji}
                        bg={foodSpace.admin.avatar.favoriteColor}
                    />
                    {foodSpace.admin.first_name}
                </h2>
            </div>

            {/* Users Display */}
            <div>
                {foodSpace.users
                    ? <h2 className='capitalize'>
                        Users:
                        {foodSpace.users.map((user, idx) => (
                            <div key={`user-${idx}`}>
                                <Avatar
                                    sx='inline-block'
                                    emoji={user.avatar.emoji}
                                    bg={user.avatar.favoriteColor}
                                />
                                <span>{user.first_name}</span>
                            </div>
                        ))}
                    </h2>
                    : <h2>No other users</h2>
                }
            </div>

            <div>
                <h1>Areas</h1>
                {foodSpace.areas.map((item) => (
                    <div key={item}>
                        <h2>{item} <span onClick={() => handleRemoveArea(item)}>Remove</span></h2>
                    </div>
                ))}
            </div>
            {/* Stock */}
            <div className='bg-neutral-300'>
                <h1>Stock</h1>
                {foodSpace.stock.map((item, idx) => (
                    <div key={`${idx}-${idx}`} className="flex space-x-3">
                        {item.edit
                            ? <form onSubmit={(e) => handleEditSubmit(e, idx)} className="flex space-x-3">
                                <p>{item.product.name}</p>
                                <p>Qty:
                                    <input
                                        name="quantity"
                                        type="number"
                                        step={1}
                                        value={item.quantity}
                                        onChange={(e) => handleEditChange(e, idx)}
                                        className="w-[20px]"
                                    />
                                    {item.product.unit}
                                </p>
                                <p>Area:
                                    <select
                                        name="area"
                                        value={item.area}
                                        onChange={(e) => handleEditChange(e, idx)}
                                    >
                                        {foodSpace.areas.map((item) => (
                                            <option>{item}</option>
                                        ))}
                                    </select>
                                </p>
                                <p>{item.expired ? "expired" : ""}</p>
                                <p>Owner
                                    <select
                                        name="owner"
                                        onChange={(e) => handleEditChange(e, idx)}
                                        value={item.owner ? item.owner : "everyone"}
                                    >
                                        {/* Admin */}
                                        <option value={foodSpace.admin.first_name}>
                                            {foodSpace.admin.first_name}
                                        </option>

                                        {/* Users */}
                                        {foodSpace.users.map((user) => (
                                            <option value={user.first_name}>
                                                {user.first_name}
                                            </option>
                                        ))}

                                        {/* Everyone */}
                                        <option value={"everyone"}>
                                            everyone
                                        </option>
                                    </select>
                                </p>

                                <button type="submit">✔</button>
                            </form>
                            : <>
                                <button onClick={() => handleRemoveItem(item)}>Remove</button>
                                <button onClick={() => editStatus(idx)}>Edit</button>
                                <p>{item.product.name}</p>
                                <p>Qty:  {item.quantity} {item.product.unit}</p>
                                <p>Area: {item.area}</p>
                                <p>{item.expired ? "expired" : ""}</p>
                                {item.owner && <p>Own: {item.owner.first_name.substring(0, 3)}</p>}
                            </>
                        }

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Admin