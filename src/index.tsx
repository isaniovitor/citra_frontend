import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GlobalContext from './contexts';
import Root from './routes';

import { GlobalStyles } from './styles/GlobalStyles';

import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <BrowserRouter>
    <GlobalStyles />
    <GlobalContext>
      <ToastContainer
        position="bottom-right"
        // bodyStyle={{ width: '100px', height: '100px' }}

        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />

      <Root />
    </GlobalContext>
  </BrowserRouter>,
);
