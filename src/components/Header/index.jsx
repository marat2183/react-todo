import React from 'react';

import s from './index.module.scss';
import addIcon from 'assets/img/add-icon.svg'




const Header = ({textInput, clickHandler, changeHandler, inputError}) => {
    return (
        <>
            <header className={s["header"]}>
                <input 
                type="text"
                value={textInput}
                className={[s["header__input"], inputError.status ? s['header__input--error'] : ''].join(' ')} 
                placeholder="Write your task name"
                onChange={changeHandler} />
                <img 
                    src={addIcon} 
                    alt="" 
                    className={s["header__add-btn"]}
                    onClick={clickHandler} 
                />
            </header>
            {
                inputError.status ? <span className={[s["error"], s['error--active']].join(' ')}>{inputError.msg}</span> : <span className={s["error"]}></span>
            }
        </>
    );
  }
  
  export default Header;