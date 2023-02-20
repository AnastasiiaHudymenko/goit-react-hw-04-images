import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handlBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    console.log('работаю когда открывается ');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      console.log('выпоняюсь когда окно сворачиывется ');
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return createPortal(
    <div className="Overlay" onClick={handlBackdrop}>
      <div className="Modal">{children}</div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = { onClose: PropTypes.func };
