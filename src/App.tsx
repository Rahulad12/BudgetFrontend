import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import AddTransaction from './pages/AddTransaction';
import Insights from './pages/Insights';
import BudgetSettings from './pages/BudgetSettings';
import History from './pages/History';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add" element={<AddTransaction />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/settings" element={<BudgetSettings />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;