import React from 'react'


const defaultButtonStyles = 'inline-block w-max font-semibold rounded-sm m-1 ring-[1px]'

const sizeOptions = {
    sm: 'text-sm px-2 py-2',
    md: 'text-base px-4 py-2',
    lg: 'text-base px-6 py-4'
}

const variantOptions = {
    outline: `${defaultButtonStyles}  ring-primary-500 text-primary-500 bg-primary-50 hover:ring-primary-600 hover:text-primary-600  cursor-pointer`,
    contained: `${defaultButtonStyles}  ring-primary-500 text-white bg-primary-500 hover:bg-primary-600 hover:ring-primary-600 cursor-pointer`
}

const disabledStyles = {
    outline: `${defaultButtonStyles} ring-primary-100 bg-white text-primary-100 cursor-default`,
    contained: `${defaultButtonStyles} ring-primary-100 bg-primary-100 text-white cursor-default`
}

function Button({ children, onClick, variant = 'contained', disabled = false, size = 'sm', sx }) {
    return (
        <button
            onClick={onClick}
            className={`${disabled ? disabledStyles[variant] : variantOptions[variant]} ${sizeOptions[size]} ${sx} `}>
            {children}
        </button>
    )
}

export default Button