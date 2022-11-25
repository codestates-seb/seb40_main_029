import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/module/Header';
import MoodCard from './components/module/MoodCard';
import Letter from './components/templates/Letter';
import Login from './components/templates/Login';
import DisplayName from './components/templates/DisplayName';
import GoogleLogin from './components/module/GoogleLogin';

const App = () => {
  return (
    <div className="App">
      <GoogleLogin />
    </div>
  );
};
export default App;
