import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/module/Header';
import MoodCard from './components/module/MoodCard';
import Letter from './components/templates/Letter';
import Login from './components/templates/Login';

const App = () => {
  return (
    <div className="App">
      <Login />
    </div>
  );
};
export default App;
