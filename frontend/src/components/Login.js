import React, { useState } from 'react';

function Login (props) {
	const [userData, setUserData] = useState({
		password: '',
		email: ''
	});

	function handleChange (evt) {
		const { name, value } = evt.target;
		setUserData({
			...userData,
			[name]: value,
		});
	}

	function handleSubmit (event) {
		event.preventDefault();
		props.onLogin({
			password: userData.password,
			email: userData.email
		});
	}

	return (
		<div className="signin">
			<div className="signin__container">
				<h2 className="signin__title">Вход</h2>
				<form
					className="signin__form"
					name="login"
					onSubmit={handleSubmit}
				>
					<input className="signin__input popup__input_type_email"
					       id="input-email"
					       name="email"
					       placeholder="Email"
					       required
					       type="email"
					       value={userData.email}
					       onChange={handleChange}
					/>
					<input className="signin__input popup__input_type_password"
					       id="input-password"
					       name="password"
					       placeholder="Пароль"
					       required
					       minLength={6}
					       type="password"
					       value={userData.password}
					       onChange={handleChange}
					/>
					<button className="signin__button-submit" type="submit">Войти</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
