import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header ({ headerText, linkTo, email, onSignOut }) {
	return (
		<header className="header">
			<img src={logo} alt="Логотип Место" className="header__logo"/>
			<div className="header__menu">
				<p className="header__email">{email}</p>
				<button className="header__button" onClick={onSignOut}>
					<Link className="header__link" to={linkTo}>{headerText}</Link>
				</button>
			</div>
		</header>
	);
}

export default Header;
