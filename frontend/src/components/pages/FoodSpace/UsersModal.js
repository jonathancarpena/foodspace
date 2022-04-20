import React from 'react'

// Icons
import { FaCrown } from 'react-icons/fa'

// Components
import Modal from '../../Modal'
import Avatar from '../Account/Avatar'

const UserContent = ({ admin, users }) => {
    const overflow = users.length > 5
    return (
        <ul className={`m-5 flex flex-col  max-h-[500px] ${overflow ? 'overflow-y-scroll' : ''} `} >
            <li className='flex space-x-5 items-center mx-5 py-2'>
                <Avatar bg={admin.avatar.favoriteColor} emoji={admin.avatar.emoji} />
                <div className=''>
                    <p className='capitalize'>{admin.first_name} {admin.last_name}</p>
                    <p className='text-secondary'>{admin.email}</p>
                </div>
                <span className='text-secondary'>(Admin)</span>
            </li>
            {users.map((user) => (
                <li key={user._id} className='flex space-x-5 items-center mx-5 border-t-2 py-2'>
                    <Avatar bg={user.avatar.favoriteColor} emoji={user.avatar.emoji} />
                    <div className=''>
                        <p className='capitalize'>{user.first_name} {user.last_name}</p>
                        <p className='text-secondary'>{user.email}</p>
                    </div>
                </li>
            ))}
        </ul>
    )
}
function UsersModal({ showModal, setShowModal, foodSpace }) {

    return (
        <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            header={`${foodSpace.name}'s Users`}
            content={
                <UserContent
                    admin={foodSpace.admin}
                    users={foodSpace.users}
                />
            }
            sx={'z-[100]'}

        />
    )
}

export default UsersModal