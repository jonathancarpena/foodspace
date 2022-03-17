import React from 'react'

// Component
import { Transition } from '@tailwindui/react'

function TransitionOpacity({ children, show }) {
    return (
        <Transition show={show} className=' z-[100] '>
            <Transition.Child
                enter={`transition-opacity ease-in-linear duration-200`}
                enterFrom="opacity-0 visible"
                enterTo="opacity-1"
                leave={`transition-opacity ease-in-linear duration-200`}
                leaveFrom="opacity-1"
                leaveTo="opacity-0 hidden">
                {children}
            </Transition.Child>
        </Transition>
    )
}

export default TransitionOpacity