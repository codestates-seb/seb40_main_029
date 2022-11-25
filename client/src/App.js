import { Routes, Route, Link } from 'react-router-dom';
import Friends from './components/templates/Friends';
import Header from './components/module/Header';
import MoodCard from './components/module/MoodCard';
import Letter from './components/templates/Letter';
import Gradi from './components/templates/gradi';
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
      <Header />
      <TodoList />
      <Routes>
        <Route path="/letter" element={<Letter />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/lookback" element={<LookBack />} />
        <Route path="/moodselector" element={<MoodSelector />} />
      </Routes>
    </div>
  );
};
export default App;
