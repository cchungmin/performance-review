import Fetch from 'fetch-ponyfill';

const { fetch } = Fetch();

const get = async url => fetch(url).then(res => res.json());

const post = (url, postData) => (
  fetch(url, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  }).then(res => res.json())
);

export {
  get,
  post,
};
