import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  const currentUserInfo = React.useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUserInfo.name);
    setDescription(currentUserInfo.about);
  }, [currentUserInfo, isOpen]);

  const handleChangeName = e => {
    setName(e.target.value);
  };

  const handleChangeDescription = e => {
    setDescription(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    //здесь вызывается функция handleUpdateUser из компонента App, где в качестве объекта передаются стейты из инпутов
    onUpdateUser({
      name: name,
      about: description
    });
  };

  return (
    <PopupWithForm
      buttonText="Сохранить"
      title="Редактировать профиль"
      name="add_edit"
      isOpen={isOpen}
      onClose={onClose}
      //дальше в качестве handleSubmit передается опять же функция из App handleUpdateUser, но уже с нашим объектом, и вызывается по клику на кпонку сохранить
      onSubmit={handleSubmit}
    >
      <input
        id="user-name-input"
        className="popup__input popup__input_user-info_name"
        name="name"
        type="text"
        required
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        onChange={handleChangeName}
        value={name || ''}
      />
      <span className="user-name-input-error popup__error"></span>
      <input
        id="user-job-input"
        className="popup__input popup__input_user-info_job"
        name="about"
        type="text"
        required
        placeholder="Профессия"
        minLength="2"
        maxLength="200"
        onChange={handleChangeDescription}
        value={description || ''}
      />
      <span className="user-job-input-error popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
