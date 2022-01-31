import React from 'react';
import { useDispatch } from 'react-redux';
import { useRef, useState, useEffect } from 'react';

import s from './index.module.scss';
import addIcon from 'assets/img/add-icon.svg'




const Header = ({ taskService }) => {

    const dispatch = useDispatch();

    const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    };

    const [textInput, setTextInput] = useState('');
    const [inputError, setInputError] = useState(
        {
            status: false,
            msg: ''
        });
    const prevTextInput = usePrevious(textInput);

    useEffect(() => {
        if (inputError.status && (prevTextInput.length !== textInput.length)) {
            setInputError({
                status: false,
                msg: ''
            })
        }
    }, [prevTextInput, inputError, textInput])

    const addTask = (taskName, completed = false) => {
        taskService.create(taskName)
        dispatch({
            type: 'addTask',
            task: {
                name: taskName,
                completed: completed,
                lastModTime: Date.now()
            }
        })
        if (completed) {
            dispatch({ type: 'incrementCompletedTasksPerWeek' })
        }
    }

    const onInputError = (error = '') => {
        setInputError((currentState) => {
            return {
                status: !currentState.status,
                msg: error
            }

        });
    }

    const clickHandler = () => {
        const userInput = textInput.trim();
        try {
            addTask(userInput);
            setTextInput('');
        }
        catch (error) {
            onInputError(error.message);
        }
    }

    const changeHandler = (event) => {
        setTextInput(event.target.value);
    }

    return (
        <>
            <header className={s["header"]}>
                <input
                    type="text"
                    value={textInput}
                    className={
                        [
                            s["header__input"],
                            inputError.status ? s['header__input--error'] : ''
                        ].join(' ')
                    }
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
                inputError.status ?
                    <span className={
                        [
                            s["error"],
                            s['error--active']
                        ].join(' ')
                    }>
                        {inputError.msg}
                    </span> :
                    <span className={s["error"]}></span>
            }
        </>
    );
}

export default Header;