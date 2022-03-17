import React, { useState, useEffect } from 'react'

// Router
import { Link } from 'react-router-dom'

// Components
import Button from '../Button'

// Icons
import { BiFridge } from 'react-icons/bi'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

// Constants
const navLinks = [
    { placeholder: 'About', link: '' },
    { placeholder: 'Products', link: '' },
    { placeholder: 'Contact', link: '' },
]

function Navbar() {
    const [openMenu, setOpenMenu] = useState(false)
    const [scroll, setScroll] = useState(window.scrollY)

    const handleScroll = () => {
        setScroll(window.scrollY)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <nav className={`bg-white fixed top-0 z-[100] w-screen  `}>

            <div className={`flex w-[88%] items-center ${scroll > 50 && 'border-b-[1px]'} mx-5`}  >
                {/* Branding */}
                <div className=''>
                    {/* Icon */}
                    <BiFridge className='inline-block text-4xl mb-1' />

                    {/* Brand Name */}
                    <h1 className='inline-block ml-1 font-extrabold text-lg mt-1 text-main'>
                        FoodSpace
                    </h1>
                </div>

                {/* Login & Hamburger */}
                <div className='ml-auto py-2.5 '>
                    {/* Login */}
                    <Button size='sm'>
                        Try FoodSpace Free
                    </Button>

                    {/* Mobile Menu Hamburger */}
                    <button onClick={() => setOpenMenu(!openMenu)}>
                        <span className='ml-4'>
                            {openMenu
                                ? <AiOutlineClose className='inline-block text-2xl text-black' />
                                : <AiOutlineMenu className='inline-block text-2xl text-black' />
                            }
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {openMenu && <>
                <div className='bg-white absolute top-14 w-[88%] h-screen mx-5'>

                    {/* Links */}
                    <ul className='flex flex-col'>
                        {navLinks.map((item, idx) => {
                            let lastChild = false
                            if (idx === navLinks.length - 1) {
                                lastChild = true
                            }
                            return (
                                <li key={item.placeholder} className={`p-3.5 cursor-pointer ${lastChild ? 'border-y-[1px]' : 'border-t-[1px]'}`}>
                                    <Link to={`/`}>
                                        <span className=' text-base font-semibold'>{item.placeholder}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>

                    {/* Login/Join Buttons */}
                    <div className='flex flex-col items-center mt-5 space-y-4'>
                        <Button size='md' sx='w-[90vw] '>
                            Try FoodSpace free
                        </Button>

                        <Button size='md' variant='outline' sx='w-[90vw] '>
                            Log in
                        </Button>
                    </div>

                </div>
            </>
            }

        </nav >
    )
}

export default Navbar