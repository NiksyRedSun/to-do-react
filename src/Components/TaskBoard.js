import React from 'react';
import {Task} from "./Task";
import {ToDoForm} from "./ToDoForm";


let taskInProgress = [
    { num: 1, title: 'Покушать'},
    { num: 2, title: 'Помыться'},
    { num: 3, title: 'Собраться'},
];

let taskCompleted = [
    { num: 1, title: 'Покушать'},
    { num: 2, title: 'Помыться'},
    { num: 3, title: 'Собраться'},
];

let taskCanceled = [
    { num: 1, title: 'Покушать'},
    { num: 2, title: 'Помыться'},
    { num: 3, title: 'Собраться'},
];


export const TaskBoard = () => {


    const infiniteIterator = {
        current: 1,
        next() {
            return {
                value: this.current++,
                done: false
            };
        }
    };


    return (
    <div className="task-board">
        <ToDoForm />
        <div className="block-title">В очереди</div>
        {taskInProgress.map((item, index) => (
            <Task
                key={index}
                num={infiniteIterator.next().value}
                title={item.title}
                subClass={'in-progress'}
            />
        ))}

        {taskCompleted.length > 0 && (
            <>
                <div className="block-title">Выполненные</div>
                {taskCompleted.map((item, index) => (
                    <Task
                        key={index}
                        title={item.title}
                        subClass={'completed'}
                    />
                ))}
            </>
        )}

        {taskCanceled.length > 0 && (
            <>
                <div className="block-title">Отмененные</div>
                {taskCanceled.map((item, index) => (
                    <Task
                        key={index}
                        title={item.title}
                        subClass={'canceled'}
                    />
                ))}
            </>
        )}
    </div>
)}
;