import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/module/Header';
import MoodCard from './components/module/MoodCard';
import Letter from './components/templates/Letter';
import ThemeStore from './components/module/ThemeStore';
import SelectorCard from './components/module/SelectorCard';
import Gradient from './components/module/Gradient';
import GradientWall from './components/module/GradientWall';

const App = () => {
  return (
    <div className="App">
      {/* <Header /> */}
      <GradientWall />
    </div>
  );
};
export default App;
