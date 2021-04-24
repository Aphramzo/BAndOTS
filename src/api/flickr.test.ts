import { iImage } from '../consts/types';
import * as FlickrApi from './flickr';
import { FlickrResponseToImages } from './flickrUtilities';

jest.mock('./flickrUtilities');
jest.spyOn(window, 'fetch');

// TODO: already see these getting a little tedious.
// What's a better solution?
const mockedFlickrResponseToImages = FlickrResponseToImages as jest.Mock<
  Array<iImage>
>;
const mockedFetch = window.fetch as jest.Mock;

describe('flickrApi', () => {
  afterEach(jest.resetAllMocks);
  const mockSuccess = (): void => {
    mockedFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });
  };

  describe('GetRecent', () => {
    it('calls endpoint as expected', async () => {
      mockSuccess();
      await FlickrApi.GetRecent(1, 20);
      expect(window.fetch).toHaveBeenCalledWith(
        `https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=FAKE_API_KEY&user_id=FAKE_USER_ID&extras=date_taken,url_n,url_m,url_o,url_l,description,tags,media` +
          '&format=json&nojsoncallback=1&sort=date-taken-desc&per_page=20&page=1',
      );
    });

    it('returns result of FlickrResponseToImages', async () => {
      mockSuccess();
      const expectResult = [{ description: 'Its a trap' } as iImage];
      mockedFlickrResponseToImages.mockImplementation(() => expectResult);
      const result = await FlickrApi.GetRecent(1, 20);
      expect(result).toEqual(expectResult);
    });
  });

  describe('Search', () => {
    it('defaults numbers as expected', async () => {
      mockSuccess();
      await FlickrApi.Search(null, null, null, null);
      expect(window.fetch).toHaveBeenLastCalledWith(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=FAKE_API_KEY&user_id=FAKE_USER_ID&extras=date_taken,url_n,url_m,url_o,url_l,description,tags,media` +
          '&format=json&nojsoncallback=1&sort=date-taken-desc&tags=null&tag_mode=all&text=null&per_page=25&page=1',
      );
    });

    it('calls endpoint with all params', async () => {
      mockSuccess();
      await FlickrApi.Search(2, 20, 'tagsHere', 'someText');
      expect(window.fetch).toHaveBeenLastCalledWith(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=FAKE_API_KEY&user_id=FAKE_USER_ID&extras=date_taken,url_n,url_m,url_o,url_l,description,tags,media` +
          '&format=json&nojsoncallback=1&sort=date-taken-desc&tags=tagsHere&tag_mode=all&text=someText&per_page=20&page=2',
      );
    });
  });
});
