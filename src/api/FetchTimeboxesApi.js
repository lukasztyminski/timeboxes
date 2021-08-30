const URL_API = 'http://localhost:4000/timeboxes';

async function makeRequest(url, method, body) {
  const jsonBody = body ? JSON.stringify(body) : undefined;
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: jsonBody,
  });
  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  return response;
}

const FetchTimeboxesAPI = {
  getAllTimeboxes: async function () {
    const response = await makeRequest(URL_API, 'GET');
    return await response.json();
  },
  addTimebox: async function (timeboxToAdd) {
    const response = await makeRequest(URL_API, 'POST', timeboxToAdd);
    return await response.json();
  },
  replaceTimebox: async function (timeboxToReplace) {
    if (!timeboxToReplace.id) {
      throw new Error('Timebox has to have an id to be updated');
    }

    const response = await makeRequest(
      `${URL_API}/${timeboxToReplace.id}`,
      'PUT',
      timeboxToReplace
    );

    return await response.json();
  },
  partiallyUpdateTimebox: async function (timeboxToUpdate) {},
  removeTimebox: async function (timeboxToRemove) {
    if (!timeboxToRemove.id) {
      throw new Error('Timebox has to have an id to be updated');
    }
    await makeRequest(`${URL_API}/${timeboxToRemove.id}`, 'DELETE');
  },
};

export default FetchTimeboxesAPI;
