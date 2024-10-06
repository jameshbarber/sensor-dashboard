'use client'
import useSWR from 'swr'


const fetcher = async (url: string) => {
    const res = await fetch(url)
    return res.json()
}

const useData = (url: string) => {
    const {data, error} = useSWR(url, fetcher)

    return {
        data,
        isLoading: !error && !data,
        isError: error
    }
}

const useAPI = (path: string) => {
    return useData(`/api/v1/${path}`)
}

export {useData, useAPI}