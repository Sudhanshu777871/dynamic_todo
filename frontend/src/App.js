import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';

import "../src/components/CSS/style.css"
import Footer from './components/Footer';

const App = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.log(error));
  
    }, []);

    const addTask = (title, description) => {
        const newTask = { title, description, status: 'Pending' };
        axios.post('http://localhost:5000/tasks', newTask)
            .then(response => setTasks([...tasks, response.data]))
            .catch(error => console.log(error));
    };

    const moveTask = (task) => {
        const updatedTask = { ...task };
        if (task.status === 'Pending') {
            updatedTask.status = 'In Progress';
        } else if (task.status === 'In Progress') {
            updatedTask.status = 'Completed';
            updatedTask.timestamp = new Date().toLocaleString();
        }

        axios.put(`http://localhost:5000/tasks/${task._id}`, updatedTask)
            .then(response => setTasks(tasks.map(t => t._id === task._id ? response.data : t)))
            .catch(error => console.log(error));
    };

    return (
        <div className="app">
            <h1 id='headingStyle'>GreenStitch : Dynamic To-Do List Application</h1>
            <div className="maincontainer">
                <div className='pendingAndFormDiv'>
                    <AddTaskForm addTask={addTask} />
                    <TaskList title="Pending" tasks={tasks.filter(task => task.status === 'Pending')} onMove={moveTask} />
                </div>
                <div className='pendingAndFormDiv'>
                    <TaskList title="In Progress" tasks={tasks.filter(task => task.status === 'In Progress')} onMove={moveTask} />
                </div>
                <div className='pendingAndFormDiv'>
                    <TaskList title="Completed" tasks={tasks.filter(task => task.status === 'Completed')} />
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default App;
