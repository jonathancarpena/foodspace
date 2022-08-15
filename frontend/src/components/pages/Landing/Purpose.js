import React from 'react'

// Images
import image1 from '../../../images/landing/purpose.PNG'
import image2 from '../../../images/landing/purpose-2.PNG'
import image3 from '../../../images/landing/purpose-3.PNG'

// Icons
import { CgClipboard, CgComment, CgTrash } from 'react-icons/cg'

// Constants
const contentSections = [
    {
        icon: <CgComment />,
        heading: 'Never ask “What’s in the fridge?” again',
        message: 'Simply open your created FoodSpace and check if the items there.',
        image: image1
    },
    {
        icon: <CgClipboard />,
        heading: 'Keep track without the chaos',
        message: 'Log all your groceries with a quick scan or search through our food database curated by our trusted users.',
        image: image2
    },
    {
        icon: <CgTrash />,
        heading: 'Reduce the amount of food waste.',
        message: "Don't remember what food went bad? Get reminders of when your food goes bad.",
        image: image3
    },
]

const Section = ({ content }) => {
    const { icon, heading, message, image } = content
    return (
        <section className='flex flex-col  space-y-6 tracking-tight'>

            <div>
                {/* Icon */}
                <span className='block text-7xl'>
                    {icon}
                </span>
                {/* Heading */}
                <h3 className='text-xl  text-main font-semibold mt-3'>
                    {heading}
                </h3>
                {/* Subheading */}
                <p className='text-lg text-secondary'>
                    {message}
                </p>
            </div>

            {/* Image */}
            <div className='border-2 w-full h-[500px] overflow-hidden rounded-xl drop-shadow-lg'>
                <img alt={image} src={image} className='scale-105 relative top-2 ' />
            </div>

        </section>
    )
}


function Purpose() {
    return (
        <section className='flex flex-col space-y-12 pb-14 border-b-[1px]'>
            {contentSections.map((piece) => (
                <Section key={piece.heading} content={piece} />
            ))}
        </section>
    )
}

export default Purpose