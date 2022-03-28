import React, { useEffect } from 'react'
import axios from 'axios'

// Redux
import { useSelector } from 'react-redux'

// Router
import { useParams } from 'react-router-dom'

// Urls
import { API } from '../../lib/urls'

function FoodSpace() {
    const { id: foodSpace_id } = useParams()
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        async function getFoodSpaceById() {
            const { data } = await axios({
                method: "GET",
                url: `${API.FOODSPACE.base}/${foodSpace_id}`,
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            })
            console.log(data)
        }

        getFoodSpaceById()
    }, [])

    return (
        <div>SingleFoodSpace</div>
    )
}

export default FoodSpace