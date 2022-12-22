import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function showToast(message) {
  // return toast.success(message, {
  //   autoClose: 5000,
  // });
  return (
    <div>
      {message}
      <ToastContainer
        position={'top-center'}
        closeOnClick={true}
        closeButton={<p>확인</p>}
        autoClose={false}
        toastStyle={{ color: 'white', backgroundColor: 'gray' }}
        // transition={Slide}
      />
    </div>
  );
}

// export default function Toast(message) {
//   toast.success(<ToastComponent message={message} />, { autoClose: 5000 });
// }
