import { useState, useEffect } from "react"
import moment from "moment"

// Router
import { Link } from "react-router-dom"

// Redux
import { useSelector } from "react-redux"

// Components
import Loading from '../../components/Layout/Loading'

// Icons
import { BiFridge } from 'react-icons/bi'
function Tasks() {
    const [expStock, setExpStock] = useState(null)
    const [loading, setLoading] = useState(true)
    const { user } = useSelector(state => state.auth)
    useEffect(() => {

        if (!expStock) {
            const allExpStock = []
            const today = moment()

            // Checking Admin Spaces
            user.admin.forEach((item) => {
                const type = item.type
                const foodSpace_name = item.name
                const foodSpace_id = item._id
                item.expiredStock.forEach((item) => {
                    // Calculate Life Span based on Type
                    const qty = item.product.lifeSpan[type].value
                    const time = item.product.lifeSpan[type].time
                    const expDate = moment(item.purchasedDate).add(qty, time)
                    const diff = expDate.diff(today, 'days')
                    const message = moment.duration(diff, "days").humanize(true)
                    allExpStock.push({
                        info: {
                            name: item.product.name,
                            image: item.product.image,
                            owner: { ...item.owner }
                        },
                        message,
                        foodSpace: {
                            name: foodSpace_name,
                            area: item.area,
                            _id: foodSpace_id
                        }
                    })
                })
            })

            // Checking User Spaces
            user.foodSpaces.forEach((item) => {
                const type = item.type
                const foodSpace_name = item.name
                const foodSpace_id = item._id
                item.expiredStock.forEach((item) => {
                    // Calculate Life Span based on Type
                    const qty = item.product.lifeSpan[type].value
                    const time = item.product.lifeSpan[type].time
                    const expDate = moment(item.purchasedDate).add(qty, time)
                    const diff = expDate.diff(today, 'days')
                    const message = moment.duration(diff, "days").humanize(true)
                    allExpStock.push({
                        info: {
                            name: item.product.name,
                            image: item.product.image,
                            owner: { ...item.owner }
                        },
                        message,
                        foodSpace: {
                            name: foodSpace_name,
                            area: item.area,
                            _id: foodSpace_id
                        }
                    })
                })
            })
            setExpStock(allExpStock)
            setLoading(false)
        }

    }, [user, expStock])


    if (loading) return <Loading />
    return (
        <div className='w-full pt-5 px-7 mb-[6rem]'>
            <h1 className='font-semibold text-2xl mb-5'>My Tasks</h1>
            {expStock.length
                ? <ul className="flex flex-col space-y-3">
                    {expStock.map((item, idx) => (
                        <Link key={`${item.foodSpace.name}-${item.info.name}-${idx}`}
                            to={`/foodSpace/${item.foodSpace.name}`}
                            state={{ foodSpace_id: item.foodSpace._id }}>
                            <li className=" drop-shadow-md bg-white p-3 rounded-md flex flex-col space-y-2">

                                <p className="capitalize font-semibold flex items-center space-x-1">
                                    <BiFridge />
                                    <span>{item.foodSpace.name}</span>
                                    <span>/</span>
                                    <span>{item.foodSpace.area}</span>
                                </p>
                                <p className="capitalize">Item: {item.info.name}</p>
                                <p>Expired {item.message}</p>

                            </li>
                        </Link>
                    ))}
                </ul>
                : <h2 className="text-neutral-400 text-xl ">No Tasks</h2>
            }

        </div>
    )
}

export default Tasks