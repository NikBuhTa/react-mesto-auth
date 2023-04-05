import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'; 
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth.js';
import InfoToolTip from './InfoToolTip';
import successPic from '../images/ok.jpg';
import failPic from '../images/bad.jpg';
import Spinner from './Spinner';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
    const [isInfoToolTipOpen, setIsInfoToolTip] = React.useState(false);

    const [loggedIn, setLoggedIn] = React.useState(false);

    const [selectedCard, isSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [currentUserEmail, setCurrentUserEmail] = React.useState('');
    const [cards, setCards] = React.useState([]);

    const [paramsInfoToolTip, setParamsInfoToolTip] = React.useState({});

    const [isEditAvatarPopupLoading, setIsEditAvatarPopupLoading] = React.useState(false);
    const [isEditProfilePopupLoading, setIsEditProfilePopupLoading] = React.useState(false);
    const [isAddPlacePopupLoading, setIsAddPlacePopupLoading] = React.useState(false);
    const [isDeleteCardPopupLoading, setIsDeleteCardPopupLoading] = React.useState(false);

    const [isLoadingProfile, setIsLoadingProfile] = React.useState(false);
    const [isLoadingCards, setIsLoadingCards] = React.useState(false);
    const [isLoadingPage, setIsLoadingPage] = React.useState(true);

    const navigate = useNavigate();

    function handleRegPageSubmit(info) {
        auth.register(info.email, info.password)
            .then((res) => {
                setIsInfoToolTip(true);
                setParamsInfoToolTip({
                    text: 'Вы успешно зарегистрировались!',
                    imagePath: successPic,
                });
                navigate('./sign-in', {replace: true});
            })
            .catch(err => {
                setIsInfoToolTip(true);
                setParamsInfoToolTip({
                    text: 'Что-то пошло не так! Попробуйте еще раз.',
                    imagePath: failPic,
                })
            });
    }

    function handleLogin(data) {
        auth.login(data.email, data.password)
            .then((res) => {
                localStorage.setItem('jwt', res.token);
                setLoggedIn(true);
                navigate('/', {replace: true});
            })
            .catch(err => alert(err));
    }

    function tokenCheck() {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.getUserEmail(jwt)
                .then((res) =>{
                    setCurrentUserEmail(res.data.email);
                    setLoggedIn(true);
                    setIsLoadingPage(false);
                })
                .catch(err => alert(err));
        }
    }

    function Logout() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(item => item._id === currentUser._id);

        (!isLiked
        ? api.likeCard(card._id)
        : api.dislikeCard(card._id))
            .then(res => {setCards((state) => state.map((c) => c._id === card._id ? res : c))})
            .catch(res => alert(res));
    }

    function handleDeletingCard(card) {
        setIsDeleteCardPopupLoading(true);
        api.deleteCard(card._id)
            .then(res => {
                setCards((state) => state.filter(el => {return el._id !== card._id}));
                closeAllPopups();
            })
            .catch(err => alert(err))
            .finally(() => {
                setIsDeleteCardPopupLoading(false);
            })
    }

    function handleCardDelete(card) {
        setIsDeleteCardPopupOpen(true);
        isSelectedCard(card);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleUpdateAvatar(link) {
        setIsEditAvatarPopupLoading(true);
        api.updateAvatar(link)
            .then(res => {
                setCurrentUser(...currentUser, res);
                closeAllPopups();
            })
            .catch(err =>alert(err))
            .finally(() => setTimeout(() => {setIsEditAvatarPopupLoading(false)}, 0.5))
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleUpdateUser(info) {
        setIsEditProfilePopupLoading(true);
        api.updateUserInfo(info)
            .then(res => {
                setCurrentUser(...currentUser, res);
                closeAllPopups();
            })
            .catch(err => alert(err))
            .finally(() => {
                setIsEditProfilePopupLoading(false);
            })
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleAddPlace({name, link}) {
        setIsAddPlacePopupLoading(true);
        api.addCard({name, link})
            .then(res => {
                setCards([res, ...cards]);
                closeAllPopups();
            })
            .catch(err => alert(err))
            .finally(() => {
                setIsAddPlacePopupLoading(false)
            })
    }

    function handleCardClick(card) {
        setIsImagePopupOpen(true);
        isSelectedCard(card);
    }

    function closeAllPopups() {
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
        setIsDeleteCardPopupOpen(false);
        setIsInfoToolTip(false);
        isSelectedCard({});
    }

    React.useEffect(() => {
        if (loggedIn === true) {
            setIsLoadingProfile(true);
        setIsLoadingCards(true);
        api.getUserInfo()
            .then(res => setCurrentUser(res))
            .catch(err => alert(err))
            .finally(() => setIsLoadingProfile(false))
        api.getCards()
            .then((res) => {
                setCards(res);
            })
            .catch(err => alert(err))
            .finally(() => {
                setIsLoadingCards(false);
            });
        }
    }, [loggedIn]);

    React.useEffect(() => {
        tokenCheck();
    }, [])

    return (
    <CurrentUserContext.Provider value={currentUser} >
        {isLoadingPage ? <Spinner position={'load'}/> 
        :   <>
                <Header loggedIn={loggedIn} userEmail={currentUserEmail} onLogout={Logout}/>
                <Routes>
                    <Route path='/sign-up' element={<Register onSubmit={(info) => handleRegPageSubmit(info)} />} />
                    <Route path='/sign-in' element={<Login loggedIn={loggedIn} onLogin={(data) => handleLogin(data)} />} />
                    <Route path="/" element={<ProtectedRoute element={Main} 
                        onEditProfile={() => handleEditProfileClick()}
                        onAddPlace={() => handleAddPlaceClick()}
                        onEditAvatar={() => handleEditAvatarClick()}
                        onCardClick={(selectedCard) => handleCardClick(selectedCard)}
                        onCardLike={(card) => handleCardLike(card)}
                        onCardDelete={(card) => handleCardDelete(card)}
                        cards = {cards}
                        setCards = {(cards) => {setCards(cards)}}
                        isCardsLoading = {isLoadingCards}
                        isProfileLoading = {isLoadingProfile} 
                        loggedIn={loggedIn} />}
                    />
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
                <Footer />
            </>}
        <InfoToolTip onClose={closeAllPopups} isOpen={isInfoToolTipOpen} info={paramsInfoToolTip}/>
        <EditProfilePopup isLoading={isEditProfilePopupLoading} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={(info) =>handleUpdateUser(info)}/>
        <AddPlacePopup isLoading={isAddPlacePopupLoading} onAddPlace={(info) => handleAddPlace(info)} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <DeleteCardPopup isLoading={isDeleteCardPopupLoading} onClose={closeAllPopups} isOpen={isDeleteCardPopupOpen} selectedCard={selectedCard} onDeleteCard={(card) => handleDeletingCard(card)}/>
        <EditAvatarPopup isLoading={isEditAvatarPopupLoading} onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} onUpdateAvatar={(link) => handleUpdateAvatar(link)} />
        <ImagePopup isOpen={isImagePopupOpen} onClose={() => closeAllPopups()} card={selectedCard} />
    </CurrentUserContext.Provider>
    );
}

export default App;
