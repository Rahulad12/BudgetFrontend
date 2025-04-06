import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, PieChart, Settings, History } from 'lucide-react';

 const Navbar =()=> {
  const location = useLocation();
  
  const isActive = (path: string) => 
    location.pathname === path ? 'bg-blue-700' : '';

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/add', icon: PlusCircle, label: 'Add' },
    { path: '/insights', icon: PieChart, label: 'Insights' },
    { path: '/history', icon: History, label: 'History' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-xl">Budget Planner</Link>
          
          <div className="hidden md:flex space-x-4">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md ${isActive(path)}`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-blue-600 border-t border-blue-500">
        <div className="grid grid-cols-5 py-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center p-2 ${isActive(path)}`}
            >
              <Icon size={24} />
              <span className="text-xs">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;