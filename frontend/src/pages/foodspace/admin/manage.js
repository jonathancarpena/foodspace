import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Router
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom'

// Redux
import { useDispatch, useSelector } from 'react-redux'

// Urls
import { API } from '../../../lib/urls'

// Icons
import { FaUser } from 'react-icons/fa'
import { FiTrash, FiPlusCircle } from 'react-icons/fi'
import { BiArrowBack, BiFridge, BiCategory, BiUser } from 'react-icons/bi'

// Components
import Users from '../../../components/pages/FoodSpace/Admin/Manage/Users'
import Areas from '../../../components/pages/FoodSpace/Admin/Manage/Areas'
import Tabs, { TabHeader, TabContent } from '../../../components/Tabs'

function ManageFoodSpace() {
    const { name } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.auth)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const [foodSpace, setFoodSpace] = useState(null)


    useEffect(() => {
        setIsLoading(true)
        if (!location.state.foodSpace) {
            if (!location.state.foodSpace_id) {
                navigate("/foodSpace/choose", { state: { prevPath: location.pathname } })
                setIsLoading(false)
            } else {
                axios.get(`${API.ADMIN.base}/${location.state.foodSpace_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then((res) => {
                        if (res.status === 200) {
                            setFoodSpace(res.data.foodSpace)
                        }
                        setIsLoading(false)
                    })
                    .catch((err) => setErrors(err))
            }
        } else {
            setFoodSpace(location.state.foodSpace)
            setIsLoading(false)
        }
    }, [])
    let prevPath;
    let state;
    try {
        prevPath = location.state.prevPath
        state = location.state
    } catch (error) {
        prevPath = '/'
        state = null
    }


    if (isLoading || !foodSpace) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
    return (
        <div className='min-h-screen p-7 flex flex-col justify-center items-center mb-[4.2rem]'>
            {/* Back Button */}
            <Link to={`/foodSpace/${foodSpace.name}`} state={state}>
                <span className='fixed top-6 left-6'>
                    <BiArrowBack className='inline-block text-[1rem] text-main mr-1 mb-1' />
                </span>
            </Link>

            <div className="flex flex-col space-y-5 min-w-[370px] max-w-[370px] min-h-[70vh]">
                {/* Header */}
                <div>
                    <h1 className='text-3xl font-semibold tracking-tight text-center'>
                        Manage
                    </h1>
                    <h2 className='my-2 text-2xl font-semibold tracking-tight text-center capitalize'>
                        <BiFridge className='inline-block mb-1' /> {name}
                    </h2>
                </div>



                <Tabs>

                    {/* Headers */}
                    <TabHeader bg="bg-neutral-500" text="text-neutral-500">
                        <FaUser className='inline-block mb-1' /> Users
                    </TabHeader>
                    <TabHeader bg="bg-neutral-500" text="text-neutral-500">
                        <BiCategory className='inline-block mb-1' /> Areas
                    </TabHeader>

                    {/* Content */}
                    <TabContent>
                        <Users foodSpace={foodSpace} />
                    </TabContent>

                    <TabContent>
                        <Areas foodSpace={foodSpace} />
                    </TabContent>
                </Tabs>
            </div>

        </div>
    )
}

export default ManageFoodSpace