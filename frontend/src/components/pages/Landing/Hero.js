import React from 'react'

// Router
import { Link } from 'react-router-dom'

// Components
import Button from '../../Button'

// Images
import hero from '../../../images/landing/hero.png'
// import hero from '../../../images/landing/hero-2.png'

// Constants
const trustedTeams = [
    "Foodology", "mixedFood", "misohungry", "MatchFood", "stomachspace"
]


function Hero() {
    return (
        <section className='text-center flex flex-col justify-center items-center space-y-5 py-3 px-5'>

            {/* Image */}
            <img src={hero} className='grayscale contrast-200 w-[250px] ' />

            {/* Heading */}
            <h1 className='text-4xl tracking-tight font-extrabold  text-main'>
                <span className='block'>One foodspace.</span>
                <span className='block'>Every spot.</span>
            </h1>

            {/* Subheading */}
            <h2 className=' text-secondary text-lg tracking-tight'>
                We’re more than a doc.
                Or a table. Customize Notion
                to work the way you do.
            </h2>

            {/* Call To Action */}
            <Link to='/signup'>
                <Button variant='contained' sx='w-[200px]'>
                    Try FoodSpace Free
                </Button>
            </Link>

            {/* Credientials */}
            <div className='py-5'>
                <p className='text-secondary uppercase text-xs tracking-wider'>
                    Trusted by teams at
                </p>
                <div className='flex flex-wrap justify-center w-[70%] mx-auto space-x-2 mt-2'>
                    {trustedTeams.map((item, idx) => {
                        let lastChild = false;
                        if (idx === trustedTeams.length - 1) {
                            lastChild = true
                        }
                        return (
                            <span key={item} className='text-xs uppercase  text-gray-600 my-2'>
                                {item} {lastChild ? '' : '-'}
                            </span>
                        )
                    })}
                </div>
            </div>

        </section>
    )
}

export default Hero