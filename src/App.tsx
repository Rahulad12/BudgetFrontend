import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from 'react-toastify';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import AddTransaction from './pages/AddTransaction';
import BudgetSettings from './pages/BudgetSettings';
import History from './pages/History';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './Routes/ProtectedRoute';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add" element={<AddTransaction />} />
              <Route path="/settings" element={<BudgetSettings />} />
              <Route path="/history" element={<History />} />
            </Route>
          </Routes>
        </Layout>
        <ToastContainer />
      </Router>
    </Provider>
  );
}

export default App;