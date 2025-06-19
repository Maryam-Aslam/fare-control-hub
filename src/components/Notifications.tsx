
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Send, 
  Users, 
  Car, 
  MessageSquare,
  Calendar,
  CheckCircle,
  Clock,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Notifications = () => {
  const [showSendForm, setShowSendForm] = useState(false);
  const { toast } = useToast();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'booking_created',
      title: 'New Booking Created',
      message: 'John Doe has booked a ride from Downtown Airport to Hotel Central',
      timestamp: '2024-12-19 14:30',
      read: false,
      customerName: 'John Doe',
      bookingId: 'BOOK001'
    },
    {
      id: 2,
      type: 'ride_completed',
      title: 'Ride Completed',
      message: 'Jane Smith\'s ride has been completed successfully',
      timestamp: '2024-12-19 13:45',
      read: true,
      customerName: 'Jane Smith',
      bookingId: 'BOOK002'
    },
    {
      id: 3,
      type: 'booking_created',
      title: 'New Booking Created',
      message: 'Mike Johnson has booked a ride from Business District to Shopping Mall',
      timestamp: '2024-12-19 12:15',
      read: false,
      customerName: 'Mike Johnson',
      bookingId: 'BOOK003'
    }
  ]);

  const [newNotification, setNewNotification] = useState({
    recipient: '',
    title: '',
    message: '',
    type: 'announcement'
  });

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    
    const notification = {
      id: notifications.length + 1,
      type: newNotification.type,
      title: newNotification.title,
      message: newNotification.message,
      timestamp: new Date().toLocaleString(),
      read: false,
      recipient: newNotification.recipient
    };

    setNotifications([notification, ...notifications]);
    setNewNotification({
      recipient: '',
      title: '',
      message: '',
      type: 'announcement'
    });
    setShowSendForm(false);
    
    toast({
      title: "Notification Sent",
      description: `Notification sent to ${newNotification.recipient}`,
    });
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, read: true }
        : notification
    ));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking_created':
        return <Calendar className="w-4 h-4 text-blue-500" />;
      case 'ride_completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'announcement':
        return <Bell className="w-4 h-4 text-purple-500" />;
      case 'driver_alert':
        return <Car className="w-4 h-4 text-orange-500" />;
      default:
        return <MessageSquare className="w-4 h-4 text-gray-500" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case 'booking_created':
        return <Badge className="bg-blue-100 text-blue-800">New Booking</Badge>;
      case 'ride_completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'announcement':
        return <Badge className="bg-purple-100 text-purple-800">Announcement</Badge>;
      case 'driver_alert':
        return <Badge className="bg-orange-100 text-orange-800">Driver Alert</Badge>;
      default:
        return <Badge variant="secondary">Other</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Notifications & Alerts</h1>
        <Button 
          className="admin-gradient"
          onClick={() => setShowSendForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Send Notification
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Notifications</p>
                <p className="text-2xl font-bold">{notifications.length}</p>
              </div>
              <Bell className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unread</p>
                <p className="text-2xl font-bold">{notifications.filter(n => !n.read).length}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New Bookings</p>
                <p className="text-2xl font-bold">{notifications.filter(n => n.type === 'booking_created').length}</p>
              </div>
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed Rides</p>
                <p className="text-2xl font-bold">{notifications.filter(n => n.type === 'ride_completed').length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Send Notification Form */}
      {showSendForm && (
        <Card>
          <CardHeader>
            <CardTitle>Send New Notification</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSendNotification} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="recipient">Recipient</Label>
                  <select
                    id="recipient"
                    value={newNotification.recipient}
                    onChange={(e) => setNewNotification({...newNotification, recipient: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Recipient</option>
                    <option value="all_users">All Users</option>
                    <option value="all_drivers">All Drivers</option>
                    <option value="specific_user">Specific User</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <select
                    id="type"
                    value={newNotification.type}
                    onChange={(e) => setNewNotification({...newNotification, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="announcement">Announcement</option>
                    <option value="driver_alert">Driver Alert</option>
                    <option value="user_alert">User Alert</option>
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newNotification.title}
                  onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                  placeholder="Notification title"
                  required
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  value={newNotification.message}
                  onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                  placeholder="Notification message"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md h-24"
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="admin-gradient">
                  <Send className="w-4 h-4 mr-2" />
                  Send Notification
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowSendForm(false);
                    setNewNotification({
                      recipient: '',
                      title: '',
                      message: '',
                      type: 'announcement'
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors ${
                  !notification.read ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                        {getNotificationBadge(notification.type)}
                        {!notification.read && (
                          <Badge variant="destructive" className="text-xs">New</Badge>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{notification.message}</p>
                      <div className="text-sm text-gray-500">
                        {notification.timestamp}
                        {notification.customerName && (
                          <span className="ml-2">• Customer: {notification.customerName}</span>
                        )}
                        {notification.bookingId && (
                          <span className="ml-2">• Booking: {notification.bookingId}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {!notification.read && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark as Read
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
