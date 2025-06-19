import React, { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminSidebar from './AdminSidebar';
import Dashboard from './Dashboard';
import UserManagement from './UserManagement';
import CityManagement from './CityManagement';
import VehicleManagement from './VehicleManagement';
import ManualBooking from './ManualBooking';
import TransactionHistory from './TransactionHistory';
import Notifications from './Notifications';
import Settings from './Settings';
import { useToast } from '@/hooks/use-toast';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const { toast } = useToast();

  const handleLogin = (token: string) => {
    localStorage.setItem('adminToken', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setActiveSection('dashboard');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'drivers':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Driver Management</h1>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <p className="text-gray-600">Driver management interface coming soon...</p>
            </div>
          </div>
        );
      case 'cities':
        return <CityManagement />;
      case 'vehicles':
        return <VehicleManagement />;
      case 'bookings':
        return <ManualBooking />;
      case 'refunds':
        return <TransactionHistory />;
      case 'transactions':
        return <TransactionHistory />;
      case 'notifications':
        return <Notifications />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onLogout={handleLogout}
      />
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPanel;
