import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/templates/Home';
import Login from './components/templates/Login';
// import Signup from './templates/Signup';
import axios from 'axios';
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/login/callback" element={<Login />} />
        <Route path="/" element={<Login />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
      </Routes>
    </div>
  );
};
export default App;
