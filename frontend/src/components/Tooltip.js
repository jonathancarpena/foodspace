import React, { useState } from 'react'

// Components
import TransitionOpacity from './Transition/TransitionOpacity'

const directionStyles = {
    top: {
        placement: '-top-[3rem] left-[50%] -translate-x-[50%]',
        triangle: {
            placement: 'left-[50%] top-[60%] -translate-x-[50%]',
            transform: 'rotate(270)'
        }
    },
    bottom: {
        placement: '-bottom-[6.7rem] left-[50%] -translate-x-[50%]',
        triangle: {
            placement: 'left-[50%] -top-[60%] -translate-x-[50%]',
            transform: 'rotate(90)'
        }
    },
    left: {
        placement: '',
        triangle: {
            placement: '',
            transform: ''
        }
    },
    right: {
        placement: 'translate-y-[20%] translate-x-[70%]',
        triangle: {
            placement: '',
            transform: ''
        }
    }
}
function Tooltip({ classname, message, children, direction = "top", sx }) {
    const [showTooltip, setShowTooltip] = useState(false)

    return (
        <div className={`relative inline-block ${sx}`}>
            {/* Tooltip */}
            <TransitionOpacity show={showTooltip}>
                <div className={`absolute ${directionStyles[direction].placement} `}>
                    <span className={`${classname} fill-neutral-800 relative flex flex-col w-max`}>
                        {/* Message */}
                        <span className={`bg-neutral-800 capitalize text-white  px-5 py-2 rounded-lg z-10 text-sm font-semibold w-full`}>
                            {message}
                        </span>

                        {/* Triangle */}
                        <span className={`absolute ${directionStyles[direction].triangle.placement} `}>
                            <svg className='z-0' width="15" height="40" transform={`${directionStyles[direction].triangle.transform} `} xmlns=" http://www.w3.org/2000/svg" viewBox="280 320 220 200">
                                <polygon points="500,600 300,420 500,240" />
                            </svg>
                        </span>

                    </span>
                </div>
            </TransitionOpacity>

            {/* Trigger */}
            <span
                className=''
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                {children}
            </span>
        </div>


    )
}

export default Tooltip