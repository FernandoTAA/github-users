import axios from 'axios';
import config from '../../../config.json';

function* CallApi(method, endpoint, data, type, responsetype) {
  const { apiEndpoint } = config;
  const formData = new FormData();
  const responseType = responsetype === undefined ? 'json' : responsetype;
  const contentType = type === undefined ? 'application/json' : 'multipart/form-data';
  const files = Array.isArray(data) ? data.map(item => formData.append('file', item.file)) : formData.append('file', data);
  const bodyRequest = contentType === 'application/json' ? data : files;

  const call = yield axios(`${apiEndpoint}${endpoint}`, {
    method,
    data: contentType === 'application/json' ? bodyRequest : formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': `${contentType}`
    },
    responseType
  })
    .then(response => response)
    .catch(e => e);

  return call;
}

export default CallApi;
