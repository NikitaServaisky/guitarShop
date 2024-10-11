import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/rootComponent/Root';
import Error from './pages/errorPage/Error';
import Content from './pages/contentPage/Content';
import AboutUs from './components/aboutUsComponent/AboutUs';
import Welcome from './components/welcomeComponent/welcome';
import ProfilePage from './pages/profilePage/ProfilePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Content />,
        children: [
          {
            path: '/',
            element: <AboutUs />,
          },
          {
            path: '/registration',
            element: <Welcome />,
          },
          {
            path: '/profile',
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
