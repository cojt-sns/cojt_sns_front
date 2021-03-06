import { cacheAdapterEnhancer } from 'axios-extensions';
import LRUCache from 'lru-cache';
import lodash from 'lodash';

// eslint-disable-next-line import/no-mutable-exports
export let axios;

export default ({ store, $axios, redirect, env }) => {
  const defaultCache = new LRUCache({ maxAge: Number(env.CACHE_TIME) });
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
    return Promise.reject(error.response);
  });

  axios = $axios;
};
