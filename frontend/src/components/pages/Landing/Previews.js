import React, { useState } from 'react'

// Components
import TransitionOpacity from '../../TransitionOpacity'

// Icons
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'

// Images
import ex1 from '../../../images/landing/purpose.jpg'
import ex2 from '../../../images/landing/purpose-2.PNG'
import ex3 from '../../../images/landing/purpose-3.PNG'

// Constants
const screenShots = [
    { img: ex1, title: 'Account' },
    { img: ex2, title: 'Food' },
    { img: ex3, title: 'Barcode' },
    { img: ex1, title: 'Invite' },
    { img: ex2, title: 'About' },
    { img: ex3, title: 'Something' },
]

const Slide = ({ img, title, slideNumber, index }) => {
    return (

        <TransitionOpacity show={index === slideNumber}>
            <div >
                {/* Image */}
                <img src={img} className='h-[270px] mb-3 drop-shadow-md rounded-md cursor-pointer hover:brightness-[0.9] transition-[filter] ease-in-out duration-150 ' />

                {/* Title */}
                <span className=' font-semibold hover:underline  cursor-pointer'>
                    {title}
                </span>
            </div>
        </TransitionOpacity>
    )
}

function Previews() {
    const [slideNumber, setSlideNumber] = useState(0)

    function handleSlideChange(advance) {
        if (advance) {
            if (slideNumber >= (screenShots.length - 1)) {
                setSlideNumber(0)
            } else {
                setSlideNumber(prevState => prevState + 1)
            }

        } else {
            if (slideNumber <= 0) {
                setSlideNumber(screenShots.length - 1)
            } else {
                setSlideNumber(prevState => prevState - 1)
            }

        }
    }

    return (
        <div className='mt-12'>
            {screenShots.map((item, index) => (
                <Slide key={item.title} img={item.img} title={item.title} slideNumber={slideNumber} index={index} />
            ))}

            <div className='mt-8'>
                <button onClick={() => handleSlideChange(false)} className='p-3 border-[1px] rounded-md hover:bg-neutral-100 mr-1'>
                    <FiArrowLeft />
                </button>
                <button onClick={() => handleSlideChange(true)} className='p-3 border-[1px] rounded-md hover:bg-neutral-100 ml-1'>
                    <FiArrowRight />
                </button>
            </div>

        </div>
    )
}

export default Previews