import { Routes, Route } from 'react-router-dom';
import Home from '../../components/templates/pages/home/Home';
import Login from '../../components/templates/pages/login/Login';
import Signup from '../../components/templates/pages/signup/Signup';
import LoginCallback from '../../components/module/login/LoginCallback';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/callback" element={<LoginCallback />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default Router;
