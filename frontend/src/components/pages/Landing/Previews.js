import { useCallback, useRef } from 'react'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// Icons
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'

// Images
import ex2 from '../../../images/landing/instructions-step-2.PNG'
import ex3 from '../../../images/landing/instructions-step-3.PNG'
import ex4 from '../../../images/landing/instructions-step-4.PNG'
import ex5 from '../../../images/landing/instructions-step-5.PNG'

// Constants
const screenShots = [
    { img: ex2, title: 'Create your Profile' },
    { img: ex3, title: 'Create a Food Space' },
    { img: ex4, title: 'Create a Product' },
    { img: ex5, title: 'Add your Product' },
]



function Previews() {
    const sliderRef = useRef(null)

    // Carousel Navigator Functions
    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);
    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);


    return (
        <div className='mt-12 w-full'>



            <Swiper
                ref={sliderRef}
                spaceBetween={0}
                slidesPerView={1}
                className=" w-[350px] relative right-2"
                centeredSlides={true}
            >
                {screenShots.map((item) => (

                    <SwiperSlide key={`preview-${item.title} `} className='w-full h-auto flex flex-col space-y-3'>

                        <div className='w-full h-[500px] overflow-hidden rounded-xl border-2 drop-shadow-lg'>
                            <img alt={item.img} src={item.img} className='scale-105 relative top-2 ' />
                        </div>



                        <span className=' font-semibold hover:underline  cursor-pointer'>
                            {item.title}
                        </span>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className='w-full flex justify-end space-x-2 mt-4 relative right-2'>
                <button onClick={handlePrev} className='bg-white border-2 p-2 rounded-md'><FiArrowLeft /></button>
                <button onClick={handleNext} className='bg-white border-2 p-2 rounded-md'><FiArrowRight /></button>
            </div>

        </div>
    )
}

export default Previews


// Keep Track
// Never ask What's in The Fridge
// Reduce the amount 