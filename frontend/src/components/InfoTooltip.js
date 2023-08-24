import useClosePopup from '../hooks/useClosePopup';

function InfoTooltip ({ isOpen, title, onClose, image }) {
	const handleCloseOverlay = useClosePopup(isOpen, onClose);
	return (
		<div className={`popup popup_animated popup_type_tooltip ${isOpen ? 'popup_opened' : ''}`}
		     onClick={handleCloseOverlay}>
			<div className="popup__container">
				<button className="popup__button-close" type="button" onClick={onClose}></button>
				<img className="popup__image popup__image_type_tooltip" src={image} alt={title}/>
				<h2 className="popup__title popup__title_type_tooltip">{title}</h2>
			</div>
		</div>
	);
}

export default InfoTooltip;
