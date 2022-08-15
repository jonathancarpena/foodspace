import { useState } from 'react'

// Router
import { Link } from 'react-router-dom'

// Icons
import { CgSpinner } from 'react-icons/cg'
import { FaHome } from 'react-icons/fa'

function Contact() {
    const [inputs, setInputs] = useState({ fName: '', lName: '', email: '', message: '' })
    const [loading, setLoading] = useState(false)

    function handleChange(e) {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }
    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setInputs({ fName: '', lName: '', email: '', message: '' })
            alert(`Thank you ${inputs.fName}! We'll get back to you in 24-48 hours!`)
        }, [3000])

    }
    return (
        <div className='px-5 h-[90vh] flex flex-col justify-center'>
            <Link to='/'>
                <FaHome className='text-xl absolute top-5 left-5' />
            </Link>

            <h1 className='text-[2.5rem] font-black mb-8'>{`Let’s figure out how FoodSpace can help you`}</h1>
            <p className='text-sm text-neutral-500 ml-2 italic'>(Please fill out this form.)</p>
            <form onSubmit={handleSubmit} className='flex flex-col space-y-4 bg-white p-5 rounded-lg border-2 '>

                <div className='flex flex-col space-y-1'>
                    <label htmlFor="fName">First Name *</label>
                    <input
                        id="fName"
                        name="fName"
                        type="text"
                        required
                        value={inputs.fName}
                        onChange={handleChange}
                        className='bg-neutral-100 py-2 px-3 rounded-sm outline-none focus:ring-2 focus:ring-sky-500'
                    />
                </div>
                <div className='flex flex-col space-y-1'>
                    <label htmlFor="lName">Last Name *</label>
                    <input
                        id="lName"
                        name="lName"
                        type="text"
                        required
                        value={inputs.lName}
                        onChange={handleChange}
                        className='bg-neutral-100 py-2 px-3 rounded-sm outline-none focus:ring-2 focus:ring-sky-500'
                    />
                </div>
                <div className='flex flex-col space-y-1'>
                    <label htmlFor="email">Email Address *</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={inputs.email}
                        onChange={handleChange}
                        className='bg-neutral-100 py-2 px-3 rounded-sm outline-none focus:ring-2 focus:ring-sky-500'
                    />
                </div>
                <div className='flex flex-col space-y-1'>
                    <label htmlFor="fName">Message *</label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        value={inputs.message}
                        onChange={handleChange}
                        className='min-h-[150px] overflow-auto bg-neutral-100 py-2 px-3 rounded-sm outline-none focus:ring-2 focus:ring-sky-500'
                    />
                </div>

                <button
                    type="submit"
                    className='bg-primary-500 py-3 rounded-md text-white flex space-x-2 justify-center items-center'>

                    {loading && <CgSpinner className='text-xl animate-spin' />}
                    <span>Submit</span>

                </button>
            </form>
        </div>
    )
}

export default Contact