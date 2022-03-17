import React from 'react'

// Images
import groceries from '../../../images/landing/instructions-1.png'
import details from '../../../images/landing/instructions-2.png'

// Icons
import { FiArrowRight } from 'react-icons/fi'

// Components
import Previews from './Previews'

function Instructions() {

    return (
        <section className='py-14 border-b-[1px]'>

            <div className='text-center mb-8 '>
                <div className='relative inline-block'>
                    <img src={details} className='absolute h-[30px] top-[-15px] left-[-20px] rotate-[60deg] scale-[-1]' />
                    <img src={groceries} className='inline-block grayscale contrast-200 h-[100px] mr-2' />
                </div>

                <div className='relative inline-block'>
                    <img src={details} className='absolute h-[30px] top-[-25px] right-[-25px] rotate-[150deg] scale-[-1]' />
                    <img src={groceries} className='inline-block grayscale contrast-200 h-[100px] ml-2 ' />
                </div>
            </div>

            {/* Heading and Call To Action */}
            <div>

                {/* Heading */}
                <h2 className='text-3xl tracking-tight font-semibold'>
                    Start with a template.
                </h2>
                <h2 className='text-3xl tracking-tight font-semibold mb-3'>
                    Modify it however you need.
                </h2>

                {/* Subheading */}
                <p className='text-secondary text-lg tracking-tight mb-4'>
                    Choose from thousands of free, pre-built setups — for work and life.
                </p>

                {/* Action */}
                <button className='font-semibold text-sm border-2 rounded-md px-3.5 py-2 hover:bg-neutral-100'>
                    See all templates <FiArrowRight className='inline-block ml-0.5 text-[0.9rem]' />
                </button>


                <Previews />

            </div>


        </section>

    )
}

export default Instructions