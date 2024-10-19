import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import Button from '../buttonComponent/Button';
import { useNavigate } from 'react-router-dom';
import TaskList from '../taskListComponent/TaskLists';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/profile');
        setUserData(response.data.user || {});
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{`${userData.firstName} ${userData.lastName}`}</h1>
      <TaskList />
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Profile;
