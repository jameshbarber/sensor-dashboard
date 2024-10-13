import axios from "axios";

const makeRequest = async (url: string, method: string, body?: any) => {

    try {
        const response = await axios(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            data: body
        });
        return response.data
    } catch (error: any) {
        if (error.response) {
            console.error(error.response)
            throw new Error(error.response.data ?? error.response.statusText ?? "Unkwon")
        }
    }
}

const get = async (url: string) => {
    const res = await makeRequest(url, 'get')
    return res
}

const post = async (url: string, body?: any) => {
    const res = await makeRequest(url, 'post', body)
    return res
}

const put = async (url: string, body: any) => {
    return await makeRequest(url, 'put', body)
}

const del = async (url: string) => {
    return await makeRequest(url, 'delete')
}

const patch = async (url: string, body: any) => {
    return await makeRequest(url, 'patch', body)
}

const Network = {
    get,
    post,
    put,
    delete: del,
    patch
}

export default Network;
