import Vue from 'vue';
import axios from 'axios';

Vue.mixin({
  methods: {
    get(url, arg) {
      return axios.get(process.env.SERVER_URL + url);
    },
  },
});
