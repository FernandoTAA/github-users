import axios from 'axios';

function* CallUrl(method, url, data, type, responsetype) {
  const formData = new FormData();
  const responseType = responsetype === undefined ? 'json' : responsetype;
  const contentType = type === undefined ? 'application/json' : 'multipart/form-data';
  const files = Array.isArray(data) ? data.map(item => formData.append('file', item.file)) : formData.append('file', data);
  const bodyRequest = contentType === 'application/json' ? data : files;

  const call = yield axios(url, {
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

export default CallUrl;
