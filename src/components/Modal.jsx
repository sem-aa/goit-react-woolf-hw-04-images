import React, { useEffect } from 'react';

const Modal = ({ srcImg, closeModal }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const handleOverlayClick = event => {
    if (event.target.classList.contains('Overlay')) {
      closeModal();
    }
  };

  return (
    <div className="Overlay" onClick={handleOverlayClick}>
      <div className="Modal">
        <img src={srcImg} alt="large foto" />
      </div>
    </div>
  );
};

export default Modal;
