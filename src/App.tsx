import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from 'react-toastify';
import MainRoute from './Routes/MainRoute';
function App() {
  return (
    <Provider store={store}>
      <MainRoute />
      <ToastContainer />
    </Provider>
  );
}

export default App;