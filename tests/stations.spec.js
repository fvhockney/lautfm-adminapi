import '@babel/polyfill'

import { AdminApi } from '../src/classAPI.js'
import { token, origin } from './token.js'

const baseUrl = 'https://api.radioadmin.laut.fm/stations'

it('sets the base url', () => {
    const c = AdminApi()
    c.baseUrl = baseUrl
})

it('sets the token', () => {
    const c = AdminApi()
    c.token = token
    c.origin = origin
})

it('gets station nick(3161)', async () => {
    const c = AdminApi()
    c.token = token
    c.origin = origin
    const { data } = await c.station(3161).get()
    expect(data.id).toBe(3161)
})

it('gets users', async() =>{
    const c = AdminApi()
    c.token = token
    c.origin = origin
    const {data} = await c
                        .station(3161)
                        .get('users')
    expect(data.users).toEqual(expect.any(Array))
})

it('runs promise all', () =>{
    const c = AdminApi()
    c.token = token
    c.origin = origin
    const p1 = c.station(3161).get()
    const p2 = c.station(3755).get()
    return Promise.all( [ p1, p2 ] )
        .then( (resp) => {
            const[r1, r2] = resp
            expect(r1.data.id).toBe(3161)
            expect(r2.data.id).toBe(3755)
        } )
})

