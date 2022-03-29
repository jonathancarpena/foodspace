import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Router
import { Link, useLocation } from 'react-router-dom'

// Redux
import { useDispatch, useSelector } from 'react-redux'

// Urls
import { API } from '../../../lib/urls'


function ManageUsers() {
    const { state: { foodSpace, foodSpace_id } } = useLocation()
    const { token } = useSelector(state => state.auth)
    const [emails, setEmails] = useState([''])
    const [users, setUsers] = useState(foodSpace.users)


    async function handleSubmit(e) {
        e.preventDefault()
        const filterEmptyFields = emails.filter((item) => item !== '')
        for await (const email of filterEmptyFields) {
            try {
                const res = await axios({
                    method: "POST",
                    url: `${API.FOODSPACE.addUser}`,
                    data: {
                        email,
                        foodSpace_id
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(res)
            } catch (error) {
                const { message } = error.response.data
                console.log(message)
            }
        }


    }

    function handleChange(e, index) {
        let singleEmail = emails[index]
        singleEmail = e.target.value
        let allEmails = []
        emails.forEach((item, idx) => {
            if (idx === index) {
                allEmails.push(singleEmail)
            } else {
                allEmails.push(item)
            }
        })
        setEmails(allEmails)
    }

    function removeEmailField(index) {
        setEmails(emails.filter((item, idx) => idx !== index))
    }

    async function handleRemoveUser(user) {
        const userConfirm = window.confirm(`Are you sure you would like to remove ${user.email}?`)
        if (userConfirm) {
            try {
                const res = await axios({
                    method: "DELETE",
                    url: `${API.FOODSPACE.removeUser}`,
                    data: {
                        user_id: user._id,
                        foodSpace_id
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(res)
                setUsers(users.filter((item) => item !== user))
            } catch (error) {
                const { message } = error.response.data
                console.log(message)
            }

        }
    }
    return (
        <div>
            <h1>Current Users: </h1>
            <ul>
                {users.map((item, idx) => (
                    <li key={item.email}>
                        {item.email} <button onClick={() => handleRemoveUser(item)}>Remove</button>
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <h1>Add Email</h1>
                {emails.map((email, idx) => (
                    <div key={`email-${idx}`}>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => handleChange(e, idx)}
                            className="border-2"
                        />

                        {(emails.length === 1 && idx === 0) || (emails.length > 1 && idx === emails.length - 1)
                            ? <button type="button" onClick={() => setEmails([...emails, ''])}>
                                Add
                            </button>
                            : <button type="button" onClick={() => removeEmailField(idx)}>
                                Remove
                            </button>
                        }
                    </div>
                ))}

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default ManageUsers