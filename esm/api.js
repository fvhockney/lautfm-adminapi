function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { query } from './query';
/**
 * @deprecated
 */

export var stationData =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(stationId) {
    var data, name, description, format, djs, logoUrl, backgroundUrl, location, website, facebook, twitter, role, genres, createdAt, updatedAt;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return query('get', "".concat(stationId));

          case 2:
            data = _context.sent;
            name = data.name, description = data.description, format = data.format, djs = data.djs, logoUrl = data.logo_image_url, backgroundUrl = data.background_image_url, location = data.location, website = data.website, facebook = data.facebook_page, twitter = data.twitter_name, role = data.role, genres = data.genres, createdAt = data.created_at, updatedAt = data.updated_at;
            return _context.abrupt("return", {
              name: name,
              description: description,
              format: format,
              djs: djs,
              logoUrl: logoUrl,
              backgroundUrl: backgroundUrl,
              location: location,
              website: website,
              facebook: facebook,
              twitter: twitter,
              role: role,
              genres: genres,
              createdAt: createdAt,
              updatedAt: updatedAt
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function stationData(_x) {
    return _ref.apply(this, arguments);
  };
}();