import editButton from '../images/editButton.svg';
import React, { useContext } from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main ({
	cards,
	onEditProfile,
	onAddPlace,
	onEditAvatar,
	onCardClick,
	onCardLike,
	onCardDelete
}) {
	const currentUser = useContext(CurrentUserContext);

	return (
		<main className="content">
			<section className="profile">
				<div className="profile__info">
					<div onClick={onEditAvatar} className="profile__avatar">
						<img alt="Фото профиля"
						     className="profile__avatar-image"
						     src={currentUser.avatar}
						/>
						<div className="profile__avatar-overlay">
							<img src={editButton} alt="Редактировать" className="profile__avatar-edit-icon"/>
						</div>
					</div>
					<div className="profile__item">
						<div className="profile__header">
							<h1 className="profile__title">{currentUser.name}</h1>
							<p className="profile__text">{currentUser.about}</p>
						</div>
						<button onClick={onEditProfile} className="profile__edit-button"
						        type="button"></button>
					</div>
				</div>
				<button onClick={onAddPlace} className="profile__add-button" type="button"></button>
			</section>

			<section className="elements">
				{cards.map((card) => (
					<Card onCardClick={onCardClick}
					      onCardDelete={onCardDelete}
					      onCardLike={onCardLike}
					      key={card._id}
					      card={card}/>
				))}
			</section>
		</main>
	);
}

export default Main;
