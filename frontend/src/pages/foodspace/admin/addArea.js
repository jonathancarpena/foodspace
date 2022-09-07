import React, { useState, useEffect } from 'react'
import axios from 'axios'

// Router 
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom'

// Redux
import { refreshMe } from '../../../redux/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'

// Utils
import { API } from '../../../lib/urls'

// Icons
import { BiArrowBack, BiFridge } from 'react-icons/bi'
import { RiErrorWarningFill } from 'react-icons/ri'
import { FaCheckCircle, FaSpinner } from 'react-icons/fa'
import { FiPlusCircle, FiDelete } from 'react-icons/fi'

// Components 
import Button from '../../../components/Button'

function AddUser() {
  const navigate = useNavigate()
  const { name } = useParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.auth)
  const [areas, setAreas] = useState([{ value: '', edit: true, status: null, error: null }])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()


  useEffect(() => {
    if (!location.state) {
      navigate("/foodSpace/choose", {
        state: {
          prevPath: location.state.prevPath,
          nextPath: location.pathname
        }
      })
    }

  }, [location.pathname, location.state, navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    if (areas.length > 1) {
      const validAreas = []
      for (const input of areas) {
        if (input.status === "success") {
          validAreas.push(input.value.toLowerCase())
        }
      }

      try {
        setIsLoading(true)
        const res = await axios({
          method: "POST",
          url: `${API.ADMIN.addArea}`,
          data: {
            areas: validAreas,
            foodSpace_id: location.state.foodSpace._id
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (res.status === 200) {
          setIsLoading(false)
          setError(null)
        }
      } catch (error) {
        const { message } = error.response.data
        setError(message)
        setIsLoading(false)

      }
    } else if (areas.length === 1) {
      // Validating Previous Input
      // Updating Previous Input State 
      areas[0]["edit"] = false
      areas[0]["status"] = "loading"
      setAreas([...areas])
      await validateArea(areas, areas[0], 0)

      if (areas[0].status === "success") {
        try {
          const res = await axios({
            method: "POST",
            url: `${API.ADMIN.addArea}`,
            data: {
              areas: [areas[0].value],
              foodSpace_id: location.state.foodSpace._id
            },
            headers: {
              Authorization: `Bearer ${token}`
            }
          })

          if (res.status === 200) {
            setIsLoading(false)
            setError(null)
          }
        } catch (error) {
          const { message } = error.response.data
          setError(message)
          setIsLoading(false)
        }
      }
    }

    if (!isLoading && !error) {
      dispatch(refreshMe({ forceRefresh: true }))
      navigate(`/`)
      console.log('SUCCESS')
    }

  }

  function handleAddFieldChange(e, idx, array, setFn) {
    let copy = [...array]
    copy[idx] = {
      ...copy[idx],
      value: `${e.target.value}`,
    }
    setFn([...copy])
  }


  async function checkAreaExist(area) {
    let status = area.status

    console.log(area)
    if (status === "loading") {
      if (location.state.foodSpace.areas.includes(area.value.toLowerCase())) {
        status = "error"
      } else {
        status = "success"
      }
    }
    return status
  }

  function errorCheck(input) {
    let error
    const areaExistAlready = location.state.foodSpace.areas.find((area) => area === input.value)
    if (areaExistAlready) {
      error = "Area already exist in FoodSpace."
    }
    if (input.value.length < 3) {
      error = "Minimum 3 characters."
    }
    return error
  }

  async function validateArea(fields, input, index) {
    let areaToValidate = fields[index]

    // Validation
    const error = errorCheck(input)
    if (error) {
      // Shows User the Error
      areaToValidate["error"] = error
      areaToValidate["status"] = null
      fields[index] = areaToValidate
      setAreas([...fields])

      // Removes the error
      setTimeout(() => {
        areaToValidate["error"] = null
        areaToValidate["edit"] = true
        fields[index] = areaToValidate
        setAreas([...fields])
      }, [3000])
    } else {
      const status = await checkAreaExist(areaToValidate)
      if (status === "success") {
        areaToValidate["status"] = status
        fields[index] = areaToValidate
        setAreas([...fields])
      } else {
        areaToValidate["status"] = status
        fields[index] = areaToValidate
        setAreas([...fields])
      }
    }


  }
  async function addAnotherUserField(prevIndex) {
    let fields = [...areas]
    let prevUser = fields[prevIndex]

    // Updating Previous User State 
    prevUser["edit"] = false
    prevUser["status"] = "loading"
    fields[prevIndex] = prevUser


    const error = errorCheck(prevUser)
    if (prevUser.value !== "" && !error) {
      // Adding New Field
      fields.push({ value: '', edit: true, status: null, error: null })

      // Updating State
      setAreas([...fields])
    }

    // Validating Previous User
    await validateArea(fields, prevUser, prevIndex)
  }


  function removeField(idx, array, setFn) {
    let copy = [...array]
    copy.splice(idx, 1)
    setFn(copy)
  }

  let prevPath;
  let state;
  try {
    prevPath = location.state.prevPath
    state = location.state
  } catch (error) {
    prevPath = '/'
    state = null
  }
  return (
    <div className='min-h-screen p-7 flex flex-col justify-center items-center'>

      {/* Back Button */}
      <Link to={prevPath} state={state}>
        <span className='fixed top-6 left-6'>
          <BiArrowBack className='inline-block text-[1rem] text-main mr-1 mb-1' />
        </span>
      </Link>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-5 min-w-[350px] max-w-[350px] min-h-[70vh]">
        <div>
          {/* Header */}
          <h1 className='text-3xl font-semibold tracking-tight text-center'>
            Adding Area to
          </h1>

          <h2 className='my-2 text-2xl font-semibold tracking-tight text-center capitalize'>
            <BiFridge className='inline-block mb-1' /> {name}
          </h2>
        </div>

        <ul className='flex flex-col space-y-5 items-center'>
          {areas.map((item, idx) => (
            <div className='relative' key={`user-field-${idx}`}>
              {areas[idx].error &&
                <span className='absolute text-xs text-red-600 -top-4'>{areas[idx].error}</span>
              }
              <input
                disabled={!areas[idx].edit || areas[idx].error}
                type="text"
                value={areas[idx].value}
                onChange={(e) => handleAddFieldChange(e, idx, areas, setAreas)}
                className={`${areas[idx].error ? ' border-red-600 animate-wiggle' : ''} mr-2 border-2 rounded-lg px-3 py-2 focus:outline-offset-1 focus:outline-sky-300 min-w-[300px] max-w-[300px]`}
                placeholder='E.g. Middle Shelf'
              />

              {/* Loading */}
              {(areas[idx].status === "loading") &&
                <FaSpinner className="inline-block ml-2 animate-spin fill-neutral-600" />
              }

              {/* Error */}
              {(areas[idx].status === "error") &&

                <span>
                  <RiErrorWarningFill className="absolute -top-3.5 -right-3.5 inline-block text-red-600" />
                </span>

              }

              {/* Success */}
              {(areas[idx].status === "success") &&

                <span>
                  <FaCheckCircle className=" absolute -top-3.5 -right-3.5 inline-block text-green-600" />
                </span>

              }

              {/* Add Area Button */}
              {(idx === areas.length - 1) &&
                <button
                  type="button"
                  onClick={() => addAnotherUserField(idx)}
                  className=" bg-white rounded-lg px-3 py-2  border-2 min-w-[300px] max-w-[300px] mt-5 flex items-center justify-center text-secondary"
                >
                  <FiPlusCircle className='inline-block mr-1 ' />
                  Add Another Area
                </button>
              }

              {/* Delete Button */}
              {areas.length > 1 &&
                (areas[idx].status !== "loading") &&
                <>
                  <button
                    type="button"
                    className={`inline-block absolute top-2 ${(areas[idx].status === "success" || areas[idx].status === "error") ? '-right-10' : '-right-5'}`}
                    onClick={() => removeField(idx, areas, setAreas)}
                  >
                    <FiDelete className='inline-block text-xl' />
                  </button>
                </>

              }



            </div>
          ))
          }
        </ul >

        <Button type="submit" sx="w-full" >
          {isLoading && <FaSpinner className="inline-block right-2 animate-spin fill-white relative" />}
          Submit
        </Button >
      </form >
    </div >
  )
}

export default AddUser