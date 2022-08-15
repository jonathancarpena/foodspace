import React from 'react'

// Icons
import { BiFridge } from 'react-icons/bi'

function Footer() {
    return (
        <footer className='relative py-7 px-7 bg-neutral-100 w-full  text-center'>
            <p>
                <BiFridge className='inline-block text-4xl' />
                <span className='font-semibold tracking-tight'>FoodSpace</span>
            </p>

            <p className='text-secondary pt-7  '>ⓒ 2022 FoodSpace</p>
        </footer>
    )
}

export default Footer