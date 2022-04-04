import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Router
import { useNavigate } from 'react-router-dom'

// Urls
import { API } from '../../lib/urls'

// Icons
import { FaArrowUp, FaArrowDown } from 'react-icons/'

// Constants
const tableHeaders = ["Name", "Brand", "Image", "Type", "Unit", "Barcode", "Date Added", "Author"]

// Components
const TableBody = ({ data }) => {
    const navigate = useNavigate()
    return (
        <tbody>
            {data.map((item, idx) => (
                <tr onClick={() => navigate(`/product/${item._id}`)} key={item._id}
                    className={`${idx === 0 ? 'border-y-[1px]' : 'border-b-[1px]'} hover:bg-neutral-100 cursor-pointer`}>
                    <td className='px-3 text-left py-4'>{item.name}</td>
                    <td className='px-3 text-left py-4'>{item.brand}</td>
                    <td className='px-3 text-left py-4'>{item.image}</td>
                    <td className='px-3 text-left py-4'>{item.type}</td>
                    <td className='px-3 text-left py-4'>{item.unit}</td>
                    <td className='px-3 text-left py-4'>{item.barcode ? item.barcode : "none"}</td>
                    <td className='px-3 text-left py-4'>{new Date(item.createdAt).toDateString().substring(3)}</td>
                    <td className='px-3 text-left py-4'>{item.author.email}</td>
                </tr>
            ))}
        </tbody>
    )
}
function Products() {
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [errors, setErrors] = useState(false)
    const [sort, setSort] = useState("name:asc")
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        setIsLoading(true)
        axios.get(`${API.PRODUCT.base}`)
            .then((res) => {
                if (res) {
                    setIsLoading(false)
                    setProducts(res.data)
                }
            })
            .catch((err) => {
                setErrors(true)
            })
    }, [])




    // Shows search Results
    useEffect(() => {
        if (search) {
            const results = []
            products.forEach((item) => {
                if (item.name.includes(search)) {
                    const itemChars = [...item.name]
                    const searchChars = [...search]
                    const match = searchChars.every((item, idx) => item === itemChars[idx])
                    if (match) {
                        results.push(item)
                    }
                }
            })
            setSearchResults(results)
        } else {
            setSearchResults(null)
        }
    }, [search])


    function handleSortChange(e) {
        setSort(e.target.value)
        const key = e.target.value.split(':')[0]
        const value = e.target.value.split(':')[1]
        let items;
        if (search) {
            items = [...searchResults]
        } else {
            items = [...products]
        }
        if (key === "name") {
            if (value === "asc") {
                items.sort((a, b) => {
                    return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                })
            } else {
                items.sort((a, b) => {
                    return b.name.toLowerCase().localeCompare(a.name.toLowerCase())
                })
            }
        } else {
            if (value === "asc") {
                items.sort((a, b) => {
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                })
            } else {
                items.sort((a, b) => {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                })
            }
        }

        if (search) {
            setSearchResults(items)
        } else {
            setProducts(items)
        }

    }

    if (errors) {
        <div>
            <h1>Oops there was an error</h1>
        </div>
    }

    if (isLoading) {
        <div>
            <h1>Loading...</h1>
        </div>
    }

    return (
        <div>
            <h1>Product Database</h1>

            <label>Search
                <input onChange={(e) => setSearch(e.target.value)} value={search} />
            </label>
            <select value={sort} onChange={handleSortChange}>
                <option value="name:asc">A-Z</option>
                <option value="name:des">Z-A</option>
                <option value="createdAt:des">Recently Added</option>
                <option value="createdAt:asc">Oldest</option>
            </select>

            <table className='border-[1px] bg-white border-collapse'>
                <thead>
                    <tr>
                        {tableHeaders.map((item, idx) => (
                            <th key={item} className="py-4">
                                <p className={`${idx === 0 ? '' : 'border-l-2'} px-3 text-left`}>
                                    {item}
                                </p>
                            </th>
                        )
                        )}
                    </tr>
                </thead>


                <TableBody data={searchResults ? searchResults : products} />

            </table>

        </div >
    )
}

export default Products

