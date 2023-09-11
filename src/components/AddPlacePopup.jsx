import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const changeName = e => {
    setName(e.target.value);
  };

  const changeLink = e => {
    setLink(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link
    });
  };

  //очистка полей ввода при открытии попапа(в качестве зависимости isOpen - то есть, инпуты сбразываются при изменения стейта попапа)
  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      buttonText="Создать"
      title="Новое место"
      name="add_photo"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="place-name-input"
        className="popup__input popup__input_place-info_name"
        name="name"
        type="text"
        required
        placeholder="Новое место"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={changeName}
      />
      <span className="place-name-input-error popup__error"></span>
      <input
        id="place-url-input"
        className="popup__input popup__input_place-info_url"
        name="link"
        type="url"
        required
        placeholder="Ссылка на картинку"
        value={link}
        onChange={changeLink}
      />
      <span className="place-url-input-error popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
