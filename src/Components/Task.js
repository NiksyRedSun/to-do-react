import React from 'react';


export const Task = ({ num="*", title, subClass }) => {
    if (subClass === "in-progress"){
        return (
            <div className={`task ${subClass}`}>
                <div className='num'>{num}.</div>
                <div className='title'>{title}</div>
                <div className="action-buttons">
                    <button className="complete-button">Выполнить</button>
                    <button className="cancel-button">Отменить</button>
                    <input type="checkbox" className="task-checkbox"/>
                </div>
            </div>
        );
    }

    else {
        return (
            <div className={`task ${subClass}`}>
                <div className='num'>{num}</div>
                <div className='title'>{title}</div>
            </div>
        );
    }

};

