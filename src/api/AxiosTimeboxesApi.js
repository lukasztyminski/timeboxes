import { TIMEBOXES_API } from './consts';
import makeRequestAxios from './makeAxiosRequest';

const { TIMEBOXES_URL } = TIMEBOXES_API;

const AxiosTimeboxesAPI = {
  getAllTimeboxes: async function () {
    try {
      const response = await makeRequestAxios.get(TIMEBOXES_URL);
      const timeboxes = response.data;
      return timeboxes;
    } catch (e) {
      throw new Error(e);
    }
  },
  addTimebox: async function (timeboxToAdd) {
    try {
      const response = await makeRequestAxios.post(TIMEBOXES_URL, timeboxToAdd);
      const addedTimebox = response.data;
      return addedTimebox;
    } catch (e) {
      throw new Error(e);
    }
  },
  getTimeboxesByFullTextSearch: async function (searchQuery, accessToken) {
    try {
      if (searchQuery && searchQuery.length > 0) {
        const safeQuery = encodeURIComponent(searchQuery);
        const response = await makeRequestAxios.get(
          `${TIMEBOXES_URL}/?q=${safeQuery}`
        );
        const searchedTimeboxes = response.data;
        return searchedTimeboxes;
      } else {
        this.getAllTimeboxes();
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  partiallyUpdateTimebox: async function (timeboxToUpdate) {
    try {
      if (!timeboxToUpdate.id) {
        throw new Error('Timebox has to have an id to be updated');
      }
      const response = await makeRequestAxios.patch(
        `${TIMEBOXES_URL}/${timeboxToUpdate.id}`,
        timeboxToUpdate
      );
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  },
  removeTimebox: async function (timeboxToRemove) {
    try {
      if (!timeboxToRemove.id) {
        throw new Error('Timebox has to have an id to be updated');
      }
      await makeRequestAxios.delete(`${TIMEBOXES_URL}/${timeboxToRemove.id}`);
    } catch (e) {
      throw new Error(e);
    }
  },
  login: async function (credentials) {
    try {
      const response = await makeRequestAxios.post(`/login`, credentials);
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  },
};

export default AxiosTimeboxesAPI;
