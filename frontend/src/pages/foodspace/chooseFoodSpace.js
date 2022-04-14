import React, { useState, useEffect } from 'react'

// Router
import { useLocation, useNavigate } from 'react-router-dom'

// Redux
import { useSelector } from 'react-redux'


function ChooseFoodSpace() {
    const { user } = useSelector(state => state.auth)
    const location = useLocation()

    useEffect(() => {
        let noFoodSpaces = false
        console.log(user)
        if (!user.foodSpaces) {
            console.log('NONE')
        }
    }, [])
    return (
        <div className='min-h-screen p-7 flex flex-col justify-center items-center'>
            <form onSubmit={() => { alert('hey') }} className="flex flex-col space-y-5 min-w-[350px] max-w-[350px] min-h-[70vh]">
                <h1 className='text-3xl font-semibold tracking-tight text-center'>
                    Which FoodSpace?
                </h1>
                <select>
                    <option></option>
                </select>
            </form>
        </div>
    )
}

export default ChooseFoodSpace



