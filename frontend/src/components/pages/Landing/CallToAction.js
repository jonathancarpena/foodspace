import React from 'react'

// Router
import { Link } from 'react-router-dom'

// Icons
import { BiFridge } from 'react-icons/bi'

// Components
import Button from '../../../components/Button'

function CallToAction() {
    return (
        <section className='text-center border-y-2 py-16'>

            {/* Brand Icon */}
            <BiFridge className='block mx-auto text-6xl bg-white drop-shadow-lg rounded-xl   ' />

            {/* Header */}
            <h2 className='block my-6 font-bold text-3xl tracking-tight'>
                Try FoodSpace today
            </h2>

            {/* Subheading */}
            <div className='text-secondary mb-4'>
                <p>Get started for free.</p>
                <p>Add your whole team as your needs grow.</p>
            </div>

            {/* Call to Action */}
            <Link to='/signup'>
                <Button sx='w-[250px] mb-3'>
                    Try FoodSpace free
                </Button>
            </Link>

            {/* Link to Contact */}
            <span className='block text-secondary'>
                Have lots of tummys?
                <span className='border-b-[1px] border-secondary ml-1 hover:text-primary-500 hover:border-b-0 cursor-pointer '>
                    Contact sales
                </span>
            </span>

        </section>
    )
}

export default CallToAction