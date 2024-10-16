import React from 'react';
import styles from './ModuleCSS/AddCardButton.module.css';

interface AddCardButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const AddCardButton: React.FC<AddCardButtonProps> = ({ onClick, disabled }) => {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      className={disabled ? styles.buttonDisabled : styles.button}
    >
      + Add card
    </button>
  );
};

export default AddCardButton;