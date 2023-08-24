import { apiAccess } from './constants';

class ApiClient {
	constructor (options) {
		this._baseUrl = options.baseUrl;
	}

    _getToken() {
        return `Bearer ${localStorage.getItem('jwt')}`;
    }

	_getHeaders (additionalHeaders = {}) {
		return {
			authorization: this._getToken(),
			'Content-Type': 'application/json',
			...additionalHeaders,
		};
	}

	_handleResponse (res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	}

	getUserInfo () {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: this._getHeaders()
		}).then(this._handleResponse);
	}

	getInitialCards () {
		return fetch(`${this._baseUrl}/cards`, {
			headers: this._getHeaders()
		}).then(this._handleResponse);
	}

	updateProfile (name, about) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: this._getHeaders(),
			body: JSON.stringify({
				name: name,
				about: about
			})
		}).then(this._handleResponse);
	}

	addNewCard (name, link) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: this._getHeaders(),
			body: JSON.stringify({
				name: name,
				link: link
			})
		}).then(this._handleResponse);
	}

	deleteCard (cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}`, {
			method: 'DELETE',
			headers: this._getHeaders()
		}).then(this._handleResponse);
	}

	toggleLike (cardId, like) {
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: like ? 'PUT' : 'DELETE',
			headers: this._getHeaders()
		}).then(this._handleResponse);
	}

	updateAvatar (avatar) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._getHeaders(),
			body: JSON.stringify({
				avatar: avatar
			})
		}).then(this._handleResponse);
	}

	getInitialData () {
		return Promise.all([this.getUserInfo(), this.getInitialCards()]);
	}
}

export default new ApiClient(apiAccess);
