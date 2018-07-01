import Vue from 'vue';
import Router from 'vue-router';
import VueProgressBar from 'vue-progressbar';

import Homepage from './components/Homepage';
import Article from './components/article/article';
import Roadmap from './components/roadmap/roadmap';
import Page from './components/Page';

const options = {
	color: '#92C1E9',
	failedColor: '#874b4b',
	thickness: '5px',
	transition: {
		speed: '0.2s',
		opacity: '0.6s',
		termination: 300
	},
	autoRevert: true,
	location: 'top',
	inverse: false
};

Vue.use(Router);
Vue.use(VueProgressBar, options);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Hello',
			component: Homepage
		},
		{
			path: '/article/:id',
			name: 'Article',
			component: Article
		},
		{
			path: '/plan',
			name: 'Plan imprezy',
			component: Roadmap
		},
		{
			path: '/informacje',
			name: 'Informacje',
			component: Page,
			meta: {
				id: 359
			}
		},
		{
			path: '/wystawcy',
			name: 'Wystawcy',
			component: Page,
			meta: {
				id: 854
			}
		},
		{
			path: '/kontakt',
			name: 'Kontakt',
			component: Page,
			meta: {
				id: 353
			}
		}
	]
});