import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/templates/Home';
// import Login from './templates/Login';
// import Signup from './templates/Signup';
import axios from 'axios';
import TodoList from './components/module/TodoList';
import LookBack from './components/module/LookBack';
import MoodSelector from './components/module/MoodSelector';

axios.defaults.withCredentials = true;

const App = () => {
  const curr = window.location.toString();
  console.log(curr);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
      </Routes>
    </div>
  );
};
export default App;
