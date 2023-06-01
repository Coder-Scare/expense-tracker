import React from 'react'

// // Import React Icons
// import {AiOutlineCheck} from 'react-icons/ai';
// import {IoMdArrowBack} from 'react-icons/io';

interface ButtonProps {
    name: string;
    className: string;
    icon?: React.ReactElement;
    iconPosition?: 'left' | 'right';
}


const Button: React.FC<ButtonProps> = ({ name, className, icon, iconPosition = '' }) => {
  return (
    <div>
      <button className={className}>
        {iconPosition === 'left' && icon}
        {name}
        {iconPosition === 'right' && icon}
      </button>
    </div>
  )
}

export default Button
