import { iFlickrPhoto, iFlickrApiResponse, iImage } from '../consts/types';

export function FlickrResponseToImages(
  response: iFlickrApiResponse | undefined,
): Array<iImage> {
  if (!response) return [];

  return response.photos.photo.map((photo: iFlickrPhoto) => ({
    date: photo.datetaken,
    description: photo.description['_content'],
    largeWidth: photo.width_l,
    smallHeight: photo.height_n || 180,
    smallWidth: photo.width_n || 320,
    tags: photo.tags.split(' '),
    urlLarge: photo.url_l,
    urlOriginal: photo.url_o,
    urlSmall: photo.url_n || photo.url_m,
    video: photo.media === 'video',
    videoUrl: `https://www.flickr.com/photos/${process.env.REACT_APP_FLICKR_USER}/${photo.id}/play/hd/${photo.secret}`,
  }));
}
