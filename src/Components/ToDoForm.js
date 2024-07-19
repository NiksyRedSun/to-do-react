import React, {useState} from 'react';


export const ToDoForm = ({ addTask, handleClearInProgress, handleClearCompleted, handleClearCanceled,
                             handleCompleteSelected, handleCancelSelected}) => {

    const [inputValue, setInputValue] = useState('');
    const [isDuplicate, setIsDuplicate] = useState(false);

    const handleInputChange = (e) => {
        setIsDuplicate(false);
        setInputValue(e.target.value);
    };

    const handleAddTask = () => {
        if (inputValue.trim() !== '' && inputValue.trim() !== "Такая задача уже есть в списке") {
            if (addTask(inputValue)) {
                setInputValue('');
            } else {
                setIsDuplicate(true);
                setInputValue("Такая задача уже есть в списке");
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddTask();
        }
    };

    return (
        <div className="todo-wrap">
            <div className="todo-form">
                <input type="text"
                       value={inputValue}
                       onChange={handleInputChange}
                       onKeyDown={handleKeyDown}
                       className={`todo-input ${isDuplicate ? 'duplicate' : ''}`}
                       placeholder={"Введите задачу"}/>

                <button className="todo-button"
                        onClick={handleAddTask}>Добавить задачу</button>
            </div>
            <div className="selected-action-buttons">
                <button className="complete-selected-button"
                        onClick={handleCompleteSelected}>Выполнить выделенные</button>
                <button className="cancel-selected-button"
                        onClick={handleCancelSelected}>Отменить выделенные</button>
            </div>
            <div className="actions-buttons">
                <button className="clear-inprogres-button"
                onClick={handleClearInProgress}>Очистить очередь</button>
                <button className="clear-completed-button"
                onClick={handleClearCompleted}>Очистить выполненные</button>
                <button className="clear-canceled-button"
                onClick={handleClearCanceled}>Очистить отмененные</button>
            </div>
        </div>
    );
};

