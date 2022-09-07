import { useState } from 'react'
import axios from 'axios'

// Router
import { Link, useLocation, useParams } from 'react-router-dom'

// Redux
import { refreshMe } from '../../../../../redux/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'

// Urls
import { API } from '../../../../../lib/urls'

// Icons
import { FiTrash, FiPlusCircle } from 'react-icons/fi'

// Components
import Avatar from '../../../../../components/pages/Account/Avatar'
import Loading from '../../../../Layout/Loading'

function Users({ foodSpace }) {
    const { name } = useParams()
    const location = useLocation()

    const dispatch = useDispatch()
    const { token } = useSelector(state => state.auth)
    const [users, setUsers] = useState([...foodSpace.users])
    const [isLoading, setIsLoading] = useState(false)


    async function handleRemove(user) {
        const userConfirm = window.confirm(`Are you sure you want to remove ${user.email} from the FoodSpace?`)
        if (userConfirm) {
            setIsLoading(true)
            const res = await axios({
                method: "DELETE",
                url: `${API.ADMIN.removeUser}`,
                data: {
                    user_id: user._id,
                    foodSpace_id: foodSpace._id
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (res.status === 200) {
                const updatedUsers = users.filter((item) => item._id !== user._id)
                setIsLoading(false)
                dispatch(refreshMe({ forceRefresh: true }))
                setUsers({ ...foodSpace, users: [...updatedUsers] })
            }
        }

    }




    if (isLoading || !foodSpace) {
        return <Loading />
    }
    return (
        <div className="">
            <ul className='flex flex-col space-y-3'>
                {users.map((item, idx) => (
                    <li key={item.email} className="bg-white drop-shadow-md rounded-lg p-4 min-h-[90px] max-h-[90px] flex justify-between w-full">
                        <div className='bg-white  flex items-center space-x-4 '>
                            <Avatar bg={item.avatar.favoriteColor} emoji={item.avatar.emoji} size="xs" />
                            <div className='flex flex-col justify-center '>
                                <p className='capitalize font-semibold text-lg'>{item.first_name} {item.last_name}</p>
                                <p className='text-secondary'>{item.email}</p>
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
                    to={`/foodSpace/admin/${name}/add-user`}
                    state={{ foodSpace, prevPath: location.pathname }}
                >
                    <li key={`add-more`} className="bg-white drop-shadow-md rounded-lg p-4 min-h-[75px] max-h-[75px] flex flex-col items-center justify-center">
                        <FiPlusCircle className='block text-secondary text-lg' />
                        <p className='text-secondary text-sm mt-1'>Add Another User</p>
                    </li>
                </Link>
            </ul>
        </div>



    )
}

export default Users