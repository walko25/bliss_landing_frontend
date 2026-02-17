import { useState } from 'react';
import { Link } from 'react-router-dom';
import blissLandingLogo from '../../assets/bliss-landing-logo.jpeg';
import { useAuth } from '../../contexts/AuthContext';
import Modal from '../Modal/Modal';
import './Navigation.css';

function Navigation() {
  const { user, signup, logout } = useAuth();
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    signup(formData);
    setActiveModal(null);
    setFormData({ firstName: '', lastName: '', email: '', password: '' });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simplified login - in real app would verify credentials
    signup(formData);
    setActiveModal(null);
    setFormData({ firstName: '', lastName: '', email: '', password: '' });
  };

  const handleLogout = () => {
    logout();
    setActiveModal(null);
  };

  return (
    <nav className="navigation">
      <div className="navigation__container">
        <div className="navigation__logo">
          <Link to="/" className="navigation__logo-link">
            <img src={blissLandingLogo} alt="Bliss Landing" className="navigation__logo-image" />
          </Link>
        </div>
        <ul className="navigation__menu">
          <li className="navigation__item">
            <Link to="/" className="navigation__link">
              Welcome
            </Link>
          </li>
          <li className="navigation__item">
            <Link to="/whale-sightings" className="navigation__link">
              Whale Sightings
            </Link>
          </li>
          <li className="navigation__item">
            <Link to="/court-reservations" className="navigation__link">
              Court Reservations
            </Link>
          </li>
        </ul>
        <div className="navigation__auth">
          {user ? (
            <button
              className="navigation__auth-button"
              onClick={() => setActiveModal('account')}
            >
              Hello, {user.firstName}
            </button>
          ) : (
            <>
              <button
                className="navigation__auth-button"
                onClick={() => setActiveModal('signup')}
              >
                Sign Up
              </button>
              <button
                className="navigation__auth-button"
                onClick={() => setActiveModal('login')}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>

      {/* Sign Up Modal */}
      <Modal isOpen={activeModal === 'signup'} onClose={() => setActiveModal(null)}>
        <h2 className="modal__title">Sign Up</h2>
        <form className="auth-form" onSubmit={handleSignup}>
          <div className="auth-form__group">
            <label className="auth-form__label">First Name</label>
            <input
              type="text"
              name="firstName"
              className="auth-form__input"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="auth-form__group">
            <label className="auth-form__label">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="auth-form__input"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="auth-form__group">
            <label className="auth-form__label">Email</label>
            <input
              type="email"
              name="email"
              className="auth-form__input"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="auth-form__group">
            <label className="auth-form__label">Password</label>
            <input
              type="password"
              name="password"
              className="auth-form__input"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="auth-form__submit">Sign Up</button>
        </form>
      </Modal>

      {/* Login Modal */}
      <Modal isOpen={activeModal === 'login'} onClose={() => setActiveModal(null)}>
        <h2 className="modal__title">Login</h2>
        <form className="auth-form" onSubmit={handleLogin}>
          <div className="auth-form__group">
            <label className="auth-form__label">Email</label>
            <input
              type="email"
              name="email"
              className="auth-form__input"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="auth-form__group">
            <label className="auth-form__label">Password</label>
            <input
              type="password"
              name="password"
              className="auth-form__input"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="auth-form__submit">Login</button>
        </form>
      </Modal>

      {/* Account Modal */}
      <Modal isOpen={activeModal === 'account'} onClose={() => setActiveModal(null)}>
        <h2 className="modal__title">Account Information</h2>
        {user && (
          <div className="account-info">
            <div className="account-info__item">
              <span className="account-info__label">First Name:</span>
              <span className="account-info__value">{user.firstName}</span>
            </div>
            <div className="account-info__item">
              <span className="account-info__label">Last Name:</span>
              <span className="account-info__value">{user.lastName}</span>
            </div>
            <div className="account-info__item">
              <span className="account-info__label">Email:</span>
              <span className="account-info__value">{user.email}</span>
            </div>
            <button className="auth-form__submit auth-form__submit--logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </Modal>
    </nav>
  );
}

export default Navigation;
