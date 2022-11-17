import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/module/Header';
import MoodCard from './components/module/MoodCard';
import Letter from './components/templates/Letter';
import ColorCarousel from './components/module/ColorCarousel';
import SelectorCard from './components/module/SelectorCard';

const App = () => {
  return (
    <div className="App">
      <Header />
      <ColorCarousel />
    </div>
  );
};
export default App;
