import axios from 'axios';

class Api {
	install(Vue) {
		Vue.prototype.$api = this;
		this._api = axios.create({
			crossDomain: true,
			headers: {
				'accept': 'application/json',
				'accept-language': 'en_US'
			},
			baseURL: 'http://remcon.szmagli.ctit.pl/wp-json/wp/v2/',
			timeout: 10000,
		});
	}

	fetchPage (page) {
		return new Promise((resolve, reject)  => {
			this._api.get(`pages/${page}`
			).then(function (response) {
				resolve(response.data);
			}).catch(function (error) {
				reject(error.response.data);
			});
		});
	}

	fetchPosts (post) {
		return new Promise((resolve, reject)  => {
			this._api.get(`posts/${post}`
			).then(function (response) {
				resolve(response.data);
			}).catch(function (error) {
				reject(error.response.data);
			});
		});
	}

	fetchMedia (id, size) {
		return new Promise((resolve, reject)  => {
			this._api.get(`media/${id}`
			).then(function (response) {
				resolve(response.data.media_details.sizes[size]);
			}).catch(function (error) {
				reject(error.response.data);
			});
		});
	}
	
	fetchEvents () {
		return new Promise((resolve, reject)  => {
			this._api.get('http://remcon.szmagli.ctit.pl/wp-content/uploads/events.json'
			).then(function (response) {
				resolve(response.data);
			}).catch(function (error) {
				reject(error.response.data);
			});
		});
	}
}

export default Api;