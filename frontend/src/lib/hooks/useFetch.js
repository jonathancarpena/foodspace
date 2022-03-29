//useFetch.js
import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetch(url, token, dependencies = []) {
    console.log(...dependencies)
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading('loading...')
        setData(null);
        setError(null);
        const source = axios.CancelToken.source();
        axios.get(url, {
            cancelToken: source.token,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {

            if (res.data) {
                setData(res.data)
                setLoading(false);
            }

        }).catch(err => {
            setLoading(false)
            setError('An error occurred. Awkward..')
        })
        return () => {
            source.cancel();
        }
    }, [url])

    return { data, loading, error }
}

export default useFetch