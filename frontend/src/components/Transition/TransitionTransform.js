import React from 'react'

// Component
import { Transition } from '@tailwindui/react'

import TransitionOpacity from './TransitionOpacity'

function TransitionTransform({ children, show, direction = "ltr", sx }) {
    // const directionOptions = {
    //     ltr: {
    //         enter: ''
    //     }
    // }
    if (direction === "ltr") {
        return (
            <Transition show={show} className={`${sx} relative z-[100]`}  >
                <Transition.Child
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0 "
                    leaveTo="-translate-x-full "
                >
                    <TransitionOpacity show={show} hidden={false}>
                        {children}
                    </TransitionOpacity>

                </Transition.Child>
            </Transition >
        )
    } else if (direction === "rtl") {
        return (
            <Transition show={show} className=' relative z-[100] ' >
                <Transition.Child
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full "
                >
                    <TransitionOpacity show={show} hidden={false}>
                        {children}
                    </TransitionOpacity>
                </Transition.Child>
            </Transition >
        )
    }

}

export default TransitionTransform