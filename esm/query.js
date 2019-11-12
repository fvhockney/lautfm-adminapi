function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import axios from 'axios';
export var query =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(method, url) {
    var params,
        responseType,
        timeout,
        baseURL,
        response,
        data,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            params = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
            responseType = 'json';
            timeout = 2000;
            baseURL = 'https://api.radioadmin.laut.fm/stations';
            _context.prev = 4;
            _context.next = 7;
            return axios({
              method: 'get',
              baseURL: baseURL,
              url: url,
              responseType: responseType,
              headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('laut.fm.api.token')
              },
              params: params,
              timeout: timeout
            });

          case 7:
            response = _context.sent;
            _context.next = 10;
            return response.data;

          case 10:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](4);
            console.log(_context.t0);
            throw _context.t0;

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 14]]);
  }));

  return function query(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();