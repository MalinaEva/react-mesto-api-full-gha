import useClosePopup from '../hooks/useClosePopup';

function PopupWithForm ({ title, name, children, isOpen, onClose, onSubmit, buttonText }) {
	const handleCloseOverlay = useClosePopup(isOpen, onClose);

	return (
		<div className={`popup popup_animated popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={handleCloseOverlay}>
			<div className="popup__container">
				<button className="popup__button-close" type="button" onClick={onClose}></button>
				<h2 className="popup__title">{title}</h2>
				<form className={`popup__form popup__form_${name}`} name={name} noValidate onSubmit={onSubmit}>
					{children}
					<button className="popup__button-submit" type="submit">{buttonText}</button>
				</form>
			</div>
		</div>
	);
}

export default PopupWithForm;
