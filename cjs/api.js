"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stationData = void 0;

var _query = require("./query");

/**
 * @deprecated
 */
const stationData = async function (stationId) {
  const data = await (0, _query.query)('get', `${stationId}`);
  let {
    name,
    description,
    format,
    djs,
    logo_image_url: logoUrl,
    background_image_url: backgroundUrl,
    location,
    website,
    facebook_page: facebook,
    twitter_name: twitter,
    role,
    genres,
    created_at: createdAt,
    updated_at: updatedAt
  } = data;
  return {
    name,
    description,
    format,
    djs,
    logoUrl,
    backgroundUrl,
    location,
    website,
    facebook,
    twitter,
    role,
    genres,
    createdAt,
    updatedAt
  };
};

exports.stationData = stationData;