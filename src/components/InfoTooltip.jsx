import { useNavigate } from 'react-router-dom';

function InfoTooltip({ isOpen, onClose, text, src }) {
  const navigate = useNavigate();

  const handleCloseClick = () => {
    onClose();
    //после закрытия направляем на страницу входа
    navigate('/sign-in', { replace: true });
  };

  return (
    <div className={`popup  ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_sign">
        <button className="popup__button-close" onClick={handleCloseClick} type="button" />
        <img className="popup__img-sign" src={src}></img>
        <p className="popup__text">{text}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
