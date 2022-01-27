import React from 'react';
import Input from './Input.jsx';
import './Header.css';



const Header = ({addTask, textInput, clickHandler, changeHandler }) => {
    return (
        <>
            <header className="header">
                <Input 
                    addTask={addTask}
                    textInput={textInput}
                    clickHandler={clickHandler}
                    changeHandler={changeHandler}
                />
            </header>
            <span className="error"></span>
        </>
    );
  }
  
  export default Header;