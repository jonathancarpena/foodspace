import React from 'react'

// Icons
import { BiFridge } from 'react-icons/bi'

function Footer() {
    return (
        <footer className='py-7 px-7 bg-neutral-100 h-[90vh]'>
            <p>
                <BiFridge className='inline-block text-4xl' />
                <span className='font-semibold tracking-tight'>FoodSpace</span>
            </p>

            <p className='text-secondary pt-7'>@2022 Mister Jack</p>
        </footer>
    )
}

export default Footer