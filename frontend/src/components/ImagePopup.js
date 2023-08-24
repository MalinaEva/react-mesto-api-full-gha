import useClosePopup from '../hooks/useClosePopup';

function ImagePopup ({ card, onClose }) {
	const isOpen = Object.keys(card).length !== 0;
	const handleCloseOverlay = useClosePopup(isOpen, onClose);

	return (
		<div onClick={handleCloseOverlay}
		     className={`popup popup_animated popup_type_img ${isOpen ? 'popup_opened' : ''}`}>
			<figure className="popup__container popup__container_type_img">
				<button onClick={onClose} className="popup__button-close" type="button"></button>
				<img alt={card.name}
				     className="popup__image"
				     src={card.link}
				/>
				<figcaption className="popup__title popup__title_theme_dark">{card.name}</figcaption>
			</figure>
		</div>
	);
}

export default ImagePopup;
