import React, { useState, useEffect } from 'react';
import {Task} from "./Task";
import {ToDoForm} from "./ToDoForm";





export const TaskBoard = () => {
    // Начальные значения
    const [taskInProgress, setTaskInProgress] = useState([]);
    const [taskCompleted, setTaskCompleted] = useState([]);
    const [taskCanceled, setTaskCanceled] = useState([]);


    // Работа с local storage
    const LOCAL_STORAGE_KEYS = {
        IN_PROGRESS: 'taskInProgress',
        COMPLETED: 'taskCompleted',
        CANCELED: 'taskCanceled'
    };

    const saveTasksToLocalStorage = () => {
        localStorage.setItem(LOCAL_STORAGE_KEYS.IN_PROGRESS, taskInProgress.join('\n'));
        localStorage.setItem(LOCAL_STORAGE_KEYS.COMPLETED, taskCompleted.join('\n'));
        localStorage.setItem(LOCAL_STORAGE_KEYS.CANCELED, taskCanceled.join('\n'));
    };

    const loadTasksFromLocalStorage = () => {
        const inProgressTasks = localStorage.getItem(LOCAL_STORAGE_KEYS.IN_PROGRESS);
        const completedTasks = localStorage.getItem(LOCAL_STORAGE_KEYS.COMPLETED);
        const canceledTasks = localStorage.getItem(LOCAL_STORAGE_KEYS.CANCELED);


        if (inProgressTasks) {
            let tasks = inProgressTasks.split('\n');
            setTaskInProgress(tasks);
        }
        if (completedTasks) {
            let tasks = completedTasks.split('\n');
            setTaskCompleted(tasks);
        }
        if (canceledTasks) {
            let tasks = canceledTasks.split('\n');
            setTaskInProgress(tasks);
        }
    };

    useEffect(() => {
        loadTasksFromLocalStorage();
    }, []);

    useEffect(() => {
        saveTasksToLocalStorage();
    }, [taskInProgress, taskCompleted, taskCanceled]);

    // Состояние для добавления задачи
    const addTask = (taskTitle) => {
        taskTitle = taskTitle.charAt(0).toUpperCase() + taskTitle.slice(1).toLowerCase();
        if (taskInProgress.some(task => task === taskTitle)) {
            return false;
        }
        setTaskInProgress([...taskInProgress, taskTitle]);
        return true;
    };

    // Хэндлеры на выполненное и отмененное задание
    const handleCompleteTask = (taskTitle) => {
        setTaskInProgress(taskInProgress.filter(task => task !== taskTitle));
        setTaskCompleted([taskTitle, ...taskCompleted]);
    };

    const handleCanceledTask = (taskTitle) => {
        setTaskInProgress(taskInProgress.filter(task => task !== taskTitle));
        setTaskCanceled([taskTitle, ...taskCanceled]);
    };

    // хэндлер на двойной клик по задаче
    const handleDoubleClickTask = (taskTitle) => {
        handleCompleteTask(taskTitle)
    };

    // хэндлеры на очистку списка задач
    const handleClearInProgress = () => {
        setTaskInProgress([]);
    };

    const handleClearCompleted = () => {
        setTaskCompleted([]);
    };

    const handleClearCanceled = () => {
        setTaskCanceled([]);
    };

    // Состояние для отслеживания выбранных задач
    const [selectedTasks, setSelectedTasks] = useState([]);

    // хэндлер для добавления выбранной задачи в список выбранных
    const handleSelectTask = (taskTitle) => {
        setSelectedTasks(prevSelectedTasks =>
            prevSelectedTasks.includes(taskTitle)
                ? prevSelectedTasks.filter(task => task !== taskTitle)
                : [...prevSelectedTasks, taskTitle]
        );
    };

    // хэндлер для выполнения выбранных задач
    const handleCompleteSelected = () => {
        const newCompletedTasks = [...selectedTasks, ...taskCompleted];
        const newInProgressTasks = taskInProgress.filter(task => !selectedTasks.includes(task));
        setTaskCompleted(newCompletedTasks);
        setTaskInProgress(newInProgressTasks);
        setSelectedTasks([]);
    };

    const handleCancelSelected = () => {
        const newCanceledTasks = [...selectedTasks, ...taskCanceled];
        const newInProgressTasks = taskInProgress.filter(task => !selectedTasks.includes(task));
        setTaskCanceled(newCanceledTasks);
        setTaskInProgress(newInProgressTasks);
        setSelectedTasks([]);
    };


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
        <ToDoForm addTask={addTask}
                  handleClearInProgress={handleClearInProgress}
                  handleClearCompleted={handleClearCompleted}
                  handleClearCanceled={handleClearCanceled}
                  handleCompleteSelected={handleCompleteSelected}
                  handleCancelSelected={handleCancelSelected}/>

        {taskInProgress.length > 0 && (
            <>
                <div className="block-title">В очереди</div>
                {taskInProgress.map((item, index) => (
                    <Task
                        key={index}
                        num={infiniteIterator.next().value}
                        title={item}
                        subClass={'in-progress'}
                        onComplete={() => handleCompleteTask(item)}
                        onCanceled={() => handleCanceledTask(item)}
                        onDoubleClick={() => handleDoubleClickTask(item)}
                        onSelect={() => handleSelectTask(item)}
                        isSelected={selectedTasks.includes(item)}
                    />
                ))}
            </>
        )}

        {taskCompleted.length > 0 && (
            <>
                <div className="block-title">Выполненные</div>
                {taskCompleted.map((item, index) => (
                    <Task
                        key={index}
                        title={item}
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
                        title={item}
                        subClass={'canceled'}
                    />
                ))}
            </>
        )}
    </div>
)}
;