import React from 'react';


export const ToDoForm = ({ num, title }) => {
    return (
        <div className="todo-wrap">
            <div className="todo-form">
                <input type="text" className="todo-input" placeholder="Введите задачу"/>
                <button className="todo-button">Добавить задачу</button>
            </div>
            <div className="selected-action-buttons">
                <button className="complete-selected-button">Выполнить выделенные</button>
                <button className="cancel-selected-button">Отменить выделенные</button>
            </div>
        </div>
    );
};

