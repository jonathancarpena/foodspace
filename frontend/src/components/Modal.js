import React from "react";

// Components
import TransitionOpacity from './Transition/TransitionOpacity'

export default function Modal({ showModal, setShowModal, content, footer, header, sx }) {
    return (
        <>
            <TransitionOpacity show={showModal} >
                <>
                    <div className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0  mx-10 z-[100] ${sx}`}>

                        {/* Card */}
                        <div className="rounded-md shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                            {/* Close */}
                            <span onClick={() => setShowModal(false)} className="cursor-pointer absolute right-5 top-3 text-xl">
                                ✖
                            </span>

                            {/* Card Header */}
                            <h1 className=" text-xl font-semibold text-neutral-800 text-center pt-10 mx-16">
                                {header}
                            </h1>



                            {/* Card Content */}
                            {content}


                            {/* Card Footer */}
                            {footer &&
                                <>
                                    {footer}
                                </>
                            }

                        </div>
                    </div>

                    {/* Background */}
                    <div onClick={() => setShowModal(false)} className="opacity-50 fixed inset-0 z-100 bg-black"></div>
                </>
            </TransitionOpacity>
        </>
    );
}