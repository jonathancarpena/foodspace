import React from 'react'

// Component
import { Transition } from '@tailwindui/react'

function TransitionOpacity({ children, show, hidden = true, relative = true }) {
    return (
        <Transition show={show} className={`${relative && 'relative'} z-[100]`}>
            <Transition.Child
                enter={`transition-opacity ease-in-linear duration-300`}
                enterFrom="opacity-0 "
                enterTo="opacity-1"
                leave={`transition-opacity ease-in-linear duration-300`}
                leaveFrom="opacity-1"
                leaveTo={`opacity-0 ${hidden ? 'hidden' : ''}`}>
                {children}
            </Transition.Child>
        </Transition>
    )
}

export default TransitionOpacity