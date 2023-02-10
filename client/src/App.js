import Router from './components/router/Router';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Referrer-Policy'] = 'no-referrer-when-downgrade';

const App = () => {
  return (
    <div className="App">
      <GoogleOAuthProvider
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
      >
        <Router />
        <ToastContainer
          position={'top-right'}
          autoClose={2000}
          closeOnClick={true}
          hideProgressBar={true}
          pauseOnHover={false}
          icon={<FontAwesomeIcon icon={faCircleCheck} />}
        />
      </GoogleOAuthProvider>
    </div>
  );
};
export default App;
