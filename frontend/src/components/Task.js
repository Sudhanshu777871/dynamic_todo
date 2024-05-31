import React from 'react';

const Task = ({ task, onMove }) => (
    <div className="task">
        <div>
            <h3 className='taskTitle text-danger'>{task.title}</h3>
            <p className='descriptionStyle'>{task.description}</p>
            {task.status === 'Completed' && (<p className='descriptionStyle moreStyleOnCompletedTaskDetails'>{task.timestamp}</p>)}
            
        </div>
        {task.status !== 'Completed' && (
            <div>
                <button onClick={() => onMove(task)} className='actionButtonStyle'>
                    {task.status === 'Pending' ? 'Start' : 'Complete'}
                </button>
            </div>
        )}
    </div>
);

export default Task;
