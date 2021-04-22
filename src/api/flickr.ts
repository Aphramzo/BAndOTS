import { iFlickrPhoto, iFlickrApiResponse, iImage } from '../consts/types';

function FlickerResponseToImages(
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

const flickrEndPoint = 'https://api.flickr.com/services/rest/?method=';
const flickrMethod = 'flickr.people.getPhotos';
const flickSearchMethod = 'flickr.photos.search';
const flickrApiKey = `&api_key=${process.env.REACT_APP_FLICKR_API}`;
const flickrParams =
  `&user_id=${process.env.REACT_APP_FLICKR_USER}&extras=date_taken,url_n,url_m,url_o,url_l,description,tags,media` +
  '&format=json&nojsoncallback=1&sort=date-taken-desc';

async function fetchFlickr(
  endpoint: string,
): Promise<iFlickrApiResponse | undefined> {
  const response = await window.fetch(endpoint);

  const photos: iFlickrApiResponse = await response.json();
  if (response.ok) {
    return photos;
  } else {
    // TODO: How should we handle errors
    return Promise.reject(new Error());
  }
}

async function GetRecent(
  pageNumber: number,
  resultsPerPage: number,
): Promise<Array<iImage>> {
  const endpoint = `${flickrEndPoint}${flickrMethod}${flickrApiKey}${flickrParams}&per_page=${
    resultsPerPage || 25
  }&page=${pageNumber || 0}`;
  return FlickerResponseToImages(await fetchFlickr(endpoint));
}

async function Search(
  pageNumber: number,
  resultsPerPage: number,
  tags: string | null,
  searchString: string | null,
): Promise<Array<iImage>> {
  const endpoint =
    `${flickrEndPoint}${flickSearchMethod}${flickrApiKey}${flickrParams}&` +
    `tags=${tags}&tag_mode=all&text=${searchString}&per_page=${
      resultsPerPage || 25
    }&page=${pageNumber || 1}`;
  return FlickerResponseToImages(await fetchFlickr(endpoint));
}

async function MonthsAgo(monthsAgo: number): Promise<Array<iImage>> {
  function searchDateCalculator(): Date {
    const currentDate = new Date();
    currentDate.setMonth(
      currentDate.getMonth() + monthsAgo,
      currentDate.getDate(),
    );
    return currentDate;
  }
  function endDate(startDate: Date): Date {
    const returnDate = startDate;
    returnDate.setDate(returnDate.getDate() + 1);
    return returnDate;
  }
  function formatDateToFlickr(formatDate: Date): string {
    return formatDate.toISOString().substring(0, 10);
  }

  const dateToSearch = searchDateCalculator();
  const endpoint =
    `${flickrEndPoint}${flickSearchMethod}${flickrApiKey}${flickrParams}&` +
    `min_taken_date=${formatDateToFlickr(
      dateToSearch,
    )}&max_taken_date=${formatDateToFlickr(endDate(dateToSearch))}`;

  return FlickerResponseToImages(await fetchFlickr(endpoint));
}

export { GetRecent, MonthsAgo, Search };
