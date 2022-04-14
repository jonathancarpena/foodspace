import React, { useState } from 'react'

// Components
import TransitionOpacity from './Transition/TransitionOpacity'

const directionStyles = {
    sm: {
        top: {
            placement: '-top-[2rem] left-[50%] -translate-x-[50%]',
            triangle: {
                placement: 'left-[50%] top-[20%] -translate-x-[50%]',
                transform: 'rotate(270)'
            }
        },
        bottom: {
            placement: '-bottom-[6.5rem] left-[50%] -translate-x-[50%]',
            triangle: {
                placement: 'left-[50%] -top-[90%] -translate-x-[50%]',
                transform: 'rotate(90)'
            }
        },
    },
    md: {
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
    }

}

const sizeStyles = {
    sm: {
        box: 'px-2.5 py-1 text-xs rounded-md',
        triangle: directionStyles['sm'],
    },
    md: {
        box: 'px-5 py-2 text-sm rounded-lg',
        triangle: directionStyles['md']
    }
}
function Tooltip({ classname, message, children, size = "md", direction = "top", sx }) {
    const [showTooltip, setShowTooltip] = useState(false)


    return (
        <div className={`relative inline-block z-10 ${sx}`}>
            {/* Tooltip */}
            <TransitionOpacity show={showTooltip}>
                <div className={`absolute ${directionStyles[size][direction].placement} `}>
                    <span className={`${classname} fill-neutral-800 relative flex flex-col w-max`}>
                        {/* Message */}
                        <span className={`${sizeStyles[size].box} bg-neutral-800 capitalize text-white   z-10  font-semibold w-full`}>
                            {message}
                        </span>

                        {/* Triangle */}
                        <span className={`absolute ${sizeStyles[size].triangle[direction].triangle.placement} `}>
                            <svg className='z-0' width="15" height="40" transform={`${sizeStyles[size].triangle[direction].triangle.transform}`} xmlns=" http://www.w3.org/2000/svg" viewBox="280 320 220 200">
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