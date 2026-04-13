// src/components/ui/Modal.tsx
import ReactModal from "react-modal";
import { useEffect, useRef } from "react";
import styles from "./Modal.module.css";

ReactModal.setAppElement("#root");   // ← Important for accessibility



const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className = "",
}) => {
  const modalContentRef = useRef(null);

  // Auto-focus first input field when modal opens
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      const modalElement = modalContentRef.current;
      if (!modalElement) return;

      // Find first input, textarea or select
      const firstInput = modalElement.querySelector(
        "input:not([type='hidden']), textarea, select"
      );

      if (firstInput) {
        firstInput.focus();
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={`${styles.modal} ${className}`}
      overlayClassName={styles.overlay}
      closeTimeoutMS={200}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      shouldFocusAfterRender={true}     // Helps with focus
    >
      {/* Wrap ALL content with ref so we can search inside it */}
      <div ref={modalContentRef}>
        {/* Header slot */}
        {title && (
          <div className={styles.header}>
            <div className={styles.title}>{title}</div>
            <button className={styles.closeBtn} onClick={onClose}>
              ✕
            </button>
          </div>
        )}

        {/* Body slot - where your input fields go */}
        <div className={styles.body}>{children}</div>

        {/* Footer slot */}
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </ReactModal>
  );
};

export default Modal;