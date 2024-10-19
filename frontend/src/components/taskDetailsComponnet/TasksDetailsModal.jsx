import React from 'react';
import Button from '../buttonComponent/Button';
import './taskDetailsModal.css';

const TaskDetailsModal = ({ task, onClose, onCompleteTask, onDeleteTask }) => {
  if (!task) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{task.title}</h2> {/* אם שם המשימה הוא 'title', תוודא שאתה משתמש בשם הנכון */}
        <p>{task.description}</p>
        {task.images &&
          task.images.length > 0 && ( // בדיקה נוספת לוודא שtask.images קיים
            <div className="task-images">
              {task.images.map((image, index) => (
                <img key={index} src={image} alt={`Task ${task.id} image ${index + 1}`} />
              ))}
            </div>
          )}
        <Button onClick={() => onDeleteTask(task._id)}>Delete Task</Button>
        <Button onClick={() => onCompleteTask(task._id)}>Mark as Completed</Button>
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
