
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Car, 
  MapPin, 
  CreditCard, 
  FileText, 
  Bell, 
  Settings,
  LogOut,
  Calendar,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
}

const AdminSidebar = ({ activeSection, onSectionChange, onLogout }: AdminSidebarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'drivers', label: 'Driver Management', icon: Car },
    { id: 'cities', label: 'City Management', icon: MapPin },
    { id: 'vehicles', label: 'Vehicle Categories', icon: Car },
    { id: 'bookings', label: 'Manual Booking', icon: Calendar },
    { id: 'refunds', label: 'Refund Management', icon: CreditCard },
    { id: 'transactions', label: 'Transactions', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleMenuItemClick = (itemId: string) => {
    onSectionChange(itemId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white shadow-md"
        >
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white h-screen flex flex-col transition-transform duration-300 ease-in-out",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-4 sm:p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 admin-gradient rounded-lg">
              <Car className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">RidePanel</h1>
              <p className="text-gray-400 text-xs sm:text-sm">Admin Dashboard</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-3 sm:p-4 space-y-1 sm:space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-left h-10 sm:h-12 px-3 sm:px-4 text-sm",
                activeSection === item.id 
                  ? "bg-red-600 text-white hover:bg-red-700" 
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              )}
              onClick={() => handleMenuItemClick(item.id)}
            >
              <item.icon className="w-4 sm:w-5 h-4 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </Button>
          ))}
        </nav>

        <div className="p-3 sm:p-4 border-t border-gray-700">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-gray-800 h-10 sm:h-12 px-3 sm:px-4 text-sm"
            onClick={onLogout}
          >
            <LogOut className="w-4 sm:w-5 h-4 sm:h-5 mr-2 sm:mr-3 flex-shrink-0" />
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
