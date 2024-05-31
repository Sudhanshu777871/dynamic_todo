// frontend/src/components/TaskList.js
import React from 'react';
import Task from './Task';

const TaskList = ({ title, tasks, onMove }) => (
    <div className="task-list">
        <h3 className='mt-2 '>{title} Tasks</h3>
        <div className='manageOverflow'>
            {tasks.map(task => (
                <Task key={task._id} task={task} onMove={onMove} />
            ))}
        </div>
    </div>
);

export default TaskList;
