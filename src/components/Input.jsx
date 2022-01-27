import React from 'react';
import addIcon from '../assets/img/add-icon.svg'




const Input = ({textInput, clickHandler, changeHandler}) => {

    return (
        <>
            <input 
                type="text"
                value={textInput}
                className="header__input" 
                placeholder="Write your task name"
                onChange={changeHandler} />
            <img 
                src={addIcon} 
                alt="" 
                className="header__add-btn"
                onClick={clickHandler} 
            />
        </>
    );
  }
  
  export default Input;