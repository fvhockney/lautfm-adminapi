import axios from 'axios'

export const query = async function(method, url, params = {}) {
    const responseType = 'json'
    const timeout = 2000
    const baseURL = 'https://api.radioadmin.laut.fm/stations'
    try {
        const response = await axios({
            method: 'get',
            baseURL,
            url,
            responseType,
            headers:{'Authorization': 'Bearer ' + window.localStorage.getItem( 'laut.fm.api.token' )},
            params,
            timeout,
        })
        const data = await response.data
        return data
    } catch (err) {
        console.log(err)
        throw err
    }
}

