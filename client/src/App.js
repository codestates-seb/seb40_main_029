import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/templates/Home';
// import Login from './templates/Login';
// import Signup from './templates/Signup';
import axios from 'axios';
import { ThemeStore } from './components/module/ThemeStore';

axios.defaults.withCredentials = true;

const App = () => {
  const curr = window.location.toString();
  console.log(curr);
  return (
    <div className="App">
      {/* <Routes>
        <Route path="/" element={<Home />} /> */}
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/signup" element={<Signup />} /> */}
      {/* </Routes> */}
      <ThemeStore />
    </div>
  );
};
export default App;
