import React from 'react'

// Router
import { Link } from 'react-router-dom'

// Icons
import { BiArrowBack } from 'react-icons/bi'
import { GrPowerReset } from 'react-icons/gr'
import { MdEmail } from 'react-icons/md'
import { AiOutlineLink } from 'react-icons/ai'
import { FaAngleRight, FaTrash, FaBell } from 'react-icons/fa'

// Components
import Tooltip from '../../../components/Tooltip'

const manageOptions = [
    { link: '/account/manage/delete', header: 'delete account', icon: <FaTrash className='inline-block mb-1  mr-1' /> },
    { link: '', header: 'reset password', icon: <GrPowerReset className='inline-block mb-1 mr-1' /> },
    { link: '', header: 'notifications', icon: <FaBell className='inline-block mb-1  mr-1' /> },
    { link: '', header: 'change email', icon: <MdEmail className='inline-block mb-1  mr-1' /> },
    { link: '', header: 'link accounts', icon: <AiOutlineLink className='inline-block mb-1  mr-1' /> },
]

function ManageAccount() {
    return (
        <div className='min-h-screen p-7'>
            {/* Back Button */}
            <Link to={'/account'}>
                <span className='fixed top-7 left-7'>
                    <BiArrowBack className='inline-block text-[1rem] text-main mr-1 mb-1' />
                </span>
            </Link>

            {/* Header */}
            <h1 className='text-center text-lg font-semibold'>
                Manage
            </h1>

            <div className='flex flex-col mt-10 space-y-5'>
                {manageOptions.map((item) => {
                    if (item.link === '') {
                        return (
                            <div onClick={() => alert('Feature not supported yet.')} className='bg-white border-2 border-white flex justify-between p-5 rounded-2xl drop-shadow-lg active:bg-primary-200 cursor-pointer active:drop-shadow-2xl active:border-primary-500'>
                                <span className='capitalize text-main'>{item.icon} {item.header}</span>
                                <FaAngleRight className='inline-block ml-auto text-end text-xl text-secondary' />
                            </div>
                        )
                    } else {
                        return (
                            <Link to={item.link}>
                                <div className='bg-white border-2 border-white flex justify-between p-5 rounded-2xl drop-shadow-lg active:bg-primary-200 cursor-pointer active:drop-shadow-2xl active:border-primary-500'>
                                    <span className='capitalize text-main'>{item.icon} {item.header}</span>
                                    <FaAngleRight className='inline-block ml-auto text-end text-xl text-secondary' />
                                </div>
                            </Link>

                        )
                    }
                })}
            </div>
        </div>
    )
}

export default ManageAccount