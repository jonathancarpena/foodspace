import React, { useState } from 'react'

// Components
import TransitionTransform from '../../Transition/TransitionTransform'
import Modal from '../../Modal'
import Button from '../../Button'

// Constants
import { emojis, tailwindColors } from '../../../lib/constants'


export function AvatarModal({ showModal, setShowModal, handleComplete }) {
    const [avatar, setAvatar] = useState({
        emoji: '🍇',
        favoriteColor: "bg-slate-300"
    })

    const [lastStep, setLastStep] = useState(false)

    function handleClick(e, content) {
        if (content === "emoji") {
            setAvatar({ ...avatar, emoji: e.target.innerText })
        } else if (content === "favoriteColor") {
            setAvatar({ ...avatar, favoriteColor: e.target.textContent })
        }
    }

    const modalContent =
        <div className='flex flex-col  pt-5 mx-10 '>

            {/* Avatar */}
            <Avatar
                emoji={avatar.emoji}
                bg={avatar.favoriteColor}
                size="lg"
                ring={true}
                sx="mx-auto"
            />


            <div className='pt-7 pb-3 px-5 text-center flex justify-around '>
                <button onClick={() => setLastStep(false)} className={`font-semibold border-b-2 ${!lastStep ? 'text-primary-500 border-b-primary-400' : 'text-secondary border-b-white'}`} >
                    Emoji
                </button>
                <button onClick={() => setLastStep(true)} className={`font-semibold border-b-2 ${lastStep ? 'text-primary-500 border-b-primary-400' : 'text-secondary border-b-white'}`} >
                    Color
                </button>
            </div>


            <div className='min-h-[300px] w-[250px] mx-auto'>
                {/* Emoji Selections */}
                <TransitionTransform show={!lastStep} direction="ltr" >
                    <ul className=' absolute mx-auto py-2 h-[300px] w-[250px] overflow-y-scroll flex flex-wrap justify-evenly  items-center'>
                        {emojis.map((item, idx) => (
                            <li key={idx}
                                onClick={(e) => handleClick(e, "emoji")}
                                className='text-3xl cursor-pointer m-2'>
                                <span className={`${avatar.emoji === item ? 'bg-primary-400' : 'hover:bg-neutral-300'}  rounded-full p-1`}>
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </TransitionTransform>

                {/* Favorite Color Selections */}
                <TransitionTransform show={lastStep} direction="rtl" >
                    <ul className='absolute mx-auto py-2 h-[300px] w-[250px] overflow-y-scroll flex flex-wrap justify-evenly'>
                        {tailwindColors.map((item, idx) => (
                            <li key={idx}
                                onClick={(e) => handleClick(e, "favoriteColor")}
                                className={` ${avatar.favoriteColor === item ? 'ring-4 ring-main' : ``} ${item} rounded-md h-[50px] w-[50px] m-2 cursor-pointer`}>
                                <span className={`hidden`}>
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </TransitionTransform>

            </div>



        </div>

    const modalFooter =
        <div className='py-6 px-5 mx-10 text-right'>
            <Button
                sx='w-full'
                onClick={() => {
                    setShowModal(false)
                    handleComplete(avatar)
                }}>
                Done
            </Button>
        </div>

    return (
        <div>
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
                header={`Create an Avatar `}
                content={modalContent}
                footer={modalFooter}
            />
        </div>
    )
}

function Avatar({ bg = "bg-neutral-300", emoji = "🥧", size = "sm", ring = false, sx, onClick, key = '' }) {
    const sizeOptions = {
        xs: {
            bg: "h-[50px]",
            emoji: "text-[25px]"
        },
        sm: {
            bg: "h-[65px]",
            emoji: "text-[35px]"
        },
        md: {
            bg: "h-[80px]",
            emoji: "text-[45px]"
        },
        lg: {
            bg: "h-[95px]",
            emoji: "text-[55px]"
        },
        xl: {
            bg: "h-[105px]",
            emoji: "text-[65px] "
        },
    }
    return (
        <div key={key} onClick={onClick} className={`w-max ${sizeOptions[size].bg} rounded-[100%] ${bg} ${ring ? 'ring-4 ring-white drop-shadow-lg' : ''} flex justify-center items-center cursor-default rounded-full  text-center ${sx}`}>
            <span className={`${sizeOptions[size].emoji} p-2`}>
                {emoji}
            </span>
        </div>

    )
}


export default Avatar