import React, { useState, useEffect } from 'react'

// Router
import { Link, useNavigate } from 'react-router-dom'

// Redux
import { refreshMe } from '../../redux/features/auth/authSlice'
import { useSelector, useDispatch } from 'react-redux'

// Components
import Avatar from '../../components/pages/Account/Avatar'
import Button from '../../components/Button'

// Icons 
import { BiFridge } from 'react-icons/bi'

function Account() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        if (auth.ready && auth.user.avatar) {
            dispatch(refreshMe())
        } else {
            navigate('/')
        }
    }, [])


    if (!auth.ready) {
        return (<div>Not a User</div>)
    }
    return (
        <div>
            <Avatar
                emoji={auth.user.avatar.emoji}
                bg={auth.user.avatar.favoriteColor}
                ring={true}
                size='lg'
            />


            <Link to='/foodSpace/create'>
                <Button>
                    Create FoodSpace
                </Button>
            </Link>

            <Link to='/product/create'>
                <Button>
                    Create Product
                </Button>
            </Link>

            <Link to='/product/me'>
                <Button>
                    My Products
                </Button>
            </Link>

            <div>

                <div>
                    <h1>Admin </h1>
                    {auth.user.admin
                        ? <ul className='bg-neutral-300 p-2 flex'>
                            {auth.user.admin.map((item) => (
                                <Link
                                    key={item.name}
                                    to={`/foodSpace/admin/${item.name}`}
                                    state={{ foodSpace_id: item._id }}>
                                    <span className='bg-white p-2 capitalize'>
                                        <BiFridge className='inline-block text-3xl mr-1' />
                                        {item.name}
                                    </span>
                                </Link>

                            ))}
                        </ul>
                        : <h1 className='bg-neutral-300 p-2 flex'>
                            No Admin
                        </h1>
                    }

                </div>

                <div>
                    <h1>FoodSpace</h1>
                    {auth.user.foodspaces
                        ? <ul className='bg-neutral-300 p-2 flex'>

                            {auth.user.foodspaces.map((item) => (
                                <Link key={item.name} to={`/foodSpace/${item._id}`}>
                                    <span className='bg-white p-2 capitalize'>
                                        <BiFridge className='inline-block text-3xl mr-1' />
                                        {item.name}
                                    </span>
                                </Link>

                            ))}
                        </ul>
                        : <h1 className='bg-neutral-300 p-2 flex'>
                            No FoodSpaces
                        </h1>
                    }

                </div>

            </div>

        </div>
    )
}

export default Account