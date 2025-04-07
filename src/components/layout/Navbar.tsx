import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  PieChart,
  Settings,
  History,
  Key,
  UserPlus,
  LogInIcon
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { LogOut } from '../../store/authSlice';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedToken = localStorage.getItem('token');

  const isActive = (path: string) =>
    location.pathname === path ? 'bg-blue-700 text-white' : 'hover:bg-blue-500';

  const handleLogout = () => {
    dispatch(LogOut());
    localStorage.removeItem('token');
    navigate('/login');
  };

  const authNavItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/add', icon: PlusCircle, label: 'Add' },
    { path: '/history', icon: History, label: 'History' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const guestNavItems = [
    { path: '/register', icon: UserPlus, label: 'Register' },
    { path: '/login', icon: Key, label: 'Login' },
  ];

  const navToRender = storedToken ? authNavItems : guestNavItems;

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-xl">Budget Planner</Link>

          <div className="hidden md:flex space-x-4 items-center">
            {navToRender.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition ${isActive(path)}`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            ))}

            {storedToken && (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 rounded-md bg-red-400 text-white hover:bg-red-700 transition"
              >
                <LogInIcon size={20} />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-blue-600 border-t border-blue-500">
        <div className={`grid grid-cols-${navToRender.length + (storedToken ? 1 : 0)} py-2`}>
          {navToRender.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center p-2 transition ${isActive(path)}`}
            >
              <Icon size={24} />
              <span className="text-xs">{label}</span>
            </Link>
          ))}
          {storedToken && (
            <button
              onClick={handleLogout}
              className="flex flex-col items-center p-2 text-white hover:bg-red-600"
            >
              <LogInIcon size={24} />
              <span className="text-xs">Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
