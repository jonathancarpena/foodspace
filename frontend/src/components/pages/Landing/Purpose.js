import React from 'react'

// Images
import image1 from '../../../images/landing/purpose.jpg'
import image2 from '../../../images/landing/purpose-2.PNG'
import image3 from '../../../images/landing/purpose-3.PNG'

// Icons
import { CgClipboard, CgComment, CgTrash, CgInsights } from 'react-icons/cg'

// Constants
const contentSections = [
    {
        icon: <CgClipboard className='inline-block' />,
        heading: 'Keep track without the chaos',
        message: 'Connect your teams, projects, and docs in Notion — so you can bust silos and move as one.',
        image: image1
    },
    {
        icon: <CgComment />,
        heading: 'Never ask “What’s in the fridge?” again',
        message: 'Connect your teams, projects, and docs in Notion — so you can bust silos and move as one.',
        image: image2
    },
    {
        icon: <CgInsights />,
        heading: 'Optimize meals with the right timing.',
        message: 'Connect your teams, projects, and docs in Notion — so you can bust silos and move as one.',
        image: image1
    },
    {
        icon: <CgTrash />,
        heading: 'Reduce the amount food waste.',
        message: 'Connect your teams, projects, and docs in Notion — so you can bust silos and move as one.',
        image: image3
    },
]

const Section = ({ content }) => {
    const { icon, heading, message, image } = content
    return (
        <section className='flex flex-col md:flex-row space-y-5 tracking-tight'>

            <div>
                {/* Icon */}
                <span className='block text-7xl'>
                    {icon}
                </span>
                {/* Heading */}
                <h3 className='text-xl  text-main font-semibold'>
                    {heading}
                </h3>
                {/* Subheading */}
                <p className='text-lg text-secondary'>
                    {message}
                </p>
            </div>

            {/* Image */}
            <img src={image} className='rounded-lg drop-shadow-lg' />
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