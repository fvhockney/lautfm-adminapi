import '@babel/polyfill'

import { AdminApi, AdminApiClass } from '../src/classAPI.js'
import { token, origin } from './token.js'

function log(v) { console.log(v); return }

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

it( 'sets token in class', () => {
    const c = AdminApi( { token: 'foo' } )
    expect( c.defaultToken ).toEqual( 'foo' )
} )

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

it( 'runs a download progress', async () => {
    let progressCalled = false
    const log = (progressEvent) => {
        progressCalled = (progressEvent !== undefined)
    }
    const c = AdminApi()
    c.token = token
    c.origin = origin
    await c.station(3161).onDownProgress(log).get()
    expect(progressCalled).toEqual(true)
} )

it('cancels a request', () => {
    const c = AdminApi()
    c.token = token
    c.origin = origin
    const api = c.station(3161).cancelable().get()
    c.cancel( 'cancelled' )
    return api.then( (res) => {
        fail( 'should not pass' )
    }).catch( (err) => {
        expect(err.message).toBe('cancelled')
    } )
})

it('cancels a request with custom function', () => {
    let cancel
    const dcancel = function ( c ) { cancel = c }
    const c = AdminApi()
    c.token = token
    c.origin = origin
    const api = c.station(3161).cancelable( dcancel ).get()
    cancel( 'cancelled' )
    return api.then( (res) => {
        fail( 'should not pass' )
    }).catch( (err) => {
        expect(err.message).toBe('cancelled')
    } )
})

function reflect(promise) {
    return promise
        .then(v => {
            return { status: 'fulfilled', value: v }
        })
        .catch(error => ({status: 'rejected', reason: error}))
}

it('cancels a single request while not the other requests', async() => {
    const c = AdminApi()
    c.token = token
    c.origin = origin
    const d = AdminApi()
    d.token = token
    d.origin = origin
    const api = c.station(3161).cancelable().get()
    const api2 = d.station(3161).cancelable().get()
    c.cancel()
    const promises = [ api, api2 ]
    const results = await Promise.all(promises.map(reflect))
    const sucessful = results.filter(p=>p.status === 'fulfilled')
    expect(sucessful).toHaveLength(1)
})
