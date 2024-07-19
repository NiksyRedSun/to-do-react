import React from 'react';


export const Task = ({ num="*", title, subClass, onComplete, onCanceled, onDoubleClick,
                         onSelect, isSelected}) => {
    if (subClass === "in-progress"){
        return (
            <div className={`task ${subClass}`} onDoubleClick={onDoubleClick}>
                <div className='num'>{num}.</div>
                <div className='title'>{title}</div>
                <div className="action-buttons">
                    <button className="complete-button"
                            onClick={onComplete}>Выполнить</button>
                    <button className="cancel-button"
                            onClick={onCanceled}>Отменить</button>
                    <input type="checkbox" className="task-checkbox"
                           checked={isSelected}
                           onChange={onSelect} />
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

