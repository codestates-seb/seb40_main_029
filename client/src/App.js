import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/templates/Home';
import Login from './components/templates/Login';
import Signup from './components/templates/Signup';
import LoginCallback from './components/module/LoginCallback';
import axios from 'axios';
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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/callback" element={<LoginCallback />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};
export default App;
