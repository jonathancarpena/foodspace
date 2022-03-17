import React from 'react'

// Components
import Hero from '../components/pages/Landing/Hero'
import Purpose from '../components/pages/Landing/Purpose'
import Instructions from '../components/pages/Landing/Instructions'
import Reviews from '../components/pages/Landing/Reviews'
import CallToAction from '../components/pages/Landing/CallToAction'


function Home() {
    return (
        <div className="bg-white px-7 ">
            <Hero />
            <Purpose />
            <Instructions />
            <Reviews />
            <CallToAction />
        </div>
    )
}

export default Home