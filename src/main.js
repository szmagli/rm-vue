import Vue from 'vue';
import VueHead from 'vue-head';
import App from './App.vue';
import router from './router';
import Api from './libs/api';
import StorageEngine from './libs/storage';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(new Api());
Vue.use(StorageEngine,{
	state: {
		homepage: {},
	},
	mutations: {
	}
});
Vue.use(VueHead);


Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyAnnF9VWqfb7KQMD9dxE-CAoECdM1vrvHc',
		libraries: 'places' // necessary for places input
	}
});

new Vue({
	el: '#app',
	router,
	head: {
		meta: [
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1'
			},
			{
				property: 'theme-color',
				content: '#92c1e9'
			}
		]
	},
	render: h => h(App)
});