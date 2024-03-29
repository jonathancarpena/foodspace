import React, { useState } from 'react'

// Components
import TransitionOpacity from './Transition/TransitionOpacity'

export const DropdownItem = ({ children, styles, onClick = () => null }) => {
    return (
        <li onClick={onClick} className={`${styles}`}>{children}</li>
    )

}
function Dropdown({ children, button, select = false, direction = "left", sx, listSx }) {
    const [showDropdown, setShowDropdown] = useState(false)
    const directionStyles = {
        left: 'right-0',
        right: 'left-0',
        center: 'left-[50%] -translate-x-[50%] '
    }

    function handleSelectClick(onClick) {
        onClick()
        setShowDropdown(false)
    }

    return (
        <div className={`relative inline-block ${sx} `}>

            {/* Trigger */}
            <span
                className=''
                onClick={() => setShowDropdown(!showDropdown)}
            >
                {button}
            </span>
            {/* Dropdown */}
            <TransitionOpacity show={showDropdown}>
                <ul className={`absolute top-2 ${directionStyles[direction]} bg-white rounded-lg drop-shadow-lg flex flex-col w-max overflow-hidden ${listSx}`}>
                    {React.Children.map(children, (child, idx) => {
                        let clickFn = null
                        if (child.props.onClick) {
                            if (select) {
                                clickFn = () => handleSelectClick(child.props.onClick)
                            } else {
                                clickFn = child.props.onClick
                            }

                        }

                        let styles
                        if (child.props.sx) {
                            styles = `${child.props.sx}`
                        } else {
                            styles = `hover:bg-neutral-200 list-none px-4 py-2 text-sm ${clickFn ? 'cursor-pointer' : 'cursor-default'} ${child.props.seperateLink ? 'border-t-2 py-2.5' : ''} `
                        }

                        return React.cloneElement(child, { styles, onClick: clickFn })
                    })}
                </ul>
            </TransitionOpacity>
        </div>


    )
}

export default Dropdown