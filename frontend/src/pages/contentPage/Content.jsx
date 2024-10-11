import React from 'react';
import './content.module.css'; // This will apply your updated CSS
import Section from '../../components/sectionComponent/Section';
import { Outlet, useLocation } from 'react-router-dom';
import Login from '../loginPage/Login';
import Registration from '../registrationPage/Registration';
import Calendar from '../../components/CalendarComponent/Calendar';

const Content = () => {
  const location = useLocation();
  console.log(location);

  // Mapping paths to their content
  const renderContent = () => {
    const routesContent = {
      '/': <Login />,
      '/registration': <Registration />,
      '/profile': <Calendar />,
    };
    // Return the corresponding content or a default message
    return (
      routesContent[location.pathname] || <div>Welcome to the app! Please select a section.</div>
    );
  };

  return (
    <article>
      <Section>
        <Outlet />
      </Section>
      <Section>{renderContent()}</Section>
    </article>
  );
};

export default Content;
