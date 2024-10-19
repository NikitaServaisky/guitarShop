import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks, completeTask, deleteTask } from '../redux/tasksSlice';
import Checkbox from '../checkBoxComponent/CheckBox';
import TaskDetailsModal from '../taskDetailsComponnet/TasksDetailsModal';
import axios from '../../api/axiosInstance';
import './taskList.css';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [selectedTask, setSelectedTask] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const fetchTasks = async () => {
    console.log('Fetching tasks from server...');
    try {
      const response = await axios.get('/tasks/get-all');
      console.log('Tasks fetched:', response.data);
      dispatch(setTasks(response.data));
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, [dispatch]);

  const handleTaskClick = (task) => {
    console.log('Task clicked:', task);
    setSelectedTask(task);
    setIsModalOpen(true);
    console.log('isModalOpen:', true);
  };

  const handleCompleteTask = async (taskId) => {
    console.log('Completing task with ID:', taskId);
    try {
      const response = await axios.put(`tasks/update/${taskId}`, { completed: true });
      console.log('Task completed:', response.data.task);
      dispatch(completeTask(taskId));
      fetchTasks();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error completing task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    console.log('Deleting task with ID:', taskId);
    try {
      await axios.delete(`tasks/delete/${taskId}`); // נניח שהשרת תומך ב-endpoint הזה
      dispatch(deleteTask(taskId)); // עכשיו removeTask יהיה זמין לשימוש
      console.log('Task deleted successfully');
      setIsModalOpen(false); // סגור את המודאל לאחר מחיקת המשימה
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className="task-list">
      <h2>Task List</h2>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Task Name</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} onClick={() => handleTaskClick(task)}>
              <td>
                <Checkbox
                  checked={task.completed}
                  onChange={() => handleCompleteTask(task._id)}
                  label=""
                />
              </td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.completed ? 'Completed' : 'Pending'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={() => setIsModalOpen(false)}
          onCompleteTask={handleCompleteTask}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  );
};

export default TaskList;
