import s from './Modal.module.css';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        onClose();
      }
      console.log(e.code);
    });
  });

  useEffect(() => {
    window.removeEventListener('keydown', e => {
      if (e.code === 'Escape') {
        onClose();
      }
      console.log(e.code);
    });
  });
  // const handleKeyDown = e => {
  //   if (e.code === 'Escape') {
  //     onClose();
  //   }
  //   console.log(e.code);
  // };
  const handleBackdrope = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div className={s.Overlay} onClick={handleBackdrope}>
      <div className={s.Modal}>{children}</div>
    </div>
  );
}

// const Modal = ({ modalImage, onClose }) => (
//   <div className={s.Overlay}>
//     <div className={s.Modal}>
//       <img src={modalImage} alt={modalImage} />
//     </div>
//   </div>
// );
Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
};
export default Modal;
