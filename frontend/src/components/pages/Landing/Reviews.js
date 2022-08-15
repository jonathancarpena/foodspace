import React from 'react'

// Images
import main from '../../../images/landing/reviews-main.png'
import image1 from '../../../images/landing/reviews-1.png'
import image2 from '../../../images/landing/reviews-2.png'
import image3 from '../../../images/landing/reviews-3.png'


// Icons
import { FiArrowRight } from 'react-icons/fi'
import { FaBuilding } from 'react-icons/fa'

// Constants
const reviewsData = [
    {
        img: image1,
        company: 'MatchFood',
        message: 'FoodSpace is a food management system that adapts to your needs. It’s as minimal or as powerful as you need it to be.',
        name: 'John Smith',
        position: 'Director of Product'
    },
    {
        img: image2,
        company: 'StomachSpace',
        message: 'FoodSpace continues to be the easiest way to get your groceries centralized somewhere and shout it out to someone else. For us, that’s extremely important because our family is always hungry.',
        name: 'Kate Smith',
        position: 'Co-founder and Head of Engineering'
    },
    {
        img: image3,
        company: 'Figs',
        message: 'FoodSpace ease of use is one of its hallmarks. It helps you visually navigate your food spaces and remember where something is.',
        name: 'Alex Smith',
        position: 'Head of People Ops'
    },
]

// Review Component
const Review = ({ content }) => {
    const { img, company, message, name, position } = content
    return (
        <div className='flex flex-col space-y-4'>

            {/* Company and Brand Icon */}
            <p className='font-semibold text-lg'>
                <FaBuilding className='inline-block mb-1 text-xl mr-2 text-primary-500' />
                {company}
            </p>

            {/* Review */}
            <p className='text-xl tracking-tight'>
                "{message}"
            </p>

            <div className='flex space-x-3'>
                {/* Avatar */}
                <img alt='avatar' src={img} className='w-[55px] grayscale contrast-200' />

                {/* Name and Position */}
                <div>
                    <span className='block text-sm'>{name}</span>
                    <span className='block text-sm text-secondary'>{position}</span>
                </div>
            </div>
        </div>
    )
}

function Reviews() {
    return (
        <section className='pb-14'>

            {/* Heading */}
            <div className='flex flex-col'>
                {/* Image */}
                <img alt='main' src={main} className='grayscale contrast-150' />

                <div>
                    {/* Heading */}
                    <h3 className='text-3xl tracking-tight font-semibold mb-5'>
                        Used by the world's best grocery getters
                    </h3>

                    {/* Action */}
                    <button className='font-semibold text-sm border-2 rounded-md px-3.5 py-2 hover:bg-neutral-100'>
                        Read all customer stories <FiArrowRight className='inline-block ml-0.5 text-[0.9rem]' />
                    </button>
                </div>


            </div>


            {/* Reviews */}
            <section className='mt-10'>
                <ul className='flex flex-col space-y-10'>
                    {reviewsData.map((item) => (
                        <Review key={item.company} content={item} />
                    ))}
                </ul>
            </section>
        </section>
    )
}

export default Reviews