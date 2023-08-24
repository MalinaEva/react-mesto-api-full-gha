import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card ({ card, onCardClick, onCardDelete, onCardLike }) {
	const currentUser = useContext(CurrentUserContext);
	const isOwn = card.owner._id === currentUser._id;
	const isLiked = card.likes.some(i => i._id === currentUser._id);
	const cardLikeButtonClassName = `element__like-button ${isLiked ? 'element__like-button_active' : ''}`;

	function handleClick () {
		onCardClick(card);
	}

	function handleDeleteClick () {
		onCardDelete(card);
	}

	function handleLikeClick () {
		onCardLike(card);
	}

	return (
		<div className="element" key={card._id}>
			<img alt={card.name} className="element__img" src={card.link} onClick={handleClick}/>
			{isOwn && <button onClick={handleDeleteClick} className="element__button-del" type="button"/>}
			<div className="element__block">
				<h2 className="element__title">{card.name}</h2>
				<div className="element__like">
					<button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button"/>
					<div className="element__like-counter">{card.likes.length}</div>
				</div>
			</div>
		</div>
	);
}

export default Card;
