import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Redux
import { useSelector } from 'react-redux'

// Router
import { Link, useLocation } from 'react-router-dom'

// Urls
import { API } from '../../lib/urls'

// Components
import Button from '../../components/Button'
import Avatar from '../../components/pages/Account/Avatar'

// Icons
import { BiFridge } from 'react-icons/bi'

function Admin() {
    const { state: { foodSpace_id } } = useLocation()
    const auth = useSelector(state => state.auth)
    const [foodSpace, setFoodSpace] = useState(null)


    useEffect(async () => {
        async function getFoodSpaceById() {
            const { data } = await axios({
                method: "GET",
                url: `${API.FOODSPACE.admin}/${foodSpace_id}`,
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            })
            return data.foodSpace
        }

        const res = await getFoodSpaceById()
        if (res) {
            setFoodSpace(res)
        }
    }, [])



    if (!foodSpace) {
        return (
            <div>
                Nothing to see here
            </div>
        )
    }
    return (
        <div>
            <Link to={`/foodSpace/${foodSpace.name}/add-item`} state={{ foodSpace_id }}>
                <Button>
                    Add Item to FoodSpace
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

            {/* Stock */}
            <div>
                <h1>Stock</h1>
                {foodSpace.stock.map((item, idx) => (
                    <div key={`${idx}-${idx}`} className="flex space-x-3">
                        <p>Name: {item.product.name}</p>
                        <p>Quantity: {item.quantity} {item.product.unit}</p>
                        <p>Located: {item.area}</p>
                        <p>Expired: {item.expired ? "yes" : "no"}</p>
                        {item.owner && <p>Owner: {item.owner.first_name}</p>}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Admin