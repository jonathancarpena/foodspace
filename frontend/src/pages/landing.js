
import React, { useEffect } from 'react'
import { BASE_API } from '../lib/urls'

function Home() {

    useEffect(() => {
        async function fetchData() {

            const example = {
                "_id": "6226b8fe850e35bf6a51d459",
                "name": "banana",
                "quantity": 2,
                "measurement": "count",
                "purchasedDate": "2022-03-07T22:58:30.127Z",
                "expirationDate": "2022-03-07T22:58:30.127Z",
                "expired": false,
                "owner": "tank",
                "imageUrl": "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
                "location": "refrigerator",
                "__v": 0
            }

            const res = await fetch(`${BASE_API}/products/update/${example._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(example)
            })
            const data = await res.json()
            console.log(data)

        }
        fetchData()
    }, [])
    return (
        <div>Landing</div>
    )
}

export default Home