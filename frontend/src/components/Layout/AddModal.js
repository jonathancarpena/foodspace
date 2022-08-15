// Router
import { Link, useLocation } from "react-router-dom";

// Components
import TransitionOpacity from '../Transition/TransitionOpacity'

// Icons
import { BiFridge } from 'react-icons/bi'
import { FaTimes, FaRegLemon, FaBarcode } from 'react-icons/fa'



function AddModal({ showModal, setShowModal }) {
    const location = useLocation()



    return (
        <>
            <TransitionOpacity show={showModal} >
                <>
                    <div className={`fixed inset-0 overflow-x-hidden overflow-y-auto z-[100] `}>

                        <div className="fixed bottom-[1.15rem] px-5 pb-3.5 pt-3 flex justify-evenly items-center  left-[50%] -translate-x-[50%]">

                            {/* Close Modal */}
                            <span className="bg-primary-500 rounded-full -mt-2.5 w-[50px] h-[50px] flex items-center justify-center">
                                <FaTimes onClick={() => setShowModal(false)} className='  inline-block text-[2.5rem] p-2 fill-white cursor-pointer' />
                            </span>



                            {/* Add FoodSpace */}

                            <Link
                                onClick={() => setShowModal(false)}
                                to='/foodSpace/create'
                                state={{ prevPath: location.pathname }}
                                className="absolute bottom-10 right-28 flex flex-col items-center justify-center w-[50px] "
                            >

                                <span className="bg-white rounded-full w-max hover:bg-primary-500 hover:text-white transition-all duration-120">
                                    <BiFridge onClick={() => setShowModal(false)} className='  inline-block text-[2.5rem]  p-2.5  cursor-pointer' />
                                </span>
                                <span className="text-sm text-white uppercase font-semibold mt-1">FoodSpace</span>
                            </Link>



                            {/* Add Product */}
                            <Link
                                onClick={() => setShowModal(false)}
                                to='/product/create'
                                state={{ prevPath: location.pathname }}
                                className="absolute bottom-32  flex flex-col items-center justify-between w-[50px]"
                            >
                                <span className="bg-white rounded-full w-max hover:bg-primary-500 hover:text-white transition-all duration-120">
                                    <FaBarcode onClick={() => setShowModal(false)} className='  inline-block text-[2.5rem]  p-2.5  cursor-pointer' />
                                </span>
                                <span className="text-sm text-white uppercase font-semibold mt-1">Product</span>
                            </Link>


                            {/* Add Food */}
                            <Link
                                onClick={() => setShowModal(false)}
                                to='/foodSpace/choose'
                                state={{ prevPath: location.pathname, nextPath: '/foodSpace/add-item' }}
                                className="absolute bottom-10 left-28 flex flex-col items-center justify-between w-[50px]"
                            >
                                <span className="bg-white rounded-full w-max hover:bg-primary-500 hover:text-white transition-all duration-120">
                                    <FaRegLemon onClick={() => setShowModal(false)} className='  inline-block text-[2.5rem]  p-2.5 cursor-pointer' />
                                </span>
                                <span className="text-sm text-white uppercase font-semibold mt-1">Food</span>
                            </Link>




                        </div>




                    </div>

                    {/* Background */}
                    <div onClick={() => setShowModal(false)} className="opacity-75 fixed inset-0 z-90 bg-black"></div>
                </>
            </TransitionOpacity>
        </>
    );
}

export default AddModal