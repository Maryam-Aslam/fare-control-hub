
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Car, 
  DollarSign, 
  TrendingUp, 
  MapPin, 
  Clock,
  Eye,
  AlertTriangle,
  Bell
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,230",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Active Users",
      value: "2,345",
      change: "+8.2%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active Drivers",
      value: "156",
      change: "+5.1%",
      icon: Car,
      color: "text-purple-600"
    },
    {
      title: "Total Rides",
      value: "12,345",
      change: "+15.3%",
      icon: MapPin,
      color: "text-orange-600"
    }
  ];

  const recentActivities = [
    { id: 1, action: "New driver registration", user: "John Doe", time: "2 minutes ago", type: "driver" },
    { id: 2, action: "Ride completed", user: "Jane Smith", time: "5 minutes ago", type: "ride" },
    { id: 3, action: "Payment processed", user: "Mike Johnson", time: "8 minutes ago", type: "payment" },
    { id: 4, action: "Refund requested", user: "Sarah Wilson", time: "12 minutes ago", type: "refund" },
    { id: 5, action: "New user signup", user: "Tom Brown", time: "15 minutes ago", type: "user" },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'driver': return <Car className="w-4 h-4 text-blue-500" />;
      case 'ride': return <MapPin className="w-4 h-4 text-green-500" />;
      case 'payment': return <DollarSign className="w-4 h-4 text-purple-500" />;
      case 'refund': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'user': return <Users className="w-4 h-4 text-orange-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
          <Clock className="w-3 sm:w-4 h-3 sm:h-4" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="stat-card">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-xs sm:text-sm ${stat.color} flex items-center mt-1`}>
                    <TrendingUp className="w-3 h-3 mr-1 flex-shrink-0" />
                    {stat.change}
                  </p>
                </div>
                <div className={`p-2 sm:p-3 rounded-full bg-gray-100 flex-shrink-0`}>
                  <stat.icon className={`w-4 sm:w-6 h-4 sm:h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Activities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Revenue Chart Placeholder */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <TrendingUp className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-red-600" />
              Revenue Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 sm:h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-8 sm:w-12 h-8 sm:h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm sm:text-base text-gray-600">Revenue chart visualization</p>
                <p className="text-xs sm:text-sm text-gray-500">Integration with charting library needed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <Eye className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-red-600" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex-shrink-0 mt-0.5">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{activity.action}</p>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{activity.user}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <button className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors text-left">
              <Car className="w-6 sm:w-8 h-6 sm:h-8 text-red-600 mb-2" />
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Add Driver</h3>
              <p className="text-xs sm:text-sm text-gray-600">Register new driver</p>
            </button>
            <button className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors text-left">
              <MapPin className="w-6 sm:w-8 h-6 sm:h-8 text-red-600 mb-2" />
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">New City</h3>
              <p className="text-xs sm:text-sm text-gray-600">Add service area</p>
            </button>
            <button className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors text-left">
              <DollarSign className="w-6 sm:w-8 h-6 sm:h-8 text-red-600 mb-2" />
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Manual Booking</h3>
              <p className="text-xs sm:text-sm text-gray-600">Create ride booking</p>
            </button>
            <button className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors text-left">
              <Bell className="w-6 sm:w-8 h-6 sm:h-8 text-red-600 mb-2" />
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Send Alert</h3>
              <p className="text-xs sm:text-sm text-gray-600">Notify users/drivers</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
