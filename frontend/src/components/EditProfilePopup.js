import React, { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup ({ isOpen, onClose, onUpdateUser }) {
	const currentUser = useContext(CurrentUserContext);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');

	useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser, isOpen]);

	const handleSubmit = (e) => {
		e.preventDefault();
		onUpdateUser({
			name,
			about: description,
		});
	};

	return (
		<PopupWithForm
			name="edit"
			title="Редактировать профиль"
			buttonText="Сохранить"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<input className="popup__input popup__input_type_name"
			       id="input-name"
			       maxLength="40"
			       minLength="2"
			       name="name"
			       placeholder="Имя"
			       required
			       type="text"
			       value={name}
			       onChange={(e) => setName(e.target.value)}
			/>
			<p className="popup__input-message" id="input-name-message"></p>
			<input className="popup__input popup__input_type_description"
			       id="input-description"
			       maxLength="200"
			       minLength="2"
			       name="about"
			       placeholder="О себе"
			       required
			       type="text"
			       value={description}
			       onChange={(e) => setDescription(e.target.value)}/>
			<p className="popup__input-message" id="input-description-message"></p>
		</PopupWithForm>
	);
}

export default EditProfilePopup;
