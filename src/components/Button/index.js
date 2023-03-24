import * as React from "react";
import './Button.css';

const Button = ({ title, onClick, disabled, btnType, btnStyle, icon }) => {
    // btn type : primary  | secondary
    // btn style: filled | outlined

    return (
        <button
            onClick={onClick}
            className={`btn ${btnStyle == 'outlined' ? 'btn-outline' : btnStyle == 'underlined' ? 'btn-underline' : 'btn-filled'} ${btnType == 'primary' ? 'btn-primary' : 'btn-secondary'}`}
            disabled={disabled}
        >
            {icon &&
                <img src={icon} className="icon" />}
            {title}
        </button >
    )
}
export default Button;