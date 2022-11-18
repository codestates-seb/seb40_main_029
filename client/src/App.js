import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/module/Header';
import MoodCard from './components/module/MoodCard';
import Letter from './components/templates/Letter';
import TodoList from './components/module/TodoList';

const App = () => {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/letter" element={<Letter />} />
        <Route path="/todo" element={<TodoList />} />
      </Routes>
    </div>
  );
};
export default App;
