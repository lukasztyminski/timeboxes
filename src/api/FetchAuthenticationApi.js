const URL_API = 'http://localhost:4000';

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

const FetchAuthenticationAPI = {
  login: async function (credentials) {
    const response = await makeRequest(`${URL_API}/login`, 'POST', credentials);
    return await response.json();
  },
};

export default FetchAuthenticationAPI;
