import axios from 'axios';
import { iFlickrApiResponse, iImage } from '../consts/types';
import { FlickrResponseToImages } from './flickrUtilities';

const flickrEndPoint = 'https://api.flickr.com/services/rest/?method=';
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
  const endpoint = `${process.env.REACT_APP_AWS_API_BASE_URL}/images/${pageNumber}/${resultsPerPage}`;
  const response: { data: iImage[] } = await axios.get(endpoint);
  return response.data;
}

async function Search(
  pageNumber: number | null,
  resultsPerPage: number | null,
  tags: string | null,
  searchString: string | null,
): Promise<Array<iImage>> {
  const endpoint =
    `${flickrEndPoint}${flickSearchMethod}${flickrApiKey}${flickrParams}&` +
    `tags=${tags}&tag_mode=all&text=${searchString}&per_page=${
      resultsPerPage || 25
    }&page=${pageNumber || 1}`;
  return FlickrResponseToImages(await fetchFlickr(endpoint));
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

  return FlickrResponseToImages(await fetchFlickr(endpoint));
}

export { GetRecent, MonthsAgo, Search };
