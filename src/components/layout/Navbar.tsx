import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  History,
  Key,
  UserPlus,
  LogInIcon,
  UserCircle,
  Wallet
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { LogOut } from '../../store/authSlice';
import { clearBudget } from '../../store/budgetSettingsSlice';
import { clearCalculatedData } from '../../store/caculcatedDataSlice';
clearCalculatedData

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedToken = localStorage.getItem('token');

  // Updated to match nested dashboard routes
  const isActive = (path: string) => {
    const currentPath = location.pathname;
    // Check if current path starts with the nav item path
    return currentPath.startsWith(path) ? 'bg-blue-700 text-white' : 'hover:bg-blue-500';
  };

  const handleLogout = () => {
    dispatch(LogOut());
    dispatch(clearBudget());
    dispatch(clearCalculatedData())
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Updated paths to include /dashboard prefix
  const authNavItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/dashboard/add', icon: PlusCircle, label: 'Add' },
    { path: '/dashboard/history', icon: History, label: 'History' },
    { path: '/dashboard/settings', icon: Wallet, label: 'Set Budget' },
    { path: '/dashboard/profile', icon: UserCircle, label: '' },
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
          <Link to={storedToken ? "/dashboard" : "/"} className="font-bold text-xl">Mero Budget</Link>

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
                className="flex items-center space-x-2 px-2 py-1 rounded-md bg-red-400 text-white hover:bg-red-700 transition"
              >
                <LogInIcon size={20} />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden left-0 right-0 bg-blue-600 border-t border-blue-500 flex justify-center">
        <div className={`flex space-x-4 py-2`}>
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