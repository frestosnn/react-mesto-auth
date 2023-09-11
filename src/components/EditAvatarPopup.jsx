import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  //вызывается функция из App, которая делает запрос к Api и меняет аватар
  const handleSubmit = e => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  };

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      buttonText="Сохранить"
      title="Обновить аватар"
      name="avatar-change"
      isOpen={isOpen}
      onClose={onClose}
      //передается по ссылке и вызывается при нажатии кнопки
      onSubmit={handleSubmit}
    >
      <input
        id="avatar-url-input"
        className="popup__input popup__input_avatar_url"
        name="avatar"
        type="url"
        required
        placeholder="Ссылка на аватар"
        ref={avatarRef}
      />
      <span className="avatar-url-input-error popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
