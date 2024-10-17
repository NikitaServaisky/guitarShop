import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance'; // ייבא את axiosInstance
import Button from '../buttonComponent/Button';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // נבצע ניווט אחרי ההתנתקות

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/profile'); // השתמש ב-axiosInstance
        console.log(response);
        setUserData(response.data.user || {});
        setTasks(response.data.tasks || []);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // פונקציית ההתנתקות
  const logout = () => {
    localStorage.removeItem('authToken'); // מחיקת הטוקן
    navigate('/'); // ניתוב לדף הבית או דף התחברות
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{`${userData.firstName} ${userData.lastName}`}</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
      {/* ניתוק משתמש בלחיצה על הכפתור */}
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Profile;
