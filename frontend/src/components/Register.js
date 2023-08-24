import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register ({ ...props }) {
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

	const handleSubmit = (event) => {
		event.preventDefault();
		props.onRegister({
			password: userData.password,
			email: userData.email
		});
	};

	return (
		<div className="signup">
			<div className="signup__container">
				<h2 className="signup__title">Регистрация</h2>
				<form
					className="signup__form"
					name="login"
					onSubmit={handleSubmit}
				>
					<input className="signup__input signup__input_type_email"
					       id="input-email"
					       name="email"
					       placeholder="Email"
					       required
					       type="email"
					       value={userData.email}
					       onChange={handleChange}
					/>
					<input className="signup__input signup__input_type_password"
					       id="input-password"
					       name="password"
					       placeholder="Пароль"
					       required
					       minLength={6}
					       type="password"
					       value={userData.password}
					       onChange={handleChange}
					/>
					<button className="signup__button-submit" type="submit">Зарегистрироваться</button>
					<Link className="signup__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
				</form>
			</div>
		</div>
	);
}

export default Register;
