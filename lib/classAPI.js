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

var AdminApiConfig =
/*#__PURE__*/
function () {
  function AdminApiConfig() {
    _classCallCheck(this, AdminApiConfig);

    this.defaultToken = null;
    this.defaultOrigin = null;
    this.baseURL = 'https://api.radioadmin.laut.fm/stations/';
  }

  _createClass(AdminApiConfig, [{
    key: "_token",
    value: function _token() {
      var token = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!token) {
        token = window.localStorage.getItem('laut.fm.api.token');
      }

      this.api.defaults.headers.common['Authorization'] = "Bearer ".concat(token);
      return this;
    }
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
  }, {
    key: "origin",
    set: function set(origin) {
      this.defaultOrigin = origin;

      this._origin(origin);
    }
  }, {
    key: "baseUrl",
    set: function set(url) {
      this.api.defaults.baseURL = url;
    }
  }]);

  return AdminApiConfig;
}();

var AdminApiClass =
/*#__PURE__*/
function (_AdminApiConfig) {
  _inherits(AdminApiClass, _AdminApiConfig);

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

  _createClass(AdminApiClass, [{
    key: "path",
    value: function path(_path) {
      var builtPath = '';

      if (this.apiStation) {
        builtPath += "".concat(this.apiStation);
      }

      if (_path) {
        builtPath += "/".concat(_path);
      }

      return builtPath;
    }
  }, {
    key: "get",
    value: function get() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      this._resetData();

      return this.api.get(this.path(path));
    }
  }, {
    key: "post",
    value: function post(path) {
      return this.api.post(this.path(path), this.data);
    }
  }, {
    key: "patch",
    value: function patch(path) {
      return this.api.patch(this.path(path), this.data);
    }
  }, {
    key: "put",
    value: function put(path) {
      return this.api.put(this.path(path), this.data);
    }
  }, {
    key: "options",
    value: function options(path) {
      this._resetData();

      return this.api.options(this.path(path));
    }
  }, {
    key: "station",
    value: function station(stationId) {
      this.apiStation = stationId;
      return this;
    }
  }, {
    key: "delete",
    value: function _delete(path) {
      this._resetData();

      return this.api.delete(this.path(path));
    }
  }, {
    key: "with",
    value: function _with(data) {
      this.data = data;
      return this;
    }
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