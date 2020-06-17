// eslint-disable-next-line import/no-mutable-exports
export let axios;

export default ({ store, $axios, redirect }) => {
  $axios.onRequest((config) => {
    config.headers.common.Authorization = store.$auth.getToken('local');
    config.headers.common.Accept = 'application/json';
  });

  $axios.onResponse((response) => {
    return Promise.resolve(response);
  });

  $axios.onError((error) => {
    if (error.response.status === 401) redirect(301, '/login');
    return Promise.reject(error.response);
  });

  axios = $axios;
};
