import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup ({ isOpen, onClose, onUpdateAvatar }) {
	const avatarRef = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		onUpdateAvatar(avatarRef.current.value);
	};

	return (
		<PopupWithForm
			name="avatar-edit"
			title="Обновить аватар"
			buttonText="Сохранить"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<input className="popup__input popup__input_type_avatar" id="input-avatar" name="avatar"
			       placeholder="Ссылка на картинку"
			       required type="url" ref={avatarRef}/>
			<p className="popup__input-message" id="input-avatar-message"></p>
		</PopupWithForm>
	);
}

export default EditAvatarPopup;
