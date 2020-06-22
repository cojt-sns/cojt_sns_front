import { cacheAdapterEnhancer } from 'axios-extensions';
import LRUCache from 'lru-cache';
import lodash from 'lodash';

// eslint-disable-next-line import/no-mutable-exports
export let axios;

export default ({ store, $axios, redirect }) => {
  const defaultCache = new LRUCache({ maxAge: 60000 });
  $axios.defaults.adapter = cacheAdapterEnhancer($axios.defaults.adapter, {
    defaultCache,
  });

  $axios.onRequest((config) => {
    config.headers.common.Authorization = store.$auth.getToken('local');
    config.headers.common.Accept = 'application/json';
  });

  $axios.onResponse((response) => {
    return Promise.resolve(lodash.cloneDeep(response));
  });

  $axios.onError((error) => {
    if (error.response.status === 401) {
      redirect('/first');
      return;
    }
    return Promise.reject(error.response);
  });

  axios = $axios;
};
