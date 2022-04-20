import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Router
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom'

// Redux
import { refreshMe } from '../../../../../redux/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'

// Urls
import { API } from '../../../../../lib/urls'

// Icons
import { FiTrash, FiPlusCircle } from 'react-icons/fi'
import { BiArrowBack, BiFridge, BiCategory } from 'react-icons/bi'

// Components
import Avatar from '../../../../../components/pages/Account/Avatar'


function Areas({ foodSpace }) {
    const { name } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.auth)
    const [areas, setAreas] = useState([...foodSpace.areas])
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState(null)


    async function handleRemove(area) {
        const userConfirm = window.confirm(`Are you sure you want to remove ${area} from the FoodSpace?`)
        if (userConfirm) {
            const res = await axios({
                method: "DELETE",
                url: `${API.ADMIN.removeUser}`,
                data: {
                    user_id: area._id,
                    foodSpace_id: foodSpace._id
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.status === 200) {
                const updatedUsers = areas.filter((item) => item._id !== area._id)
                dispatch(refreshMe())
                setAreas([...updatedUsers])
            }
        }

    }




    if (isLoading || !foodSpace) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
    return (
        <div className="">

            <ul className='flex flex-col space-y-3'>
                {areas.map((item, idx) => (
                    <li key={item} className="bg-white drop-shadow-md rounded-lg p-4 min-h-[90px] max-h-[90px] flex justify-between w-full">
                        <div className='bg-white  flex items-center space-x-4 '>
                            <Avatar bg={'bg-white'} emoji={<BiCategory className='inline-block' />} size="xs" />
                            <div className='flex flex-col justify-center capitalize'>
                                <p className='text-main'>{item}</p>
                            </div>
                        </div>
                        <button
                            className='text-sm text-red-600 active:bg-neutral-100 p-2 rounded-lg'
                            onClick={() => handleRemove(item)}>
                            <FiTrash className='inline-block mx-auto text-lg' />
                            <span className='block'>
                                Remove
                            </span>
                        </button>
                    </li>
                ))}
                <Link
                    to={`/foodSpace/admin/${name}/add-area`}
                    state={{ foodSpace, prevPath: location.pathname }}
                >
                    <li key={`add-more`} className="bg-white drop-shadow-md rounded-lg p-4 min-h-[75px] max-h-[75px] flex flex-col items-center justify-center">
                        <FiPlusCircle className='block text-secondary text-lg' />
                        <p className='text-secondary text-sm mt-1'>Add Another Area</p>
                    </li>
                </Link>
            </ul>
        </div>



    )
}

export default Areas