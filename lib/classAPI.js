function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import axios from 'axios';
/** Class holding the base configuration for all instantiated API Classes */

var AdminApiConfig =
/*#__PURE__*/
function () {
  /**
   * Create the basic configuration requirments
   */
  function AdminApiConfig() {
    _classCallCheck(this, AdminApiConfig);

    this.defaultToken = null;
    this.defaultOrigin = null;
    this.baseURL = 'https://api.radioadmin.laut.fm/stations/';
  }
  /**
   * Set a user provided token
   * @param {string} token - the user provided token
   */


  _createClass(AdminApiConfig, [{
    key: "_token",

    /**
     * Checks if a user token is provided and if none is provided
     * it sets the http header token to the one stored in the window object.
     * If a token is provided, it sets the http header token as
     * provided by the user
     * @protected
     * @param {string = null} token - the token which was set by the user
     * @returns {object} this
     */
    value: function _token() {
      var token = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!token) {
        token = window.localStorage.getItem('laut.fm.api.token');
      }

      this.api.defaults.headers.common['Authorization'] = "Bearer ".concat(token);
      return this;
    }
    /**
     * Sets the http origin header with that origin provided by the user.
     * @private
     * @param {string} origin - the user which was set by the user
     * @returns {object} this
     */

  }, {
    key: "_origin",
    value: function _origin(origin) {
      var headers = this.api.defaults.headers.common['Origin'] = origin;
      return this;
    }
  }, {
    key: "token",
    set: function set(token) {
      this.defaultToken = token;

      this._token(token);
    }
    /**
     * Set a user provided origin
     * @param {string} origin - the user provided origin
     */

  }, {
    key: "origin",
    set: function set(origin) {
      this.defaultOrigin = origin;

      this._origin(origin);
    }
    /**
     * Set the base url to be used for all API calls
     * @param {string} url - the base url
     */

  }, {
    key: "baseUrl",
    set: function set(url) {
      this.api.defaults.baseURL = url;
    }
  }]);

  return AdminApiConfig;
}();
/**
 * Class handeling all the basic logic of API calls and response preparation
 * @extends AdminApiConfig
 */


var AdminApiClass =
/*#__PURE__*/
function (_AdminApiConfig) {
  _inherits(AdminApiClass, _AdminApiConfig);

  /**
   * Creates the http request instance
   * @ returns {object} this
   */
  function AdminApiClass() {
    var _this;

    _classCallCheck(this, AdminApiClass);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AdminApiClass).call(this));
    _this.data = {};
    _this.apiStation = null;
    _this.api = axios.create({
      baseURL: _this.baseURL
    });

    _this._token();

    return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
  }
  /**
   * Initiates the http request with a get request
   * @param {string = ''} path - the path to be appended
   * to the base url
   * @returns {Promise} the promise of the get request
   */


  _createClass(AdminApiClass, [{
    key: "get",
    value: function get() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      this._resetData();

      return this.api.get(this._path(path));
    }
    /**
     * Initiates the http request with a post request
     * @param {string = ''} path - the path to be appended
     * to the base url
     * @returns {Promise} the promise of the post request
     */

  }, {
    key: "post",
    value: function post() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return this.api.post(this._path(path), this.data);
    }
    /**
     * Initiates the http request with a patch request
     * @param {string = ''} path - the path to be appended to the base url
     * @returns {Promise} the promise of the patch request
     */

  }, {
    key: "patch",
    value: function patch() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return this.api.patch(this._path(path), this.data);
    }
    /**
     * Initiates the http request with a put request
     * @param {string = ''} path - the path to be appened to the base url
     * @returns {Promise} the promise of the put request
     */

  }, {
    key: "put",
    value: function put() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return this.api.put(this._path(path), this.data);
    }
    /**
     * Initiates the http request with an options request
     * @param {string = ''} path - the path to be appended to the base url
     * @returns {Promise} the promise of the options request
     */

  }, {
    key: "options",
    value: function options() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      this._resetData();

      return this.api.options(this._path(path));
    }
    /**
     * Initiates the http request with a delete request
     * @param {string = ''} path - the path to be appended to the base url
     * @returns {Promise} the promise of the delete request
     */

  }, {
    key: "delete",
    value: function _delete() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      this._resetData();

      return this.api.delete(this._path(path));
    }
    /**
     * Provides the station ID to be used in the path function.
     * This allowes the base url to remain unchanged and therefore
     * provides the opportunity for multiple stations to be queried with
     * only one base class
     * @param {number} stationId - the station ID to be queried
     * @returns {object} this
     */

  }, {
    key: "station",
    value: function station(stationId) {
      this.apiStation = stationId;
      return this;
    }
    /**
     * Provides the data to send with the request
     * @param {object} data - the data to send with the request
     * @returns {object} this
     */

  }, {
    key: "with",
    value: function _with(data) {
      this.data = data;
      return this;
    }
    /**
     * Standardizes the building of the path for
     * the api call
     * @private
     * @param {string} path - the path path provided by
     * the user in the verb
     * @returns {string} the build path
     */

  }, {
    key: "_path",
    value: function _path(path) {
      var builtPath = '';

      if (this.apiStation) {
        builtPath += "".concat(this.apiStation);
      }

      if (path) {
        builtPath += "/".concat(path);
      }

      return builtPath;
    }
    /**
     * Resets the data object initialized in the constructor after a post
     * or put request has been made
     * @private
     */

  }, {
    key: "_resetData",
    value: function _resetData() {
      this.data = {};
    }
  }]);

  return AdminApiClass;
}(AdminApiConfig);

var AdminApi = function AdminApi() {
  return new AdminApiClass();
};

export { AdminApi, AdminApiClass };