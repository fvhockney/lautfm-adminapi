import axios from 'axios'

class AdminApiConfig {
    constructor () {
        this.defaultToken = null
        this.defaultOrigin = null
        this.baseURL = 'https://api.radioadmin.laut.fm/stations/'
    }

    set token ( token ) {
        this.defaultToken = token
        this._token( token )
    }

    set origin ( origin ) {
        this.defaultOrigin = origin
        this._origin( origin )
    }

    set baseUrl ( url ) {
        this.api.defaults.baseURL = url
    }

    _token ( token = null ) {
        if ( !token ) {
            token = window.localStorage.getItem( 'laut.fm.api.token' )
        }
        this.api.defaults.headers.common[ 'Authorization' ] = `Bearer ${token}`
        return this
    }

    _origin ( origin ) {
        let headers = this.api.defaults.headers.common[ 'Origin' ] = origin
        return this
    }

}

class AdminApiClass extends AdminApiConfig {
    constructor () {
        super()
        this.data = {}
        this.apiStation = null
        this.api = axios.create({
            baseURL: this.baseURL
        })
        this._token()
        return this
    }

    path ( path ) {
        let builtPath = ''
        if (this.apiStation) {
           builtPath += `${this.apiStation}` 
        }

        if (path) {
            builtPath += `/${path}`
        }

        return builtPath 
    }

    get ( path = '' ) {
        this._resetData()
        return this.api.get( this.path(path) )
    }

    post ( path ) {
        return this.api.post( this.path(path), this.data )
    }

    patch ( path ) {
        return this.api.patch( this.path(path), this.data )
    }

    put ( path ) {
        return this.api.put( this.path(path), this.data )
    }

    options ( path ) {
        this._resetData()
        return this.api.options( this.path(path) )
    }

    station ( stationId ) {
        this.apiStation = stationId
        return this
    }

    delete ( path ) {
        this._resetData()
        return this.api.delete( this.path(path) )
    }

    with ( data ) {
        this.data = data
        return this
    }

    _resetData () {
        this.data = {}
    }
}

const AdminApi = () => { return new AdminApiClass() }

export { AdminApi, AdminApiClass }
