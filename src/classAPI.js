import axios from 'axios'

/** Class holding the base configuration for all instantiated API Classes */
class AdminApiConfig {

    /**
     * Create the basic configuration requirments
     */
    constructor () {
        this.defaultToken = null
        this.defaultOrigin = null
        this.baseURL = 'https://api.radioadmin.laut.fm/stations/'
    }

    /**
     * Set a user provided token
     * @param {string} token - the user provided token
     */
    set token ( token ) {
        this.defaultToken = token
        this._token( token )
    }

    /**
     * Set a user provided origin
     * @param {string} origin - the user provided origin
     */
    set origin ( origin ) {
        this.defaultOrigin = origin
        this._origin( origin )
    }

    /**
     * Set the base url to be used for all API calls
     * @param {string} url - the base url
     */
    set baseUrl ( url ) {
        this.api.defaults.baseURL = url
    }

    /**
     * Checks if a user token is provided and if none is provided
     * it sets the http header token to the one stored in the window object.
     * If a token is provided, it sets the http header token as
     * provided by the user
     * @protected
     * @param {string = null} token - the token which was set by the user
     * @returns {object} this
     */
    _token ( token = null ) {
        if ( !token ) {
            token = window.localStorage.getItem( 'laut.fm.api.token' )
        }
        this.api.defaults.headers.common[ 'Authorization' ] = `Bearer ${token}`
        return this
    }

    /**
     * Sets the http origin header with that origin provided by the user.
     * @private
     * @param {string} origin - the user which was set by the user
     * @returns {object} this
     */
    _origin ( origin ) {
        let headers = this.api.defaults.headers.common[ 'Origin' ] = origin
        return this
    }

}

/**
 * Class handeling all the basic logic of API calls and response preparation
 * @extends AdminApiConfig
 */
class AdminApiClass extends AdminApiConfig {
    /**
     * Creates the http request instance
     * @ returns {object} this
     */
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

    /**
     * Initiates the http request with a get request
     * @param {string = ''} path - the path to be appended
     * to the base url
     * @returns {Promise} the promise of the get request
     */
    get ( path = '' ) {
        this._resetData()
        return this.api.get( this._path(path) )
    }

    /**
     * Initiates the http request with a post request
     * @param {string = ''} path - the path to be appended
     * to the base url
     * @returns {Promise} the promise of the post request
     */
    post ( path = '' ) {
        return this.api.post( this._path(path), this.data )
    }

    /**
     * Initiates the http request with a patch request
     * @param {string = ''} path - the path to be appended to the base url
     * @returns {Promise} the promise of the patch request
     */
    patch ( path = '' ) {
        return this.api.patch( this._path(path), this.data )
    }

    /**
     * Initiates the http request with a put request
     * @param {string = ''} path - the path to be appened to the base url
     * @returns {Promise} the promise of the put request
     */
    put ( path = '' ) {
        return this.api.put( this._path(path), this.data )
    }

    /**
     * Initiates the http request with an options request
     * @param {string = ''} path - the path to be appended to the base url
     * @returns {Promise} the promise of the options request
     */
    options ( path = '' ) {
        this._resetData()
        return this.api.options( this._path(path) )
    }

    /**
     * Initiates the http request with a delete request
     * @param {string = ''} path - the path to be appended to the base url
     * @returns {Promise} the promise of the delete request
     */
    delete ( path = '' ) {
        this._resetData()
        return this.api.delete( this._path(path) )
    }

    /**
     * Provides the station ID to be used in the path function.
     * This allowes the base url to remain unchanged and therefore
     * provides the opportunity for multiple stations to be queried with
     * only one base class
     * @param {number} stationId - the station ID to be queried
     * @returns {object} this
     */
    station ( stationId ) {
        this.apiStation = stationId
        return this
    }

    /**
     * Provides the data to send with the request
     * @param {object} data - the data to send with the request
     * @returns {object} this
     */
    with ( data ) {
        this.data = data
        return this
    }

    /**
     * Standardizes the building of the path for
     * the api call
     * @private
     * @param {string} path - the path path provided by
     * the user in the verb
     * @returns {string} the build path
     */
    _path ( path ) {
        let builtPath = ''
        if (this.apiStation) {
           builtPath += `${this.apiStation}` 
        }

        if (path) {
            builtPath += `/${path}`
        }

        return builtPath 
    }

    /**
     * Resets the data object initialized in the constructor after a post
     * or put request has been made
     * @private
     */
    _resetData () {
        this.data = {}
    }
}

const AdminApi = () => { return new AdminApiClass() }

export { AdminApi, AdminApiClass }
