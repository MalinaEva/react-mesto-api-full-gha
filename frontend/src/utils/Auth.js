import { BASE_URL } from './constants';

class Auth {
	constructor ({ url, headers }) {
		this._url = url;
		this._headers = headers;
	}

	_getResponse (response) {
		return response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`);
	}

	register ({ password, email }) {
		return fetch(`${this._url}/signup`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({ password, email })
		})
		.then(this._getResponse);
	}

	authorize ({ password, email }) {
		return fetch(`${this._url}/signin`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({ email, password })
		})
		.then(this._getResponse);
	}

	getContent (token) {
		return fetch(`${this._url}/users/me`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		})
		.then(this._getResponse);
	}
}



const auth = new Auth({
    url: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default auth;
