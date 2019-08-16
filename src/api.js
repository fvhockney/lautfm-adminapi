import {query} from './query'

/**
 * @deprecated
 */
export const stationData = async function ( stationId ) {
    const data = await query( 'get', `${stationId}` )
    let { name, description, format, djs, logo_image_url:logoUrl, background_image_url:backgroundUrl, location, website, facebook_page:facebook,
    twitter_name:twitter, role, genres, created_at:createdAt, updated_at:updatedAt } = data
    return { name, description, format, djs, logoUrl, backgroundUrl, location, website, facebook,
    twitter, role, genres, createdAt, updatedAt }
}
