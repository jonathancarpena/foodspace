// Router
import { Link } from 'react-router-dom'

// Images
import groceries from '../../../images/landing/instructions-1.png'
import details from '../../../images/landing/instructions-2.png'

// Icons
import { FiArrowRight } from 'react-icons/fi'

// Components
import Previews from './Previews'

function Instructions() {

    return (
        <section className='py-14 border-b-[1px] w-full '>

            <div className='text-center mb-8 '>
                <div className='relative inline-block'>
                    <img alt='details' src={details} className='absolute h-[30px] top-[-15px] left-[-20px] rotate-[60deg] scale-[-1]' />
                    <img alt='groceries' src={groceries} className='inline-block grayscale contrast-200 h-[100px] mr-2' />
                </div>

                <div className='relative inline-block'>
                    <img alt='details-2' src={details} className='absolute h-[30px] top-[-25px] right-[-25px] rotate-[150deg] scale-[-1]' />
                    <img alt='groceries-2' src={groceries} className='inline-block grayscale contrast-200 h-[100px] ml-2 ' />
                </div>
            </div>

            {/* Heading and Call To Action */}
            <div>

                {/* Heading */}
                <h2 className='text-3xl tracking-tight font-semibold mb-2'>
                    See a quick preview on how you can start today.
                </h2>

                {/* Subheading */}
                <p className='text-secondary text-lg tracking-tight mb-4'>
                    Create as many food spaces as you need. Invite as many tummys it feeds.
                </p>

                {/* Action */}
                <Link to='/signup'>
                    <button className='font-semibold text-sm border-2 rounded-md px-3.5 py-2 hover:bg-neutral-100'>
                        Try it for yourself <FiArrowRight className='inline-block ml-0.5 text-[0.9rem]' />
                    </button>
                </Link>


                <Previews />

            </div>


        </section>

    )
}

export default Instructions