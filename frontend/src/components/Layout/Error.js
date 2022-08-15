// Router
import { Link } from 'react-router-dom'

// Icons
import { FaHome } from 'react-icons/fa'

function Error() {
    return (
        <div className='h-screen flex flex-col space-y-5 justify-center items-center text-2xl font-black text-neutral-400'>
            <h1 className='uppercase'>Server Error</h1>

            <Link to='/' className='text-base bg-primary-500 text-white py-2 px-4 rounded-md'>
                <h2 className='flex space-x-3 justify-center items-center'>
                    <span>Go Home</span>
                    <FaHome />
                </h2>
            </Link>


        </div>
    )
}

export default Error