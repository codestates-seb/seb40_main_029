import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/templates/Home';
// import Login from './templates/Login';
// import Signup from './templates/Signup';
import axios from 'axios';

import MoodSelector from './components/module/MoodSelector';
import LookBack from './components/module/LookBack';
import TodoList from './components/module/TodoList';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPaletteCode } from './redux/slice';

axios.defaults.withCredentials = true;

const App = () => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(-1);
  const refresher = () => {
    setRefresh(refresh * -1);
  };

  useEffect(() => {
    axios
      .get(
        'http://ec2-15-165-76-0.ap-northeast-2.compute.amazonaws.com:8080/mood/day/회원1'
      )
      .then(
        // res => dispatch(setPaletteCode(res.data.moodPaletteDetails.paletteCode))
        dispatch(setPaletteCode('p006'))
      );
    axios.get(
      'http://ec2-15-165-76-0.ap-northeast-2.compute.amazonaws.com:8080/palette/'
    );
    // .then(res => console.log(res.data));
  }, []);

  return (
    <div className="App">
      <MoodSelector refresher={refresher} />
      <TodoList refresher={refresher} />
      <LookBack refresh={refresh} />
      <Routes>
        <Route path="/home" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
        {/* <Route path="/mood" element={<MoodSelector />} />
        <Route path="/look" element={<LookBack />} />
        <Route path="/todo" element={<TodoList />} /> */}
      </Routes>
    </div>
  );
};
export default App;
