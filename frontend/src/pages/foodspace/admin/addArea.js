import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Router
import { Link, useLocation, useNavigate } from 'react-router-dom'

// Redux
import { useDispatch, useSelector } from 'react-redux'

// Urls
import { API } from '../../../lib/urls'

function AddArea() {
  const { state: { foodSpace, foodSpace_id } } = useLocation()
  const { token } = useSelector(state => state.auth)
  const [areas, setAreas] = useState([''])


  async function handleSubmit(e) {
    e.preventDefault()
    const filterEmptyFields = areas.filter((item) => item !== '')
    try {
      const res = await axios({
        method: "POST",
        url: `${API.ADMIN.addArea}`,
        data: {
          areas: filterEmptyFields,
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

  function handleChange(e, index) {
    let singleArea = areas[index]
    singleArea = e.target.value
    let allAreas = []
    areas.forEach((item, idx) => {
      if (idx === index) {
        allAreas.push(singleArea)
      } else {
        allAreas.push(item)
      }
    })
    setAreas(allAreas)
  }

  function removeAreaField(index) {
    setAreas(areas.filter((item, idx) => idx !== index))
  }
  return (
    <div>

      <form onSubmit={handleSubmit}>
        <h1>Current Areas: {foodSpace.areas.map((item) => (<span>{item}, </span>))}</h1>
        <h1>Add Area</h1>
        {areas.map((area, idx) => (
          <div key={`area-${idx}`}>
            <input
              type="text"
              value={area}
              onChange={(e) => handleChange(e, idx)}
              className="border-2"
            />

            {(areas.length === 1 && idx === 0) || (areas.length > 1 && idx === areas.length - 1)
              ? <button type="button" onClick={() => setAreas([...areas, ''])}>
                Add
              </button>
              : <button type="button" onClick={() => removeAreaField(idx)}>
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

export default AddArea