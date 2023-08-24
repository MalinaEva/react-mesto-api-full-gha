import '../index.css';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import Auth from '../utils/Auth';
import successImage from '../images/success.svg';
import failImage from '../images/fail.svg';

function App () {
	const navigate = useNavigate();
	const [cards, setCards] = useState([]);
	const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
	const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
	const [isPlacePopupOpen, setIsPlacePopupOpen] = useState(false);
	const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState({});
	const [currentUser, setCurrentUser] = useState({
		avatar: '',
		name: '',
		about: '',
	});

	const [loggedIn, setLoggedIn] = useState(false);
	const [tooltipText, setTooltipText] = useState('');
	const [registered, setRegistered] = useState(false);
	const [isTooltipOpen, setIsTooltipOpen] = useState(false);
	const [userData, setUserData] = useState({ email: '' });

	useEffect(() => {
		tockenCheck();
	}, [navigate]);

	useEffect(() => {
		api.getInitialCards()
		.then((cardData) => {
			setCards(cardData);
		})
		.catch((error) => {
			console.error(`Error fetching cards data: ${error}`);
		});
	}, []);

	useEffect(() => {
		api.getUserInfo()
		.then((userData) => setCurrentUser(userData))
		.catch((err) => console.log(err));
	}, [loggedIn]);

	const closeAllPopups = () => {
		setIsAvatarPopupOpen(false);
		setIsProfilePopupOpen(false);
		setIsPlacePopupOpen(false);
		setConfirmationPopupOpen(false);
		setSelectedCard({});
		setIsTooltipOpen(false);
	};
	const handleEditAvatarClick = () => {
		setIsAvatarPopupOpen(true);
	};

	const handleEditProfileClick = () => {
		setIsProfilePopupOpen(true);
	};

	const handleAddPlaceClick = () => {
		setIsPlacePopupOpen(true);
	};

	const handleCardClick = (card) => {
		setSelectedCard(card);
	};

	function handleCardLike (card) {
		const isLiked = card.likes.some(i => i._id === currentUser._id);

		api.toggleLike(card._id, !isLiked).then((newCard) => {
			setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
		}).catch((error) => {
			console.error(`Error toggling like: ${error}`);
		});
	}

	function handleDeleteClick (card) {
		api.deleteCard(card._id).then(() => {
			setCards((state) => state.filter((c) => c._id !== card._id));
		}).catch((error) => {
			console.error(`Error deleting card: ${error}`);
		});
	}

	function handleUpdateUser ({ name, about }) {
		api.updateProfile(name, about).then((userData) => {
			setCurrentUser(userData);
			closeAllPopups();
		}).catch((error) => {
			console.error(`Error updating profile: ${error}`);
		});
	}

	function handleUpdateAvatar (avatar) {
		api.updateAvatar(avatar).then((userData) => {
			setCurrentUser(userData);
			closeAllPopups();
		}).catch((error) => {
			console.error(`Error updating avatar: ${error}`);
		});
	}

	function handleAddPlaceSubmit ({ title, url }) {
		api.addNewCard(title, url).then((newCard) => {
			setCards([newCard, ...cards]);
			closeAllPopups();
		}).catch((error) => {
			console.error(`Error adding new card: ${error}`);
		});
	}

	function handleRegister ({ password, email }) {
		Auth.register({ password, email }).then(() => {
			setRegistered(true);
			setTooltipText('Вы успешно зарегистрировались!');
			setIsTooltipOpen(true);
			navigate('/sign-in');

		}).catch((error) => {
			console.error(`Error registering: ${error}`);
			setTooltipText('Что-то пошло не так! Попробуйте ещё раз.');
			setIsTooltipOpen(true);
		});
	}

	function handleLogin ({ password, email }) {
		Auth.authorize({ password, email }).then((response) => {
			localStorage.setItem('jwt', response.token);
			setLoggedIn(true);
			setUserData({
				password: password,
				email: email
			});
			navigate('/');
		}).catch((error) => {
			console.error(`Error logging in: ${error}`);
			setRegistered(false);
			setTooltipText('Что-то пошло не так! Попробуйте ещё раз.');
			setIsTooltipOpen(true);
		});
	}

	function handleSignOut () {
		localStorage.removeItem('jwt');
		setLoggedIn(false);
		setUserData({
			password: '',
			email: ''
		});
		navigate('/sign-in');
	}

	function tockenCheck () {
		const jwt = localStorage.getItem('jwt');
		if (jwt) {
			Auth.getContent(jwt)
			.then((response) => {
				setLoggedIn(true);
				setUserData({
					email: response.email
				});
				navigate('/');
			})
			.catch(err => console.error(err));
		}
	}

	return (
		<div className="page">
			<CurrentUserContext.Provider value={currentUser}>
				<Routes>
					<Route path="/" element={
						<>
							<ProtectedRoute
								loggedIn={loggedIn}
								element={Header}
								headerText="Выйти"
								linkTo={'/sign-in'}
								email={userData.email}
								onSignOut={handleSignOut}
							/>
							<ProtectedRoute
								loggedIn={loggedIn}
								element={Main}
								onEditProfile={handleEditProfileClick}
								onAddPlace={handleAddPlaceClick}
								onEditAvatar={handleEditAvatarClick}
								onCardClick={handleCardClick}
								onCardLike={handleCardLike}
                                onCardDelete={handleDeleteClick}
								cards={cards}
							/>
							<ProtectedRoute
								loggedIn={loggedIn}
								element={Footer}
							/>
						</>
					}/>
					<Route path="/sign-up"
					       element={
						       <>
							       <Header
								       headerText={'Вход'}
								       linkTo={'/sign-in'}
								       email=""
							       />
							       <Register
								       onRegister={handleRegister}
							       />
							       <Footer/>
						       </>
					       }
					/>

					<Route path="/sign-in"
					       element={
						       <>
							       <Header
								       headerText={'Регистрация'}
								       linkTo={'/sign-up'}
								       email=""
							       />
							       <Login onLogin={handleLogin}/>
							       <Footer/>
						       </>
					       }
					/>
					<Route
						path="*"
						element={loggedIn ? <Navigate to="/"/> : <Navigate to="/sign-in"/>}
					/>
				</Routes>
				<EditProfilePopup isOpen={isProfilePopupOpen} onClose={closeAllPopups}
				                  onUpdateUser={handleUpdateUser}/>
				<AddPlacePopup isOpen={isPlacePopupOpen} onClose={closeAllPopups}
				               onAddPlace={handleAddPlaceSubmit}/>
				<EditAvatarPopup isOpen={isAvatarPopupOpen} onClose={closeAllPopups}
				                 onUpdateAvatar={handleUpdateAvatar}/>
				<PopupWithForm
					name="submit"
					title="Вы уверены?"
					buttonText="Да"
					isOpen={isConfirmationPopupOpen}
					onClose={closeAllPopups}
					onSubmit={() => console.log('Submit ok')}
				/>
				<ImagePopup card={selectedCard} onClose={closeAllPopups}/>
				<InfoTooltip
					isOpen={isTooltipOpen}
					title={tooltipText}
					onClose={closeAllPopups}
					image={registered ? successImage : failImage}
				/>
			</CurrentUserContext.Provider>
		</div>
	);
}

export default App;
