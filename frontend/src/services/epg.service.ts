function handleResponse(response: any) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        // logout();
        // location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

async function getProgrammes(dateStr: string) {
  const requestOptions = {
    method: 'GET',
  };
  const url2 = 'http://127.0.0.1:3000/api/v1/epg?date=';
  const url = 'https://epg-api.video.globo.com/programmes/1337?date=';
  const cors = `http://cors-anywhere.herokuapp.com/${url}`;

  const response = await fetch(`${url2}${dateStr}`, requestOptions);
  return handleResponse(response);
}

const epgService = {
  getProgrammes,
};

export default epgService;
